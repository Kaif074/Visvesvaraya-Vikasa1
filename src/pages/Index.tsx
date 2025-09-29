import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, GraduationCap, Lightbulb, Target, Globe, BookOpen, Award } from "lucide-react";
import { Link } from "react-router-dom";
import vrifLogo from "@/assets/vrif-logo.jpg";
import eraLogo from "@/assets/era-logo.jpg";
import vcPhoto from "@/assets/vc-photo.jpg";
import ceoPhoto from "@/assets/ceo-photo.jpg";
import eraCeoPhoto from "@/assets/era-ceo-photo.jpg";
import vikasaLogo from "@/assets/visvesvaraya-vikasa-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section min-h-[70vh] flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="mb-8">
              <img 
                src={vikasaLogo} 
                alt="Visvesvaraya Vikasa Logo" 
                className="w-80 h-auto mx-auto mb-6"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Visvesvaraya Vikasa
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Innovation • Design • Technology Programs
            </p>
            <p className="text-lg mb-12 text-white/80 max-w-4xl mx-auto leading-relaxed">
              VTU's Visvesvaraya Research and Innovation Foundation (VRIF) in strategic partnership with ERA Foundation, 
              delivering Innovation, Design, and Technology (IDT) Programs across regional centres to strengthen the innovation ecosystem at the grassroots level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/student-registration">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Users className="h-5 w-5 mr-2" />
                  Student Registration
                </Button>
              </Link>
              <Link to="/faculty-registration">
                <Button size="lg" variant="secondary">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Faculty TOT Program
                </Button>
              </Link>
            </div>
            <div className="mt-6 text-center">
              <Link to="/auth">
                <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Sign In to Access Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/20"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-white/15"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-white/10"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-subtle-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              This partnership will greatly enhance the reach and impact of these programs to create a stronger pipeline of innovators and changemakers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="innovation-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Inspire Innovation</h3>
                <p className="text-muted-foreground">
                  Inspiring students to actively engage in innovation and design-led problem solving.
                </p>
              </CardContent>
            </Card>

            <Card className="innovation-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Build Awareness</h3>
                <p className="text-muted-foreground">
                  Build awareness about emerging opportunities in entrepreneurship and technology.
                </p>
              </CardContent>
            </Card>

            <Card className="innovation-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Global Participation</h3>
                <p className="text-muted-foreground">
                  Encourage participation in national and global innovation platforms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Messages */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Leadership Messages</h2>
            <p className="text-lg text-muted-foreground">
              Words from our distinguished leaders
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Chairman Message */}
            <Card className="leadership-card">
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                  <img src={vcPhoto} alt="Dr. Vidyashankar S" className="w-full h-full object-cover" />
                </div>
                <CardTitle className="text-xl text-foreground">Dr. Vidyashankar S</CardTitle>
                <CardDescription className="text-base">
                  Chairman, VRIF & Vice Chancellor, VTU
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl text-primary mb-4">"</div>
                <p className="text-muted-foreground leading-relaxed italic">
                  Innovation is not just about creating new technologies; it's about fostering a mindset that embraces change, 
                  challenges conventions, and seeks solutions to real-world problems. Through Visvesvaraya Vikasa, 
                  we are committed to nurturing the next generation of innovators who will shape the future of technology and society. 
                  Our partnership with ERA Foundation amplifies our reach and impact, creating an ecosystem where ideas flourish and dreams take flight.
                </p>
                <div className="flex items-center justify-end mt-4">
                  <Badge variant="outline" className="bg-primary/5">Chairman, VRIF</Badge>
                </div>
              </CardContent>
            </Card>

            {/* CEO Message */}
            <Card className="leadership-card">
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-secondary/20">
                  <img src={ceoPhoto} alt="Mr. Santosh Ittanagi" className="w-full h-full object-cover" />
                </div>
                <CardTitle className="text-xl text-foreground">Mr. Santosh Ittanagi</CardTitle>
                <CardDescription className="text-base">
                  CEO, VRIF
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl text-secondary mb-4">"</div>
                <p className="text-muted-foreground leading-relaxed italic">
                  At VRIF, we believe that every student has the potential to be an innovator and changemaker. 
                  Our collaboration with ERA Foundation through Visvesvaraya Vikasa represents a paradigm shift 
                  in how we approach innovation education. We are not just teaching concepts; we are building capabilities, 
                  fostering entrepreneurial thinking, and creating pathways for students to transform their ideas into impactful solutions 
                  that benefit society at large.
                </p>
                <div className="flex items-center justify-end mt-4">
                  <Badge variant="outline" className="bg-secondary/5">CEO, VRIF</Badge>
                </div>
              </CardContent>
            </Card>

            {/* ERA CEO Message */}
            <Card className="leadership-card">
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-accent/20">
                  <img src={eraCeoPhoto} alt="Mr. Muralidhar Ponnaluri" className="w-full h-full object-cover" />
                </div>
                <CardTitle className="text-xl text-foreground">Mr. Muralidhar Ponnaluri</CardTitle>
                <CardDescription className="text-base">
                  CEO, ERA Foundation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl text-accent mb-4">"</div>
                <p className="text-muted-foreground leading-relaxed italic">
                  ERA Foundation is proud to partner with VRIF in this transformative initiative. 
                  Innovation and entrepreneurship are the cornerstones of economic growth and social progress. 
                  Through Visvesvaraya Vikasa, we are creating a comprehensive ecosystem that not only educates 
                  but also empowers students to become job creators rather than job seekers. 
                  This partnership exemplifies our commitment to building a self-reliant and innovative India.
                </p>
                <div className="flex items-center justify-end mt-4">
                  <Badge variant="outline" className="bg-accent/5">CEO, ERA Foundation</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-16 bg-card-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Strategic Partnership</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The collaboration between VTU's VRIF and ERA Foundation brings together academic excellence 
              and industry expertise to deliver world-class innovation programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <Card className="text-center p-8 innovation-card">
              <div className="w-32 h-32 mx-auto mb-6 p-6 bg-white rounded-2xl shadow-card">
                <img src={vrifLogo} alt="VRIF Logo" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Visvesvaraya Research and Innovation Foundation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                VTU's premier research and innovation arm, dedicated to fostering cutting-edge research, 
                innovation, and entrepreneurship among students and faculty across Karnataka.
              </p>
            </Card>

            <Card className="text-center p-8 innovation-card">
              <div className="w-32 h-32 mx-auto mb-6 p-6 bg-white rounded-2xl shadow-card">
                <img src={eraLogo} alt="ERA Foundation Logo" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                ERA Foundation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A leading foundation committed to educational advancement and innovation, 
                bringing extensive experience in developing and implementing transformative educational programs.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 hero-section">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Join the Innovation Revolution
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Be part of India's largest innovation and entrepreneurship ecosystem. 
              Register today and transform your ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/programs">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  <BookOpen className="h-5 w-5 mr-2" />
                  View Programs
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/project-gallery">
                <Button size="lg" variant="secondary">
                  <Award className="h-5 w-5 mr-2" />
                  Project Gallery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;