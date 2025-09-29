import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, User, LogOut, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import vrifLogo from "@/assets/vrif-logo.jpg";
import eraLogo from "@/assets/era-logo.jpg";

const Header = () => {
  const { user, userProfile, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: 'Sign Out Failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      });
    }
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <img 
            src={vrifLogo} 
            alt="VRIF Logo" 
            className="h-10 w-auto object-contain"
          />
          <SidebarTrigger className="lg:hidden" />
          <div className="hidden md:block">
            <h2 className="text-xl font-semibold text-foreground">
              Visvesvaraya Vikasa
            </h2>
            <p className="text-sm text-muted-foreground">
              Innovation • Design • Technology
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg">
              {user ? (
                <>
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium text-foreground">
                      {userProfile?.full_name || user.user_metadata?.display_name || user.email}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    {userProfile && (
                      <p className="text-xs text-muted-foreground capitalize">
                        {userProfile.type} Profile
                      </p>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link to="/auth" className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <img 
            src={eraLogo} 
            alt="ERA Foundation Logo" 
            className="h-10 w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;