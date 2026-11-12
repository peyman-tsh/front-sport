const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 44100;

/**
 * Creates a RIFF WAV Buffer from 16-bit PCM samples
 */
function createWavBuffer(samples, sampleRate = 44100) {
  const byteLength = samples.length * 2;
  const buffer = Buffer.alloc(44 + byteLength);

  // RIFF identifier
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + byteLength, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(1, 22);  // NumChannels (1 = Mono)
  buffer.writeUInt32LE(sampleRate, 24); // SampleRate
  buffer.writeUInt32LE(sampleRate * 2, 28); // ByteRate (SampleRate * NumChannels * BitsPerSample/8)
  buffer.writeUInt16LE(2, 32);  // BlockAlign
  buffer.writeUInt16LE(16, 34); // BitsPerSample (16 bits)

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(byteLength, 40);

  // Write PCM 16-bit samples
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const val = s < 0 ? s * 32768 : s * 32767;
    buffer.writeInt16LE(Math.round(val), offset);
    offset += 2;
  }

  return buffer;
}

/**
 * Realistic Internal Combustion Engine Cylinder Pulse
 * Generates an asymmetric acoustic pressure pulse from exhaust valve opening
 */
function cylinderPulse(phase) {
  // Sharp compression shockwave followed by expansion and reflection
  const p = phase % 1.0;
  if (p < 0.15) {
    return Math.sin((p / 0.15) * Math.PI);
  } else if (p < 0.55) {
    const decay = (p - 0.15) / 0.4;
    return -Math.sin(decay * Math.PI) * 0.45 * Math.exp(-decay * 2.5);
  } else {
    // Secondary reflection in exhaust manifold runner
    const refl = (p - 0.55) / 0.45;
    return Math.sin(refl * Math.PI * 2) * 0.15 * Math.exp(-refl * 3);
  }
}

/**
 * Generate HKS Open Silencer Exhaust Sound
 * Rich, throaty, bass-heavy 4-cylinder engine revving with straight-flow muffler
 */
function generateHksOpenSilencer(durationSec = 8) {
  const numSamples = durationSec * SAMPLE_RATE;
  const samples = new Float32Array(numSamples);

  let phase = 0;
  let subPhase = 0;
  let noiseFilter = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;

    // RPM Profile: Idle (1000) -> Rev up to 6400 RPM -> Hold -> Decel with burble
    let currentRpm;
    if (t < 1.0) {
      currentRpm = 1100 + (t / 1.0) * 1200; // 1100 to 2300
    } else if (t < 3.2) {
      const p = (t - 1.0) / 2.2;
      currentRpm = 2300 + Math.pow(p, 1.4) * 4300; // accelerate to 6600
    } else if (t < 4.8) {
      // High RPM sustained roar with slight throttle vibration
      currentRpm = 6600 + Math.sin(t * 18) * 150;
    } else if (t < 6.5) {
      // Throttle lift-off deceleration
      const p = (t - 4.8) / 1.7;
      currentRpm = 6600 - Math.pow(p, 0.8) * 4400; // drop to 2200
    } else {
      currentRpm = 2200 - ((t - 6.5) / 1.5) * 1200; // drop to idle
    }

    // 4-cylinder engine: firing frequency = (RPM / 60) * 2 pulses/sec
    const fireFreq = (currentRpm / 60) * 2;
    phase += fireFreq / SAMPLE_RATE;
    subPhase += (fireFreq * 0.5) / SAMPLE_RATE;

    // Cylinder firing pulse with manifold reflections
    let rawPulse = cylinderPulse(phase);

    // Deep sub-harmonic rumble (engine block mass vibration)
    const subBass = Math.sin(subPhase * 2 * Math.PI) * 0.45;

    // Stainless steel 304 pipe rasp harmonics (2nd, 3rd, 4th, 6th order)
    const rasp =
      Math.sin(phase * 2 * Math.PI * 2) * 0.28 +
      Math.sin(phase * 3 * Math.PI * 2) * 0.22 +
      Math.sin(phase * 4 * Math.PI * 2) * 0.15 +
      Math.sin(phase * 6 * Math.PI * 2) * 0.1;

    // Turbulent exhaust gas rushing noise (higher at high RPM)
    const whiteNoise = (Math.random() * 2 - 1);
    noiseFilter = noiseFilter * 0.75 + whiteNoise * 0.25;
    const gasRush = noiseFilter * (0.08 + (currentRpm / 7000) * 0.25);

    // Occasional subtle burble during deceleration
    let decelBurble = 0;
    if (t > 4.8 && t < 6.8 && Math.random() < 0.04) {
      decelBurble = (Math.random() * 2 - 1) * 0.4;
    }

    // Combine acoustic components
    let signal = (rawPulse * 0.65 + subBass * 0.4 + rasp * 0.35 + gasRush + decelBurble);

    // Soft-clipping non-linear pipe wall saturation (tanh)
    signal = Math.tanh(signal * 1.6) * 0.75;

    samples[i] = signal;
  }

  return samples;
}

