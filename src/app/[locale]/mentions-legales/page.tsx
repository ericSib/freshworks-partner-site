import Breadcrumb from "@/components/ui/Breadcrumb";
import LegalContent from "./LegalContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MentionsLegales({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Breadcrumb locale={locale} slug="mentions-legales" />
      <LegalContent />
    </>
  );
}
