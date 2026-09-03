export interface StudentRecord {
  id: string; // unique identifier (CCCD or fallback ID)
  stt: number;
  classGroup: string; // Lớp học (10T4, 10T2...)
  studentCode: string; // Mã học sinh
  vemisCode: string; // Mã VEMIS
  moetCode: string; // Mã MOET
  registrationBook: string; // Sổ đăng bộ
  fullName: string; // Họ và tên
  birthDate: string; // Ngày sinh
  admissionDate: string; // Ngày vào trường
  gender: 'Nam' | 'Nữ' | string; // Giới tính
  nationality: string; // Quốc tịch
  
  // Chỗ ở hiện nay
  currentAddress: {
    hamlet: string; // SN/Xóm/Ấp
    residentialArea: string; // Khu dân cư
    ward: string; // Xã/Phường
    province: string; // Tỉnh/Tp
    fullAddress?: string;
  };

  // Hộ khẩu thường trú
  permanentAddress: {
    hamlet: string; // SN/Xóm/Ấp
    residentialArea: string;
    ward: string;
    province: string;
    fullAddress?: string;
  };

  // Nơi sinh
  birthPlace: {
    detail: string;
    ward: string;
    province: string;
  };

  // Quê quán
  hometown: {
    detail: string;
    ward: string;
    province: string;
  };

  // Căn cước
  idCard: {
    number: string; // Số CCCD
    issueDate: string; // Ngày cấp
    issuePlace: string; // Nơi cấp (Bộ Công an)
  };

  ethnicity: string; // Dân tộc
  religion: string; // Tôn giáo
  policyBeneficiary: string; // Diện chính sách
  nearPoor: string; // Cận nghèo
  unionMember: string; // Đoàn viên
  teamMember: string; // Đội viên

  // Cha
  father: {
    name: string;
    job: string;
    birthYear: string;
    idNumber: string;
    workplace: string;
    phone: string;
  };

  // Mẹ
  mother: {
    name: string;
    job: string;
    birthYear: string;
    idNumber: string;
    workplace: string;
    phone: string;
  };

  // Liên hệ khác
  contact: {
    studentPhone: string;
    contactBookPhone: string;
    contactBookEmail: string;
    disability: string;
  };

  // Thể chất & VNeID
  physical: {
    boarding: string; // N.trú, B.trú
    notes: string;
    weight: string; // kg
    height: string; // cm
    canSwim: boolean;
    eyeCondition: string; // Cận thị, Loạn thị, Bình thường
    vneidLevel2: boolean; // Đã cài mức độ 2 VNeID
  };
}

export type VerificationStatus = 'unverified' | 'confirmed_correct' | 'reported_error';

export interface VerificationRecord {
  cccd: string;
  status: VerificationStatus;
  verifiedAt: string;
  verifiedBy?: string; // Tên người xác nhận
  wrongFields?: string[]; // Danh sách các trường sai
  correctionNotes?: string; // Nội dung cần đính chính
  contactPhone?: string; // Số điện thoại liên hệ lại
}
