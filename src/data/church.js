// Every fact the site shows lives here, so updates happen in one place.
// Items marked "CONFIRM" are placeholders or best guesses for the church office to check.

export const LOGO_URL =
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/352eb567e_image.png";

export const church = {
  name: "House of Prayer Church",
  shortName: "House of Prayer",
  tagline: "A church of all nations, going to all the nations.",
  denomination: "Assemblies of God",
  city: "Waterbury, Connecticut",
  phone: "(203) 753-8023",
  phoneHref: "tel:+12037538023",
  email: "churchoffice@houseofprayer.org",
  officeHours: "Tuesday to Thursday, 9:00 AM to 4:00 PM",
  mainAddress: { line1: "1245 Thomaston Avenue", line2: "Waterbury, CT 06704" },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=1245+Thomaston+Avenue+Waterbury+CT+06704",
  mapEmbed: "https://www.google.com/maps?q=1245+Thomaston+Avenue,+Waterbury,+CT+06704&output=embed",
  services: [
    { day: "Sunday", time: "9:00 AM", name: "First Service", note: "Also streamed live" },
    { day: "Sunday", time: "11:00 AM", name: "Second Service" },
  ],
  social: {
    youtube: "https://www.youtube.com/@houseofprayerchurch1263",
    facebook: "https://www.facebook.com/houseofprayerct/",
    instagram: "https://www.instagram.com/houseofprayerchurch_/",
  },
  worshipSite: "https://hopworship.com",
  // CONFIRM: the church's online giving link (the current site has none).
  givingUrl: "",
  // Optional: a form service URL (e.g. Formspree) that receives visit and contact forms.
  // While empty, forms open a pre-filled email to the church office instead.
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || "",
};

export const buildings = [
  { name: "Main Church", address: "1245 Thomaston Avenue", use: "Sunday services" },
  { name: "Church Office (mailing)", address: "1263 Thomaston Avenue", use: "Mailing address: Waterbury, CT 06704" },
  { name: "Lighthouse Childcare", address: "1333 Thomaston Avenue, front building", use: "Weekday childcare" },
  { name: "Bread of Life Food Pantry", address: "1333 Thomaston Avenue, front building", use: "Free groceries for families" },
  { name: "Family Life Center", address: "1333 Thomaston Avenue, rear building", use: "Events and gatherings" },
];

export const coreValues = [
  { title: "Prayer", text: "Our goal is 24/7/365 prayer in our prayer center." },
  { title: "The Word of God", text: "The Bible is God's inspired Word and the foundation for how we live." },
  { title: "The Holy Spirit", text: "We stay open to the Spirit's leading in our worship and our lives." },
  { title: "Worship", text: "We gather to honor God with our whole hearts." },
  { title: "Fellowship", text: "We do life together as one family from many nations." },
  { title: "Discipleship", text: "We help each other grow, one next step at a time." },
  { title: "Evangelism", text: "We share the hope of Jesus across Waterbury and beyond." },
];

export const beliefs = [
  { title: "Scripture", text: "The Bible is inspired by God and is our final authority." },
  { title: "God", text: "There is one God, eternally existing as Father, Son and Holy Spirit." },
  { title: "Jesus", text: "Jesus is fully God and fully human, and through Him we are restored to God." },
  { title: "The Holy Spirit", text: "The baptism in the Holy Spirit empowers believers to live and witness for Christ." },
  { title: "The Church", text: "The Church is the Body of Christ, made up of everyone who has trusted in Him." },
  { title: "Healing and hope", text: "God still heals today, and Jesus will return for His people." },
];

export const leaders = [
  { name: "Rev. James Lilley", role: "Senior Pastor", note: "Serving Waterbury since 1998" },
  { name: "Verna Lilley", role: "Pastor", note: "Serving Waterbury since 1998" }, // CONFIRM title
];

// CONFIRM: add or update events here. Dates are YYYY-MM-DD.
export const events = [
  {
    date: "2026-12-20",
    title: "Christmas Sunday",
    time: "9:00 AM and 11:00 AM",
    text: "Celebrate the birth of Jesus with us, featuring the HOP Choir.",
  },
];

export const weekly = [
  { day: "Sunday", time: "9:00 AM", title: "First Service" },
  { day: "Sunday", time: "11:00 AM", title: "Second Service" },
];

export const history = [
  { year: "1979", text: "Rev. Coleman and Nancy Barlow open First Assembly of God in Waterbury on Father's Day." },
  { year: "1987", text: "The church holds its first service in its Thomaston Avenue building." },
  { year: "1998", text: "Rev. James and Verna Lilley arrive and begin leading the church." },
  { year: "2018", text: "First Assembly of God becomes House of Prayer Church." },
  { year: "2020", text: "Alpha Ministries opens, helping men and women find freedom from addiction." },
];

const OLD = "https://houseofprayer.org";
export const ministries = [
  { name: "Prayer", text: "Prayer is at the center of everything we do. Join us in the prayer center or send us a request.", link: `${OLD}/prayer/` },
  { name: "Worship", text: "Our vocalists, musicians and production team lead us into God's presence every Sunday.", link: "https://hopworship.com" },
  { name: "Men's Ministry", text: "Men growing in faith, friendship and leadership at home and in the community.", link: `${OLD}/mens-ministry/` },
  { name: "Women's Ministry", text: "Women encouraging one another through Bible study, prayer and fellowship.", link: `${OLD}/womens-ministry/` },
  { name: "Family", text: "Helping families build homes centered on Christ.", link: `${OLD}/family/` },
  { name: "Singles Ministry", text: "Community and connection for singles in every season of life.", link: `${OLD}/singles-ministry/` },
  { name: "Equipping", text: "Classes and training that help you grow and discover how God made you to serve.", link: `${OLD}/equipping/` },
  { name: "Missions", text: "Supporting the work of the Gospel across the nations.", link: `${OLD}/missions/` },
  { name: "Alpha Ministries", text: "A Christ-centered discipleship home helping men and women find freedom from addiction.", link: `${OLD}/alpha-ministries/` },
  { name: "Bread of Life", text: "Our food pantry provides free groceries to families in need across Waterbury.", link: "" },
];

export const nav = [
  { label: "Plan Your Visit", to: "/plan-your-visit" },
  { label: "About", to: "/about" },
  { label: "Ministries", to: "/ministries" },
  { label: "Watch", to: "/watch" },
  { label: "Events", to: "/events" },
  { label: "Give", to: "/give" },
  { label: "Contact", to: "/contact" },
];
