import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Book, Menu, MoveRight, X } from "lucide-react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Services",
      description: "Find healthcare services and support near you",
      items: [
        { title: "Create Your Own Blog", href: "/soon" },
        { title: "Instant Share", href: "/soon" },
        { title: "MD to PDF", href: "/soon" },
        { title: "Recommended Blogs", href: "/soon" },
      ],
    },
    {
      title: "About Us",
      href: "/",
    },
  ];

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <nav className="flex h-16 items-center justify-between">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] flex items-center justify-center shadow-lg">
                <Book className="w-7 h-7 text-white" />
              </div>
              <span className="text-xl font-bold">BlogEV</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              <NavigationMenu>
                <NavigationMenuList>
                  {navigationItems.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      {item.items ? (
                        <>
                          <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                              {item.items.map((subItem) => (
                                <li key={subItem.title}>
                                  <Link
                                    to={subItem.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium leading-none">
                                      {subItem.title}
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link
                          to={item.href}
                          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                          {item.title}
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              <div className="flex items-center space-x-4">
                <ThemeSwitcher />
                <Button className="dark:bg-white dark:text-black" onClick={() => navigate("/auth")}>
                  Explore More
                  <MoveRight className="ml-2 h-4 w-4" />
                </Button>
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
                  <div key={item.title} className="space-y-2">
                    {item.items ? (
                      <>
                        <div className="font-medium">{item.title}</div>
                        <div className="ml-4 space-y-2">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.title}
                              to={subItem.href}
                              className="block text-sm text-muted-foreground hover:text-foreground"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className="block font-medium hover:text-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="space-y-2 border-t pt-4">
                  
                  <Button
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/auth");
                      setIsOpen(false);
                    }}
                  >
                    Explore More
                    <MoveRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
