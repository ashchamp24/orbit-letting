import React from "react";
import { Property } from "@/api/entities";
import PropertyCard from "../components/properties/PropertyCard";
import PropertyFilters from "../components/properties/PropertyFilters";
import { Search, Home } from "lucide-react";

export default function Properties() {
  const [properties, setProperties] = React.useState([]);
  const [filteredProperties, setFilteredProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState({
    property_type: "all",
    min_bedrooms: 0,
    max_price: 10000,
    furnished: "all",
    pets_allowed: "all"
  });

  React.useEffect(() => {
    loadProperties();
  }, []);

  const applyFilters = React.useCallback(() => {
    let filtered = [...properties];

    if (filters.property_type !== "all") {
      filtered = filtered.filter(p => p.property_type === filters.property_type);
    }

    filtered = filtered.filter(p => p.bedrooms >= filters.min_bedrooms);
    filtered = filtered.filter(p => p.price_per_month <= filters.max_price);

    if (filters.furnished !== "all") {
      filtered = filtered.filter(p => p.furnished === (filters.furnished === "yes"));
    }

    if (filters.pets_allowed !== "all") {
      filtered = filtered.filter(p => p.pets_allowed === (filters.pets_allowed === "yes"));
    }

    setFilteredProperties(filtered);
  }, [properties, filters]);

  React.useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const loadProperties = async () => {
    const data = await Property.filter({ status: "available" }, "-created_date");
    setProperties(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--orbit-cream)]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--orbit-navy)] to-[var(--orbit-navy-light)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-8 h-8 text-[var(--orbit-gold)]" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Available Properties
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Explore our collection of premium rental properties
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <PropertyFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-lg text-[var(--orbit-text)]">
                <span className="font-semibold text-[var(--orbit-navy)]">
                  {filteredProperties.length}
                </span>
                {" "}properties found
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
                    <div className="bg-gray-200 h-6 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-500 mb-2">No properties match your filters</p>
                <p className="text-gray-400">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}