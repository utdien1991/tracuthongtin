export interface RawRow {
  stt: number;
  classGroup: string;
  name: string;
  dob: string;
  gender: string;
  cccd: string;
  issueDate: string;
  ethnicity: string;
  religion: string;
  curHam: string;
  curWard: string;
  permHam: string;
  permWard: string;
  birthPlace: string;
  birthWard: string;
  birthProvince?: string;
  homeTown: string;
  homeWard: string;
  homeProvince?: string;
  fName: string;
  fJob: string;
  fYear: string;
  fPhone: string;
  mName: string;
  mJob: string;
  mYear: string;
  mPhone: string;
  sPhone: string;
  weight: string;
  height: string;
  swim: boolean;
  eyes: string;
  vneid: boolean;
}

export const rawStudents: RawRow[] = [
  {
    stt: 1, classGroup: '10T4', name: 'Trương Kiều Tuấn Anh', dob: '22/01/2011', gender: 'Nam',
    cccd: '091211000973', issueDate: '18/12/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Vĩnh Phước', curWard: 'Xã Long Thạnh, An Giang',
    permHam: 'Ấp Vĩnh Phước', permWard: 'Xã Long Thạnh, An Giang',
    birthPlace: 'Thành phố Rạch Giá, Kiên Giang', birthWard: 'Phường Rạch Giá', birthProvince: 'An Giang',
    homeTown: 'Xã Vĩnh Phú, Huyện Giồng Riềng, Kiên Giang', homeWard: 'Xã Long Thạnh, An Giang',
    fName: 'Trương Kiều Oanh', fJob: 'Mua Bán', fYear: '1977', fPhone: '',
    mName: 'Phạm Thị Lai', mJob: 'Nội trợ', mYear: '1988', mPhone: '',
    sPhone: '', weight: '50', height: '155', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 2, classGroup: '10T4', name: 'Ngô Quốc Anh', dob: '13/01/2011', gender: 'Nam',
    cccd: '091211012066', issueDate: '25/03/2026', ethnicity: 'Kinh', religion: 'Phật Giáo',
    curHam: 'Ấp Kinh Xuôi', curWard: 'Xã Ngọc Chúc, An Giang',
    permHam: 'Ấp Kinh Xuôi', permWard: 'Xã Ngọc Chúc, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Ấp Kinh Xuôi, Xã Ngọc Thành, Giồng Riềng, Kiên Giang', homeWard: 'Xã Ngọc Chúc, An Giang',
    fName: 'Ngô Thanh Truyền', fJob: 'Mua Bán', fYear: '1974', fPhone: '0939189427',
    mName: 'Nguyễn Ngọc Bích', mJob: 'Bán Tạp Hóa', mYear: '1977', mPhone: '0706679099',
    sPhone: '0702259233', weight: '45', height: '163', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 3, classGroup: '10T4', name: 'Nguyễn Ngọc Trâm Anh', dob: '06/02/2011', gender: 'Nữ',
    cccd: '091311007326', issueDate: '25/09/2024', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Ngọc Trung', curWard: 'Xã Ngọc Chúc, An Giang',
    permHam: 'Ấp Ngọc Trung', permWard: 'Xã Ngọc Chúc, An Giang',
    birthPlace: 'Xã Ngọc Thành, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Ngọc Chúc', birthProvince: 'An Giang',
    homeTown: 'Xã Ngọc Thành, Huyện Giồng Riềng, Kiên Giang', homeWard: 'Xã Ngọc Chúc, An Giang',
    fName: 'Nguyễn Ngọc Diễn', fJob: 'Giáo Viên', fYear: '', fPhone: '0947711912',
    mName: 'Đặng Hồng Diễm', mJob: 'Giáo Viên', mYear: '', mPhone: '0844223709',
    sPhone: '0363636887', weight: '50', height: '160', swim: true, eyes: 'Cận thị', vneid: true
  },
  {
    stt: 4, classGroup: '10T4', name: 'Nguyễn Khánh Băng', dob: '22/08/2011', gender: 'Nữ',
    cccd: '091311006560', issueDate: '17/06/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Cây Quéo', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp Cây Quéo', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Xã Thạnh Bình, Huyện Giồng Riềng, Kiên Giang', homeWard: 'Xã Giồng Riềng, An Giang',
    fName: 'Nguyễn Văn Lớn', fJob: 'Làm Ruộng', fYear: '1987', fPhone: '0789547902',
    mName: 'Nguyễn Thị Tố Nga', mJob: 'Làm Ruộng', mYear: '1987', mPhone: '0766887543',
    sPhone: '0706586435', weight: '45', height: '158', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 5, classGroup: '10T4', name: 'Nguyễn Thị Ngọc Châu', dob: '03/10/2011', gender: 'Nữ',
    cccd: '091311009879', issueDate: '10/07/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Thạnh Đông', curWard: 'Xã Thạnh Hưng, An Giang',
    permHam: 'Ấp Thạnh Đông', permWard: 'Xã Thạnh Hưng, An Giang',
    birthPlace: 'Xã Thạnh Phước, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Thạnh Hưng', birthProvince: 'An Giang',
    homeTown: 'Xã Thạnh Phước, Huyện Giồng Riềng, Kiên Giang', homeWard: 'Xã Thạnh Hưng, An Giang',
    fName: 'Nguyễn Thanh Tuấn', fJob: 'Làm Ruộng', fYear: '1985', fPhone: '0378167087',
    mName: 'Phan Thị Tố Nga', mJob: 'Làm Ruộng', mYear: '1987', mPhone: '0974147441',
    sPhone: '0358974281', weight: '45', height: '155', swim: false, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 6, classGroup: '10T4', name: 'Nguyễn Thành Danh', dob: '14/10/2011', gender: 'Nam',
    cccd: '091211013600', issueDate: '22/09/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Ngọc Thạnh', curWard: 'Xã Ngọc Chúc, An Giang',
    permHam: 'Ấp Ngọc Thạnh', permWard: 'Xã Ngọc Chúc, An Giang',
    birthPlace: 'Thành phố Rạch Giá, Kiên Giang', birthWard: 'Phường Rạch Giá', birthProvince: 'An Giang',
    homeTown: 'Ấp Ngọc Thạnh, Xã Ngọc Chúc, Tỉnh An Giang', homeWard: 'Xã Ngọc Chúc, An Giang',
    fName: 'Nguyễn Thanh Lâm', fJob: 'Giáo Viên', fYear: '1984', fPhone: '0917491030',
    mName: 'Nguyễn Thị Chúc', mJob: 'Nội Trợ', mYear: '1982', mPhone: '0942005907',
    sPhone: '0817491030', weight: '75', height: '172', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 7, classGroup: '10T4', name: 'Nguyễn Thị Mỹ Duyên', dob: '28/08/2011', gender: 'Nữ',
    cccd: '091311007919', issueDate: '07/10/2025', ethnicity: 'Kinh', religion: 'Phật Giáo',
    curHam: 'Ấp Tà Ke', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp Tà Ke', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Ấp Tà Ke, Xã Thạnh Hoà, Huyện Giồng Riềng, Kiên Giang', homeWard: 'Xã Giồng Riềng, An Giang',
    fName: 'Nguyễn Văn Quốc', fJob: 'Thầu Xây Dựng', fYear: '1983', fPhone: '0986910410',
    mName: 'Đặng Thị Đợi', mJob: 'Nội Trợ', mYear: '1985', mPhone: '0965021253',
    sPhone: '0878427775', weight: '54', height: '165', swim: true, eyes: 'Cận thị', vneid: true
  },
  {
    stt: 8, classGroup: '10T4', name: 'Trần Hồng Duyên', dob: '04/07/2011', gender: 'Nữ',
    cccd: '091311008103', issueDate: '21/02/2025', ethnicity: 'Hoa', religion: 'Phật',
    curHam: 'Ấp Hồng Hạnh', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp Vĩnh Hòa', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', homeWard: 'Xã Giồng Riềng, An Giang',
    fName: 'Tùng', fJob: 'Công Nhân', fYear: '1983', fPhone: '0942500995',
    mName: 'Dung', mJob: 'Nội Trợ', mYear: '1982', mPhone: '0828283659',
    sPhone: '0827040711', weight: '45', height: '155', swim: false, eyes: 'Cận thị', vneid: true
  },
  {
    stt: 9, classGroup: '10T4', name: 'Thái Hạo Đông', dob: '02/05/2011', gender: 'Nam',
    cccd: '091211018063', issueDate: '15/10/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Thạnh Đông', curWard: 'Xã Thạnh Hưng, An Giang',
    permHam: 'Ấp Thạnh Đông', permWard: 'Xã Thạnh Hưng, An Giang',
    birthPlace: 'Phường Phú Thứ, Quận Cái Răng, TP. Cần Thơ', birthWard: 'Phường Hưng Phú', birthProvince: 'TP. Cần Thơ',
    homeTown: 'Ấp Thạnh Đông, Xã Thạnh Hưng, Tỉnh An Giang', homeWard: 'Xã Thạnh Hưng, An Giang',
    fName: 'Thái Hữu Thạnh', fJob: 'Làm Ruộng', fYear: '1975', fPhone: '0939403544',
    mName: 'Trương Thị Út', mJob: 'Làm Ruộng', mYear: '1977', mPhone: '0356365353',
    sPhone: '0706965856', weight: '84', height: '170', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 10, classGroup: '10T4', name: 'Ngô Thị Hồng Hạnh', dob: '10/06/2011', gender: 'Nữ',
    cccd: '091311008081', issueDate: 'Chưa cập nhật', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Thạnh Phú', curWard: 'Xã Thạnh Hưng, An Giang',
    permHam: 'Ấp Thạnh Phú', permWard: 'Xã Thạnh Hưng, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Đang cập nhật', homeWard: 'Xã Thạnh Hưng, An Giang',
    fName: 'Chưa có thông tin', fJob: '', fYear: '', fPhone: '',
    mName: 'Chưa có thông tin', mJob: '', mYear: '', mPhone: '',
    sPhone: '', weight: '45', height: '150', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 11, classGroup: '10T4', name: 'Lương Ngọc Khả Hân', dob: '14/11/2011', gender: 'Nữ',
    cccd: '091311000972', issueDate: '05/05/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp 6', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp 6', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Đợi hội đồng sư phạm xác thực', birthWard: 'Đợi hội đồng sư phạm xác thực', birthProvince: 'Đợi hội đồng sư phạm xác thực',
    homeTown: 'Xã An Hiệp, Huyện Châu Thành, Đồng Tháp', homeWard: 'Xã Phú Hữu, Đồng Tháp',
    fName: 'Lương Huy Chánh', fJob: 'Cán Bộ Địa Chính', fYear: '1986', fPhone: '0907907719',
    mName: 'Phan Thanh Hải', mJob: 'Giáo Viên', mYear: '1987', mPhone: '0366878799',
    sPhone: '0796985859', weight: '55', height: '155', swim: true, eyes: 'Cận thị', vneid: true
  },
  {
    stt: 12, classGroup: '10T4', name: 'Thạch Diệp Khánh Hân', dob: '01/09/2011', gender: 'Nữ',
    cccd: '091311003492', issueDate: '08/01/2026', ethnicity: 'Khơ-me', religion: 'Phật Giáo',
    curHam: 'Ấp Thạnh Ngọc', curWard: 'Xã Thạnh Hưng, An Giang',
    permHam: 'Ấp Thạnh Ngọc', permWard: 'Xã Thạnh Hưng, An Giang',
    birthPlace: 'Xã Thạnh Hưng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Thạnh Hưng', birthProvince: 'An Giang',
    homeTown: 'Xã Thạnh Hưng, Huyện Giồng Riềng, Kiên Giang', homeWard: 'Xã Thạnh Hưng, An Giang',
    fName: 'Thạch Châu', fJob: 'Công Nhân', fYear: '1989', fPhone: '0768847961',
    mName: 'Thị Liên', mJob: 'Công Nhân', mYear: '1990', mPhone: '0783905811',
    sPhone: '0356367317', weight: '39', height: '150', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 13, classGroup: '10T4', name: 'Phan Khải Hoàn', dob: '29/06/2011', gender: 'Nam',
    cccd: '092211000103', issueDate: '07/11/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Thạnh Đông', curWard: 'Xã Thạnh Hưng, An Giang',
    permHam: 'Ấp Thạnh Đông', permWard: 'Xã Thạnh Hưng, An Giang',
    birthPlace: 'Thành Phố Cần Thơ', birthWard: 'Thành Phố Cần Thơ', birthProvince: 'TP. Cần Thơ',
    homeTown: 'Thành Phố Cần Thơ', homeWard: 'TP. Cần Thơ',
    fName: 'Phan Văn Nhanh', fJob: 'Làm Ruộng', fYear: '1982', fPhone: '0908042372',
    mName: 'Bùi Thị Oanh', mJob: 'Tạp Hoá', mYear: '1981', mPhone: '0939242260',
    sPhone: '0931288664', weight: '50', height: '168', swim: true, eyes: 'Loạn thị', vneid: true
  },
  {
    stt: 14, classGroup: '10T4', name: 'Cam Vũ Huy', dob: '26/04/2011', gender: 'Nam',
    cccd: '091211000294', issueDate: '19/08/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Ngọc An', curWard: 'Xã Ngọc Chúc, An Giang',
    permHam: 'Ấp Ngọc An', permWard: 'Xã Ngọc Chúc, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Ngọc Chúc, An Giang', homeWard: 'Xã Ngọc Chúc, An Giang',
    fName: 'Cam Văn Sóng', fJob: 'Làm Nông', fYear: '1985', fPhone: '0917666051',
    mName: 'Võ Thị Kiều Loan', mJob: 'Buôn Bán', mYear: '1988', mPhone: '0986543004',
    sPhone: '0963834910', weight: '51', height: '165', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 15, classGroup: '10T4', name: 'Bùi Mỹ Huyền', dob: '07/09/2011', gender: 'Nữ',
    cccd: '091311011255', issueDate: '06/08/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Vinh Bắc', curWard: 'Xã Ngọc Chúc, An Giang',
    permHam: 'Ấp Ngọc Thuận', permWard: 'Xã Ngọc Chúc, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Ấp Vinh Đông, Xã Ngọc Chúc, An Giang', homeWard: 'Xã Ngọc Chúc, An Giang',
    fName: 'Bùi Hiếu Hiền', fJob: 'Làm Nông', fYear: '1986', fPhone: '0385180142',
    mName: 'Lê Thanh Xuân', mJob: 'Buôn Bán', mYear: '1980', mPhone: '0383687014',
    sPhone: '0962710607', weight: '50', height: '158', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 16, classGroup: '10T4', name: 'Dương Gia Hưng', dob: '08/06/2011', gender: 'Nam',
    cccd: '091211004806', issueDate: '04/10/2024', ethnicity: 'Kinh', religion: 'Phật',
    curHam: '', curWard: 'Xã Thạnh Hưng, An Giang',
    permHam: 'Ấp Thạnh Xuân', permWard: 'Xã Thạnh Hưng, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Ấp Thạnh Xuân, Xã Thạnh Hưng, Tỉnh An Giang', homeWard: 'Xã Thạnh Hưng, An Giang',
    fName: 'Dương Sơn Bá', fJob: 'Trồng Trọt', fYear: '1984', fPhone: '0918414943',
    mName: 'Bùi Thị Mỹ Nhân', mJob: 'Nội Chợ', mYear: '1987', mPhone: '0828875968',
    sPhone: '0814202449', weight: '55', height: '165', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 17, classGroup: '10T4', name: 'Đào Mai Hương', dob: '26/01/2011', gender: 'Nữ',
    cccd: '091311005800', issueDate: '09/04/2026', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Thạnh Nguyên', curWard: 'Xã Thạnh Hưng, An Giang',
    permHam: 'Ấp Thạnh Nguyên', permWard: 'Xã Thạnh Hưng, An Giang',
    birthPlace: 'Đợi hội đồng sư phạm xác thực', birthWard: 'Đợi hội đồng sư phạm xác thực', birthProvince: 'Đợi hội đồng sư phạm xác thực',
    homeTown: 'Ấp Thạnh Nguyên, Xã Thạnh Hưng, Tỉnh An Giang', homeWard: 'Xã Thạnh Hưng, An Giang',
    fName: 'Đào Công Danh', fJob: 'Buôn Bán', fYear: '1974', fPhone: '0943449926',
    mName: 'Trần Thị Giàu', mJob: 'Buôn Bán', mYear: '1977', mPhone: '0949733263',
    sPhone: '0827217056', weight: '58', height: '162', swim: false, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 18, classGroup: '10T4', name: 'Trương Nhật Khánh', dob: '26/08/2011', gender: 'Nam',
    cccd: '091211003944', issueDate: '11/09/2024', ethnicity: 'Kinh', religion: 'Thờ Phật',
    curHam: 'Ấp Quang Mẫn', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp Quang Mẫn', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Đợi hội đồng sư phạm xác thực', birthWard: 'Đợi hội đồng sư phạm xác thực', birthProvince: 'Đợi hội đồng sư phạm xác thực',
    homeTown: '383, Ấp Quang Mẫn, Xã Giồng Riềng, An Giang', homeWard: 'Xã Giồng Riềng, An Giang',
    fName: 'Trương Văn Tài', fJob: 'Công Nhân', fYear: '1991', fPhone: '0399886501',
    mName: 'Trần Vân Anh', mJob: 'Công Nhân', mYear: '1993', mPhone: '0379738491',
    sPhone: '0399886501', weight: '55', height: '165', swim: false, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 19, classGroup: '10T4', name: 'Lê Quốc Khôi', dob: '02/08/2011', gender: 'Nam',
    cccd: '091211009476', issueDate: '15/09/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Quan Mân', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp Quang Mẫn', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', homeWard: 'Xã Giồng Riềng, An Giang',
    fName: 'Lê Quốc Quy', fJob: 'Y Tế', fYear: '1981', fPhone: '0917488490',
    mName: 'Hà Út Bé', mJob: 'Y Tế', mYear: '1981', mPhone: '0919274297',
    sPhone: '0919870343', weight: '71', height: '165', swim: true, eyes: 'Cận thị', vneid: true
  },
  {
    stt: 20, classGroup: '10T4', name: 'Lê Đăng Khôi', dob: '14/12/2011', gender: 'Nam',
    cccd: '091211015276', issueDate: '15/10/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Sáu Song', curWard: 'Xã Ngọc Chúc, An Giang',
    permHam: 'Ấp Kinh Xuôi', permWard: 'Xã Ngọc Chúc, An Giang',
    birthPlace: 'Xã Ngọc Chúc, Tỉnh Kiên Giang', birthWard: 'Xã Ngọc Chúc', birthProvince: 'An Giang',
    homeTown: 'Ấp Sáo Song, Xã Ngọc Chúc, Tỉnh An Giang', homeWard: 'Xã Ngọc Chúc, An Giang',
    fName: 'Lê Quốc Khải', fJob: 'Làm Ruộng', fYear: '1989', fPhone: '0765626153',
    mName: 'Mã Thúy Kiều', mJob: 'Làm Ruộng', mYear: '1989', mPhone: '0785783249',
    sPhone: '0786699024', weight: '48', height: '167', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 21, classGroup: '10T4', name: 'Trương Huỳnh Anh Khôi', dob: '10/11/2011', gender: 'Nam',
    cccd: '091211013798', issueDate: '25/09/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Võ Thành Nguyên', curWard: 'Xã Ngọc Chúc, An Giang',
    permHam: 'Ấp Võ Thành Nguyên', permWard: 'Xã Ngọc Chúc, An Giang',
    birthPlace: 'Đợi hội đồng sư phạm xác thực', birthWard: 'Đợi hội đồng sư phạm xác thực', birthProvince: 'Đợi hội đồng sư phạm xác thực',
    homeTown: 'Xã Ngọc Chúc, Huyện Giồng Riềng, An Giang', homeWard: 'Xã Ngọc Chúc, An Giang',
    fName: 'Trương Thanh Tuyền', fJob: 'Thợ Điện', fYear: '1985', fPhone: '0943426759',
    mName: 'Huỳnh Thị Bích Thuỳ', mJob: 'Nội Chợ', mYear: '1986', mPhone: '0706597762',
    sPhone: '0849423986', weight: '45', height: '165', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 22, classGroup: '10T4', name: 'Nguyễn Ngọc Lam', dob: '18/06/2011', gender: 'Nữ',
    cccd: '091311006552', issueDate: '24/09/2025', ethnicity: 'Kinh', religion: 'Phật Giáo',
    curHam: 'Ấp Tà Ke', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp Tà Ke', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Ấp Tà Ke, Xã Giồng Riềng, An Giang', homeWard: 'Xã Giồng Riềng, An Giang',
    fName: 'Nguyễn Hoàng Mai', fJob: 'Xây Dựng', fYear: '1981', fPhone: '0968194627',
    mName: 'Đỗ Thị Nhị', mJob: 'Nội Trợ', mYear: '1985', mPhone: '0985749312',
    sPhone: '0866770059', weight: '55', height: '160', swim: false, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 23, classGroup: '10T4', name: 'Phan Trường Lâm', dob: '17/05/2011', gender: 'Nam',
    cccd: '091211013139', issueDate: '22/07/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Thạnh Xuân', curWard: 'Xã Thạnh Hưng, An Giang',
    permHam: 'Ấp Thạnh Xuân', permWard: 'Xã Thạnh Hưng, An Giang',
    birthPlace: 'Rạch Giá An Giang', birthWard: 'Phường Rạch Giá', birthProvince: 'An Giang',
    homeTown: 'An Giang', homeWard: 'An Giang',
    fName: 'Phan Văn Nguyên', fJob: 'Kinh Doanh', fYear: '1985', fPhone: '0979654654',
    mName: 'Ngô Thuỳ Dương', mJob: 'Kinh Doanh', mYear: '1979', mPhone: '0977344169',
    sPhone: '0392501894', weight: '87', height: '168', swim: true, eyes: 'Cận thị', vneid: true
  },
  {
    stt: 24, classGroup: '10T4', name: 'Dương Tấn Lực', dob: '28/06/2011', gender: 'Nam',
    cccd: '091211012840', issueDate: '10/09/2024', ethnicity: 'Khơ-me', religion: 'Không',
    curHam: 'Ấp Thạnh Ngọc', curWard: 'Xã Thạnh Hưng, An Giang',
    permHam: 'Ấp Trương Văn Vững', permWard: 'Xã Thạnh Hưng, An Giang',
    birthPlace: 'Đợi hội đồng sư phạm xác thực', birthWard: 'Đợi hội đồng sư phạm xác thực', birthProvince: 'Đợi hội đồng sư phạm xác thực',
    homeTown: 'Ấp Trương Văn Vững, Xã Thạnh Hưng, Huyện Giồng Riềng, Kiên Giang', homeWard: 'Xã Thạnh Hưng, An Giang',
    fName: 'Dương Lượng', fJob: 'Làm Ruộng', fYear: '1990', fPhone: '0968584814',
    mName: 'Thị Oanh', mJob: 'Làm Ruộng', mYear: '1982', mPhone: '0357597050',
    sPhone: 'Không', weight: '45', height: '158', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 25, classGroup: '10T4', name: 'Nguyễn Thị Thuyết Minh', dob: '19/06/2011', gender: 'Nữ',
    cccd: '092311009252', issueDate: '06/07/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: '', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp 8', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Phường Châu Văn Liêm, Quận Ô Môn, Thành phố Cần Thơ', birthWard: 'Phường Ô Môn', birthProvince: 'TP. Cần Thơ',
    homeTown: 'Xã Giồng Riềng, Tỉnh An Giang', homeWard: 'Xã Giồng Riềng, An Giang',
    fName: 'Nguyễn Hoà Bình', fJob: 'Thợ Hồ', fYear: '1977', fPhone: '0775895858',
    mName: 'Nguyễn Ngọc Tuyết', mJob: 'Bán Hàng', mYear: '1980', mPhone: '0778189692',
    sPhone: '0792050476', weight: '46', height: '160', swim: true, eyes: 'Cận thị', vneid: true
  },
  {
    stt: 26, classGroup: '10T4', name: 'Phạm Lê Kim Ngân', dob: '21/02/2009', gender: 'Nữ',
    cccd: '091309016506', issueDate: '26/05/2023', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp 6', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp 6', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', homeWard: 'Xã Giồng Riềng, An Giang',
    fName: 'Phạm Văn Đông', fJob: 'Công Nhân', fYear: '1979', fPhone: '0856704059',
    mName: 'Lê Kim Hoàng', mJob: 'Mất', mYear: '1979', mPhone: 'Không Có',
    sPhone: '0937997810', weight: '60', height: '153', swim: false, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 27, classGroup: '10T4', name: 'Nguyễn Bảo Ngọc', dob: '04/12/2011', gender: 'Nữ',
    cccd: '091311004701', issueDate: '23/02/2026', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Ngọc Trung', curWard: 'Xã Ngọc Chúc, An Giang',
    permHam: 'Ấp Ngã Năm', permWard: 'Xã Ngọc Chúc, An Giang',
    birthPlace: 'Xã Ngọc Thành, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Ngọc Chúc', birthProvince: 'An Giang',
    homeTown: 'Ấp Ngã Năm Xã Ngọc Thành Huyện Giồng Riềng Kiên Giang', homeWard: 'Xã Ngọc Chúc, An Giang',
    fName: 'Nguyễn Mười Một', fJob: 'Làm Ruộng', fYear: '1984', fPhone: '0941776442',
    mName: 'Nguyễn Thị Mỹ Hằng', mJob: 'Làm Ruộng', mYear: '1985', mPhone: '0941776442',
    sPhone: '0823391347', weight: '37', height: '160', swim: false, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 28, classGroup: '10T4', name: 'Huỳnh Nguyễn Kim Nguyệt', dob: '24/02/2011', gender: 'Nữ',
    cccd: '091311001979', issueDate: '22/08/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Nguyễn Hưởng', curWard: 'Xã Long Thạnh, An Giang',
    permHam: 'Ấp Nguyễn Hưởng', permWard: 'Xã Long Thạnh, An Giang',
    birthPlace: 'Đợi hội đồng sư phạm xác thực', birthWard: 'Đợi hội đồng sư phạm xác thực', birthProvince: 'Đợi hội đồng sư phạm xác thực',
    homeTown: 'Xã Vĩnh Thạnh, Huyện Giồng Riềng, Kiên Giang', homeWard: 'Xã Long Thạnh, An Giang',
    fName: 'Huỳnh Thanh Quý', fJob: 'Nông Dân', fYear: '1986', fPhone: '0853224567',
    mName: 'Nguyễn Thị Tho', mJob: 'Nông Dân', mYear: '1987', mPhone: '0858141677',
    sPhone: '0827555565', weight: '50', height: '162', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 29, classGroup: '10T4', name: 'Nguyễn Thành Nhân', dob: '01/10/2008', gender: 'Nam',
    cccd: '091208011388', issueDate: 'Chưa cập nhật', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Ngọc Vinh', curWard: 'Xã Ngọc Chúc, An Giang',
    permHam: 'Ấp Ngọc Vinh', permWard: 'Xã Ngọc Chúc, An Giang',
    birthPlace: 'Đợi hội đồng sư phạm xác thực', birthWard: 'Đợi hội đồng sư phạm xác thực', birthProvince: 'Đợi hội đồng sư phạm xác thực',
    homeTown: 'Xã Giồng Riềng Tỉnh An Giang', homeWard: 'Xã Giồng Riềng, An Giang',
    fName: 'Chưa có thông tin', fJob: '', fYear: '', fPhone: '',
    mName: 'Chưa có thông tin', mJob: '', mYear: '', mPhone: '',
    sPhone: '', weight: '55', height: '160', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 30, classGroup: '10T4', name: 'Trần Tố Như', dob: '09/05/2011', gender: 'Nữ',
    cccd: '091311002605', issueDate: '02/06/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp 8', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp 8', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Xã Giồng Riềng, Tỉnh An Giang', homeWard: 'Xã Giồng Riềng, An Giang',
    fName: 'Trần Văn Út', fJob: 'Làm Nông', fYear: '1975', fPhone: '0918352738',
    mName: 'Lê Nguyễn Minh Trang', mJob: 'Làm Nội Trợ', mYear: '1980', mPhone: '0913985479',
    sPhone: '0917776030', weight: '43', height: '150', swim: false, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 31, classGroup: '10T4', name: 'Lương Bảo Như', dob: '18/02/2011', gender: 'Nữ',
    cccd: '091311001974', issueDate: '14/08/2025', ethnicity: 'Kinh', religion: 'Phật',
    curHam: 'Ấp Xẻo Mây', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp 4', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Giồng Riềng, Tỉnh Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Xã Minh Châu, Huyện Đông Hưng, Tỉnh Thái Bình', homeWard: 'Thái Bình',
    fName: 'Lương Tấn Nhiệm', fJob: 'Nông Dân', fYear: '1976', fPhone: 'Không Có',
    mName: 'Lâm Kha Ly', mJob: 'Làm Nails', mYear: '1991', mPhone: '0708953939',
    sPhone: '0986487864', weight: '43', height: '152', swim: false, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 32, classGroup: '10T4', name: 'Võ Trần Nguyệt Như', dob: '08/07/2011', gender: 'Nữ',
    cccd: '091311006094', issueDate: '11/08/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp 6', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp 6', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Tân Châu, An Giang', homeWard: 'Tân Châu, An Giang',
    fName: 'Vũ Hoàng Thao', fJob: 'Giáo Viên', fYear: '1974', fPhone: '0918787161',
    mName: 'Trần Thị Hường', mJob: 'Giáo Viên', mYear: '1975', mPhone: '0859475887',
    sPhone: '0795950675', weight: '44', height: '156', swim: false, eyes: 'Cận thị', vneid: true
  },
  {
    stt: 33, classGroup: '10T4', name: 'Huỳnh Tấn Phát', dob: '29/05/2011', gender: 'Nam',
    cccd: '089211003427', issueDate: '29/07/2024', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp 6', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp Vĩnh Thạnh 2', permWard: 'Xã Châu Phong, An Giang',
    birthPlace: 'Phường III, Thành phố Vị Thanh, tỉnh Hậu Giang', birthWard: 'Phường Vị Thanh', birthProvince: 'TP. Cần Thơ',
    homeTown: 'Xã Thạnh Bình, Huyện Giồng Riềng, Tỉnh Kiên Giang', homeWard: 'Xã Giồng Riềng, An Giang',
    fName: 'Huỳnh Tấn Lợi', fJob: 'Dược Sĩ', fYear: '1986', fPhone: '0945658600',
    mName: 'Trần Thúy An', mJob: 'Buôn Bán', mYear: '1989', mPhone: '0946421464',
    sPhone: '0775890248', weight: '63', height: '174', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 34, classGroup: '10T4', name: 'Nguyễn Thị Cẩm Tiên', dob: '10/10/2011', gender: 'Nữ',
    cccd: '091311008905', issueDate: '11/08/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Thạnh Bình', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp Thạnh Trung', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', homeWard: 'Xã Giồng Riềng, An Giang',
    fName: 'Nguyễn Văn Nghề', fJob: 'Làm Ruộng', fYear: '1987', fPhone: '0968891907',
    mName: 'Nguyễn Thị Chúc Phương', mJob: 'Làm Ruộng', mYear: '1988', mPhone: '0396945041',
    sPhone: '0399924634', weight: '54', height: '170', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 35, classGroup: '10T4', name: 'Nguyễn Trần Tuấn Tú', dob: '14/06/2011', gender: 'Nam',
    cccd: '091211007314', issueDate: '21/08/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp 6', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp 6', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Ấp Kinh Xuôi Xã Ngọc Chúc Tỉnh An Giang', homeWard: 'Xã Ngọc Chúc, An Giang',
    fName: 'Nguyễn Khắc Trực', fJob: 'Giáo Viên', fYear: '1981', fPhone: '0985039126',
    mName: 'Trần Mỹ Loan', mJob: 'Bán Thuốc', mYear: '1986', mPhone: '0855117764',
    sPhone: '0775348442', weight: '48', height: '160', swim: true, eyes: 'Cận thị', vneid: true
  },
  {
    stt: 36, classGroup: '10T4', name: 'Tôn Nghiêm Khánh Tường', dob: '13/12/2011', gender: 'Nam',
    cccd: '091211013158', issueDate: '15/09/2024', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Kinh Xuôi', curWard: 'Ngọc Chúc, An Giang',
    permHam: 'Ấp Kinh Xuôi', permWard: 'Xã Ngọc Chúc, An Giang',
    birthPlace: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Ấp Nguyễn Hưởng, Xã Long Thạnh, An Giang', homeWard: 'Xã Long Thạnh, An Giang',
    fName: 'Tôn Thanh Chơn', fJob: 'Làm Nông', fYear: '1987', fPhone: '0948950460',
    mName: 'Trần Thị Sắc', mJob: 'Làm Nông', mYear: '1986', mPhone: '0828478378',
    sPhone: '0793012240', weight: '70', height: '169', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 37, classGroup: '10T4', name: 'Lý Gia Thoại', dob: '26/04/2011', gender: 'Nam',
    cccd: '091211009947', issueDate: '05/12/2025', ethnicity: 'Hoa', religion: 'Phật',
    curHam: 'Ấp Nguyễn Hưởng', curWard: 'Xã Long Thạnh, An Giang',
    permHam: 'Ấp Nguyễn Hưởng', permWard: 'Xã Long Thạnh, An Giang',
    birthPlace: 'Xã Vĩnh Thạnh, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Long Thạnh', birthProvince: 'An Giang',
    homeTown: 'Ấp Nguyễn Hưởng, Xã Long Thạnh, An Giang', homeWard: 'Xã Long Thạnh, An Giang',
    fName: 'Lý Trường Giang', fJob: 'Mua Bán Tạp Hoá', fYear: '1977', fPhone: '0837587263',
    mName: 'Trần Thị Thắm', mJob: 'Mua Bán Tạp Hoá', mYear: '1974', mPhone: '0842549021',
    sPhone: '0843638821', weight: '63', height: '175', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 38, classGroup: '10T4', name: 'Ngô Minh Thuận', dob: '03/10/2011', gender: 'Nam',
    cccd: '091211018829', issueDate: '24/11/2025', ethnicity: 'Kinh', religion: 'Đạo Phật',
    curHam: 'Ấp Thạnh Bình', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp 7', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Đợi hội đồng sư phạm xác thực', birthWard: 'Đợi hội đồng sư phạm xác thực', birthProvince: 'Đợi hội đồng sư phạm xác thực',
    homeTown: 'Thị Trấn Giồng Riềng, Huyện Giồng Riềng, Kiên Giang', homeWard: 'Xã Giồng Riềng, An Giang',
    fName: 'Ngô Văn Lợi', fJob: 'Kinh Doanh Điện Mặt Trời', fYear: '1974', fPhone: '0907153117',
    mName: 'Quách Thị Mỹ Thảo', mJob: 'Nội Trợ', mYear: '1977', mPhone: '0944848266',
    sPhone: '0949490310', weight: '55', height: '170', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 39, classGroup: '10T4', name: 'Mai Diễm Thuý', dob: '16/04/2011', gender: 'Nữ',
    cccd: '091311013504', issueDate: '02/06/2025', ethnicity: 'Khơ-me', religion: 'Không',
    curHam: 'Ấp Cái Đuốc Lớn', curWard: 'Xã Ngọc Chúc, An Giang',
    permHam: 'Ấp Thạnh An', permWard: 'Xã Thạnh Hưng, An Giang',
    birthPlace: 'Thành Phố Rạch Giá, Kiên Giang', birthWard: 'Phường Rạch Giá', birthProvince: 'An Giang',
    homeTown: 'Ấp Thạnh An, Xã Thạnh Lộc, Kiên Giang', homeWard: 'Xã Thạnh Hưng, An Giang',
    fName: 'Ngô Lít', fJob: 'Công Nhân', fYear: '1981', fPhone: '0395835512',
    mName: 'Thị Gái', mJob: 'Công Nhân', mYear: '1986', mPhone: '0385395740',
    sPhone: '0974024421', weight: '57', height: '160', swim: true, eyes: 'Cận thị', vneid: true
  },
  {
    stt: 40, classGroup: '10T4', name: 'Nguyễn Minh Trí', dob: '23/07/2011', gender: 'Nam',
    cccd: '091211004583', issueDate: '27/08/2024', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Vinh Thuận', curWard: 'Xã Ngọc Chúc, An Giang',
    permHam: 'Ấp Vĩnh Thuận', permWard: 'Xã Ngọc Chúc, An Giang',
    birthPlace: 'Xã Thạnh Lộc, Huyện Giồng Riềng, Kiên Giang', birthWard: 'Xã Thạnh Hưng', birthProvince: 'An Giang',
    homeTown: 'Đường Vàm Kinh An Bình Ấp Vinh Thuận Xã Ngọc Chúc Tỉnh An Giang', homeWard: 'Xã Ngọc Chúc, An Giang',
    fName: 'Nguyễn Minh Tâm', fJob: 'Bán Tạp Hoá', fYear: '1973', fPhone: '0932860845',
    mName: 'Lê Thị Mỹ', mJob: 'Bán Tạp Hoá', mYear: '1980', mPhone: '0939910219',
    sPhone: '0787923611', weight: '64', height: '178', swim: false, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 41, classGroup: '10T4', name: 'Lê Văn Vinh', dob: '18/07/2011', gender: 'Nam',
    cccd: '091211012385', issueDate: '14/01/2026', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Tà Ke', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp Tà Ke', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Bệnh Viện Giồng Riềng Xã Ngọc Chúc Tỉnh An Giang', birthWard: 'Xã Ngọc Chúc', birthProvince: 'An Giang',
    homeTown: 'Ấp Tà Ke Xã Giồng Riềng Tỉnh An Giang', homeWard: 'Xã Giồng Riềng, An Giang',
    fName: 'Lê Văn Hai', fJob: 'Công Nhân', fYear: '1978', fPhone: '0357170129',
    mName: 'Nguyễn Thị Hết', mJob: 'Công Nhân', mYear: '1982', mPhone: '0366678746',
    sPhone: '0376424080', weight: '42', height: '162', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 42, classGroup: '10T4', name: 'Ngô Phương Vy', dob: '30/03/2011', gender: 'Nữ',
    cccd: '091311018260', issueDate: '17/11/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp 8', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp Nội Ô', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Ấp Tà Ke, Xã Giồng Riềng, Tỉnh An Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Khu Phố Chòm Sao, Huyện Hòn Đất, Kiên Giang', homeWard: 'Xã Hòn Đất, An Giang',
    fName: 'Ngô Thành Nam', fJob: 'Làm Ruộng', fYear: '1984', fPhone: '0945966584',
    mName: 'Trần Thị Diễm', mJob: 'Điều Dưỡng', mYear: '1982', mPhone: '0386450467',
    sPhone: '0376131733', weight: '56', height: '160', swim: false, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 43, classGroup: '10T4', name: 'Lê Yến Vy', dob: '20/11/2011', gender: 'Nữ',
    cccd: '091311004557', issueDate: '03/09/2025', ethnicity: 'Kinh', religion: 'Phật',
    curHam: 'Ấp Cái Đuốc', curWard: 'Xã Ngọc Chúc, An Giang',
    permHam: 'Ấp Cái Đuốc Nhỏ', permWard: 'Xã Ngọc Chúc, An Giang',
    birthPlace: 'Xã Giồng Riềng, An Giang', birthWard: 'Xã Giồng Riềng', birthProvince: 'An Giang',
    homeTown: 'Ấp Cái Đuốc Nhỏ Xã Ngọc Chúc An Giang', homeWard: 'Xã Ngọc Chúc, An Giang',
    fName: 'Đậm', fJob: 'Nông Dân', fYear: '1982', fPhone: '0986881182',
    mName: 'Điệp', mJob: 'Thợ May', mYear: '1983', mPhone: '0948515950',
    sPhone: '0838182119', weight: '52', height: '158', swim: true, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 44, classGroup: '10T4', name: 'Nguyễn Thị Thảo Vy', dob: '12/09/2011', gender: 'Nữ',
    cccd: '091311009490', issueDate: '28/05/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Tà Ke', curWard: 'Xã Giồng Riềng, An Giang',
    permHam: 'Ấp Tà Ke', permWard: 'Xã Giồng Riềng, An Giang',
    birthPlace: 'Thành phố Rạch Giá, Kiên Giang', birthWard: 'Phường Rạch Giá', birthProvince: 'An Giang',
    homeTown: 'Xã Thạnh Hòa, Huyện Giồng Riềng, Kiên Giang', homeWard: 'Xã Giồng Riềng, An Giang',
    fName: 'Nguyễn Hoài Phương', fJob: 'Làm Ruộng', fYear: '1984', fPhone: '0355668008',
    mName: 'Bùi Thị Thý', mJob: 'Làm Ruộng', mYear: '1989', mPhone: '0359993492',
    sPhone: '0334985064', weight: '42', height: '148', swim: false, eyes: 'Bình thường', vneid: true
  },
  {
    stt: 45, classGroup: '10T4', name: 'Trần Ngọc Yến', dob: '04/01/2011', gender: 'Nữ',
    cccd: '091311012119', issueDate: '27/06/2025', ethnicity: 'Kinh', religion: 'Không',
    curHam: 'Ấp Thạnh Trung', curWard: 'Xã Thạnh Hưng, An Giang',
    permHam: 'Ấp Thạnh Trung', permWard: 'Xã Thạnh Hưng, An Giang',
    birthPlace: 'Đợi hội đồng sư phạm xác thực', birthWard: 'Đợi hội đồng sư phạm xác thực', birthProvince: 'Đợi hội đồng sư phạm xác thực',
    homeTown: 'Ấp Thạnh Trung, Xã Thạnh Hưng, Tỉnh An Giang', homeWard: 'Xã Thạnh Hưng, An Giang',
    fName: 'Trần Hoàng Nhã', fJob: 'Làm Ruộng', fYear: '1983', fPhone: '0819075580',
    mName: 'Trần Thị Cẩm Hà', mJob: 'Nội Trợ', mYear: '1989', mPhone: '0944611849',
    sPhone: '', weight: '49', height: '162', swim: true, eyes: 'Bình thường', vneid: true
  }
];
