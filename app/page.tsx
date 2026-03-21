// @ts-nocheck
"use client";

import content from "../data/content.json";
import { MinimalNav } from "@/components/ui/minimal-nav";
import { HeroSimple } from "@/components/ui/hero-simple";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { StatsSection } from "@/components/ui/stats-section";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { CTABanner } from "@/components/ui/cta-banner";
import { HoursTable } from "@/components/ui/hours-table";
import { MapEmbed } from "@/components/ui/map-embed";
import { ContactSection } from "@/components/ui/contact-section";
import { FooterMinimal } from "@/components/ui/footer-minimal";
import { BlurFade } from "@/components/ui/blur-fade";
import { Spacer } from "@/components/ui/spacer";
import { Scissors, Sparkles, Heart, Users, Award, Shield } from "lucide-react";

const ICONS: Record&lt;string, React.ComponentType&lt;{ className?: string }&gt;&gt; = {
  scissors: Scissors,
  sparkles: Sparkles,
  heart: Heart,
  users: Users,
  award: Award,
  shield: Shield,
};

export default function Page() {
  return (
    &lt;main className="min-h-screen bg-background text-foreground"&gt;
      {/* Navigation */}
      &lt;MinimalNav
        logo={content.businessName}
        links={[
          { label: "Services", href: "#services" },
          { label: "About", href: "#about" },
          { label: "Reviews", href: "#reviews" },
          { label: "Hours", href: "#hours" },
          { label: "Contact", href: "#contact" },
        ]}
        ctaText="Call Now"
        ctaHref={`tel:${content.contact.phone.replace(/[^0-9]/g, "")}`}
      /&gt;

      {/* Hero */}
      &lt;HeroSimple
        heading={content.hero.heading}
        subheading={content.hero.subheading}
        ctaText={content.hero.ctaText}
        ctaHref={content.hero.ctaLink}
        align="center"
      /&gt;

      {/* Stats */}
      &lt;StatsSection
        stats={[
          { label: "Star Rating", value: 5, suffix: ".0" },
          { label: "Days a Week", value: 7 },
          { label: "Years of Craft", value: 10, suffix: "+" },
          { label: "Happy Clients", value: 500, suffix: "+" },
        ]}
      /&gt;

      {/* About */}
      &lt;section id="about" className="max-w-4xl mx-auto px-6 py-20 md:py-28"&gt;
        &lt;BlurFade delay={0.1}&gt;
          &lt;SectionHeading title={content.about.heading} /&gt;
          &lt;div className="space-y-4 mt-8"&gt;
            {content.about.paragraphs.map((p: string, i: number) =&gt; (
              &lt;p key={i} className="text-muted-foreground text-lg leading-relaxed"&gt;
                {p}
              &lt;/p&gt;
            ))}
          &lt;/div&gt;
        &lt;/BlurFade&gt;
      &lt;/section&gt;

      {/* Services */}
      &lt;section id="services" className="bg-card/50 py-20 md:py-28"&gt;
        &lt;div className="max-w-6xl mx-auto px-6"&gt;
          &lt;SectionHeading
            title="Our Services"
            subtitle="Expert grooming tailored to your style"
          /&gt;
          &lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"&gt;
            {content.services.map((s: any, i: number) =&gt; {
              const Icon = ICONS[s.icon] || Scissors;
              return (
                &lt;BlurFade key={i} delay={0.05 * i}&gt;
                  &lt;ServiceCard
                    title={s.title}
                    description={s.description}
                    icon={&lt;Icon className="w-6 h-6" /&gt;}
                  /&gt;
                &lt;/BlurFade&gt;
              );
            })}
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/section&gt;

      &lt;Spacer size="lg" /&gt;

      {/* Reviews */}
      &lt;section id="reviews" className="max-w-4xl mx-auto px-6 py-20 md:py-28"&gt;
        &lt;SectionHeading
          title="What Our Clients Say"
          subtitle="5-star experiences, every time"
        /&gt;
        &lt;div className="space-y-6 mt-12"&gt;
          {content.reviews?.map((r: any, i: number) =&gt; (
            &lt;BlurFade key={i} delay={0.1 * i}&gt;
              &lt;TestimonialCard
                quote={r.text}
                author={r.author}
                rating={r.rating}
              /&gt;
            &lt;/BlurFade&gt;
          ))}
        &lt;/div&gt;
      &lt;/section&gt;

      {/* CTA */}
      &lt;CTABanner
        heading="Ready for a Fresh Cut?"
        subheading="Walk-ins welcome 7 days a week. Call ahead to skip the wait."
        ctaText="Call (818) 334-3011"
        ctaHref="tel:8183343011"
        variant="gradient"
      /&gt;

      {/* Hours &amp; Map */}
      &lt;section id="hours" className="max-w-5xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12"&gt;
        &lt;div&gt;
          &lt;SectionHeading title="Hours" align="left" /&gt;
          &lt;div className="mt-6"&gt;
            &lt;HoursTable hours={content.contact.hours} /&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;div&gt;
          &lt;SectionHeading title="Find Us" align="left" /&gt;
          &lt;div className="mt-6"&gt;
            &lt;MapEmbed query={content.contact.mapEmbedQuery} height={350} /&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/section&gt;

      {/* Contact */}
      &lt;section id="contact"&gt;
        &lt;ContactSection
          phone={content.contact.phone}
          address={content.contact.address}
        /&gt;
      &lt;/section&gt;

      {/* Footer */}
      &lt;FooterMinimal
        businessName={content.businessName}
        links={[
          { label: "Services", href: "#services" },
          { label: "Reviews", href: "#reviews" },
          { label: "Contact", href: "#contact" },
        ]}
      /&gt;
    &lt;/main&gt;
  );
}