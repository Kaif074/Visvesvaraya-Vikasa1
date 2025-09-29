import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";
import { supabaseHelpers } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Program {
  id: string;
  title: string;
  description: string;
  program_date: string;
  program_time: string;
  location: string;
  capacity: number;
  registered_count: number;
  status: string;
  program_type: string;
}

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState<string | null>(null);
  const { user, userProfile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabaseHelpers.getAllPrograms();
      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast({
        title: "Error",
        description: "Failed to load programs. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (programId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register for programs.",
        variant: "destructive"
      });
      return;
    }

    setRegistering(programId);
    
    try {
      const { error } = await supabaseHelpers.registerForProgram(
        programId, 
        user.id, 
        userProfile?.type === 'student' ? userProfile.id : undefined
      );

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already Registered",
            description: "You are already registered for this program.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Registration Successful!",
          description: "You have been registered for the program.",
        });
        fetchPrograms(); // Refresh the data
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error registering for the program. Please try again.",
        variant: "destructive"
      });
    } finally {
      setRegistering(null);
    }
  };

  const upcomingPrograms = programs.filter(p => p.status === "upcoming");
  const completedPrograms = programs.filter(p => p.status === "completed");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-primary text-primary-foreground";
      case "completed": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const ProgramCard = ({ program }: { program: Program }) => (
    <Card className="innovation-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl">{program.title}</CardTitle>
            <CardDescription className="text-base">
              {program.description}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(program.status)}>
            {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(program.program_date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{program.program_time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{program.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{program.registered_count}/{program.capacity} registered</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <Badge variant="outline">{program.program_type}</Badge>
          <div className="flex gap-2">
            {program.status === "upcoming" && (
              <Button 
                size="sm"
                onClick={() => handleRegister(program.id)}
                disabled={registering === program.id || program.registered_count >= program.capacity}
              >
                {registering === program.id ? "Registering..." : 
                 program.registered_count >= program.capacity ? "Full" : "Register"}
              </Button>
            )}
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Program Schedule</h1>
        <p className="text-muted-foreground">
          Innovation, Design & Technology Programs - Building the future through structured learning
        </p>
      </div>

      {/* Upcoming Programs */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Upcoming Programs</h2>
          <Badge className="bg-primary text-primary-foreground">
            {upcomingPrograms.length} Active
          </Badge>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </section>

      {/* Completed Programs */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Recently Completed</h2>
          <Badge variant="secondary">
            {completedPrograms.length} Completed
          </Badge>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {completedPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <Card className="hero-card mx-auto max-w-2xl">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Want to Participate?</h3>
            <p className="text-lg mb-6 opacity-90">
              Register now to be part of our innovative programs and join a community of changemakers.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Student Registration
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Faculty Registration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Programs;