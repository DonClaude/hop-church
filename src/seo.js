// Search and link-preview details for every page.
// When the site moves to its own domain (e.g. houseofprayer.org), change SITE_URL and redeploy.
export const SITE_URL = "https://hop-church.pages.dev";
export const SHARE_IMAGE = "/video/hero-poster.jpg";

const NAME = "House of Prayer Church";

export const pages = [
  {
    path: "/",
    title: `${NAME} | Waterbury, CT`,
    description:
      "A church for all nations in Waterbury, Connecticut. Join us Sundays at 9:00 and 11:15 AM at 1245 Thomaston Avenue. The 9:00 service streams live.",
  },
  {
    path: "/plan-your-visit",
    title: `Plan Your Visit | ${NAME}, Waterbury CT`,
    description:
      "New to House of Prayer? Sunday services are at 9:00 and 11:15 AM at 1245 Thomaston Avenue, Waterbury. See what to expect and let us know you're coming.",
  },
  {
    path: "/about",
    title: `About Us | ${NAME}, Waterbury CT`,
    description:
      "House of Prayer is an Assemblies of God church on Thomaston Avenue in Waterbury, founded in 1979 and led by Rev. James and Verna Lilley.",
  },
  {
    path: "/ministries",
    title: `Ministries | ${NAME}, Waterbury CT`,
    description:
      "Prayer, worship, men's and women's ministries, missions, Alpha Ministries and the Bread of Life food pantry. Find your place at House of Prayer.",
  },
  {
    path: "/watch",
    title: `Watch Online | ${NAME}, Waterbury CT`,
    description: "Watch House of Prayer Church live every Sunday at 9:00 AM, and catch up on past messages.",
  },
  {
    path: "/events",
    title: `Events | ${NAME}, Waterbury CT`,
    description: "What's coming up at House of Prayer Church in Waterbury, including Christmas Sunday and special services.",
  },
  {
    path: "/give",
    title: `Give | ${NAME}, Waterbury CT`,
    description: "Support the ministry of House of Prayer Church and its work in Waterbury, including the Bread of Life food pantry.",
  },
  {
    path: "/contact",
    title: `Contact Us | ${NAME}, Waterbury CT`,
    description:
      "Call the House of Prayer church office at (203) 753-8023, email churchoffice@houseofprayer.org, or visit us at 1245 Thomaston Avenue, Waterbury.",
  },
  {
    path: "/thank-you",
    title: `Thank You | ${NAME}`,
    description: "Thanks for getting in touch with House of Prayer Church.",
    noindex: true,
  },
];

export const notFound = {
  path: "/404",
  title: `Page Not Found | ${NAME}`,
  description: "Sorry, we couldn't find that page.",
  noindex: true,
};

export function metaFor(pathname) {
  const clean = pathname === "/index.html" ? "/" : pathname.replace(/\/+$/, "") || "/";
  return pages.find((p) => p.path === clean) || notFound;
}
