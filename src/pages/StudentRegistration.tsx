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
import { UserPlus, GraduationCap, CircleCheck as CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    usn: "",
    fullName: "",
    email: "",
    phone: "",
    college: "",
    branch: "",
    semester: "",
    interests: "",
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
        description: "Please sign in to register as a student.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabaseHelpers.createStudent({
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          mobile_number: formData.phone,
          date_of_birth: '2000-01-01', // Default value - can be made dynamic
          gender: 'other', // Default value - can be made dynamic
          address: formData.college, // Using college as address for now
          qualification: formData.branch,
          course_applied: `${formData.branch} - Semester ${formData.semester}`,
          emergency_contact_name: 'Not provided',
          emergency_contact_number: 'Not provided'
      });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already Registered",
            description: "You have already registered as a student.",
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
          description: "Your student registration has been submitted successfully.",
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
            Welcome to the Visvesvaraya Vikasa Innovation Program!
          </p>
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Your registration has been successfully submitted. You can now access all programs and activities.
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
          <div className="p-3 bg-primary/10 rounded-full">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Student Registration</h1>
        <p className="text-muted-foreground">
          Join the Innovation, Design & Technology Programs
        </p>
      </div>

      <Card className="innovation-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Registration Form
          </CardTitle>
          <CardDescription>
            Register with your University Serial Number (USN) to access exclusive programs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="usn">University Serial Number (USN)*</Label>
                <Input
                  id="usn"
                  placeholder="e.g., 1AB21CS001"
                  value={formData.usn}
                  onChange={(e) => handleChange("usn", e.target.value)}
                  required
                  className="uppercase"
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
                  placeholder="your.email@example.com"
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
                <Label htmlFor="college">College Name*</Label>
                <Input
                  id="college"
                  placeholder="Your college name"
                  value={formData.college}
                  onChange={(e) => handleChange("college", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch">Branch*</Label>
                <Select onValueChange={(value) => handleChange("branch", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cse">Computer Science Engineering</SelectItem>
                    <SelectItem value="ece">Electronics & Communication</SelectItem>
                    <SelectItem value="me">Mechanical Engineering</SelectItem>
                    <SelectItem value="ee">Electrical Engineering</SelectItem>
                    <SelectItem value="cv">Civil Engineering</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester">Current Semester*</Label>
              <Select onValueChange={(value) => handleChange("semester", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select current semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      {sem} Semester
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests">Areas of Interest</Label>
              <Textarea
                id="interests"
                placeholder="Tell us about your interests in innovation, technology, entrepreneurship..."
                value={formData.interests}
                onChange={(e) => handleChange("interests", e.target.value)}
                rows={3}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              disabled={loading}
            >
              {loading ? "Registering..." : "Register for IDT Programs"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentRegistration;