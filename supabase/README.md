# Supabase project config

## `send-registration-email` Edge Function

Sends the BossCode registration confirmation email via Brevo. Triggered by
the client (`web/src/lib/registrations.js` → `sendRegistrationEmail`) right
after a registration insert succeeds; failures are logged, never shown to the
user or allowed to flip the success state back to an error.

It takes a `registrationId`, re-reads `full_name` / `email` / `package` from
the `registrations` table itself using the service role key (available to
every Edge Function automatically as `SUPABASE_SERVICE_ROLE_KEY`) rather than
trusting whatever the client sends — so the endpoint can't be used to email
arbitrary addresses through the project's Brevo account, only to (re-)send a
confirmation for a registration that already exists.

### Deploy

This sandbox has no Supabase CLI and no network access to your project, so
this hasn't been deployed — run it yourself:

```
supabase link --project-ref yqxitjwdbdmhiedxdlfe
supabase secrets set BREVO_API_KEY=...   # already done, per your last message
supabase functions deploy send-registration-email
```

`supabase/config.toml` sets `verify_jwt = false` for this function, since it's
called by anonymous site visitors (not a signed-in session) right after they
submit the public registration form. If you already keep a `config.toml` for
this project elsewhere, merge that `[functions.send-registration-email]`
section into it instead of using this file standalone.

### Sender address

Sender is currently `buithuyluc123@gmail.com` / "Vinalink Academy", per your
instruction. As you noted, sending through Brevo from a personal Gmail
address (no SPF/DKIM alignment with gmail.com) risks landing in spam or being
rejected outright — switch `SENDER_EMAIL` in
`functions/send-registration-email/index.ts` to `info@vinalink.vn` once that
domain is verified in Brevo, then redeploy.
