"use client"

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img className="h-12 w-auto" src="/logo-no-bg.png" alt="CAS-UK Logo" />
            </div>
            <p className="text-gray-400 mb-6">
              Connecting and supporting Cameroonian communities across the United Kingdom through culture, events, and
              shared experiences.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/groups" className="hover:text-white transition-colors">
                  Our Groups
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-white transition-colors">
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

          {/* Get Involved */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get Involved</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-white transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
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

        {/* Bottom Footer */}
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
  )
}
