import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NoteCard from "@/components/NoteCard";
import { Navbar } from "@/components/Navbar";
import type { Note } from "@/types/note";


type NoteForm = {
  title: string;
  content: string;
  tags: string;
};

const STORAGE_KEY = "memomesh-notes";

const starterNotes: Note[] = [
  {
    id: "1",
    title: "React Fundamentals",
    content:
      "React is a JavaScript library for building user interfaces using reusable components.",
    tags: ["React", "JavaScript"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "TypeScript Basics",
    content:
      "TypeScript adds static typing to JavaScript and helps catch errors during development.",
    tags: ["TypeScript", "Programming"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const emptyForm: NoteForm = {
  title: "",
  content: "",
  tags: "",
};

export function NotePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);

    if (!savedNotes) {
      return starterNotes;
    }

    try {
      return JSON.parse(savedNotes);
    } catch {
      return starterNotes;
    }
  });

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const [form, setForm] = useState<NoteForm>(emptyForm);

  /*
   * Save notes whenever the notes state changes.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  /*
   * Collect all unique tags from all notes.
   */
  const tags = useMemo(() => {
    const allTags = notes.flatMap((note) => note.tags);

    return ["All", ...Array.from(new Set(allTags))];
  }, [notes]);

  /*
   * Filter notes based on search text and selected tag.
   */
  const filteredNotes = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return notes.filter((note) => {
      const matchesSearch =
        normalizedSearch === "" ||
        note.title.toLowerCase().includes(normalizedSearch) ||
        note.content.toLowerCase().includes(normalizedSearch) ||
        note.tags.some((tag) =>
          tag.toLowerCase().includes(normalizedSearch)
        );

      const matchesTag =
        selectedTag === "All" || note.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [notes, search, selectedTag]);

  /*
   * Open the modal for creating a new note.
   */
  const handleCreateNote = () => {
    setEditingNote(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  /*
   * Open the modal for editing an existing note.
   */
  const handleEditNote = (note: Note) => {
    setEditingNote(note);

    setForm({
      title: note.title,
      content: note.content,
      tags: note.tags.join(", "),
    });

    setIsModalOpen(true);
  };

  /*
   * Open the editor when the URL contains ?edit=NOTE_ID.
   */
  useEffect(() => {
    const editId = searchParams.get("edit");

    if (!editId) {
      return;
    }

    const noteToEdit = notes.find((note) => note.id === editId);

    if (!noteToEdit) {
      return;
    }

    handleEditNote(noteToEdit);

    setSearchParams({});
  }, [searchParams, notes]);

  /*
   * Close the create/edit modal.
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
    setForm(emptyForm);
  };

  /*
   * Update form fields.
   */
  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  /*
   * Create a new note or update an existing note.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = form.title.trim();
    const content = form.content.trim();

    if (!title || !content) {
      return;
    }

    const tags = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const now = new Date().toISOString();

    if (editingNote) {
      setNotes((previousNotes) =>
        previousNotes.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                title,
                content,
                tags,
                updatedAt: now,
              }
            : note
        )
      );
    } else {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title,
        content,
        tags,
        createdAt: now,
        updatedAt: now,
      };

      setNotes((previousNotes) => [newNote, ...previousNotes]);
    }

    handleCloseModal();
  };

  /*
   * Delete a note.
   */
  const handleDeleteNote = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />

      {/* Notes content */}
      <div className="mx-auto max-w-7xl p-6">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Notes
            </h1>

            <p className="mt-1 text-gray-600">
              Organize your knowledge and study materials.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreateNote}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            + New Note
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search notes..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedTag === tag
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Notes */}
        {filteredNotes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No notes found
            </h2>

            <p className="mt-2 text-gray-500">
              Try another search or create a new note.
            </p>

            <button
              type="button"
              onClick={handleCreateNote}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Create Note
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingNote ? "Edit Note" : "Create Note"}
              </h2>

              <button
                type="button"
                onClick={handleCloseModal}
                className="text-2xl text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="Enter note title..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Content */}
              <div>
                <label
                  htmlFor="content"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Content
                </label>

                <textarea
                  id="content"
                  name="content"
                  value={form.content}
                  onChange={handleFormChange}
                  placeholder="Write your note..."
                  rows={8}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Tags
                </label>

                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={form.tags}
                  onChange={handleFormChange}
                  placeholder="React, JavaScript, Programming"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <p className="mt-1 text-sm text-gray-500">
                  Separate tags with commas.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                >
                  {editingNote ? "Save Changes" : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}