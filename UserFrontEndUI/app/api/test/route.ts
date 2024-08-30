import { NextResponse } from 'next/server'
import { sendResetEmail } from '@/utils/email'

export async function POST(request: Request) {
  // Only allow this route in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'Forbidden in production' }, { status: 403 })
  }

  const body = await request.json()
  const { email } = body

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 })
  }

  try {
    // Generate a dummy token for testing
    const dummyToken = 'test-token-' + Date.now()

    // Send the test email
    await sendResetEmail(email, dummyToken)

    return NextResponse.json({ message: 'Test email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error sending test email:', error)
    return NextResponse.json({ message: 'Failed to send test email', error: (error as Error).message }, { status: 500 })
  }
}