/**
 * Generate HKS Closed Silencer Exhaust Sound
 * Restricted mechanical baffle: deep muffled low-frequency engine purr,
 * smooth low-mid harmonics clearly audible on all speakers and phones.
 */
function generateHksClosedSilencer(durationSec = 8) {
  const numSamples = durationSec * SAMPLE_RATE;
  const samples = new Float32Array(numSamples);

  let phase = 0;
  let subPhase = 0;
  let noiseState = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;

    // Smooth city driving RPM profile: Idle (1000) -> 3400 RPM -> Cruise -> Idle
    let currentRpm;
    if (t < 1.2) {
      currentRpm = 1000 + (t / 1.2) * 600; // 1000 to 1600
    } else if (t < 3.8) {
      const p = (t - 1.2) / 2.6;
      currentRpm = 1600 + Math.pow(p, 1.2) * 2000; // to 3600 RPM
    } else if (t < 5.8) {
      currentRpm = 3600 - ((t - 3.8) / 2.0) * 1800; // to 1800 RPM
    } else {
      currentRpm = 1800 - ((t - 5.8) / 2.2) * 800; // back to 1000 RPM idle
    }

    const fireFreq = (currentRpm / 60) * 2;
    phase += fireFreq / SAMPLE_RATE;
    subPhase += (fireFreq * 0.5) / SAMPLE_RATE;

    // Audible low-mid engine cylinder firing harmonics (1f, 2f, 3f, 4f)
    // Symmetrical smooth rounded tone characteristic of a baffled OEM silencer
    const f1 = Math.sin(phase * 2 * Math.PI) * 0.55;
    const f2 = Math.sin(phase * 2 * Math.PI * 2) * 0.35;
    const f3 = Math.sin(phase * 2 * Math.PI * 3) * 0.18;
    const f4 = Math.sin(phase * 2 * Math.PI * 4) * 0.08;
    const sub = Math.sin(subPhase * 2 * Math.PI) * 0.3;

    // Subtle airflow rushing through restricted silencer chamber
    const white = Math.random() * 2 - 1;
    noiseState = noiseState * 0.88 + white * 0.12;
    const airHum = noiseState * (0.08 + (currentRpm / 4000) * 0.12);

    let tone = (f1 + f2 + f3 + f4 + sub + airHum);

    // Warm tube saturation
    samples[i] = Math.tanh(tone * 1.3) * 0.85;
  }

  return samples;
}

/**
 * Generate Aggressive Pop & Bang / Backfire / Rev-Limiter Cutoff
 * Full-throttle acceleration to 7000 RPM, hard ignition 2-step cut, explosive exhaust cracks
 */
