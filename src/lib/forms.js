import { church } from "../data/church";

// Sends a form to the configured form service. Until one is set up,
// it opens the visitor's email app with the details filled in, addressed to the church office.
export async function sendForm(subject, fields) {
  if (church.formEndpoint) {
    const res = await fetch(church.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: subject, ...fields }),
    });
    if (!res.ok) throw new Error("The form could not be sent. Please call or email the church office.");
    return "sent";
  }
  const body = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  window.location.href = `mailto:${church.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return "email";
}
