"use client";

import React from 'react';
import Image from 'next/image';
import { AppHeader } from '@/components/header';
import { AppFooter } from '@/components/footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AuthGuard } from '@/components/auth-guard';

function HomePage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'ecosweep-hero');
  const communityImage = PlaceHolderImages.find(p => p.id === 'community-cleanup');
  const recyclingImage = PlaceHolderImages.find(p => p.id === 'recycling-bins');

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow">
        <section className="relative bg-primary/10 py-16 sm:py-24">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                quality={100}
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            <div className="container mx-auto px-4 text-center relative">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline text-primary drop-shadow-sm">
                Join the EcoSweep Movement.
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-foreground/80">
                Together, we're building a cleaner, greener community. Schedule a pickup, join an event, or learn how you can help.
              </p>
            </div>
        </section>

        <section id="ecosystem" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary">Our Sustainable Ecosystem</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
                EcoSweep is more than a service; it's a community dedicated to making a tangible impact on our environment.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {communityImage && (
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={communityImage.imageUrl}
                    alt={communityImage.description}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    data-ai-hint={communityImage.imageHint}
                  />
                </div>
              )}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-headline text-primary">Community Cleanups</h3>
                <p className="text-foreground/80">
                  Join local events to clean up our parks, rivers, and neighborhoods. Every hand helps in preserving our natural spaces for future generations.
                </p>
                <Button>Find an Event Near You</Button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center mt-16">
              <div className="space-y-4 md:order-2">
                 <h3 className="text-2xl font-bold font-headline text-primary">Responsible Recycling</h3>
                <p className="text-foreground/80">
                  Our core mission is to provide convenient, door-to-door pickup for your electronic, chemical, and specialty waste, ensuring it never ends up in a landfill.
                </p>
                <Button asChild><Link href="/schedule">Schedule a pickup</Link></Button>
              </div>
               {recyclingImage && (
                <div className="rounded-lg overflow-hidden shadow-xl md:order-1">
                  <Image
                    src={recyclingImage.imageUrl}
                    alt={recyclingImage.description}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    data-ai-hint={recyclingImage.imageHint}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}

export default function Home() {
    return (
        <AuthGuard>
            <HomePage />
        </AuthGuard>
    )
}
