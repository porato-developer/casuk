"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, X, ArrowRight, Users, Calendar, MapPin, Phone, Mail, Globe, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const slides = [
    {
      type: "image",
      src: "/image1.jpeg",
      badge: "Featured Journey",
      title: "The final trip to",
      subtitle: "Cameroon",
      description:
        "Join us on this meaningful journey as we strengthen bonds between communities and create lasting connections.",
    },
    {
      type: "video",
      src: "/video1.mp4",
      poster: "/placeholder.svg?height=500&width=800&text=Community+Stories",
      badge: "Community Stories",
      title: "Voices from our",
      subtitle: "Journey",
      description:
        "Experience heartfelt stories and testimonials from community members who have been part of this incredible journey.",
    },
    {
      type: "image",
      src: "/image2.jpeg?height=500&width=800",
      badge: "Cultural Heritage",
      title: "Celebrating our",
      subtitle: "Culture",
      description:
        "Discover the rich traditions, vibrant celebrations, and cultural heritage that connects our community.",
    },
    {
      type: "image",
      src: "/image3.jpeg",
      poster: "/image3.jpeg?height=500&width=800",
      badge: "Community Impact",
      title: "Making a real",
      subtitle: "Difference",
      description:
        "See how our community initiatives and programs are creating positive change in the UK and Cameroon.",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setProgress(0)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setProgress(0)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setProgress(0)
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  // Auto-advance functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide()
          return 0
        }
        return prev + 1
      })
    }, 80) // 8 seconds total (100 * 80ms)

    return () => clearInterval(interval)
  }, [currentSlide, isPlaying])

  // Pause on hover
  const handleMouseEnter = () => setIsPlaying(false)
  const handleMouseLeave = () => setIsPlaying(true)

  return (
    <Card
      className="relative overflow-hidden border-0 shadow-xl h-[500px] group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={sliderRef}
    >
      {/* Slides Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            {slide.type === "image" ? (
              <Image
                src={slide.src || "/placeholder.svg"}
                alt={`${slide.title} ${slide.subtitle}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            ) : (
              <video className="w-full h-full object-cover" autoPlay muted loop playsInline poster={slide.poster}>
                <source src={slide.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              currentSlide === index ? "bg-orange-500 w-8" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </Card>
  )
}

export default function CASUKRedesign4() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const upcomingEvents = [
    {
      date: "Dec 15",
      title: "Cultural Night",
      location: "London Community Center",
      attendees: 45,
    },
    {
      date: "Dec 22",
      title: "Year End Celebration",
      location: "Birmingham Hall",
      attendees: 120,
    },
    {
      date: "Jan 5",
      title: "New Year Gathering",
      location: "Manchester Center",
      attendees: 80,
    },
  ]

  const newsUpdates = [
    {
      title: "Final Trip to Cameroon - Registration Open",
      excerpt: "Join us for this meaningful journey to strengthen community bonds...",
      date: "Dec 10, 2024",
      category: "Travel",
    },
    {
      title: "New Community Group Launched in Edinburgh",
      excerpt: "We're excited to announce the formation of our newest regional group...",
      date: "Dec 8, 2024",
      category: "Community",
    },
    {
      title: "Annual Scholarship Program Now Open",
      excerpt: "Applications are now being accepted for our 2025 scholarship program...",
      date: "Dec 5, 2024",
      category: "Education",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              {/* <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div> */}
              <div>
                {/* <Image
                  src={"/logo.png"}
                  alt={`CAS UK Logo`}
                  width={100}
                  height={40}
                  className="object-cover"
                /> */}
                <img className="" src="/logo.png" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="#"
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
              {/* <Link
                href="#"
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium relative group"
              >
                Who are we
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link> */}
              <Link
                href="#"
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium relative group"
              >
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium relative group"
              >
                Groups
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium relative group"
              >
                Member
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium relative group"
              >
                Payment
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium relative group"
              >
                Testimonial
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Auth & Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-gray-600">
                Member Login
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                Group Admin Login
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg"
              >
                Donate
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-6 space-y-4">
              <Link href="#" className="block text-gray-700 hover:text-orange-500 font-medium py-2">
                Home
              </Link>
              <Link href="#" className="block text-gray-700 hover:text-orange-500 font-medium py-2">
                About
              </Link>
              <Link href="#" className="block text-gray-700 hover:text-orange-500 font-medium py-2">
                Groups
              </Link>
              <Link href="#" className="block text-gray-700 hover:text-orange-500 font-medium py-2">
                Events
              </Link>
              <Link href="#" className="block text-gray-700 hover:text-orange-500 font-medium py-2">
                Resources
              </Link>
              <Link href="#" className="block text-gray-700 hover:text-orange-500 font-medium py-2">
                Contact
              </Link>
              <div className="pt-4 border-t space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  Login
                </Button>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500">Donate</Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Hero Slider Card */}
            <div className="lg:col-span-8">
              <HeroSlider />
            </div>

            {/* Side Cards */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Stats Card */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Members</span>
                    <span className="text-2xl font-bold text-orange-500">500+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Local Groups</span>
                    <span className="text-2xl font-bold text-orange-500">15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Annual Events</span>
                    <span className="text-2xl font-bold text-orange-500">25+</span>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action Card */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">THINK!!!</h3>
                  <p className="mb-4 text-orange-100">
                    Together we build stronger communities and create lasting change.
                  </p>
                  <Button className="bg-white text-orange-600 hover:bg-gray-100 w-full">Join Us Today</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* News Updates */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Latest News</h2>
                <Button variant="ghost" className="text-orange-500 hover:text-orange-600">
                  View All
                  <ArrowRight className="ml-1" size={16} />
                </Button>
              </div>

              <div className="space-y-6">
                {newsUpdates.map((news, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                          {news.category}
                        </Badge>
                        <span className="text-sm text-gray-500">{news.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-orange-600 cursor-pointer">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{news.excerpt}</p>
                      <Link
                        href="#"
                        className="text-orange-500 hover:text-orange-600 font-medium inline-flex items-center"
                      >
                        Read More
                        <ArrowRight className="ml-1" size={14} />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Upcoming Events Sidebar */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-orange-500 text-white rounded-lg p-3 text-center min-w-[60px]">
                          <div className="text-sm font-medium">{event.date}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{event.title}</h4>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin size={14} className="mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Users size={14} className="mr-1" />
                            {event.attendees} attending
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions Card */}
              <Card className="border-0 shadow-md mt-8">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-orange-500 hover:bg-orange-600">
                    <Users className="mr-2" size={16} />
                    Become a Member
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="mr-2" size={16} />
                    View All Events
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Heart className="mr-2" size={16} />
                    Make a Donation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive support for the Cameroonian community in the UK
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-all group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors">
                  <Users className="w-8 h-8 text-orange-600 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Community Groups</h3>
                <p className="text-gray-600 text-sm">Connect with local communities across the UK</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors">
                  <Calendar className="w-8 h-8 text-orange-600 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Cultural Events</h3>
                <p className="text-gray-600 text-sm">Celebrate heritage through festivals and gatherings</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors">
                  <Heart className="w-8 h-8 text-orange-600 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Support Services</h3>
                <p className="text-gray-600 text-sm">Resources and guidance for all members</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors">
                  <Globe className="w-8 h-8 text-orange-600 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Global Network</h3>
                <p className="text-gray-600 text-sm">Connect with Cameroonians worldwide</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Join Our Growing Community</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Be part of something meaningful. Connect with fellow Cameroonians, celebrate culture, and build lasting
                relationships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 px-8">
                  Become a Member
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="px-8 bg-transparent">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img className="" src="/logo-no-bg.png" />
              </div>
              <p className="text-gray-400 mb-6">
                Connecting and supporting Cameroonian communities across the United Kingdom through culture, events, and
                shared experiences.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Our Groups
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Membership
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Get Involved</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Volunteer
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Partner With Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact Info</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Mail size={16} />
                  <span>info@cas-uk.org</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={16} />
                  <span>+44 (0) 123 456 789</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin size={16} />
                  <span>London, United Kingdom</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 CAS-UK. All rights reserved.</p>
            <div className="flex space-x-6 text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
