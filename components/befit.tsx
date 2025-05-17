"use client"

import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Clock, Award, ThumbsUp, Leaf, ShieldCheck, Percent, Gift, Star, Users } from "lucide-react"

export default function BenefitsPage({ handleBackToShopping }: { handleBackToShopping: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header with navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={handleBackToShopping}
              className="flex items-center text-green-600 hover:text-green-700"
            >
              <ChevronRight className="h-4 w-4 ml-1" />
              العودة للتسوق
            </Button>
            <h1 className="text-xl font-bold mr-2">مميزات خدمتنا</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=1470&auto=format&fit=crop"
            alt="لحوم طازجة عالية الجودة"
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
            <Badge className="bg-green-600 mb-4">الأفضل في البحرين</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">لماذا تختار لحوم دلمون؟</h1>
            <p className="text-lg md:text-xl max-w-2xl">
              نقدم أجود أنواع اللحوم الطازجة والمستوردة مع خدمة توصيل سريعة وموثوقة
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">مميزات فريدة تجعلنا الخيار الأفضل</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BenefitCard
              icon={<Clock className="h-10 w-10 text-green-600" />}
              title="توصيل سريع"
              description="نوصل طلبك خلال 40 دقيقة فقط من تأكيد الطلب، لضمان وصول اللحوم طازجة إلى منزلك."
            />

            <BenefitCard
              icon={<Award className="h-10 w-10 text-green-600" />}
              title="جودة ممتازة"
              description="نختار بعناية أفضل أنواع اللحوم من مصادر موثوقة لنقدم لك منتجات عالية الجودة."
            />

            <BenefitCard
              icon={<ThumbsUp className="h-10 w-10 text-green-600" />}
              title="سهولة الطلب"
              description="منصة سهلة الاستخدام تمكنك من طلب احتياجاتك من اللحوم بضغطة زر من أي مكان."
            />

            <BenefitCard
              icon={<Leaf className="h-10 w-10 text-green-600" />}
              title="منتجات طازجة"
              description="نضمن طزاجة جميع منتجاتنا، حيث يتم ذبح وتجهيز اللحوم في نفس يوم التوصيل."
            />

            <BenefitCard
              icon={<ShieldCheck className="h-10 w-10 text-green-600" />}
              title="معايير صحية"
              description="نلتزم بأعلى معايير النظافة والسلامة الغذائية في جميع مراحل التحضير والتوصيل."
            />

            <BenefitCard
              icon={<Percent className="h-10 w-10 text-green-600" />}
              title="عروض حصرية"
              description="استمتع بعروض وخصومات أسبوعية على مجموعة متنوعة من منتجاتنا."
            />
          </div>
        </div>
      </section>

      {/* Quality Guarantees */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">ضمان الجودة</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1551446591-142875a901a1?q=80&w=1470&auto=format&fit=crop"
                  alt="شهادات الجودة"
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">شهادات وتراخيص</h3>
                <p className="text-gray-600 mb-4">
                  حاصلون على جميع شهادات الجودة والتراخيص اللازمة من الجهات الرسمية في البحرين، مما يضمن امتثالنا لأعلى
                  معايير سلامة الأغذية.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-white">
                    شهادة ISO 22000
                  </Badge>
                  <Badge variant="outline" className="bg-white">
                    ترخيص وزارة الصحة
                  </Badge>
                  <Badge variant="outline" className="bg-white">
                    شهادة HACCP
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1374&auto=format&fit=crop"
                  alt="عملية اختيار اللحوم"
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">عملية اختيار دقيقة</h3>
                <p className="text-gray-600 mb-4">
                  نتبع عملية اختيار صارمة لضمان حصولك على أفضل قطع اللحوم. يقوم خبراؤنا بفحص كل قطعة للتأكد من جودتها
                  قبل تقديمها لعملائنا.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-600 ml-2" />
                    فحص يومي للجودة
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-600 ml-2" />
                    اختيار من أفضل المزارع
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-600 ml-2" />
                    تخزين بدرجات حرارة مثالية
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Special Offers & Loyalty */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">برامج الولاء والعروض</h2>

          <Tabs defaultValue="offers" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
              <TabsTrigger
                value="offers"
                className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
              >
                العروض الحالية
              </TabsTrigger>
              <TabsTrigger
                value="loyalty"
                className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
              >
                برنامج الولاء
              </TabsTrigger>
            </TabsList>

            <TabsContent value="offers">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <OfferCard
                  title="خصم 30% على اللحم البقري"
                  description="استمتع بخصم 30% على جميع أنواع اللحم البقري الطازج لفترة محدودة."
                  expiry="ينتهي في 30 مايو"
                  code="BEEF30"
                />

                <OfferCard
                  title="اشترِ 2 واحصل على 1 مجانًا"
                  description="عند شراء قطعتين من صدور الدجاج، احصل على قطعة ثالثة مجانًا."
                  expiry="ينتهي في 15 يونيو"
                  code="CHICKEN3"
                />

                <OfferCard
                  title="توصيل مجاني"
                  description="احصل على توصيل مجاني لجميع الطلبات التي تزيد قيمتها عن 10 د.ب."
                  expiry="عرض دائم"
                  code="FREEDEL"
                />
              </div>
            </TabsContent>

            <TabsContent value="loyalty">
              <div className="max-w-3xl mx-auto">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-6">
                      <Gift className="h-12 w-12 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-center mb-4">برنامج ولاء دلمون</h3>
                    <p className="text-gray-600 text-center mb-6">
                      اكسب نقاط مع كل طلب واستبدلها بخصومات وهدايا حصرية. كلما زادت مشترياتك، زادت المكافآت!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-green-600 font-bold text-2xl mb-2">1</div>
                        <h4 className="font-bold mb-2">اشترك</h4>
                        <p className="text-sm text-gray-600">سجل في برنامج الولاء مجانًا</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-green-600 font-bold text-2xl mb-2">2</div>
                        <h4 className="font-bold mb-2">اكسب</h4>
                        <p className="text-sm text-gray-600">اجمع نقاط مع كل عملية شراء</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-green-600 font-bold text-2xl mb-2">3</div>
                        <h4 className="font-bold mb-2">استبدل</h4>
                        <p className="text-sm text-gray-600">استبدل نقاطك بخصومات وهدايا</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button className="bg-green-600 hover:bg-green-700">انضم الآن</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <Users className="h-6 w-6 text-green-600 ml-2" />
            <h2 className="text-2xl font-bold">ماذا يقول عملاؤنا</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              name="أحمد محمد"
              rating={5}
              text="أفضل لحوم في البحرين بدون منازع! الجودة ممتازة والتوصيل سريع جدًا. أصبحت عميلًا دائمًا لديهم."
              date="15 أبريل 2024"
            />

            <TestimonialCard
              name="فاطمة علي"
              rating={5}
              text="اللحوم طازجة دائمًا والأسعار معقولة جدًا مقارنة بالجودة. أحب أيضًا سهولة الطلب عبر الموقع."
              date="3 مايو 2024"
            />

            <TestimonialCard
              name="خالد عبدالله"
              rating={4}
              text="خدمة ممتازة وتوصيل سريع. لحومهم من أفضل ما جربت في البحرين. أنصح بتجربة لحم الغنم البحريني."
              date="28 أبريل 2024"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">جرب خدمتنا اليوم واستمتع بأفضل اللحوم</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            نحن نضمن لك تجربة تسوق مميزة مع منتجات عالية الجودة وخدمة توصيل سريعة وموثوقة.
          </p>
          <Button
            onClick={handleBackToShopping}
            size="lg"
            className="bg-white text-green-600 hover:bg-gray-100 hover:text-green-700"
          >
            تسوق الآن
          </Button>
        </div>
      </section>

      {/* Footer */}
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
          </div>
        </div>
      </footer>
    </div>
  )
}

// Benefit Card Component
function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

// Offer Card Component
function OfferCard({
  title,
  description,
  expiry,
  code,
}: {
  title: string
  description: string
  expiry: string
  code: string
}) {
  return (
    <Card className="h-full transition-all hover:shadow-md border-2 border-green-100">
      <CardContent className="p-6">
        <Badge className="bg-green-600 mb-4">عرض خاص</Badge>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{expiry}</span>
          <Badge variant="outline" className="bg-gray-50 font-mono">
            {code}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

// Testimonial Card Component
function TestimonialCard({
  name,
  rating,
  text,
  date,
}: {
  name: string
  rating: number
  text: string
  date: string
}) {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">{name}</h3>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
            ))}
          </div>
        </div>
        <p className="text-gray-600 mb-4">"{text}"</p>
        <p className="text-sm text-gray-500">{date}</p>
      </CardContent>
    </Card>
  )
}
