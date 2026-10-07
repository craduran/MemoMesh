import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavigation("/home")}
            className="text-xl font-bold text-blue-700"
          >
            MemoMesh
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => handleNavigation("/home")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive("/home")
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
              }`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => handleNavigation("/notes")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive("/notes")
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
              }`}
            >
              Notes
            </button>

            <button
              type="button"
              onClick={() => handleNavigation("/flashcards")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive("/flashcards")
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
              }`}
            >
              Flashcards
            </button>

            <Button
              onClick={handleLogout}
              className="ml-2 bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-blue-700 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              // X icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-100 pb-4 pt-3 md:hidden">
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleNavigation("/home")}
                className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                  isActive("/home")
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => handleNavigation("/notes")}
                className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                  isActive("/notes")
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Notes
              </button>

              <button
                type="button"
                onClick={() => handleNavigation("/flashcards")}
                className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                  isActive("/flashcards")
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Flashcards
              </button>

              <Button
                onClick={handleLogout}
                className="mt-2 w-full bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}