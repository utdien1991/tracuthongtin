import { StudentRecord } from '../types';
import { rawStudents } from './rawStudentsList';

export { rawStudents };

function parseWardAndProvince(rawWard: string): { ward: string; province: string } {
  if (!rawWard) return { ward: 'Đang cập nhật', province: 'An Giang' };
  const parts = rawWard.split(',').map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return {
      ward: parts[0],
      province: parts.slice(1).join(', '),
    };
  }
  return {
    ward: parts[0] || 'Đang cập nhật',
    province: 'An Giang',
  };
}

export const STUDENTS_DATA: StudentRecord[] = rawStudents.map((r) => {
  const curWP = parseWardAndProvince(r.curWard);
  const permWP = parseWardAndProvince(r.permWard);
  const curHamlet = r.curHam?.trim() || 'Đang cập nhật';
  const permHamlet = r.permHam?.trim() || 'Đang cập nhật';

  return {
    id: r.cccd,
    stt: r.stt,
    classGroup: r.classGroup,
    studentCode: `HS-GR-${r.classGroup}-${String(r.stt).padStart(2, '0')}`,
    vemisCode: '',
    moetCode: '',
    registrationBook: '',
    fullName: r.name,
    birthDate: r.dob,
    admissionDate: '18/08/2025',
    gender: r.gender,
    nationality: 'Việt Nam',
    currentAddress: {
      hamlet: curHamlet,
      residentialArea: '',
      ward: curWP.ward,
      province: curWP.province,
      fullAddress:
        curHamlet !== 'Đang cập nhật'
          ? `${curHamlet}, ${curWP.ward}, ${curWP.province}`
          : `${curWP.ward}, ${curWP.province}`,
    },
    permanentAddress: {
      hamlet: permHamlet,
      residentialArea: '',
      ward: permWP.ward,
      province: permWP.province,
      fullAddress:
        permHamlet !== 'Đang cập nhật'
          ? `${permHamlet}, ${permWP.ward}, ${permWP.province}`
          : `${permWP.ward}, ${permWP.province}`,
    },
    birthPlace: {
      detail: r.birthPlace?.trim() || 'Đợi hội đồng sư phạm xác thực',
      ward: r.birthWard?.trim() || 'Đợi hội đồng sư phạm xác thực',
      province:
        r.birthProvince?.trim() ||
        (r.birthPlace && r.birthPlace !== 'Đợi hội đồng sư phạm xác thực'
          ? 'An Giang'
          : 'Đợi hội đồng sư phạm xác thực'),
    },
    hometown: {
      detail: r.homeTown?.trim() || 'Đợi hội đồng sư phạm xác thực',
      ward: r.homeWard?.trim() || 'Đợi hội đồng sư phạm xác thực',
      province: r.homeProvince?.trim() || 'An Giang',
    },
    idCard: {
      number: r.cccd,
      issueDate: r.issueDate,
      issuePlace: 'Bộ Công an',
    },
    ethnicity: r.ethnicity,
    religion: r.religion,
    policyBeneficiary: 'Không',
    nearPoor: 'Không',
    unionMember: '',
    teamMember: '',
    father: {
      name: r.fName,
      job: r.fJob,
      birthYear: r.fYear,
      idNumber: '',
      workplace: '',
      phone: r.fPhone,
    },
    mother: {
      name: r.mName,
      job: r.mJob,
      birthYear: r.mYear,
      idNumber: '',
      workplace: '',
      phone: r.mPhone,
    },
    contact: {
      studentPhone: r.sPhone,
      contactBookPhone: r.fPhone || r.mPhone,
      contactBookEmail: '',
      disability: 'Không',
    },
    physical: {
      boarding: 'Bán trú',
      notes: '',
      weight: r.weight,
      height: r.height,
      canSwim: r.swim,
      eyeCondition: r.eyes,
      vneidLevel2: r.vneid,
    },
  };
});

// Helper tìm kiếm theo CCCD chuẩn hoá (bỏ khoảng trắng, dấu gạch ngang)
export function findStudentByCCCD(cccd: string): StudentRecord | null {
  const cleanInput = cccd.trim().replace(/\D/g, '');
  if (!cleanInput) return null;
  return STUDENTS_DATA.find((s) => s.idCard.number.replace(/\D/g, '') === cleanInput) || null;
}
