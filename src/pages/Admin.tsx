import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, GraduationCap, Download, BarChart3, Calendar } from "lucide-react";

// Mock data for demonstration
const studentRegistrations = [
  { id: 1, usn: "1AB21CS001", name: "Arjun Sharma", college: "ABC Engineering", branch: "CSE", email: "arjun@example.com" },
  { id: 2, usn: "1AB21EC002", name: "Priya Patel", college: "XYZ Technical", branch: "ECE", email: "priya@example.com" },
  { id: 3, usn: "1AB21ME003", name: "Rajesh Kumar", college: "DEF Institute", branch: "ME", email: "rajesh@example.com" },
];

const facultyRegistrations = [
  { id: 1, employeeId: "FAC001", name: "Dr. Suresh Gupta", designation: "Professor", department: "CSE", college: "ABC Engineering" },
  { id: 2, employeeId: "FAC002", name: "Prof. Meera Singh", designation: "Associate Professor", department: "ECE", college: "XYZ Technical" },
];

const Admin = () => {
  const handleExport = (type: string, format: string) => {
    // In a real application, this would trigger file download
    console.log(`Exporting ${type} data in ${format} format`);
  };

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
                <p className="text-2xl font-bold text-foreground">{studentRegistrations.length}</p>
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
                <p className="text-2xl font-bold text-foreground">{facultyRegistrations.length}</p>
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
                <p className="text-2xl font-bold text-foreground">5</p>
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
                <p className="text-2xl font-bold text-foreground">12</p>
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
                        <h3 className="font-semibold">{student.name}</h3>
                        <Badge variant="secondary">{student.usn}</Badge>
                        <Badge variant="outline">{student.branch}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{student.college}</p>
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
                        <h3 className="font-semibold">{faculty.name}</h3>
                        <Badge variant="secondary">{faculty.employeeId}</Badge>
                        <Badge variant="outline">{faculty.designation}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{faculty.department} - {faculty.college}</p>
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