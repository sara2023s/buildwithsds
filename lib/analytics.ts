"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackContactFormSubmission(planInterest?: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "generate_lead", {
    event_category: "engagement",
    event_label: "contact_form_submit",
    value: 1,
    plan_interest: planInterest || "not_specified",
  });
}
