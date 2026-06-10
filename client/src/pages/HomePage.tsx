import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

export const HomePage = () => {
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 text-slate-900">
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">MemoMesh</h1>
            <p className="text-sm text-green-700">AI-powered study workspace</p>
          </div>
          <div>
            <Button className="bg-green-600 text-white hover:bg-green-700">
              Create Note
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-red-400 text-white hover:bg-red-700"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="mb-10 rounded-3xl bg-gradient-to-r from-blue-600 to-green-500 px-8 py-10 text-white shadow-xl">
          <h2 className="text-4xl font-bold tracking-tight">Welcome back 👋</h2>

          <p className="mt-3 max-w-2xl text-blue-50">
            Organize your notes, generate summaries, and create flashcards in
            one calm study space.
          </p>

          <div className="mt-6 flex gap-3">
            <Button className="bg-white text-blue-700 hover:bg-blue-50">
              New Note
            </Button>

            <Button
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white hover:text-green-700"
            >
              View Flashcards
            </Button>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <Card className="border-blue-100 bg-white shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-blue-700">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Create, edit, and manage your study notes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-100 bg-white shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-green-700">AI Summaries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Turn long notes into short and simple summaries.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-100 bg-white shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-blue-700">Flashcards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Generate flashcards for faster and easier review.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};
