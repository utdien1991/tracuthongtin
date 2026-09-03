import { VerificationRecord } from '../types';

const STORAGE_KEY = 'thpt_giongrieng_student_verifications_v1';

export function getVerifications(): Record<string, VerificationRecord> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (err) {
    console.error('Error reading verifications from localStorage:', err);
    return {};
  }
}

export function getVerificationForStudent(cccd: string): VerificationRecord | null {
  const cleanCCCD = cccd.trim().replace(/\D/g, '');
  const verifications = getVerifications();
  return verifications[cleanCCCD] || null;
}

export function saveVerification(record: VerificationRecord): void {
  try {
    const cleanCCCD = record.cccd.trim().replace(/\D/g, '');
    const verifications = getVerifications();
    verifications[cleanCCCD] = {
      ...record,
      cccd: cleanCCCD,
      verifiedAt: new Date().toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(verifications));
  } catch (err) {
    console.error('Error saving verification to localStorage:', err);
  }
}

export function clearVerification(cccd: string): void {
  try {
    const cleanCCCD = cccd.trim().replace(/\D/g, '');
    const verifications = getVerifications();
    delete verifications[cleanCCCD];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(verifications));
  } catch (err) {
    console.error('Error clearing verification:', err);
  }
}
