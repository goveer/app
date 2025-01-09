import { NextResponse } from 'next/server';
import { sendTransactionalEmail } from '@/lib/loops/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { transactionalId, email, dataVariables } = body;

    // Validate required fields
    if (!transactionalId || !email || !dataVariables) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email through Loops
    const result = await sendTransactionalEmail({
      transactionalId,
      email,
      dataVariables,
    });

    if (!result.success) {
      return NextResponse.json(
        { message: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in Loops API route:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 