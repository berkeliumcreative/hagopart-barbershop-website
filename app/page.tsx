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

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  scissors: Scissors,
  sparkles: Sparkles,
  heart: Heart,
  users: Users,
  award: Award,
  shield: Shield,
};

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <MinimalNav
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
      />

      {/* Hero */}
      <HeroSimple
        heading={content.hero.heading}
        subheading={content.hero.subheading}
        ctaText={content.hero.ctaText}
        ctaHref={content.hero.ctaLink}
        align="center"
      />

      {/* Stats */}
      <StatsSection
        stats={[
          { label: "Star Rating", value: 5, suffix: ".0" },
          { label: "Days a Week", value: 7 },
          { label: "Years of Craft", value: 10, suffix: "+" },
          { label: "Happy Clients", value: 500, suffix: "+" },
        ]}
      />

      {/* About */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <BlurFade delay={0.1}>
          <SectionHeading title={content.about.heading} />
          <div className="space-y-4 mt-8">
            {content.about.paragraphs.map((p: string, i: number) => (
              <p key={i} className="text-muted-foreground text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* Services */}
      <section id="services" className="bg-card/50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            title="Our Services"
            subtitle="Expert grooming tailored to your style"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {content.services.map((s: any, i: number) => {
              const Icon = ICONS[s.icon] || Scissors;
              return (
                <BlurFade key={i} delay={0.05 * i}>
                  <ServiceCard
                    title={s.title}
                    description={s.description}
                    icon={<Icon className="w-6 h-6" />}
                  />
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      <Spacer size="lg" />

      {/* Reviews */}
      <section id="reviews" className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="5-star experiences, every time"
        />
        <div className="space-y-6 mt-12">
          {content.reviews?.map((r: any, i: number) => (
            <BlurFade key={i} delay={0.1 * i}>
              <TestimonialCard
                quote={r.text}
                author={r.author}
                rating={r.rating}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        heading="Ready for a Fresh Cut?"
        subheading="Walk-ins welcome 7 days a week. Call ahead to skip the wait."
        ctaText="Call (818) 334-3011"
        ctaHref="tel:8183343011"
        variant="gradient"
      />

      {/* Hours & Map */}
      <section id="hours" className="max-w-5xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <SectionHeading title="Hours" align="left" />
          <div className="mt-6">
            <HoursTable hours={content.contact.hours} />
          </div>
        </div>
        <div>
          <SectionHeading title="Find Us" align="left" />
          <div className="mt-6">
            <MapEmbed query={content.contact.mapEmbedQuery} height={350} />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <ContactSection
          phone={content.contact.phone}
          address={content.contact.address}
        />
      </section>

      {/* Footer */}
      <FooterMinimal
        businessName={content.businessName}
        links={[
          { label: "Services", href: "#services" },
          { label: "Reviews", href: "#reviews" },
          { label: "Contact", href: "#contact" },
        ]}
      />
    </main>
  );
}