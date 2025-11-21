"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Lock, CheckCircle, AlertCircle, Info } from "lucide-react"
import Link from "next/link"

export default function PaymentPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"card" | "paypal" | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    amount: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    email: "",
  })

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (formData.amount && parseFloat(formData.amount) > 0) {
        setPaymentSuccess(true)
        setTimeout(() => {
          setPaymentSuccess(false)
          setSelectedPaymentMethod(null)
          setFormData({
            amount: "",
            cardName: "",
            cardNumber: "",
            expiryDate: "",
            cvv: "",
            email: "",
          })
        }, 3000)
      }
    } catch (err) {
      setError("Payment processing failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const paymentMethods = [
    {
      id: "card",
      name: "Credit / Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: CreditCard,
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Fast and secure PayPal payments",
      icon: "🅿️",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Member Contributions</h1>
          <p className="text-lg opacity-90">
            Securely contribute to support fellow community members and strengthen our collective safety net.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              {paymentSuccess ? (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                    <p className="text-gray-600 mb-6">
                      Thank you for your contribution. A confirmation email has been sent to you.
                    </p>
                    <Button onClick={() => window.location.href = "/"} className="bg-orange-500 hover:bg-orange-600">
                      Return to Home
                    </Button>
                  </CardContent>
                </Card>
              ) : !selectedPaymentMethod ? (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Payment Method</h2>
                  <div className="grid gap-4">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon
                      return (
                        <Card
                          key={method.id}
                          className="border-2 border-gray-200 cursor-pointer hover:border-orange-500 hover:shadow-lg transition-all"
                          onClick={() => setSelectedPaymentMethod(method.id as "card" | "paypal")}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                              <div className="text-4xl">
                                {typeof IconComponent === "string" ? IconComponent : <IconComponent className="w-8 h-8" />}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">{method.name}</h3>
                                <p className="text-gray-600 text-sm">{method.description}</p>
                              </div>
                              <div className="text-orange-500">→</div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ) : selectedPaymentMethod === "card" ? (
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <CardTitle>Credit Card Payment</CardTitle>
                    <CardDescription className="text-orange-100">
                      Enter your card details below
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-8">
                    <form onSubmit={handlePayment} className="space-y-6">
                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-800">{error}</p>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contribution Amount (£) *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-700 font-semibold">£</span>
                          <Input
                            type="number"
                            name="amount"
                            min="0.01"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={handleInputChange}
                            required
                            className="pl-8"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name *
                        </label>
                        <Input
                          type="text"
                          name="cardName"
                          placeholder="Full name on card"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <Input
                          type="text"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          maxLength="19"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date *
                          </label>
                          <Input
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            maxLength="5"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <Input
                            type="text"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            maxLength="4"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                        <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-800">
                          Your payment information is encrypted and secure. We never store your full card details.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          disabled={isProcessing || !formData.amount}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          {isProcessing ? "Processing..." : `Pay £${formData.amount || "0.00"}`}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedPaymentMethod(null)}
                          className="flex-1"
                        >
                          Back
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <CardTitle>PayPal Payment</CardTitle>
                    <CardDescription className="text-orange-100">
                      Redirect to PayPal for secure payment
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-8">
                    <form onSubmit={handlePayment} className="space-y-6">
                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-800">{error}</p>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contribution Amount (£) *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-700 font-semibold">£</span>
                          <Input
                            type="number"
                            name="amount"
                            min="0.01"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={handleInputChange}
                            required
                            className="pl-8"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                        <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-800">
                          You will be redirected to PayPal to complete your payment securely.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          disabled={isProcessing || !formData.amount}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          {isProcessing ? "Redirecting..." : `Continue to PayPal (£${formData.amount || "0.00"})`}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedPaymentMethod(null)}
                          className="flex-1"
                        >
                          Back
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar - Payment Info */}
            <div className="space-y-6">
              {/* Security Info */}
              <Card className="border-0 shadow-md bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2">Secure Payment</h3>
                      <p className="text-sm text-green-800">
                        All transactions are encrypted and processed securely through industry-standard payment gateways.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contribution Info */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">How Your Contribution Helps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-orange-600 font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Community Fund</p>
                      <p className="text-gray-600">Your money goes into our collective repatriation fund</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-orange-600 font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Supports Members</p>
                      <p className="text-gray-600">When a member needs repatriation, the fund covers costs</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-orange-600 font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Peace of Mind</p>
                      <p className="text-gray-600">You know your family is also covered up to £10,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <Card className="border-0 shadow-md bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Questions About Payments?</h3>
                      <p className="text-sm text-blue-800 mb-3">
                        Check our FAQ or contact support for more information.
                      </p>
                      <Link href="/contact">
                        <Button size="sm" variant="outline" className="border-blue-300">
                          Contact Support
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
