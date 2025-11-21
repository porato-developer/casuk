"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Globe, Shield, Zap, TrendingUp } from "lucide-react"
import { memberService, type Team } from "@/lib/services/memberService"
import Image from "next/image"

const timelineEvents = [
  {
    year: 2017,
    title: "Founded",
    description: "CAS-UK established following three consecutive community bereavements in Q1 2017. Born from a grassroots discussion about creating a sustainable repatriation support system.",
  },
  {
    year: 2018,
    title: "First Successful Repatriation",
    description:
      "Completed our first member repatriation, proving the concept works and the community can come together effectively.",
  },
  {
    year: 2019,
    title: "Expansion Phase",
    description: "Launched group registration programs. Expanded beyond London to serve Cameroonians across the entire UK.",
  },
  {
    year: 2020,
    title: "Digital Transformation",
    description: "Implemented transparent online contribution tracking and improved payment systems for better accessibility.",
  },
  {
    year: 2021,
    title: "1,000 Members Milestone",
    description: "Reached 1,000+ registered members. Successfully reduced per-person contribution requirements through scale.",
  },
  {
    year: 2024,
    title: "Present Day",
    description: "Operating 4+ regional groups across the UK with 500+ active members and counting. Strengthening community ties.",
  },
]

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We approach every situation with empathy and understanding, recognizing the importance of honoring our loved ones.",
  },
  {
    icon: Shield,
    title: "Transparency",
    description: "Every donation is tracked, every decision is documented, and every member knows exactly where their contribution goes.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in the power of collective action. No one faces loss alone when they have a community standing with them.",
  },
  {
    icon: Globe,
    title: "Unity",
    description: "Bridging the gap between the UK and Cameroon, strengthening cultural ties and family bonds across continents.",
  },
  {
    icon: Zap,
    title: "Integrity",
    description: "Our leadership and operations are guided by the highest ethical standards and accountability to our members.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description: "Continuously expanding our reach and impact, making support accessible to more Cameroonians in need.",
  },
]

const impactStats = [
  {
    number: "2017",
    label: "Founded",
  },
  {
    number: "500+",
    label: "Active Members",
  },
  {
    number: "4+",
    label: "Regional Groups",
  },
  {
    number: "£100k+",
    label: "Funds Distributed",
  },
]

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const team = await memberService.getTeamMembers()
        setTeamMembers(team)
      } catch (error) {
        console.error("Error fetching team members:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTeam()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">About CAS-UK</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Cameroon Association of Solidarity UK is a non-political, non-profit organization dedicated to supporting
              the Cameroonian community in the United Kingdom. We believe no Cameroonian should struggle alone when facing
              loss.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-2xl text-orange-600">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  To mobilize the Cameroonian community in the UK with the ultimate aim of ensuring that the remains of
                  any Cameroonian who passes away can be returned home with dignity and without financial burden on the
                  bereaved family.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We address a critical community need: many members face significant financial challenges when
                  repatriating loved ones. Through collective contributions and transparent operations, we ensure no one
                  faces this burden alone.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-red-50">
                <CardTitle className="text-2xl text-red-600">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A thriving Cameroonian community in the UK that is united, supported, and empowered to honor their
                  heritage and cultural traditions.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We envision a day when every Cameroonian in the UK knows they have a family - a community that will
                  stand with them in times of joy and sorrow, ensuring their loved ones return home with the respect
                  and dignity they deserve.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-gray-300">Building a stronger, more supported community</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <Card key={index} className="border-0 bg-white/10 backdrop-blur-sm text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-orange-400 mb-2">{stat.number}</div>
                  <div className="text-lg text-gray-200">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">From grassroots initiative to thriving community organization</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-red-500 md:translate-x--0.5"></div>

            {/* Timeline events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`relative md:${index % 2 === 0 ? "pl-1/2 pr-0 text-right" : "pl-0 pr-1/2"}`}>
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white"></div>

                  <Card className="border-0 shadow-lg md:w-5/12 md:ml-auto md:mr-0">
                    <CardContent className="p-6">
                      <Badge className="mb-4 bg-orange-500 hover:bg-orange-600">{event.year}</Badge>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500">
                      <IconComponent className="w-7 h-7 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600">Dedicated individuals committed to our mission</p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading team information...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className="border-0 shadow-md hover:shadow-lg transition-all overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <div className="text-4xl font-bold text-white opacity-80">{member.firstName[0]}</div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {member.firstName} {member.lastName}
                    </h3>
                    <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                        {member.email}
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
