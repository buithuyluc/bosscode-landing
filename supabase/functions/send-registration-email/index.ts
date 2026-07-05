// Supabase Edge Function: send-registration-email
//
// Called by the client (via supabase.functions.invoke) right after a
// registration row is inserted. Re-reads the row server-side with the
// service role key — rather than trusting client-supplied name/email/package
// — so this endpoint can't be used to blast arbitrary email addresses
// through the project's Brevo account; it can only re-send the confirmation
// for a registration that genuinely exists.
//
// After the student confirmation email sends successfully, it also fires an
// internal lead-notification email to the admin inbox. That second send is
// best-effort: a failure there is only logged and never changes the
// response the client sees for the (already-successful) student email.
//
// Deploy: supabase functions deploy send-registration-email
// Requires secret: supabase secrets set BREVO_API_KEY=...

import { createClient } from "jsr:@supabase/supabase-js@2";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const SENDER_EMAIL = "buithuyluc123@gmail.com";
const SENDER_NAME = "Vinalink Academy";
const ADMIN_EMAIL = "buithuyluc123@gmail.com";
const HOTLINE = "0353262236";
const ZALO_GROUP_URL = "https://zalo.me/g/i628ekksahnd7uck3es5";

const PACKAGE_LABELS: Record<string, string> = {
  gold: "Gold",
  silver: "Silver",
  super_vip: "Super VIP",
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function packageLabel(value: string) {
  return PACKAGE_LABELS[value] ?? value;
}

async function sendBrevoEmail(
  brevoKey: string,
  payload: Record<string, unknown>
) {
  const res = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "api-key": brevoKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Brevo ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

function emailShell(bodyHtml: string) {
  return `
  <div style="font-family:'Be Vietnam Pro',Arial,sans-serif;max-width:560px;margin:0 auto;color:#111132">
    <div style="background:#0B0B5C;padding:28px 32px">
      <span style="font-family:Archivo,Arial,sans-serif;font-weight:800;font-size:22px;color:#ffffff;letter-spacing:-0.01em">
        BOSS<span style="color:#D32E36">CODE</span>
      </span>
    </div>
    <div style="padding:32px;background:#ffffff">
      ${bodyHtml}
    </div>
    <div style="padding:20px 32px;background:#F4F4F8;border-top:1px solid #e6e6ee">
      <p style="font-size:12.5px;color:#8a8aa5;margin:0">Vinalink Academy — Đào tạo &amp; tư vấn chuyển đổi số, AI và Digital Marketing.</p>
    </div>
  </div>`;
}

function buildStudentEmailHtml(fullName: string, packageValue: string) {
  const name = escapeHtml(fullName);
  const pkg = escapeHtml(packageLabel(packageValue));
  return emailShell(`
      <h1 style="font-size:20px;margin:0 0 16px;color:#0B0B5C">Xin chào ${name},</h1>
      <p style="font-size:15px;line-height:1.6;margin:0 0 16px">
        Cảm ơn bạn đã đăng ký khoá học <strong>BossCode</strong> của Vinalink Academy.
        Chúng tôi đã ghi nhận đăng ký của bạn với gói:
      </p>
      <div style="background:#F4F4F8;border-left:4px solid #D32E36;padding:14px 18px;font-weight:700;font-size:16px;margin:0 0 20px;color:#0B0B5C">
        ${pkg}
      </div>
      <p style="font-size:15px;line-height:1.6;margin:0 0 24px">
        Đội ngũ Vinalink sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận vé.
        Nếu cần hỗ trợ ngay, vui lòng gọi hotline <strong>${HOTLINE}</strong>.
      </p>
      <p style="font-size:15px;line-height:1.6;margin:0 0 14px">
        Tham gia nhóm Zalo khai giảng để cập nhật thông tin lớp học:
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px">
        <tr>
          <td style="border-radius:8px;background:#D32E36">
            <a href="${ZALO_GROUP_URL}" target="_blank" rel="noopener"
               style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px">
              Click tại đây
            </a>
          </td>
        </tr>
      </table>
      <p style="font-size:15px;line-height:1.6;margin:0">
        Trân trọng,<br>Đội ngũ Vinalink Academy
      </p>`);
}

function buildAdminEmailHtml(lead: {
  full_name: string;
  email: string;
  phone: string;
  position: string;
  package: string;
}) {
  const row = (label: string, value: string) => `
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#8a8aa5;width:140px;vertical-align:top">${escapeHtml(label)}</td>
        <td style="padding:8px 0;font-size:15px;color:#111132;font-weight:600">${escapeHtml(value)}</td>
      </tr>`;
  return emailShell(`
      <h1 style="font-size:18px;margin:0 0 18px;color:#0B0B5C">Lead mới đăng ký BossCode</h1>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse">
        ${row("Họ và tên", lead.full_name)}
        ${row("Email", lead.email)}
        ${row("Số điện thoại", lead.phone)}
        ${row("Chức vụ", lead.position)}
        ${row("Gói đã chọn", packageLabel(lead.package))}
      </table>`);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  let registrationId: string | undefined;
  try {
    const body = await req.json();
    registrationId = body?.registrationId;
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  if (!registrationId) {
    return jsonResponse({ error: "Missing registrationId" }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const brevoKey = Deno.env.get("BREVO_API_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY env vars");
    return jsonResponse({ error: "Server misconfigured" }, 500);
  }
  if (!brevoKey) {
    console.error("Missing BREVO_API_KEY secret");
    return jsonResponse({ error: "Server misconfigured" }, 500);
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

  const { data: registration, error: fetchError } = await supabaseAdmin
    .from("registrations")
    .select("full_name, email, phone, position, package")
    .eq("id", registrationId)
    .single();

  if (fetchError || !registration) {
    console.error("Registration not found:", registrationId, fetchError);
    return jsonResponse({ error: "Registration not found" }, 404);
  }

  const { full_name, email, phone, position, package: packageValue } =
    registration;

  let studentSend;
  try {
    studentSend = await sendBrevoEmail(brevoKey, {
      sender: { email: SENDER_EMAIL, name: SENDER_NAME },
      to: [{ email, name: full_name }],
      subject: "Xác nhận đăng ký khoá học BossCode — Vinalink Academy",
      htmlContent: buildStudentEmailHtml(full_name, packageValue),
    });
  } catch (err) {
    console.error("Student confirmation email failed:", err);
    return jsonResponse({ error: "Brevo send failed", detail: String(err) }, 502);
  }

  // Best-effort admin lead notification — never affects the response above.
  try {
    await sendBrevoEmail(brevoKey, {
      sender: { email: SENDER_EMAIL, name: SENDER_NAME },
      to: [{ email: ADMIN_EMAIL }],
      subject: "Lead mới đăng ký BossCode",
      htmlContent: buildAdminEmailHtml({
        full_name,
        email,
        phone,
        position,
        package: packageValue,
      }),
    });
  } catch (err) {
    console.error("Admin lead notification email failed:", err);
  }

  return jsonResponse({ ok: true, messageId: studentSend.messageId });
});
