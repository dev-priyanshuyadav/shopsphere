import {
  Product,
  ProductQueryParams,
  PaginatedResponse,
  CategoryInfo,
} from "../types/product";
import { ApiError, delay } from "./api";

const DB_KEY = "shopsphere_products_db";
const DB_VERSION_KEY = "shopsphere_products_db_version";
const DB_VERSION = "2";

export const INITIAL_PRODUCTS: Product[] = [
  // Electronics
  {
    id: "prod-1",
    title: "Aura Wireless Noise-Cancelling Headphones",
    description:
      "Immersive sound with active noise cancellation, 40-hour battery life, and ultra-soft memory foam ear cushions.",
    price: 199.99,
    originalPrice: 249.99,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 342,
    stock: 24,
    brand: "AuraSound",
    tags: ["wireless", "audio", "anc", "bluetooth"],
    featured: true,
    createdAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "prod-2",
    title: "Pulse Horizon Smartwatch Series 5",
    description:
      "Advanced health tracking, ECG monitor, AMOLED always-on retina display, and water resistance up to 50 meters.",
    price: 279.0,
    originalPrice: 329.0,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 215,
    stock: 18,
    brand: "PulseTech",
    tags: ["smartwatch", "fitness", "wearable"],
    featured: true,
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "prod-3",
    title: "Lumix Mirrorless 4K Creator Camera",
    description:
      "Compact 24.2 MP full-frame mirrorless camera with 4K60p video, 5-axis dual image stabilization, and flip-out LCD screen.",
    price: 899.0,
    originalPrice: 999.0,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 128,
    stock: 7,
    brand: "Optix",
    tags: ["camera", "photo", "video", "creator"],
    featured: true,
    createdAt: "2026-01-20T10:00:00Z",
  },
  {
    id: "prod-4",
    title: "KeyChron Pro Mechanical Wireless Keyboard",
    description:
      "Hot-swappable tactile mechanical switches, RGB backlighting, custom aluminum chassis, and dual Mac/Windows support.",
    price: 119.5,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 94,
    stock: 35,
    brand: "KeyChron",
    tags: ["keyboard", "pc", "gaming", "work"],
    createdAt: "2026-02-01T10:00:00Z",
  },

  // Clothing & Apparel
  {
    id: "prod-5",
    title: "Minimalist Heavyweight Wool Blend Overcoat",
    description:
      "Tailored double-breasted overcoat crafted from premium recycled wool blend for refined winter warmth.",
    price: 189.0,
    originalPrice: 220.0,
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce667883?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 88,
    stock: 14,
    brand: "NordicThread",
    tags: ["coat", "jacket", "winter", "wool"],
    featured: true,
    createdAt: "2026-01-05T10:00:00Z",
  },
  {
    id: "prod-6",
    title: "Organic French Terry Oversized Hoodie",
    description:
      "100% GOTS certified organic cotton heavyweight fleece with drop shoulders and reinforced kangaroo pocket.",
    price: 78.0,
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 162,
    stock: 40,
    brand: "PureBasics",
    tags: ["hoodie", "organic", "casual", "cotton"],
    createdAt: "2026-02-10T10:00:00Z",
  },
  {
    id: "prod-7",
    title: "Selvedge Slim-Tapered Raw Denim Jeans",
    description:
      "13.5 oz Japanese selvedge denim crafted on vintage shuttle looms. Develops unique fades over time.",
    price: 135.0,
    originalPrice: 160.0,
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.5,
    reviewCount: 76,
    stock: 22,
    brand: "TokyoLoom",
    tags: ["denim", "jeans", "pants"],
    createdAt: "2026-01-25T10:00:00Z",
  },
  {
    id: "prod-8",
    title: "Heritage Leather Low-Top Street Sneakers",
    description:
      "Full-grain Italian calfskin leather sneakers with cushioned footbed and vulcanized rubber sole.",
    price: 145.0,
    originalPrice: 175.0,
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 204,
    stock: 19,
    brand: "Veloce",
    tags: ["sneakers", "shoes", "leather"],
    featured: true,
    createdAt: "2026-02-05T10:00:00Z",
  },

  // Accessories
  {
    id: "prod-9",
    title: "Waterproof Commuter Rolltop Backpack 25L",
    description:
      "Weatherproof Cordura fabric, padded 16-inch laptop compartment, magnetic quick-release buckles, and ergonomic straps.",
    price: 125.0,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 310,
    stock: 30,
    brand: "RoamGear",
    tags: ["backpack", "travel", "commuter", "bag"],
    featured: true,
    createdAt: "2026-01-12T10:00:00Z",
  },
  {
    id: "prod-10",
    title: "Polarized Aviator Sunglasses with Titanium Frame",
    description:
      "Ultralight grade-5 titanium frame with scratch-resistant polarized lenses providing 100% UVA/UVB protection.",
    price: 95.0,
    originalPrice: 120.0,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 114,
    stock: 16,
    brand: "Solara",
    tags: ["sunglasses", "eyewear", "summer"],
    createdAt: "2026-02-14T10:00:00Z",
  },
  {
    id: "prod-11",
    title: "Full-Grain Leather Bifold Card Wallet",
    description:
      "Vegetable-tanned horween leather with RFID blocking protection, 6 card slots, and cash sleeve.",
    price: 48.0,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 89,
    stock: 45,
    brand: "Craft & Hide",
    tags: ["wallet", "leather", "rfid"],
    createdAt: "2026-01-18T10:00:00Z",
  },

  // Home & Living
  {
    id: "prod-12",
    title: "Precision Temperature Pour-Over Electric Kettle",
    description:
      "Matte black gooseneck kettle with to-the-degree temperature control, built-in stopwatch, and 1200W rapid heating element.",
    price: 110.0,
    originalPrice: 130.0,
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 280,
    stock: 20,
    brand: "BaristaPro",
    tags: ["coffee", "kitchen", "kettle", "appliances"],
    featured: true,
    createdAt: "2026-01-08T10:00:00Z",
  },
  {
    id: "prod-13",
    title: "Minimalist Dimmable Desk Lamp with Wireless Charging",
    description:
      "Sleek brushed brass and matte white finish with 3 color temperatures, smooth slider dimming, and 15W Qi charging base.",
    price: 65.0,
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 97,
    stock: 25,
    brand: "Lumiere",
    tags: ["lighting", "lamp", "desk", "decor"],
    createdAt: "2026-02-08T10:00:00Z",
  },
  {
    id: "prod-14",
    title: "Artisanal Ceramic Coffee Mug (Set of 2)",
    description:
      "Handcrafted stoneware ceramic mugs with reactive glazed finish. Dishwasher and microwave safe.",
    price: 34.0,
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 142,
    stock: 50,
    brand: "ClayWorks",
    tags: ["mug", "ceramic", "kitchen", "coffee"],
    createdAt: "2026-01-30T10:00:00Z",
  },

  // Beauty
  {
    id: "prod-15",
    title: "Hydra-Dew Botanical Hyaluronic Face Serum",
    description:
      "Concentrated hydration with multi-molecular hyaluronic acid, niacinamide, and botanical squalane for radiant skin.",
    price: 46.0,
    originalPrice: 58.0,
    category: "beauty",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 420,
    stock: 35,
    brand: "Botanica",
    tags: ["serum", "skincare", "hydration", "beauty"],
    featured: true,
    createdAt: "2026-01-02T10:00:00Z",
  },
  {
    id: "prod-16",
    title: "Cedar & Bergamot Eau De Parfum 50ml",
    description:
      "Sophisticated gender-neutral fragrance blending spicy bergamot, smoky cedarwood, and warm amber notes.",
    price: 85.0,
    category: "beauty",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 118,
    stock: 12,
    brand: "Atelier Scent",
    tags: ["perfume", "fragrance", "beauty"],
    createdAt: "2026-02-18T10:00:00Z",
  },
  ...createAdditionalProducts(),
];