function generateHksPopBang(durationSec = 8) {
  const numSamples = durationSec * SAMPLE_RATE;
  const samples = new Float32Array(numSamples);

  let phase = 0;
  let noiseFilter = 0;

  // Pre-schedule explosive pop timestamps (sample indices)
  const popEvents = [];
  // During cutoff at 3.2s - 4.8s (rev limiter bounce)
  for (let t = 3.2; t <= 4.8; t += 0.08 + Math.random() * 0.06) {
    popEvents.push({ time: t, intensity: 0.7 + Math.random() * 0.3 });
  }
  // Deceleration backfire cracks at 5.0s - 7.0s
  for (let t = 5.1; t <= 7.0; t += 0.25 + Math.random() * 0.35) {
    popEvents.push({ time: t, intensity: 0.85 + Math.random() * 0.35 });
  }

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;

    // Fast spool up to 7200 RPM, 2-step stutter, deceleration
    let currentRpm;
    if (t < 3.0) {
      currentRpm = 2000 + Math.pow(t / 3.0, 1.8) * 5200; // to 7200 RPM
    } else if (t < 4.8) {
      // Rev limiter stutter (bouncing off 7100 - 7250 RPM)
      currentRpm = 7150 + Math.sin(t * 70) * 120;
    } else {
      currentRpm = 7100 - Math.pow((t - 4.8) / 3.2, 0.7) * 5600;
    }

    const fireFreq = (currentRpm / 60) * 2;
    phase += fireFreq / SAMPLE_RATE;

    // Base engine sound
    let pulse = cylinderPulse(phase);
    const harmonics =
      Math.sin(phase * 2 * Math.PI * 2) * 0.35 +
      Math.sin(phase * 3 * Math.PI * 2) * 0.25;

    const whiteNoise = Math.random() * 2 - 1;
    noiseFilter = noiseFilter * 0.7 + whiteNoise * 0.3;

    let engine = pulse * 0.55 + harmonics * 0.35 + noiseFilter * 0.15;

    // Limiter fuel cut stutter (choppy envelope)
    if (t >= 3.0 && t <= 4.8) {
      const cutPattern = Math.sin(t * 85) > 0.1 ? 1.0 : 0.25;
      engine *= cutPattern;
    }

    // Add acoustic backfire pops (shockwave blast)
    let popSound = 0;
    for (const pop of popEvents) {
      const dt = t - pop.time;
      if (dt >= 0 && dt < 0.12) {
        // Sharp acoustic blast: instant transient, low-frequency pressure boom, and crackle
        const decay = dt / 0.12;
        const crack = (Math.random() * 2 - 1) * Math.exp(-decay * 35);
        const boom = Math.sin(dt * 2 * Math.PI * 65) * Math.exp(-decay * 12);
        popSound += (crack * 0.7 + boom * 0.6) * pop.intensity;
      }
    }

    let combined = engine * 0.55 + popSound * 0.85;
    samples[i] = Math.tanh(combined * 1.5) * 0.85;
  }

  return samples;
}

/**
 * Generate K&N Cold Air Intake Induction Roar
 * Deep resonant suction through CNC aluminum pipe, cone filter air rush, throttle plate vacuum
 */
function generateKnIntakeAcceleration(durationSec = 7.5) {
  const numSamples = durationSec * SAMPLE_RATE;
  const samples = new Float32Array(numSamples);

  let phase = 0;
  let intakeNoise1 = 0;
  let intakeNoise2 = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;

    // Full throttle acceleration
    let currentRpm;
    if (t < 1.0) {
      currentRpm = 1000 + t * 1200;
    } else if (t < 4.5) {
      const p = (t - 1.0) / 3.5;
      currentRpm = 2200 + Math.pow(p, 1.3) * 4400; // to 6600 RPM
    } else if (t < 5.8) {
      currentRpm = 6600 + Math.sin(t * 20) * 100;
    } else {
      currentRpm = 6600 - ((t - 5.8) / 1.7) * 4800; // throttle snap shut
    }

    const fireFreq = (currentRpm / 60) * 2;
    phase += fireFreq / SAMPLE_RATE;

    // Intake acoustic resonance (Helmholtz resonator in 150-350 Hz band)
    const helmholtzTone =
      Math.sin(phase * 2 * Math.PI) * 0.5 +
      Math.sin(phase * 2 * Math.PI * 2) * 0.35 +
      Math.sin(phase * 2 * Math.PI * 3) * 0.15;

    // Intense turbulent induction air rush across cone mesh
    const white = Math.random() * 2 - 1;
    intakeNoise1 = intakeNoise1 * 0.82 + white * 0.18;
    intakeNoise2 = intakeNoise2 * 0.92 + white * 0.08;

    const throttleOpenRatio = t < 5.8 ? Math.min(1.0, 0.4 + (currentRpm / 6600) * 0.6) : 0.15;
    const airSuction = (intakeNoise1 * 0.4 + intakeNoise2 * 0.35) * throttleOpenRatio;

    // Throttle lift-off compressor / intake flutter at 5.8s
    let flutter = 0;
    if (t >= 5.8 && t <= 6.8) {
      const dt = t - 5.8;
      const flutterFreq = 14 + Math.sin(dt * 30) * 4; // flutter modulation
      flutter = Math.sin(dt * 2 * Math.PI * 350) * Math.sin(dt * 2 * Math.PI * flutterFreq) * Math.exp(-dt * 3) * 0.45;
    }

    let signal = helmholtzTone * 0.45 + airSuction * 0.55 + flutter;
    samples[i] = Math.tanh(signal * 1.5) * 0.75;
  }

  return samples;
}

