import { Suspense } from "react";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { getGitHubRepos } from "@/lib/github";
import { GitHubRepo } from "@/types/github";
import { SITE_CONFIG } from "@/lib/constants";

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "bg-[#3b82f6]/15 text-[#60a5fa] border-[#3b82f6]/40",
  TypeScript: "bg-[#0ea5e9]/15 text-[#38bdf8] border-[#0ea5e9]/40",
  JavaScript: "bg-[#eab308]/15 text-[#facc15] border-[#eab308]/40",
  Go: "bg-[#06b6d4]/15 text-[#22d3ee] border-[#06b6d4]/40",
  Rust: "bg-[#f97316]/15 text-[#fb923c] border-[#f97316]/40",
  Java: "bg-[#ef4444]/15 text-[#f87171] border-[#ef4444]/40",
  "C++": "bg-[#a855f7]/15 text-[#c084fc] border-[#a855f7]/40",
  Shell: "bg-[#22c55e]/15 text-[#4ade80] border-[#22c55e]/40",
};

function LanguageBadge({ language }: { language: string | null }) {
  if (!language) return null;
  const cls = LANGUAGE_COLORS[language] ?? "bg-white/5 text-white/60 border-white/20";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-mono font-medium border ${cls}`}>
      {language}
    </span>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <article className="card-f1 group relative flex flex-col p-6 rounded-lg overflow-hidden">
      {/* Top color stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(to right, #e10600, #ff8000)" }}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-mono text-sm font-bold text-white group-hover:text-[#e10600] transition-colors line-clamp-1">
          {repo.name}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9ca3af] hover:text-[#ff8000] transition-colors"
              aria-label={`${repo.name} live demo`}
            >
              <ExternalLink size={14} />
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9ca3af] hover:text-white transition-colors"
            aria-label={`${repo.name} on GitHub`}
          >
            <GitHubIcon style={{ width: 14, height: 14 }} />
          </a>
        </div>
      </div>

      <p className="text-[#9ca3af] text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
        {repo.description ?? "No description provided."}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
        <LanguageBadge language={repo.language} />
        <div className="flex items-center gap-3 text-xs font-mono text-[#9ca3af]">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1 text-[#ffcc00]">
              <Star size={12} />
              {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1">
              <GitFork size={12} />
              {repo.forks_count}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function RepoCardSkeleton() {
  return (
    <div className="flex flex-col p-6 rounded-lg border border-white/10 bg-[#1f1f2e] animate-pulse">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="h-4 bg-white/10 rounded w-32" />
        <div className="h-4 bg-white/10 rounded w-8" />
      </div>
      <div className="space-y-2 mb-4 flex-1">
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-5/6" />
        <div className="h-3 bg-white/10 rounded w-4/6" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="h-4 bg-white/10 rounded w-16" />
        <div className="h-4 bg-white/10 rounded w-12" />
      </div>
    </div>
  );
}

async function RepoGrid() {
  let repos: GitHubRepo[] = [];
  let error: string | null = null;
  try {
    repos = await getGitHubRepos();
  } catch {
    error = "Could not load GitHub repositories.";
  }

  if (error) {
    return (
      <p className="text-center text-[#9ca3af] font-mono text-sm py-12">{error}</p>
    );
  }

  if (repos.length === 0) {
    return (
      <p className="text-center text-[#9ca3af] font-mono text-sm py-12">
        No public repositories found.
      </p>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-20">
      <div className="absolute top-0 left-0 right-0 stripe-bar opacity-40" />

      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-14">
          <div className="section-label">03. projects</div>
          <h2 className="font-heading text-4xl md:text-5xl text-white">GitHub Projects</h2>
        </div>

        <Suspense
          fallback={
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <RepoCardSkeleton key={i} />)}
            </div>
          }
        >
          <RepoGrid />
        </Suspense>

        <div className="text-center mt-10">
          <a
            href={`https://github.com/${SITE_CONFIG.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#9ca3af] hover:text-[#e10600] border border-white/15 hover:border-[#e10600]/50 px-6 py-3 rounded-sm transition-colors"
          >
            <GitHubIcon style={{ width: 14, height: 14 }} />
            View all repositories
          </a>
        </div>
      </div>
    </section>
  );
}
