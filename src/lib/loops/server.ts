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

      if (!response.ok) {
        throw new Error(`Loops API error: ${response.statusText}`);
      }

      return { success: true };
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
    return this.fetch('/transactional', {
      transactionalId: params.transactionalId,
      email: params.email,
      dataVariables: params.dataVariables
    });
  }
} 