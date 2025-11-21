"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Heart } from "lucide-react"
import { testimonialService, type Testimonial, type SuccessStory } from "@/lib/services/testimonialService"
import Image from "next/image"

const processSteps = [
  {
    number: "1",
    title: "Join",
    description: "Register as an individual member or your group. It's free and takes just a few minutes.",
    icon: Users,
  },
  {
    number: "2",
    title: "Contribute",
    description: "When a fellow member needs support, the community comes together. Contribute what you can.",
    icon: Heart,
  },
  {
    number: "3",
    title: "Support",
    description: "Your collective contributions ensure families can repatriate their loved ones with dignity.",
    icon: Star,
  },
]

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedStory, setExpandedStory] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testimonialsData, storiesData] = await Promise.all([
          testimonialService.getTestimonials(),
          testimonialService.getSuccessStories(),
        ])
        setTestimonials(testimonialsData)
        setSuccessStories(storiesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Testimonials & Impact</h1>
            <p className="text-xl opacity-90">
              Hear from our community members about how CAS-UK has made a difference in their lives.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How CAS-UK Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to community support</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="relative">
                  <Card className="border-0 shadow-lg h-full">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-2xl font-bold text-white">{step.number}</span>
                      </div>
                      <IconComponent className="w-8 h-8 text-orange-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </CardContent>
                  </Card>

                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-0.5 bg-orange-500"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
            <p className="text-center text-gray-700 text-lg">
              <span className="font-semibold">Our Target:</span> Raise £10,000 per member case through collective
              community contributions, reducing individual burden to as low as £2 per person.
            </p>
          </div>
        </div>
      </section>

      {/* Member Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Members Say</h2>
            <p className="text-xl text-gray-600">Real stories from real people in our community</p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4">{renderStars(testimonial.rating)}</div>

                    <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>

                    <div className="border-t border-gray-200 pt-4 flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">{testimonial.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <p className="text-xs text-gray-500 mt-1">{testimonial.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">How CAS-UK made a real difference in families' lives</p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading success stories...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {successStories.map((story) => (
                <Card key={story.id} className="border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-0">
                      {/* Image */}
                      <div className="md:col-span-1 h-64 md:h-auto bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Heart className="w-12 h-12 mx-auto mb-2 opacity-80" />
                          <p className="text-sm font-medium">Success Story</p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:col-span-2 p-8">
                        <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-100">
                          {story.familyName}
                        </Badge>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">{story.title}</h3>
                        <p className="text-gray-600 mb-4">{story.description}</p>

                        <button
                          onClick={() =>
                            setExpandedStory(expandedStory === story.id ? null : story.id)
                          }
                          className="text-orange-500 hover:text-orange-600 font-medium text-sm"
                        >
                          {expandedStory === story.id ? "Show Less" : "Read Full Story"}
                        </button>

                        {expandedStory === story.id && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{story.content}</p>
                          </div>
                        )}

                        <p className="text-gray-500 text-sm mt-4">{story.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Collective Impact</h2>
            <p className="text-xl opacity-90">Together, we're making a real difference</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: "500+", label: "Active Members" },
              { number: "4+", label: "Regional Groups" },
              { number: "25+", label: "Successful Repatriations" },
              { number: "£100k+", label: "Funds Distributed" },
            ].map((stat, index) => (
              <Card key={index} className="border-0 bg-white/10 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of a supportive community that stands together. Join as an individual member or register your
            group today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/membership"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Join Now
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Ask Questions
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
