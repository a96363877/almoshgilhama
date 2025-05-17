// تصنيفات اللحوم والمواشي
export const meatCategories = [
    {
      id: "offers",
      name: "عروض",
      image: "/1.png",
      description: "أفضل العروض والخصومات على منتجاتنا",
    },
    {
      id: "sheep",
      name: "لحوم الضأن",
      image: "/4.png",
      description: "لحوم الضأن الطازجة بأنواعها",
    },
    {
      id: "beef",
      name: "لحوم البقر",
      image: "/3.png",
      description: "لحوم البقر الطازجة والمستوردة",
    },
    {
      id: "camel",
      name: "لحوم الإبل",
      image: "/placeholder.svg?height=80&width=80",
      description: "لحوم الإبل الطازجة",
    },
    {
      id: "poultry",
      name: "الدواجن",
      image: "/2.png",
      description: "الدجاج والديك الرومي الطازج",
    },
    {
      id: "processed",
      name: "لحوم مصنعة",
      image: "/placeholder.svg?height=80&width=80",
      description: "اللحوم المصنعة والمجهزة",
    },
  ]
  
  // منتجات اللحوم حسب التصنيف
  export const meatProducts = {
    sheep: [
      {
        id: "sheep-naeemi",
        name: "خاروف نعيمي كامل",
        description: "خاروف نعيمي كامل طازج - وزن 15-18 كجم",
        price: "45.00",
        image: "/ais.jpg",
        popular: true,
      },
      {
        id: "sheep-najdi",
        name: "خاروف نجدي",
        description: "خاروف نجدي كامل طازج - وزن 12-15 كجم",
        price: "42.00",
        image: "/njf.jpg",
        popular: false,
      },
      {
        id: "sheep-harri",
        name: "خاروف حري",
        description: "خاروف حري كامل طازج - وزن 10-12 كجم",
        price: "38.00",
        image: "/63f365c64eaaf.png",
        popular: false,
      },
      {
        id: "sheep-leg",
        name: "فخذ ضأن",
        description: "فخذ ضأن طازج مع العظم - وزن 2-3 كجم",
        price: "12.50",
        image: "sscx.webp",
        popular: true,
      },
      {
        id: "sheep-ribs",
        name: "أضلاع ضأن",
        description: "أضلاع ضأن طازجة - وزن 1-1.5 كجم",
        price: "8.50",
        image: "/63f365c64eaaf.png",
        popular: false,
      },
      {
        id: "sheep-shoulder",
        name: "كتف ضأن",
        description: "كتف ضأن طازج - وزن 1.5-2 كجم",
        price: "10.00",
        image: "/ktf.jpg",
        popular: false,
      },
    ],
    beef: [
      {
        id: "beef-local",
        name: "لحم بقري بحريني",
        description: "لحم بقري بحريني طازج - 10 كجم",
        price: "7.00",
        image: "/sscx.webp",
        popular: true,
      },
      {
        id: "beef-australian",
        name: "لحم بقري أسترالي",
        description: "لحم بقري أسترالي ممتاز - كرتون 5 كجم",
        price: "4.50",
        image: "/1000150127.jpg",
        popular: true,
      },
      {
        id: "beef-tenderloin",
        name: "فيليه بقري",
        description: "فيليه بقري طازج - وزن 1 كجم",
        price: "9.50",
        image: "/felsbs.webp",
        popular: false,
      },
      {
        id: "beef-ribeye",
        name: "ريب آي بقري",
        description: "ريب آي بقري طازج - وزن 1 كجم",
        price: "8.75",
        image: "/1000150127.jpg",
        popular: false,
      },
      {
        id: "beef-ground",
        name: "لحم بقري مفروم",
        description: "لحم بقري مفروم طازج - وزن 1 كجم",
        price: "3.50",
        image: "/sscx.webp",
        popular: true,
      },
    ],
    camel: [
      {
        id: "camel-meat",
        name: "لحم جمل",
        description: "لحم جمل طازج - وزن 1 كجم",
        price: "6.50",
        image: "/placeholder.svg?height=200&width=200",
        popular: false,
      },
      {
        id: "camel-hump",
        name: "سنام الجمل",
        description: "سنام الجمل الطازج - وزن 2-3 كجم",
        price: "12.00",
        image: "/placeholder.svg?height=200&width=200",
        popular: false,
      },
    ],
    poultry: [
      {
        id: "chicken-whole",
        name: "دجاج كامل",
        description: "دجاج كامل طازج - وزن 1.5 كجم",
        price: "5.70",
        image: "https://cdn.salla.sa/alpwW/p4PWkDMkUUU4bAZLAY04Zr7LJJIu1fg0V14J9TIg.png",
        popular: true,
      },
      {
        id: "chicken-breast",
        name: "صدور دجاج",
        description: "صدور دجاج طازجة - وزن 6 كجم",
        price: "1.00",
        image:
          "https://cdn.salla.sa/XRVjV/7c4401c0-ec89-4dd2-af3c-82f31bac4262-1000x1000-4XAOOzl8EA3wmJi0iNFjClPvor7yQf7WMiDZItAS.png",
        popular: true,
      },
      {
        id: "chicken-thighs",
        name: "أفخاذ دجاج",
        description: "أفخاذ دجاج طازجة - وزن 4 كجم",
        price: "2.50",
        image:
          "https://cdn.salla.sa/XRVjV/7c4401c0-ec89-4dd2-af3c-82f31bac4262-1000x1000-4XAOOzl8EA3wmJi0iNFjClPvor7yQf7WMiDZItAS.png",
        popular: false,
      },
     
    ],
    processed: [
      {
        id: "kebab-meat",
        name: "لحم كباب",
        description: "لحم كباب جاهز للشوي - وزن 1 كجم",
        price: "4.00",
        image: "/placeholder.svg?height=200&width=200",
        popular: false,
      },
      {
        id: "kofta",
        name: "كفتة لحم",
        description: "كفتة لحم جاهزة - وزن 1 كجم",
        price: "3.75",
        image: "/placeholder.svg?height=200&width=200",
        popular: false,
      },
    ],
    offers: [
      {
        id: "offer-eid",
        name: "عرض العيد - خاروف نعيمي",
        description: "خاروف نعيمي كامل مع التنظيف والتقطيع",
        price: "45.00",
        image: "/ais.jpg",
        popular: true,
      },
      {
        id: "offer-bahrain",
        name: "عرض البحرين",
        description: "10 كيلو لحم بقري بحريني ممتاز طازج",
        price: "7.00",
        image: "/",
        popular: true,
      },
      {
        id: "offer-delmon",
        name: "عرض دلمون",
        description: "1 كيلو لحم غنم طازج مع التنظيف",
        price: "1.00",
        image: "/gaanm.jpg",
        popular: true,
      },
      {
        id: "offer-daily",
        name: "عرض اليوم",
        description: "4 كيلو صدور دجاج طازجة مقطعة",
        price: "2.50",
        image:
          "/sdoor.webp",
        popular: true,
      },
    ],
  }
  
  // الحصول على جميع المنتجات في قائمة واحدة
  export const getAllProducts = () => {
    const allProducts: any[] = []
    Object.values(meatProducts).forEach((categoryProducts) => {
      allProducts.push(...categoryProducts)
    })
    return allProducts
  }
  
  // الحصول على المنتجات المميزة
  export const getFeaturedProducts = () => {
    return getAllProducts().filter((product) => product.popular)
  }
  