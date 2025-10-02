import { createClient } from '@base44/sdk';

export const base44 = createClient({
  appId: "68dd4d34b4c5c849213c8935",
  requiresAuth: false   // ⬅ change this line
});
