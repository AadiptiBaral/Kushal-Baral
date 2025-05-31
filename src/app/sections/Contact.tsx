"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, AlertCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/schemas/contactSchema";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { toast } from "sonner";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  
  const {register, handleSubmit, formState: { errors }, reset} = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    setIsSubmitting(true);
    setServerError(null);
    
    try {
      const response = await axios.post("/api/contact", data);
      if (response.status === 200) {
        toast.success("Message sent successfully! I'll get back to you within 24 hours.");
        // Reset form fields
        reset({
          fullName: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        setServerError("Failed to send message. Please try again later.");
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      let errorMessage = "An error occurred while sending your message. Please try again later.";
      
      // Handle different types of axios errors
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage = error.response.data?.message || errorMessage;
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = "No response received from the server. Please check your connection.";
        }
      }
      
      setServerError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-purple-50/50 dark:to-purple-950/30 overflow-hidden py-16 lg:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200 dark:bg-blue-800 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-full text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
            💬 Let's Connect
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Ready to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Start a Project?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I'm always excited to work on new projects and collaborate with amazing people. 
            Let's discuss how we can bring your ideas to life!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-border p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Send me a message</h3>
                <p className="text-muted-foreground">Fill out the form below and I'll get back to you within 24 hours.</p>
              </div>

              {serverError && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                    <AlertCircle className="h-5 w-5" />
                    <p className="font-medium">{serverError}</p>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("fullName")}
                      aria-invalid={errors.fullName ? "true" : "false"}
                      className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-foreground placeholder-muted-foreground/60 ${
                        errors.fullName ? "border-red-500 dark:border-red-400 focus:ring-red-500" : "border-border"
                      }`}
                      placeholder="Your full name"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="fullName"
                      render={({ message }) => (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{message}</p>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      aria-invalid={errors.email ? "true" : "false"}
                      className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-foreground placeholder-muted-foreground/60 ${
                        errors.email ? "border-red-500 dark:border-red-400 focus:ring-red-500" : "border-border"
                      }`}
                      placeholder="your@email.com"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }) => (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{message}</p>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register("subject")}
                    aria-invalid={errors.subject ? "true" : "false"}
                    className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-foreground placeholder-muted-foreground/60 ${
                      errors.subject ? "border-red-500 dark:border-red-400 focus:ring-red-500" : "border-border"
                    }`}
                    placeholder="What's this about?"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="subject"
                    render={({ message }) => (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">{message}</p>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    aria-invalid={errors.message ? "true" : "false"}
                    rows={6}
                    className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-foreground placeholder-muted-foreground/60 resize-none ${
                      errors.message ? "border-red-500 dark:border-red-400 focus:ring-red-500" : "border-border"
                    }`}
                    placeholder="Tell me about your project or idea..."
                  />
                  <ErrorMessage
                    errors={errors}
                    name="message"
                    render={({ message }) => (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">{message}</p>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-border p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Get in touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Email</div>
                      <div className="text-muted-foreground">kushal.baral@email.com</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Phone</div>
                      <div className="text-muted-foreground">+1 (555) 123-4567</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Location</div>
                      <div className="text-muted-foreground">Pokhara, Nepal</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Response Time Info */}
            <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 rounded-2xl border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                &lt; 24 Hours
              </div>
              <div className="text-sm text-muted-foreground">
                Average response time
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-1/4 right-10 w-6 h-6 bg-purple-500 rounded-full shadow-lg animate-pulse opacity-60"></div>
      <div className="absolute bottom-1/3 left-10 w-4 h-4 bg-blue-500 rounded-full shadow-lg animate-pulse delay-300 opacity-60"></div>
      <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-pink-500 rounded-full shadow-lg animate-pulse delay-700 opacity-40"></div>
    </section>
  );
};

export default Contact;