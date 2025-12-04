"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth, useFirestore } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { EcoSweepLogo } from "@/components/icons";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function SignupPage() {
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      const residentData = {
        id: user.uid,
        email: user.email,
      };

      const residentDocRef = doc(firestore, "residents", user.uid);
      
      // Non-blocking write with error handling
      setDoc(residentDocRef, residentData)
        .catch((error) => {
            console.error("Error creating resident document:", error);
            // Even if this fails, the user account is created.
            // We can emit a specific error for logging or richer UI feedback.
            errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: residentDocRef.path,
                operation: 'create',
                requestResourceData: residentData,
            }));
        });
        
      toast({
        title: "Account Created!",
        description: "You have been successfully signed up. Redirecting...",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign-up Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <div className="absolute top-8 left-8">
            <Link href="/" className="flex items-center gap-2">
                <EcoSweepLogo className="h-8 w-8 text-primary" />
                <span className="font-bold text-2xl font-headline text-primary tracking-tight">
                    EcoSweep
                </span>
            </Link>
        </div>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-primary">Create an Account</CardTitle>
          <CardDescription>Join EcoSweep to help us build a cleaner future.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button type="submit" disabled={isSubmitting} className="w-full text-lg" size="lg">
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Sign Up"}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
