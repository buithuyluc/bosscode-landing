# BossCode Landing Page

React + Vite implementation of the BossCode landing page design
(`project/BossCode Landing.dc.html`), wired to a real Supabase backend.

## Setup

```
npm install
cp .env.example .env   # fill in your Supabase project URL + publishable key
npm run dev
```

## Supabase

`src/lib/supabaseClient.js` reads `VITE_SUPABASE_URL` and
`VITE_SUPABASE_PUBLISHABLE_KEY` from `.env`. Access control relies entirely on
Postgres Row Level Security — the publishable key is safe to ship in the
client bundle as long as RLS policies on `registrations` only allow the
intended operations (e.g. anonymous `insert`, no `select`/`update`/`delete`
from the client).

`src/lib/registrations.js` targets these confirmed columns on the
`registrations` table (verified against the live schema — `id`, `created_at`,
`assigned_sales_id`, `status` also exist for the Sales/Admin workflow but are
left NULL/default on insert from this form):

| column      | type | notes                                     |
| ----------- | ---- | ------------------------------------------ |
| `full_name` | text | Họ và tên                                  |
| `email`     | text |                                            |
| `phone`     | text | Số điện thoại                              |
| `position`  | text | Chức vụ (free text if "Khác" was chosen)   |
| `package`   | text | one of `Gold`, `Silver`, `Super VIP`       |

RLS on `registrations` has been confirmed to allow anonymous `insert` via the
publishable key, and `assigned_sales_id` / `status` are nullable/defaulted, so
the client only ever sends the five columns above.

Ticket counters on the pricing section (`useTicketCounts` /
`fetchTicketCounts`) are computed live as `limit - count(*) where package = …`
against `TICKET_LIMITS` (`Gold: 10`, `Silver: 90`) — no fake/random
decrementing. They refresh on page load and again right after a successful
registration insert.

## Confirmation email

After a successful insert, the client calls `sendRegistrationEmail(id)`
(`src/lib/registrations.js`), which invokes the `send-registration-email`
Supabase Edge Function (see `../supabase/README.md`) via
`supabase.functions.invoke`. It's fire-and-forget: a failed send is only
logged to the console, it never blocks or reverts the "registered
successfully" UI the user already sees.