/**
 * Generate K&N Intake Rev & Cutoff Sound
 * Quick throttle blips, vacuum suction snap, high-pitch intake breathing
 */
function generateKnIntakeRev(durationSec = 6) {
  const numSamples = durationSec * SAMPLE_RATE;
  const samples = new Float32Array(numSamples);

  let phase = 0;
  let noiseState = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;

    // Double throttle blips (Blip 1: 1.0s, Blip 2: 3.0s to cutoff)
    let currentRpm;
    if (t < 0.8) {
      currentRpm = 950;
    } else if (t < 1.6) {
      const p = (t - 0.8) / 0.8;
      currentRpm = 950 + Math.sin(p * Math.PI) * 2800; // blip to 3750
    } else if (t < 2.4) {
      currentRpm = 1100;
    } else if (t < 4.0) {
      const p = (t - 2.4) / 1.6;
      currentRpm = 1100 + Math.pow(p, 1.5) * 5500; // rev to 6600 cutoff
    } else {
      currentRpm = 6600 - ((t - 4.0) / 2.0) * 5400; // drop back to idle
    }

    const fireFreq = (currentRpm / 60) * 2;
    phase += fireFreq / SAMPLE_RATE;

    const intakeRoar = Math.sin(phase * 2 * Math.PI) * 0.45 + Math.sin(phase * 2 * Math.PI * 2) * 0.3;
    const white = Math.random() * 2 - 1;
    noiseState = noiseState * 0.8 + white * 0.2;

    const airHiss = noiseState * (0.15 + (currentRpm / 7000) * 0.45);

    samples[i] = Math.tanh((intakeRoar * 0.5 + airHiss) * 1.4) * 0.75;
  }

  return samples;
}

/**
 * 6. Peugeot 206 / 207 (TU5 Engine - 1.6L 16V)
 * High-revving European 16V screaming rasp with metallic top-end (up to 6800 RPM)
 */
function generateTu5Sound(durationSec = 8) {
  const numSamples = durationSec * SAMPLE_RATE;
  const samples = new Float32Array(numSamples);
  let phase = 0;
  let noiseFilter = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let currentRpm;
    if (t < 1.0) {
      currentRpm = 1100 + (t / 1.0) * 1400; // to 2500
    } else if (t < 3.5) {
      const p = (t - 1.0) / 2.5;
      currentRpm = 2500 + Math.pow(p, 1.3) * 4300; // accelerate to 6800 TU5 cutoff
    } else if (t < 5.0) {
      currentRpm = 6750 + Math.sin(t * 25) * 120; // scream at redline
    } else if (t < 6.8) {
      const p = (t - 5.0) / 1.8;
      currentRpm = 6800 - Math.pow(p, 0.7) * 4800; // decel
    } else {
      currentRpm = 2000 - ((t - 6.8) / 1.2) * 1000; // idle
    }

    const fireFreq = (currentRpm / 60) * 2;
    phase += fireFreq / SAMPLE_RATE;

    const pulse = cylinderPulse(phase);
    // TU5 signature: pronounced 3rd, 5th, and 7th metallic odd harmonics
    const rasp =
      Math.sin(phase * 2 * Math.PI * 2) * 0.32 +
      Math.sin(phase * 2 * Math.PI * 3) * 0.28 +
      Math.sin(phase * 2 * Math.PI * 5) * 0.18 +
      Math.sin(phase * 2 * Math.PI * 7) * 0.12;

    const white = Math.random() * 2 - 1;
    noiseFilter = noiseFilter * 0.72 + white * 0.28;
    const gasRush = noiseFilter * (0.07 + (currentRpm / 7000) * 0.28);

    let tone = pulse * 0.58 + rasp * 0.42 + gasRush;
    samples[i] = Math.tanh(tone * 1.5) * 0.8;
  }
  return samples;
}

/**
 * 7. Peugeot Pars / Samand / Xantia (XU7 / XUM Engine - 1.8L-2.0L 8V)
 * Heavy low-end torque throb, low-frequency 8V rumble (45Hz - 180Hz), redline 6200 RPM
 */
