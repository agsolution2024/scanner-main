// Example of using the proxy endpoint to make API calls
// This demonstrates how the proxy acts as a bridge between frontend and backend

export async function sampleHelloCall() {
    try {
        // Making a call through the proxy endpoint
        const response = await fetch('/api/proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                endpoint: 'API_HELLO', // This maps to the environment variable that contains the actual endpoint path
                body: {} // Any data you want to send to the endpoint
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error calling hello endpoint:', error);
        throw error;
    }
}

// Example usage in a component:
/*
import { sampleHelloCall } from '@/app/_examples/proxy-usage';

async function MyComponent() {
    try {
        const result = await sampleHelloCall();
        console.log('Hello response:', result);
    } catch (error) {
        console.error('Failed to call hello endpoint:', error);
    }
}
*/ 