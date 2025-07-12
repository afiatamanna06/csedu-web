export interface RegistrationDetails {
  registrationId: string;
  confirmationNumber: string;
  registrationData: {
    name: string;
    email: string;
    registrationNo: string; // Maps to 'registrationId' from form
    phone: string;
    department: string; // Maps to 'batchNo' from form
    registrationFee?: string;
    // Removed unused optional fields for now
  };
}