// permissions.ts

import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

// Extend default admin capabilities with project-specific permissions
export const statement = {
  ...defaultStatements,
  store: ["create", "update", "delete"],
  order: ["view", "assign", "update", "track"],
  product: ["create", "update", "delete"],
  delivery: ["assign", "update_status"],
  customer: ["place_order", "track_delivery"],
} as const;

export const ac = createAccessControl(statement);

// Define roles with scoped permissions
export const ADMIN = ac.newRole({
  ...adminAc.statements,  // includes default admin capabilities
  store: ["create", "update", "delete"],
  order: ["view", "assign", "update", "track"],
  product: ["create", "update", "delete"],
  delivery: ["assign", "update_status"],
});

export const STORE_OWNER = ac.newRole({
  store: ["create", "update"],
  order: ["view", "update"],
  product: ["create", "update", "delete"],
});

export const DRIVER = ac.newRole({
  delivery: ["update_status"],
  order: ["view", "track"],
});

export const CUSTOMER = ac.newRole({
  customer: ["place_order", "track_delivery"],
});
