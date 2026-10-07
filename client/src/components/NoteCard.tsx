import { useNavigate } from "react-router-dom";
import type { Note } from "@/types/note";

type NoteCardProps = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
};

function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const navigate = useNavigate();

  const formattedDate = new Date(note.updatedAt).toLocaleDateString();

  const handleOpenNote = () => {
    navigate(`/notes/${note.id}`);
  };

  return (
    <article className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Note content */}
      <button
        type="button"
        onClick={handleOpenNote}
        className="flex-1 text-left"
      >
        <h2 className="line-clamp-2 text-xl font-semibold text-gray-900">
          {note.title}
        </h2>

        <p className="mt-3 line-clamp-4 text-sm leading-6 text-gray-600">
          {note.content}
        </p>

        {/* Tags */}
        {note.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </button>

      {/* Footer */}
      <div className="mt-6 border-t border-gray-100 pt-4">
        <p className="mb-4 text-xs text-gray-400">
          Updated {formattedDate}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(note)}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(note.id)}
            className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;