import { useEffect } from "react";

const TestAPI = () => {
    useEffect(() => {
        const testApiCall = async () => {
            try {
                const response = await fetch(
                    "https://1pdqypk59l.execute-api.us-east-2.amazonaws.com/prod/hello-world"
                );
                const data = await response.json();
                console.log("API Response:", data); // Logs "Hello from Lambda!" to the console
            } catch(error) {
                console.error("Error fetching API:", error);
            }
        };

        testApiCall();
    }, []);

    return <p>Check console for API response!</p>
}

export default TestAPI;