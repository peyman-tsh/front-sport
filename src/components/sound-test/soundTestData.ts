export interface VehicleProfile {
  id: string;
  name: string;
  engine: string;
  audioUrl: string;
  idleRpm: number;
  maxRpm: number;
  redlineRpm: number;
  tag: string;
  badgeColor: string;
  description: string;
}

export const VEHICLE_PROFILES: VehicleProfile[] = [
  {
    id: 'tu5',
    name: 'پژو ۲۰۶ و ۲۰۷ (موتور TU5)',
    engine: '1.6L 16V DOHC - 105 اسب‌بخار',
    audioUrl: '/audio/car-tu5.wav',
    idleRpm: 1000,
    maxRpm: 7000,
    redlineRpm: 6500,
    tag: '۱۶ سوپاپ دوربالا',
    badgeColor: 'amber',
    description: 'غرش تیز و فلزی فرانسوی با کات‌آف زنده در ۶۸۰۰ دور در دقیقه',
  },
  {
    id: 'xu7',
    name: 'پژو پارس و سمند (موتور XU7 / XUM)',
    engine: '1.8L-2.0L 8V SOHC - گشتاور بالا',
    audioUrl: '/audio/car-xu7.wav',
    idleRpm: 950,
    maxRpm: 6500,
    redlineRpm: 6000,
    tag: 'بم و پرحجم',
    badgeColor: 'sky',
    description: 'صدای بم پرحجم با ویبره عمیق بدنه و طنین لرزاننده ۸ سوپاپ',
  },
  {
    id: 'ef7-turbo',
    name: 'دنا پلاس و سورن توربو (موتور EF7-TC)',
    engine: '1.7L 16V CVVT Turbo - 150 اسب‌بخار',
    audioUrl: '/audio/car-ef7-turbo.wav',
    idleRpm: 1000,
    maxRpm: 6800,
    redlineRpm: 6300,
    tag: 'سوت بوست توربو + BOV',
    badgeColor: 'amber',
    description: 'سوت تیز پره‌های توربوشارژر و صدای تخلیه هوای بلوآف در رها کردن گاز',
  },
  {
    id: 'quick-m15',
    name: 'کوییک، ساینا و تیبا (موتور M15)',
    engine: '1.5L 8V - مصرف بهینه و چابک',
    audioUrl: '/audio/car-quick-m15.wav',
    idleRpm: 1000,
    maxRpm: 6200,
    redlineRpm: 5600,
    tag: 'اسپرت شهری چابک',
    badgeColor: 'sky',
    description: 'رزونانس اسپرت منبع اگزوز با پاسخ پدال تند و تیز شهری',
  },
  {
    id: 'shahin-turbo',
    name: 'شاهین توربو (موتور M15-T)',
    engine: '1.5L 8V Turbocharged - بوست بالا',
    audioUrl: '/audio/car-shahin-turbo.wav',
    idleRpm: 1050,
    maxRpm: 6500,
    redlineRpm: 5800,
    tag: 'توربوشارژ با بک‌فایر',
    badgeColor: 'amber',
    description: 'صدای جریان هوای تحت فشار توربو همراه با تقه و پاپ‌های اگزوز',
  },
  {
    id: 'pride-b3',
    name: 'پراید ریسی (موتور ارتقایافته B3)',
    engine: '1.3L High-Compression Race Spec',
    audioUrl: '/audio/car-pride.wav',
    idleRpm: 1100,
    maxRpm: 7200,
    redlineRpm: 6600,
    tag: 'استریت و درگ ریسینگ',
    badgeColor: 'sky',
    description: 'صدای تند لوله‌مستقیم ریسی با دورگیری فوق‌العاده سریع و کات‌آف وحشی',
  },
  {
    id: 'v6-racing',
    name: 'هیوندای جنسیس کوپه و ماکسیما (موتور V6)',
    engine: '3.8L / 3.0L 24V DOHC 6-Cylinder',
    audioUrl: '/audio/car-v6-racing.wav',
    idleRpm: 850,
    maxRpm: 7500,
    redlineRpm: 7000,
    tag: 'سمفونی ۶ سیلندر V6',
    badgeColor: 'amber',
    description: 'غرش سمفونیک ۳ فایر در هر دور میل‌لنگ تا ۷۲۰۰ دور بر دقیقه',
  },
];