function generateXu7Sound(durationSec = 8) {
  const numSamples = durationSec * SAMPLE_RATE;
  const samples = new Float32Array(numSamples);
  let phase = 0;
  let subPhase = 0;
  let noiseFilter = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let currentRpm;
    if (t < 1.2) {
      currentRpm = 950 + (t / 1.2) * 1250; // 950 to 2200
    } else if (t < 3.8) {
      const p = (t - 1.2) / 2.6;
      currentRpm = 2200 + Math.pow(p, 1.2) * 4000; // rev to 6200 XU7 cutoff
    } else if (t < 5.2) {
      currentRpm = 6150 + Math.sin(t * 15) * 80; // heavy rumble hold
    } else if (t < 6.8) {
      const p = (t - 5.2) / 1.6;
      currentRpm = 6200 - Math.pow(p, 0.8) * 4200; // decel with heavy chug
    } else {
      currentRpm = 2000 - ((t - 6.8) / 1.2) * 1050; // idle 950
    }

    const fireFreq = (currentRpm / 60) * 2;
    phase += fireFreq / SAMPLE_RATE;
    subPhase += (fireFreq * 0.5) / SAMPLE_RATE;

    const pulse = cylinderPulse(phase);
    // XU7 signature: massive sub-bass and heavy 2nd harmonic torque pulse
    const heavyBass = Math.sin(subPhase * 2 * Math.PI) * 0.55;
    const lowMid = Math.sin(phase * 2 * Math.PI * 2) * 0.4;
    const midGrowl = Math.sin(phase * 2 * Math.PI * 3) * 0.2;

    const white = Math.random() * 2 - 1;
    noiseFilter = noiseFilter * 0.8 + white * 0.2;
    const airPuff = noiseFilter * (0.05 + (currentRpm / 6500) * 0.18);

    let tone = pulse * 0.6 + heavyBass * 0.45 + lowMid * 0.35 + midGrowl * 0.2 + airPuff;
    samples[i] = Math.tanh(tone * 1.65) * 0.82;
  }
  return samples;
}

/**
 * 8. Dena+ Turbo & Soren (EF7-Turbo Engine - 1.7L 16V TC)
 * German CVVT smooth 16V note + rising turbo spool whistle (1.8k-3.5k) + blow-off valve (BOV)
 */
function generateEf7TurboSound(durationSec = 8) {
  const numSamples = durationSec * SAMPLE_RATE;
  const samples = new Float32Array(numSamples);
  let phase = 0;
  let turboPhase = 0;
  let noiseFilter = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let currentRpm;
    if (t < 1.0) {
      currentRpm = 1050 + (t / 1.0) * 1150; // 1050 to 2200
    } else if (t < 3.6) {
      const p = (t - 1.0) / 2.6;
      currentRpm = 2200 + Math.pow(p, 1.4) * 4300; // boost spool up to 6500
    } else if (t < 5.0) {
      currentRpm = 6500 + Math.sin(t * 20) * 90;
    } else if (t < 6.6) {
      const p = (t - 5.0) / 1.6;
      currentRpm = 6500 - Math.pow(p, 0.7) * 4500;
    } else {
      currentRpm = 2000 - ((t - 6.6) / 1.4) * 950;
    }

    const fireFreq = (currentRpm / 60) * 2;
    phase += fireFreq / SAMPLE_RATE;

    // Turbo compressor spool frequency: sweeps from 1600 Hz up to 3400 Hz under boost
    const turboFreq = 1600 + Math.pow((currentRpm - 1000) / 5500, 1.5) * 1900;
    turboPhase += turboFreq / SAMPLE_RATE;
    const turboWhistle = Math.sin(turboPhase * 2 * Math.PI) * (0.15 + ((currentRpm - 1500) / 5000) * 0.3);

    // Blow-off valve (BOV) whoosh right on throttle release (t=5.0s - 5.6s)
    let bovSound = 0;
    if (t >= 5.0 && t <= 5.8) {
      const bovT = (t - 5.0) / 0.8;
      const bovNoise = (Math.random() * 2 - 1) * Math.exp(-bovT * 4.5);
      const flutter = Math.sin(bovT * 45 * Math.PI) * 0.5 + 0.5;
      bovSound = bovNoise * flutter * 0.65;
    }

    const engineTone =
      Math.sin(phase * 2 * Math.PI) * 0.45 +
      Math.sin(phase * 2 * Math.PI * 2) * 0.35 +
      Math.sin(phase * 2 * Math.PI * 4) * 0.18;

    const white = Math.random() * 2 - 1;
    noiseFilter = noiseFilter * 0.75 + white * 0.25;
    const airflow = noiseFilter * (0.06 + (currentRpm / 6500) * 0.22);

    let tone = engineTone * 0.6 + turboWhistle * 0.35 + bovSound + airflow;
    samples[i] = Math.tanh(tone * 1.5) * 0.8;
  }
  return samples;
}

