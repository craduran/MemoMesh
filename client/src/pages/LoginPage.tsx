import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "@/firebaseConfig";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      await signInWithPopup(auth, googleProvider);

      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-emerald-50 to-green-100 px-4 py-8">
      <Card className="w-full max-w-md border-blue-100 bg-white/90 shadow-2xl backdrop-blur">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 text-3xl font-bold text-white shadow-lg">
            M
          </div>

          <CardTitle className="text-3xl font-bold text-slate-900">
            Welcome to MemoMesh
          </CardTitle>

          <CardDescription className="text-slate-600">
            Save notes, organize ideas, and study smarter with AI-powered
            summaries and flashcards.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-center text-sm text-red-700">
                {errorMessage}
              </p>
            </div>
          )}

          <Button
            onClick={loginWithGoogle}
            disabled={isLoading}
            className="w-full cursor-pointer bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Continue with Google"}
          </Button>

          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
            <p className="text-center text-sm text-green-700">
              Your calm study space powered by notes, AI, and matcha energy 🍵
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};