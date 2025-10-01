import React from "react";
import { useNavigate } from "react-router-dom";
import { Property } from "@/api/entities";
import { TenantInquiry } from "@/api/entities";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle } from "lucide-react";
import ApplicationForm from "../components/apply/ApplicationForm";

export default function Apply() {
  const navigate = useNavigate();
  const [properties, setProperties] = React.useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    loadProperties();
    const urlParams = new URLSearchParams(window.location.search);
    const propertyParam = urlParams.get("property");
    if (propertyParam) {
      setSelectedPropertyId(propertyParam);
    }
  }, []);

  const loadProperties = async () => {
    const data = await Property.filter({ status: "available" }, "-created_date");
    setProperties(data);
    setLoading(false);
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    await TenantInquiry.create({
      ...formData,
      property_id: selectedPropertyId
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--orbit-cream)] flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--orbit-navy)] mb-4">
            Application Submitted!
          </h2>
          <p className="text-xl text-[var(--orbit-text-light)] mb-8">
            Thank you for your interest. Our team will review your application and contact you within 2-3 business days.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate(createPageUrl("Properties"))}
              className="bg-[var(--orbit-navy)] hover:bg-[var(--orbit-navy-light)] text-white"
            >
              Browse More Properties
            </Button>
            <Button
              onClick={() => navigate(createPageUrl("Home"))}
              variant="outline"
              className="border-2 border-[var(--orbit-navy)] text-[var(--orbit-navy)]"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--orbit-cream)]">
      <div className="bg-gradient-to-br from-[var(--orbit-navy)] to-[var(--orbit-navy-light)] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-[var(--orbit-gold)]" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Tenant Application
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Complete your application to secure your perfect property
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ApplicationForm
          properties={properties}
          selectedPropertyId={selectedPropertyId}
          setSelectedPropertyId={setSelectedPropertyId}
          onSubmit={handleSubmit}
          loading={loading}
          submitting={submitting}
        />
      </div>
    </div>
  );
}