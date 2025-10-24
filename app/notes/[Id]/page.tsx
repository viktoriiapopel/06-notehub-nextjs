import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetailsClient";

interface NoteDetailsPageProps {
  params: { Id: string };
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { Id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", Id],
    queryFn: () => fetchNoteById(Id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={Id} />
    </HydrationBoundary>
  );
}
