import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import useLoginStore from '@/store/loginStore';
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader2, KeyRound, Shield } from 'lucide-react';

function ResetPass() {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [focusedField, setFocusedField] = useState(null);
 
  const { resetPassword, error, loading, password, setPassword } = useLoginStore();
  const navigate = useNavigate();

  const checkPasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength += 1;
    if (/[A-Z]/.test(pwd)) strength += 1;
    if (/[a-z]/.test(pwd)) strength += 1;
    if (/[0-9]/.test(pwd)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 1;
    return strength;
  };

  React.useEffect(() => {
    setPasswordStrength(checkPasswordStrength(password));
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    if (passwordStrength < 3) {
      return;
    }
    const result = await resetPassword();
    if (result) {
      navigate('/auth/login');
    }
  };

  const isFormValid = password === confirmPassword && password.length >= 8 && passwordStrength >= 3;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <DotPattern
        className={cn(
          'inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]'
        )}
      />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Create New Password
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your new password must be different from previously used passwords
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <div className="relative">
                <Lock className={cn(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200",
                  focusedField === 'password' ? "text-blue-500" : "text-gray-400"
                )} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your new password"
                  className={cn(
                    "w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-200 bg-gray-50 dark:bg-gray-700/50",
                    focusedField === 'password' ? "border-blue-500 ring-2 ring-blue-500/20" : "border-gray-300 dark:border-gray-600"
                  )}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span>Password Strength</span>
                    <span className={cn(
                      "font-medium",
                      passwordStrength <= 2 ? "text-red-500" : 
                      passwordStrength <= 3 ? "text-yellow-500" : "text-green-500"
                    )}>
                      {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 3 ? 'Medium' : 'Strong'}
                    </span>
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
                  <div className="mt-2 space-y-1 text-xs text-gray-600">
                    <div className={cn("flex items-center space-x-2", password.length >= 8 ? "text-green-600" : "text-gray-400")}>
                      <CheckCircle className="w-3 h-3" />
                      <span>At least 8 characters</span>
                    </div>
                    <div className={cn("flex items-center space-x-2", /[A-Z]/.test(password) ? "text-green-600" : "text-gray-400")}>
                      <CheckCircle className="w-3 h-3" />
                      <span>One uppercase letter</span>
                    </div>
                    <div className={cn("flex items-center space-x-2", /[0-9]/.test(password) ? "text-green-600" : "text-gray-400")}>
                      <CheckCircle className="w-3 h-3" />
                      <span>One number</span>
                    </div>
                    <div className={cn("flex items-center space-x-2", /[^A-Za-z0-9]/.test(password) ? "text-green-600" : "text-gray-400")}>
                      <CheckCircle className="w-3 h-3" />
                      <span>One special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className={cn(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200",
                  focusedField === 'confirmPassword' ? "text-blue-500" : "text-gray-400"
                )} />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Confirm your new password"
                  className={cn(
                    "w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-200 bg-gray-50 dark:bg-gray-700/50",
                    focusedField === 'confirmPassword' ? "border-blue-500 ring-2 ring-blue-500/20" : "border-gray-300 dark:border-gray-600",
                    confirmPassword && password !== confirmPassword ? "border-red-500" : ""
                  )}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>Passwords do not match</span>
                </p>
              )}
              {confirmPassword && password === confirmPassword && password && (
                <p className="text-green-500 text-sm flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Passwords match</span>
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-600 dark:text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !isFormValid}
              className={cn(
                "w-full py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl",
                isFormValid 
                  ? "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white" 
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        </div>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Security Tip</p>
              <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                Use a strong password that you haven't used elsewhere. Consider using a password manager.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
