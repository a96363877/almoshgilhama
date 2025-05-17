"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, Minus, Plus, Trash2, CreditCard, Banknote, MapPin, Truck, Shield } from "lucide-react"
import toast from "react-hot-toast"
import { useCart } from "@/app/context/cart-context"

type CheckoutStep = "cart" | "shipping" | "payment" | "confirmation"
type PaymentMethod = "card" | "cash" | "benefit"

export default function CartPage({ handleBackToShopping }: { handleBackToShopping: () => void }) {
  const router = useRouter()
  const { cartItems, total, updateQuantity, removeFromCart, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart")
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash")
  const [benefitInfo, setBenefitInfo] = useState({
    phoneNumber: "",
    otp: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  // Shipping cost calculation
  const shippingCost = total > 10 ? 0 : 1.5
  const grandTotal = total + shippingCost

  const handleQuantityChange = (id: string | number, change: number) => {
    const item = cartItems.find((item) => item.id === id)
    if (item) {
      const newQuantity = (item.quantity || 1) + change
      if (newQuantity > 0) {
        updateQuantity(id, newQuantity)
      } else {
        removeFromCart(id)
      }
    }
  }

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleBenefitInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBenefitInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate shipping info
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }
    setCurrentStep("payment")
  }

  const handleSendOtp = () => {
    if (!benefitInfo.phoneNumber || benefitInfo.phoneNumber.length < 8) {
      toast.error("يرجى إدخال رقم هاتف صحيح")
      return
    }

    setIsProcessing(true)
    // Simulate OTP sending
    setTimeout(() => {
      setIsProcessing(false)
      setOtpSent(true)
      toast.success("تم إرسال رمز التحقق إلى هاتفك")
    }, 1500)
  }

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate payment method specific fields
    if (paymentMethod === "benefit") {
      if (!benefitInfo.phoneNumber || !benefitInfo.otp) {
        toast.error("يرجى إكمال معلومات الدفع عبر بينفت")
        return
      }

      if (benefitInfo.otp !== "1234") {
        // Simulated OTP validation
        toast.error("رمز التحقق غير صحيح")
        return
      }
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderComplete(true)
      setOrderId(`ORD-${Math.floor(100000 + Math.random() * 900000)}`)
      clearCart()
      setCurrentStep("confirmation")
    }, 2000)
  }

  // Empty cart state
  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-10" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={handleBackToShopping}
              className="flex items-center text-green-600 hover:text-green-700"
            >
              <ChevronRight className="h-4 w-4 ml-1" />
              العودة للتسوق
            </Button>
          </div>

          <Card className="mx-auto max-w-md text-center p-8">
            <div className="flex justify-center mb-6">
              <div className="relative h-32 w-32">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="سلة فارغة"
                  fill
                  className="object-contain opacity-50"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">سلة التسوق فارغة</h2>
            <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد.</p>
            <Button onClick={handleBackToShopping} className="bg-green-600 hover:bg-green-700">
              العودة للتسوق
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  // Order confirmation state
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-10" dir="rtl">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-2xl text-center p-8">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">تم تأكيد طلبك بنجاح!</h2>
            <p className="text-gray-600 mb-2">رقم الطلب: {orderId}</p>
            <p className="text-gray-600 mb-6">سيتم توصيل طلبك في غضون 40 دقيقة.</p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2">تفاصيل التوصيل</h3>
              <p className="text-gray-700">{shippingInfo.fullName}</p>
              <p className="text-gray-700">{shippingInfo.phone}</p>
              <p className="text-gray-700">
                {shippingInfo.address}، {shippingInfo.city}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2">طريقة الدفع</h3>
              <p className="text-gray-700">
                {paymentMethod === "cash"
                  ? "الدفع عند الاستلام"
                  : paymentMethod === "benefit"
                    ? `بينفت - ${benefitInfo.phoneNumber}`
                    : "بطاقة ائتمان"}
              </p>
            </div>
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700">العودة للتسوق</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={handleBackToShopping}
            className="flex items-center text-green-600 hover:text-green-700"
          >
            <ChevronRight className="h-4 w-4 ml-1" />
            العودة للتسوق
          </Button>
          <h1 className="text-2xl font-bold mr-2">سلة التسوق</h1>
        </div>

        {/* Checkout Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-0">
                <Tabs value={currentStep} className="w-full">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger
                      value="cart"
                      onClick={() => setCurrentStep("cart")}
                      disabled={currentStep === "confirmation"}
                      className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
                    >
                      السلة
                    </TabsTrigger>
                    <TabsTrigger
                      value="shipping"
                      onClick={() => cartItems.length > 0 && setCurrentStep("shipping")}
                      disabled={cartItems.length === 0 || currentStep === "confirmation"}
                      className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
                    >
                      الشحن
                    </TabsTrigger>
                    <TabsTrigger
                      value="payment"
                      onClick={() => false} // Disabled until shipping is complete
                      disabled={true}
                      className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
                    >
                      الدفع
                    </TabsTrigger>
                  </TabsList>

                  {/* Cart Items Tab */}
                  <TabsContent value="cart" className="p-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center py-4 border-b last:border-0">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden">
                          <Image
                            src={item.img || "/placeholder.svg?height=80&width=80"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 mr-4">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-green-600 font-bold">{item.price} د.ب</p>
                        </div>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-3 font-medium">{item.quantity || 1}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 mr-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={() => clearCart()}>
                        إفراغ السلة
                      </Button>
                      <Button onClick={() => setCurrentStep("shipping")} className="bg-green-600 hover:bg-green-700">
                        متابعة الطلب
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Shipping Tab */}
                  <TabsContent value="shipping" className="p-4">
                    <form onSubmit={handleSubmitShipping}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label htmlFor="fullName">الاسم الكامل *</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={shippingInfo.fullName}
                            onChange={handleShippingInfoChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">رقم الهاتف *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={shippingInfo.phone}
                            onChange={handleShippingInfoChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">العنوان *</Label>
                          <Input
                            id="address"
                            name="address"
                            value={shippingInfo.address}
                            onChange={handleShippingInfoChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">المدينة *</Label>
                          <Input
                            id="city"
                            name="city"
                            value={shippingInfo.city}
                            onChange={handleShippingInfoChange}
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="notes">ملاحظات إضافية</Label>
                          <Textarea
                            id="notes"
                            name="notes"
                            value={shippingInfo.notes}
                            onChange={handleShippingInfoChange}
                            placeholder="أي تعليمات خاصة للتوصيل"
                            className="resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={() => setCurrentStep("cart")}>
                          العودة للسلة
                        </Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">
                          متابعة للدفع
                        </Button>
                      </div>
                    </form>
                  </TabsContent>

                  {/* Payment Tab */}
                  <TabsContent value="payment" className="p-4">
                    <form onSubmit={handleSubmitPayment}>
                      <div className="mb-6">
                        <h3 className="font-bold mb-4">اختر طريقة الدفع</h3>
                        <RadioGroup
                          value={paymentMethod}
                          onValueChange={(value) => {
                            setPaymentMethod(value as PaymentMethod)
                            setOtpSent(false) // Reset OTP state when changing payment method
                          }}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash" className="flex items-center cursor-pointer">
                              <Banknote className="h-5 w-5 ml-2 text-green-600" />
                              الدفع عند الاستلام
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="benefit" id="benefit" />
                            <Label htmlFor="benefit" className="flex items-center cursor-pointer">
                              <div className="relative h-5 w-10 ml-2">
                                <Image
                                  src="/benefit-logo.png"
                                  alt="بينفت"
                                  width={40}
                                  height={20}
                                  className="object-contain"
                                />
                              </div>
                              الدفع عبر بينفت
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center cursor-pointer">
                              <CreditCard className="h-5 w-5 ml-2 text-green-600" />
                              بطاقة ائتمان
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {paymentMethod === "benefit" && (
                        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
                          <div className="flex items-center mb-4">
                            <div className="relative h-8 w-16 ml-2">
                              <Image
                                src="/benefit-logo.png"
                                alt="بينفت"
                                width={64}
                                height={32}
                                className="object-contain"
                              />
                            </div>
                            <h4 className="font-bold">الدفع عبر بينفت</h4>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="phoneNumber">رقم الهاتف المسجل في بينفت</Label>
                              <div className="flex mt-1">
                                <Input
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  value={benefitInfo.phoneNumber}
                                  onChange={handleBenefitInfoChange}
                                  placeholder="973XXXXXXXX"
                                  className="rounded-l-none"
                                  disabled={otpSent}
                                />
                                <Button
                                  type="button"
                                  onClick={handleSendOtp}
                                  className="rounded-r-none bg-blue-600 hover:bg-blue-700"
                                  disabled={otpSent || isProcessing}
                                >
                                  {isProcessing ? "جاري الإرسال..." : otpSent ? "تم الإرسال" : "إرسال رمز التحقق"}
                                </Button>
                              </div>
                            </div>

                            {otpSent && (
                              <div>
                                <Label htmlFor="otp">رمز التحقق</Label>
                                <Input
                                  id="otp"
                                  name="otp"
                                  value={benefitInfo.otp}
                                  onChange={handleBenefitInfoChange}
                                  placeholder="أدخل رمز التحقق المرسل إلى هاتفك"
                                  className="mt-1"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  تم إرسال رمز التحقق إلى رقم الهاتف المدخل. يرجى إدخال الرمز لإتمام عملية الدفع.
                                </p>
                              </div>
                            )}

                            <div className="flex items-center text-sm text-gray-600">
                              <Shield className="h-4 w-4 ml-1 text-blue-600" />
                              <span>معاملات آمنة ومشفرة بالكامل</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "card" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="md:col-span-2">
                            <Label htmlFor="cardNumber">رقم البطاقة</Label>
                            <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                          </div>
                          <div>
                            <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                            <Input id="expiryDate" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">رمز الأمان (CVV)</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="cardName">الاسم على البطاقة</Label>
                            <Input id="cardName" />
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={() => setCurrentStep("shipping")}>
                          العودة للشحن
                        </Button>
                        <Button
                          type="submit"
                          className="bg-green-600 hover:bg-green-700"
                          disabled={isProcessing || (paymentMethod === "benefit" && (!otpSent || !benefitInfo.otp))}
                        >
                          {isProcessing ? "جاري المعالجة..." : "تأكيد الطلب"}
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x {item.quantity || 1}
                      </span>
                      <span className="font-medium">
                        {(Number.parseFloat(item.price) * (item.quantity || 1)).toFixed(2)} د.ب
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي</span>
                    <span className="font-medium">{total.toFixed(2)} د.ب</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Truck className="h-4 w-4 ml-1" />
                      رسوم التوصيل
                    </span>
                    <span className="font-medium">
                      {shippingCost === 0 ? "مجاني" : `${shippingCost.toFixed(2)} د.ب`}
                    </span>
                  </div>
                  {shippingCost === 0 && (
                    <div className="text-green-600 text-sm">
                      <span>توصيل مجاني للطلبات فوق 10 د.ب</span>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-bold text-lg">
                  <span>الإجمالي</span>
                  <span>{grandTotal.toFixed(2)} د.ب</span>
                </div>

                {currentStep === "cart" && (
                  <div className="mt-6">
                    <Button
                      onClick={() => setCurrentStep("shipping")}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      متابعة الطلب
                    </Button>
                  </div>
                )}

                {/* Payment Methods */}
                <div className="mt-6">
                  <h3 className="font-bold mb-2">وسائل الدفع المتاحة</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="relative h-8 w-16 bg-white rounded border p-1">
                      <Image src="/benefit-logo.png" alt="بينفت" width={64} height={32} className="object-contain" />
                    </div>
                    <div className="relative h-8 w-10 bg-white rounded border p-1">
                      <Image
                        src="/placeholder.svg?height=32&width=40"
                        alt="فيزا"
                        width={40}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div className="relative h-8 w-10 bg-white rounded border p-1">
                      <Image
                        src="/placeholder.svg?height=32&width=40"
                        alt="ماستركارد"
                        width={40}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 ml-2 text-green-600" />
                    <h3 className="font-bold">معلومات التوصيل</h3>
                  </div>
                  <p className="text-sm text-gray-600">التوصيل خلال 40 دقيقة من تأكيد الطلب</p>
                  <p className="text-sm text-gray-600">توصيل مجاني للطلبات فوق 10 د.ب</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
