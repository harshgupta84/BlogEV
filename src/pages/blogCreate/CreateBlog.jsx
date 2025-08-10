import React, { useState } from "react";
import useBlogStore from "@/store/blogStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import MarkdownEditor from "./MarkdownEditor";
import useCreateBlogStore from "@/store/createBlogStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, FileText, ArrowLeft, CheckCircle } from "lucide-react";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

function CreateBlog() {
  const { content, title, topics, createBlog, loading, error, resetForm } = useCreateBlogStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title to your blog before saving.",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please add some content to your blog before saving.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createBlog({ title, content, topics });
      setIsSaved(true);
      toast({
        title: "Blog saved successfully!",
        description: `"${title}" has been saved to your blogs.`,
      });
      
      // Navigate after a short delay to show success state
      setTimeout(() => {
        navigate("/blog/myblogs");
      }, 1500);
    } catch (err) {
      toast({
        title: "Failed to save blog",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDiscard = () => {
    if (title || content) {
      if (window.confirm('Are you sure you want to discard your changes?')) {
        resetForm();
        navigate('/blog/myblogs');
      }
    } else {
      navigate('/blog/myblogs');
    }
  };

  if (isSaved) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 flex items-center justify-center">
        <DotPattern className={cn(
          "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )} />
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Blog Saved!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your blog has been successfully saved.
          </p>
          <div className="animate-pulse text-blue-600 dark:text-blue-400">
            Redirecting to your blogs...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <DotPattern className={cn(
        "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
      )} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={handleDiscard}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Create New Blog
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleDiscard}
                  disabled={loading}
                >
                  Discard
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={loading || !title.trim() || !content.trim()}
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Blog
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="container mx-auto px-4 pt-4">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Editor */}
        <div className="container mx-auto px-4 py-6">
          <Card className="shadow-lg">
            <CardContent className="p-0">
              <MarkdownEditor
                onSubmit={handleSave}
                buttonText="Save Blog"
                showHeader={false}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;


