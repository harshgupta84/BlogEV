import React from 'react'

import Editor from './Editor'
import { Toaster } from "@/components/ui/toaster";  
import { ToastProvider } from '@radix-ui/react-toast';

const CreateBlog = () => {
  return (
    <div>
        
        <div className="mt-24">
          <ToastProvider> {/* Wrapping with ToastProvider */}
          <Editor />
          <Toaster /> {/* This will render all the toast notifications */}
          </ToastProvider>
        </div> 
       
    </div>

  ) 
}

export default CreateBlog