function createAdditionalProducts(): Product[] {
  const collections: Array<{
    category: string;
    brand: string;
    image: string;
    products: Array<{ title: string; price: number; tags: string[] }>;
  }> = [
    {
      category: "electronics",
      brand: "Northstar Labs",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
      products: [
        {
          title: "Vertex Ultrabook 14-inch Laptop",
          price: 899,
          tags: ["laptop", "work", "portable"],
        },
        {
          title: "Orbit USB-C 4K Monitor",
          price: 329,
          tags: ["monitor", "office", "4k"],
        },
        {
          title: "EchoBeam Compact Bluetooth Speaker",
          price: 89,
          tags: ["speaker", "audio", "bluetooth"],
        },
        {
          title: "Nova 2TB Portable SSD",
          price: 159,
          tags: ["storage", "ssd", "usb-c"],
        },
        {
          title: "ArcView 1080p Streaming Webcam",
          price: 74,
          tags: ["webcam", "streaming", "video"],
        },
        {
          title: "SignalPro Wi-Fi 6 Mesh Router",
          price: 189,
          tags: ["wifi", "network", "router"],
        },
        {
          title: "Flux 65W GaN Travel Charger",
          price: 49,
          tags: ["charger", "travel", "usb-c"],
        },
        {
          title: "AeroFit Open-Ear Sport Earbuds",
          price: 129,
          tags: ["earbuds", "sport", "wireless"],
        },
        {
          title: "PixelNote E-Ink Writing Tablet",
          price: 219,
          tags: ["tablet", "writing", "digital"],
        },
        {
          title: "Gridline Wireless Charging Stand",
          price: 59,
          tags: ["charging", "desk", "wireless"],
        },
        {
          title: "Halo Mini Smart Home Hub",
          price: 99,
          tags: ["smart-home", "hub", "voice"],
        },
        {
          title: "FocusLite Portable LED Projector",
          price: 279,
          tags: ["projector", "movie", "portable"],
        },
        {
          title: "Vector Ergonomic Vertical Mouse",
          price: 69,
          tags: ["mouse", "ergonomic", "office"],
        },
        {
          title: "StudioCast USB Condenser Microphone",
          price: 119,
          tags: ["microphone", "audio", "creator"],
        },
        {
          title: "Tempo Digital Piano Controller",
          price: 249,
          tags: ["keyboard", "music", "midi"],
        },
        {
          title: "Glide Pro Fitness Tracker Band",
          price: 79,
          tags: ["fitness", "wearable", "health"],
        },
        {
          title: "ClearCall Noise-Isolating Headset",
          price: 109,
          tags: ["headset", "calls", "audio"],
        },
        {
          title: "Ridge Action Camera 5K Kit",
          price: 299,
          tags: ["camera", "action", "travel"],
        },
        {
          title: "LinkPad Multi-Device Bluetooth Trackpad",
          price: 139,
          tags: ["trackpad", "bluetooth", "desk"],
        },
        {
          title: "Solaris Smart Ambient Light Bar",
          price: 84,
          tags: ["lighting", "smart-home", "desk"],
        },
      ],
    },
    {
      category: "clothing",
      brand: "Field & Form",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
      products: [
        {
          title: "Everyday Pima Cotton Crewneck",
          price: 42,
          tags: ["t-shirt", "cotton", "basics"],
        },
        {
          title: "Relaxed Linen Camp Collar Shirt",
          price: 68,
          tags: ["shirt", "linen", "summer"],
        },
        {
          title: "Merino Ribbed Mock Neck Sweater",
          price: 98,
          tags: ["sweater", "merino", "winter"],
        },
        {
          title: "Utility Canvas Chore Jacket",
          price: 118,
          tags: ["jacket", "canvas", "utility"],
        },
        {
          title: "Everyday Stretch Oxford Shirt",
          price: 72,
          tags: ["shirt", "office", "cotton"],
        },
        {
          title: "Brushed Cotton Flannel Overshirt",
          price: 84,
          tags: ["flannel", "shirt", "layering"],
        },
        {
          title: "Recycled Nylon Packable Windbreaker",
          price: 105,
          tags: ["jacket", "outdoor", "windbreaker"],
        },
        {
          title: "Tapered Performance Chino",
          price: 79,
          tags: ["pants", "chino", "stretch"],
        },
        {
          title: "Pleated Wide-Leg Tailored Trousers",
          price: 112,
          tags: ["pants", "tailored", "fashion"],
        },
        {
          title: "Organic Relaxed Fit Sweatpants",
          price: 64,
          tags: ["sweatpants", "organic", "lounge"],
        },
        {
          title: "Lightweight Merino Travel Polo",
          price: 88,
          tags: ["polo", "travel", "merino"],
        },
        {
          title: "Ribbed Cotton Everyday Tank",
          price: 29,
          tags: ["tank", "cotton", "basics"],
        },
        {
          title: "Water-Repellent Quilted Vest",
          price: 96,
          tags: ["vest", "outdoor", "layering"],
        },
        {
          title: "Soft Brushed Lounge Cardigan",
          price: 91,
          tags: ["cardigan", "lounge", "knit"],
        },
        {
          title: "Classic Oxford Button-Down",
          price: 76,
          tags: ["shirt", "oxford", "office"],
        },
        {
          title: "Canvas Low-Top Everyday Trainers",
          price: 82,
          tags: ["shoes", "canvas", "sneakers"],
        },
        {
          title: "Technical Knit Running Shorts",
          price: 49,
          tags: ["shorts", "running", "sport"],
        },
        {
          title: "Heavyweight French Terry Joggers",
          price: 74,
          tags: ["joggers", "cotton", "casual"],
        },
        {
          title: "Fine Gauge Cotton Crew Sweater",
          price: 86,
          tags: ["sweater", "cotton", "knit"],
        },
        {
          title: "Waterproof City Rain Shell",
          price: 149,
          tags: ["jacket", "rain", "outdoor"],
        },
      ],
    },
    {
      category: "accessories",
      brand: "Common Ground",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      products: [
        {
          title: "Waxed Canvas Weekender Duffel",
          price: 145,
          tags: ["bag", "travel", "canvas"],
        },
        {
          title: "Slim Aluminum Card Holder",
          price: 39,
          tags: ["wallet", "aluminum", "minimal"],
        },
        {
          title: "Braided Leather Casual Belt",
          price: 54,
          tags: ["belt", "leather", "accessory"],
        },
        {
          title: "Merino Ribbed Everyday Beanie",
          price: 32,
          tags: ["beanie", "winter", "merino"],
        },
        {
          title: "Silk Blend Pocket Square Set",
          price: 44,
          tags: ["silk", "formal", "gift"],
        },
        {
          title: "Recycled Nylon Crossbody Sling",
          price: 68,
          tags: ["bag", "crossbody", "travel"],
        },
        {
          title: "Hand-Finished Acetate Round Sunglasses",
          price: 110,
          tags: ["sunglasses", "eyewear", "acetate"],
        },
        {
          title: "Compact RFID Travel Passport Wallet",
          price: 58,
          tags: ["travel", "passport", "rfid"],
        },
        {
          title: "Brushed Steel Minimalist Watch",
          price: 129,
          tags: ["watch", "steel", "minimal"],
        },
        {
          title: "Cashmere Blend Winter Scarf",
          price: 88,
          tags: ["scarf", "cashmere", "winter"],
        },
        {
          title: "Foldable Market Tote Bag",
          price: 26,
          tags: ["tote", "reusable", "shopping"],
        },
        {
          title: "Leather Cable Organizer Roll",
          price: 35,
          tags: ["organizer", "travel", "leather"],
        },
        {
          title: "Classic Cotton Baseball Cap",
          price: 31,
          tags: ["cap", "cotton", "casual"],
        },
        {
          title: "Polar Fleece Touchscreen Gloves",
          price: 28,
          tags: ["gloves", "winter", "touchscreen"],
        },
        {
          title: "Minimal Brass Key Organizer",
          price: 41,
          tags: ["keys", "brass", "organizer"],
        },
        {
          title: "Geometric Acetate Hair Claw Set",
          price: 24,
          tags: ["hair", "accessory", "acetate"],
        },
        {
          title: "Travel Compression Packing Cubes",
          price: 52,
          tags: ["travel", "packing", "organizer"],
        },
        {
          title: "Everyday Merino Crew Socks",
          price: 22,
          tags: ["socks", "merino", "basics"],
        },
        {
          title: "Slim Reversible Leather Belt",
          price: 62,
          tags: ["belt", "leather", "reversible"],
        },
        {
          title: "Alpine Insulated Water Bottle",
          price: 38,
          tags: ["bottle", "outdoor", "insulated"],
        },
        {
          title: "Summit Alpine Trail Daypack",
          price: 138,
          tags: ["backpack", "hiking", "travel"],
        },
        {
          title: "Summit Alpine Thermal Flask",
          price: 46,
          tags: ["flask", "outdoor", "hydration"],
        },
        {
          title: "Summit Alpine Trekking Gloves",
          price: 34,
          tags: ["gloves", "hiking", "winter"],
        },
      ],
    },
    {
      category: "home",
      brand: "Hearthline",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      products: [
        {
          title: "Handwoven Textured Throw Blanket",
          price: 79,
          tags: ["blanket", "textile", "decor"],
        },
        {
          title: "Oak Floating Wall Shelf",
          price: 58,
          tags: ["shelf", "wood", "storage"],
        },
        {
          title: "Linen Table Runner Natural Weave",
          price: 34,
          tags: ["linen", "table", "decor"],
        },
        {
          title: "Stackable Glass Food Storage Set",
          price: 46,
          tags: ["kitchen", "storage", "glass"],
        },
        {
          title: "Sculptural Ribbed Ceramic Vase",
          price: 48,
          tags: ["vase", "ceramic", "decor"],
        },
        {
          title: "Acacia Wood Serving Board",
          price: 39,
          tags: ["kitchen", "wood", "serving"],
        },
        {
          title: "Low-Profile Wool Blend Area Rug",
          price: 189,
          tags: ["rug", "wool", "home"],
        },
        {
          title: "Scented Soy Candle Cedar Studio",
          price: 28,
          tags: ["candle", "scent", "decor"],
        },
        {
          title: "Soft Cotton Waffle Bath Towel Set",
          price: 62,
          tags: ["bath", "cotton", "towel"],
        },
        {
          title: "Matte Stoneware Dinner Plate Set",
          price: 74,
          tags: ["dining", "ceramic", "kitchen"],
        },
        {
          title: "Bamboo Drawer Organizer System",
          price: 43,
          tags: ["storage", "bamboo", "organizer"],
        },
        {
          title: "Linen Blend Blackout Curtain Pair",
          price: 96,
          tags: ["curtain", "linen", "window"],
        },
        {
          title: "Portable Ceramic Space Heater",
          price: 119,
          tags: ["heater", "home", "portable"],
        },
        {
          title: "Cast Iron Enamel Dutch Oven",
          price: 138,
          tags: ["cookware", "kitchen", "cast-iron"],
        },
        {
          title: "Hand-Poured Amber Glass Diffuser",
          price: 36,
          tags: ["diffuser", "scent", "home"],
        },
        {
          title: "Adjustable Walnut Laptop Stand",
          price: 69,
          tags: ["desk", "wood", "office"],
        },
        {
          title: "Cloud Cotton Percale Sheet Set",
          price: 109,
          tags: ["bedding", "cotton", "bedroom"],
        },
        {
          title: "Stoneware Pour-Over Coffee Dripper",
          price: 32,
          tags: ["coffee", "ceramic", "kitchen"],
        },
        {
          title: "Brass Arc Floor Reading Lamp",
          price: 175,
          tags: ["lighting", "lamp", "living-room"],
        },
        {
          title: "Modular Felt Storage Basket Set",
          price: 57,
          tags: ["storage", "felt", "organizer"],
        },
      ],
    },
    {
      category: "beauty",
      brand: "Verde Ritual",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
      products: [
        {
          title: "Daily Mineral SPF 40 Face Lotion",
          price: 32,
          tags: ["skincare", "spf", "face"],
        },
        {
          title: "Gentle Cloud Foaming Cleanser",
          price: 24,
          tags: ["cleanser", "skincare", "gentle"],
        },
        {
          title: "Overnight Renewal Bakuchiol Cream",
          price: 54,
          tags: ["cream", "skincare", "night"],
        },
        {
          title: "Nourishing Botanical Body Oil",
          price: 38,
          tags: ["body", "oil", "botanical"],
        },
        {
          title: "Rosewater Balancing Face Mist",
          price: 22,
          tags: ["mist", "skincare", "rose"],
        },
        {
          title: "Mineral Clay Detox Mask",
          price: 29,
          tags: ["mask", "skincare", "clay"],
        },
        {
          title: "Silk Finish Tinted Moisturizer",
          price: 41,
          tags: ["makeup", "face", "tinted"],
        },
        {
          title: "Cream Blush Duo Warm Petal",
          price: 27,
          tags: ["makeup", "blush", "color"],
        },
        {
          title: "Soft Definition Brow Pencil",
          price: 19,
          tags: ["makeup", "brows", "beauty"],
        },
        {
          title: "Nourishing Clear Lip Balm",
          price: 14,
          tags: ["lip", "balm", "beauty"],
        },
        {
          title: "Volumizing Botanical Shampoo",
          price: 31,
          tags: ["hair", "shampoo", "botanical"],
        },
        {
          title: "Repairing Argan Hair Mask",
          price: 36,
          tags: ["hair", "mask", "argan"],
        },
        {
          title: "Daily Hydration Hand Cream",
          price: 18,
          tags: ["hands", "cream", "hydration"],
        },
        {
          title: "Citrus Neroli Eau De Toilette",
          price: 72,
          tags: ["fragrance", "citrus", "beauty"],
        },
        {
          title: "Smoked Vanilla Home Fragrance Oil",
          price: 26,
          tags: ["fragrance", "vanilla", "home"],
        },
        {
          title: "Cooling Green Tea Eye Gel",
          price: 34,
          tags: ["eyes", "skincare", "cooling"],
        },
        {
          title: "Rose Quartz Facial Massage Tool",
          price: 25,
          tags: ["facial", "massage", "skincare"],
        },
        {
          title: "Soft Bamboo Makeup Brush Set",
          price: 44,
          tags: ["makeup", "brushes", "bamboo"],
        },
        {
          title: "Calm Lavender Bath Soak",
          price: 28,
          tags: ["bath", "lavender", "relaxation"],
        },
        {
          title: "Clarifying Scalp Care Serum",
          price: 39,
          tags: ["hair", "scalp", "serum"],
        },
      ],
    },
  ];

  return collections.flatMap((collection, collectionIndex) =>
    collection.products.map((product, productIndex) => ({
      id: `prod-${17 + collectionIndex * 20 + productIndex}`,
      title: product.title,
      description: `Thoughtfully designed ${product.title.toLowerCase()} made for everyday use, with dependable materials and a considered finish.`,
      price: product.price,
      originalPrice:
        productIndex % 4 === 0 ? Math.round(product.price * 1.18) : undefined,
      category: collection.category,
      images: [collection.image],
      rating: Number(
        (4.2 + ((productIndex + collectionIndex) % 8) * 0.1).toFixed(1),
      ),
      reviewCount: 24 + collectionIndex * 31 + productIndex * 13,
      stock: 8 + ((productIndex * 7 + collectionIndex * 5) % 48),
      brand: collection.brand,
      tags: product.tags,
      featured: productIndex < 2,
      createdAt: `2026-${String(3 + (productIndex % 7)).padStart(2, "0")}-${String(
        1 + productIndex,
      ).padStart(2, "0")}T10:00:00Z`,
    })),
  );
}

