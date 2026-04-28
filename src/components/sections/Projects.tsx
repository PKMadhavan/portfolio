import { Suspense } from "react";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { getGitHubRepos } from "@/lib/github";
import { GitHubRepo } from "@/types/github";
import { SITE_CONFIG } from "@/lib/constants";

const LANG_COLORS: Record<string, string> = {
  Python: "text-[#60a5fa] border-[#3b82f6]/30 bg-[#3b82f6]/10",
  TypeScript: "text-[#38bdf8] border-[#0ea5e9]/30 bg-[#0ea5e9]/10",
  JavaScript: "text-[#facc15] border-[#eab308]/30 bg-[#eab308]/10",
  Go: "text-[#22d3ee] border-[#06b6d4]/30 bg-[#06b6d4]/10",
  Rust: "text-[#fb923c] border-[#f97316]/30 bg-[#f97316]/10",
  Java: "text-[#f87171] border-[#ef4444]/30 bg-[#ef4444]/10",
  "C++": "text-[#c084fc] border-[#a855f7]/30 bg-[#a855f7]/10",
  Shell: "text-[#4ade80] border-[#22c55e]/30 bg-[#22c55e]/10",
};

function LangBadge({ language }: { language: string | null }) {
  if (!language) return null;
  const cls = LANG_COLORS[language] ?? "text-foreground/50 border-white/10 bg-white/5";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-mono border ${cls}`}>
      {language}
    </span>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <article className="glass group relative flex flex-col p-6 rounded-2xl overflow-hidden cursor-default">
      {/* Hover top stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: "linear-gradient(to right, #e10600, #ff8000, #ffcc00)" }}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-mono text-sm font-bold text-foreground group-hover:text-[#e10600] transition-colors line-clamp-1">
          {repo.name}
        </h3>
        <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
              className="text-foreground/40 hover:text-[#ff8000] transition-colors"
              aria-label={`${repo.name} demo`}
            >
              <ExternalLink size={13} />
            </a>
          )}
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
            className="text-foreground/40 hover:text-foreground transition-colors"
            aria-label={`${repo.name} on GitHub`}
          >
            <GitHubIcon style={{ width: 13, height: 13 }} />
          </a>
        </div>
      </div>

      <p className="text-foreground/45 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
        {repo.description ?? "No description provided."}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
        <LangBadge language={repo.language} />
        <div className="flex items-center gap-3 text-xs font-mono text-foreground/35">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1 text-[#ffcc00]">
              <Star size={11} />{repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1">
              <GitFork size={11} />{repo.forks_count}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function Skeleton() {
  return (
    <div className="glass flex flex-col p-6 rounded-2xl animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="h-4 bg-white/8 rounded w-32" />
        <div className="h-4 bg-white/8 rounded w-8" />
      </div>
      <div className="space-y-2 mb-5 flex-1">
        {[100, 83, 66].map((w) => <div key={w} className="h-3 bg-white/8 rounded" style={{ width: `${w}%` }} />)}
      </div>
      <div className="flex justify-between pt-4 border-t border-white/5">
        <div className="h-4 bg-white/8 rounded w-16" />
        <div className="h-4 bg-white/8 rounded w-12" />
      </div>
    </div>
  );
}

async function RepoGrid() {
  let repos: GitHubRepo[] = [];
  try { repos = await getGitHubRepos(); } catch { /* silent fallback */ }

  if (!repos.length) return (
    <p className="text-center text-foreground/35 font-mono text-sm py-16">
      No public repositories found.
    </p>
  );

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {repos.map((r) => <RepoCard key={r.id} repo={r} />)}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,128,0,0.3), transparent)" }}
      />
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="mb-14">
          <div className="section-label">03. projects</div>
          <h2 className="font-heading text-5xl md:text-6xl text-foreground">GitHub Projects</h2>
        </div>

        <Suspense fallback={
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
          </div>
        }>
          <RepoGrid />
        </Suspense>

        <div className="text-center mt-10">
          <a
            href={`https://github.com/${SITE_CONFIG.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 glass px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors"
          >
            <GitHubIcon style={{ width: 13, height: 13 }} />
            View all repositories
          </a>
        </div>
      </div>
    </section>
  );
}
