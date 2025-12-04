"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { CreditCard, Loader2 } from "lucide-react";

const paymentFormSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Please enter a valid 16-digit card number."),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Please use MM/YY format."),
  cvc: z.string().regex(/^\d{3,4}$/, "Invalid CVC."),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  pickupId: z.string().optional()
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentFormProps {
  onSubmit: (data: PaymentFormValues) => void;
  isSubmitting: boolean;
}

export function PaymentForm({ onSubmit, isSubmitting }: PaymentFormProps) {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  return (
    <Card className="w-full shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">Secure Payment</CardTitle>
        <CardDescription>Enter payment details for your service fee.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
             <FormField
                control={form.control}
                name="pickupId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup/Invoice ID (Optional)</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your pickup ID if you have one" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="0000 0000 0000 0000" {...field} className="pl-9"/>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <div className="grid grid-cols-2 gap-6">
              <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
               <FormField
                  control={form.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVC</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
            </div>
             <FormDescription>Your payment is processed securely.</FormDescription>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Pay Now"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
