"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useCart } from "../../../context/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Minus, Plus, Clock, Award, ShieldCheck } from "lucide-react"
import toast from "react-hot-toast"
import { getAllProducts } from "../../../data/meat-categories"

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch product by ID
    const allProducts = getAllProducts()
    const foundProduct = allProducts.find((p) => p.id === params.id)

    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      // Product not found, redirect to home
      router.push("/")
      toast.error("المنتج غير موجود")
    }

    setLoading(false)
  }, [params.id, router])

  const handleAddToCart = () => {
    if (!product) return

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.image,
      quantity,
    })

    toast.success("تم إضافة المنتج إلى السلة")
    router.push("/")
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 animate-spin h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-50 py-6" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="flex items-center text-green-600 hover:text-green-700"
          >
            <ChevronRight className="h-4 w-4 ml-1" />
            العودة للتسوق
          </Button>
          <h1 className="text-2xl font-bold mr-2">تفاصيل المنتج</h1>
        </div>

        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-96">
              <Image
                src={product.image || "/placeholder.svg?height=400&width=400"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-green-700 text-lg font-bold mt-1">{product.price} د.ب</p>

              <div className="mt-4">
                <p className="text-gray-600">{product.description}</p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-green-600 ml-2" />
                    <span>جودة ممتازة مضمونة</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-green-600 ml-2" />
                    <span>توصيل خلال 40 دقيقة</span>
                  </div>
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 text-green-600 ml-2" />
                    <span>ذبح حلال 100%</span>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-medium">الكمية:</span>
                    <div className="flex items-center border rounded-md">
                      <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center">{quantity}</span>
                      <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleAddToCart} className="w-full bg-green-600 hover:bg-green-700">
                    إضافة إلى السلة
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
