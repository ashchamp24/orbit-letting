

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Building2, Home, Search, FileText, LayoutDashboard, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: "Home", path: createPageUrl("Home"), icon: Home },
    { name: "Properties", path: createPageUrl("Properties"), icon: Search },
    { name: "Apply", path: createPageUrl("Apply"), icon: FileText },
    { name: "Dashboard", path: createPageUrl("Dashboard"), icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        :root {
          --orbit-navy: #0f1c3f;
          --orbit-navy-light: #1a2b52;
          --orbit-gold: #d4a056;
          --orbit-gold-light: #e6b975;
          --orbit-cream: #faf8f5;
          --orbit-text: #2d3748;
          --orbit-text-light: #718096;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-[var(--orbit-navy)] to-[var(--orbit-navy-light)] rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <Building2 className="w-6 h-6 text-[var(--orbit-gold)]" />
              </div>
              <div>
                <div className="text-xl font-bold text-[var(--orbit-navy)] tracking-tight">
                  Orbit Letting
                </div>
                <div className="text-xs text-[var(--orbit-text-light)] tracking-wide">
                  Premium Property Management
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                    location.pathname === item.path
                      ? "bg-[var(--orbit-navy)] text-white"
                      : "text-[var(--orbit-text)] hover:bg-[var(--orbit-cream)]"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[var(--orbit-navy)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--orbit-navy)]" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-[var(--orbit-navy)] text-white"
                      : "text-[var(--orbit-text)] hover:bg-[var(--orbit-cream)]"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--orbit-navy)] text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--orbit-gold)] rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[var(--orbit-navy)]" />
                </div>
                <div className="text-2xl font-bold">Orbit Letting</div>
              </div>
              <p className="text-gray-300 max-w-md leading-relaxed">
                Your trusted partner in premium property management. 
                We connect quality tenants with exceptional properties.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-[var(--orbit-gold)]">Quick Links</h3>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block text-gray-300 hover:text-[var(--orbit-gold)] transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[var(--orbit-gold)]">Contact</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>info@orbitletting.co.uk</p>
                <p>07391 309902</p>
                <p>123 Property Lane<br/>London, UK</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Orbit Letting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

