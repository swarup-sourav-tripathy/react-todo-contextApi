import { Calendar, Home, User, Star, MenuSquareIcon, Menu, LockIcon, Cake, Heart, ListTodo, Workflow } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { NavLink } from "react-router-dom"
import { ChevronsDownUpIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"

import { useUser, UserButton, SignedIn } from "@clerk/clerk-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "User",
    url: "/user",
    icon: User,
  },
  {
    title: "Stared Task",
    url: "/staredtask",
    icon: Star,
  },
]

const dropDownMenuItems = [
  {
    title: "All",
    url: "/category/allTodo",
    icon: ListTodo,
  },
  {
    title: "Work",
    url: "/category/workTodo",
    icon: Workflow,
  },
  {
    title: "Personal",
    url: "/category/personalTodo",
    icon: LockIcon,
  },
  {
    title: "Wishlist",
    url: "/category/wishlistTodo",
    icon: Heart,
  },
  {
    title: "Birthday",
    url: "/category/birthdayTodo",
    icon: Cake,
  },
]

export function AppSidebar() {
  const { user } = useUser();


  return (

    <Sidebar variant="sidebar" className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <SidebarContent>
        {/* Logo Section */}
        <SidebarGroupLabel className="bg-gradient-to-br from-blue-500 to-emerald-500 bg-cover bg-center rounded-none h-[8rem] font-bold text-3xl text-white flex items-center justify-center shadow-md">
          Taskly
        </SidebarGroupLabel>

        {/* Header Menu */}
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarGroupLabel className="font-bold h-full w-full text-lg bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white py-2 px-4 rounded-md shadow-md">
                <Menu className="mr-2" /> Menu
              </SidebarGroupLabel>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Sidebar Menu Items */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-blue-500 dark:bg-blue-600 text-white"
                        : "bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                    }
                  >
                    {({ isActive }) => (
                      <SidebarMenuButton
                        className={`flex items-center space-x-2 py-2 px-3 rounded-md shadow-sm duration-150 ${isActive
                          ? "bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-700 dark:bg-blue-600 text-white hover:text-white"
                          : "bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                          }`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}

              {/* Accordion for Categories */}
              <SidebarMenuItem>
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="w-full">
                      <div className="flex flex-row items-center justify-start ml-3 ">
                        <MenuSquareIcon className="mr-4 " />
                        <span>Category</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 ">
                      {dropDownMenuItems.map((item) => (
                        <NavLink
                          key={item.title}
                          to={item.url}
                          className={({ isActive }) =>
                            isActive
                              ? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 text-white "
                              : "bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 "
                          }
                        >
                          {({ isActive }) => (
                            <SidebarMenuButton
                              className={`flex items-center space-x-2  py-2 px-3 rounded-md shadow-sm mb-1  duration-150 ${isActive
                                ? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white hover:text-white"
                                : "bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                                }`}
                            >
                              <item.icon />
                              <span>{item.title}</span>
                            </SidebarMenuButton>
                          )}
                        </NavLink>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex items-center space-x-2 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 py-2 px-3 rounded-md">
              <SignedIn>
                <UserButton />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {user ? user.username || user.primaryEmailAddress.emailAddress : ""}
                </p>
              </SignedIn>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>

  )
}
