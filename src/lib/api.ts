import { Product, CarBulbSpec } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

// Fallback dataset for Next.js SSR / build time if backend is not started yet
export const FALLBACK_PRODUCTS: Product[] = [
  {
    _id: 'prod-1',
    title: 'کیت مکش هوای خنک استیل ۳۰۴ K&N با فیلتر مخروطی توربوشارژ',
    slug: 'kn-cold-air-intake-tu5',
    brand: 'K&N',
    category: 'سیستم اگزوز و مکش',
    material: 'استیل ضد زنگ تایوان گرید ۳۰۴ با ضخامت ۱.۵ میلی‌متر',
    price: 1850000,
    originalPrice: 2200000,
    stock: 28,
    isAvailable: true,
    warrantyMonths: 18,
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.96,
    reviewsCount: 142,
    shortDescription: 'افزایش چشمگیر شتاب اولیه، رفع کپ پدال گاز و ایجاد صدای بم و پرطنین ورودی موتور',
    description: `کیت مکش کامل حرفه‌ای همراه لوله استیل صیقلی بدون درز با خم CNC، بست‌های تقویت شده، شلنگ‌های سیلیکونی ۴ لایه حرارتی و فیلتر شستشوپذیر نانو با مش سیمی. 
این کیت هوای خنک متراکم را از پشت جلوپنجره مستقیماً وارد دریچه گاز کرده و توان خروجی را بین ۴ الی ۷ اسب بخار ارتقاء می‌دهد.`,
    compatibility: [
      { carMake: 'ایران خودرو', carModel: 'پژو 206 (تیپ ۲ و ۵)', position: 'محفظه موتور - مانیفولد هوا' },
      { carMake: 'ایران خودرو', carModel: 'پژو 207', position: 'محفظه موتور - مانیفولد هوا' },
      { carMake: 'ایران خودرو', carModel: 'پژو پارس (پرشیا)', position: 'محفظه موتور - مانیفولد هوا' },
      { carMake: 'ایران خودرو', carModel: 'دنا و دنا پلاس', position: 'محفظه موتور - مانیفولد هوا' },
      { carMake: 'ایران خودرو', carModel: 'تارا (Tara)', position: 'محفظه موتور - مانیفولد هوا' },
      { carMake: 'سایپا', carModel: 'کوییک (Quick)', position: 'محفظه موتور - مانیفولد هوا' },
    ],
    seo: {
      metaTitle: 'خرید کیت مکش استیل K&N پژو ۲۰۶، ۲۰۷، پارس و دنا | افزایش شتاب',
      metaDescription: 'کیت مکش هوای خنک استیل ۳۰۴ اصل همراه فیلتر قابل شستشو برای موتورهای TU5 و EF7 با ارسال فوری و گارانتی ۱۸ ماهه.',
      keywords: ['کیت مکش پژو', 'کیت مکش استیل K&N', 'تیونینگ موتور ۲۰۶', 'لوازم اسپرت ماشین'],
    },
    soundClips: [
      {
        title: 'غرش مکش هوای متراکم در تخته گاز و شتاب اولیه',
        mode: 'غرش مکش هوا',
        carModel: 'پژو ۲۰۶ تیپ ۵ (موتور TU5)',
        durationSeconds: 16,
        engineRpm: 5800,
        soundType: 'intake',
        audioUrl: '/audio/kn-intake-acceleration.wav',
      },
      {
        title: 'صدای وکیوم هوای ورودی هنگام گاز خلاص و کات‌آف',
        mode: 'گاز خلاص و کات‌آف',
        carModel: 'پژو ۲۰۷ MC',
        durationSeconds: 12,
        engineRpm: 6400,
        soundType: 'intake',
        audioUrl: '/audio/kn-intake-rev.wav',
      },
    ],
    videoDemoUrl: 'https://www.aparat.com/v/kn-intake-dyno-test',
    salesCount: 420,
    isFeatured: true,
  },
  {
    _id: 'prod-2',
    title: 'منبع اگزوز اسپرت سایلنسردار HKS تمام استیل هفت‌رنگ مدل Hi-Power',
    slug: 'hks-hi-power-exhaust-muffler',
    brand: 'HKS',
    category: 'سیستم اگزوز و مکش',
    material: 'استیلنس استیل ۳۰۴ با آبکاری تیتانیوم هفت‌رنگ مقاوم به حرارت',
    price: 2650000,
    originalPrice: 3100000,
    stock: 20,
    isAvailable: true,
    warrantyMonths: 24,
    images: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.91,
    reviewsCount: 88,
    shortDescription: 'صدای باس و غرّش قدرتمند ریسینگ با کلید مکانیکی سایلنسر برای تنظیم و قطع صدا در شهر',
    description: `منبع اگزوز اسپرت حرفه‌ای برند ژاپنی HKS تیپ Hi-Power. ساخته شده از ورقه استیل ضد زنگ ضخیم با پروانه داخلی هدایت گازها و پشم سنگ نسوز آلمانی. دارای سر اگزوز سرامیک تیتانیوم هفت‌رنگ مقاوم به حرارت ۱۰۰۰ درجه. مجهز به سایلنسر دستی که به شما اجازه می‌دهد در سفرهای شهری صدا را به حالت استاندارد درآورید.`,
    compatibility: [
      { carMake: 'ایران خودرو', carModel: 'پژو 206 (تیپ ۲ و ۵)', position: 'انتهای خط اگزوز' },
      { carMake: 'ایران خودرو', carModel: 'پژو 207', position: 'انتهای خط اگزوز' },
      { carMake: 'ایران خودرو', carModel: 'پژو پارس (پرشیا)', position: 'انتهای خط اگزوز' },
      { carMake: 'سایپا', carModel: 'کوییک (Quick)', position: 'انتهای خط اگزوز' },
      { carMake: 'سایپا', carModel: 'شاهین (Shahin)', position: 'انتهای خط اگزوز' },
    ],
    seo: {
      metaTitle: 'خرید منبع اگزوز اسپرت HKS سایلنسردار هفت رنگ استیل ۳۰۴',
      metaDescription: 'منبع اگزوز حرفه‌ای HKS سایلنسردار تمام استیل، مناسب تمامی خودروهای داخلی و اسپرت با صدای فوق العاده بم و خفه کن پیچ و مهره ای.',
      keywords: ['منبع اگزوز HKS', 'اگزوز اسپرت سایلنسردار', 'سر اگزوز هفت رنگ'],
    },
    soundClips: [
      {
        title: 'حالت سایلنسر باز (غرش ریسینگ و دور موتور بالا)',
        mode: 'سایلنسر باز',
        carModel: 'پژو ۲۰۶ تیپ ۵ (موتور TU5)',
        durationSeconds: 18,
        engineRpm: 6800,
        soundType: 'exhaust',
        audioUrl: '/audio/hks-open-silencer.wav',
      },
      {
        title: 'حالت سایلنسر بسته (صدای شهری نرم و فابریک)',
        mode: 'سایلنسر بسته',
        carModel: 'پژو ۲۰۶ تیپ ۵ (موتور TU5)',
        durationSeconds: 15,
        engineRpm: 3000,
        soundType: 'exhaust',
        audioUrl: '/audio/hks-closed-silencer.wav',
      },
      {
        title: 'شتاب‌گیری تخته‌گاز و کات‌آف رگباری (Backfire & Pops)',
        mode: 'کات‌آف و بک‌فایر',
        carModel: 'پژو پارس موتور زانتیا (XUM)',
        durationSeconds: 20,
        engineRpm: 7200,
        soundType: 'exhaust',
        audioUrl: '/audio/hks-pop-bang.wav',
      },
    ],
    videoDemoUrl: 'https://www.aparat.com/v/hks-hi-power-exhaust-sound-test',
    salesCount: 310,
    isFeatured: true,
  },
  {
    _id: 'prod-3',
    title: 'کیت کمک فنر اسپرت KDS روغنی-گازی با فنر لول لنزو برای پژو ۲۰۶ و ۲۰۷',
    slug: 'kds-sport-suspension-peugeot-206',
    brand: 'KDS',
    category: 'سیستم تعلیق و فنربندی',
    material: 'آلیاژ فولاد فنر سیلیسیوم کروم سخت‌کاری شده',
    price: 4900000,
    originalPrice: 5600000,
    stock: 14,
    isAvailable: true,
    warrantyMonths: 12,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.94,
    reviewsCount: 110,
    shortDescription: 'کاهش ارتفاع استاندارد ۳ تا ۵ انگشت، افزایش چسبندگی پیچ‌ها و حذف گیجی و تکان‌های اتاق',
    description: `کیت کامل تعلیق اسپرت برند معتبر KDS کره همراه با فنر لول‌های قرمز رنگ لنزو. این کیت بدون کوبش‌های آزاردهنده شهری، خودروی شما را استوار و پایدار ساخته و چسبندگی چرخ‌ها را در مانورها و پیچ‌های تند چند برابر می‌کند.`,
    compatibility: [
      { carMake: 'ایران خودرو', carModel: 'پژو 206 (تیپ ۲ و ۵)', position: 'محور جلو و عقب' },
      { carMake: 'ایران خودرو', carModel: 'پژو 207', position: 'محور جلو و عقب' },
      { carMake: 'ایران خودرو', carModel: 'رانا و رانا پلاس', position: 'محور جلو و عقب' },
    ],
    seo: {
      metaTitle: 'خرید کمک فنر اسپرت KDS کره با فنر لنزو پژو ۲۰۶ و ۲۰۷ | قیمت دست کامل',
      metaDescription: 'کمک اسپرت روغنی گازی KDS کره ای اصل بدون کوبش با فنر ریس لنزو برای تنظیم ارتفاع پژو ۲۰۶ و ۲۰۷ با گارانتی شرکتی.',
      keywords: ['کمک اسپرت KDS', 'ارتفاع پژو 206', 'فنر لول لنزو', 'تیونینگ تعلیق'],
    },
    salesCount: 180,
    isFeatured: true,
  },
  {
    _id: 'prod-4',
    title: 'لیپ سپر جلو سه تکه یونیورسال فیبر کربن سامورایی با شمش استیل',
    slug: 'universal-samurai-carbon-front-lip',
    brand: 'Samurai Sport',
    category: 'کیت بدنه و آیرودینامیک',
    material: 'پلی‌اورتان تقویت شده ABS انعطاف‌پذیر با روکش هیدروگرافی فیبر کربن',
    price: 1350000,
    originalPrice: 1650000,
    stock: 35,
    isAvailable: true,
    warrantyMonths: 6,
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.88,
    reviewsCount: 95,
    shortDescription: 'نمای تهاجمی و خشن جلوی خودرو، ایجاد نیروی رو به پایین Downforce و محافظت از زیر سپر',
    description: `لیپ سپر سه تکه طرح کربن براق سامورایی با قابلیت تنظیم زاویه و عرض برای انواع خودروها. این قطعه علاوه بر ارتقاء جلوه اسپرت بدنه خودرو، در سرعت‌های بالا با هدایت جریان هوا تعادل آیرودینامیکی دماغه را بهبود می‌بخشد.`,
    compatibility: [
      { carMake: 'ایران خودرو', carModel: 'پژو 206 (تیپ ۲ و ۵)', position: 'لبه زیرین سپر جلو' },
      { carMake: 'ایران خودرو', carModel: 'پژو 207', position: 'لبه زیرین سپر جلو' },
      { carMake: 'ایران خودرو', carModel: 'پژو پارس (پرشیا)', position: 'لبه زیرین سپر جلو' },
      { carMake: 'ایران خودرو', carModel: 'دنا و دنا پلاس', position: 'لبه زیرین سپر جلو' },
      { carMake: 'ایران خودرو', carModel: 'تارا (Tara)', position: 'لبه زیرین سپر جلو' },
      { carMake: 'سایپا', carModel: 'کوییک (Quick)', position: 'لبه زیرین سپر جلو' },
      { carMake: 'سایپا', carModel: 'شاهین (Shahin)', position: 'لبه زیرین سپر جلو' },
    ],
    seo: {
      metaTitle: 'خرید لیپ سپر جلو طرح کربن سه تکه یونیورسال سامورایی',
      metaDescription: 'لیپ زیر سپر سه تکه کربن نشکن مناسب انواع خودرو با پیچ و رولپلاک نصب و قابلیت تنظیم زاویه، ارسال سریع به سراسر ایران.',
      keywords: ['لیپ سپر 206', 'لیپ سپر کربن', 'لوازم بدنه اسپرت', 'اسپویلر جلو'],
    },
    salesCount: 290,
    isFeatured: true,
  },
  {
    _id: 'prod-5',
    title: 'هدلایت کانپکس Conpex M8 Pro پایه H7 توربو ۳ لول مس ۱۴۰ وات',
    slug: 'conpex-m8-pro-h7',
    brand: 'Conpex',
    category: 'روشنایی و هدلایت',
    material: 'آلومینیوم هوانوردی 6063 + لوله‌های خنک‌کننده مس خالص',
    socketType: 'H7',
    price: 2450000,
    originalPrice: 2890000,
    stock: 45,
    isAvailable: true,
    wattage: 140,
    lumens: 32000,
    colorTemperature: 6000,
    chipType: 'Custom CSP Pro 4575 Chipset',
    coolingType: 'سه لوله خلاء مسی ضخیم + توربو فن بلبرینگی ۱۲۰۰۰ دور ژاپنی',
    hasCanbus: true,
    warrantyMonths: 18,
    images: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.95,
    reviewsCount: 168,
    shortDescription: 'پرچمدار روشنایی اسپرت با خط کات بی‌نظیر، پرتاب نور ۴۵۰ متری و بدون خطا در کامپیوتر خودرو',
    description: `هدلایت کانپکس مدل M8 Pro پرچمدار سیستم‌های روشنایی خودرو با فناوری منحصر به فرد سه‌گانه لوله‌های مسی انتقال حرارت، توانسته حرارت چیپ‌های CSP Pro سفارشی را در کسری از ثانیه دفع کند.`,
    compatibility: [
      { carMake: 'ایران خودرو', carModel: 'پژو 206 (تیپ ۲ و ۵)', position: 'نور پایین (پایه H7)' },
      { carMake: 'ایران خودرو', carModel: 'پژو 207', position: 'نور پایین (پایه H7)' },
      { carMake: 'ایران خودرو', carModel: 'دنا و دنا پلاس', position: 'نور پایین (پایه H7)' },
      { carMake: 'ایران خودرو', carModel: 'تارا (Tara)', position: 'نور پایین (پایه H7)' },
      { carMake: 'سایپا', carModel: 'کوییک (Quick)', position: 'نور پایین (پایه H7)' },
    ],
    seo: {
      metaTitle: 'خرید هدلایت کانپکس Conpex M8 Pro پایه H7 | گارانتی ۱۸ ماهه طلایی',
      metaDescription: 'بهترین قیمت خرید هدلایت کانپکس M8 Pro پایه H7 با توان ۱۴۰ وات و چیپست CSP Pro، بدون ارور کنباس برای پژو ۲۰۶، ۲۰۷، دنا پلاس و تارا با ارسال فوری.',
      keywords: ['هدلایت کانپکس', 'هدلایت M8 Pro', 'هدلایت H7 پژو 206', 'قوی ترین هدلایت خودرو'],
    },
    salesCount: 342,
    isFeatured: true,
  },
  {
    _id: 'prod-6',
    title: 'غربیلک فرمان اسپرت D-Cut چرم طبیعی OMP مسابقه‌ای با دوخت زرد',
    slug: 'omp-d-cut-sport-steering-wheel',
    brand: 'OMP Racing',
    category: 'تزئینات و کابین اسپرت',
    material: 'آلومینیوم آنودایز مشکی مات + روکش چرم طبیعی ناپا با دوخت دست‌دوز زرد مسابقه‌ای',
    price: 3200000,
    originalPrice: 3800000,
    stock: 12,
    isAvailable: true,
    warrantyMonths: 24,
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.97,
    reviewsCount: 64,
    shortDescription: 'ارگونومی فوق‌العاده با طراحی دی کات برای چرخش سریع، تسلط کامل در دریفت و پیست',
    description: `فرمان مسابقه‌ای OMP ایتالیا مدل D-Cut، طراحی شده برای کنترل حداکثری و افزایش فضای پای راننده. استفاده از چرم سوراخ‌دار ضد تعریق با پد داخلی فشرده احساس لمسی اسپرت بی‌نظیری در هر بار پیچیدن به همراه دارد.`,
    compatibility: [
      { carMake: 'ایران خودرو', carModel: 'پژو 206 (تیپ ۲ و ۵)', position: 'کابین خودرو (با توپی فرمان اسپرت)' },
      { carMake: 'ایران خودرو', carModel: 'پژو پارس (پرشیا)', position: 'کابین خودرو (با توپی فرمان اسپرت)' },
      { carMake: 'سایپا', carModel: 'پراید ۱۳۱ / صبا', position: 'کابین خودرو (با توپی فرمان اسپرت)' },
    ],
    seo: {
      metaTitle: 'خرید غربیلک فرمان اسپرت دی کات OMP چرم طبیعی | مسابقه‌ای',
      metaDescription: 'فرمان مسابقه ای اسپرت OMP D-Cut اصل، چرم دست دوز با نشانگر خط مرکزی زرد مناسب انواع خودروهای تیونینگ.',
      keywords: ['فرمان اسپرت', 'فرمان D Cut', 'فرمان OMP اصل', 'تیونینگ کابین خودرو'],
    },
    salesCount: 120,
    isFeatured: true,
  },
  {
    _id: 'prod-7',
    title: 'بال عقب اسپرت صندوق طرح کربن M-Performance یونیورسال پایه کوتاه',
    slug: 'm-performance-universal-rear-spoiler',
    brand: 'M-Performance',
    category: 'کیت بدنه و آیرودینامیک',
    material: 'کربن فایبرگلاس تقویت شده چندلایه با پولیش UV ضد آفتاب سوختگی',
    price: 2150000,
    originalPrice: 2500000,
    stock: 19,
    isAvailable: true,
    warrantyMonths: 12,
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.89,
    reviewsCount: 78,
    shortDescription: 'جلوه اسپرت بی‌نظیر صندوق عقب، افزایش چسبندگی انتهای خودرو در سرعت‌های بالاتر از ۱۰۰ کیلومتر',
    description: `اسپویلر بال صندوق طرح فیبر کربن M-Performance با چسبندگی آیرودینامیک و پایه‌های آلومینیومی مستحکم. نصب آسان با چسب دوطرفه صنعتی 3M و بست بدون آسیب به رنگ بدنه.`,
    compatibility: [
      { carMake: 'ایران خودرو', carModel: 'پژو پارس (پرشیا)', position: 'درب صندوق عقب' },
      { carMake: 'ایران خودرو', carModel: 'دنا و دنا پلاس', position: 'درب صندوق عقب' },
      { carMake: 'ایران خودرو', carModel: 'تارا (Tara)', position: 'درب صندوق عقب' },
      { carMake: 'سایپا', carModel: 'شاهین (Shahin)', position: 'درب صندوق عقب' },
    ],
    seo: {
      metaTitle: 'خرید بال عقب اسپرت صندوق طرح کربن M-Performance | اسپویلر خودرو',
      metaDescription: 'اسپویلر بال صندوق طرح کربن با مقاومت بالا و ضد خش، مناسب برای پژو پارس، دنا، تارا و شاهین با ارسال رایگان.',
      keywords: ['بال عقب دنا', 'اسپویلر صندوق پارس', 'بال عقب کربن', 'لوازم اسپرت بدنه'],
    },
    salesCount: 165,
    isFeatured: true,
  },
  {
    _id: 'prod-8',
    title: 'استرس‌بار فولادی تقویت شاسی HP Design دنا، سمند و سورن پلاس',
    slug: 'hp-design-strut-bar-dena-samand',
    brand: 'HP Design',
    category: 'سیستم تعلیق و فنربندی',
    material: 'لوله فولادی بدون درز مانیسمان با پایه‌های برش لیزری CNC و رنگ کوره‌ای زرد',
    price: 1450000,
    originalPrice: 1750000,
    stock: 25,
    isAvailable: true,
    warrantyMonths: 36,
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.93,
    reviewsCount: 82,
    shortDescription: 'اتصال سرکمک‌ها برای دفع لرزش اتاق، جلوگیری از گیجی فرمان و پایداری در پیچ‌های پرسرعت',
    description: `میله تعادل شاسی (استرس‌بار) برند اچ‌پی دیزاین، با اتصال مستقیم دو سر کمک‌های جلو، مانع از دفرمه شدن هندسه فنربندی در پیچ‌های تند می‌شود. عمر قطعات جلوبندی را افزایش داده و دقت فرمان‌پذیری را به صورت محسوس بالا می‌برد.`,
    compatibility: [
      { carMake: 'ایران خودرو', carModel: 'دنا و دنا پلاس', position: 'محفظه موتور - بین دو سر کمک' },
      { carMake: 'ایران خودرو', carModel: 'سمند و سورن پلاس', position: 'محفظه موتور - بین دو سر کمک' },
    ],
    seo: {
      metaTitle: 'خرید استرس بار فولادی دنا و سمند HP Design | میله تعادل جلو',
      metaDescription: 'استرس بار تقویت شاسی دنا و سمند برند HP Design با گارانتی مادام العمر جوش و شکستگی، نصب آسان بدون سوراخکاری.',
      keywords: ['استرس بار دنا', 'میله تعادل سمند', 'تقویت شاسی خودرو', 'جلوبندی اسپرت'],
    },
    salesCount: 210,
    isFeatured: true,
  },
];

