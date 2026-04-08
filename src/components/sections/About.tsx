"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import SectionTag from "@/components/ui/SectionTag";

/**
 * Scalable About section — supports 1 to N consultant profiles.
 *
 * To add a new consultant:
 * 1. Add their photo to /public/images/
 * 2. Add an object to the "team" array in fr.json and en.json
 * 3. No code changes required — the component iterates automatically
 *
 * Layout adapts:
 * - 1 profile  → split layout (photo left 40%, bio right 60%)
 * - 2+ profiles → stacked cards with separator, headline switches
 */

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  credentials: string[];
}

export default function About() {
  const t = useTranslations("about");

  // Use t.raw() to get the raw JSON array — reliable with next-intl
  const rawTeam = t.raw("team") as TeamMember[];
  const team: TeamMember[] = Array.isArray(rawTeam) ? rawTeam : [];

  const isMultiple = team.length > 1;

  return (
    <section id="about" className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Section header — adapts to team size */}
        <AnimateOnScroll variant="fade-up">
          <div className="mb-16">
            <SectionTag>{t("sectionTag")}</SectionTag>
            <h2 className="text-3xl sm:text-4xl font-bold text-deep tracking-tight leading-[1.1]">
              {isMultiple ? t("headlineMultiple") : t("headline")}
            </h2>
          </div>
        </AnimateOnScroll>

        {/* Team members */}
        <div className={isMultiple ? "space-y-20" : ""}>
          {team.map((member, idx) => (
            <div key={member.name}>
              {/* Separator between members */}
              {isMultiple && idx > 0 && (
                <div className="premium-rule mb-20" />
              )}

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
                {/* Photo — 2 cols */}
                <AnimateOnScroll
                  variant="fade"
                  delay={idx * 100}
                  className="lg:col-span-2"
                >
                  <div className="relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={480}
                      className="rounded-xl object-cover w-full max-w-sm mx-auto lg:mx-0"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQ4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+"
                    />
                  </div>
                </AnimateOnScroll>

                {/* Bio — 3 cols */}
                <AnimateOnScroll
                  variant="fade-up"
                  delay={150 + idx * 100}
                  className="lg:col-span-3"
                >
                  <h3 className="text-2xl font-bold text-deep mb-1 tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-accent font-medium text-sm mb-8">
                    {member.role}
                  </p>

                  <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-lg">
                    {member.bio}
                  </p>

                  {/* Credentials */}
                  <div className="flex flex-wrap gap-3 mb-10">
                    {member.credentials.map((cred, j) => (
                      <span
                        key={j}
                        className="text-xs font-medium text-slate-500 px-3 py-2 border border-deep/10 rounded"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>

                  {/* CTA — only on the last member */}
                  {idx === team.length - 1 && (
                    <a
                      href="#contact"
                      className="group inline-flex items-center bg-deep text-surface px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-deep-light transition-all duration-300"
                      style={{
                        transitionTimingFunction: "var(--ease-spring)",
                      }}
                    >
                      {t("cta")}
                      <svg
                        className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </a>
                  )}
                </AnimateOnScroll>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
