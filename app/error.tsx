"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * ErrorPage - Global Error Boundary
 *
 * Handles runtime errors with modern design
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)] overflow-hidden flex items-center justify-center">
      <div className="relative w-full h-screen flex items-center justify-center">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-background-primary">
          {/* Morphing Shapes */}
          <div className="morph-shape absolute top-1/4 left-1/4 w-96 h-96 bg-text-primary/5 blur-3xl" />
          <div
            className="morph-shape absolute bottom-1/4 right-1/4 w-125 h-125 bg-text-secondary/5 blur-3xl"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="morph-shape absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-text-primary/3 blur-3xl"
            style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
              linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)
            `,
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 max-w-2xl">
          {/* Error Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-[var(--text-primary)]/20 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-[var(--text-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-[var(--text-primary)]/10 animate-ping" />
            </div>
          </div>

          {/* Error Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 text-gradient">
            Something Went Wrong
          </h1>

          {/* Error Message */}
          <p className="text-lg md:text-xl text-text-secondary font-light mb-4">
            An unexpected error occurred while processing your request.
          </p>
          <p className="text-sm text-text-secondary/60 mb-12">
            {error.message ||
              "Please try again or contact support if the problem persists."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={handleGoHome}
              className="px-8 py-4 bg-[var(--text-primary)] text-[var(--background-primary)] font-light tracking-widest uppercase text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Go Home
            </button>

            <button
              onClick={handleGoBack}
              className="px-8 py-4 border border-[var(--text-primary)] text-[var(--text-primary)] font-light tracking-widest uppercase text-sm transition-all duration-300 hover:bg-[var(--text-primary)] hover:text-[var(--background-primary)] hover:scale-105 active:scale-95"
            >
              Go Back
            </button>

            <button
              onClick={reset}
              className="px-8 py-4 border border-[var(--text-primary)]/30 text-[var(--text-secondary)] font-light tracking-widest uppercase text-sm transition-all duration-300 hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] hover:scale-105 active:scale-95"
            >
              Try Again
            </button>
          </div>

          {/* Decorative Element */}
          <div className="mt-16">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-text-primary/30 to-transparent mx-auto" />
          </div>
        </div>

        {/* Diagonal Decorative Lines */}
        <div className="absolute top-0 left-0 w-[200%] h-20 blur-md bg-linear-to-r from-transparent via-text-primary/10 to-transparent transform -rotate-12" />
        <div className="absolute bottom-0 left-0 w-[200%] h-20 blur-md bg-linear-to-r from-transparent via-text-primary/10 to-transparent transform rotate-12" />
      </div>
    </main>
  );
}