export const CAR_SPECS_DATA: CarBulbSpec[] = [
  {
    carMake: 'ایران خودرو',
    carModel: 'پژو 206 (تیپ ۲ و ۵)',
    lowBeam: 'H7',
    highBeam: 'H1',
    fogLight: 'H1',
    notes: 'پشتیبانی از انواع کیت مکش K&N، کمک اسپرت KDS، لیپ سامورایی و منبع HKS',
  },
  {
    carMake: 'ایران خودرو',
    carModel: 'پژو 207',
    lowBeam: 'H7',
    highBeam: 'H1',
    fogLight: 'H11',
    notes: 'طیف کامل کیت بدنه، اسپویلر سقف، کیت مکش استیل و سیستم تعلیق اسپرت',
  },
  {
    carMake: 'ایران خودرو',
    carModel: 'پژو پارس (پرشیا)',
    lowBeam: 'H7',
    highBeam: 'H7',
    fogLight: 'H3',
    notes: 'سازگار با هدرز، کیت مکش استیل، بال صندوق M و منبع اگزوز اسپرت',
  },
  {
    carMake: 'ایران خودرو',
    carModel: 'دنا و دنا پلاس',
    lowBeam: 'H7',
    highBeam: 'H1',
    fogLight: 'H1',
    notes: 'دارای استرس‌بار اختصاصی شاسی، لیپ سپر، کیت مکش توربو و هدلایت‌های کانپکس',
  },
  {
    carMake: 'ایران خودرو',
    carModel: 'تارا (Tara)',
    lowBeam: 'H7',
    highBeam: 'H1',
    fogLight: 'H16',
    notes: 'کیت مکش هوای خنک، لیپ سپر سه تکه و سیستم روشنایی سازگار با کن‌باس',
  },
  {
    carMake: 'سایپا',
    carModel: 'کوییک (Quick)',
    lowBeam: 'H7',
    highBeam: 'H1',
    fogLight: 'H1',
    notes: 'کیت مکش اسپرت، استرس‌بار، منبع اگزوز دولول و دکوراتیو کابین',
  },
  {
    carMake: 'سایپا',
    carModel: 'شاهین (Shahin)',
    lowBeam: 'H7',
    highBeam: 'H1',
    fogLight: 'H11',
    notes: 'کیت بدنه و لیپ زیر سپر کربن، بال عقب صندوق و منبع اسپرت سایلنسردار',
  },
  {
    carMake: 'سایپا',
    carModel: 'پراید ۱۳۱ / صبا',
    lowBeam: 'H4',
    highBeam: 'H4',
    fogLight: 'H3',
    notes: 'کمک اسپرت لول ریگلاژی، فرمان ریسینگ، منبع اگزوز و لامپ‌های پرقدرت',
  },
];

