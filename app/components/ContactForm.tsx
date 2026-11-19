"use client";

import { useState, type FormEvent } from "react";

function getResponseMessage(response: unknown) {
  if (
    typeof response === "object" &&
    response !== null &&
    "message" in response &&
    typeof response.message === "string"
  ) {
    return response.message;
  }

  return null;
}

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: String(formData.get("firstName") ?? ""),
          lastName: String(formData.get("lastName") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          message: String(formData.get("message") ?? ""),
          website: String(formData.get("website") ?? ""),
        }),
      });
      const result: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        setStatus(
          getResponseMessage(result) ??
            "Your message couldn't be sent. Please try again or email me directly.",
        );
        return;
      }

      setStatus(getResponseMessage(result) ?? "Your message has been sent.");
      form.reset();
    } catch {
      setStatus(
        "Unable to send your message. Check your connection and try again, or email me directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div aria-hidden="true" className="contact-honeypot">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          autoComplete="off"
          id="contact-website"
          name="website"
          tabIndex={-1}
        />
      </div>
      <div className="contact-form-fields">
        <label className="contact-field" htmlFor="contact-first-name">
          <span>First name</span>
          <input
            autoComplete="given-name"
            id="contact-first-name"
            name="firstName"
            placeholder="Enter your first name"
            required
          />
        </label>
        <label className="contact-field" htmlFor="contact-last-name">
          <span>Last name</span>
          <input
            autoComplete="family-name"
            id="contact-last-name"
            name="lastName"
            placeholder="Enter your last name"
            required
          />
        </label>
        <label className="contact-field" htmlFor="contact-email">
          <span>Email</span>
          <input
            autoComplete="email"
            id="contact-email"
            name="email"
            placeholder="Enter your email"
            required
            type="email"
          />
        </label>
        <label className="contact-field" htmlFor="contact-phone">
          <span>
            Contact details <span className="contact-optional">(optional)</span>
          </span>
          <input
            autoComplete="tel"
            id="contact-phone"
            name="phone"
            placeholder="Enter your phone number"
            type="tel"
          />
        </label>
        <label
          className="contact-field contact-field-message"
          htmlFor="contact-message"
        >
          <span>Message</span>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Tell me about your project, opportunity, or question"
            required
            rows={5}
          />
        </label>
      </div>
      <div className="contact-form-actions">
        <p className="contact-form-status" role="status">
          {status}
        </p>
        <button
          className="button button-primary contact-submit"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Send a message"}
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M8 3l5 5-5 5" />
          </svg>
        </button>
      </div>
    </form>
  );
}
