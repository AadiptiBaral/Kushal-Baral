"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { signInSchema } from '@/schemas/signInSchema';
import * as zod from 'zod';
import { useForm } from 'react-hook-form';	
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Signin() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, formState: { errors }, handleSubmit } = useForm<zod.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: zod.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      });
      
      if (response?.error) {
        // Handle different types of authentication errors
        switch (response.error) {
          case 'CredentialsSignin':
            toast.error('Invalid email or password');
            break;
          case 'Configuration':
            toast.error('Authentication configuration error');
            break;
          default:
            toast.error(response.error);
        }
      } else if (response?.ok) {
        toast.success('Login successful!');
        router.push('/dashboard');
      } else {
        toast.error('An unexpected error occurred');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const message = error.response.data?.message || 'Login failed';
          toast.error(message);
        } else if (error.request) {
          toast.error('Network error. Please check your connection.');
        } else {
          toast.error('An error occurred. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | Dashboard</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/50 dark:to-purple-950/30 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200 dark:bg-blue-800 rounded-full blur-3xl"></div>
        </div>

        <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
          <div className="inline-flex items-center justify-center w-full mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-full text-purple-700 dark:text-purple-300 text-sm font-medium">
              🔐 Admin Access
            </div>
          </div>
          <h2 className="text-center text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Welcome{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Back
            </span>
          </h2>
          <p className="text-center text-muted-foreground">
            Sign in to access your admin dashboard
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-border p-8">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Input
                      id="email"
                      {...register("email")}
                      type="email"
                      autoComplete="email"
                      disabled={isSubmitting}
                      className={`pl-10 bg-background border border-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-foreground placeholder-muted-foreground/60 ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                      placeholder="admin@example.com"
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                      <div className="mt-2 flex items-center text-sm text-red-500 dark:text-red-400">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {message}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Input
                      id="password"
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      disabled={isSubmitting}
                      className={`pl-10 pr-10 bg-background border border-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-foreground placeholder-muted-foreground/60 ${
                        errors.password ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isSubmitting}
                        className="text-muted-foreground hover:text-foreground focus:outline-none disabled:opacity-50 transition-colors duration-200"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                      <div className="mt-2 flex items-center text-sm text-red-500 dark:text-red-400">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {message}
                      </div>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      disabled={isSubmitting}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-border rounded disabled:opacity-50"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link 
                      href="/forgot-password" 
                      className="font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing in...
                      </div>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-muted-foreground">
                      Don't have an account?
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href="/signup"
                    className="w-full flex justify-center py-3 px-4 border-2 border-border hover:border-muted-foreground rounded-xl shadow-sm text-sm font-medium text-foreground bg-background hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
                  >
                    Create an account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-1/4 right-10 w-6 h-6 bg-purple-500 rounded-full shadow-lg animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/3 left-10 w-4 h-4 bg-blue-500 rounded-full shadow-lg animate-pulse delay-300 opacity-60"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-pink-500 rounded-full shadow-lg animate-pulse delay-700 opacity-40"></div>
      </div>
    </>
  );
}