/**
 * 9. Quick, Saina & Tiba (M15 Engine - 1.5L 8V)
 * Lively, snappy urban 8V sports muffler note, fast throttle blip resonance
 */
function generateQuickM15Sound(durationSec = 8) {
  const numSamples = durationSec * SAMPLE_RATE;
  const samples = new Float32Array(numSamples);
  let phase = 0;
  let noiseFilter = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let currentRpm;
    if (t < 0.8) {
      currentRpm = 1000 + (t / 0.8) * 1500; // fast throttle response
    } else if (t < 3.2) {
      const p = (t - 0.8) / 2.4;
      currentRpm = 2500 + Math.pow(p, 1.2) * 3300; // to 5800 RPM M15 limit
    } else if (t < 4.8) {
      currentRpm = 5800 + Math.sin(t * 30) * 100;
    } else if (t < 6.5) {
      const p = (t - 4.8) / 1.7;
      currentRpm = 5800 - Math.pow(p, 0.75) * 4200;
    } else {
      currentRpm = 1600 - ((t - 6.5) / 1.5) * 600;
    }

    const fireFreq = (currentRpm / 60) * 2;
    phase += fireFreq / SAMPLE_RATE;

    const pulse = cylinderPulse(phase);
    const midPunch = Math.sin(phase * 2 * Math.PI * 2) * 0.38 + Math.sin(phase * 2 * Math.PI * 3) * 0.24;

    const white = Math.random() * 2 - 1;
    noiseFilter = noiseFilter * 0.78 + white * 0.22;
    const gasRush = noiseFilter * (0.08 + (currentRpm / 6000) * 0.2);

    let tone = pulse * 0.62 + midPunch * 0.38 + gasRush;
    samples[i] = Math.tanh(tone * 1.55) * 0.78;
  }
  return samples;
}

/**
 * 10. Shahin Turbo (M15-T Engine - 1.5L Turbocharged)
 * Turbo spool with punchy gearshift overrun pops
 */
function generateShahinTurboSound(durationSec = 8) {
  const numSamples = durationSec * SAMPLE_RATE;
  const samples = new Float32Array(numSamples);
  let phase = 0;
  let turboPhase = 0;
  let noiseFilter = 0;

  // Pre-schedule gearshift pops
  const popTimes = [4.9, 5.3, 5.8, 6.2];

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let currentRpm;
    if (t < 1.0) {
      currentRpm = 1100 + (t / 1.0) * 1100;
    } else if (t < 3.4) {
      const p = (t - 1.0) / 2.4;
      currentRpm = 2200 + Math.pow(p, 1.35) * 3800; // to 6000
    } else if (t < 4.8) {
      currentRpm = 6000 + Math.sin(t * 22) * 80;
    } else if (t < 6.6) {
      const p = (t - 4.8) / 1.8;
      currentRpm = 6000 - Math.pow(p, 0.7) * 4400;
    } else {
      currentRpm = 1600 - ((t - 6.6) / 1.4) * 500;
    }

    const fireFreq = (currentRpm / 60) * 2;
    phase += fireFreq / SAMPLE_RATE;

    const turboFreq = 1400 + Math.pow((currentRpm - 1000) / 5000, 1.4) * 1600;
    turboPhase += turboFreq / SAMPLE_RATE;
    const turboWhistle = Math.sin(turboPhase * 2 * Math.PI) * (0.12 + (currentRpm / 6000) * 0.25);

    let popSound = 0;
    for (const pt of popTimes) {
      if (t >= pt && t < pt + 0.12) {
        const dt = t - pt;
        popSound += (Math.random() * 2 - 1) * Math.exp(-dt * 40) * 0.7;
      }
    }

    const engineTone =
      Math.sin(phase * 2 * Math.PI) * 0.5 +
      Math.sin(phase * 2 * Math.PI * 2) * 0.32 +
      Math.sin(phase * 2 * Math.PI * 3) * 0.2;

    const white = Math.random() * 2 - 1;
    noiseFilter = noiseFilter * 0.75 + white * 0.25;
    const rush = noiseFilter * (0.07 + (currentRpm / 6000) * 0.2);

    let tone = engineTone * 0.58 + turboWhistle * 0.3 + popSound + rush;
    samples[i] = Math.tanh(tone * 1.55) * 0.8;
  }
  return samples;
}

