import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import StudentRegistration from "./pages/StudentRegistration";
import FacultyRegistration from "./pages/FacultyRegistration";
import Admin from "./pages/Admin";
import Programs from "./pages/Programs";
import Activities from "./pages/Activities";
import ProjectGallery from "./pages/ProjectGallery";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <AppSidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/student-registration" element={<StudentRegistration />} />
                    <Route path="/faculty-registration" element={<FacultyRegistration />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/programs" element={<Programs />} />
                    <Route path="/activities" element={<Activities />} />
                    <Route path="/project-gallery" element={<ProjectGallery />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
