"use client";

import React, { useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { AppHeader } from '@/components/header';
import { AppFooter } from '@/components/footer';
import { EcoSweepForm, type WastePickupFormValues } from '@/components/eco-sweep-form';
import { ConfirmationView } from '@/components/confirmation-view';
import { submitWastePickupRequest } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import type { AssignCertifiedCollectorOutput } from '@/ai/flows/assign-certified-collector';
import { AuthGuard } from '@/components/auth-guard';

type AppState = 'idle' | 'submitting' | 'success';

function SchedulePageContent() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [confirmationData, setConfirmationData] = useState<AssignCertifiedCollectorOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = (data: WastePickupFormValues) => {
    setAppState('submitting');
    startTransition(async () => {
      const result = await submitWastePickupRequest({
        wasteType: data.wasteType,
        residentLocation: data.address,
      });

      if (result.success && result.data) {
        setConfirmationData(result.data);
        setAppState('success');
      } else {
        setAppState('idle');
        toast({
          variant: "destructive",
          title: "An Error Occurred",
          description: result.error || "Failed to schedule pickup. Please try again.",
        });
      }
    });
  };

  const handleReset = () => {
    setAppState('idle');
    setConfirmationData(null);
  };

  const renderContent = () => {
    switch (appState) {
      case 'submitting':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8 min-h-[50vh]">
            <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
            <h2 className="text-2xl font-bold font-headline text-primary">Finding a Collector...</h2>
            <p className="text-muted-foreground mt-2">Please wait while we assign a certified professional for your pickup.</p>
          </div>
        );
      case 'success':
        return confirmationData && <ConfirmationView data={confirmationData} onReset={handleReset} />;
      case 'idle':
      default:
        return <EcoSweepForm onSubmit={handleSubmit} isSubmitting={isPending} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow">
        <section id="schedule" className="container mx-auto px-4 py-12 sm:py-16 bg-primary/5">
          <div className="max-w-4xl mx-auto">
            <div className="transition-all duration-500 ease-in-out">
              {renderContent()}
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}

export default function SchedulePage() {
    return (
        <AuthGuard>
            <SchedulePageContent />
        </AuthGuard>
    )
}
