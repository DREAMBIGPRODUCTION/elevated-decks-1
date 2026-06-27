// Elevated Decks - Site Configuration

export const siteConfig = {
  name: "Elevated Decks",
  tagline: "Your Backyard, Your Sanctuary",
  description:
    "We build luxury custom decks for homeowners in Saratoga Springs, Loudonville, Niskayuna, Malta, Lake George, and select Upstate New York markets.",
  phone: "(838) 280-0308",
  phoneClean: "8382800308",
  email: "sales@elevateddecksny.com",
  address: {
    street: "",
    city: "Latham",
    state: "NY",
    zip: "",
  },
  social: {
    facebook: "https://facebook.com/elevateddecks",
    instagram: "https://instagram.com/elevateddecks",
    houzz: "https://houzz.com/elevateddecks",
  },
  url: "https://elevateddecks.net",
  established: "2016",
}

export const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Custom Elevated Decks", href: "/services#elevated-decks" },
    { name: "Rooftop Deck Construction", href: "/services#rooftop-decks" },
    { name: "Structural Deck Framing", href: "/services#structural-framing" },
    { name: "Multi-Level Deck Systems", href: "/services#multi-level" },
    { name: "Composite & Hardwood Decking", href: "/services#decking" },
    { name: "Railings & Integrated Lighting", href: "/services#railings" },
  ],
}

export const serviceAreas = {
  counties: ["Albany County", "Saratoga County", "Schenectady County", "Warren County"],
  cities: [
    "Loudonville",
    "Saratoga Springs",
    "Malta",
    "Niskayuna",
    "Lake George",
    "Clifton Park",
    "Delmar",
    "Albany",
    "Troy",
    "Ballston Spa",
    "Queensbury",
    "Guilderland",
  ],
}

export const deckCategories = [
  {
    id: "pressure-treated",
    name: "Pressure-Treated Decks",
    tagline: "Timeless Beauty, Built to Embrace Your Vision",
    description:
      "Classic wood decking with warm, natural character. Perfect for those who love the traditional look and feel of a real wood deck—a beautiful canvas for your outdoor entertaining and family gatherings.",
    services: [
      {
        id: "structural-framing",
        title: "A Solid Foundation for Your Dreams",
        shortDesc: "Beautifully crafted support systems that last for generations.",
        description:
          "Every masterpiece needs a strong foundation. We design and build deck frames with care and precision, creating the perfect base for your backyard oasis where family memories will unfold for decades to come.",
        icon: "Grid3x3",
      },
      {
        id: "elevated-decks",
        title: "Elevated Decks With a View",
        shortDesc: "Rise above with a deck that transforms your outdoor space.",
        description:
          "We craft beautiful elevated decks that create stunning focal points in your landscape. Whether hovering over slopes, pools, or gardens, your elevated deck becomes a gathering place where life's special moments shine.",
        icon: "Layers",
      },
    ],
  },
  {
    id: "composite",
    name: "Composite Decks",
    tagline: "Sophisticated Beauty With Effortless Care",
    description:
      "Gorgeous composite surfaces that look and feel like real wood, but require virtually no maintenance. More time enjoying your outdoor sanctuary, less time on upkeep. Fade-resistant colors that stay beautiful for decades.",
    services: [
      {
        id: "decking",
        title: "Premium Decking Surfaces",
        shortDesc: "Beautiful materials that age gracefully and require minimal care.",
        description:
          "We select the finest composite and wood materials for their warmth, beauty, and longevity. Each choice is made to complement your home's character and create the exact atmosphere you envision for your outdoor sanctuary.",
        icon: "Rows3",
      },
      {
        id: "multi-level",
        title: "Multi-Level Outdoor Living",
        shortDesc: "Layered spaces that create flow and visual drama.",
        description:
          "Imagine multiple elegant platforms flowing together, creating distinct gathering spaces with integrated lighting and stairs. Multi-level decks transform your yard into a resort-like retreat where different areas invite relaxation, entertaining, and connection.",
        icon: "LayoutGrid",
      },
    ],
  },
  {
    id: "custom",
    name: "Custom Premium Decks",
    tagline: "Luxury Materials, Designed to Inspire",
    description:
      "For those with a refined vision: AZEK premium surfaces that combine architectural elegance with durability. These sophisticated decks are virtually maintenance-free, leaving you free to relax, entertain, and create lasting memories.",
    services: [
      {
        id: "rooftop-decks",
        title: "Urban Oasis: Rooftop Decks",
        shortDesc: "Discover the magic of entertaining and relaxing in the sky.",
        description:
          "Your rooftop holds untapped potential for an enchanting escape. We transform flat roofs into sophisticated outdoor living spaces where you can enjoy morning coffee, evening sunsets, and memorable gatherings above it all.",
        icon: "Building2",
      },
      {
        id: "railings",
        title: "Elegant Details & Lighting Design",
        shortDesc: "Beautiful finishes that define the personality of your space.",
        description:
          "From sleek glass and cable railings to ambient lighting that glows at dusk, the finishing touches transform your deck into an enchanting retreat. Every detail is chosen to enhance beauty and create atmosphere.",
        icon: "Lightbulb",
      },
    ],
  },
]

