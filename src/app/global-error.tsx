"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Erreur inattendue
          </h1>
          <p className="text-gray-600 mb-8">
            Une erreur critique est survenue. Veuillez rafraichir la page.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            Rafraichir
          </button>
        </div>
      </body>
    </html>
  );
}
