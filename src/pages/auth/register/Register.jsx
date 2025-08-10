import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, ChevronsUpDown, Eye, EyeOff, Upload, X, CheckCircle, AlertCircle, User, Mail, Lock, Camera, Tags, Loader2 } from 'lucide-react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import useAuthStore from '@/store/authStore';
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [validations, setValidations] = useState({
    email: false,
    password: false,
    passwordMatch: false,
    name: false
  });

  const topics = [
    { value: 'Technology', label: 'Technology', icon: '💻' },
    { value: 'Science', label: 'Science', icon: '🔬' },
    { value: 'Business', label: 'Business', icon: '💼' },
    { value: 'Design', label: 'Design', icon: '🎨' },
    { value: 'Music', label: 'Music', icon: '🎵' },
    { value: 'Sports', label: 'Sports', icon: '⚽' },
    { value: 'Travel', label: 'Travel', icon: '✈️' },
    { value: 'Food', label: 'Food', icon: '🍔' },
    { value: 'Health', label: 'Health', icon: '💪' },
    { value: 'Education', label: 'Education', icon: '📚' },
  ];

  const checkPasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength += 1;
    if (/[A-Z]/.test(pwd)) strength += 1;
    if (/[a-z]/.test(pwd)) strength += 1;
    if (/[0-9]/.test(pwd)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 1;
    return strength;
  };

  const validateForm = () => {
    const newValidations = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      password: password.length >= 8 && checkPasswordStrength(password) >= 3,
      passwordMatch: password === confirmPassword && password.length > 0,
      name: name.trim().length >= 2
    };
    setValidations(newValidations);
    return newValidations;
  };

  React.useEffect(() => {
    validateForm();
    setPasswordStrength(checkPasswordStrength(password));
  }, [email, password, confirmPassword, name]);

  const handleSelectTopic = (topic) => {
    if (!selectedTopics.includes(topic)) {
      addTopic(topic);
    }
    setValue(''); // Reset combobox value
    setOpen(false); // Close the dropdown
  };

  const postDetails = async (pics) => {
    if (!pics) return;
    
    setUploadingImage(true);
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
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResults = validateForm();
    
    if (!Object.values(validationResults).every(Boolean)) {
      setError('Please fix all validation errors before proceeding');
      return;
    }
    
    setError('');
    const result = await registerUser();
    if (result !== false) {
      navigate('/auth/verify-email');
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      const { email: emailValid, password: passwordValid, passwordMatch } = validateForm();
      if (emailValid && passwordValid && passwordMatch) {
        setCurrentStep(2);
      } else {
        setError('Please complete all required fields correctly');
      }
    } else if (currentStep === 2) {
      if (validations.name) {
        setCurrentStep(3);
      } else {
        setError('Please enter a valid name');
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <DotPattern className={cn(
          "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )} />
        <div className="p-8 rounded-xl shadow-2xl w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Creating Your Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please wait while we set up your account...
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Validating information</span>
              </div>
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                <span className="text-sm text-gray-600">Creating account</span>
              </div>
              <div className="flex items-center space-x-3 opacity-50">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                <span className="text-sm text-gray-400">Sending verification email</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getStepIcon = (step) => {
    if (step === 1) return <Mail className="w-5 h-5" />;
    if (step === 2) return <User className="w-5 h-5" />;
    if (step === 3) return <Tags className="w-5 h-5" />;
  };

  const getStepTitle = (step) => {
    if (step === 1) return "Account Details";
    if (step === 2) return "Personal Info";
    if (step === 3) return "Interests";
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <DotPattern className={cn(
        "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
      )} />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Join BlogEV
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your account to start blogging
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                  currentStep >= step 
                    ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg" 
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                )}>
                  {currentStep > step ? <Check className="w-5 h-5" /> : getStepIcon(step)}
                </div>
                <span className={cn(
                  "text-xs mt-2 transition-colors duration-300",
                  currentStep >= step ? "text-blue-600 font-medium" : "text-gray-400"
                )}>
                  {getStepTitle(step)}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Account Details */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-10 duration-300">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={cn(
                        "w-full pl-10 pr-10 py-3 border rounded-lg transition-all duration-200",
                        validations.email 
                          ? "border-green-500 focus:ring-green-500" 
                          : email ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                      )}
                      required
                    />
                    {email && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {validations.email ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {email && !validations.email && (
                    <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={cn(
                        "w-full pl-10 pr-10 py-3 border rounded-lg transition-all duration-200",
                        validations.password 
                          ? "border-green-500 focus:ring-green-500" 
                          : password ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                      )}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Password Strength</span>
                        <span>{passwordStrength}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            passwordStrength <= 2 ? "bg-red-500" : 
                            passwordStrength <= 3 ? "bg-yellow-500" : "bg-green-500"
                          )}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className={cn(
                        "w-full pl-10 pr-10 py-3 border rounded-lg transition-all duration-200",
                        validations.passwordMatch 
                          ? "border-green-500 focus:ring-green-500" 
                          : confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                      )}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {confirmPassword && !validations.passwordMatch && (
                    <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Personal Info */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-10 duration-300">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className={cn(
                        "w-full pl-10 pr-10 py-3 border rounded-lg transition-all duration-200",
                        validations.name 
                          ? "border-green-500 focus:ring-green-500" 
                          : name ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                      )}
                      required
                    />
                    {name && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {validations.name ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {name && !validations.name && (
                    <p className="text-red-500 text-sm mt-1">Name must be at least 2 characters long</p>
                  )}
                </div>

                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Profile Picture (Optional)
                  </label>
                  
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-600 shadow-lg">
                        {image && image !== 'https://t3.ftcdn.net/jpg/09/64/89/20/240_F_964892089_vioRltmAxaoQEBLtYtChVBxIzDWwhA3T.jpg' ? (
                          <CloudinaryContext cloudName="dimugtqll">
                            <Image publicId={image} width="128" height="128">
                              <Transformation height="128" width="128" crop="thumb" gravity="face" />
                            </Image>
                          </CloudinaryContext>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
                            <User className="w-16 h-16 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <label htmlFor="profile-picture" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        {uploadingImage ? (
                          <Loader2 className="w-6 h-6 text-white animate-spin" />
                        ) : (
                          <Camera className="w-6 h-6 text-white" />
                        )}
                      </label>
                    </div>
                    
                    <input
                      id="profile-picture"
                      type="file"
                      accept="image/*"
                      onChange={(e) => postDetails(e.target.files[0])}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('profile-picture').click()}
                      disabled={uploadingImage}
                      className="flex items-center space-x-2"
                    >
                      {uploadingImage ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Choose Photo</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Interests */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-10 duration-300">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Choose Your Interests (Optional)
                  </label>
                  <p className="text-gray-500 text-sm mb-4">
                    Select topics you're interested in to personalize your feed
                  </p>
                  
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between h-12"
                      >
                        <div className="flex items-center space-x-2">
                          <Tags className="w-4 h-4 text-gray-400" />
                          <span>{selectedTopics.length > 0 ? `${selectedTopics.length} topics selected` : 'Select topics...'}</span>
                        </div>
                        <ChevronsUpDown className="w-4 h-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search topics..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>No topic found.</CommandEmpty>
                          <CommandGroup>
                            {topics.map((topic) => (
                              <CommandItem
                                key={topic.value}
                                value={topic.value}
                                onSelect={() => handleSelectTopic(topic.value)}
                                className="flex items-center justify-between cursor-pointer"
                              >
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg">{topic.icon}</span>
                                  <span>{topic.label}</span>
                                </div>
                                <Check
                                  className={cn(
                                    "w-4 h-4",
                                    selectedTopics.includes(topic.value) ? 'opacity-100 text-green-500' : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {/* Display Selected Topics */}
                  {selectedTopics.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Topics:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedTopics.map((topic, index) => {
                          const topicData = topics.find(t => t.value === topic);
                          return (
                            <Badge
                              key={index}
                              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-1 rounded-full hover:shadow-lg transition-all duration-200"
                            >
                              <span>{topicData?.icon}</span>
                              <span>{topic}</span>
                              <button
                                onClick={() => removeTopic(topic)}
                                className="ml-1 hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-600 dark:text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center space-x-2"
                >
                  <span>← Previous</span>
                </Button>
              )}
              
              <div className="ml-auto">
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Next →
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/auth/login')}
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;