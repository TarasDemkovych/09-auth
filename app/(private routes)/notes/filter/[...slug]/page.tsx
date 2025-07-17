import NotesClient from "./Notes.client";
import { Metadata } from "next";
import type { Tag } from "@/types/note";

type Props = {
  params: Promise<{ slug?: string[] }>;
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugArray = Array.isArray(slug) && slug.length > 0 ? slug : ["All"];
  const selectedTag = slugArray[0] === "All" ? undefined : slugArray[0];

  return {
    title: `Notes${selectedTag ? ` - ${selectedTag}` : " - All Notes"}`,
    description: `Notes filtered by ${selectedTag || "All Notes"}`,
    openGraph: {
      title: `Notes${selectedTag ? ` - ${selectedTag}` : " - All Notes"}`,
      description: `Notes filtered by ${selectedTag || "All Notes"}`,
      url: `http://localhost:3000/${slugArray.join("/")}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes${selectedTag ? ` - ${selectedTag}` : "All Notes"}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Notes${selectedTag ? ` - ${selectedTag}` : " - All Notes"}`,
      description: `Notes filtered by ${selectedTag || "All Notes"}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}


export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const slugArray = Array.isArray(slug) && slug.length > 0 ? slug : ["All"];
  const selectedTag: Tag | undefined =
    slugArray[0] === "All" ? undefined : (slugArray[0] as Tag);

  return <NotesClient tag={selectedTag} />;
}