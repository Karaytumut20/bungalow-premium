"use client";

import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const isHomepage = pathname === "/";
  // If we are not on the homepage, force the "scrolled" style to be true right away
  const shouldBeSolid = !isHomepage || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldBeSolid ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 cursor-pointer inline-block">
          <h1 className={`text-2xl font-bold tracking-tighter ${shouldBeSolid ? "text-gray-900" : "text-white"}`}>
            BUNGALOV<span className={shouldBeSolid ? "text-blue-600" : "text-blue-400"}>.</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className={`text-sm font-medium transition-colors hover:text-blue-500 ${shouldBeSolid ? "text-gray-600" : "text-gray-200"}`}>Ana Sayfa</Link>
          <Link href="/tesisler" className={`text-sm font-medium transition-colors hover:text-blue-500 ${shouldBeSolid ? "text-gray-600" : "text-gray-200"}`}>Tesisler</Link>
          <Link href="/hakkimizda" className={`text-sm font-medium transition-colors hover:text-blue-500 ${shouldBeSolid ? "text-gray-600" : "text-gray-200"}`}>Hakkımızda</Link>
          <Link href="/iletisim" className={`text-sm font-medium transition-colors hover:text-blue-500 ${shouldBeSolid ? "text-gray-600" : "text-gray-200"}`}>İletişim</Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <div className="flex items-center gap-3">
              <Link 
                href={(session.user as any)?.role === "ADMIN" ? "/admin" : "/dashboard"}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${shouldBeSolid ? "text-gray-600" : "text-gray-200"}`}
              >
                {(session.user as any)?.role === "ADMIN" ? "Yönetim Paneli" : "Profilim"}
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                  shouldBeSolid ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-red-500/20 text-white hover:bg-red-500/40 backdrop-blur-sm"
                }`}
              >
                Çıkış
              </button>
            </div>
          ) : (
            <Link href="/login" className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
              shouldBeSolid ? "bg-gray-100 text-gray-900 hover:bg-gray-200" : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
            }`}>
              <User className="w-4 h-4" />
              Giriş Yap
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={shouldBeSolid ? "text-gray-900" : "text-white"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl flex flex-col px-4 py-4 space-y-4">
              <Link href="/" className="block text-gray-800 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Ana Sayfa</Link>
              <Link href="/tesisler" className="block text-gray-800 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Tesisler</Link>
              <Link href="/hakkimizda" className="block text-gray-800 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Hakkımızda</Link>
              <Link href="/iletisim" className="block text-gray-800 font-medium" onClick={() => setIsMobileMenuOpen(false)}>İletişim</Link>
              <div className="h-px bg-gray-100 my-2"></div>
              {session ? (
                <div className="flex flex-col gap-2">
                  <Link 
                    href={(session.user as any)?.role === "ADMIN" ? "/admin" : "/dashboard"}
                    className="text-gray-800 font-medium px-4 py-2 bg-gray-50 rounded-lg text-center block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {(session.user as any)?.role === "ADMIN" ? "Yönetim Paneli" : "Profilim"}
                  </Link>
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-red-600 font-medium px-4 py-2 bg-red-50 rounded-lg text-center block w-full"
                  >
                    Çıkış Yap
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-xl font-medium text-center transition-colors block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Giriş Yap
                </Link>
              )}
        </div>
      )}
    </nav>
  );
}