/**
 * 11. Pride Racing (B3 Upgraded Race Engine - 1.3L)
 * Aggressive high-rev straight-pipe rasp, buzzy mechanical ring
 */
function generatePrideB3Sound(durationSec = 8) {
  const numSamples = durationSec * SAMPLE_RATE;
  const samples = new Float32Array(numSamples);
  let phase = 0;
  let noiseFilter = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let currentRpm;
    if (t < 0.7) {
      currentRpm = 1200 + (t / 0.7) * 2000; // ultra fast throttle
    } else if (t < 3.2) {
      const p = (t - 0.7) / 2.5;
      currentRpm = 3200 + Math.pow(p, 1.1) * 3600; // rev up to 6800 race B3
    } else if (t < 4.8) {
      currentRpm = 6800 + Math.sin(t * 40) * 150;
    } else if (t < 6.4) {
      const p = (t - 4.8) / 1.6;
      currentRpm = 6800 - Math.pow(p, 0.8) * 4800;
    } else {
      currentRpm = 2000 - ((t - 6.4) / 1.6) * 800;
    }

    const fireFreq = (currentRpm / 60) * 2;
    phase += fireFreq / SAMPLE_RATE;

    const pulse = cylinderPulse(phase);
    // B3 race rasp: buzzy high-frequency pipe harmonics
    const buzz =
      Math.sin(phase * 2 * Math.PI * 2) * 0.35 +
      Math.sin(phase * 2 * Math.PI * 4) * 0.28 +
      Math.sin(phase * 2 * Math.PI * 6) * 0.22 +
      Math.sin(phase * 2 * Math.PI * 8) * 0.15;

    const white = Math.random() * 2 - 1;
    noiseFilter = noiseFilter * 0.68 + white * 0.32;
    const raceHiss = noiseFilter * (0.09 + (currentRpm / 7000) * 0.3);

    let tone = pulse * 0.5 + buzz * 0.45 + raceHiss;
    samples[i] = Math.tanh(tone * 1.7) * 0.8;
  }
  return samples;
}

/**
 * 12. Genesis Coupe & Maxima (V6 24V Racing Engine - 3.8L / 3.0L)
 * 6-cylinder firing frequency (3 pulses per crankshaft revolution!), glorious brassy howl up to 7200 RPM
 */
function generateV6RacingSound(durationSec = 8) {
  const numSamples = durationSec * SAMPLE_RATE;
  const samples = new Float32Array(numSamples);
  let phase = 0;
  let subPhase = 0;
  let noiseFilter = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let currentRpm;
    if (t < 1.0) {
      currentRpm = 850 + (t / 1.0) * 1650; // 850 to 2500
    } else if (t < 3.6) {
      const p = (t - 1.0) / 2.6;
      currentRpm = 2500 + Math.pow(p, 1.35) * 4700; // roar to 7200 RPM V6 redline
    } else if (t < 5.0) {
      currentRpm = 7200 + Math.sin(t * 24) * 110;
    } else if (t < 6.8) {
      const p = (t - 5.0) / 1.8;
      currentRpm = 7200 - Math.pow(p, 0.75) * 5500;
    } else {
      currentRpm = 1700 - ((t - 6.8) / 1.2) * 850;
    }

    // 6-cylinder engine: firing frequency = (RPM / 60) * 3 pulses/sec!
    const fireFreq = (currentRpm / 60) * 3;
    phase += fireFreq / SAMPLE_RATE;
    subPhase += (fireFreq / 3) / SAMPLE_RATE;

    const pulse = cylinderPulse(phase);
    // V6 signature: deep multi-cylinder brassy howl with rich harmonic depth
    const subBass = Math.sin(subPhase * 2 * Math.PI) * 0.4;
    const v6Howl =
      Math.sin(phase * 2 * Math.PI * 2) * 0.35 +
      Math.sin(phase * 2 * Math.PI * 3) * 0.3 +
      Math.sin(phase * 2 * Math.PI * 4) * 0.18 +
      Math.sin(phase * 2 * Math.PI * 6) * 0.12;

    const white = Math.random() * 2 - 1;
    noiseFilter = noiseFilter * 0.74 + white * 0.26;
    const gasRush = noiseFilter * (0.07 + (currentRpm / 7500) * 0.26);

    let tone = pulse * 0.52 + subBass * 0.35 + v6Howl * 0.42 + gasRush;
    samples[i] = Math.tanh(tone * 1.55) * 0.85;
  }
  return samples;
}

