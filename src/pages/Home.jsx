import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Property } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users, Shield, Sparkles, Home as HomeIcon, Search } from "lucide-react";
import PropertyCard from "../components/properties/PropertyCard";

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    const properties = await Property.filter({ status: "available" }, "-created_date", 3);
    setFeaturedProperties(properties);
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--orbit-navy)] via-[var(--orbit-navy-light)] to-[var(--orbit-navy)] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--orbit-gold)] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 text-[var(--orbit-gold)]" />
              Premium Property Management
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-[var(--orbit-gold)]">Living Space</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Discover exceptional properties curated for modern living. 
              Professional management, quality tenants, seamless experience.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to={createPageUrl("Properties")}>
                <Button size="lg" className="bg-[var(--orbit-gold)] hover:bg-[var(--orbit-gold-light)] text-[var(--orbit-navy)] font-semibold text-lg px-8 h-14 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <Search className="w-5 h-5 mr-2" />
                  Browse Properties
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl("Apply")}>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[var(--orbit-navy)] font-semibold text-lg px-8 h-14 rounded-xl transition-all duration-300">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--orbit-cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--orbit-navy)] mb-4">
              Why Choose Orbit Letting
            </h2>
            <p className="text-xl text-[var(--orbit-text-light)] max-w-2xl mx-auto">
              Experience property management reimagined with our premium service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Premium Properties",
                description: "Carefully selected properties that meet our high standards for quality and comfort"
              },
              {
                icon: Users,
                title: "Expert Management",
                description: "Professional team dedicated to maintaining excellence and tenant satisfaction"
              },
              {
                icon: Shield,
                title: "Secure & Trusted",
                description: "Rigorous vetting process ensuring safe and reliable tenancy experiences"
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--orbit-navy)] to-[var(--orbit-navy-light)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-[var(--orbit-gold)]" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--orbit-navy)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[var(--orbit-text-light)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--orbit-navy)] mb-4">
                Featured Properties
              </h2>
              <p className="text-xl text-[var(--orbit-text-light)]">
                Handpicked selections from our premium portfolio
              </p>
            </div>
            <Link to={createPageUrl("Properties")}>
              <Button variant="outline" className="hidden md:flex border-2 border-[var(--orbit-navy)] text-[var(--orbit-navy)] hover:bg-[var(--orbit-navy)] hover:text-white font-semibold">
                View All Properties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
                  <div className="bg-gray-200 h-6 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[var(--orbit-cream)] rounded-2xl">
              <HomeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">No properties available at the moment</p>
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link to={createPageUrl("Properties")}>
              <Button variant="outline" className="border-2 border-[var(--orbit-navy)] text-[var(--orbit-navy)] hover:bg-[var(--orbit-navy)] hover:text-white font-semibold">
                View All Properties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--orbit-navy)] to-[var(--orbit-navy-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Home?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let us help you discover the perfect property that matches your lifestyle and needs
          </p>
          <Link to={createPageUrl("Apply")}>
            <Button size="lg" className="bg-[var(--orbit-gold)] hover:bg-[var(--orbit-gold-light)] text-[var(--orbit-navy)] font-semibold text-lg px-12 h-14 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              Start Your Application
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}