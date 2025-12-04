'use server';

/**
 * @fileOverview Automatically assigns a certified waste collector based on waste type and location.
 *
 * - assignCertifiedCollector - Assigns a collector based on the input.
 * - AssignCertifiedCollectorInput - The input type for assignCertifiedCollector.
 * - AssignCertifiedCollectorOutput - The output type for assignCertifiedCollector.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define a tool to geocode an address
const geocodeTool = ai.defineTool(
    {
      name: 'geocodeTool',
      description: 'Geocodes an address string into latitude and longitude.',
      inputSchema: z.object({ address: z.string() }),
      outputSchema: z.object({ lat: z.number(), lng: z.number() }),
    },
    async ({ address }) => {
      // In a real app, you would call the Google Geocoding API here.
      // For this demo, we will return a fixed location.
      // This simulates looking up an address and getting coordinates.
      console.log(`Geocoding address: ${address}`);
      return {
        lat: 33.7756,
        lng: -84.3963,
      };
    }
);


const AssignCertifiedCollectorInputSchema = z.object({
  wasteType: z.string().describe('The type of waste to be picked up (e.g., electronic, chemical).'),
  residentLocation: z.string().describe('The location of the resident requesting pickup.'),
});
export type AssignCertifiedCollectorInput = z.infer<typeof AssignCertifiedCollectorInputSchema>;

const AssignCertifiedCollectorOutputSchema = z.object({
  collectorId: z.string().describe('The ID of the assigned certified waste collector.'),
  estimatedArrivalTime: z.string().describe('The estimated arrival time of the collector.'),
  pickupLocation: z.object({
      lat: z.number().describe("The latitude of the pickup location."),
      lng: z.number().describe("The longitude of the pickup location.")
  }).describe("The geocoded location for the pickup address.")
});
export type AssignCertifiedCollectorOutput = z.infer<typeof AssignCertifiedCollectorOutputSchema>;

export async function assignCertifiedCollector(input: AssignCertifiedCollectorInput): Promise<AssignCertifiedCollectorOutput> {
  return assignCertifiedCollectorFlow(input);
}

const assignCollectorPrompt = ai.definePrompt({
  name: 'assignCollectorPrompt',
  input: {schema: AssignCertifiedCollectorInputSchema},
  output: {schema: AssignCertifiedCollectorOutputSchema},
  prompt: `You are a service operator. Assign a certified waste collector based on the waste type and resident\'s location.

Waste Type: {{{wasteType}}}
Resident Location: {{{residentLocation}}}

First, use the geocodeTool to convert the resident's location into geographic coordinates.

Then, consider collector availability and specialization to ensure efficient and reliable pickup. Return the collector ID, estimated arrival time, and the geocoded pickupLocation.
`,
  tools: [geocodeTool]
});

const assignCertifiedCollectorFlow = ai.defineFlow(
  {
    name: 'assignCertifiedCollectorFlow',
    inputSchema: AssignCertifiedCollectorInputSchema,
    outputSchema: AssignCertifiedCollectorOutputSchema,
  },
  async input => {
    const {output} = await assignCollectorPrompt(input);
    return output!;
  }
);