export async function fetchProducts(query?: string): Promise<{ data: Product[]; total: number }> {
  try {
    const res = await fetch(`${API_BASE_URL}/products?${query || ''}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch from backend');
    const json = await res.json();
    return json.data;
  } catch {
    return { data: FALLBACK_PRODUCTS, total: FALLBACK_PRODUCTS.length };
  }
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/featured`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Backend offline');
    const json = await res.json();
    return json.data;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Not found on backend');
    const json = await res.json();
    return json.data;
  } catch {
    const found = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
    return found || null;
  }
}

export function formatToman(amount: number): string {
  return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
}

export async function loginApi(dto: { phoneNumber: string; password: string }) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'خطا در ورود به حساب کاربری');
  }
  return data.data;
}

export async function registerApi(dto: {
  fullName: string;
  phoneNumber: string;
  password: string;
  email?: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  const data = await res.json();
  if (!res.ok) {
    const errorMsg = Array.isArray(data.message) ? data.message[0] : (data.message || 'خطا در ثبت‌نام');
    throw new Error(errorMsg);
  }
  return data.data;
}

export async function fetchProfileApi(token: string) {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'خطا در دریافت پروفایل');
  }
  return data.data;
}

export async function refreshApi(refreshToken: string) {
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'خطا در تمدید نشست');
  }
  return data.data;
}

