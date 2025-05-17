"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Minus, Plus, Clock, Award, ShieldCheck } from "lucide-react"
import toast from "react-hot-toast"
import { useCart } from "@/app/context/cart-context"

type ProductDetailsProps = {
  isOpen: boolean
  onClose: () => void
  product: any
}

export default function ProductDetails({ isOpen, onClose, product }: ProductDetailsProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    })
    toast.success("تم إضافة المنتج إلى السلة")
    onClose()
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden" dir="rtl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-full">
            <img
              src={product.image || "/placeholder.svg?height=400&width=400"}
              alt={product.name}
              className="object-cover"
            />
          </div>

          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
              <DialogDescription className="text-green-700 text-lg font-bold mt-1">
                {product.price} د.ب
              </DialogDescription>
            </DialogHeader>

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
      </DialogContent>
    </Dialog>
  )
}
