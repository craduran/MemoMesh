import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import type { Note } from "@/types/note";

const STORAGE_KEY = "memomesh-notes";

export function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState<Note | null>(null);

  /*
   * Find the note using the ID from the URL.
   */
  useEffect(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);

    if (!savedNotes) {
      return;
    }

    try {
      const notes: Note[] = JSON.parse(savedNotes);

      const foundNote = notes.find(
        (note) => note.id === id
      );

      setNote(foundNote ?? null);
    } catch (error) {
      console.error("Failed to load note:", error);
    }
  }, [id]);

  /*
   * Note doesn't exist.
   */
  if (!note) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
              Note not found
            </h1>

            <p className="mt-2 text-gray-500">
              The note you're looking for doesn't exist.
            </p>

            <button
              type="button"
              onClick={() => navigate("/notes")}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Back to Notes
            </button>
          </div>
        </main>
      </div>
    );
  }

  const formattedDate = new Date(note.updatedAt).toLocaleString();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-10">
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate("/notes")}
          className="mb-6 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Notes
        </button>

        {/* Note */}
        <article className="rounded-2xl bg-white p-8 shadow-sm">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900">
            {note.title}
          </h1>

          {/* Tags */}
          {note.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="my-8 border-t border-gray-200" />

          {/* Content */}
          <div className="whitespace-pre-wrap text-lg leading-8 text-gray-700">
            {note.content}
          </div>

          {/* Footer */}
          <div className="mt-10 border-t border-gray-200 pt-5">
            <p className="text-sm text-gray-400">
              Last updated: {formattedDate}
            </p>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/notes")}
                className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>

              <button
                type="button"
                onClick={() => navigate(`/notes?edit=${note.id}`)}
                className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
              >
                Edit Note
              </button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}