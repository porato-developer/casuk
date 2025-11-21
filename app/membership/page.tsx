"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Check, X, Users, MapPin } from "lucide-react"
import { memberService } from "@/lib/services/memberService"

type MembershipType = "individual" | "group" | null

interface RegistrationForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  membershipType: "individual" | "group"
  groupName?: string
  groupLocation?: string
}

const features = [
  {
    feature: "Repatriation Cover",
    individual: true,
    group: true,
    details: "Up to £10,000 per case",
  },
  {
    feature: "Dependent Coverage",
    individual: true,
    group: true,
    details: "Children aged 3-18",
  },
  {
    feature: "Contribution Amount",
    individual: "Variable (as low as £2)",
    group: "Per member (managed by admin)",
    details: "",
  },
  {
    feature: "Registration Fee",
    individual: false,
    group: false,
    details: "Completely free",
  },
  {
    feature: "Community Events",
    individual: true,
    group: true,
    details: "Access to all activities",
  },
  {
    feature: "Newsletter & Updates",
    individual: true,
    group: true,
    details: "Stay informed",
  },
  {
    feature: "Dedicated Admin Support",
    individual: false,
    group: true,
    details: "Group admin assistance",
  },
  {
    feature: "Bulk Member Management",
    individual: false,
    group: true,
    details: "Manage all members",
  },
]

const eligibility = [
  "Must be Cameroonian or of Cameroonian descent",
  "Minimum age: 18 years (parents can register children aged 3-18)",
  "Resident in the United Kingdom",
  "Willing to contribute to the community cause",
  "Comply with CAS-UK code of conduct",
]

export default function MembershipPage() {
  const [selectedType, setSelectedType] = useState<MembershipType>(null)
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState<RegistrationForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    membershipType: "individual",
    groupName: "",
    groupLocation: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (formData.membershipType === "individual") {
        await memberService.registerMember({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          membershipType: "individual",
          contribution: 0,
        })
      } else {
        await memberService.registerGroup({
          name: formData.groupName || formData.firstName,
          location: formData.groupLocation || "",
          admin: `${formData.firstName} ${formData.lastName}`,
          adminEmail: formData.email,
          description: "New community group",
        })
      }

      setSubmitSuccess(true)
      setTimeout(() => {
        setShowForm(false)
        setSubmitSuccess(false)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          membershipType: "individual",
          groupName: "",
          groupLocation: "",
        })
      }, 2000)
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Join CAS-UK</h1>
            <p className="text-xl opacity-90">
              Become part of a supportive community that stands together in times of need. Choose the membership type
              that works best for you.
            </p>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Eligibility Criteria</h2>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {eligibility.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Membership</h2>
            <p className="text-xl text-gray-600">Both are free - select what suits your needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Individual Membership */}
            <Card
              className={`border-2 cursor-pointer transition-all ${
                selectedType === "individual"
                  ? "border-orange-500 shadow-xl bg-orange-50"
                  : "border-gray-200 hover:border-orange-300"
              }`}
              onClick={() => {
                setSelectedType("individual")
                setFormData({ ...formData, membershipType: "individual" })
              }}
            >
              <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-50">
                <CardTitle className="text-2xl text-orange-600">Individual Membership</CardTitle>
                <CardDescription>Perfect for individuals and families</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Who Should Register:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span>Students or isolated individuals</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span>Families without group affiliation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span>Anyone seeking direct membership</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Contribution:</span> Contribute what you can, when needed
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Minimum as low as £2</p>
                </div>

                {selectedType === "individual" && (
                  <Button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Register Now
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Group Membership */}
            <Card
              className={`border-2 cursor-pointer transition-all ${
                selectedType === "group"
                  ? "border-red-500 shadow-xl bg-red-50"
                  : "border-gray-200 hover:border-red-300"
              }`}
              onClick={() => {
                setSelectedType("group")
                setFormData({ ...formData, membershipType: "group" })
              }}
            >
              <CardHeader className="bg-gradient-to-r from-red-100 to-red-50">
                <CardTitle className="text-2xl text-red-600">Group Registration</CardTitle>
                <CardDescription>For community groups and associations</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Who Should Register:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>Existing community associations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>Regional groups (London, Manchester, etc.)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>Organizations wanting to register members</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Group Admin:</span> Manage all group members
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Transparency across all transactions</p>
                </div>

                {selectedType === "group" && (
                  <Button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-red-500 hover:bg-red-600"
                  >
                    Register Group
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Features Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-800">Individual</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-800">Group</th>
                </tr>
              </thead>
              <tbody>
                {features.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-800">{item.feature}</p>
                        {typeof item.individual === "string" && (
                          <p className="text-sm text-gray-600">{item.individual}</p>
                        )}
                        {item.details && <p className="text-xs text-gray-500 mt-1">{item.details}</p>}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {item.individual === true ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : item.individual === false ? (
                        <X className="w-6 h-6 text-gray-300 mx-auto" />
                      ) : (
                        <span className="text-sm text-gray-600">{item.individual}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {item.group === true ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : item.group === false ? (
                        <X className="w-6 h-6 text-gray-300 mx-auto" />
                      ) : (
                        <span className="text-sm text-gray-600">{item.group}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Registration Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white sticky top-0">
              <CardTitle className="text-2xl">
                {formData.membershipType === "individual"
                  ? "Individual Membership Registration"
                  : "Group Registration Form"}
              </CardTitle>
              <CardDescription className="text-orange-100">
                Fill in your details to join CAS-UK
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
                  <p className="text-gray-600">We'll review your registration and contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                      placeholder="+44-123-456-7890"
                    />
                  </div>

                  {formData.membershipType === "group" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Group Name *</label>
                        <Input
                          type="text"
                          name="groupName"
                          value={formData.groupName}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="e.g., London Metropolitan Group"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                        <Input
                          type="text"
                          name="groupLocation"
                          value={formData.groupLocation}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="e.g., London, UK"
                        />
                      </div>
                    </>
                  )}

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">Note:</span> Your data will be managed in compliance with the Data
                      Protection Act. We'll contact you within 5 working days to confirm your registration.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                    >
                      {isSubmitting ? "Registering..." : "Complete Registration"}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setShowForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  )
}
