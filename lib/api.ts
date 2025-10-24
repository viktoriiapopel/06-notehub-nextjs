import type { Note } from "../types/note";
import axios from "axios";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search },
  });
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (noteData: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const res = await api.post<Note>("/notes", noteData);
  {
    return res.data;
  }
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};
