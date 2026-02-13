import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

async function signRequest(
  method: string,
  url: URL,
  headers: Record<string, string>,
  body: Uint8Array | null,
  accessKeyId: string,
  secretAccessKey: string,
) {
  // AWS Signature V4 for R2
  const region = "auto";
  const service = "s3";
  const now = new Date();
  const dateStamp = now.toISOString().replace(/[-:]/g, "").slice(0, 8);
  const amzDate = now.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");

  // Hash payload
  const payloadHash = body
    ? Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", body)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    : "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

  headers["x-amz-date"] = amzDate;
  headers["x-amz-content-sha256"] = payloadHash;
  headers["host"] = url.hostname;

  // Canonical request
  const signedHeaderKeys = Object.keys(headers)
    .map((k) => k.toLowerCase())
    .sort();
  const signedHeaders = signedHeaderKeys.join(";");
  const canonicalHeaders = signedHeaderKeys
    .map((k) => `${k}:${headers[k.toLowerCase()] || headers[k]}`)
    .join("\n") + "\n";

  const canonicalRequest = [
    method,
    url.pathname,
    url.search.replace("?", ""),
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;

  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(canonicalRequest),
        ),
      ),
    )
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""),
  ].join("\n");

  // Signing key
  const enc = new TextEncoder();
  const hmac = async (key: ArrayBuffer | Uint8Array, data: string) => {
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      key,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    return await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(data));
  };

  const kDate = await hmac(enc.encode("AWS4" + secretAccessKey), dateStamp);
  const kRegion = await hmac(kDate, region);
  const kService = await hmac(kRegion, service);
  const kSigning = await hmac(kService, "aws4_request");

  const signature = Array.from(
    new Uint8Array(await hmac(kSigning, stringToSign)),
  )
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  headers["authorization"] =
    `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return headers;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Auth check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } =
      await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = claimsData.claims.sub;

    const R2_ACCESS_KEY_ID = Deno.env.get("R2_ACCESS_KEY_ID")!;
    const R2_SECRET_ACCESS_KEY = Deno.env.get("R2_SECRET_ACCESS_KEY")!;
    const R2_ACCOUNT_ID = Deno.env.get("R2_ACCOUNT_ID")!;
    const R2_PUBLIC_URL = Deno.env.get("R2_PUBLIC_URL")!;
    const BUCKET = "newsletter-images";

    if (req.method === "POST") {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const folder = (formData.get("folder") as string) || "images";

      if (!file) {
        return new Response(JSON.stringify({ error: "No file provided" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
        return new Response(
          JSON.stringify({ error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF, SVG" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      if (file.size > MAX_SIZE) {
        return new Response(
          JSON.stringify({ error: "File too large. Max 10MB." }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      const ext = file.name.split(".").pop() || "png";
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
      const key = `${folder}/${fileName}`;

      const fileBytes = new Uint8Array(await file.arrayBuffer());

      const r2Url = new URL(
        `/${BUCKET}/${key}`,
        `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      );

      const headers: Record<string, string> = {
        "content-type": file.type,
        "content-length": fileBytes.length.toString(),
      };

      const signedHeaders = await signRequest(
        "PUT",
        r2Url,
        headers,
        fileBytes,
        R2_ACCESS_KEY_ID,
        R2_SECRET_ACCESS_KEY,
      );

      const r2Response = await fetch(r2Url.toString(), {
        method: "PUT",
        headers: signedHeaders,
        body: fileBytes,
      });

      if (!r2Response.ok) {
        const errText = await r2Response.text();
        console.error("R2 upload error:", errText);
        return new Response(
          JSON.stringify({ error: "Failed to upload to storage" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      // Public URL - ensure no double slash
      const publicUrl = `${R2_PUBLIC_URL.replace(/\/$/, "")}/${key}`;

      return new Response(
        JSON.stringify({
          url: publicUrl,
          path: key,
          fileName,
          originalName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          userId,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (req.method === "DELETE") {
      const { path } = await req.json();
      if (!path) {
        return new Response(JSON.stringify({ error: "No path provided" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const r2Url = new URL(
        `/${BUCKET}/${path}`,
        `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      );

      const headers: Record<string, string> = {};
      const signedHeaders = await signRequest(
        "DELETE",
        r2Url,
        headers,
        null,
        R2_ACCESS_KEY_ID,
        R2_SECRET_ACCESS_KEY,
      );

      const r2Response = await fetch(r2Url.toString(), {
        method: "DELETE",
        headers: signedHeaders,
      });

      if (!r2Response.ok) {
        const errText = await r2Response.text();
        console.error("R2 delete error:", errText);
        return new Response(
          JSON.stringify({ error: "Failed to delete from storage" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
