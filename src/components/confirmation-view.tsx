"use client";

import type { AssignCertifiedCollectorOutput } from '@/ai/flows/assign-certified-collector';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, UserCheck } from 'lucide-react';
import { Separator } from './ui/separator';
import { Map } from './map';

interface ConfirmationViewProps {
  data: AssignCertifiedCollectorOutput;
  onReset: () => void;
}

export function ConfirmationView({ data, onReset }: ConfirmationViewProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl animate-in fade-in-50 zoom-in-95 duration-500">
      <CardHeader className="text-center items-center gap-4 pt-8">
        <CheckCircle2 className="w-16 h-16 text-primary" />
        <CardTitle className="text-3xl font-headline">Pickup Scheduled Successfully!</CardTitle>
        <CardDescription className="text-lg">
          Your responsible waste disposal is confirmed. Thank you for helping the environment!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 px-8 py-6">
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
            <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <UserCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <p className="font-semibold text-primary">Collector ID</p>
                    <p className="text-foreground/80 font-mono text-base bg-muted px-2 py-1 rounded-md inline-block">{data.collectorId}</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <p className="font-semibold text-primary">Estimated Arrival</p>
                    <p className="text-foreground/80">{data.estimatedArrivalTime}</p>
                </div>
            </div>
        </div>
        <div className="h-64 md:h-80 rounded-lg overflow-hidden border">
            <Map center={data.pickupLocation} />
        </div>
         <div className="text-sm text-muted-foreground text-center pt-4">
            <p>You will receive a notification when the collector is on their way. Please ensure the waste is accessible for pickup.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center p-6 bg-secondary/30 rounded-b-lg">
        <Button size="lg" onClick={onReset} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          Schedule Another Pickup
        </Button>
      </CardFooter>
    </Card>
  );
}
