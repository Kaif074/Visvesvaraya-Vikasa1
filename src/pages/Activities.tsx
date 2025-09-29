import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase, supabaseHelpers } from "@/integrations/supabase/client";
import { Upload, Activity, Calendar, Users, FileText } from "lucide-react";

interface ActivityType {
  id: string;
  title: string;
  description: string;
  activity_date: string;
  activity_time: string;
  location: string;
  organizer: string;
  max_participants: number | null;
  registered_count: number;
  status: string;
  activity_type: string;
}

const Activities = () => {
  const [activeTab, setActiveTab] = useState("gallery");
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    participants: "",
    location: "",
    organizer: "",
    activityType: "",
  });

  const { toast } = useToast();
  const { user, userProfile } = useAuth();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabaseHelpers.getAllActivities();
      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast({
        title: "Error",
        description: "Failed to load activities. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (activityId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register for activities.",
        variant: "destructive"
      });
      return;
    }

    setRegistering(activityId);
    
    try {
      const { error } = await supabaseHelpers.registerForActivity(
        activityId, 
        user.id, 
        userProfile?.type === 'student' ? userProfile.id : undefined
      );

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already Registered",
            description: "You are already registered for this activity.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Registration Successful!",
          description: "You have been registered for the activity.",
        });
        fetchActivities();
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error registering for the activity. Please try again.",
        variant: "destructive"
      });
    } finally {
      setRegistering(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to upload activities.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('activities')
        .insert([{
          title: formData.title,
          description: formData.description,
          activity_date: formData.date,
          activity_time: '10:00:00',
          location: formData.location,
          organizer: formData.organizer,
          max_participants: formData.participants ? parseInt(formData.participants) : null,
          activity_type: formData.activityType as any
        }]);

      if (error) throw error;

      toast({
        title: "Activity Created!",
        description: "Activity has been created successfully.",
      });
      
      setFormData({
        title: "",
        description: "",
        date: "",
        participants: "",
        location: "",
        organizer: "",
        activityType: "",
      });
      
      fetchActivities();
    } catch (error) {
      console.error('Create error:', error);
      toast({
        title: "Create Failed",
        description: "There was an error creating the activity. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-primary text-primary-foreground";
      case "ongoing": return "bg-yellow-500 text-white";
      case "completed": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Activities</h1>
            <p className="text-muted-foreground">Explore and participate in campus activities</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gallery">Activity Gallery</TabsTrigger>
          <TabsTrigger value="upload">Create Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery">
          {loading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Loading activities...</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-secondary" />
                  Activity Gallery
                </CardTitle>
                <CardDescription>
                  View and register for activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(activity.activity_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{activity.registered_count} registered</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {activity.location} • {activity.organizer}
                          </p>
                        </div>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {activity.status === "upcoming" && (
                          <Button 
                            size="sm"
                            onClick={() => handleRegister(activity.id)}
                            disabled={registering === activity.id}
                          >
                            {registering === activity.id ? "Registering..." : "Register"}
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                  {activities.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No activities available.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upload">
          <Card className="innovation-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Create New Activity
              </CardTitle>
              <CardDescription>
                Create and schedule new activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Activity Title*</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Innovation Workshop"
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activityType">Activity Type*</Label>
                    <Select onValueChange={(value) => handleChange("activityType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="seminar">Seminar</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Activity Date*</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="participants">Max Participants</Label>
                    <Input
                      id="participants"
                      type="number"
                      placeholder="100"
                      value={formData.participants}
                      onChange={(e) => handleChange("participants", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organizer">Organizer*</Label>
                    <Input
                      id="organizer"
                      placeholder="Department/Organization"
                      value={formData.organizer}
                      onChange={(e) => handleChange("organizer", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location*</Label>
                  <Input
                    id="location"
                    placeholder="Venue location"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description*</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the activity..."
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Upload className="h-4 w-4 mr-2" />
                  Create Activity
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Activities;