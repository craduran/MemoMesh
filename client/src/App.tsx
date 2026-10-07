import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { LoginPage } from "@/pages/LoginPage";
import { HomePage } from "@/pages/HomePage";
import { NotePage } from "@/pages/NotePage";
import { NoteDetailPage } from "@/pages/NoteDetailPage";
import { FlashcardPage } from "@/pages/FlashCardPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/home" element={<HomePage />} />

          <Route path="/notes" element={<NotePage />} />

          <Route
            path="/notes/:id"
            element={<NoteDetailPage />}
          />

          <Route
            path="/flashcards"
            element={<FlashcardPage />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}