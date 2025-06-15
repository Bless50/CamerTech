"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import {
  Settings,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Zap,
  Droplets,
  Hammer,
  Wind,
  Wrench,
  Download,
  DollarSign,
  Clock,
  Users,
} from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/currency"
import { CurrencyInput } from "@/components/currency-input"

interface Service {
  id: number
  name: string
  description: string
  category: string
  basePrice: number
  maxPrice: number
  duration: string
  difficulty: "Easy" | "Medium" | "Hard" | "Expert"
  isActive: boolean
  providersCount: number
  bookingsCount: number
  rating: number
  icon: string
  requirements: string[]
  tags: string[]
  createdDate: string
}

interface ServiceCategory {
  id: string
  name: string
  description: string
  icon: any
  servicesCount: number
  isActive: boolean
}

export default function ServicesManagement() {
  const [activeTab, setActiveTab] = useState("services")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false)
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)

  // Mock data for services
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Electrical Installation",
      description: "Complete electrical installation for residential and commercial properties",
      category: "Electrical",
      basePrice: 25000, // 25,000 CFA
      maxPrice: 75000, // 75,000 CFA
      duration: "2-4 hours",
      difficulty: "Medium",
      isActive: true,
      providersCount: 15,
      bookingsCount: 89,
      rating: 4.8,
      icon: "Zap",
      requirements: ["Electrical License", "Safety Certification"],
      tags: ["installation", "wiring", "residential", "commercial"],
      createdDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Plumbing Repair",
      description: "Professional plumbing repair services for leaks, clogs, and installations",
      category: "Plumbing",
      basePrice: 15000, // 15,000 CFA
      maxPrice: 50000, // 50,000 CFA
      duration: "1-3 hours",
      difficulty: "Easy",
      isActive: true,
      providersCount: 12,
      bookingsCount: 156,
      rating: 4.7,
      icon: "Droplets",
      requirements: ["Plumbing License"],
      tags: ["repair", "leak", "pipes", "emergency"],
      createdDate: "2023-02-10",
    },
    {
      id: 3,
      name: "AC Installation & Maintenance",
      description: "Air conditioning installation, repair, and regular maintenance services",
      category: "HVAC",
      basePrice: 30000, // 30,000 CFA
      maxPrice: 100000, // 100,000 CFA
      duration: "3-6 hours",
      difficulty: "Hard",
      isActive: true,
      providersCount: 8,
      bookingsCount: 67,
      rating: 4.9,
      icon: "Wind",
      requirements: ["HVAC Certification", "Refrigerant License"],
      tags: ["ac", "cooling", "installation", "maintenance"],
      createdDate: "2023-03-05",
    },
  ])

  // Mock data for categories
  const [categories, setCategories] = useState<ServiceCategory[]>([
    {
      id: "electrical",
      name: "Electrical",
      description: "Electrical installation, repair, and maintenance services",
      icon: Zap,
      servicesCount: 8,
      isActive: true,
    },
    {
      id: "plumbing",
      name: "Plumbing",
      description: "Plumbing repair, installation, and maintenance services",
      icon: Droplets,
      servicesCount: 6,
      isActive: true,
    },
    {
      id: "hvac",
      name: "HVAC",
      description: "Heating, ventilation, and air conditioning services",
      icon: Wind,
      servicesCount: 4,
      isActive: true,
    },
    {
      id: "carpentry",
      name: "Carpentry",
      description: "Wood work, furniture, and construction services",
      icon: Hammer,
      servicesCount: 10,
      isActive: true,
    },
  ])

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    category: "",
    basePrice: 0,
    maxPrice: 0,
    duration: "",
    difficulty: "Easy" as const,
    requirements: "",
    tags: "",
  })

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    icon: "Wrench",
  })

  const difficultyColors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-orange-100 text-orange-800",
    Expert: "bg-red-100 text-red-800",
  }

  const filteredServices = services.filter((service) => {
    return (
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleAddService = () => {
    const service: Service = {
      id: Date.now(),
      ...newService,
      isActive: true,
      providersCount: 0,
      bookingsCount: 0,
      rating: 0,
      icon: "Wrench",
      requirements: newService.requirements
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean),
      tags: newService.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      createdDate: new Date().toISOString().split("T")[0],
    }

    setServices([...services, service])
    setNewService({
      name: "",
      description: "",
      category: "",
      basePrice: 0,
      maxPrice: 0,
      duration: "",
      difficulty: "Easy",
      requirements: "",
      tags: "",
    })
    setIsAddServiceModalOpen(false)
  }

  const handleAddCategory = () => {
    const category: ServiceCategory = {
      id: newCategory.name.toLowerCase().replace(/\s+/g, "-"),
      ...newCategory,
      icon: Wrench, // Default icon
      servicesCount: 0,
      isActive: true,
    }

    setCategories([...categories, category])
    setNewCategory({
      name: "",
      description: "",
      icon: "Wrench",
    })
    setIsAddCategoryModalOpen(false)
  }

  const handleToggleService = (serviceId: number) => {
    setServices(services.map((s) => (s.id === serviceId ? { ...s, isActive: !s.isActive } : s)))
  }

  const handleDeleteService = (serviceId: number) => {
    setServices(services.filter((s) => s.id !== serviceId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="flex items-center space-x-2">
                <Wrench className="h-6 w-6 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">TechConnect</span>
              </Link>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Admin Panel
              </Badge>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/admin/providers" className="text-gray-600 hover:text-blue-600">
                Providers
              </Link>
              <Link href="/admin/services" className="text-blue-600 font-medium">
                Services
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600">Manage services and categories offered on the platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Services</p>
                  <p className="text-2xl font-bold text-blue-600">{services.length}</p>
                </div>
                <Settings className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Services</p>
                  <p className="text-2xl font-bold text-green-600">{services.filter((s) => s.isActive).length}</p>
                </div>
                <Wrench className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-purple-600">{categories.length}</p>
                </div>
                <Filter className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Price Range</p>
                  <p className="text-2xl font-bold text-orange-600">{formatCurrency(20000, "CFA")}</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Dialog open={isAddServiceModalOpen} onOpenChange={setIsAddServiceModalOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Service</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="serviceName">Service Name *</Label>
                          <Input
                            id="serviceName"
                            value={newService.name}
                            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                            placeholder="Enter service name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="serviceCategory">Category *</Label>
                          <Select
                            value={newService.category}
                            onValueChange={(value) => setNewService({ ...newService, category: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.name}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="serviceDescription">Description *</Label>
                        <Textarea
                          id="serviceDescription"
                          value={newService.description}
                          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                          placeholder="Describe the service..."
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CurrencyInput
                          label="Base Price (CFA) *"
                          value={newService.basePrice}
                          onChange={(value) => setNewService({ ...newService, basePrice: value })}
                          currency="CFA"
                          placeholder="Minimum price"
                        />
                        <CurrencyInput
                          label="Maximum Price (CFA) *"
                          value={newService.maxPrice}
                          onChange={(value) => setNewService({ ...newService, maxPrice: value })}
                          currency="CFA"
                          placeholder="Maximum price"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="duration">Duration</Label>
                          <Input
                            id="duration"
                            value={newService.duration}
                            onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                            placeholder="e.g., 2-4 hours"
                          />
                        </div>
                        <div>
                          <Label htmlFor="difficulty">Difficulty Level</Label>
                          <Select
                            value={newService.difficulty}
                            onValueChange={(value: any) => setNewService({ ...newService, difficulty: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Easy">Easy</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Hard">Hard</SelectItem>
                              <SelectItem value="Expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                        <Input
                          id="requirements"
                          value={newService.requirements}
                          onChange={(e) => setNewService({ ...newService, requirements: e.target.value })}
                          placeholder="License, Certification, etc."
                        />
                      </div>

                      <div>
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input
                          id="tags"
                          value={newService.tags}
                          onChange={(e) => setNewService({ ...newService, tags: e.target.value })}
                          placeholder="repair, installation, emergency"
                        />
                      </div>

                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={() => setIsAddServiceModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddService}>Add Service</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Services Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-6 font-medium text-gray-900">Service</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-900">Category</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-900">Price Range</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-900">Difficulty</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-900">Providers</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredServices.map((service) => (
                        <tr key={service.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium text-gray-900">{service.name}</p>
                              <p className="text-sm text-gray-500 truncate max-w-xs">{service.description}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <Badge variant="secondary">{service.category}</Badge>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm">
                              <p className="font-medium">{formatCurrency(service.basePrice, "CFA")}</p>
                              <p className="text-gray-500">to {formatCurrency(service.maxPrice, "CFA")}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <Badge className={difficultyColors[service.difficulty]}>{service.difficulty}</Badge>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{service.providersCount}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <Switch
                              checked={service.isActive}
                              onCheckedChange={() => handleToggleService(service.id)}
                            />
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => setSelectedService(service)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteService(service.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            {/* Categories Actions */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Service Categories</h2>
              <Dialog open={isAddCategoryModalOpen} onOpenChange={setIsAddCategoryModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="categoryName">Category Name *</Label>
                      <Input
                        id="categoryName"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        placeholder="Enter category name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="categoryDescription">Description *</Label>
                      <Textarea
                        id="categoryDescription"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        placeholder="Describe the category..."
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsAddCategoryModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddCategory}>Add Category</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 rounded-lg p-3">
                          <category.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{category.name}</h3>
                          <p className="text-sm text-gray-500">{category.servicesCount} services</p>
                        </div>
                      </div>
                      <Switch checked={category.isActive} />
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Service Details Modal */}
        {selectedService && (
          <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Service Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{selectedService.name}</h3>
                    <p className="text-gray-600 mb-4">{selectedService.description}</p>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary">{selectedService.category}</Badge>
                      <Badge className={difficultyColors[selectedService.difficulty]}>
                        {selectedService.difficulty}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedService.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Switch checked={selectedService.isActive} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Pricing</h4>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Base Price:</span>{" "}
                        {formatCurrency(selectedService.basePrice, "CFA")}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Max Price:</span>{" "}
                        {formatCurrency(selectedService.maxPrice, "CFA")}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Average:</span>{" "}
                        {formatCurrency((selectedService.basePrice + selectedService.maxPrice) / 2, "CFA")}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Statistics</h4>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Providers:</span> {selectedService.providersCount}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Bookings:</span> {selectedService.bookingsCount}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Rating:</span> {selectedService.rating}/5
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Requirements</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.requirements.map((req, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedService(null)}>
                    Close
                  </Button>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Service
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
