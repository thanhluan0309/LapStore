export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  badge?: string;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    display: string;
  };
  detailedSpecs: {
    gpu?: string;
    battery?: string;
    weight?: string;
    ports?: string;
    os?: string;
    wifi?: string;
    webcam?: string;
    audio?: string;
  };
  description: string;
  category: string;
  inStock: boolean;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
};

export const categories: Category[] = [
  { id: "gaming", name: "Gaming", icon: "🎮", count: 48, color: "from-red-500 to-orange-500" },
  { id: "business", name: "Business", icon: "💼", count: 62, color: "from-blue-500 to-indigo-500" },
  { id: "student", name: "Student", icon: "📚", count: 35, color: "from-green-500 to-teal-500" },
  { id: "creator", name: "Creator", icon: "🎨", count: 29, color: "from-purple-500 to-pink-500" },
  { id: "ultrabook", name: "Ultrabook", icon: "✈️", count: 41, color: "from-sky-500 to-cyan-500" },
  { id: "budget", name: "Budget Picks", icon: "💰", count: 55, color: "from-yellow-500 to-amber-500" },
];

export const featuredProducts: Product[] = [
  {
    id: "1",
    name: "MacBook Pro 16\" M3 Max",
    brand: "Apple",
    price: 2499,
    originalPrice: 2799,
    rating: 4.9,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    ],
    badge: "Best Seller",
    specs: { cpu: "M3 Max", ram: "36GB", storage: "1TB SSD", display: "16.2\" Liquid Retina XDR" },
    detailedSpecs: {
      gpu: "40-core GPU",
      battery: "100Wh, up to 22 hrs",
      weight: "2.14 kg",
      ports: "3x Thunderbolt 4, HDMI, SD Card, MagSafe 3",
      os: "macOS Sonoma",
      wifi: "Wi-Fi 6E, Bluetooth 5.3",
      webcam: "1080p FaceTime HD",
      audio: "6-speaker sound system",
    },
    description: "The MacBook Pro 16\" with M3 Max chip delivers extraordinary performance for the most demanding workflows. With up to 22 hours of battery life, a stunning Liquid Retina XDR display, and the world's most powerful chip for a personal computer, this is the ultimate creative workstation.",
    category: "creator",
    inStock: true,
  },
  {
    id: "2",
    name: "ASUS ROG Zephyrus G16",
    brand: "ASUS",
    price: 1899,
    originalPrice: 2199,
    rating: 4.8,
    reviews: 1432,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
    ],
    badge: "Gaming Pick",
    specs: { cpu: "Intel Core i9-14900HX", ram: "32GB", storage: "2TB SSD", display: "16\" QHD 240Hz" },
    detailedSpecs: {
      gpu: "NVIDIA RTX 4080 12GB",
      battery: "90Wh, up to 10 hrs",
      weight: "1.85 kg",
      ports: "2x USB-A 3.2, 2x USB-C (TB4), HDMI 2.1, SD Card",
      os: "Windows 11 Home",
      wifi: "Wi-Fi 6E, Bluetooth 5.3",
      webcam: "720p IR camera",
      audio: "Dolby Atmos, 4 speakers",
    },
    description: "Dominate every game with the ROG Zephyrus G16. Powered by Intel Core i9 and RTX 4080, with a blazing 240Hz QHD display and MUX Switch for maximum frame rates. The slim 1.85kg chassis hides desktop-class GPU power inside.",
    category: "gaming",
    inStock: true,
  },
  {
    id: "3",
    name: "Dell XPS 15 OLED",
    brand: "Dell",
    price: 1699,
    rating: 4.7,
    reviews: 983,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=800&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
    ],
    specs: { cpu: "Intel Core i7-13700H", ram: "16GB", storage: "512GB SSD", display: "15.6\" OLED 3.5K" },
    detailedSpecs: {
      gpu: "NVIDIA RTX 4060 8GB",
      battery: "86Wh, up to 13 hrs",
      weight: "1.86 kg",
      ports: "2x Thunderbolt 4, USB-A 3.2, SD Card, 3.5mm audio",
      os: "Windows 11 Pro",
      wifi: "Killer Wi-Fi 6E, Bluetooth 5.3",
      webcam: "720p IR + Windows Hello",
      audio: "2W stereo speakers, Waves MaxxAudio",
    },
    description: "The XPS 15 OLED redefines professional laptop displays with its stunning 3.5K OLED panel covering 100% DCI-P3. Pair that with Intel Core i7 performance and NVIDIA discrete graphics for a machine that handles creative work and business tasks equally well.",
    category: "business",
    inStock: true,
  },
  {
    id: "4",
    name: "Lenovo ThinkPad X1 Carbon",
    brand: "Lenovo",
    price: 1399,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 3201,
    image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=800&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
    ],
    badge: "Top Rated",
    specs: { cpu: "Intel Core i7-1365U", ram: "16GB", storage: "512GB SSD", display: "14\" IPS 2.8K" },
    detailedSpecs: {
      battery: "57Wh, up to 15 hrs",
      weight: "1.12 kg",
      ports: "2x Thunderbolt 4, 2x USB-A 3.2, HDMI, Nano-SIM",
      os: "Windows 11 Pro",
      wifi: "Wi-Fi 6E, Bluetooth 5.3, Optional 5G",
      webcam: "1080p + IR + ThinkShutter",
      audio: "Dolby Atmos Speaker System",
    },
    description: "The gold standard of business laptops for over a decade. The ThinkPad X1 Carbon Gen 11 weighs just 1.12kg yet passes 12 MIL-SPEC durability tests. Military-grade reliability meets modern connectivity with optional 5G and Thunderbolt 4 ports.",
    category: "business",
    inStock: true,
  },
  {
    id: "5",
    name: "HP Spectre x360 14",
    brand: "HP",
    price: 1299,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 754,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
    ],
    badge: "Sale",
    specs: { cpu: "Intel Core Ultra 7", ram: "16GB", storage: "512GB SSD", display: "14\" OLED 2.8K Touch" },
    detailedSpecs: {
      battery: "68Wh, up to 17 hrs",
      weight: "1.41 kg",
      ports: "2x Thunderbolt 4, USB-A 3.2, microSD, 3.5mm",
      os: "Windows 11 Home",
      wifi: "Wi-Fi 6E, Bluetooth 5.3",
      webcam: "9MP + IR + HP Sure View",
      audio: "Bang & Olufsen, 4 speakers",
    },
    description: "The HP Spectre x360 14 is the most versatile laptop in the lineup — a premium 2-in-1 that transitions seamlessly from laptop to tablet. The Intel Core Ultra 7 AI engine accelerates everyday tasks while the OLED touch display delivers cinema-quality visuals.",
    category: "ultrabook",
    inStock: true,
  },
  {
    id: "6",
    name: "Razer Blade 18",
    brand: "Razer",
    price: 2799,
    rating: 4.7,
    reviews: 621,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
    ],
    specs: { cpu: "Intel Core i9-14900HX", ram: "32GB", storage: "2TB SSD", display: "18\" QHD 300Hz" },
    detailedSpecs: {
      gpu: "NVIDIA RTX 4090 16GB",
      battery: "95.2Wh, up to 6 hrs",
      weight: "3.07 kg",
      ports: "3x USB-A 3.2, 2x Thunderbolt 5, SD Card, HDMI 2.1, RJ-45",
      os: "Windows 11 Home",
      wifi: "Wi-Fi 6E, Bluetooth 5.3",
      webcam: "1080p + IR",
      audio: "THX Spatial Audio, 6 speakers",
    },
    description: "The Razer Blade 18 is the ultimate desktop replacement — a mobile powerhouse housing RTX 4090 desktop-class graphics in a precision CNC aluminum chassis. The 18\" 300Hz QHD display and THX Spatial Audio make it a complete entertainment and gaming studio.",
    category: "gaming",
    inStock: false,
  },
  {
    id: "7",
    name: "Acer Swift Go 14",
    brand: "Acer",
    price: 699,
    originalPrice: 849,
    rating: 4.5,
    reviews: 1102,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
    ],
    badge: "Budget Pick",
    specs: { cpu: "AMD Ryzen 7 7840U", ram: "16GB", storage: "512GB SSD", display: "14\" OLED 2.8K" },
    detailedSpecs: {
      battery: "65Wh, up to 12 hrs",
      weight: "1.25 kg",
      ports: "2x USB-C (USB4), 2x USB-A 3.2, HDMI 2.1, microSD",
      os: "Windows 11 Home",
      wifi: "Wi-Fi 6E, Bluetooth 5.2",
      webcam: "1080p QHD + IR",
      audio: "DTS Audio, 2 speakers",
    },
    description: "Maximum value meets premium display in the Acer Swift Go 14. The AMD Ryzen 7 chip punches well above its price bracket, and the 2.8K OLED display is typically found only in laptops costing twice as much. An unbeatable choice for students and budget-conscious professionals.",
    category: "student",
    inStock: true,
  },
  {
    id: "8",
    name: "Microsoft Surface Laptop 6",
    brand: "Microsoft",
    price: 1299,
    rating: 4.6,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
    ],
    specs: { cpu: "Intel Core Ultra 5", ram: "16GB", storage: "512GB SSD", display: "13.5\" PixelSense 2256×1504" },
    detailedSpecs: {
      battery: "47Wh, up to 19 hrs",
      weight: "1.28 kg",
      ports: "USB-C (USB4), USB-A 3.1, Surface Connect, 3.5mm",
      os: "Windows 11 Home",
      wifi: "Wi-Fi 6E, Bluetooth 5.3",
      webcam: "1080p Full HD + Windows Hello",
      audio: "Omnisonic speakers with Dolby Atmos",
    },
    description: "The Surface Laptop 6 represents Microsoft's vision of the perfect everyday laptop — elegant Alcantara keyboard, an ultra-sharp PixelSense display, and Intel Core Ultra AI silicon delivering up to 19 hours of battery life. Refined simplicity for the modern professional.",
    category: "ultrabook",
    inStock: true,
  },
];

