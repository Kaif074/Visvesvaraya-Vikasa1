import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Shield, Users, GraduationCap, Download, ChartBar as BarChart3, Calendar } from "lucide-react";

const Admin = () => {
  const [studentRegistrations, setStudentRegistrations] = useState([]);
  const [facultyRegistrations, setFacultyRegistrations] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    activePrograms: 0,
    totalProjects: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch students
      const { data: students, error: studentsError } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (studentsError) throw studentsError;

      // Fetch faculty
      const { data: faculty, error: facultyError } = await supabase
        .from('faculty')
        .select('*')
        .order('created_at', { ascending: false });

      if (facultyError) throw facultyError;

      // Fetch programs count
      const { count: programsCount, error: programsError } = await supabase
        .from('programs')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'upcoming');

      if (programsError) throw programsError;

      // Fetch projects count
      const { count: projectsCount, error: projectsError } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      if (projectsError) throw projectsError;

      setStudentRegistrations(students || []);
      setFacultyRegistrations(faculty || []);
      setStats({
        totalStudents: students?.length || 0,
        totalFaculty: faculty?.length || 0,
        activePrograms: programsCount || 0,
        totalProjects: projectsCount || 0
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (type: string, format: string) => {
    const data = type === 'students' ? studentRegistrations : facultyRegistrations;
    const csvContent = convertToCSV(data);
    downloadFile(csvContent, `${type}_export.csv`, 'text/csv');
  };

  const convertToCSV = (data: any[]) => {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [headers, ...rows].join('\n');
  };

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading admin data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage registrations and program activities</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Faculty</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalFaculty}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Programs</p>
                <p className="text-2xl font-bold text-foreground">{stats.activePrograms}</p>
              </div>
              <Calendar className="h-8 w-8 text-accent-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Projects</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalProjects}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Registration Management */}
      <Tabs defaultValue="students" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="students">Student Registrations</TabsTrigger>
          <TabsTrigger value="faculty">Faculty Registrations</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Student Registrations</CardTitle>
                <CardDescription>
                  Manage student registrations for IDT programs
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExport("students", "csv")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExport("students", "excel")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentRegistrations.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{student.full_name}</h3>
                        <Badge variant="secondary">{student.qualification}</Badge>
                        <Badge variant="outline">{student.course_applied}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{student.address}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faculty">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Faculty Registrations</CardTitle>
                <CardDescription>
                  Manage faculty registrations for TOT programs
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExport("faculty", "csv")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExport("faculty", "excel")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {facultyRegistrations.map((faculty) => (
                  <div key={faculty.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{faculty.full_name}</h3>
                        <Badge variant="secondary">{faculty.experience_years}y exp</Badge>
                        <Badge variant="outline">{faculty.qualification}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{faculty.specialization} - {faculty.address}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;