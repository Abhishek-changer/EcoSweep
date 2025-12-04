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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon, FlaskConical, Laptop, Loader2, Package } from "lucide-react";
import { format } from "date-fns";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  address: z.string().min(10, { message: "Please enter a valid address." }),
  wasteType: z.enum(["electronic", "chemical", "specialty"], { required_error: "Please select a waste type." }),
  pickupDate: z.date({ required_error: "A pickup date is required." }),
});

export type WastePickupFormValues = z.infer<typeof formSchema>;

interface EcoSweepFormProps {
  onSubmit: (data: WastePickupFormValues) => void;
  isSubmitting: boolean;
}

export function EcoSweepForm({ onSubmit, isSubmitting }: EcoSweepFormProps) {
  const form = useForm<WastePickupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  return (
    <Card className="w-full shadow-2xl animate-in fade-in-50 zoom-in-95 duration-500">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">Schedule a Pickup</CardTitle>
        <CardDescription>Fill out the form below to arrange for your waste collection. A service fee will be calculated upon pickup.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 font-headline text-primary">1. Your Details</h3>
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="123 Eco-Friendly Ave, Greensville, GA 12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4 font-headline text-primary">2. Pickup Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="wasteType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waste Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a waste category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="electronic"><div className="flex items-center gap-2"><Laptop className="h-4 w-4"/> Electronic</div></SelectItem>
                          <SelectItem value="chemical"><div className="flex items-center gap-2"><FlaskConical className="h-4 w-4"/> Chemical</div></SelectItem>
                          <SelectItem value="specialty"><div className="flex items-center gap-2"><Package className="h-4 w-4"/> Specialty</div></SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickupDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Pickup Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setDate(new Date().getDate() -1))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                "Schedule Your Pickup"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
