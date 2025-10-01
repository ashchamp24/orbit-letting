import React from "react";
import { Property } from "@/api/entities";
import { TenantInquiry } from "@/api/entities";
import { User } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, FileText, Users, Plus, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [properties, setProperties] = React.useState([]);
  const [inquiries, setInquiries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      
      const allProperties = await Property.list("-created_date");
      setProperties(allProperties);
      
      const allInquiries = await TenantInquiry.list("-created_date");
      setInquiries(allInquiries);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
    setLoading(false);
  };

  const statusColors = {
    available: "bg-green-100 text-green-800",
    rented: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800"
  };

  const inquiryStatusColors = {
    new: "bg-purple-100 text-purple-800",
    reviewing: "bg-blue-100 text-blue-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800"
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--orbit-cream)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--orbit-navy)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--orbit-cream)]">
      <div className="bg-gradient-to-br from-[var(--orbit-navy)] to-[var(--orbit-navy-light)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Management Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Welcome back, {user?.full_name || "Admin"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[var(--orbit-text-light)]">
                Total Properties
              </CardTitle>
              <Building2 className="w-5 h-5 text-[var(--orbit-gold)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--orbit-navy)]">{properties.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[var(--orbit-text-light)]">
                Available
              </CardTitle>
              <Building2 className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--orbit-navy)]">
                {properties.filter(p => p.status === "available").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[var(--orbit-text-light)]">
                Total Inquiries
              </CardTitle>
              <FileText className="w-5 h-5 text-[var(--orbit-gold)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--orbit-navy)]">{inquiries.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Properties List */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-[var(--orbit-navy)]">Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {properties.length > 0 ? (
                properties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--orbit-navy)] mb-1">{property.title}</h3>
                      <p className="text-sm text-[var(--orbit-text-light)]">{property.address}</p>
                      <p className="text-sm font-medium text-[var(--orbit-navy)] mt-1">
                        £{property.price_per_month.toLocaleString()}/month
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={statusColors[property.status]}>
                        {property.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(createPageUrl("PropertyDetails") + "?id=" + property.id)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No properties yet. Add your first property to get started.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[var(--orbit-navy)]">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inquiries.length > 0 ? (
                inquiries.slice(0, 5).map((inquiry) => {
                  const property = properties.find(p => p.id === inquiry.property_id);
                  return (
                    <div key={inquiry.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--orbit-navy)] mb-1">{inquiry.full_name}</h3>
                        <p className="text-sm text-[var(--orbit-text-light)]">
                          {property ? property.title : "Property N/A"}
                        </p>
                        <p className="text-sm text-[var(--orbit-text-light)]">{inquiry.email}</p>
                      </div>
                      <Badge className={inquiryStatusColors[inquiry.status]}>
                        {inquiry.status}
                      </Badge>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No applications yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}