// Flatten services into single array for backward compatibility
export const services = deckCategories.flatMap(cat => cat.services)

// ─── Featured Decking Brands ─────────────────────────────────────────────────

export const deckingBrands = [
  {
    id: "trex",
    name: "Trex",
    tagline: "The World's #1 Composite Decking Brand",
    description:
      "Trex pioneered the composite decking category and remains the industry standard. Made from 95% recycled materials, Trex decking delivers unrivaled durability and beauty with virtually zero maintenance. Their proprietary shell technology protects against fading, staining, scratching, and mold.",
    collections: [
      {
        name: "Trex Transcend",
        tier: "Ultra Premium",
        description:
          "Premium tropical and earth-tone colors with deep wood grain patterns and the highest fade and stain resistance in the Trex lineup.",
        colors: ["Island Mist", "Torched Azurewood", "Rafter Brown", "Spiced Rum", "Clam Shell"],
      },
      {
        name: "Trex Enhance",
        tier: "Premium",
        description:
          "High-performance composite at an accessible tier. Available in Naturals and Basics with rich, streaked color tones.",
        colors: ["Saddle", "Post Oak", "Toasted Sienna", "Rope Swing", "Cape Cod Gray"],
      },
      {
        name: "Trex Select",
        tier: "Standard",
        description:
          "Clean, refined boards in classic colors. A streamlined choice for homeowners who want proven Trex performance.",
        colors: ["Charcoal Black", "Fire Pit", "Winchester Gray", "Gravel Path"],
      },
    ],
    highlights: [
      "25-year limited residential warranty",
      "95% recycled materials",
      "Fade & stain resistant shell",
      "No sanding, staining, or painting",
      "Splinter-free surface",
      "Mold & mildew resistant",
    ],
    image: "/images/trex.png",
  },
  {
    id: "timbertech",
    name: "TimberTech",
    tagline: "Advanced Composite & PVC Performance",
    description:
      "TimberTech by AZEK delivers a curated range of composite and capped polymer decking boards that combine stunning aesthetics with exceptional durability. Their proprietary 4-sided capping technology protects every surface from moisture, fading, and staining — a strong fit for the Capital Region's wet springs, summer sun, and freeze-thaw cycles.",
    collections: [
      {
        name: "TimberTech PRO",
        tier: "Ultra Premium",
        description:
          "Four-sided polymer capping with a full composite core. Multi-width boards, premium color palettes, and a 30-year structural warranty.",
        colors: ["Harbor Gray", "Tropical Blend", "Ashton Woods", "Cape May"],
      },
      {
        name: "TimberTech EDGE",
        tier: "Premium",
        description:
          "Three-sided capping for reliable performance. Scalloped profile for a lightweight, cost-effective option that still delivers TimberTech quality.",
        colors: ["Mission Brown", "Mocha Taupe", "Gray Birch", "Coast Ash"],
      },
      {
        name: "TimberTech Advanced PVC",
        tier: "Ultra Premium",
        description:
          "Full PVC boards with zero organic material — the ultimate in moisture, mold, and scratch resistance. Premium colors that resist heat absorption.",
        colors: ["Arctic White", "Walnut", "Mahogany", "Basalt"],
      },
    ],
    highlights: [
      "30-year structural warranty",
      "4-sided capping technology",
      "Low heat retention",
      "No organic material (PVC line)",
      "Superior color retention",
      "Resists mold, moisture & insects",
    ],
    image: "/images/official/decking/azek-vintage-deck.webp",
  },
]

