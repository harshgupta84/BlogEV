// UpdateBlog.jsx
import React, { useEffect } from "react";
import MarkdownEditor from "../blogCreate/MarkdownEditor";
import useBlogStore from "@/store/blogStore";
import useCreateBlogStore from "@/store/createBlogStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const { id } = useParams();
  const { currentBlog } = useBlogStore();
  const {
    content,
    title,
    topics,
    setTopics,
    setTitle,
    setContent,
    updateBlog,
  } = useCreateBlogStore();

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentBlog) {
      setContent(currentBlog.content);
      setTitle(currentBlog.title);
      setTopics(currentBlog.topics || []);
    }
  }, [currentBlog, setContent, setTitle, setTopics]);

  const handleUpdate = async () => {
    try {
      const updatedBlog = {
        title,
        content,
        topics,
      };

      await updateBlog(id, updatedBlog);
      navigate("/blog/myblogs");
      toast({
        title: "Blog updated successfully!",
        description: `Your blog "${title}" has been updated.`,
      });

      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!currentBlog) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">Blog Not Found</h1>
        <p className="mt-4">The blog you're trying to update doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="mt-24">
      <MarkdownEditor
        onSubmit={handleUpdate}
        buttonText="Update Blog"
      />
    </div>
  );
}

export default UpdateBlog;