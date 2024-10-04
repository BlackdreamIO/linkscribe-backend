export function RegexJsonOutputValidator(input)
{
    const jsonPattern = /^\s*\[\s*\{(?:[^{}]*)\}\s*\]\s*$/;

    if (!jsonPattern.test(input)) {
        return {
            isValid: false,
            error: "The input string does not match the JSON structure pattern."
        };
    }

    // Step 2: Try to parse the input to see if it's valid JSON
    try {
        const parsed = JSON.parse(input);

        // Step 3: Additional check - make sure it's an array with objects
        if (Array.isArray(parsed) && parsed.every(item => typeof item === 'object' && item !== null)) {
            return {
                isValid: true,
                message: "Valid JSON structure."
            };
        } else {
            return {
                isValid: false,
                error: "The parsed JSON is not an array of objects."
            };
        }

    }
    catch (error) {
        return {
            isValid: false,
            error: "The input string is not valid JSON: " + error.message
        };
    }
}
