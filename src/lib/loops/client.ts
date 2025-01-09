interface LoopsResponse {
  success: boolean;
  error?: string;
}

interface TransactionalEmailParams {
  transactionalId: string;
  email: string;
  dataVariables: {
    firstName: string;
    lastName: string;
    confirmationUrl: string;
  };
}

export async function sendTransactionalEmail(params: TransactionalEmailParams): Promise<LoopsResponse> {
  try {
    const response = await fetch('/api/loops/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    return { success: true };
  } catch (error) {
    console.error('Loops client error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
} 