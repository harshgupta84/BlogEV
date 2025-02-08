import React, { useState } from "react";
import useBlogStore from "@/store/blogStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import MarkdownEditor from "./MarkdownEditor";
import useCreateBlogStore from "@/store/createBlogStore";

function CreateBlog() {
  const {content,title,topics,createBlog} = useCreateBlogStore()
  const toast = useToast();
  const navigate = useNavigate();


  const handleSave = async() => {
    
    await createBlog({title, content,topics});
    navigate("/blog/myblogs");
    toast({
      title: `Blog "${title}" saved successfully!`,
      description: "Your blog has been saved to the system.",
    });

   
  };

  return (
    <div className="mt-24">
      <MarkdownEditor
        onSubmit={handleSave}
        buttonText="Save Blog"
      />
    </div>
  );
}

export default CreateBlog;


