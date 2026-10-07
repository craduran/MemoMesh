import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Flashcard } from "@/components/Flashcard";

export type FlashcardData = {
  id: string;
  question: string;
  answer: string;
};

const flashcards: FlashcardData[] = [
  {
    id: "1",
    question: "What is React?",
    answer:
      "React is a JavaScript library for building user interfaces using reusable components.",
  },
  {
    id: "2",
    question: "What is a React component?",
    answer:
      "A component is a reusable piece of UI that can contain its own structure, logic, and behavior.",
  },
  {
    id: "3",
    question: "What is useState?",
    answer:
      "useState is a React Hook that lets a component store and update state.",
  },
  {
    id: "4",
    question: "What is useEffect?",
    answer:
      "useEffect is a React Hook used for performing side effects such as fetching data or interacting with external systems.",
  },
  {
    id: "5",
    question: "What are props?",
    answer:
      "Props are values passed from a parent component to a child component.",
  },
];

export function FlashcardPage() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashcards[currentIndex];

  const handleFlip = () => {
    setIsFlipped((previous) => !previous);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((previous) => previous + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((previous) => previous - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="mb-5 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back to Home
          </button>

          <h1 className="text-3xl font-bold text-gray-900">
            Flashcards
          </h1>

          <p className="mt-2 text-gray-600">
            Review your study material one card at a time.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm text-gray-500">
            <span>Progress</span>

            <span>
              {currentIndex + 1} / {flashcards.length}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${
                  ((currentIndex + 1) / flashcards.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="flex justify-center">
          <Flashcard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />
        </div>

        {/* Controls */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={handleFlip}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            {isFlipped ? "Show Question" : "Show Answer"}
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </main>
    </div>
  );
}