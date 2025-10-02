import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Maximize, ArrowRight } from "lucide-react";

export default function PropertyCard({ property }) {
  const navigate = useNavigate();

  const mainImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800";

  return (
    <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-4 right-4 bg-[var(--orbit-gold)] text-[var(--orbit-navy)] font-semibold">
          {property.property_type}
        </Badge>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-3xl font-bold text-white mb-2">
            £{property.price_per_month.toLocaleString()}
            <span className="text-base font-normal">/month</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-[var(--orbit-navy)] mb-3 line-clamp-1 group-hover:text-[var(--orbit-gold)] transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-2 text-[var(--orbit-text-light)] mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm line-clamp-1">{property.address}</span>
        </div>

        <div className="flex items-center gap-6 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-[var(--orbit-gold)]" />
            <span className="font-semibold text-[var(--orbit-navy)]">{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-[var(--orbit-gold)]" />
            <span className="font-semibold text-[var(--orbit-navy)]">{property.bathrooms}</span>
          </div>
          {property.square_feet && (
            <div className="flex items-center gap-2">
              <Maximize className="w-5 h-5 text-[var(--orbit-gold)]" />
              <span className="font-semibold text-[var(--orbit-navy)]">{property.square_feet} ft²</span>
            </div>
          )}
        </div>

        <Button
          onClick={() => navigate(createPageUrl("PropertyDetails") + "?id=" + property.id)}
          className="w-full bg-[var(--orbit-navy)] hover:bg-[var(--orbit-navy-light)] text-white font-semibold group-hover:bg-[var(--orbit-gold)] group-hover:text-[var(--orbit-navy)] transition-all"
        >
          View Details
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}