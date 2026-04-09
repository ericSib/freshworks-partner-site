import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/config/site";
import QuizFlow from "@/components/quiz/QuizFlow";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quiz" });

  return {
    title: `${t("meta.title")} — ${SITE_NAME}`,
    description: t("meta.description"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/quiz`,
      languages: {
        fr: `${SITE_URL}/fr/quiz`,
        en: `${SITE_URL}/en/quiz`,
      },
    },
  };
}

/**
 * Quiz page — renders the full quiz flow:
 * 1. Segment selector (ITSM vs CX)
 * 2. Demographics
 * 3. Questions (auto-advance)
 * 4. Results (future sprint)
 */
export default function QuizPage() {
  return <QuizFlow />;
}