// Ensure output directory exists
const outDir = path.resolve(__dirname, '../public/audio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('🏁 Generating high-fidelity automotive engine & exhaust audio recordings...');

// 1. HKS Open Silencer
const openSamples = generateHksOpenSilencer(8);
const openWav = createWavBuffer(openSamples);
fs.writeFileSync(path.join(outDir, 'hks-open-silencer.wav'), openWav);
console.log('✅ Created: hks-open-silencer.wav (سایلنسر باز ریسینگ)');

// 2. HKS Closed Silencer
const closedSamples = generateHksClosedSilencer(8);
const closedWav = createWavBuffer(closedSamples);
fs.writeFileSync(path.join(outDir, 'hks-closed-silencer.wav'), closedWav);
console.log('✅ Created: hks-closed-silencer.wav (سایلنسر بسته شهری)');

// 3. HKS Pop & Bang / Backfire
const popSamples = generateHksPopBang(8);
const popWav = createWavBuffer(popSamples);
fs.writeFileSync(path.join(outDir, 'hks-pop-bang.wav'), popWav);
console.log('✅ Created: hks-pop-bang.wav (کات‌آف و بک‌فایر پاپ اند بنگ)');

// 4. K&N Intake Acceleration
const intakeAccSamples = generateKnIntakeAcceleration(7.5);
const intakeAccWav = createWavBuffer(intakeAccSamples);
fs.writeFileSync(path.join(outDir, 'kn-intake-acceleration.wav'), intakeAccWav);
console.log('✅ Created: kn-intake-acceleration.wav (مکش هوای متراکم در تخته گاز)');

// 5. K&N Intake Rev
const intakeRevSamples = generateKnIntakeRev(6);
const intakeRevWav = createWavBuffer(intakeRevSamples);
fs.writeFileSync(path.join(outDir, 'kn-intake-rev.wav'), intakeRevWav);
console.log('✅ Created: kn-intake-rev.wav (گاز هرز و کات‌آف مکش)');

// 6. Peugeot 206/207 TU5
const tu5Samples = generateTu5Sound(8);
fs.writeFileSync(path.join(outDir, 'car-tu5.wav'), createWavBuffer(tu5Samples));
console.log('✅ Created: car-tu5.wav (پژو ۲۰۶ و ۲۰۷ موتور TU5)');

// 7. Peugeot Pars / XU7 / XUM
const xu7Samples = generateXu7Sound(8);
fs.writeFileSync(path.join(outDir, 'car-xu7.wav'), createWavBuffer(xu7Samples));
console.log('✅ Created: car-xu7.wav (پژو پارس و سمند موتور XU7/XUM)');

// 8. Dena+ Turbo / EF7 Turbo
const ef7Samples = generateEf7TurboSound(8);
fs.writeFileSync(path.join(outDir, 'car-ef7-turbo.wav'), createWavBuffer(ef7Samples));
console.log('✅ Created: car-ef7-turbo.wav (دنا پلاس و سورن توربو EF7)');

// 9. Quick & Saina M15
const quickSamples = generateQuickM15Sound(8);
fs.writeFileSync(path.join(outDir, 'car-quick-m15.wav'), createWavBuffer(quickSamples));
console.log('✅ Created: car-quick-m15.wav (کوییک و ساینا موتور M15)');

// 10. Shahin Turbo M15-T
const shahinSamples = generateShahinTurboSound(8);
fs.writeFileSync(path.join(outDir, 'car-shahin-turbo.wav'), createWavBuffer(shahinSamples));
console.log('✅ Created: car-shahin-turbo.wav (شاهین توربو موتور M15-T)');

// 11. Pride Racing B3
const prideSamples = generatePrideB3Sound(8);
fs.writeFileSync(path.join(outDir, 'car-pride.wav'), createWavBuffer(prideSamples));
console.log('✅ Created: car-pride.wav (پراید ریسی موتور B3)');

// 12. V6 Racing (Genesis Coupe / Maxima)
const v6Samples = generateV6RacingSound(8);
fs.writeFileSync(path.join(outDir, 'car-v6-racing.wav'), createWavBuffer(v6Samples));
console.log('✅ Created: car-v6-racing.wav (موتور ۶ سیلندر V6 24V جنسیس/ماکسیما)');

console.log('🚀 All authentic vehicle engine audio tracks generated successfully in frontend/public/audio!');
