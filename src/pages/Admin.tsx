import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Save, Upload, Trash2, Image as ImageIcon, Home, FileText, Users, Phone, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SiteContent {
  id: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  content: Json | null;
}

interface SiteImage {
  id: string;
  section_key: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
}

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [contents, setContents] = useState<SiteContent[]>([]);
  const [images, setImages] = useState<SiteImage[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchContent();
      fetchImages();
    }
  }, [user, isAdmin]);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .order('section_key');
    
    if (error) {
      console.error('Error fetching content:', error);
    } else {
      setContents(data || []);
    }
  };

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('site_images')
      .select('*')
      .order('section_key, display_order');
    
    if (error) {
      console.error('Error fetching images:', error);
    } else {
      setImages(data || []);
    }
  };

  const handleContentChange = (id: string, field: keyof SiteContent, value: string) => {
    setContents(prev => prev.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const saveContent = async (content: SiteContent) => {
    setIsSaving(true);
    const { error } = await supabase
      .from('site_content')
      .update({
        title: content.title,
        subtitle: content.subtitle,
        description: content.description,
        content: content.content,
        updated_by: user?.id
      })
      .eq('id', content.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to save content. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Saved!',
        description: 'Content has been updated successfully.',
      });
    }
    setIsSaving(false);
  };

  const handleImageUpload = async (sectionKey: string, file: File) => {
    setIsUploading(true);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${sectionKey}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('site-images')
      .upload(fileName, file);

    if (uploadError) {
      toast({
        title: 'Upload Failed',
        description: uploadError.message,
        variant: 'destructive',
      });
      setIsUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('site-images')
      .getPublicUrl(fileName);

    const { error: dbError } = await supabase
      .from('site_images')
      .insert({
        section_key: sectionKey,
        image_url: publicUrl,
        alt_text: file.name,
        updated_by: user?.id
      });

    if (dbError) {
      toast({
        title: 'Error',
        description: 'Failed to save image reference.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Uploaded!',
        description: 'Image has been uploaded successfully.',
      });
      fetchImages();
    }
    setIsUploading(false);
  };

  const deleteImage = async (image: SiteImage) => {
    const fileName = image.image_url.split('/').pop();
    
    if (fileName) {
      await supabase.storage
        .from('site-images')
        .remove([`${image.section_key}/${fileName}`]);
    }

    const { error } = await supabase
      .from('site_images')
      .delete()
      .eq('id', image.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete image.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Deleted!',
        description: 'Image has been removed.',
      });
      fetchImages();
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const getSectionIcon = (key: string) => {
    if (key.includes('hero')) return <Home className="w-4 h-4" />;
    if (key.includes('services')) return <FileText className="w-4 h-4" />;
    if (key.includes('about')) return <Users className="w-4 h-4" />;
    if (key.includes('contact')) return <Phone className="w-4 h-4" />;
    if (key.includes('training')) return <GraduationCap className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const formatSectionName = (key: string) => {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold text-primary">
              Quatrix Tech
            </Link>
            <span className="text-sm text-muted-foreground">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Content Management</h1>
          <p className="text-muted-foreground mb-8">Edit text and images for your website sections</p>

          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="content">
                <FileText className="w-4 h-4 mr-2" />
                Text Content
              </TabsTrigger>
              <TabsTrigger value="images">
                <ImageIcon className="w-4 h-4 mr-2" />
                Images
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              {contents.map((content) => (
                <Card key={content.id} className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {getSectionIcon(content.section_key)}
                      {formatSectionName(content.section_key)}
                    </CardTitle>
                    <CardDescription>
                      Edit the content for this section
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={content.title || ''}
                          onChange={(e) => handleContentChange(content.id, 'title', e.target.value)}
                          placeholder="Section title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Subtitle</Label>
                        <Input
                          value={content.subtitle || ''}
                          onChange={(e) => handleContentChange(content.id, 'subtitle', e.target.value)}
                          placeholder="Section subtitle"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={content.description || ''}
                        onChange={(e) => handleContentChange(content.id, 'description', e.target.value)}
                        placeholder="Section description"
                        rows={3}
                      />
                    </div>
                    <Button 
                      onClick={() => saveContent(content)}
                      disabled={isSaving}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="images" className="space-y-6">
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle>Upload New Image</CardTitle>
                  <CardDescription>
                    Upload images to use across your website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Section</Label>
                      <select 
                        id="section-select"
                        className="w-full p-2 border rounded-md bg-background"
                        defaultValue="hero"
                      >
                        <option value="hero">Hero Section</option>
                        <option value="services">Services</option>
                        <option value="about">About</option>
                        <option value="contact">Contact</option>
                        <option value="tech_training">Tech Training</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Image File</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          const section = (document.getElementById('section-select') as HTMLSelectElement)?.value;
                          if (file && section) {
                            handleImageUpload(section, file);
                          }
                        }}
                        disabled={isUploading}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {images.map((image) => (
                  <Card key={image.id} className="overflow-hidden border-primary/10">
                    <div className="aspect-video relative">
                      <img 
                        src={image.image_url} 
                        alt={image.alt_text || 'Site image'}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{formatSectionName(image.section_key)}</p>
                          <p className="text-xs text-muted-foreground">{image.alt_text}</p>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteImage(image)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {images.length === 0 && (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No images uploaded yet</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Admin;
