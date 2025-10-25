"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import css from "./NoteDetails.client.module.css";

interface NoteDetailsClientProps {
  noteid: string;
}

export default function NoteDetailsClient({ noteid }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", noteid],
    queryFn: () => fetchNoteById(noteid),
    enabled: !!noteid,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created at: {note.createdAt}</p>
      </div>
    </div>
  );
}
