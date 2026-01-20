-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create site_content table for editable text content
CREATE TABLE public.site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT NOT NULL UNIQUE,
    title TEXT,
    subtitle TEXT,
    description TEXT,
    content JSONB DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Everyone can read site content
CREATE POLICY "Anyone can read site content"
ON public.site_content
FOR SELECT
USING (true);

-- Only admins can modify site content
CREATE POLICY "Admins can update site content"
ON public.site_content
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert site content"
ON public.site_content
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site content"
ON public.site_content
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create site_images table for uploaded images
CREATE TABLE public.site_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT NOT NULL,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on site_images
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

-- Everyone can read site images
CREATE POLICY "Anyone can read site images"
ON public.site_images
FOR SELECT
USING (true);

-- Only admins can manage site images
CREATE POLICY "Admins can insert site images"
ON public.site_images
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site images"
ON public.site_images
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site images"
ON public.site_images
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for site images
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true);

-- Storage policies for site images bucket
CREATE POLICY "Anyone can view site images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'site-images');

CREATE POLICY "Admins can upload site images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'site-images' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update site images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'site-images' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete site images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'site-images' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for site_content
CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content for each section
INSERT INTO public.site_content (section_key, title, subtitle, description, content) VALUES
('hero_slide_1', 'Digital Innovation Starts Here', NULL, 'Empowering businesses with cutting-edge technology solutions that drive growth, efficiency, and success in the digital age.', '{"buttonText": "Start Your Digital Journey", "buttonLink": "#services"}'),
('hero_slide_2', 'Modern Office Spaces', 'Our Workspace', 'State-of-the-art facilities designed for innovation and collaboration.', '{}'),
('hero_slide_3', 'Tech Excellence', 'Past Events', 'Join our community of innovators and industry leaders.', '{}'),
('services_intro', 'Our Services', 'Comprehensive Technology Solutions', 'We offer a wide range of services designed to help your business thrive in the digital landscape.', '{}'),
('about_intro', 'About Quatrix Tech', NULL, 'Your Trusted Partner in Digital Excellence', '{}'),
('contact_intro', 'Get in Touch', NULL, 'Ready to transform your business? Let''s start a conversation about how we can help you achieve your digital goals.', '{}'),
('tech_training_intro', 'Tech Training Programs', 'Invest in Your Team''s Future', 'Our comprehensive technology training programs are designed to upskill your workforce and keep them ahead of the curve in today''s rapidly evolving digital landscape.', '{}');