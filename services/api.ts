export async function summarizeText(text: string): Promise<string | null> {
  try {
    if (!text || text.trim().length === 0) {
      return "Please enter some text to summarize.";
    }

    const requestBody = { inputs: text };
    console.log('Sending request to API:', requestBody);

    const response = await fetch('https://clmc5sne1m.execute-api.us-east-2.amazonaws.com/prod/', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    // Extract the summary_text from the nested object
    if (data.summary && data.summary.summary_text) {
      return data.summary.summary_text;
    }
    
    return data.summary || data.result || data.text || data.body || "No summary returned from API.";
  } catch (err) {
    console.error('API Error:', err);
    return "Error connecting to API. Please check your internet connection and try again.";
  }
}
