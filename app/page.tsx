"use client"

import { useRouter } from "next/navigation"
import Landing from "../components/landing"

export default function Home() {
  const router = useRouter()

  const handleGoToCart = () => {
    router.push("/cart")
  }

  const handleShowBenefits = () => {
    router.push("/benefits")
  }

  return <Landing handleNextPage={handleGoToCart} handleShowBenefits={handleShowBenefits} />
}
