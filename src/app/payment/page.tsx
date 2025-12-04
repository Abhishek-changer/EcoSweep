"use client";

import React from 'react';
import { AppHeader } from '@/components/header';
import { AppFooter } from '@/components/footer';
import { PaymentForm } from '@/components/payment-form';
import { AuthGuard } from '@/components/auth-guard';

function PaymentPageContent() {
  const handlePayment = (data: any) => {
    // This is a placeholder for payment processing logic
    console.log("Processing payment...", data);
    alert("Payment successful! (This is a demo)");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          <PaymentForm onSubmit={handlePayment} isSubmitting={false} />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}


export default function PaymentPage() {
    return (
        <AuthGuard>
            <PaymentPageContent />
        </AuthGuard>
    )
}
