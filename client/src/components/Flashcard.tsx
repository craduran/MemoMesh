import type { FlashcardData } from "@/pages/FlashCardPage";

type FlashcardProps = {
  card: FlashcardData;
  isFlipped: boolean;
  onFlip: () => void;
};

export function Flashcard({
  card,
  isFlipped,
  onFlip,
}: FlashcardProps) {
  return (
    <button
      type="button"
      onClick={onFlip}
      className="w-full max-w-2xl text-left"
    >
      <div className="min-h-[350px] rounded-2xl border border-gray-200 bg-white p-10 shadow-lg transition hover:shadow-xl">
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <p className="mb-6 text-sm font-medium uppercase tracking-wider text-blue-600">
            {isFlipped ? "Answer" : "Question"}
          </p>

          <h2 className="text-3xl font-bold text-gray-900">
            {isFlipped ? card.answer : card.question}
          </h2>

          <p className="mt-8 text-sm text-gray-400">
            Click the card to {isFlipped ? "see the question" : "reveal the answer"}
          </p>
        </div>
      </div>
    </button>
  );
}