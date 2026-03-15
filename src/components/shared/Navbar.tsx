"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 cursor-pointer inline-block">
          <h1 className={`text-2xl font-bold tracking-tighter ${isScrolled ? "text-gray-900" : "text-white"}`}>
            BUNGALOV<span className={isScrolled ? "text-blue-600" : "text-blue-400"}>.</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className={`text-sm font-medium transition-colors hover:text-blue-500 ${isScrolled ? "text-gray-600" : "text-gray-200"}`}>Ana Sayfa</Link>
          <Link href="/tesisler" className={`text-sm font-medium transition-colors hover:text-blue-500 ${isScrolled ? "text-gray-600" : "text-gray-200"}`}>Tesisler</Link>
          <Link href="/hakkimizda" className={`text-sm font-medium transition-colors hover:text-blue-500 ${isScrolled ? "text-gray-600" : "text-gray-200"}`}>Hakkımızda</Link>
          <Link href="/iletisim" className={`text-sm font-medium transition-colors hover:text-blue-500 ${isScrolled ? "text-gray-600" : "text-gray-200"}`}>İletişim</Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
            isScrolled ? "bg-gray-100 text-gray-900 hover:bg-gray-200" : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
          }`}>
            <User className="w-4 h-4" />
            Giriş Yap
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={isScrolled ? "text-gray-900" : "text-white"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Basit versiyon) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col px-4 space-y-4">
          <Link href="/" className="text-gray-800 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Ana Sayfa</Link>
          <Link href="/tesisler" className="text-gray-800 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Tesisler</Link>
          <Link href="/hakkimizda" className="text-gray-800 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Hakkımızda</Link>
          <Link href="/iletisim" className="text-gray-800 font-medium" onClick={() => setIsMobileMenuOpen(false)}>İletişim</Link>
          <div className="h-px bg-gray-100 my-2"></div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">Giriş Yap</button>
        </div>
      )}
    </motion.nav>
  );
}
