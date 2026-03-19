// @ts-nocheck
"use client";

import content from "../data/content.json";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Phone, MapPin, Mail, Clock, Star, Wrench, Scissors, Car, Sparkles,
  Shield, Heart, Calendar, Users, Award, ArrowRight, Menu, X,
  Instagram, Facebook, ExternalLink, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

/* ─── Types ─── */
type ContentType = typeof content & {
  gallery?: { heading?: string; subheading?: string; images?: { url: string; alt: string }[] };
  social?: Record<string, string>;
  reviews?: { name: string; rating: number; text: string; timeAgo?: string }[];
};
const c = content as ContentType;

/* ─── Icon Map ─── */
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  wrench: Wrench, scissors: Scissors, car: Car, sparkles: Sparkles,
  shield: Shield, heart: Heart, calendar: Calendar, users: Users,
  award: Award, phone: Phone, star: Star, clock: Clock,
};

/* ─── Scroll Animation Hook ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Social Icon ─── */
function SocialLink({ platform, url }: { platform: string; url: string }) {
  if (!url) return null;
  const icon: Record<string, React.ReactNode> = {
    instagram: <Instagram className="size-4" />,
    facebook: <Facebook className="size-4" />,
    yelp: <span className="text-xs font-bold leading-none">Y!</span>,
    tiktok: <span className="text-xs font-bold leading-none">TT</span>,
  };
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={platform}
      className="size-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10 transition-all duration-200 cursor-pointer">
      {icon[platform] || <ExternalLink className="size-4" />}
    </a>
  );
}

