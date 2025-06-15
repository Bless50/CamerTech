import Link from "next/link"
import { BarChart3, Users, ShoppingBag, PackageCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      <nav className="mb-8">
        <Link href="/admin" className="text-gray-600 hover:text-blue-600 mr-4">
          Dashboard
        </Link>
        <Link href="/admin/users" className="text-gray-600 hover:text-blue-600 mr-4">
          Users
        </Link>
        <Link href="/admin/products" className="text-gray-600 hover:text-blue-600 mr-4">
          Products
        </Link>
        <Link href="/admin/orders" className="text-gray-600 hover:text-blue-600 mr-4">
          Orders
        </Link>
        <Link href="/admin/analytics" className="text-gray-600 hover:text-blue-600">
          Analytics
        </Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Total Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-sm text-gray-500">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-green-600" />
              <span>Total Products</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320</div>
            <p className="text-sm text-gray-500">Available products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PackageCheck className="h-5 w-5 text-yellow-600" />
              <span>Total Orders</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">540</div>
            <p className="text-sm text-gray-500">Orders placed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {/* Replace with appropriate icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-red-600"
              >
                <path
                  fillRule="evenodd"
                  d="M4.848 2.771A6.707 6.707 0 0110.5 1.5h3a6.707 6.707 0 015.652 1.271m3 5.806a8.29 8.29 0 01-5.666 1.269 8.289 8.289 0 01-3.814-.314 8.289 8.289 0 01-3.814.314 8.29 8.29 0 01-5.666-1.27 2.475 2.475 0 012.599-1.835 2.475 2.475 0 011.32.352m0 5.171a2.475 2.475 0 01-1.32.352 2.475 2.475 0 01-2.599-1.835m0 3.366c.99.318 2.033.48 3.112.48s2.122-.162 3.112-.48m0-1.549a5.471 5.471 0 01-1.32.352 5.471 5.471 0 01-2.599-1.835m0 3.366c.99.318 2.033.48 3.112.48s2.122-.162 3.112-.48"
                  clipRule="evenodd"
                />
              </svg>
              <span>Server Load</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-sm text-gray-500">Current server usage</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <span>Quick Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Top Performer</span>
                <span className="font-medium">Amadou Diallo (94.5%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Revenue</span>
                <span className="font-medium">3,854,000 CFA</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Rating</span>
                <span className="font-medium">4.8 ⭐</span>
              </div>
              <Link href="/admin/analytics">
                <Button className="w-full mt-4">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Full Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
