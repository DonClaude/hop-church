import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "../components/ui";

export default function NotFound() {
  return (
    <section className="min-h-[80svh] flex items-end">
      <Container className="w-full pt-[160px] pb-20">
        <p className="text-[12px] font-bold uppercase tracking-[0.22em] mb-6 text-oxblood">Page not found</p>
        <h1 className="headline text-[64px] sm:text-[100px] lg:text-[132px]">This page <span className="accent text-oxblood">wandered off.</span></h1>
        <Link to="/" className="btn-red mt-10">Back to home <ArrowRight className="w-4 h-4" /></Link>
      </Container>
    </section>
  );
}