// ─── Railings & Lighting (primary accessory lines) ───────────────────────────

export type AccessoryProduct = {
  id: string
  brand: string
  title: string
  subtitle: string
  description: string
  highlights: string[]
  lines: string[]
  image: string
  imageAlt: string
  website: string
}

export const railingProducts: AccessoryProduct[] = [
  {
    id: "trex-railing",
    brand: "Trex",
    title: "Trex Deck Railing",
    subtitle: "Our core railing line",
    description:
      "Trex railing is one of our main product categories. We install composite, aluminum, cable, glass, and mesh systems across Signature, Transcend, Select, and Enhance collections.",
    highlights: [
      "Composite, metal, cable, glass, and mesh options",
      "15–50 year product warranties",
      "Low-maintenance finishes — no painting or staining",
      "Integrated Trex deck lighting available",
    ],
    lines: [
      "Signature® X-Series™ Cable Rail",
      "Transcend® Composite Railing",
      "Signature® Glass Railing",
      "Enhance® Composite & Steel Railing",
    ],
    image: "/images/official/railings/trex-composite-railing.jpg",
    imageAlt: "Trex composite deck railing",
    website: "https://www.trex.com/products/railing/",
  },
  {
    id: "azek-railing",
    brand: "TimberTech AZEK",
    title: "TimberTech AZEK Railing",
    subtitle: "Premium PVC & composite railing",
    description:
      "TimberTech AZEK railing is our other primary railing offering — PVC, composite, metal, and vinyl systems with clean profiles, strong performance, and extensive style customization.",
    highlights: [
      "PVC, composite, aluminum, and premium vinyl collections",
      "Designed for long-term outdoor performance",
      "Multiple top-rail and infill combinations",
      "Pairs with official TimberTech AZEK lighting",
    ],
    lines: [
      "PVC Railing Collection",
      "Classic Composite Series",
      "Impression Rail Express",
      "Metal & Premium Vinyl Railing",
    ],
    image: "/images/official/railings/timbertech-pvc-railing.jpg",
    imageAlt: "TimberTech AZEK PVC deck railing",
    website: "https://www.timbertech.com/products/railing/",
  },
]

