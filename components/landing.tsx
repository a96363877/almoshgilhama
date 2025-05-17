"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import {
  Search,
  ShoppingCart,
  Menu,
  Star,
  Clock,
  ChevronRight,
  ChevronLeft,
  Instagram,
  Award,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { meatCategories, meatProducts, getFeaturedProducts } from "../data/meat-categories"
import { useCart } from "@/app/context/cart-context"

function Landing({
  handleNextPage,
  handleShowBenefits,
}: {
  handleNextPage: () => void
  handleShowBenefits: () => void
}) {
  const router = useRouter()
  const { total, cartItems, addToCart } = useCart()
  const [activeCategory, setActiveCategory] = useState<string>("offers")
  const [displayProducts, setDisplayProducts] = useState<any[]>([])
  const featuredProducts = getFeaturedProducts()

  // تحديث المنتجات المعروضة عند تغيير التصنيف
  useEffect(() => {
    if (activeCategory === "all") {
      setDisplayProducts(featuredProducts)
    } else {
      setDisplayProducts(meatProducts[activeCategory as keyof typeof meatProducts] || [])
    }
  }, [activeCategory])

  const handleAddtoCart = (item: any) => {
    addToCart(item)
    toast.success("تم اضافة المنتج")
  }

  // التمرير أفقيًا للتصنيفات
  const scrollCategories = (direction: "left" | "right") => {
    const container = document.getElementById("categories-container")
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handleViewProduct = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* الهيدر */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <div className="relative h-12 w-32">
                  <Image src="/logggd.png" alt="لحوم دلمون" fill className="object-contain" />
                </div>
              </Link>
              <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
                <Menu className="h-4 w-4" />
                <span>القائمة</span>
              </Button>
            </div>

            <div className="hidden md:flex relative flex-1 mx-8">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="ابحث عن المنتجات..."
                className="w-full rounded-md border border-gray-300 py-2 pr-10 pl-4 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleShowBenefits}
                className="hidden md:flex items-center gap-2 text-green-600 border-green-600"
              >
                <Award className="h-4 w-4" />
                <span>مميزاتنا</span>
              </Button>

              <Button onClick={handleNextPage} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                <ShoppingCart className="h-4 w-4" />
                <span>{total.toFixed(2)} د.ب</span>
                {cartItems.length > 0 && (
                  <Badge variant="outline" className="bg-white text-green-600 ml-1">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* قسم الترحيب */}
      <section className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">لحوم دلمون</h1>
              <p className="text-gray-600 mb-4 md:mb-0">
                اكتشف منتجاتنا عالية الجودة من اللحوم الطازجة والمستوردة والدواجن المميزة.
              </p>
            </div>
            <Button
              onClick={handleShowBenefits}
              variant="outline"
              className="flex items-center gap-2 text-green-600 border-green-600"
            >
              <Award className="h-4 w-4" />
              <span>تعرف على مميزاتنا</span>
            </Button>
          </div>

          {/* تصنيفات اللحوم */}
          <div className="relative">
            <button
              onClick={() => scrollCategories("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>

            <div id="categories-container" className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {meatCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex flex-col items-center cursor-pointer min-w-[80px] transition-all ${
                    activeCategory === category.id ? "scale-105" : ""
                  }`}
                >
                  <div
                    className={`relative h-16 w-16 rounded-full overflow-hidden mb-2 border-2 ${
                      activeCategory === category.id ? "border-green-500" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={category.image || "/placeholder.svg?height=80&width=80"}
                      alt={category.name}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollCategories("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* الفلاتر */}
          <div className="flex flex-wrap gap-2 mt-6">
            <Badge variant="outline" className="bg-white cursor-pointer hover:bg-gray-50 py-2 px-4">
              <Clock className="h-4 w-4 ml-1" />
              توصيل مجاني
            </Badge>
            <Badge variant="outline" className="bg-white cursor-pointer hover:bg-gray-50 py-2 px-4">
              خلال 40 دقيقة
            </Badge>
            <Badge variant="outline" className="bg-white cursor-pointer hover:bg-gray-50 py-2 px-4">
              نقل مخصص
            </Badge>
          </div>
        </div>
      </section>

      {/* بطاقة التاجر */}
      <section className="container mx-auto px-4 -mt-4">
        <Card className="overflow-hidden">
          <div className="relative h-48 w-full">
            <Image src="/min.png" alt="قائمة لحوم دلمون" fill className="object-cover" />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className="bg-yellow-500">خصم %30</Badge>
              <Badge className="bg-green-600">ادعم المحلي</Badge>
            </div>
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center">
              <Clock className="h-4 w-4 ml-1" />
              <span className="text-sm">40 دقيقة</span>
            </div>
          </div>

          <CardContent className="p-4">
            <h2 className="text-2xl font-bold mb-1">قائمة لحوم دلمون</h2>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <div className="flex items-center ml-4">
                <Star className="h-4 w-4 text-yellow-400 ml-1" />
                <span>4.7</span>
              </div>
              <span>اللحوم الطازجة والمستوردة والدواجن المميزة</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3 border-t border-b">
              <div className="text-center">
                <p className="text-sm text-gray-500">وقت التوصيل</p>
                <p className="font-semibold">40 دقيقة</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">التقييم</p>
                <p className="font-semibold">4.7</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">المسافة</p>
                <p className="font-semibold">15 كيلو</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">ساعات العمل</p>
                <p className="font-semibold text-green-600">مفتوح</p>
              </div>
            </div>

            <p className="text-gray-600 mt-4">أطلب الآن عبر موقعنا واحصل على خدمة توصيل سريعة في غضون 28 دقيقة.</p>
          </CardContent>
        </Card>
      </section>

      {/* عرض المنتجات حسب التصنيف */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {activeCategory === "all"
              ? "منتجات مميزة"
              : meatCategories.find((cat) => cat.id === activeCategory)?.name || "منتجات"}
          </h2>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              className="text-sm border-none bg-transparent focus:outline-none text-gray-500"
              onChange={(e) => setActiveCategory(e.target.value)}
              value={activeCategory}
            >
              <option value="all">جميع المنتجات</option>
              {meatCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              onAddToCart={handleAddtoCart}
              onViewProduct={handleViewProduct}
            />
          ))}
        </div>
      </section>

      {/* العروض المميزة */}
      <section className="container mx-auto px-4 pb-24">
        <h2 className="text-2xl font-bold mb-6">عروض مميزة</h2>
        <div className="space-y-4">
          {meatProducts.offers.map((product) => (
            <HorizontalProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              onAddToCart={handleAddtoCart}
              onViewProduct={handleViewProduct}
            />
          ))}
        </div>
      </section>

      {/* زر السلة للموبايل */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white py-3 px-4 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Badge variant="outline" className="bg-white text-green-600 ml-2">
              {cartItems.length === 0 ? 0 : cartItems.length}
            </Badge>
            <span className="font-bold">{total.toFixed(2)} د.ب</span>
          </div>

          <Button onClick={handleNextPage} variant="outline" className="text-white border-white hover:bg-green-700">
            <span className="ml-2">اذهب الى السلة</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* الفوتر */}
      <footer className="bg-white py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex gap-4 mb-2">
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  الشروط والأحكام
                </a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  سياسة الخصوصية
                </a>
              </div>
              <p className="text-sm text-gray-500">© 2024 الشركة دلمون للحوم</p>
            </div>

            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// مكون بطاقة المنتج
function ProductCard({
  id,
  name,
  price,
  image,
  onAddToCart,
  onViewProduct,
}: {
  id: string
  name: string
  price: string
  image: string
  onAddToCart: (item: any) => void
  onViewProduct: (id: string) => void
}) {
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
      <div className="relative aspect-square cursor-pointer" onClick={() => onViewProduct(id)}>
        <img src={image || "/placeholder.svg?height=200&width=200"} alt={name}  className="object-cover" />
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-green-700">{price} د.ب</h3>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2 mb-3 cursor-pointer" onClick={() => onViewProduct(id)}>
          {name}
        </p>
        <Button
          onClick={() =>
            onAddToCart({
              id,
              name,
              price,
              img: image,
            })
          }
          className="w-full bg-green-600 hover:bg-green-700"
        >
          إضافة
        </Button>
      </CardContent>
    </Card>
  )
}

// مكون بطاقة المنتج الأفقية
function HorizontalProductCard({
  id,
  name,
  description,
  price,
  image,
  onAddToCart,
  onViewProduct,
}: {
  id: string
  name: string
  description: string
  price: string
  image: string
  onAddToCart: (item: any) => void
  onViewProduct: (id: string) => void
}) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="flex">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 cursor-pointer" onClick={() => onViewProduct(id)}>
          <Image src={image || "/placeholder.svg?height=200&width=200"} alt={name} fill className="object-cover" />
        </div>
        <div className="flex-1 p-3 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg cursor-pointer" onClick={() => onViewProduct(id)}>
              {name}
            </h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-green-700">{price} د.ب</span>
            <div className="flex gap-2">
              <Button
                onClick={() => onViewProduct(id)}
                size="sm"
                variant="outline"
                className="border-green-600 text-green-600"
              >
                التفاصيل
              </Button>
              <Button
                onClick={() =>
                  onAddToCart({
                    id,
                    name,
                    price,
                    img: image,
                  })
                }
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                إضافة
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Landing
