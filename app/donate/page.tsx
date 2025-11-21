"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, TrendingUp, Users, CheckCircle } from "lucide-react"
import { donationService, type DonationOption, type Campaign } from "@/lib/services/donationService"

export default function DonatePage() {
  const [donationOptions, setDonationOptions] = useState<DonationOption[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [donationForm, setDonationForm] = useState({
    donorName: "",
    donorEmail: "",
    donationType: "one-time",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [options, activeCampaigns] = await Promise.all([
          donationService.getDonationOptions(),
          donationService.getActiveCampaigns(),
        ])
        setDonationOptions(options)
        setCampaigns(activeCampaigns)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAmount && !customAmount) return

    setIsSubmitting(true)

    try {
      const amount = selectedAmount || parseFloat(customAmount)
      await donationService.processDonation({
        donorName: donationForm.donorName,
        donorEmail: donationForm.donorEmail,
        amount,
        currency: "GBP",
        type: donationForm.donationType as "one-time" | "monthly",
        campaignId: selectedCampaign || undefined,
      })

      setSubmitSuccess(true)
      setTimeout(() => {
        setSubmitSuccess(false)
        setSelectedAmount(null)
        setCustomAmount("")
        setDonationForm({ donorName: "", donorEmail: "", donationType: "one-time" })
      }, 3000)
    } catch (error) {
      console.error("Error processing donation:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const finalAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Support Our Mission</h1>
            <p className="text-xl opacity-90">
              Your donation helps bring Cameroonians home. Every contribution, no matter the size, makes a real
              difference.
            </p>
          </div>
        </div>
      </section>

      {/* Impact of Donations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Impact</h2>
            <p className="text-xl text-gray-600">See how your donation helps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { amount: "£2", impact: "Contributes to a repatriation case" },
              { amount: "£10", impact: "Helps with transportation costs" },
              { amount: "£25", impact: "Supports family arrangements" },
              { amount: "£100+", impact: "Accelerates the repatriation process" },
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{item.amount}</div>
                  <p className="text-gray-700">{item.impact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Active Campaigns */}
      {!isLoading && campaigns.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Current Campaigns</h2>
              <p className="text-xl text-gray-600">Support families who need us right now</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {campaigns.map((campaign) => (
                <Card
                  key={campaign.id}
                  className={`border-0 shadow-lg cursor-pointer transition-all ${
                    selectedCampaign === campaign.id
                      ? "ring-2 ring-orange-500 shadow-xl"
                      : ""
                  }`}
                  onClick={() => setSelectedCampaign(campaign.id)}
                >
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                    <CardTitle className="text-xl">{campaign.memberName}</CardTitle>
                    <p className="text-gray-600 text-sm mt-1">{campaign.reason}</p>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-bold text-orange-600">
                          {campaign.percentageComplete.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all"
                          style={{ width: `${campaign.percentageComplete}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Goal:</span>
                        <span className="font-semibold text-gray-800">£{campaign.targetAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Raised:</span>
                        <span className="font-semibold text-orange-600">
                          £{campaign.currentAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Needed:</span>
                        <span className="font-semibold text-red-600">
                          £{(campaign.targetAmount - campaign.currentAmount).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {campaign.status === "completed" && (
                      <Badge className="w-full mt-4 justify-center bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Target Reached
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Donation Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <CardTitle className="text-2xl">Make Your Donation</CardTitle>
              </CardHeader>

              <CardContent className="p-8">
                {submitSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                    <p className="text-gray-600">
                      Your donation of £{finalAmount.toFixed(2)} has been received. You'll receive a confirmation email
                      shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleDonate} className="space-y-8">
                    {/* Donation Amount Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4">Select Amount</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        {donationOptions
                          .filter((opt) => opt.amount > 0)
                          .map((option) => (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => {
                                setSelectedAmount(option.amount)
                                setCustomAmount("")
                              }}
                              className={`p-4 rounded-lg border-2 transition-all text-center ${
                                selectedAmount === option.amount
                                  ? "border-orange-500 bg-orange-50"
                                  : "border-gray-200 hover:border-orange-300"
                              }`}
                            >
                              <div className="font-bold text-lg text-gray-800">£{option.amount}</div>
                              <div className="text-xs text-gray-600 mt-1">{option.label}</div>
                            </button>
                          ))}
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Or Enter Custom Amount</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-700 font-medium">£</span>
                          <Input
                            type="number"
                            min="1"
                            step="0.01"
                            placeholder="0.00"
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value)
                              setSelectedAmount(null)
                            }}
                            className="pl-8 text-lg"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Donation Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4">Donation Type</label>
                      <div className="flex gap-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="donationType"
                            value="one-time"
                            checked={donationForm.donationType === "one-time"}
                            onChange={(e) =>
                              setDonationForm({ ...donationForm, donationType: e.target.value })
                            }
                            className="w-4 h-4"
                          />
                          <span className="text-gray-700">One-Time Donation</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="donationType"
                            value="monthly"
                            checked={donationForm.donationType === "monthly"}
                            onChange={(e) =>
                              setDonationForm({ ...donationForm, donationType: e.target.value })
                            }
                            className="w-4 h-4"
                          />
                          <span className="text-gray-700">Monthly Support</span>
                        </label>
                      </div>
                    </div>

                    {/* Campaign Selection */}
                    {campaigns.length > 0 && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                          Support a Specific Campaign (Optional)
                        </label>
                        <select
                          value={selectedCampaign || ""}
                          onChange={(e) => setSelectedCampaign(e.target.value || null)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="">General Fund</option>
                          {campaigns.map((campaign) => (
                            <option key={campaign.id} value={campaign.id}>
                              {campaign.memberName} - {campaign.reason} ({campaign.percentageComplete.toFixed(0)}%)
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Donor Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-800">Donor Information</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <Input
                          type="text"
                          value={donationForm.donorName}
                          onChange={(e) =>
                            setDonationForm({ ...donationForm, donorName: e.target.value })
                          }
                          required
                          placeholder="Your name"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <Input
                          type="email"
                          value={donationForm.donorEmail}
                          onChange={(e) =>
                            setDonationForm({ ...donationForm, donorEmail: e.target.value })
                          }
                          required
                          placeholder="your.email@example.com"
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Donation Summary */}
                    {finalAmount > 0 && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-gray-700">Donation Amount:</span>
                          <span className="text-2xl font-bold text-orange-600">£{finalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Type:</span>
                          <span className="font-medium text-gray-800">
                            {donationForm.donationType === "one-time"
                              ? "One-Time"
                              : "Monthly Recurring"}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        Your donation is secure and will be processed through PayPal. You'll receive a confirmation and
                        receipt via email.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={!finalAmount || !donationForm.donorName || !donationForm.donorEmail || isSubmitting}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 text-lg"
                    >
                      {isSubmitting ? "Processing..." : `Donate £${finalAmount.toFixed(2)}`}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why We're Transparent */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Commitment to Transparency</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <Heart className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">100% Accountability</h3>
                  <p className="text-gray-600">
                    Every donation is tracked and visible. Members can see where funds are allocated.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">Direct Impact</h3>
                  <p className="text-gray-600">
                    Funds go directly to repatriation. No hidden fees or administrative overhead.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">Community Trust</h3>
                  <p className="text-gray-600">
                    Member-led governance ensures donations serve the community's needs.
                  </p>
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
