let loops: LoopsClient | undefined;

export function getLoopsClient(): LoopsClient | undefined {
  // if loops api key hasn't been set this package doesn't do anything
  if (!process.env.LOOPS_API_KEY) {
    console.warn("LOOPS_API_KEY is not set");
    return;
  }

  if (!loops) loops = new LoopsClient(process.env.LOOPS_API_KEY);

  return loops;
}

export async function createContact(
  email: string,
  firstName?: string,
): Promise<{ success: boolean }> {
  const loops = getLoopsClient();
  if (!loops) return { success: false };
  const resp = await loops.createContact(email, firstName ? { firstName } : {});
  return resp;
}

export async function sendTransactionalEmail(params: {
  transactionalId: string;
  email: string;
  dataVariables: {
    firstName: string;
    lastName: string;
    confirmationUrl: string;
  };
}) {
  const loops = getLoopsClient();
  if (!loops) return { success: false };
  const resp = await loops.sendTransactionalEmail(params);
  return resp;
}

interface LoopsResponse {
  success: boolean;
  error?: string;
}

export class LoopsClient {
  private apiKey: string;
  private baseUrl = 'https://app.loops.so/api/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async fetch(endpoint: string, data: any): Promise<LoopsResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Loops API Response:', responseData);
        throw new Error(`Loops API error: ${responseData.message || response.statusText}`);
      }

      return responseData;
    } catch (error) {
      console.error(`Loops ${endpoint} error:`, error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async createContact(email: string, data: Record<string, any>) {
    return this.fetch('/contacts/create', {
      email,
      ...data
    });
  }

  async updateContact(email: string, data: Record<string, any>) {
    return this.fetch('/contacts/update', {
      email,
      ...data
    });
  }

  async sendTransactionalEmail(params: {
    transactionalId: string;
    email: string;
    dataVariables: Record<string, any>;
  }) {
    return this.fetch('/transactional', params);
  }
} 