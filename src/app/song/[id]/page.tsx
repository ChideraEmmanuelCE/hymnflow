import { notFound } from "next/navigation";
import { getHymn, hymns } from "@/data/hymns";
import HymnPlayer from "@/components/HymnPlayer";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return hymns.map((h) => ({ id: h.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const hymn = getHymn(id);
  if (!hymn) return { title: "Hymn not found" };
  return {
    title: `${hymn.title} · HymnFlow`,
    description: hymn.description,
  };
}

export default async function SongPage({ params }: Props) {
  const { id } = await params;
  const hymn = getHymn(id);
  if (!hymn) notFound();
  return <HymnPlayer hymn={hymn} />;
}
