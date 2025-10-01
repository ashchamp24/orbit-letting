import React from "react";
import { useNavigate } from "react-router-dom";
import { Property } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createPageUrl } from "@/utils";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Home,
  Calendar,
  DollarSign,
  Maximize,
  Check,
  Sofa,
  PawPrint,
  Car
} from "lucide-react";
import { format } from "date-fns";

export default function PropertyDetails() {
  const navigate = useNavigate();
  const [property, setProperty] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedImage, setSelectedImage] = React.useState(0);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get("id");
    if (propertyId) {
      loadProperty(propertyId);
    }
  }, []);

  const loadProperty = async (id) => {
    const properties = await Property.filter({ id });
    if (properties.length > 0) {
      setProperty(properties[0]);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--orbit-cream)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--orbit-navy)]"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-[var(--orbit-cream)] flex items-center justify-center">
        <div className="text-center">
          <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">Property not found</p>
        </div>
      </div>
    );
  }

  const propertyImages = property.images && property.images.length > 0 
    ? property.images 
    : ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"];

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-[var(--orbit-cream)] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl("Properties"))}
            className="text-[var(--orbit-navy)] hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-4 shadow-2xl">
            <img
              src={propertyImages[selectedImage]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 right-4 bg-[var(--orbit-gold)] text-[var(--orbit-navy)] font-semibold text-base px-4 py-2">
              {property.status === "available" ? "Available" : "Unavailable"}
            </Badge>
          </div>
          {propertyImages.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {propertyImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-24 rounded-lg overflow-hidden transition-all duration-200 ${
                    selectedImage === index 
                      ? "ring-4 ring-[var(--orbit-gold)]" 
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Price */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--orbit-navy)] mb-4">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-xl text-[var(--orbit-text-light)] mb-6">
                <MapPin className="w-5 h-5" />
                {property.address}, {property.city}, {property.postcode}
              </div>
              <div className="text-4xl font-bold text-[var(--orbit-navy)]">
                £{property.price_per_month.toLocaleString()}
                <span className="text-xl text-[var(--orbit-text-light)] font-normal">/month</span>
              </div>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Bed, label: "Bedrooms", value: property.bedrooms },
                { icon: Bath, label: "Bathrooms", value: property.bathrooms },
                { icon: Maximize, label: "Sq Feet", value: property.square_feet },
                { icon: Home, label: "Type", value: property.property_type }
              ].map((item, index) => (
                <div key={index} className="bg-[var(--orbit-cream)] p-4 rounded-xl">
                  <item.icon className="w-6 h-6 text-[var(--orbit-gold)] mb-2" />
                  <div className="text-2xl font-bold text-[var(--orbit-navy)]">{item.value}</div>
                  <div className="text-sm text-[var(--orbit-text-light)]">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--orbit-navy)] mb-4">Description</h2>
              <p className="text-[var(--orbit-text)] leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[var(--orbit-navy)] mb-4">Features</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 bg-[var(--orbit-cream)] p-3 rounded-lg">
                      <Check className="w-5 h-5 text-[var(--orbit-gold)]" />
                      <span className="text-[var(--orbit-text)]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--orbit-cream)] p-6 rounded-2xl sticky top-24 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--orbit-navy)] mb-4">Property Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[var(--orbit-gold)]" />
                    <div>
                      <div className="text-sm text-[var(--orbit-text-light)]">Available From</div>
                      <div className="font-semibold text-[var(--orbit-navy)]">
                        {property.available_from ? format(new Date(property.available_from), "MMMM d, yyyy") : "Now"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-[var(--orbit-gold)]" />
                    <div>
                      <div className="text-sm text-[var(--orbit-text-light)]">Deposit</div>
                      <div className="font-semibold text-[var(--orbit-navy)]">
                        £{property.deposit?.toLocaleString() || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-[var(--orbit-navy)] mb-4">Additional Info</h3>
                <div className="space-y-3">
                  {[
                    { icon: Sofa, label: "Furnished", value: property.furnished },
                    { icon: PawPrint, label: "Pets Allowed", value: property.pets_allowed },
                    { icon: Car, label: "Parking", value: property.parking }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <item.icon className="w-5 h-5 text-[var(--orbit-gold)]" />
                        <span className="text-[var(--orbit-text)]">{item.label}</span>
                      </div>
                      <Badge variant={item.value ? "default" : "secondary"} className={item.value ? "bg-green-100 text-green-800" : ""}>
                        {item.value ? "Yes" : "No"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => navigate(createPageUrl("Apply") + "?property=" + property.id)}
                className="w-full bg-[var(--orbit-navy)] hover:bg-[var(--orbit-navy-light)] text-white font-semibold text-lg h-12 rounded-xl"
              >
                Apply for This Property
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}