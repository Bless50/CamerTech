"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Search, Zap, Droplets, Hammer, Wind } from "lucide-react"
import { useRouter } from "next/navigation"

interface QuickBookWidgetProps {
  className?: string
  showTitle?: boolean
}

export function QuickBookWidget({ className = "", showTitle = true }: QuickBookWidgetProps) {
  const [service, setService] = useState("")
  const [location, setLocation] = useState("")
  const router = useRouter()

  const services = [
    { id: "electrical", name: "Electrical Repair", icon: Zap },
    { id: "plumbing", name: "Plumbing Service", icon: Droplets },
    { id: "carpentry", name: "Carpentry Work", icon: Hammer },
    { id: "ac", name: "AC Maintenance", icon: Wind },
  ]

  const handleQuickBook = () => {
    const params = new URLSearchParams()
    if (service) params.set("service", service)
    if (location) params.set("location", location)

    router.push(`/book-service?${params.toString()}`)
  }

  return (
    <Card className={className}>
      {showTitle && (
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Quick Book</span>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        <div>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((svc) => (
                <SelectItem key={svc.id} value={svc.id}>
                  <div className="flex items-center space-x-2">
                    <svc.icon className="h-4 w-4" />
                    <span>{svc.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button onClick={handleQuickBook} className="w-full" disabled={!service}>
          <Search className="h-4 w-4 mr-2" />
          Find Technicians
        </Button>
      </CardContent>
    </Card>
  )
}
