import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function ApplicationForm({ 
  properties, 
  selectedPropertyId, 
  setSelectedPropertyId,
  onSubmit,
  loading,
  submitting 
}) {
  const [formData, setFormData] = React.useState({
    full_name: "",
    email: "",
    phone: "",
    current_address: "",
    employment_status: "employed",
    annual_income: "",
    move_in_date: "",
    number_of_occupants: 1,
    has_pets: false,
    additional_notes: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Card className="shadow-2xl">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="property" className="text-sm font-semibold text-[var(--orbit-navy)]">
              Select Property *
            </Label>
            <Select
              value={selectedPropertyId}
              onValueChange={setSelectedPropertyId}
              required
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose a property" />
              </SelectTrigger>
              <SelectContent>
                {loading ? (
                  <SelectItem value="loading" disabled>Loading properties...</SelectItem>
                ) : properties.length > 0 ? (
                  properties.map((property) => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.title} - £{property.price_per_month.toLocaleString()}/month
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>No properties available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="full_name" className="text-sm font-semibold text-[var(--orbit-navy)]">
                Full Name *
              </Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => handleChange("full_name", e.target.value)}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-[var(--orbit-navy)]">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-semibold text-[var(--orbit-navy)]">
                Phone *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="employment_status" className="text-sm font-semibold text-[var(--orbit-navy)]">
                Employment Status
              </Label>
              <Select
                value={formData.employment_status}
                onValueChange={(value) => handleChange("employment_status", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="self_employed">Self Employed</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="annual_income" className="text-sm font-semibold text-[var(--orbit-navy)]">
                Annual Income (£)
              </Label>
              <Input
                id="annual_income"
                type="number"
                value={formData.annual_income}
                onChange={(e) => handleChange("annual_income", e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="move_in_date" className="text-sm font-semibold text-[var(--orbit-navy)]">
                Preferred Move-in Date
              </Label>
              <Input
                id="move_in_date"
                type="date"
                value={formData.move_in_date}
                onChange={(e) => handleChange("move_in_date", e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="number_of_occupants" className="text-sm font-semibold text-[var(--orbit-navy)]">
                Number of Occupants
              </Label>
              <Input
                id="number_of_occupants"
                type="number"
                min="1"
                value={formData.number_of_occupants}
                onChange={(e) => handleChange("number_of_occupants", parseInt(e.target.value))}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="has_pets" className="text-sm font-semibold text-[var(--orbit-navy)]">
                Do you have pets?
              </Label>
              <Select
                value={formData.has_pets ? "yes" : "no"}
                onValueChange={(value) => handleChange("has_pets", value === "yes")}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="current_address" className="text-sm font-semibold text-[var(--orbit-navy)]">
              Current Address
            </Label>
            <Input
              id="current_address"
              value={formData.current_address}
              onChange={(e) => handleChange("current_address", e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="additional_notes" className="text-sm font-semibold text-[var(--orbit-navy)]">
              Additional Notes
            </Label>
            <Textarea
              id="additional_notes"
              value={formData.additional_notes}
              onChange={(e) => handleChange("additional_notes", e.target.value)}
              className="mt-2 h-32"
              placeholder="Any additional information you'd like to share..."
            />
          </div>

          <Button
            type="submit"
            disabled={!selectedPropertyId || submitting}
            className="w-full bg-[var(--orbit-navy)] hover:bg-[var(--orbit-navy-light)] text-white font-semibold text-lg h-12 rounded-xl"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}