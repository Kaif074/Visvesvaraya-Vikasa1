-- Create students table
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  address TEXT NOT NULL,
  qualification TEXT NOT NULL,
  course_applied TEXT NOT NULL,
  emergency_contact_name TEXT NOT NULL,
  emergency_contact_number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create faculty table
CREATE TABLE public.faculty (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  address TEXT NOT NULL,
  qualification TEXT NOT NULL,
  specialization TEXT NOT NULL,
  experience_years INTEGER NOT NULL,
  previous_institution TEXT,
  subjects_to_teach TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create programs table
CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  program_date DATE NOT NULL,
  program_time TIME NOT NULL,
  location TEXT NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 50,
  registered_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  program_type TEXT NOT NULL CHECK (program_type IN ('workshop', 'seminar', 'training', 'certification')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create program registrations table
CREATE TABLE public.program_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  registration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'cancelled')),
  UNIQUE(program_id, user_id)
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  project_url TEXT,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  faculty_supervisor UUID REFERENCES public.faculty(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'ongoing' CHECK (status IN ('ongoing', 'completed', 'archived')),
  start_date DATE NOT NULL,
  end_date DATE,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create activities table
CREATE TABLE public.activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  activity_date DATE NOT NULL,
  activity_time TIME NOT NULL,
  location TEXT NOT NULL,
  organizer TEXT NOT NULL,
  max_participants INTEGER,
  registered_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  activity_type TEXT NOT NULL CHECK (activity_type IN ('workshop', 'seminar', 'cultural', 'sports', 'technical')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create activity registrations table
CREATE TABLE public.activity_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  registration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'cancelled')),
  UNIQUE(activity_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for students
CREATE POLICY "Users can view their own student record" ON public.students FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own student record" ON public.students FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own student record" ON public.students FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for faculty
CREATE POLICY "Users can view their own faculty record" ON public.faculty FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own faculty record" ON public.faculty FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own faculty record" ON public.faculty FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for programs (public read, admin write)
CREATE POLICY "Anyone can view programs" ON public.programs FOR SELECT USING (true);

-- RLS Policies for program registrations
CREATE POLICY "Users can view their own registrations" ON public.program_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can register for programs" ON public.program_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own registrations" ON public.program_registrations FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for projects
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Students can insert their own projects" ON public.projects FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.students WHERE user_id = auth.uid() AND id = student_id)
);
CREATE POLICY "Students can update their own projects" ON public.projects FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.students WHERE user_id = auth.uid() AND id = student_id)
);

-- RLS Policies for activities (public read)
CREATE POLICY "Anyone can view activities" ON public.activities FOR SELECT USING (true);

-- RLS Policies for activity registrations
CREATE POLICY "Users can view their own activity registrations" ON public.activity_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can register for activities" ON public.activity_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own activity registrations" ON public.activity_registrations FOR UPDATE USING (auth.uid() = user_id);

-- Create triggers for updated_at columns
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faculty_updated_at BEFORE UPDATE ON public.faculty FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample programs data
INSERT INTO public.programs (title, description, program_date, program_time, location, capacity, program_type) VALUES
('Web Development Bootcamp', 'Comprehensive training on modern web development technologies including React, Node.js, and databases.', '2024-02-15', '09:00:00', 'Computer Lab A', 30, 'training'),
('AI & Machine Learning Workshop', 'Introduction to artificial intelligence and machine learning concepts with hands-on projects.', '2024-02-20', '10:00:00', 'Conference Hall', 50, 'workshop'),
('Digital Marketing Certification', 'Complete certification program covering SEO, social media marketing, and analytics.', '2024-02-25', '14:00:00', 'Seminar Hall', 40, 'certification'),
('Entrepreneurship Seminar', 'Learn about starting and managing successful businesses from industry experts.', '2024-03-01', '11:00:00', 'Auditorium', 100, 'seminar');

-- Insert sample activities data
INSERT INTO public.activities (title, description, activity_date, activity_time, location, organizer, max_participants, activity_type) VALUES
('Tech Talk: Future of AI', 'Interactive session with AI researchers discussing the future of artificial intelligence.', '2024-02-18', '15:00:00', 'Auditorium', 'Computer Science Department', 80, 'technical'),
('Cultural Festival 2024', 'Annual cultural celebration featuring music, dance, and art performances.', '2024-02-22', '18:00:00', 'Main Campus Ground', 'Student Council', 200, 'cultural'),
('Coding Competition', 'Inter-college programming competition with exciting prizes.', '2024-02-28', '09:00:00', 'Computer Lab B', 'Programming Club', 50, 'technical'),
('Sports Day', 'Annual sports event with various competitions and activities.', '2024-03-05', '08:00:00', 'Sports Complex', 'Sports Committee', 150, 'sports');