import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser as useClerkUser } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
  AuthLoading,
  useQuery,
} from "convex/react";
import { api } from "../../../convex/_generated/api";
import Logo from "../../common/logo";
import { SignInButton } from "@clerk/clerk-react";
import { useUser } from "../../context/UserContext";
import Loader from "../../common/Loader";
import { FaEnvelope, FaUserCircle } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { BiSolidLock } from "react-icons/bi";

const AuthLoader = () => (
  <div className="flex items-center justify-center h-10">
    <Loader size={"25px"} />
  </div>
);

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewedMessages, setViewedMessages] = useState<string[]>([]);
  const location = useLocation();
  const { isSignedIn } = useClerkUser();
  const { user: convexUser } = useUser();

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    }
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Get inbox messages only when signed in
  const inboxMessages =
    useQuery(api.secretMessages.getInboxMessages, isSignedIn ? {} : "skip") ||
    [];

  // Calculate unread messages
  const unreadCount = inboxMessages.filter(
    (message) => !viewedMessages.includes(message.uuid)
  ).length;

  // Update viewed messages when user visits inbox
  useEffect(() => {
    if (location.pathname === "/inbox" && inboxMessages.length > 0) {
      const messageIds = inboxMessages.map((message) => message.uuid);
      setViewedMessages(messageIds);
    }
  }, [location.pathname, inboxMessages]);

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/home") {
      // Consider both /home and / as active for the Home link
      return location.pathname === "/home" || location.pathname === "/";
    }
    return location.pathname === path;
  };

  const navItems = [
    {
      name: "Confessions",
      path: "/confessions",
      icon: <BiSolidMessageRoundedDetail className="text-lg" />,
      requireAuth: false,
    },
    {
      name: "Secret Messages",
      path: "/secret-messages",
      icon: <BiSolidLock className="text-lg" />,
      requireAuth: false,
    },
    {
      name: "Inbox",
      path: "/inbox",
      icon: <FaEnvelope className="text-lg" />,
      badge: unreadCount,
      requireAuth: false,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <IoSettingsSharp className="text-lg" />,
      requireAuth: false,
    },
    {
      name: "Help",
      path: "/help",
      icon: <IoIosHelpCircle className="text-lg" />,
      requireAuth: false,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {" "}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/home" className="flex items-center space-x-2">
              <div className="h-8 w-8 mr-2">
                <Logo />
              </div>
              <span className="text-white text-xl font-bold">SecretSpace</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              // Skip auth-required items for unauthenticated users
              if (item.requireAuth && !isSignedIn) return null;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out whitespace-nowrap ${
                    isActive(item.path)
                      ? "bg-white bg-opacity-20 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Profile / Auth Section */}
          <div className="flex items-center space-x-4">
            <Authenticated>
              <Link
                to="/profile"
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                {convexUser?.image ? (
                  <img
                    src={convexUser.image}
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="h-8 w-8" />
                )}
                <span className="hidden md:inline font-medium">
                  {convexUser?.fullname || "User"}
                </span>
              </Link>
            </Authenticated>

            <Unauthenticated>
              <SignInButton mode="modal">
                <button className="rounded-lg px-4 py-2 text-sm font-medium text-black bg-white hover:bg-gray-400 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </Unauthenticated>

            <AuthLoading>
              <AuthLoader />
            </AuthLoading>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                ref={buttonRef}
                className="text-gray-300 hover:text-white p-2 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden bg-gray-800 py-2 px-4 rounded-b-lg border-t border-gray-700"
          >
            {navItems.map((item) => {
              // Skip auth-required items for unauthenticated users
              if (item.requireAuth && !isSignedIn) return null;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg my-1 transition-all duration-200 ease-in-out ${
                    isActive(item.path)
                      ? "bg-white bg-opacity-20 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-auto">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
