import { getTranslations } from "next-intl/server";
import { ITSM_CONFIG, CX_CONFIG } from "@/config/quiz";
import type { QuizSegment } from "@/config/quiz";
import QuizContainer from "@/components/quiz/QuizContainer";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/config/site";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ segment?: string }>;
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

export default async function QuizPage({ searchParams }: Props) {
  const params = await searchParams;
  const segment = (params.segment as QuizSegment) || "itsm";
  const config = segment === "cx" ? CX_CONFIG : ITSM_CONFIG;

  return (
    <section className="relative">
      <QuizContainer config={config} />
    </section>
  );
}