export const lightingProducts: AccessoryProduct[] = [
  {
    id: "trex-lighting",
    brand: "Trex",
    title: "Trex Outdoor Deck Lighting",
    subtitle: "Official Trex lighting products",
    description:
      "We supply and install official Trex Outdoor Deck Lighting — energy-efficient LED fixtures for rail posts, stair risers, post caps, and recessed deck applications.",
    highlights: [
      "LED rail, riser, post cap, and recessed lights",
      "Plug-and-play LightHub® connection system",
      "Up to 75% less energy than incandescent",
      "Designed to integrate with Trex railing systems",
    ],
    lines: [
      "Deck Rail Lighting",
      "Deck Stair / Riser Lights",
      "Post Cap Lights",
      "Recessed Deck Lights",
    ],
    image: "/images/official/lighting/trex-deck-lighting.jpg",
    imageAlt: "Trex outdoor deck lighting on stairs and railing at night",
    website: "https://www.trex.com/products/deck-lighting/",
  },
  {
    id: "azek-lighting",
    brand: "TimberTech AZEK",
    title: "TimberTech AZEK Deck Lighting",
    subtitle: "Official AZEK lighting products",
    description:
      "We install official TimberTech AZEK lighting to extend usable deck time after dark — post cap lights, riser lights, under-rail accents, and integrated deck illumination.",
    highlights: [
      "Post cap, riser, under-rail, and accent lighting",
      "Compatible with composite and PVC railing posts",
      "Improves safety on stairs and transitions",
      "Extends outdoor living into the evening",
    ],
    lines: [
      "Lighted Island Cap",
      "Post Cap & LED Lantern Lights",
      "Riser & Under-Rail Lighting",
      "In-Deck & Accent Lights",
    ],
    image: "/images/official/lighting/azek-rail-lighting.jpg",
    imageAlt: "TimberTech AZEK deck and railing lighting at dusk",
    website: "https://www.timbertech.com/products/lighting/",
  },
]

export type GalleryProject = {
  id: number
  slug: string
  title: string
  category: "composite" | "custom" | "pressure-treated"
  material: string
  location: string
  description: string
  image: string
  images: string[]
}

