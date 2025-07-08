import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";

type Props = {
  params: Promise <{ id: string }>; 
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const noteId = Number(id);

  if (isNaN(noteId)) {
    throw new Error("Invalid note ID");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={noteId} />
    </HydrationBoundary>
  );
};

export default NoteDetails;