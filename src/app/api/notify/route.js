import { dateFormatter } from "@/utils/date-formatter";
import { NextResponse } from "next/server";
import { userAgent } from "next/server"; // ← built-in helper

export async function GET(request) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        return NextResponse.json(
            { error: "Missing env vars" },
            { status: 500 },
        );
    }

    // ── IP & Location (Vercel-specific headers) ───────────────────────────────
    const forwarded = request.headers.get("x-forwarded-for") ?? "unknown";
    const clientIp = forwarded.split(",")[0].trim() || "unknown";

    const country = request.headers.get("x-vercel-ip-country") ?? "??";
    const countryName = request.headers.get("x-vercel-ip-country-region") ?? ""; // sometimes region name
    const city = request.headers.get("x-vercel-ip-city") ?? "unknown";
    const region = request.headers.get("x-vercel-ip-timezone") ?? "unknown"; // fallback

    // ── Device & UA parsing ───────────────────────────────────────────────────
    const uaInfo = userAgent(request);
    const deviceType = uaInfo.device.type || "unknown"; // mobile, tablet, desktop...
    const browser = uaInfo.browser.name || "unknown";
    const os = uaInfo.os.name || "unknown";

    const rawUa = request.headers.get("user-agent") || "unknown";

    // ── Other context ─────────────────────────────────────────────────────────
    const referer = request.headers.get("referer") || "direct / unknown";
    const now = new Date().toISOString();

    const text = `
🚀 INTERNMATCH | New Visitor

Raw Date & Time:     ${now}
Date:       ${dateFormatter(new Date())}
Time:       ${new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    })}
IP:       ${clientIp}
Location: ${city}, ${region} (${country}) ${countryName ? `(${countryName})` : ""}
Device:   ${deviceType}
Browser:  ${browser}
OS:       ${os}
UA:       ${rawUa.slice(0, 180)}${rawUa.length > 180 ? "..." : ""}   // truncated
Page:     ${referer}
  `.trim();

    try {
        const res = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`,
        );

        return res.ok
            ? NextResponse.json({ success: true })
            : NextResponse.json({ error: "Telegram failed" }, { status: 500 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
