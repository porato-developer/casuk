"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("member")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [error, setError] = useState("")

  const [memberForm, setMemberForm] = useState({
    email: "",
    password: "",
  })

  const [adminForm, setAdminForm] = useState({
    groupId: "",
    adminEmail: "",
    password: "",
  })

  const handleMemberLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (memberForm.email && memberForm.password) {
        setLoginSuccess(true)
        setTimeout(() => {
          // In a real app, redirect to dashboard
          // router.push("/dashboard")
          setLoginSuccess(false)
          setMemberForm({ email: "", password: "" })
        }, 2000)
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (adminForm.groupId && adminForm.adminEmail && adminForm.password) {
        setLoginSuccess(true)
        setTimeout(() => {
          // In a real app, redirect to admin dashboard
          // router.push("/admin/dashboard")
          setLoginSuccess(false)
          setAdminForm({ groupId: "", adminEmail: "", password: "" })
        }, 2000)
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Member & Admin Login</h1>
          <p className="text-lg opacity-90 mt-2">Access your account to manage membership and contributions</p>
        </div>
      </section>

      {/* Login Forms Section */}
      <section className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="border-0 shadow-xl">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
                  <TabsTrigger
                    value="member"
                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500"
                  >
                    Member Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="admin"
                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500"
                  >
                    Admin Login
                  </TabsTrigger>
                </TabsList>

                {/* Member Login Tab */}
                <TabsContent value="member" className="p-0">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                    <CardTitle className="text-2xl text-orange-600">Member Login</CardTitle>
                    <CardDescription>Sign in to your CAS-UK member account</CardDescription>
                  </CardHeader>

                  <CardContent className="p-8">
                    {loginSuccess ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-green-600"
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
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome back!</h3>
                        <p className="text-gray-600">Redirecting to your dashboard...</p>
                      </div>
                    ) : (
                      <form onSubmit={handleMemberLogin} className="space-y-6">
                        {error && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-800">{error}</p>
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              value={memberForm.email}
                              onChange={(e) =>
                                setMemberForm({ ...memberForm, email: e.target.value })
                              }
                              required
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              value={memberForm.password}
                              onChange={(e) =>
                                setMemberForm({ ...memberForm, password: e.target.value })
                              }
                              required
                              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4" />
                            <span className="text-sm text-gray-600">Remember me</span>
                          </label>
                          <a
                            href="#"
                            className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                          >
                            Forgot password?
                          </a>
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2"
                        >
                          {isLoading ? "Signing in..." : "Sign In"}
                          {!isLoading && <ArrowRight className="ml-2" size={16} />}
                        </Button>
                      </form>
                    )}

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-center text-gray-600 text-sm mb-4">
                        Not a member yet?
                      </p>
                      <Link href="/membership">
                        <Button variant="outline" className="w-full">
                          Join as Member
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </TabsContent>

                {/* Admin Login Tab */}
                <TabsContent value="admin" className="p-0">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
                    <CardTitle className="text-2xl text-red-600">Group Admin Login</CardTitle>
                    <CardDescription>Sign in to your group administration panel</CardDescription>
                  </CardHeader>

                  <CardContent className="p-8">
                    {loginSuccess ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-green-600"
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
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome admin!</h3>
                        <p className="text-gray-600">Redirecting to admin dashboard...</p>
                      </div>
                    ) : (
                      <form onSubmit={handleAdminLogin} className="space-y-6">
                        {error && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-800">{error}</p>
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Group ID</label>
                          <Input
                            type="text"
                            placeholder="e.g., CAS-UK-001"
                            value={adminForm.groupId}
                            onChange={(e) =>
                              setAdminForm({ ...adminForm, groupId: e.target.value })
                            }
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <Input
                              type="email"
                              placeholder="admin.email@example.com"
                              value={adminForm.adminEmail}
                              onChange={(e) =>
                                setAdminForm({ ...adminForm, adminEmail: e.target.value })
                              }
                              required
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              value={adminForm.password}
                              onChange={(e) =>
                                setAdminForm({ ...adminForm, password: e.target.value })
                              }
                              required
                              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4" />
                            <span className="text-sm text-gray-600">Remember me</span>
                          </label>
                          <a
                            href="#"
                            className="text-sm text-red-500 hover:text-red-600 font-medium"
                          >
                            Forgot password?
                          </a>
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-red-500 hover:bg-red-600 text-white py-2"
                        >
                          {isLoading ? "Signing in..." : "Sign In"}
                          {!isLoading && <ArrowRight className="ml-2" size={16} />}
                        </Button>
                      </form>
                    )}

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-center text-gray-600 text-sm mb-4">
                        Want to register your group?
                      </p>
                      <Link href="/groups">
                        <Button variant="outline" className="w-full">
                          Register Your Group
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Info Cards */}
            <div className="mt-8 space-y-4">
              <Card className="border-0 shadow-md bg-blue-50">
                <CardContent className="p-4">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Demo Credentials:</span> Use any email and password to test
                    the login flow. This is a simulation.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-orange-50">
                <CardContent className="p-4">
                  <p className="text-sm text-orange-800">
                    <span className="font-semibold">Having trouble?</span>{" "}
                    <Link href="/contact" className="underline hover:text-orange-900">
                      Contact support
                    </Link>{" "}
                    for assistance.
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