export const galleryProjects: GalleryProject[] = [
  // Trex (Composite) Projects
  {
    id: 1,
    slug: "clifton-park-azek-harvest-collection",
    title: "Clifton Park Azek Harvest Collection",
    category: "custom",
    material: "azek",
    location: "Clifton Park, NY",
    description:
      "Multi-level AZEK Harvest Collection deck in Clifton Park with premium PVC decking, clean railing lines, and cascading stairs built for long-term low-maintenance performance.",
    image: "/images/Decks pics/trex/amar/62009209184__B466798B-8116-41AE-9668-CCB6919B03B1.JPG",
    images: [
      "/images/Decks pics/trex/amar/61886496958__C48B881D-B811-4FE0-A5FE-43DADD2AA866.JPG",
      "/images/Decks pics/trex/amar/62009209184__B466798B-8116-41AE-9668-CCB6919B03B1.JPG",
    ],
  },
  {
    id: 3,
    slug: "guilderland-trex-select-deck",
    title: "Guilderland Trex Select",
    category: "composite",
    material: "trex",
    location: "Guilderland, NY",
    description:
      "Elevated Trex Select composite deck in Guilderland with refined board profiles, durable shell technology, and a layout tailored to the home and backyard grade changes.",
    image: "/images/Decks pics/trex/jie/94E36501-07B6-448D-BFDB-42C7E27E41ED.jpg",
    images: [
      "/images/Decks pics/trex/jie/94E36501-07B6-448D-BFDB-42C7E27E41ED.jpg",
      "/images/Decks pics/trex/jie/C8EEECE3-4316-43E1-9F2D-55B1FAEE1669.jpg",
      "/images/Decks pics/trex/jie/D5FC441F-DB9E-4BFF-987B-52AB290B953D.jpg",
      "/images/Decks pics/trex/jie/FBF613B1-8025-4926-BACB-1EA41280B206.jpg",
      "/images/Decks pics/trex/jie/IMG_2324.PNG",
      "/images/Decks pics/trex/jie/IMG_2325.PNG",
      "/images/Decks pics/trex/jie/IMG_2326.PNG",
    ],
  },
  {
    id: 5,
    slug: "multi-level-stair-deck-colonie-ny",
    title: "Multi-Level Stair Deck",
    category: "composite",
    material: "trex",
    location: "Colonie, NY",
    description:
      "Multi-level Trex deck in Colonie built around a custom stair system, tiered platforms, and integrated transitions between outdoor living zones.",
    image: "/images/Decks pics/trex/rainbow stair deck/62752777499__C44A17E5-A05F-4984-974D-7478AFA92F01.JPG",
    images: [
      "/images/Decks pics/trex/rainbow stair deck/62752777499__C44A17E5-A05F-4984-974D-7478AFA92F01.JPG",
      "/images/Decks pics/trex/rainbow stair deck/62752779600__C4A81E2B-2BE0-483B-87DA-C1AAA35BA158.JPG",
    ],
  },
  {
    id: 9,
    slug: "trex-select-saratoga-ny",
    title: "Trex Select Saratoga, NY",
    category: "composite",
    material: "trex",
    location: "Saratoga, NY",
    description:
      "Trex Select composite deck in Saratoga with clean board profiles, low-maintenance performance, and a layout designed for everyday outdoor entertaining.",
    image: "/images/Decks pics/trex/jamie/IMG_0766.PNG",
    images: [
      "/images/Decks pics/trex/jamie/IMG_0766.PNG",
    ],
  },
  {
    id: 10,
    slug: "averil-park-trex-deck-ny",
    title: "Averil Park",
    category: "composite",
    material: "trex",
    location: "Averil Park, NY",
    description:
      "Custom Trex composite deck with thoughtful design and premium finishes, perfect for relaxation and entertaining.",
    image: "/images/Decks pics/trex/AVERILPARK/C2BD4D1A-F31F-4FAE-AEF5-0518798DAD2D.jpg",
    images: [
      "/images/Decks pics/trex/AVERILPARK/C2BD4D1A-F31F-4FAE-AEF5-0518798DAD2D.jpg",
      "/images/Decks pics/trex/AVERILPARK/IMG_0311.JPG",
      "/images/Decks pics/trex/AVERILPARK/IMG_0760.PNG",
    ],
  },
  {
    id: 6,
    slug: "van-schaick-elevated-composite-deck-albany-ny",
    title: "Van Schaick",
    category: "composite",
    material: "trex",
    location: "Albany, NY",
    description:
      "Custom elevated Trex composite deck with cable railings and LED step lighting, overlooking Van Schaick Island. Built with precision engineering and professional design.",
    image: "/images/Decks pics/trex/van schaick/9E24368C-09D2-40D4-BF95-09C8239CB07B.jpg",
    images: [
      "/images/Decks pics/trex/van schaick/9E24368C-09D2-40D4-BF95-09C8239CB07B.jpg",
      "/images/Decks pics/trex/van schaick/02FAF800-5BA6-417F-B695-67F0B90E1E8D.jpg",
      "/images/Decks pics/trex/van schaick/34832A12-CA30-49D5-89E4-9DC5E8AD0989.jpg",
      "/images/Decks pics/trex/van schaick/51AC5E23-B0A2-47FF-8BF3-BCFDF0C8EAC5.jpg",
      "/images/Decks pics/trex/van schaick/IMG_0145.JPG",
      "/images/Decks pics/trex/van schaick/IMG_0146.JPG",
      "/images/Decks pics/trex/van schaick/IMG_0147.JPG",
      "/images/Decks pics/trex/van schaick/IMG_0148.JPG",
      "/images/Decks pics/trex/van schaick/IMG_0149.JPG",
      "/images/Decks pics/trex/van schaick/IMG_0150.JPG",
      "/images/Decks pics/trex/van schaick/IMG_0152.JPG",
      "/images/Decks pics/trex/van schaick/IMG_0153.JPG",
      "/images/Decks pics/trex/van schaick/IMG_0392.JPG",
      "/images/Decks pics/trex/van schaick/IMG_0393.JPG",
    ],
  },

  // AZEK (Custom) Projects
  {
    id: 7,
    slug: "azek-sunroom-deck-rensselaer-ny",
    title: "AZEK with Sunroom",
    category: "custom",
    material: "azek",
    location: "Rensselaer, NY",
    description:
      "Premium AZEK rooftop deck with integrated sunroom transformation. Features AZEK PVC decking, glass panel railings, and integrated lighting — engineered for ultimate durability.",
    image: "/images/Decks pics/azek/kelsey deck nice trex/1B1C705F-748D-47C1-B65D-20FBA3C3577F.jpg",
    images: [
      "/images/Decks pics/azek/kelsey deck nice trex/1B1C705F-748D-47C1-B65D-20FBA3C3577F.jpg",
      "/images/Decks pics/azek/kelsey deck nice trex/525FADD7-63C6-417D-BCD4-D67F9CA831EE.jpg",
      "/images/Decks pics/azek/kelsey deck nice trex/61637121777__465996FE-7796-4C53-93D5-E72F6F05B4B6.jpg",
      "/images/Decks pics/azek/kelsey deck nice trex/61637122918__F60EF1C3-2BE3-4154-9201-3E0B56F65968.jpg",
      "/images/Decks pics/azek/kelsey deck nice trex/61637124782__55CEFA9E-D6F9-4CB0-8E84-480BB0B15184.JPG",
      "/images/Decks pics/azek/kelsey deck nice trex/88F53BD1-5448-4D0E-B5CE-F1FEEF24547D.jpg",
      "/images/Decks pics/azek/kelsey deck nice trex/8BC4A7AD-0329-4A6A-B829-8146D5EF4EF3.jpg",
    ],
  },
  {
    id: 11,
    slug: "azek-custom-deck-planters-baltimore-md",
    title: "AZEK Custom Deck with Planters",
    category: "custom",
    material: "azek",
    location: "Baltimore, MD",
    description:
      "AZEK deck project featuring premium PVC decking, clean perimeter detailing, and a low-maintenance finish built for a refined outdoor living experience.",
    image: "/images/28 BALTIMORE PICS/1.png",
    images: [
      "/images/28 BALTIMORE PICS/1.png",
      "/images/28 BALTIMORE PICS/2.png",
      "/images/28 BALTIMORE PICS/3.png",
      "/images/28 BALTIMORE PICS/4.png",
      "/images/28 BALTIMORE PICS/5.png",
      "/images/28 BALTIMORE PICS/6.png",
    ],
  },
  {
    id: 13,
    slug: "azek-pool-deck-clifton-park-ny",
    title: "AZEK Pool Deck",
    category: "custom",
    material: "azek",
    location: "Clifton Park, NY",
    description:
      "AZEK pool deck project with crisp white railings, low-maintenance PVC decking, and clean transitions designed for everyday backyard use.",
    image: "/images/AZEK CP/Screenshot 2026-04-28 084745.png",
    images: [
      "/images/AZEK CP/Screenshot 2026-04-28 084745.png",
      "/images/AZEK CP/Screenshot 2026-04-28 084804.png",
      "/images/AZEK CP/Screenshot 2026-04-28 084835.png",
    ],
  },

  // PT (Pressure-Treated) Projects
  {
    id: 8,
    slug: "pressure-treated-deck-troy-ny",
    title: "Pressure Treated Deck",
    category: "pressure-treated",
    material: "PT",
    location: "Troy, NY",
    description:
      "Large-scale elevated pressure-treated deck in Troy with structural framing, professional board installation, and a classic wood deck built for long-term outdoor use.",
    image: "/images/Decks pics/PT/brandon - deck/A47A30B4-18E3-40ED-BABF-E92281860AF6.jpg",
    images: [
      "/images/Decks pics/PT/brandon - deck/A47A30B4-18E3-40ED-BABF-E92281860AF6.jpg",
      "/images/Decks pics/PT/brandon - deck/DB82D349-7C6D-4A59-96AA-491262F794F3.jpg",
      "/images/Decks pics/PT/brandon - deck/DBE752BF-897B-4914-B015-46888E3ABECA.jpg",
    ],
  },
  {
    id: 12,
    slug: "pressure-treated-pool-deck-maryland",
    title: "Pressure Treated Pool Deck",
    category: "pressure-treated",
    material: "PT",
    location: "Maryland",
    description:
      "Pressure-treated deck project showcasing the structural build stage and overall framing layout for a classic wood deck installation.",
    image: "/images/PRESSURETREATEDMD/Screenshot 2026-04-28 054534.png",
    images: [
      "/images/PRESSURETREATEDMD/Screenshot 2026-04-28 054534.png",
      "/images/PRESSURETREATEDMD/Screenshot 2026-04-28 054547.png",
      "/images/PRESSURETREATEDMD/Screenshot 2026-04-28 054555.png",
    ],
  },
]

