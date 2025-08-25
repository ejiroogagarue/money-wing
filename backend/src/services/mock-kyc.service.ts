export interface IKycService {
    createAccessToken(userId: string, levelName?: string): Promise<{ token: string; expiresIn: number}>; 
    simulateKycApproval(userId: string): Promise<{ applicantId: string; reviewStatus: string }>; 
}

export class MockKycService implements IKycService {
    async createAccessToken(userId: string, levelName: string = 'basic-kyc'): Promise<{ token: string; expiresIn: number; }> {
        console.log(`[Mock] Generating KYC access token for users: ${userId}`);

        // simulate a small delay like a real API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Return a mock response that mimics a real KYC provider 
        return {
            token: `mock_kyc_token_${userId}_${Date.now()}`,
            expiresIn: 600, // 10 minutes
        };
    }

    // Simulate a successful KYC verification after a delay 
    async simulateKycApproval(userId: string) : Promise<{applicantId: string; reviewStatus: string}> {
        console.log(`[MOCK] Simulating KYC approval process for users: ${userId}`);

        // Simulate processing delay (3 seconds)
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Simulate a 90% pass rate, 10% rejection rate 
        const isApproved = Math.random() > 0.1;
        const status = isApproved ? 'completed' : 'rejected';

        console.log(`[MOCK] KYC simulation result for ${userId}: ${status}`);

        return {
            applicantId: `mock_applicant_id_${userId}`,
            reviewStatus: status,
        };
    }
}