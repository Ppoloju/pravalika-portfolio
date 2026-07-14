export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  description: string;
  date: string;
  status: "Completed" | "In Progress";
  link?: string;
}
