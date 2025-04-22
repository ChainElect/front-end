// Secure storage for ZKP credentials
// In a real-world app, these should be encrypted with a user-provided password
class ZkpCredentialsService {
    // Store credentials in localStorage with encryption
    static storeCredentials(nullifier, secret) {
        try {
            // Simple encryption using Base64 (use stronger encryption in production)
            const credentials = {
                nullifier,
                secret
            };

            localStorage.setItem('zkp_credentials', btoa(JSON.stringify(credentials)));
            return true;
        } catch (error) {
            console.error('Failed to store ZKP credentials:', error);
            return false;
        }
    }

    // Retrieve credentials
    static getCredentials() {
        try {
            const storedData = localStorage.getItem('zkp_credentials');
            if (!storedData) return null;

            // Decrypt credentials
            const credentials = JSON.parse(atob(storedData));
            return credentials;
        } catch (error) {
            console.error('Failed to retrieve ZKP credentials:', error);
            return null;
        }
    }

    // Clear credentials
    static clearCredentials() {
        localStorage.removeItem('zkp_credentials');
    }
}

export default ZkpCredentialsService;