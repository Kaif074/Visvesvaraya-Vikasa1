import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  GraduationCap,
  Shield,
  Calendar,
  Activity,
  FileImage,
  BookOpen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Student Registration", url: "/student-registration", icon: Users },
  { title: "Faculty Registration", url: "/faculty-registration", icon: GraduationCap },
  { title: "Admin Dashboard", url: "/admin", icon: Shield },
  { title: "Programs", url: "/programs", icon: Calendar },
  { title: "Activities", url: "/activities", icon: Activity },
  { title: "Project Gallery", url: "/project-gallery", icon: FileImage },
];

export function AppSidebar() {
  const { open, setOpen } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-accent hover:text-accent-foreground";

  return (
    <Sidebar className={!open ? "w-16" : "w-56"}>
      <SidebarContent className="bg-sidebar overflow-y-auto">
        <div className="p-6 border-b border-sidebar-border">
          {open && (
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-sidebar-foreground">
                Visvesvaraya Vikasa
              </h3>
              <p className="text-xs text-sidebar-foreground/70 mt-1">
                VTU Innovation Hub
              </p>
            </div>
          )}
          {!open && (
            <div className="flex justify-center">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {open && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}