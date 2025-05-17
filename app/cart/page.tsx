"use client"

import { useRouter } from "next/navigation"
import CartPage from "../../components/cart-page"

export default function Cart() {
  const router = useRouter()

  const handleBackToShopping = () => {
    router.push("/")
  }

  return <CartPage handleBackToShopping={handleBackToShopping} />
}
