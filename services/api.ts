export async function summarizeText(text: string): Promise<string | null> {
  try {
    const response = await fetch('https://clmc5sne1m.execute-api.us-east-2.amazonaws.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    return data.summary || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}
