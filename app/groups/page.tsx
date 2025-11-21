"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar, ArrowRight, Shield, TrendingUp, Lightbulb } from "lucide-react"
import { memberService, type CommunityGroup } from "@/lib/services/memberService"

const groupBenefits = [
  {
    icon: Users,
    title: "Unified Membership",
    description: "Group members register together under one leadership, creating a tight-knit community support system.",
  },
  {
    icon: Shield,
    title: "Financial Protection",
    description: "Each member is covered up to £10,000 for repatriation costs when needed.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Support",
    description: "As your group grows, the cost per person decreases through collective contributions.",
  },
  {
    icon: Lightbulb,
    title: "Leadership Control",
    description: "Group admins manage members and ensure accountability within their community.",
  },
]

const whyGroupRegister = [
  "Groups struggle with raising £10,000 for individual repatriations",
  "CAS-UK provides sufficient cover through small, manageable contributions",
  "Eliminates high social fund deposits required by traditional groups",
  "Reduces financial management burden on group leaders",
  "Includes coverage for members' children aged 3-18",
  "Minimizes default risk through leadership accountability",
]

export default function GroupsPage() {
  const [groups, setGroups] = useState<CommunityGroup[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsData = await memberService.getGroups()
        setGroups(groupsData)
      } catch (error) {
        console.error("Error fetching groups:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchGroups()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Community Groups</h1>
            <p className="text-xl opacity-90">
              Bringing Cameroonians together across the UK. Join an existing group or start a new one.
            </p>
          </div>
        </div>
      </section>

      {/* What are Groups Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">What Are Community Groups?</h2>

            <Card className="border-0 shadow-lg mb-8">
              <CardContent className="p-8">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  A group is a collection of people who have regular contact and are registered with CAS-UK together
                  under one leadership. Groups can be based on:
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span className="text-gray-700">Geographic location (London, Manchester, Birmingham, etc.)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span className="text-gray-700">Existing community associations or organizations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span className="text-gray-700">Workplace or university communities</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span className="text-gray-700">Religious or cultural organizations</span>
                  </li>
                </ul>

                <p className="text-gray-700 leading-relaxed">
                  Group registration allows CAS-UK to better serve larger communities with dedicated leadership,
                  transparent contribution tracking, and streamlined member management.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Group Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Benefits of Group Registration</h2>
            <p className="text-xl text-gray-600">Why groups choose CAS-UK</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {groupBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Register with CAS-UK */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Why Should Your Group Register with CAS-UK?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {whyGroupRegister.map((reason, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{reason}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 bg-orange-50 border border-orange-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Impact Through Scale</h3>
              <p className="text-gray-700 leading-relaxed">
                As CAS-UK grows, the individual financial burden decreases. With our target of 5,000 members across
                multiple groups, individual contributions could reduce to just £2 per repatriation case. Larger groups
                mean stronger community support and more affordable protection for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Directory of Groups */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Groups Across the UK</h2>
            <p className="text-xl text-gray-600">Find and connect with a group near you</p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading groups...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {groups.map((group) => (
                <Card key={group.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <CardTitle className="text-2xl">{group.name}</CardTitle>
                  </CardHeader>

                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span>{group.location}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-700">
                      <Users className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span>{group.memberCount} members</span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-700">
                      <Calendar className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span>Founded {new Date(group.foundedDate).getFullYear()}</span>
                    </div>

                    <p className="text-gray-600 italic border-t pt-4 mt-4">"{group.description}"</p>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-semibold">Admin:</span> {group.admin}
                      </p>
                      <a
                        href={`mailto:${group.adminEmail}`}
                        className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                      >
                        {group.adminEmail}
                      </a>
                    </div>

                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      Learn More
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Don't See Your Area?</h3>
            <p className="text-gray-600 mb-6">
              If there's no group in your location yet, you can start one! Contact us to learn how.
            </p>
            <a href="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Start a New Group
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Group Registration Process</h2>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Download Registration Form",
                  description:
                    "Download the group registration spreadsheet with fields for group name, location, admin details, and member list.",
                },
                {
                  step: "2",
                  title: "Collect Member Information",
                  description: "Gather details from all group members including names, emails, phone numbers, and emergency contacts.",
                },
                {
                  step: "3",
                  title: "Complete the Form",
                  description:
                    "Fill in all required information about your group, admin, and members. Include any relevant documentation.",
                },
                {
                  step: "4",
                  title: "Submit to CAS-UK",
                  description: "Email the completed form to info@cas-uk.org with subject line 'Group Registration'.",
                },
                {
                  step: "5",
                  title: "Verification",
                  description: "Our team will review your submission and verify all information within 5-10 working days.",
                },
                {
                  step: "6",
                  title: "Activation",
                  description: "Once approved, your group becomes active and all members can start contributing immediately.",
                },
              ].map((item, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-lg font-bold">{item.step}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">
                Ready to register your group? Contact us for more information and to get started.
              </p>
              <a href="/contact">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Get Started Today
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
