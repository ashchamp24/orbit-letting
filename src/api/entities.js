// src/api/entities.js
import { base44 } from "@/api/base44Client";

// Return safe defaults so UI never crashes if Base44 is down
export const Property = {
  list: async (...args) => {
    try { return await base44.entities.Property.list(...args); }
    catch (e) { console.error("Property.list failed:", e); return []; }
  },
  filter: async (...args) => {
    try { return await base44.entities.Property.filter(...args); }
    catch (e) { console.error("Property.filter failed:", e); return []; }
  },
  get: async (id) => {
    try { return await base44.entities.Property.get(id); }
    catch (e) { console.error("Property.get failed:", e); return null; }
  }
};

export const TenantInquiry = {
  create: async (payload) => {
    try { return await base44.entities.TenantInquiry.create(payload); }
    catch (e) { console.error("TenantInquiry.create failed:", e); return { ok:false, error:e?.message }; }
  }
};

export const User = {
  me: async () => {
    try { return await base44.auth.me(); }
    catch (e) { console.error("User.me failed:", e); return null; }
  }
};
