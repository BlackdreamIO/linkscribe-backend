import crypto from "crypto";

// Generate a random 256-bit key (32 bytes)
const secret = crypto.randomBytes(32).toString('hex');
console.log(secret); // Store this securely in your environment variables
