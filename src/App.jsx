import { useEffect, useState } from "react";
import "./App.css";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar.jsx";
import { AppSidebar } from "./Component/app-sidebar.jsx";
import Appbreadcrumb from "./Component/app-breadcrumb.jsx";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
import { Separator } from "./components/ui/separator";
import { Outlet } from "react-router-dom";
import { Progress } from "./components/ui/progress";
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"


function App() {
  const [token, setToken] = useState(null);
  const { getToken } = useAuth();
  const { user } = useUser();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const { setTheme } = useTheme()

  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);
      setProgress(30);
      const fetchedToken = await getToken();
      setToken(fetchedToken);
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
    };
    fetchToken();
  }, [getToken]);

  return (
    <>
      <SidebarProvider
        open={open}
        onOpenChange={setOpen}
      >
        <div className="flex h-screen w-full">
          {/* Sidebar */}
          <AppSidebar className="h-screen w-[250px] bg-gray-800 fixed top-0 left-0 z-10" />

          {/* Main Content */}
          <div className="flex-1 flex flex-col bg-gray-100 ">
            {/* Header */}
            <header className="flex items-center justify-between bg-white shadow-md p-4 sticky top-0 z-20">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="dark:text-black dark:hover:bg-gray-400" />
                <Separator
                  className="h-6 border-l border-gray-300"
                  orientation="vertical"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Separator
                  className="h-6 border-l border-gray-300"
                  orientation="vertical"
                />
                <Appbreadcrumb />
              </div>
              <div className="inline-flex items-center space-x-2">
                <SignedOut>
                  <SignInButton className="text-gray-600 hover:underline" />
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center space-x-2">
                    <UserButton />
                    <p className="text-sm text-gray-700">
                      {user ? user.username || user.primaryEmailAddress.emailAddress : ""}
                    </p>
                  </div>
                </SignedIn>
              </div>
            </header>

            {
              loading ?
                <>
                  <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <Progress
                      value={progress}
                      className="w-3/4 h-2 bg-gray-200 rounded-lg"
                      indicatorClass="bg-indigo-600"
                    />
                  </div>
                </>
                :
                <main className="p-4 flex-1">
                  {user ? (
                    <Outlet />
                  ) : (
                    <div className="min-h-screen flex flex-col">
                      {/* Hero Section */}
                      <section className="bg-indigo-100 text-center py-20">
                        <h2 className="text-4xl font-extrabold text-gray-800">
                          Organize Your Day Effortlessly
                        </h2>
                        <p className="mt-4 text-gray-700 text-lg">
                          Stay on top of your tasks with Taskly — Your go-to
                          productivity companion.
                        </p>
                        <div className="mt-6 space-x-4">
                          <button className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700">
                            Get Started
                          </button>
                          <button className="px-6 py-3 bg-gray-100 text-indigo-600 rounded-md hover:bg-gray-200">
                            Learn More
                          </button>
                        </div>
                      </section>

                      {/* Features Section */}
                      <section id="features" className="py-20 container mx-auto">
                        <h3 className="text-3xl font-bold text-center text-gray-800">
                          Features
                        </h3>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-white p-6 rounded-lg shadow">
                            <h4 className="text-xl font-semibold text-gray-800">
                              Task Organization
                            </h4>
                            <p className="mt-2 text-gray-600">
                              Create, update, and prioritize your tasks with ease.
                            </p>
                          </div>
                          <div className="bg-white p-6 rounded-lg shadow">
                            <h4 className="text-xl font-semibold text-gray-800">
                              Custom Categories
                            </h4>
                            <p className="mt-2 text-gray-600">
                              Organize your to-dos with custom tags.
                            </p>
                          </div>
                          <div className="bg-white p-6 rounded-lg shadow">
                            <h4 className="text-xl font-semibold text-gray-800">
                              Dark Mode
                            </h4>
                            <p className="mt-2 text-gray-600">
                              Choose between light and dark modes.
                            </p>
                          </div>
                        </div>
                      </section>

                      {/* Footer */}
                      <footer className="bg-gray-900 text-white py-6">
                        <div className="container mx-auto flex justify-center items-center">
                          <p>
                            &copy; {new Date().getFullYear()} Taskly. All rights
                            reserved.
                          </p>

                        </div>
                      </footer>
                    </div>
                  )}
                </main>
            }
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}

export default App;
