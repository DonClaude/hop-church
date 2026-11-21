export function formatDate(iso) {
  const d = new Date(iso + "T12:00:00");
  return {
    month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    day: d.getDate(),
    weekday: d.toLocaleString("en-US", { weekday: "long" }),
    long: d.toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
  };
}
