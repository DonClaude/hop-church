import { Button } from "../components/ui";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-24 text-center">
      <div>
        <p className="text-[11px] font-bold tracking-[0.2em] text-brand mb-4">PAGE NOT FOUND</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">This page wandered off.</h1>
        <Button to="/" arrow>Back to home</Button>
      </div>
    </section>
  );
}
