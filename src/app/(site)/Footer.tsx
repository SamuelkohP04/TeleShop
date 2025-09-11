export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-[#0F0F0F] py-6">
      <div className="w-full flex justify-between items-center text-sm text-zinc-500">
        {/* Left-aligned copyright */}
        <div className="ml-4">
          © 2025 AwarenessLiving.com. All Rights Reserved.
        </div>

        {/* Right-aligned nav */}
        <nav className="mr-4 flex gap-4 text-zinc-400">
          <a href="/faq" className="hover:text-white transition">About</a>
          <a href="/membership" className="hover:text-white transition">Features</a>
          <a href="/Documents/Terms and Conditions Awareness Living.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Terms</a>
          <a href="/Documents/Privacy Policy Awareness Living.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Privacy</a>
        </nav>
      </div>
    </footer>
  );
}