export async function fetchCustomerDashboard(token: string) {
  const res = await fetch(`${API_BASE_URL}/users/me/dashboard`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در دریافت اطلاعات داشبورد');
  return data.data;
}

export async function fetchCustomerOrders(token: string) {
  const res = await fetch(`${API_BASE_URL}/users/me/orders`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در دریافت سفارش‌ها');
  return data.data;
}

export async function updateCustomerProfile(
  token: string,
  dto: { fullName: string; email?: string },
) {
  const res = await fetch(`${API_BASE_URL}/users/me/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در به‌روزرسانی مشخصات');
  return data.data;
}

export async function addCustomerAddress(token: string, address: any) {
  const res = await fetch(`${API_BASE_URL}/users/me/addresses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(address),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در ذخیره آدرس');
  return data.data;
}

export async function deleteCustomerAddress(token: string, index: number) {
  const res = await fetch(`${API_BASE_URL}/users/me/addresses/${index}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در حذف آدرس');
  return data.data;
}

export async function toggleCustomerFavorite(token: string, productId: string) {
  const res = await fetch(`${API_BASE_URL}/users/me/favorites/${productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در مدیریت علاقه‌مندی');
  return data.data;
}

// --- Admin & Warehouse Inventory APIs ---

export async function fetchAdminDashboard(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/dashboard`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در دریافت اطلاعات داشبورد ادمین');
  return data.data;
}

export async function fetchAdminInventory(
  token: string,
  query: { lowStockOnly?: boolean; outOfStockOnly?: boolean; search?: string } = {},
) {
  const params = new URLSearchParams();
  if (query.lowStockOnly) params.append('lowStockOnly', 'true');
  if (query.outOfStockOnly) params.append('outOfStockOnly', 'true');
  if (query.search) params.append('search', query.search);

  const res = await fetch(`${API_BASE_URL}/admin/inventory?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در دریافت لیست انبار کالاها');
  return data.data;
}

export async function updateAdminProductStock(
  token: string,
  productId: string,
  stock: number,
) {
  const res = await fetch(`${API_BASE_URL}/admin/inventory/${productId}/stock`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ stock }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در به‌روزرسانی موجودی کالا');
  return data.data;
}

export async function adjustAdminProductStock(
  token: string,
  productId: string,
  delta: number,
) {
  const res = await fetch(`${API_BASE_URL}/admin/inventory/${productId}/adjust`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ delta }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در افزایش/کاهش موجودی کالا');
  return data.data;
}

export async function fetchAdminOrders(token: string, status?: string) {
  const params = status ? `?status=${status}` : '';
  const res = await fetch(`${API_BASE_URL}/admin/orders${params}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در دریافت سفارش‌ها');
  return data.data;
}

export async function updateAdminOrderStatus(
  token: string,
  orderNumber: string,
  status: string,
) {
  const res = await fetch(`${API_BASE_URL}/admin/orders/${orderNumber}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در تغییر وضعیت سفارش');
  return data.data;
}

export async function fetchAdminUsers(token: string, page = 1) {
  const res = await fetch(`${API_BASE_URL}/admin/users?page=${page}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در دریافت لیست کاربران');
  return data.data;
}

export async function createAdminProduct(token: string, dto: any) {
  const res = await fetch(`${API_BASE_URL}/admin/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });
  const data = await res.json();
  if (!res.ok) {
    const msg = Array.isArray(data.message) ? data.message[0] : data.message;
    throw new Error(msg || 'خطا در افزودن محصول جدید');
  }
  return data.data;
}

export async function deleteAdminProduct(token: string, id: string) {
  const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در حذف محصول');
  return data.data;
}

export async function updateAdminProduct(token: string, id: string, dto: any) {
  const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });
  const data = await res.json();
  if (!res.ok) {
    const msg = Array.isArray(data.message) ? data.message[0] : data.message;
    throw new Error(msg || 'خطا در ویرایش محصول');
  }
  return data.data;
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export async function fetchAdminCategories(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/categories`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در دریافت دسته‌بندی‌ها');
  return data.data || [];
}

export async function createAdminCategory(token: string, dto: any) {
  const res = await fetch(`${API_BASE_URL}/admin/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });
  const data = await res.json();
  if (!res.ok) {
    const msg = Array.isArray(data.message) ? data.message[0] : data.message;
    throw new Error(msg || 'خطا در ایجاد دسته‌بندی جدید');
  }
  return data.data;
}

export async function deleteAdminCategory(token: string, id: string) {
  const res = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'خطا در حذف دسته‌بندی');
  return data.data;
}

/* ==========================================================================
   Reviews & Ratings API Client
   ========================================================================== */

export interface ReviewItem {
  _id: string;
  id?: string;
  productId: string;
  customerName: string;
  carModel?: string;
  rating: number;
  cutOffLineScore?: number;
  beamThrowScore?: number;
  fanNoiseScore?: number;
  comment: string;
  advantages?: string[];
  disadvantages?: string[];
  isVerifiedBuyer?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  averageCutOff: number;
  averageBeamThrow: number;
  averageFanNoise: number;
}

export interface CreateReviewPayload {
  productId: string;
  customerName: string;
  carModel?: string;
  rating: number;
  cutOffLineScore?: number;
  beamThrowScore?: number;
  fanNoiseScore?: number;
  comment: string;
  advantages?: string[];
  disadvantages?: string[];
}

export async function fetchProductReviews(
  productIdOrSlug: string,
  page = 1,
  limit = 20,
): Promise<{ data: ReviewItem[]; total: number; page: number; totalPages: number }> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/reviews/product/${encodeURIComponent(productIdOrSlug)}?page=${page}&limit=${limit}`,
      { cache: 'no-store' },
    );
    if (!res.ok) return { data: [], total: 0, page: 1, totalPages: 0 };
    const json = await res.json();
    return json.data || { data: [], total: 0, page: 1, totalPages: 0 };
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return { data: [], total: 0, page: 1, totalPages: 0 };
  }
}

export async function fetchProductReviewSummary(
  productIdOrSlug: string,
): Promise<ReviewSummary | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/reviews/product/${encodeURIComponent(productIdOrSlug)}/summary`,
      { cache: 'no-store' },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error('Failed to fetch review summary:', error);
    return null;
  }
}

export async function submitProductReview(payload: CreateReviewPayload): Promise<ReviewItem> {
  const res = await fetch(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  if (!res.ok) {
    const msg = Array.isArray(json.message) ? json.message[0] : json.message;
    throw new Error(msg || 'خطا در ثبت نظر');
  }

  return json.data;
}
