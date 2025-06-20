"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff, Wrench, Mail, Lock, Phone, User, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [accountType, setAccountType] = useState("customer")
  const [techForm, setTechForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialty: "",
    experience: "",
    location: "",
    bio: "",
    password: "",
    confirmPassword: "",
    terms: false,
    verification: false,
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [customerForm, setCustomerForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    terms: false,
  })

  const handleTechChange = (e: any) => {
    const { id, value, type, checked } = e.target
    setTechForm((prev) => ({
      ...prev,
      [id.replace("tech-", "")]: type === "checkbox" ? checked : value,
    }))
  }

  const handleTechSelect = (field: string, value: string) => {
    setTechForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleTechSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Basic validation
    if (!techForm.terms) {
      alert("You must agree to the terms.")
      setLoading(false)
      return
    }
    if (techForm.password !== techForm.confirmPassword) {
      alert("Passwords do not match.")
      setLoading(false)
      return
    }
    try {
      const res = await fetch("/api/technicians", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: techForm.firstName,
          lastName: techForm.lastName,
          email: techForm.email,
          password: techForm.password,
          phone: techForm.phone,
          specialty: techForm.specialty,
          experience: techForm.experience,
          location: techForm.location,
          bio: techForm.bio,
          services: [techForm.specialty],
        })
      })
      if (res.ok) {
        alert("Technician account created! Now log in.")
        router.push("/login")
      } else {
        const data = await res.json()
        alert(data.error || "Failed to create technician account.")
      }
    } catch (err) {
      alert("Network error. Please try again.")
    }
    setLoading(false)
  }

  const handleCustomerChange = (e: any) => {
    const { id, value, type, checked } = e.target;
    setCustomerForm((prev) => ({
      ...prev,
      [id.replace("customer-", "")]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerForm.terms) {
      alert("You must agree to the terms.");
      return;
    }
    if (customerForm.password !== customerForm.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: customerForm.firstName,
          lastName: customerForm.lastName,
          email: customerForm.email,
          password: customerForm.password,
          phone: customerForm.phone,
          address: customerForm.address,
        }),
      });
      if (res.ok) {
        alert("Customer account created! Now log in.");
        router.push("/login");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create customer account.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Wrench className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">TechConnect</span>
          </Link>
          <p className="text-gray-600 mt-2">Create your account and get started today.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Join our platform as a customer or technician</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={accountType} onValueChange={setAccountType} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="technician">Technician</TabsTrigger>
              </TabsList>

              <TabsContent value="customer" className="space-y-4 mt-6">
                <form onSubmit={handleCustomerSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer-first-name">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="customer-firstName" value={customerForm.firstName} onChange={handleCustomerChange} placeholder="Enter your first name" className="pl-10" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer-last-name">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="customer-lastName" value={customerForm.lastName} onChange={handleCustomerChange} placeholder="Enter your last name" className="pl-10" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="customer-email" type="email" value={customerForm.email} onChange={handleCustomerChange} placeholder="Enter your email" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="customer-phone" type="tel" value={customerForm.phone} onChange={handleCustomerChange} placeholder="Enter your phone number" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer-address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="customer-address" value={customerForm.address} onChange={handleCustomerChange} placeholder="Enter your address" className="pl-10" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="customer-password"
                          type={showPassword ? "text" : "password"}
                          value={customerForm.password}
                          onChange={handleCustomerChange}
                          placeholder="Create a password"
                          className="pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer-confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="customer-confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={customerForm.confirmPassword}
                          onChange={handleCustomerChange}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="customer-terms" checked={customerForm.terms} onCheckedChange={(checked) => setCustomerForm((prev) => ({ ...prev, terms: checked === true }))} />
                    <Label htmlFor="customer-terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button className="w-full" size="lg" type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Customer Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="technician" className="space-y-4 mt-6">
                <form onSubmit={handleTechSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tech-first-name">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="tech-firstName" value={techForm.firstName} onChange={handleTechChange} placeholder="Enter your first name" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tech-last-name">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="tech-lastName" value={techForm.lastName} onChange={handleTechChange} placeholder="Enter your last name" className="pl-10" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tech-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="tech-email" type="email" value={techForm.email} onChange={handleTechChange} placeholder="Enter your email" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tech-phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="tech-phone" type="tel" value={techForm.phone} onChange={handleTechChange} placeholder="Enter your phone number" className="pl-10" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tech-specialty">Primary Specialty</Label>
                    <Select value={techForm.specialty} onValueChange={(val) => handleTechSelect("specialty", val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your primary specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="carpentry">Carpentry</SelectItem>
                        <SelectItem value="ac">AC Maintenance</SelectItem>
                        <SelectItem value="general">General Repairs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tech-experience">Years of Experience</Label>
                    <Select value={techForm.experience} onValueChange={(val) => handleTechSelect("experience", val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tech-location">Service Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="tech-location" value={techForm.location} onChange={handleTechChange} placeholder="Enter your service area" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tech-bio">Brief Description</Label>
                    <Textarea id="tech-bio" value={techForm.bio} onChange={handleTechChange} placeholder="Tell us about your skills and experience..." rows={3} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tech-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="tech-password" type={showPassword ? "text" : "password"} value={techForm.password} onChange={handleTechChange} placeholder="Create a password" className="pl-10 pr-10" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tech-confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="tech-confirmPassword" type={showConfirmPassword ? "text" : "password"} value={techForm.confirmPassword} onChange={handleTechChange} placeholder="Confirm your password" className="pl-10 pr-10" />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tech-terms"
                        checked={techForm.terms}
                        onCheckedChange={(checked) => setTechForm((prev) => ({ ...prev, terms: checked === true }))}
                      />
                      <Label htmlFor="tech-terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tech-verification"
                        checked={techForm.verification}
                        onCheckedChange={(checked) => setTechForm((prev) => ({ ...prev, verification: checked === true }))}
                      />
                      <Label htmlFor="tech-verification" className="text-sm">
                        I consent to background verification and credential checks
                      </Label>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="lg" type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Technician Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <Separator className="my-4" />
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                  Sign in here
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

