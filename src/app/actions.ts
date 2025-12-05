'use server';

import { assignCertifiedCollector } from '@/ai/flows/assign-certified-collector';

interface RequestData {
  wasteType: string;
  residentLocation: string;
}

export async function submitWastePickupRequest(data: RequestData) {
  try {
    const result = await assignCertifiedCollector({
      wasteType: data.wasteType,
      residentLocation: data.residentLocation,
    });
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Error assigning collector:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred while assigning a collector.';
    return { success: false, error: errorMessage };
  }
}
