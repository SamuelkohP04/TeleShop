export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#0F0F0F] py-6">
      <div className="w-full flex justify-between items-center text-sm text-zinc-500">
        {/* Left-aligned copyright */}
        <div className="ml-4">
          © 2025 AwarenessLiving.com. All Rights Reserved.
        </div>

        {/* Right-aligned nav */}
        <nav className="mr-4 flex gap-4 text-zinc-400">
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Features</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Privacy</a>
        </nav>
      </div>
    </footer>
  );
}
