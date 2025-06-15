import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  UserCheck,
  Calendar,
  CreditCard,
  Star,
  Shield,
  Clock,
  MapPin,
  CheckCircle,
  MessageSquare,
  Award,
  Smartphone,
  Users,
  Wrench,
} from "lucide-react"
import Link from "next/link"
import FAQSearch from "@/components/faq-search"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              TechConnect
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/search" className="text-gray-600 hover:text-blue-600">
                Find Technicians
              </Link>
              <Link href="/register" className="text-gray-600 hover:text-blue-600">
                Join as Provider
              </Link>
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">How TechConnect Works</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connecting you with skilled, verified technicians in just a few simple steps. Get quality repairs and
            maintenance services with complete peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" className="w-full sm:w-auto">
                <Search className="mr-2 h-5 w-5" />
                Find a Technician
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Wrench className="mr-2 h-5 w-5" />
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Customers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              For Customers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get Your Repairs Done Right</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From finding the right technician to completing your service, we make it simple and secure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">1. Search & Browse</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Search by service type, location, or specific skills. Browse verified technician profiles with ratings
                  and reviews.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">2. Book Instantly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Choose your preferred date and time. Get instant confirmation or quick response from available
                  technicians.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">3. Get Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Meet your technician at the scheduled time. Track progress and communicate through our secure
                  platform.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">4. Pay Securely</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Pay securely through our platform after service completion. Rate your experience and help others.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Service Providers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              For Service Providers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Grow Your Business</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our platform and connect with customers who need your expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <Card className="text-center border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">1. Sign Up & Verify</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Create your profile, upload credentials, and complete our verification process to build trust.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="text-center border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">2. Receive Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get notified of booking requests in your area. Accept jobs that match your schedule and expertise.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="text-center border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">3. Complete Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Provide excellent service, communicate with customers, and build your reputation on the platform.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="text-center border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">4. Get Paid & Grow</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Receive secure payments, collect reviews, and grow your business with our marketing tools.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose TechConnect?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've built features that make finding and providing technical services simple, safe, and reliable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Verified Professionals */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Verified Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  All technicians undergo thorough background checks, skill verification, and identity confirmation
                  before joining our platform.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Real-time Tracking */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <MapPin className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Real-time Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Track your technician's location, get arrival notifications, and stay updated on job progress through
                  our mobile app.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Secure Payments */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <CreditCard className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Pay safely through our encrypted platform. Support for multiple payment methods including mobile money
                  and cards.
                </CardDescription>
              </CardContent>
            </Card>

            {/* 24/7 Support */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>24/7 Customer Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get help whenever you need it. Our support team is available around the clock to assist with any
                  issues.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Quality Guarantee */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Star className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Quality Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We stand behind every service. If you're not satisfied, we'll work to make it right or provide a
                  refund.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Fast Response */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Clock className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Fast Response Times</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get responses within minutes, not hours. Our network of technicians ensures quick availability for
                  urgent repairs.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No hidden fees, no surprises. See exactly what you'll pay before booking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* For Customers */}
            <Card className="border-2">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">For Customers</CardTitle>
                <CardDescription>Simple, transparent pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Service Fee</span>
                  <span className="font-semibold">Included in quoted price</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Booking Fee</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cancellation</span>
                  <span className="font-semibold">Free (24h notice)</span>
                </div>
                <Separator />
                <div className="text-sm text-gray-600">
                  Pay only the quoted service price. No hidden fees or surprise charges.
                </div>
              </CardContent>
            </Card>

            {/* For Providers */}
            <Card className="border-2">
              <CardHeader className="text-center">
                <Wrench className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">For Service Providers</CardTitle>
                <CardDescription>Competitive commission rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Platform Fee</span>
                  <span className="font-semibold">10% per completed job</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Registration</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Payment Processing</span>
                  <span className="font-semibold">Included</span>
                </div>
                <Separator />
                <div className="text-sm text-gray-600">
                  Keep 90% of your earnings. Get paid within 24 hours of job completion.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to the most common questions about using TechConnect.
            </p>
          </div>

          <FAQSearch />

          {/* Still have questions CTA */}
          <div className="text-center mt-12 p-8 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">Our support team is here to help you get the most out of TechConnect.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="w-full sm:w-auto">
                <MessageSquare className="mr-2 h-4 w-4" />
                Live Chat Support
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and skilled technicians on TechConnect today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Search className="mr-2 h-5 w-5" />
                Find a Technician
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600"
              >
                <Wrench className="mr-2 h-5 w-5" />
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TechConnect</h3>
              <p className="text-gray-400">
                Connecting skilled technicians with customers who need reliable repair and maintenance services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/search" className="hover:text-white">
                    Find Technicians
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Providers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/register" className="hover:text-white">
                    Join as Provider
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white">
                    Provider Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Safety
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 TechConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