// Helper to access persistent store
const getStoredProducts = (): Product[] => {
  try {
    if (localStorage.getItem(DB_VERSION_KEY) !== DB_VERSION) {
      saveStoredProducts(INITIAL_PRODUCTS);
      return INITIAL_PRODUCTS;
    }

    const data = localStorage.getItem(DB_KEY);
    if (!data) {
      localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    const products = JSON.parse(data) as Product[];
    const productsWithImages = products.filter((product) =>
      product.images?.some((image) => image.trim().length > 0),
    );

    if (productsWithImages.length !== products.length) {
      saveStoredProducts(productsWithImages);
    }

    return productsWithImages;
  } catch {
    return INITIAL_PRODUCTS;
  }
};

const saveStoredProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(products));
    localStorage.setItem(DB_VERSION_KEY, DB_VERSION);
  } catch (error) {
    console.error("Failed to persist products to localStorage", error);
  }
};

export const productService = {
  /**
   * Fetch paginated and filtered product catalog
   */
  async getProducts(
    params?: ProductQueryParams,
  ): Promise<PaginatedResponse<Product>> {
    await delay();

    let list = getStoredProducts();

    // 1. Filter by category
    if (params?.category && params.category !== "all") {
      const targetCategory = params.category.toLowerCase();
      list = list.filter((p) => p.category.toLowerCase() === targetCategory);
    }

    // 2. Filter by search query
    if (params?.search && params.search.trim()) {
      const term = params.search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          (p.tags && p.tags.some((tag) => tag.toLowerCase().includes(term))),
      );
    }

    // 3. Filter by price range
    if (params?.minPrice !== undefined) {
      list = list.filter((p) => p.price >= (params.minPrice ?? 0));
    }
    if (params?.maxPrice !== undefined) {
      list = list.filter((p) => p.price <= (params.maxPrice ?? Infinity));
    }

    // 4. Filter by rating
    if (params?.rating !== undefined && params.rating > 0) {
      list = list.filter((p) => p.rating >= (params.rating ?? 0));
    }

    // 5. Sorting
    const sortBy = params?.sortBy || "featured";
    list = [...list].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
        case "featured":
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
      }
    });

    // 6. Pagination
    const page = Math.max(1, params?.page || 1);
    const limit = Math.max(1, params?.limit || 12);
    const total = list.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedData = list.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  },

  /**
   * Fetch single product by ID
   */
  async getProductById(id: string): Promise<Product> {
    await delay();

    const products = getStoredProducts();
    const found = products.find((p) => p.id === id);

    if (!found) {
      throw new ApiError(`Product with ID "${id}" was not found.`, 404);
    }

    return found;
  },

  /**
   * Fetch available categories with product counts
   */
  async getCategories(): Promise<CategoryInfo[]> {
    await delay();

    const products = getStoredProducts();
    const map = new Map<string, number>();

    products.forEach((p) => {
      const cat = p.category.toLowerCase();
      map.set(cat, (map.get(cat) || 0) + 1);
    });

    return Array.from(map.entries()).map(([id, count]) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      count,
    }));
  },

  /**
   * Create new product (Admin CRUD)
   */
  async createProduct(
    data: Omit<Product, "id" | "createdAt">,
  ): Promise<Product> {
    await delay();

    const products = getStoredProducts();
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const updated = [newProduct, ...products];
    saveStoredProducts(updated);

    return newProduct;
  },

  /**
   * Update existing product (Admin CRUD)
   */
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    await delay();

    const products = getStoredProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new ApiError(
        `Cannot update: Product with ID "${id}" does not exist.`,
        404,
      );
    }

    const updatedProduct = {
      ...products[index],
      ...updates,
    };

    products[index] = updatedProduct;
    saveStoredProducts(products);

    return updatedProduct;
  },

  /**
   * Delete product (Admin CRUD)
   */
  async deleteProduct(id: string): Promise<boolean> {
    await delay();

    const products = getStoredProducts();
    const exists = products.some((p) => p.id === id);

    if (!exists) {
      throw new ApiError(
        `Cannot delete: Product with ID "${id}" does not exist.`,
        404,
      );
    }

    const filtered = products.filter((p) => p.id !== id);
    saveStoredProducts(filtered);

    return true;
  },

  /**
   * Reset database back to initial seed data
   */
  async resetDefaultProducts(): Promise<void> {
    await delay();
    saveStoredProducts(INITIAL_PRODUCTS);
  },
};
