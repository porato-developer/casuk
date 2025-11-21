"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Clock, ChevronDown } from "lucide-react"
import { contactService, type FAQ } from "@/lib/services/contactService"

interface ContactForm {
  fullName: string
  email: string
  phone: string
  topic: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    fullName: "",
    email: "",
    phone: "",
    topic: "General Inquiry",
    message: "",
  })

  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isLoadingFAQs, setIsLoadingFAQs] = useState(true)

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const faqData = await contactService.getFAQs()
        setFaqs(faqData)
      } catch (error) {
        console.error("Error fetching FAQs:", error)
      } finally {
        setIsLoadingFAQs(false)
      }
    }
    fetchFAQs()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      await contactService.submitContactMessage({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        topic: formData.topic,
        message: formData.message,
      })

      setSubmitSuccess(true)
      setTimeout(() => {
        setSubmitSuccess(false)
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          topic: "General Inquiry",
          message: "",
        })
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "info@cas-uk.org",
      subtext: "We'll respond within 5 working days",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+44 (0) 20 7450 9135",
      subtext: "Call during business hours",
    },
    {
      icon: MapPin,
      title: "Location",
      details: "23 Hunter House, Found Street",
      subtext: "London, SW8 4SE, United Kingdom",
    },
    {
      icon: Clock,
      title: "Support Hours",
      details: "Monday - Friday, 6PM - 8PM",
      subtext: "Available for urgent matters",
    },
  ]

  const topicOptions = ["General Inquiry", "Membership", "Registration", "Payment", "Complaint", "Other"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl opacity-90">
              Have questions or need assistance? We're here to help. Contact us through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{info.title}</h3>
                        <p className="text-gray-700 font-medium mb-1">{info.details}</p>
                        <p className="text-gray-600 text-sm">{info.subtext}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>

                <CardContent className="p-8">
                  {submitSuccess ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Message Sent Successfully!</h3>
                      <p className="text-gray-600">
                        Thank you for contacting us. We'll get back to you within 5 working days.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                          <Input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            placeholder="Your name"
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your.email@example.com"
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+44 123 456 7890"
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Topic *</label>
                          <select
                            name="topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                          >
                            {topicOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          placeholder="Please tell us how we can help..."
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                          We value your privacy. Your information will only be used to respond to your inquiry.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* FAQ Sidebar */}
            <div>
              <Card className="border-0 shadow-lg h-full">
                <CardHeader className="bg-gray-100">
                  <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
                </CardHeader>

                <CardContent className="p-6">
                  {isLoadingFAQs ? (
                    <p className="text-gray-600 text-center py-8">Loading FAQs...</p>
                  ) : (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto">
                      {faqs.slice(0, 4).map((faq) => (
                        <div
                          key={faq.id}
                          className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() =>
                              setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                            }
                            className="w-full px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-50 flex items-center justify-between"
                          >
                            <span className="text-sm">{faq.question}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-orange-500 transition-transform ${
                                expandedFAQ === faq.id ? "transform rotate-180" : ""
                              }`}
                            />
                          </button>

                          {expandedFAQ === faq.id && (
                            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                              <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}

                      <a
                        href="#faq-section"
                        className="block text-center text-orange-500 hover:text-orange-600 font-medium text-sm pt-2"
                      >
                        View More FAQs ↓
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Full FAQ Section */}
      <section id="faq-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Find answers to common questions about CAS-UK</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <button
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                  }
                  className="w-full px-6 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 flex items-center justify-between"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-orange-500 flex-shrink-0 transition-transform ${
                      expandedFAQ === faq.id ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedFAQ === faq.id && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-orange-50 border border-orange-200 rounded-lg p-8 text-center">
            <p className="text-gray-800 mb-4">
              Didn't find the answer you're looking for?
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Contact Us for More Help
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