export const featuredProjects = [
  galleryProjects.find(p => p.id === 7)!, // AZEK with Sunroom
  galleryProjects.find(p => p.id === 6)!, // Van Schaick
  galleryProjects.find(p => p.id === 10)!, // Averil Park
  galleryProjects.find(p => p.id === 8)!, // Pressure Treated Deck
].filter(Boolean) as typeof galleryProjects

export function getAllGalleryProjects() {
  return galleryProjects
}

export function getGalleryProjectBySlug(slug: string) {
  return galleryProjects.find((project) => project.slug === slug)
}

export const designServices = {
  title: "Professional Design Services",
  tagline: "Transform your vision into reality with expert rendering and planning",
  description: "Every custom deck starts with thoughtful design. Our in-house design team creates detailed renderings and structural plans for every project — giving you the confidence to invest in your outdoor space.",
  benefits: [
    "Free rendering with every estimate for qualified customers",
    "Detailed structural plans drawn in-house"
  ],
  mainImage: "/images/Decks pics/design/pth28b.png",
  screenshots: [
    "/images/Decks pics/design/Screenshot 2026-03-17 001838.png",
    "/images/Decks pics/design/Screenshot 2026-03-17 001859.png"
  ]
}

export const testimonials = [
  {
    name: "Michael R.",
    location: "Loudonville, NY",
    rating: 5,
    text: "Elevated Decks transformed the back of our home. The elevated deck they built over the slope is absolutely stunning, and the structural quality is evident in every detail. Couldn't be more impressed.",
    project: "Elevated Backyard Deck",
  },
  {
    name: "Sandra T.",
    location: "Albany, NY",
    rating: 5,
    text: "We hired them for a rooftop-style deck addition. They handled the planning process smoothly and the result is a magazine-worthy space. Worth every penny.",
    project: "Rooftop Deck Construction",
  },
  {
    name: "James & Laura K.",
    location: "Saratoga Springs, NY",
    rating: 5,
    text: "The team's structural knowledge is unmatched. They designed a multi-level deck that handles our elevation changes perfectly. Built to last, looks incredible, and done on schedule.",
    project: "Multi-Level Deck System",
  },
  {
    name: "David P.",
    location: "Niskayuna, NY",
    rating: 5,
    text: "Professional from start to finish. The Ipe hardwood they installed is breathtaking and the cable railing system is exactly what I envisioned. This is real craftsmanship.",
    project: "Hardwood Deck & Cable Railings",
  },
]

export const processSteps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We visit your home, walk the site, and talk through layout, materials, and budget so we understand what you want from the project.",
  },
  {
    number: "02",
    title: "Design & Planning",
    description:
      "Our team prepares detailed renderings and plans tailored to your space. You see the design before construction starts.",
  },
  {
    number: "03",
    title: "Permits & Approvals",
    description:
      "We handle permit paperwork and coordinate with local authorities so the project meets code requirements.",
  },
  {
    number: "04",
    title: "Construction",
    description:
      "Our crew builds your deck with attention to structure, finishes, and schedule. We keep you updated as work progresses.",
  },
  {
    number: "05",
    title: "Final Walkthrough",
    description:
      "We complete final details, review the finished deck with you, and make sure everything is ready for use.",
  },
]
