export type CertificateStatus = "completed" | "in-progress";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  skills: string[];
  file?: string;
  credentialUrl?: string;
  status: CertificateStatus;
}