export const heroSlides = [
  {
    id: 1,
    title: "Power Meets",
    highlight: "Perfection",
    subtitle: "MacBook Pro M3 Max",
    description: "Experience next-generation performance with the world's most powerful chip for a personal computer.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    cta: "Shop Now",
    badge: "New Arrival",
    accent: "from-blue-600 to-indigo-700",
  },
  {
    id: 2,
    title: "Dominate Every",
    highlight: "Game",
    subtitle: "ASUS ROG Zephyrus G16",
    description: "Built for victory. 240Hz display, RTX 4080 GPU, and desktop-class performance in a sleek chassis.",
    price: 1899,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
    cta: "Level Up",
    badge: "Gaming Beast",
    accent: "from-red-600 to-orange-600",
  },
  {
    id: 3,
    title: "Work Smarter,",
    highlight: "Anywhere",
    subtitle: "Dell XPS 15 OLED",
    description: "Stunning OLED display, ultra-thin design, and all-day battery life for the modern professional.",
    price: 1699,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
    cta: "Explore",
    badge: "Editor's Choice",
    accent: "from-emerald-600 to-teal-700",
  },
];

export const COUPON_CODES: Record<string, number> = {
  SAVE10: 10,
  FLASH20: 20,
  TECH15: 15,
  NEWUSER: 25,
};
