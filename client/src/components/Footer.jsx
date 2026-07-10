import { profile } from "../data/resume";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-fog">
        <p className="font-mono">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs">+91 70008-31953</p>
      </div>
    </footer>
  );
}
