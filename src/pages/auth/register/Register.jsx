import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import useAuthStore from '@/store/authStore'; // Import the Zustand store
import axios from 'axios';
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import { useNavigate } from 'react-router-dom';
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';

function Register() {
  const {
    email,
    password,
    confirmPassword,
    name,
    image,
    loading,
    selectedTopics,
    error,
    setEmail,
    setPassword,
    setConfirmPassword,
    setName,
    setImage,
    addTopic,
    removeTopic,
    setError,
    setLoading,
    registerUser,
  } = useAuthStore();

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  // Dummy list of topics
  const topics = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Science', label: 'Science' },
    { value: 'Business', label: 'Business' },
    { value: 'Design', label: 'Design' },
    { value: 'Music', label: 'Music' },
    { value: 'Sports', label: 'Sports' },
  ];

  const handleSelectTopic = (topic) => {
    if (!selectedTopics.includes(topic)) {
      addTopic(topic);
    }
    setValue(''); // Reset combobox value
    setOpen(false); // Close the dropdown
  };

  const postDetails = async (pics) => {
 
      try {
        const formData = new FormData();
        formData.append("file", pics);
        formData.append("upload_preset", "codezipper");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dimugtqll/image/upload",
          formData
        );

        setImage(response.data.public_id);
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Image upload failed. Please try again.");
      }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError('');
    setLoading(true);
    await registerUser();
    setLoading(false);
    navigate('/auth/verify-email');
     // Call the registerUser function from the store
  };
  if(loading===true){
    return(
    <div className="flex justify-center items-center min-h-screen mt-20">
      <DotPattern className={cn(
                      "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
                    )}
                  />
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-5xl md:text-6xl max-w-3xl text-center font-regular">
          <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Register Info
          </span>
        </h1>
        <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-6 w-1/2 mb-4 rounded-md"></div>
              <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-12 w-full mb-4 rounded-md"></div>
              <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-6 w-1/2 mb-4 rounded-md"></div>
              <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-12 w-full mb-4 rounded-md"></div>
              <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-6 w-1/2 mb-4 rounded-md"></div>
              <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-12 w-full mb-4 rounded-md"></div>
        </div>
        </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen mt-20">
      <DotPattern className={cn(
                      "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
                    )}
                  />
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-5xl md:text-6xl max-w-3xl text-center font-regular mb-9">
          <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Register Info
          </span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-3 text-lg">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-4 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 text-lg"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-3 text-lg">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-4 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 text-lg"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirm-password" className="block text-gray-700 dark:text-gray-300 mb-3 text-lg">
              Confirm Password
            </label>
            <Input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full p-4 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 text-lg"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-800 dark:text-white font-semibold mb-2">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
            />
          </div>

          {/* Profile Picture Upload */}
          <div className="text-center">
            <label htmlFor="profile-picture" className="block text-gray-800 dark:text-white font-semibold mb-2">
              Profile Picture
            </label>
            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              onChange={(e)=>postDetails(e.target.files[0])}
              className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            />
            <div className="mt-10 w-48 h-48">
              {image && (
                <CloudinaryContext cloudName="dimugtqll">
                  <Image publicId={image} width="200">
                    <Transformation height="200" width="200" crop="thumb" />
                  </Image>
                </CloudinaryContext>
              )}
            </div>
          </div>

          {/* Topic Selector */}
          <div className="w-full max-w-sm mx-auto">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value
                    ? topics.find((topic) => topic.value === value)?.label || 'Select topic...'
                    : 'Select topic...'}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search topic..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No topic found.</CommandEmpty>
                    <CommandGroup>
                      {topics.map((topic) => (
                        <CommandItem
                          key={topic.value}
                          value={topic.value}
                          onSelect={() => handleSelectTopic(topic.value)}
                        >
                          {topic.label}
                          <Check
                            className={`ml-auto ${
                              selectedTopics.includes(topic.value) ? 'opacity-100' : 'opacity-0'
                            }`}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Display Selected Topics */}
            <div className="space-x-2 mt-4 flex flex-wrap justify-center">
              {selectedTopics.map((topic, index) => (
                <Badge
                  key={index}
                  className="flex items-center bg-blue-500 text-white p-2 rounded-md"
                >
                  {topic}
                  <button
                    onClick={() => removeTopic(topic)}
                    className="ml-2 text-xs text-gray-300 hover:text-white"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="w-full py-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            >
              Register
            </Button>
          </div>
        </form>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
            Have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/auth/login')}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Login here
            </button>
          </p>
          
      </div>
      
    </div>
  );
}

export default Register;