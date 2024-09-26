export async function incrementUsageCount() {
  try {
    const response = await fetch('/api/user/v1/increment-usage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to increment usage count');
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error incrementing usage count:', error);
    throw error;
  }
}