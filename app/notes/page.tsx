import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Prefetch даних на сервері
  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "" }),
  });

  // Повертаємо клієнтський компонент з гідратацією
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
