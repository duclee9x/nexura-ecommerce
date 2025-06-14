'use server'

import { NextRequest, NextResponse } from 'next/server';
import UserHooks from "@/hooks/user-hooks"
export async function GET(request: NextRequest) {
  const { useVerifyAccount } = UserHooks()
  const { mutateAsync: verifyAccount } = useVerifyAccount
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    const response = await verifyAccount({ token });

    if (!response.success) {
      return NextResponse.json(
        { success: false,
          error:   response.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true,
        message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
} 