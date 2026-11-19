
const RECIPIENT_EMAIL = "elvismoyo400@gmail.com";

const MAX_REQUEST_BYTES = 24_000;
const MAX_MESSAGE_LENGTH = 5_000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeSingleLine(value: unknown): string {
  return typeof value === "string"
    ? value.replace(/\s+/g, " ").trim()
    : "";
}

function badRequest(message: string, status = 400) {
  return Response.json({ message }, { status });
}

export async function POST(request: Request) {
  // Check content type
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().startsWith("application/json")) {
    return badRequest("Send the contact form as JSON.", 415);
  }

  // Check request size
  const contentLength = Number(
    request.headers.get("content-length")
  );

  if (
    Number.isFinite(contentLength) &&
    contentLength > MAX_REQUEST_BYTES
  ) {
    return badRequest("Your message is too large.", 413);
  }

  // Parse JSON payload
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return badRequest("The submitted message wasn't valid JSON.");
  }

  if (!isRecord(payload)) {
    return badRequest("The submitted message is incomplete.");
  }

  // Extract and normalize form fields
  const firstName = normalizeSingleLine(payload.firstName);
  const lastName = normalizeSingleLine(payload.lastName);
  const email = normalizeSingleLine(payload.email);
  const phone = normalizeSingleLine(payload.phone);

  const message =
    typeof payload.message === "string"
      ? payload.message.trim()
      : "";

  const website = normalizeSingleLine(payload.website);

  // Validate optional fields
  if (
    (payload.phone !== undefined &&
      typeof payload.phone !== "string") ||
    (payload.website !== undefined &&
      typeof payload.website !== "string")
  ) {
    return badRequest("Check the form fields and try again.");
  }

  // Honeypot spam protection
  if (website) {
    return badRequest(
      "The contact form submission was rejected."
    );
  }

  // Validate required fields
  if (
    !firstName ||
    firstName.length > 80 ||
    !lastName ||
    lastName.length > 80 ||
    !EMAIL_PATTERN.test(email) ||
    email.length > 254 ||
    phone.length > 60 ||
    !message ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return badRequest(
      "Check the form fields and try again."
    );
  }

  // Read Resend environment variables
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.error(
      "Contact email is not configured. Check your environment variables."
    );

    return Response.json(
      {
        message:
          "Email delivery isn't configured yet. Please email elvismoyo400@gmail.com directly.",
      },
      { status: 503 }
    );
  }

  // Construct email content
  const text = [
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    phone ? `Contact number: ${phone}` : "",
    "",
    "Message:",
    message,
  ]
    .filter((line) => line !== "")
    .join("\n");

  // Send email through Resend
  let providerResponse: Response;

  try {
    providerResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [RECIPIENT_EMAIL],
          reply_to: email,
          subject: `Portfolio message from ${firstName} ${lastName}`,
          text,
        }),
      }
    );
  } catch (error) {
    console.error(
      "The contact email provider request failed.",
      error
    );

    return Response.json(
      {
        message:
          "Your message couldn't be delivered. Please email elvismoyo400@gmail.com directly.",
      },
      { status: 502 }
    );
  }

  // Handle Resend errors
  if (!providerResponse.ok) {
    const errorDetails = await providerResponse
      .json()
      .catch(() => null);

    console.error(
      "Resend rejected the message:",
      {
        status: providerResponse.status,
        details: errorDetails,
      }
    );

    return Response.json(
      {
        message:
          "Your message couldn't be delivered. Please email elvismoyo400@gmail.com directly.",
      },
      { status: 502 }
    );
  }

  // Successful response
  return Response.json({
    message: "Your message has been sent.",
  });
}
