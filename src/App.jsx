import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PlanVisit from "./pages/PlanVisit";
import About from "./pages/About";
import Ministries from "./pages/Ministries";
import Watch from "./pages/Watch";
import Events from "./pages/Events";
import Give from "./pages/Give";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />
        <Route path="/plan-your-visit" element={<PlanVisit />} />
        <Route path="/about" element={<About />} />
        <Route path="/ministries" element={<Ministries />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/events" element={<Events />} />
        <Route path="/give" element={<Give />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
