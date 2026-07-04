"use client";

type GlobalErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <main className="w-full h-lvh px-20 py-20 text-center bg-white">
      <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
        Something went wrong
      </p>

      <h1 className="mt-3 text-3xl font-bold">
        The app hit an unexpected error.
      </h1>

      <p className="mt-4 text-gray-600">
        Please try again. If the problem continues, check the console or server
        logs.
      </p>

      {/* Helpful during development, but avoid showing detailed errors to real users in production. */}
      {process.env.NODE_ENV === "development" ? (
        <pre className="mt-6 mx-auto w-1/2 h-auto overflow-auto rounded-lg bg-gray-100 p-4 text-left text-xs text-gray-700">
          {error.message}
        </pre>
      ) : null}

      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
      >
        Try again
      </button>
    </main>
  );
}
