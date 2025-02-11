import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../landingPage/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, X, PencilLine, LogOut } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUserStore from "@/store/userStore";
import { useToast } from "@/hooks/use-toast";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { isSignedIn, pic, name, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "See you again!",
      duration: 3000,
    });
    navigate("/");
  };

  const navigationItems = isSignedIn
    ? [
        { title: "My Blogs", href: "/blog/myblogs" },
        { title: "Bookmarks", href: "/blog/bookmarks" },
      ]
    : [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-4xl w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
              📝
            </div>
            <span className="text-xl font-bold text-[#8CCC4C]">BlogEV</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link
                      to={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Theme Switcher & Buttons */}
            <div className="flex items-center space-x-4">
              <ThemeSwitcher />
              {isSignedIn ? (
                <>
                  <Button
                    className="dark:bg-white dark:text-black"
                    onClick={() => navigate("/blog/create")}
                  >
                    Write
                    <PencilLine className="ml-2 h-4 w-4" />
                  </Button>
                  {/* User Avatar Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar className="border border-gray-300 dark:border-white">
                        {pic && <AvatarImage src={pic} alt={name} />}
                        <AvatarFallback className="text-gray-700 dark:text-gray-300">
                          {name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate("/profile")}>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={handleLogout}
                        className="text-red-500 dark:text-red-400"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => navigate("/auth/login")}>
                    Login
                  </Button>
                  <Button onClick={() => navigate("/auth/register")}>
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeSwitcher />
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="space-y-4 px-4 pb-4 pt-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="block font-medium hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}

              <div className="space-y-2 border-t pt-4">
                {isSignedIn ? (
                  <>
                    <Button
                      className="w-full justify-start"
                      onClick={() => {
                        navigate("/blog/create");
                        setIsOpen(false);
                      }}
                    >
                      Write
                      <PencilLine className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500 dark:text-red-400"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                    {/* Profile Link */}
                    <div 
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer"
                      onClick={() => {
                        navigate("/profile");
                        setIsOpen(false);
                      }}
                    >
                      <Avatar className="border border-gray-300 dark:border-white">
                        {pic && <AvatarImage src={pic} alt={name} />}
                        <AvatarFallback className="text-gray-700 dark:text-gray-300">
                          {name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{name}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        navigate("/auth/login");
                        setIsOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => {
                        navigate("/auth/register");
                        setIsOpen(false);
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;