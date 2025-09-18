import { SUPPORT_EMAIL } from "../constants/constants";
import type { Applicant } from "../types";

export function isValidApplication(applicant: Applicant): boolean {
  const { firstName, lastName, email, phone } = applicant;
  return firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== "" && phone.trim() !== "";
}

export function createSupportMailto(error: string, t: (key: string, options?: any) => string): string {
  const supportEmail = SUPPORT_EMAIL;
  const subject = encodeURIComponent(t("supportEmailSubject"));
  const body = encodeURIComponent(t("supportEmailBody", { error }));
  return `mailto:${supportEmail}?subject=${subject}&body=${body}`;
}