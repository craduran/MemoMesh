import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

export const HomePage = () => {
  const navigate = useNavigate();

  function handleCreateNote() {
    navigate("/notes");
  }

  function handleViewFlashcards() {
    navigate("/flashcards");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 text-slate-900">
      {/* Shared Navbar */}
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Hero */}
        <section className="mb-10 rounded-3xl bg-gradient-to-r from-blue-600 to-green-500 px-5 py-8 text-white shadow-xl sm:px-8 sm:py-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back 👋
          </h2>

          <p className="mt-3 max-w-2xl text-blue-50">
            Organize your notes, generate summaries, and create
            flashcards in one calm study space.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={handleCreateNote}
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              New Note
            </Button>

            <Button
              onClick={handleViewFlashcards}
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white hover:text-green-700"
            >
              View Flashcards
            </Button>
          </div>
        </section>

        {/* Feature cards */}
        <section className="grid gap-6 md:grid-cols-3">
          {/* Notes */}
          <Card className="border-blue-100 bg-white shadow-md transition hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-700">
                Notes
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-slate-600">
                Create, edit, and manage your study notes.
              </p>

              <Button
                onClick={handleCreateNote}
                className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
              >
                Open Notes
              </Button>
            </CardContent>
          </Card>

          {/* AI Summaries */}
          <Card className="border-green-100 bg-white shadow-md transition hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-700">
                AI Summaries
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-slate-600">
                Turn long notes into short and simple summaries.
              </p>

              <Button disabled className="mt-4">
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          {/* Flashcards */}
          <Card className="border-blue-100 bg-white shadow-md transition hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-700">
                Flashcards
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-slate-600">
                Generate flashcards for faster and easier review.
              </p>

              <Button
                onClick={handleViewFlashcards}
                className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
              >
                Open Flashcards
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};