import { Layout } from "../layouts/Layout.js";

export function LandingPage() {
  return (
    <main class="text-center space-y-8 p-4">
      <div class="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-primary"
        >
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
          <circle cx="12" cy="13" r="3"></circle>
        </svg>
        <span class="sr-only">PhotoAlbum</span>
      </div>
      <h1 class="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
        Create Your Photo Album
      </h1>
      <p class="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
        Instantly organize and showcase your best shots with our AI-powered
        album generator.
      </p>
      <form action="/albums/generate" method="get">
        <button
          type="submit"
          class="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-lg font-medium transition-colors"
        >
          Generate New Album
        </button>
      </form>
    </main>
  );
}
