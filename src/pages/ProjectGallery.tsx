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
import { supabase } from "@/integrations/supabase/client";
import { Upload, FileImage, Eye, ExternalLink, Calendar, User } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  project_url: string | null;
  student_id: string | null;
  faculty_supervisor: string | null;
  status: string;
  start_date: string;
  end_date: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
  // Additional fields from joins
  student_name?: string;
  student_usn?: string;
  student_college?: string;
}

const ProjectGallery = () => {
  const [activeTab, setActiveTab] = useState("gallery");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    studentName: "",
    usn: "",
    college: "",
    projectImage: null as File | null,
    technologies: "",
    projectUrl: "",
  });

  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          students!projects_student_id_fkey (
            full_name,
            qualification,
            address
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map the joined data
      const mappedProjects = (data || []).map(project => ({
        ...project,
        student_name: project.students?.full_name || 'Unknown',
        student_usn: project.students?.qualification || 'N/A',
        student_college: project.students?.address || 'Unknown'
      }));
      
      setProjects(mappedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to upload projects.",
        variant: "destructive"
      });
      return;
    }

    try {
      // First check if user has a student record
      const { data: studentData } = await supabase
        .from('students')
        .select('id')
        .eq('user_id', user.id)
        .single();

      const { error } = await supabase
        .from('projects')
        .insert([{
          title: formData.title,
          description: formData.description,
          student_id: studentData?.id || null,
          project_url: formData.projectUrl || null,
          status: 'ongoing',
          start_date: new Date().toISOString().split('T')[0],
          tags: formData.technologies ? formData.technologies.split(',').map(t => t.trim()) : []
        }]);

      if (error) throw error;

      toast({
        title: "Project Uploaded!",
        description: "Project has been submitted to the gallery for review.",
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        studentName: "",
        usn: "",
        college: "",
        projectImage: null,
        technologies: "",
        projectUrl: "",
      });
      
      fetchProjects(); // Refresh the data
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading the project. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, projectImage: e.target.files![0] }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-secondary text-secondary-foreground";
      case "ongoing": return "bg-primary text-primary-foreground";
      case "archived": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileImage className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Project Gallery</h1>
            <p className="text-muted-foreground">Showcase innovative student projects and research work</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gallery">Project Gallery</TabsTrigger>
          <TabsTrigger value="upload">Upload Project</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery">
          {loading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Loading projects...</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Filter Options */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Label htmlFor="filter">Filter by Status:</Label>
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="All Projects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Projects</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Project Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="innovation-card overflow-hidden">
                    <div className="aspect-video bg-muted/30 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileImage className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-2">{project.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {project.description}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3" />
                            <span>{project.student_name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(project.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground">
                          {project.student_college}
                        </p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        {project.project_url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {projects.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No projects available.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upload">
          <Card className="innovation-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload Project
              </CardTitle>
              <CardDescription>
                Submit your innovative project to the gallery for review and showcase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title*</Label>
                  <Input
                    id="title"
                    placeholder="Enter your project title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description*</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project, its objectives, methodology, and impact..."
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category*</Label>
                    <Select onValueChange={(value) => handleChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="environment">Environment</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="social">Social Innovation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="technologies">Technologies Used</Label>
                    <Input
                      id="technologies"
                      placeholder="e.g., React, Node.js, Arduino, Python"
                      value={formData.technologies}
                      onChange={(e) => handleChange("technologies", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name*</Label>
                    <Input
                      id="studentName"
                      placeholder="Your full name"
                      value={formData.studentName}
                      onChange={(e) => handleChange("studentName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usn">USN*</Label>
                    <Input
                      id="usn"
                      placeholder="Your USN"
                      value={formData.usn}
                      onChange={(e) => handleChange("usn", e.target.value)}
                      required
                      className="uppercase"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="college">College*</Label>
                    <Input
                      id="college"
                      placeholder="Your college name"
                      value={formData.college}
                      onChange={(e) => handleChange("college", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectUrl">Project URL/Demo Link</Label>
                  <Input
                    id="projectUrl"
                    type="url"
                    placeholder="https://your-project-demo.com"
                    value={formData.projectUrl}
                    onChange={(e) => handleChange("projectUrl", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectImage">Project Image/Screenshot*</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                    <div className="text-center">
                      <FileImage className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <div className="space-y-2">
                        <Label htmlFor="projectImage" className="cursor-pointer">
                          <span className="text-primary font-medium">Click to upload project image</span>
                          <span className="text-muted-foreground"> or drag and drop</span>
                        </Label>
                        <Input
                          id="projectImage"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                          required
                        />
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG, JPEG up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                  {formData.projectImage && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {formData.projectImage.name}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Project for Review
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectGallery;