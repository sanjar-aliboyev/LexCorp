import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'qivpoayw', // This is your Project ID
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to false to see your updates instantly
});