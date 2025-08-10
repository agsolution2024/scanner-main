"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import Button from "@/app/components/atoms/button";
import Typography from "@/app/components/atoms/typography";
import { Badge } from "@/components/ui/badge";
import { Users, QrCode, LogOut, Download, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: "attendees" | "scanner" | "qr-generator";
}

const DashboardLayout = ({ children, currentPage }: DashboardLayoutProps) => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navigation = [
    {
      name: "Attendees",
      href: "/dashboard/attendees",
      icon: Users,
      id: "attendees" as const,
    },
    {
      name: "QR Scanner",
      href: "/dashboard/scanner",
      icon: QrCode,
      id: "scanner" as const,
    },
    ...(user?.role === "admin"
      ? [
          {
            name: "QR Generator",
            href: "/dashboard/qr-generator",
            icon: Download,
            id: "qr-generator" as const,
          },
        ]
      : []),
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700">
            {/* Logo Header - Enhanced Red/White Theme */}
            <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 bg-gradient-to-r from-white-600 to-white-700 dark:from-gray-800  dark:to-gray-800 ">
              <div className="flex items-center">
                <img className="h-10 w-auto drop-shadow-lg" src="/rrhi-full.png" alt="RRHI" />
              </div>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-gray-700" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>
            </div>

            {/* Navigation - Enhanced Styling */}
            <nav className="mt-6 flex-1 px-3 bg-white dark:bg-gray-800 space-y-2 overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`group w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/50 dark:to-red-800/50 text-red-900 dark:text-red-100 border-l-4 border-red-600 shadow-lg transform scale-105'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 hover:translate-x-2 hover:shadow-md'
                    }`}
                  >
                    <Icon className={`mr-4 h-5 w-5 ${
                      currentPage === item.id ? 'text-red-600 dark:text-red-400' : ''
                    }`} />
                    {item.name}
                    {currentPage === item.id && (
                      <div className="ml-auto w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* User info and logout - Enhanced Dark Mode */}
            <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-4 flex-shrink-0">
              <div className="mb-4 p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
                <Typography
                  variant="body2"
                  className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide font-medium"
                >
                  Signed in as
                </Typography>
                <Typography
                  variant="body1"
                  className="font-semibold text-gray-900 dark:text-gray-100 mt-2"
                >
                  {user?.name}
                </Typography>
                <Badge variant="secondary" className="mt-3 text-xs bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700">
                  {user?.role}
                </Badge>
              </div>

              {/* Enhanced logout with dark mode */}
              <div
                onClick={handleLogout}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 cursor-pointer transition-all duration-200 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 group"
              >
                <img
                  src="/rrhi_logo.png"
                  alt="RRHI"
                  className="w-6 h-6 mr-3 opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <Typography variant="body2" className="font-medium">
                  Sign Out
                </Typography>
                <LogOut className="w-4 h-4 ml-auto opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content - Enhanced Dark Mode */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header - Enhanced with theme toggle */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm flex-shrink-0">
          <div className="flex items-center">
            <img className="h-8 w-auto mr-2" src="/rrhi_logo.png" alt="RRHI" />
            <Typography variant="h6" className="font-bold text-gray-900 dark:text-gray-100">
              Event Attendance
            </Typography>
          </div>
          <div className="flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Page content with dark mode */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-auto pb-24 lg:pb-0 transition-colors duration-300">
          {children}
        </main>

        {/* Mobile Bottom Navigation with dark mode */}
        <div className="lg:hidden mobile-bottom-nav">
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 safe-area-bottom transition-colors duration-300">
            <div className="flex items-center justify-around max-w-md mx-auto">
            
              {/* Attendees Button */}
              <button
                onClick={() => handleNavigation("/dashboard/attendees")}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-[60px] ${
                  currentPage === "attendees"
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 active:text-red-500 dark:active:text-red-400"
                }`}
              >
                <Users
                  className={`h-6 w-6 mb-1 ${
                    currentPage === "attendees" ? "text-red-600 dark:text-red-400" : ""
                  }`}
                />
                <Typography
                  variant="caption"
                  className={`text-xs ${
                    currentPage === "attendees"
                      ? "text-red-600 dark:text-red-400 font-semibold"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Attendees
                </Typography>
              </button>

              {/* QR Scanner Button - Enhanced with animations and emboss */}
              <button
                onClick={() => handleNavigation("/dashboard/scanner")}
                className={`relative flex items-center justify-center rounded-full transition-all duration-300 transform ${
                  currentPage === "scanner"
                    ? "bg-gradient-to-b from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 text-white scale-110 shadow-2xl shadow-red-500/50 dark:shadow-red-600/40"
                    : "bg-gradient-to-b from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 text-white hover:scale-105 hover:shadow-xl hover:shadow-red-500/30 dark:hover:shadow-red-600/30 active:scale-95 animate-pulse"
                } shadow-inner border-2 border-red-300 dark:border-red-400`}
                style={{
                  width: "65px",
                  height: "65px",
                  marginTop: "-15px",
                  boxShadow:
                    currentPage === "scanner"
                      ? "inset 0 -2px 4px rgba(0,0,0,0.2), 0 8px 20px rgba(239,68,68,0.4)"
                      : "inset 0 -2px 4px rgba(0,0,0,0.2), 0 4px 12px rgba(239,68,68,0.3)",
                }}
              >
                <QrCode className="h-8 w-8 drop-shadow-lg" />

                {/* Animated ring effect */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>

                {/* Emboss highlight */}
                <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-gradient-to-br from-white/40 to-transparent"></div>

                {/* Active pulse effect */}
                {currentPage === "scanner" && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 animate-pulse opacity-60"></div>
                    <div className="absolute -inset-1 rounded-full border-2 border-red-300 dark:border-red-400 animate-pulse"></div>
                  </>
                )}
              </button>

              {/* QR Generator Button (Admin Only) or Empty Space */}
              {user?.role === "admin" ? (
                <button
                  onClick={() => handleNavigation("/dashboard/qr-generator")}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-[60px] ${
                    currentPage === "qr-generator"
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 active:text-red-500 dark:active:text-red-400"
                  }`}
                >
                  <Download
                    className={`h-6 w-6 mb-1 ${
                      currentPage === "qr-generator" ? "text-red-600 dark:text-red-400" : ""
                    }`}
                  />
                  <Typography
                    variant="caption"
                    className={`text-xs ${
                      currentPage === "qr-generator"
                        ? "text-red-600 dark:text-red-400 font-semibold"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    Generate
                  </Typography>
                </button>
              ) : (
                <div className="flex flex-col items-center justify-center p-2 min-w-[60px]">
                  <div className="h-6 w-6 mb-1"></div>
                  <Typography
                    variant="caption"
                    className="text-xs text-transparent"
                  >
                    .
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
