"use client"

import BenefitsPage from "@/components/befit"
import { useRouter } from "next/navigation"

export default function Benefits() {
  const router = useRouter()

  const handleBackToShopping = () => {
    router.push("/")
  }

  return <BenefitsPage handleBackToShopping={handleBackToShopping} />
}