/* ─── Gallery Carousel ─── */
function Gallery() {
  const images = c.gallery?.images;
  if (!images?.length) return null;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--theme-accent)] mb-3">
            {c.gallery?.heading || "Gallery"}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            {c.gallery?.subheading || "See Our Work"}
          </h2>
        </Reveal>

        <Reveal>
          <div className="relative">
            <div ref={emblaRef} className="overflow-hidden rounded-2xl">
              <div className="flex gap-4">
                {images.map((img, i) => (
                  <div key={i} className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%] min-w-0">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-card">
                      <img src={img.url} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {images.length > 3 && (
              <div className="flex justify-center gap-3 mt-6">
                <button onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev}
                  className="size-10 rounded-full border border-border flex items-center justify-center hover:bg-card disabled:opacity-30 transition cursor-pointer">
                  <ChevronLeft className="size-5" />
                </button>
                <button onClick={() => emblaApi?.scrollNext()} disabled={!canNext}
                  className="size-10 rounded-full border border-border flex items-center justify-center hover:bg-card disabled:opacity-30 transition cursor-pointer">
                  <ChevronRight className="size-5" />
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const heroImg = (c.hero as Record<string, unknown>).backgroundImage as string | undefined;
  const aboutImg = (c.about as Record<string, unknown>).image as string | undefined;
  const secondaryCta = (c.hero as Record<string, unknown>).secondaryCtaText as string | undefined;
  const secondaryLink = (c.hero as Record<string, unknown>).secondaryCtaLink as string | undefined;

  const navLinks = ["About", "Services", ...(c.gallery?.images?.length ? ["Gallery"] : []), ...(c.reviews?.length ? ["Reviews"] : []), "Hours", "Contact"];

  return (
    <main className="overflow-x-hidden">

      {/* ━━━ NAV ━━━ */}
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-lg shadow-black/10" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="text-lg font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            <span className="text-[var(--theme-accent)]">{c.businessName.split(" ")[0]}</span>{" "}
            <span className="text-foreground">{c.businessName.split(" ").slice(1).join(" ")}</span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                {item}
              </a>
            ))}
            <a href={`tel:${c.contact.phone}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2 rounded-full transition-all hover:brightness-110 cursor-pointer"
              style={{ backgroundColor: "var(--theme-accent)" }}>
              <Phone className="size-4" /> Call Now
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-foreground cursor-pointer" aria-label="Menu">
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border px-6 py-5 space-y-4">
            {navLinks.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                className="block text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{item}</a>
            ))}
            <a href={`tel:${c.contact.phone}`}
              className="block text-center font-semibold text-white px-5 py-3 rounded-full cursor-pointer"
              style={{ backgroundColor: "var(--theme-accent)" }}>Call Now</a>
          </div>
        )}
      </nav>

      {/* ━━━ HERO ━━━ */}
      <section className="relative min-h-[100dvh] flex items-center px-4 sm:px-6 lg:px-8 pt-16">
        {/* Background */}
        {heroImg ? (
          <>
            <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-background" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-background" />
            <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(ellipse at 50% 30%, var(--theme-accent), transparent 60%)` }} />
          </>
        )}

        <div className="relative z-10 max-w-4xl mx-auto text-center w-full py-20">
          <div className="animate-[fadeIn_0.6s_ease_0.1s_both]">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm border-border text-foreground/80 backdrop-blur-sm">
              <Star className="size-3.5 text-yellow-400 fill-yellow-400 mr-1.5" />
              {c.tagline}
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 animate-[fadeInUp_0.7s_ease_0.2s_both]"
            style={{ fontFamily: "var(--font-heading)" }}>
            {c.hero.heading}
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10 animate-[fadeInUp_0.7s_ease_0.35s_both]">
            {c.hero.subheading}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_0.7s_ease_0.5s_both]">
            <a href={c.hero.ctaLink}
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-3.5 rounded-full text-base transition-all hover:brightness-110 hover:scale-[1.02] cursor-pointer shadow-lg"
              style={{ backgroundColor: "var(--theme-accent)" }}>
              {c.hero.ctaText} <ArrowRight className="size-4" />
            </a>
            {secondaryCta && secondaryLink && (
              <a href={secondaryLink}
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-3.5 rounded-full text-base border border-white/20 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm">
                {secondaryCta}
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-6 max-w-sm mx-auto animate-[fadeIn_0.7s_ease_0.65s_both]">
            {[
              { val: c.services.length + "+", label: "Services" },
              { val: "5.0", label: "Rating" },
              { val: "100%", label: "Satisfaction" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-bold" style={{ color: "var(--theme-accent)" }}>{s.val}</p>
                <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ABOUT ━━━ */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`grid ${aboutImg ? "lg:grid-cols-2" : "grid-cols-1 max-w-3xl mx-auto"} gap-12 lg:gap-16 items-center`}>
            <Reveal>
              <p className="text-sm font-semibold tracking-widest uppercase text-[var(--theme-accent)] mb-3">Our Story</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8" style={{ fontFamily: "var(--font-heading)" }}>
                {c.about.heading}
              </h2>
              {c.about.paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground text-base leading-relaxed mb-5">{p}</p>
              ))}
            </Reveal>

            {aboutImg && (
              <Reveal delay={0.15}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-card">
                  <img src={aboutImg} alt={c.businessName} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ━━━ SERVICES ━━━ */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/40">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-[var(--theme-accent)] mb-3">What We Do</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Our Services</h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.services.map((svc, i) => {
              const Icon = ICONS[svc.icon] || Sparkles;
              const price = (svc as Record<string, unknown>).price as string | undefined;
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <Card className="group bg-card hover:ring-[var(--theme-accent)]/30 transition-all duration-300 cursor-pointer h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="size-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "color-mix(in srgb, var(--theme-accent) 12%, transparent)" }}>
                          <Icon className="size-6" style={{ color: "var(--theme-accent)" }} />
                        </div>
                        {price && (
                          <span className="text-sm font-semibold text-[var(--theme-accent)]">{price}</span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>{svc.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{svc.description}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ GALLERY ━━━ */}
      <Gallery />

      {/* ━━━ REVIEWS ━━━ */}
      {c.reviews && c.reviews.length > 0 && (
        <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/40">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest uppercase text-[var(--theme-accent)] mb-3">Testimonials</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                What Our Customers Say
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-5">
              {c.reviews.map((r, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <Card className="h-full">
                    <CardContent className="pt-6 flex flex-col h-full">
                      <div className="flex gap-0.5 mb-4">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Star key={j} className="size-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground leading-relaxed italic flex-1 mb-6">
                        &ldquo;{r.text}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: "var(--theme-accent)" }}>
                          {r.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{r.name}</p>
                          {r.timeAgo && <p className="text-xs text-muted-foreground">{r.timeAgo}</p>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ HOURS ━━━ */}
      <section id="hours" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Hours Card */}
            <Reveal>
              <div>
                <p className="text-sm font-semibold tracking-widest uppercase text-[var(--theme-accent)] mb-3">Visit Us</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8" style={{ fontFamily: "var(--font-heading)" }}>Hours of Operation</h2>
                <Card>
                  <CardContent className="pt-4">
                    {Object.entries(c.contact.hours).map(([day, hrs], i, arr) => (
                      <div key={day} className={`flex justify-between items-center py-3.5 ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
                        <span className="text-sm font-medium text-foreground flex items-center gap-2.5">
                          <Clock className="size-3.5" style={{ color: "var(--theme-accent)" }} />
                          {day}
                        </span>
                        <span className="text-sm text-muted-foreground">{hrs}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </Reveal>

            {/* Contact Info */}
            <Reveal delay={0.1}>
              <div>
                <p className="text-sm font-semibold tracking-widest uppercase text-[var(--theme-accent)] mb-3">Get In Touch</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8" style={{ fontFamily: "var(--font-heading)" }}>Contact Us</h2>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: "Address", value: c.contact.address, href: `https://maps.google.com/?q=${c.contact.mapEmbedQuery}`, external: true },
                    { icon: Phone, label: "Phone", value: c.contact.phone, href: `tel:${c.contact.phone}` },
                    { icon: Mail, label: "Email", value: c.contact.email, href: `mailto:${c.contact.email}` },
                  ].map((item, i) => (
                    <a key={i} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-[var(--theme-accent)]/30 hover:bg-card transition-all cursor-pointer group">
                      <div className="size-11 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "color-mix(in srgb, var(--theme-accent) 12%, transparent)" }}>
                        <item.icon className="size-5" style={{ color: "var(--theme-accent)" }} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                        <p className="text-sm font-medium text-foreground group-hover:text-[var(--theme-accent)] transition-colors">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal className="mt-10">
            <div className="rounded-2xl overflow-hidden border border-border h-[320px]">
              <iframe
                width="100%" height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCrMkpaVV1d0GDQZTXjwOs9mzdwRGs2aro&q=${c.contact.mapEmbedQuery}`}
                title="Location"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl mx-auto">
          <div className="text-center rounded-3xl p-10 md:p-14 relative overflow-hidden" style={{ backgroundColor: "var(--theme-accent)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>Ready to Get Started?</h2>
              <p className="text-white/75 mb-8 max-w-md mx-auto">Contact us today and experience the difference.</p>
              <a href={`tel:${c.contact.phone}`}
                className="inline-flex items-center gap-2 bg-white font-semibold px-7 py-3.5 rounded-full text-base transition-all hover:scale-[1.02] cursor-pointer shadow-lg"
                style={{ color: "var(--theme-accent)" }}>
                <Phone className="size-4" /> {c.contact.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="border-t border-border py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-base font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{c.businessName}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{c.tagline}</p>
          </div>

          {c.social && (
            <div className="flex gap-2.5">
              {Object.entries(c.social).filter(([k, v]) => v && k !== "bookingUrl").map(([platform, url]) => (
                <SocialLink key={platform} platform={platform} url={url} />
              ))}
            </div>
          )}
        </div>

        <Separator className="my-6" />

        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {c.businessName}. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
