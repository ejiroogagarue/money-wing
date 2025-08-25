import { MockKycService, IKycService } from "./mock-kyc.service";

// This service acts as a wrapper. Later you can easily replace MockKycService 
// with VeriffService or another provider.

class KycService {
    private provider: IKycService;

    constructor() {
        // For now, use the mock provider. Change this line later to use a real provider 
        this.provider = new MockKycService();
    }

    createAccessToken(userId: string, levelName?: string) {
        return this.provider.createAccessToken(userId, levelName);
    }

    simulateKycApproval(userId: string) {
        return this.provider.simulateKycApproval(userId);
    }

    // Add other methods as needed, which will be implemented by whatever provider is active 
}

export const kycService = new KycService()