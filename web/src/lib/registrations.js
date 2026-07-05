import { supabase } from "./supabaseClient";

export const TICKET_LIMITS = { Gold: 10, Silver: 90 };

// The `registrations.package` column has a CHECK constraint that only
// accepts these three lowercase values — display labels elsewhere stay
// "Gold" / "Silver" / "Super VIP", only what's sent to/read from Supabase
// uses this mapping.
const PACKAGE_DB_VALUES = {
  Gold: "gold",
  Silver: "silver",
  "Super VIP": "super_vip",
};

function toDbPackageValue(packageName) {
  const value = PACKAGE_DB_VALUES[packageName];
  if (!value) throw new Error(`Unknown package: ${packageName}`);
  return value;
}

export async function fetchTicketCounts() {
  // anon has no SELECT grant on registrations (it would leak every
  // applicant's name/email/phone to anyone with the publishable key), so
  // counts come from a SECURITY DEFINER RPC that only ever returns
  // aggregated { package, taken } rows, grouped by the lowercase DB values.
  const { data, error } = await supabase.rpc("get_ticket_counts");
  if (error) throw error;

  const taken = Object.fromEntries(
    (data ?? []).map((row) => [row.package, row.taken])
  );

  return {
    goldLeft: Math.max(
      0,
      TICKET_LIMITS.Gold - (taken[PACKAGE_DB_VALUES.Gold] ?? 0)
    ),
    silverLeft: Math.max(
      0,
      TICKET_LIMITS.Silver - (taken[PACKAGE_DB_VALUES.Silver] ?? 0)
    ),
  };
}

export async function submitRegistration({
  fullName,
  email,
  phone,
  position,
  packageName,
}) {
  // Client-generated id: anon has no SELECT grant on registrations, so we
  // can't chain .select() to read the row back after insert (that upgrades
  // the request to `Prefer: return=representation`, which RLS then rejects
  // as a read). Supplying the id ourselves means we already know it without
  // reading anything back — insert stays a plain write (`return=minimal`).
  const id = crypto.randomUUID();

  const { error } = await supabase.from("registrations").insert({
    id,
    full_name: fullName,
    email,
    phone,
    position,
    package: toDbPackageValue(packageName),
  });

  if (error) throw error;
  return { id };
}

// Fire-and-forget: a failed confirmation email should never block the
// "registered successfully" UI the user already sees after the insert above.
export function sendRegistrationEmail(registrationId) {
  supabase.functions
    .invoke("send-registration-email", { body: { registrationId } })
    .then(({ error }) => {
      if (error) console.error("send-registration-email failed:", error);
    })
    .catch((err) => console.error("send-registration-email failed:", err));
}
