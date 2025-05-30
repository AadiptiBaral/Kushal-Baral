"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Shield, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { verifyOtpSchema } from "@/schemas/verifyOtpSchema";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function VerifyOTP() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const form = useForm<z.infer<typeof verifyOtpSchema>>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifyOtpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/verify-otp", data);
      if (response.status === 200) {
        toast.success("OTP verified successfully!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message || "Failed to verify OTP");
        } else {
          toast.error("Failed to verify OTP. Please try again.");
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const response = await axios.post("/api/resend-otp");
      if (response.status === 200) {
        toast.success("OTP sent successfully!");
        form.reset(); // Clear the form
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message || "Failed to resend OTP");
        } else {
          toast.error("Failed to resend OTP. Please try again.");
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
  };

  const otpValue = form.watch("otp");

  return (
    <>
      <Head>
        <title>Verify OTP | Admin Dashboard</title>
      </Head>
      <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-purple-50/50 dark:to-purple-950/30 overflow-hidden flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200 dark:bg-blue-800 rounded-full blur-3xl"></div>
        </div>

        <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-full text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Secure Verification
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Verify{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                Your Account
              </span>
            </h2>
            <p className="text-muted-foreground">
              Enter the 6-digit code sent to your email
            </p>
          </div>
        </div>

        <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-border p-8">
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Enter Verification Code
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We've sent a 6-digit verification code to your email address
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex justify-center">
                              <InputOTP
                                maxLength={6}
                                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                value={field.value}
                                onChange={field.onChange}
                              >
                                <InputOTPGroup>
                                  <InputOTPSlot
                                    index={0}
                                    className="w-12 h-12 text-lg font-semibold border-2 border-border focus:border-purple-500 rounded-xl bg-background text-foreground"
                                  />
                                  <InputOTPSlot
                                    index={1}
                                    className="w-12 h-12 text-lg font-semibold border-2 border-border focus:border-purple-500 rounded-xl bg-background text-foreground"
                                  />
                                  <InputOTPSlot
                                    index={2}
                                    className="w-12 h-12 text-lg font-semibold border-2 border-border focus:border-purple-500 rounded-xl bg-background text-foreground"
                                  />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                  <InputOTPSlot
                                    index={3}
                                    className="w-12 h-12 text-lg font-semibold border-2 border-border focus:border-purple-500 rounded-xl bg-background text-foreground"
                                  />
                                  <InputOTPSlot
                                    index={4}
                                    className="w-12 h-12 text-lg font-semibold border-2 border-border focus:border-purple-500 rounded-xl bg-background text-foreground"
                                  />
                                  <InputOTPSlot
                                    index={5}
                                    className="w-12 h-12 text-lg font-semibold border-2 border-border focus:border-purple-500 rounded-xl bg-background text-foreground"
                                  />
                                </InputOTPGroup>
                              </InputOTP>
                            </div>
                          </FormControl>
                          <FormMessage className="text-center" />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting || otpValue.length !== 6}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Verifying...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Verify OTP
                          </div>
                        )}
                      </Button>

                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">
                          Didn't receive the code?
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleResendOTP}
                          disabled={isResending}
                          className="text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/50 font-medium px-4 py-2 rounded-xl transition-all duration-300"
                        >
                          {isResending ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-purple-600/30 border-t-purple-600 rounded-full animate-spin"></div>
                              Resending...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <RefreshCw className="w-4 h-4" />
                              Resend Code
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>

                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <p className="font-medium mb-1">Security Tips:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Don't share your OTP with anyone</li>
                        <li>• The code expires in 10 minutes</li>
                        <li>
                          • Check your spam folder if you don't see the email
                        </li>
                      </ul>
                    </div>
                  </div>
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