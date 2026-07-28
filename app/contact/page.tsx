"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import emailjs from "@emailjs/browser";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CursorGlow from "@/components/cursorGlow";
import { socialLinks } from "@/lib/data";
import {
  Github,
  Twitter,
  Linkedin,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "/github.png": <Github size={22} />,
  "/x.png": <Twitter size={22} />,
  "/linked-in.png": <Linkedin size={22} />,
};

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-animate",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    if (!name || !email || !message) {
      setError("Don't leave me hanging! Every input is needed.");
      return;
    }

    try {
      setLoading(true);
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        { name, email, message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      );
      setSuccess("Thank you! I'll get back to you soon!");
      form.reset();
    } catch (err) {
      console.error(err);
      setError("Connection glitch. Give it another shot?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex bg-black flex-col">
      <CursorGlow />
      <Header />

      <div
        ref={sectionRef}
        className="relative w-full max-w-[1300px] mx-auto px-6 md:px-12 pt-28 pb-16 flex-1"
      >
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-between">
          
          {/* LEFT */}
          <div className="contact-animate flex flex-col items-center justify-center text-center md:items-start md:text-left md:w-[40%] md:pt-12">

            <p className="text-[rgb(var(--gold))] text-sm font-mono uppercase tracking-widest mb-2">
              Get in touch
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Let&apos;s work{" "}
              <span className="text-[rgb(var(--gold))] glowing-text">
                together
              </span>
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-white/40 max-w-sm">
              Have a project in mind or just want to say hello? I&apos;m always open
              to discussing new opportunities, collaborations, or simply sharing ideas.
            </p>

            <div className="flex items-center gap-4 mt-8">
              {socialLinks.map((icon) => (
                <a
                  key={icon.alt}
                  href={icon.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-[rgba(var(--gold),0.25)] 
                             bg-[rgba(var(--gold),0.08)]
                             hover:bg-[rgba(var(--gold),0.15)]
                             hover:border-[rgba(var(--gold),0.4)]
                             hover:scale-110 transition-all duration-300
                             text-white/60 hover:text-[rgb(var(--gold))]"
                  aria-label={icon.alt}
                >
                  {iconMap[icon.src]}
                </a>
              ))}
            </div>
          </div>

          {/* FORM (UNCHANGED STRUCTURE - SAFE) */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-animate contact-glow flex w-full flex-col gap-5 rounded-2xl md:w-[55%]"
          >
            <div className="space-y-1">
              <label className="text-xs text-white/40 uppercase tracking-wider ml-1">
                Name
              </label>
              <input name="name" type="text" placeholder="John Doe" className="contact-input" />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/40 uppercase tracking-wider ml-1">
                Email
              </label>
              <input name="email" type="email" placeholder="john@example.com" className="contact-input" />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/40 uppercase tracking-wider ml-1">
                Message
              </label>
              <textarea name="message" placeholder="Tell me about your project..." className="contact-input min-h-[140px] resize-none" />
            </div>

            {success && (
              <div className="flex items-center gap-2 text-[rgb(var(--gold))] text-sm font-medium p-3 rounded-lg bg-[rgba(var(--gold),0.1)] border border-[rgba(var(--gold),0.25)]">
                <CheckCircle size={16} />
                {success}
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm font-medium p-3 rounded-lg bg-red-400/10 border border-red-400/20">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="mt-2 flex flex-col items-center gap-6">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full md:w-[220px] items-center justify-center gap-2 rounded-full 
                           border border-[rgba(var(--gold),0.4)]
                           bg-[rgba(var(--gold),0.1)]
                           px-6 py-3 text-[15px] 
                           transition-all duration-300 
                           hover:bg-[rgba(var(--gold),0.2)]
                           hover:shadow-[0_0_20px_rgba(212,169,77,0.25)]
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}