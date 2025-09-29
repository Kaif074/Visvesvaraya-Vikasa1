import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabaseHelpers } from "@/integrations/supabase/client";
import { Users, BookOpen, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FacultyRegistration = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    college: "",
    experience: "",
    specialization: "",
    totInterest: "",
  });

  const { toast } = useToast();
  const { user, refreshUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register as faculty.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const experienceYears = formData.experience.includes('-') 
        ? parseInt(formData.experience.split('-')[1]) 
        : parseInt(formData.experience.replace('+', ''));

      const { error } = await supabaseHelpers.createFaculty({
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          mobile_number: formData.phone,
          date_of_birth: '1980-01-01', // Default value - can be made dynamic
          gender: 'other', // Default value - can be made dynamic
          address: formData.college,
          qualification: formData.designation,
          specialization: formData.specialization || formData.department,
          experience_years: experienceYears || 0,
          previous_institution: formData.college,
          subjects_to_teach: [formData.department]
      });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already Registered",
            description: "You have already registered as faculty.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        setSuccess(true);
        await refreshUserProfile(); // Refresh user profile after registration
        toast({
          title: "Registration Successful!",
          description: "Your faculty registration has been submitted successfully.",
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Registration Complete!</h1>
          <p className="text-muted-foreground mb-8">
            Welcome to the Train of Trainers Program!
          </p>
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Your faculty registration has been successfully submitted. You can now access all TOT programs.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-secondary/10 rounded-full">
            <Users className="h-8 w-8 text-secondary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Faculty Registration</h1>
        <p className="text-muted-foreground">
          Train of Trainers (TOT) Program Registration
        </p>
      </div>

      <Card className="innovation-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-secondary" />
            TOT Program Registration
          </CardTitle>
          <CardDescription>
            Join our Train of Trainers program to enhance your teaching and innovation skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID*</Label>
                <Input
                  id="employeeId"
                  placeholder="Your employee ID"
                  value={formData.employeeId}
                  onChange={(e) => handleChange("employeeId", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name*</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address*</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@college.edu"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number*</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="designation">Designation*</Label>
                <Select onValueChange={(value) => handleChange("designation", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professor">Professor</SelectItem>
                    <SelectItem value="associate-professor">Associate Professor</SelectItem>
                    <SelectItem value="assistant-professor">Assistant Professor</SelectItem>
                    <SelectItem value="lecturer">Lecturer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department*</Label>
                <Input
                  id="department"
                  placeholder="Your department"
                  value={formData.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="college">College/Institution*</Label>
              <Input
                id="college"
                placeholder="Your college or institution name"
                value={formData.college}
                onChange={(e) => handleChange("college", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Teaching Experience (Years)*</Label>
              <Select onValueChange={(value) => handleChange("experience", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="11-15">11-15 years</SelectItem>
                  <SelectItem value="15+">15+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Area of Specialization</Label>
              <Textarea
                id="specialization"
                placeholder="Your area of expertise and specialization..."
                value={formData.specialization}
                onChange={(e) => handleChange("specialization", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totInterest">Interest in TOT Program</Label>
              <Textarea
                id="totInterest"
                placeholder="Why are you interested in the Train of Trainers program? What do you hope to achieve?"
                value={formData.totInterest}
                onChange={(e) => handleChange("totInterest", e.target.value)}
                rows={3}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              variant="secondary"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register for TOT Program"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyRegistration;