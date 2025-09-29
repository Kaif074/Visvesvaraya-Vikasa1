export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          activity_date: string
          activity_time: string
          activity_type: string
          created_at: string
          description: string
          id: string
          location: string
          max_participants: number | null
          organizer: string
          registered_count: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          activity_date: string
          activity_time: string
          activity_type: string
          created_at?: string
          description: string
          id?: string
          location: string
          max_participants?: number | null
          organizer: string
          registered_count?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          activity_date?: string
          activity_time?: string
          activity_type?: string
          created_at?: string
          description?: string
          id?: string
          location?: string
          max_participants?: number | null
          organizer?: string
          registered_count?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      activity_registrations: {
        Row: {
          activity_id: string
          id: string
          registration_date: string
          status: string
          student_id: string | null
          user_id: string
        }
        Insert: {
          activity_id: string
          id?: string
          registration_date?: string
          status?: string
          student_id?: string | null
          user_id: string
        }
        Update: {
          activity_id?: string
          id?: string
          registration_date?: string
          status?: string
          student_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_registrations_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_registrations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      faculty: {
        Row: {
          address: string
          created_at: string
          date_of_birth: string
          email: string
          experience_years: number
          full_name: string
          gender: string
          id: string
          mobile_number: string
          previous_institution: string | null
          qualification: string
          specialization: string
          subjects_to_teach: string[]
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          created_at?: string
          date_of_birth: string
          email: string
          experience_years: number
          full_name: string
          gender: string
          id?: string
          mobile_number: string
          previous_institution?: string | null
          qualification: string
          specialization: string
          subjects_to_teach: string[]
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          created_at?: string
          date_of_birth?: string
          email?: string
          experience_years?: number
          full_name?: string
          gender?: string
          id?: string
          mobile_number?: string
          previous_institution?: string | null
          qualification?: string
          specialization?: string
          subjects_to_teach?: string[]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      program_registrations: {
        Row: {
          id: string
          program_id: string
          registration_date: string
          status: string
          student_id: string | null
          user_id: string
        }
        Insert: {
          id?: string
          program_id: string
          registration_date?: string
          status?: string
          student_id?: string | null
          user_id: string
        }
        Update: {
          id?: string
          program_id?: string
          registration_date?: string
          status?: string
          student_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_registrations_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_registrations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          capacity: number
          created_at: string
          description: string
          id: string
          location: string
          program_date: string
          program_time: string
          program_type: string
          registered_count: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          capacity?: number
          created_at?: string
          description: string
          id?: string
          location: string
          program_date: string
          program_time: string
          program_type: string
          registered_count?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          capacity?: number
          created_at?: string
          description?: string
          id?: string
          location?: string
          program_date?: string
          program_time?: string
          program_type?: string
          registered_count?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string
          end_date: string | null
          faculty_supervisor: string | null
          id: string
          image_url: string | null
          project_url: string | null
          start_date: string
          status: string
          student_id: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          end_date?: string | null
          faculty_supervisor?: string | null
          id?: string
          image_url?: string | null
          project_url?: string | null
          start_date: string
          status?: string
          student_id?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          end_date?: string | null
          faculty_supervisor?: string | null
          id?: string
          image_url?: string | null
          project_url?: string | null
          start_date?: string
          status?: string
          student_id?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_faculty_supervisor_fkey"
            columns: ["faculty_supervisor"]
            isOneToOne: false
            referencedRelation: "faculty"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          address: string
          course_applied: string
          created_at: string
          date_of_birth: string
          email: string
          emergency_contact_name: string
          emergency_contact_number: string
          full_name: string
          gender: string
          id: string
          mobile_number: string
          qualification: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          course_applied: string
          created_at?: string
          date_of_birth: string
          email: string
          emergency_contact_name: string
          emergency_contact_number: string
          full_name: string
          gender: string
          id?: string
          mobile_number: string
          qualification: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          course_applied?: string
          created_at?: string
          date_of_birth?: string
          email?: string
          emergency_contact_name?: string
          emergency_contact_number?: string
          full_name?: string
          gender?: string
          id?: string
          mobile_number?: string
          qualification?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
