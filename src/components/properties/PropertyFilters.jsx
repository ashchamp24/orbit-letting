import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";

export default function PropertyFilters({ filters, setFilters }) {
  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[var(--orbit-navy)]">
          <SlidersHorizontal className="w-5 h-5 text-[var(--orbit-gold)]" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-semibold text-[var(--orbit-navy)] mb-2 block">
            Property Type
          </Label>
          <Select
            value={filters.property_type}
            onValueChange={(value) => setFilters({ ...filters, property_type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-semibold text-[var(--orbit-navy)] mb-2 block">
            Minimum Bedrooms: {filters.min_bedrooms}
          </Label>
          <Slider
            value={[filters.min_bedrooms]}
            onValueChange={([value]) => setFilters({ ...filters, min_bedrooms: value })}
            max={5}
            step={1}
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-sm font-semibold text-[var(--orbit-navy)] mb-2 block">
            Max Price: £{filters.max_price.toLocaleString()}
          </Label>
          <Slider
            value={[filters.max_price]}
            onValueChange={([value]) => setFilters({ ...filters, max_price: value })}
            min={500}
            max={10000}
            step={100}
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-sm font-semibold text-[var(--orbit-navy)] mb-2 block">
            Furnished
          </Label>
          <Select
            value={filters.furnished}
            onValueChange={(value) => setFilters({ ...filters, furnished: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-semibold text-[var(--orbit-navy)] mb-2 block">
            Pets Allowed
          </Label>
          <Select
            value={filters.pets_allowed}
            onValueChange={(value) => setFilters({ ...filters, pets_allowed: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}