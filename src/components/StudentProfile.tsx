import React from 'react';
import { StudentRecord, VerificationRecord } from '../types';
import {
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  MapPin,
  Users,
  Activity,
  Printer,
  RefreshCw,
  ShieldCheck,
  Clock,
  Check,
  X,
} from 'lucide-react';

interface StudentProfileProps {
  student: StudentRecord;
  verification: VerificationRecord | null;
  onConfirmCorrect: () => void;
  onReportError: () => void;
  onResetVerification: () => void;
  onPrint: () => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({
  student,
  verification,
  onConfirmCorrect,
  onReportError,
  onResetVerification,
  onPrint,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Top Banner Card: Professional Polish Signature Blue Header */}
      <div className="bg-blue-700 p-6 sm:p-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-white">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {student.fullName}
            </h1>
            <span className="bg-blue-800/80 text-blue-100 text-xs font-bold px-2.5 py-1 rounded-md border border-blue-600/50">
              Lớp {student.classGroup}
            </span>
          </div>
          <p className="text-blue-100 text-xs sm:text-sm mt-1">
            STT danh sách: #{student.stt} • Trường THPT Giồng Riềng • Niên khóa 2025 - 2026
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center flex-wrap">
          {/* Status Badge */}
          {!verification ? (
            <span className="bg-amber-400/20 text-amber-100 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-400/30 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-300" />
              <span>Chưa đối soát</span>
            </span>
          ) : verification.status === 'confirmed_correct' ? (
            <span className="bg-emerald-400/20 text-emerald-100 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-400/30 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
              <span>Đã xác nhận đúng</span>
            </span>
          ) : (
            <span className="bg-rose-400/20 text-rose-100 text-xs font-bold px-3 py-1.5 rounded-full border border-rose-400/30 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-300" />
              <span>Cần đính chính</span>
            </span>
          )}

          {/* Print Slip Button */}
          <button
            id="btn-print-slip"
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/25 px-3 py-1.5 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-blue-200" />
            <span>In phiếu</span>
          </button>
        </div>
      </div>

      {/* Verification Status Notification Bar if already submitted or pending */}
      {verification && (
        <div className={`p-4 text-xs sm:text-sm border-b ${
          verification.status === 'confirmed_correct'
            ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
            : 'bg-rose-50/90 border-rose-200 text-rose-900'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 sm:px-4">
            <div className="flex items-start gap-2.5">
              {verification.status === 'confirmed_correct' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold uppercase tracking-wider text-xs">
                  {verification.status === 'confirmed_correct'
                    ? 'Hồ sơ đã được xác nhận chính xác 100%'
                    : 'Hồ sơ đã được gửi báo cáo sai / cần điều chỉnh'}
                </div>
                <div className="text-xs mt-0.5 opacity-90">
                  Thời gian ghi nhận: <strong>{verification.verifiedAt}</strong>
                  {verification.verifiedBy && ` • Người xác nhận: ${verification.verifiedBy}`}
                </div>
                {verification.wrongFields && verification.wrongFields.length > 0 && (
                  <div className="mt-1 text-xs">
                    Mục sai: <strong className="text-rose-800">{verification.wrongFields.join(', ')}</strong>
                  </div>
                )}
                {verification.correctionNotes && (
                  <div className="mt-0.5 italic text-xs text-slate-700">
                    "{verification.correctionNotes}"
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onResetVerification}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 underline cursor-pointer self-start sm:self-center"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Thay đổi phản hồi</span>
            </button>
          </div>
        </div>
      )}

      {/* Body: High-Contrast Professional Data Fields */}
      <div className="p-6 sm:p-10 space-y-10">
        {/* Section 1: Thông tin Định danh & Căn cước công dân */}
        <div>
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-6">
            <ShieldCheck className="h-4 w-4" />
            <span>1. Thông tin Định danh & Căn cước công dân (CCCD)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Họ và tên học sinh</span>
              <span className="text-lg sm:text-xl font-semibold text-slate-800">{student.fullName}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Số Căn cước công dân (CCCD)</span>
              <span className="text-lg sm:text-xl font-mono font-semibold text-blue-800 tracking-wider">
                {student.idCard.number}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ngày tháng năm sinh</span>
              <span className="text-base font-semibold text-slate-800">{student.birthDate}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Giới tính</span>
              <span className="text-base font-semibold text-slate-800">{student.gender}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dân tộc</span>
              <span className="text-base font-semibold text-slate-800">{student.ethnicity}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tôn giáo</span>
              <span className="text-base font-semibold text-slate-800">{student.religion || 'Không'}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quốc tịch</span>
              <span className="text-base font-semibold text-slate-800">{student.nationality}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ngày cấp CCCD</span>
              <span className="text-base font-semibold text-slate-800">{student.idCard.issueDate}</span>
            </div>

            <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nơi cấp Căn cước</span>
              <span className="text-base font-semibold text-slate-800">{student.idCard.issuePlace}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Thông tin Học tập & Tuyển sinh */}
        <div>
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-6">
            <GraduationCap className="h-4 w-4" />
            <span>2. Thông tin Học tập & Tuyển sinh THPT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ngày vào trường</span>
              <span className="text-base font-semibold text-slate-800">{student.admissionDate}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Diện chính sách</span>
              <span className="text-base font-semibold text-slate-800">{student.policyBeneficiary || 'Không'}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hộ nghèo / Cận nghèo</span>
              <span className="text-base font-semibold text-slate-800">{student.nearPoor || 'Không'}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tình trạng khuyết tật</span>
              <span className="text-base font-semibold text-slate-800">{student.contact.disability || 'Không'}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Địa chỉ & Cư trú */}
        <div>
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-6">
            <MapPin className="h-4 w-4" />
            <span>3. Thông tin Địa chỉ & Hộ tịch cư trú</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hộ khẩu thường trú */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 flex flex-col justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Hộ khẩu thường trú
                </span>
                <div className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
                  {student.permanentAddress.hamlet}, {student.permanentAddress.ward}, {student.permanentAddress.province}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/80 text-xs">
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-700">
                  <span className="text-slate-400 font-medium mr-1">Ấp/Khóm:</span>
                  <strong>{student.permanentAddress.hamlet}</strong>
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-700">
                  <span className="text-slate-400 font-medium mr-1">Xã/Phường:</span>
                  <strong>{student.permanentAddress.ward}</strong>
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-700">
                  <span className="text-slate-400 font-medium mr-1">Tỉnh/TP:</span>
                  <strong>{student.permanentAddress.province}</strong>
                </span>
              </div>
            </div>

            {/* Chỗ ở hiện nay */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 flex flex-col justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Chỗ ở hiện nay
                </span>
                <div className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
                  {student.currentAddress.hamlet}, {student.currentAddress.ward}, {student.currentAddress.province}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/80 text-xs">
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-700">
                  <span className="text-slate-400 font-medium mr-1">Ấp/Khóm:</span>
                  <strong>{student.currentAddress.hamlet}</strong>
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-700">
                  <span className="text-slate-400 font-medium mr-1">Xã/Phường:</span>
                  <strong>{student.currentAddress.ward}</strong>
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-700">
                  <span className="text-slate-400 font-medium mr-1">Tỉnh/TP:</span>
                  <strong>{student.currentAddress.province}</strong>
                </span>
              </div>
            </div>

            {/* Nơi sinh */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 flex flex-col justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  Nơi sinh
                </span>
                <div className="space-y-2.5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Địa chỉ theo giấy khai sinh:
                    </span>
                    <span className="text-base font-semibold text-slate-800">
                      {student.birthPlace.detail}
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5 pt-2 border-t border-slate-200/80">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      Xã, tỉnh theo địa chỉ mới:
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-slate-800">
                      {student.birthPlace.ward === 'Đợi hội đồng sư phạm xác thực'
                        ? 'Đợi hội đồng sư phạm xác thực'
                        : student.birthPlace.province &&
                          student.birthPlace.province !== 'Đợi hội đồng sư phạm xác thực' &&
                          !student.birthPlace.ward.includes(student.birthPlace.province)
                        ? `${student.birthPlace.ward}, ${student.birthPlace.province}`
                        : student.birthPlace.ward}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quê quán */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 flex flex-col justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  Quê quán
                </span>
                <div className="space-y-2.5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Địa chỉ cũ (Ấp, Xã, Huyện, Tỉnh):
                    </span>
                    <span className="text-base font-semibold text-slate-800">
                      {student.hometown.detail}
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5 pt-2 border-t border-slate-200/80">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      Xã, tỉnh theo địa chỉ mới:
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-slate-800">
                      {student.hometown.ward}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Cha Mẹ & Liên hệ */}
        <div>
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-6">
            <Users className="h-4 w-4" />
            <span>4. Thông tin Phụ huynh & Điện thoại liên lạc</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Father Card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-3">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Thông tin Cha</span>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400 font-medium">Họ và tên</span>
                <span className="text-base font-semibold text-slate-800">{student.father.name || 'Chưa cập nhật'}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Năm sinh: <strong>{student.father.birthYear || '—'}</strong></span>
                <span>Nghề: <strong>{student.father.job || '—'}</strong></span>
              </div>
              <div className="pt-2 border-t border-slate-200 text-xs">
                <span className="text-slate-400 block mb-0.5">Số điện thoại:</span>
                {student.father.phone ? (
                  <a href={`tel:${student.father.phone}`} className="font-mono font-bold text-blue-700 hover:underline">
                    {student.father.phone}
                  </a>
                ) : (
                  <span className="text-slate-400 italic">Chưa có</span>
                )}
              </div>
            </div>

            {/* Mother Card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-3">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Thông tin Mẹ</span>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400 font-medium">Họ và tên</span>
                <span className="text-base font-semibold text-slate-800">{student.mother.name || 'Chưa cập nhật'}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Năm sinh: <strong>{student.mother.birthYear || '—'}</strong></span>
                <span>Nghề: <strong>{student.mother.job || '—'}</strong></span>
              </div>
              <div className="pt-2 border-t border-slate-200 text-xs">
                <span className="text-slate-400 block mb-0.5">Số điện thoại:</span>
                {student.mother.phone ? (
                  <a href={`tel:${student.mother.phone}`} className="font-mono font-bold text-blue-700 hover:underline">
                    {student.mother.phone}
                  </a>
                ) : (
                  <span className="text-slate-400 italic">Chưa có</span>
                )}
              </div>
            </div>

            {/* School Contact Card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-2 justify-center">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Điện thoại học sinh</span>
              <div className="flex flex-col gap-1">
                <span className="text-base font-mono font-semibold text-slate-800">
                  {student.contact.studentPhone && student.contact.studentPhone !== 'Không'
                    ? student.contact.studentPhone
                    : 'Không có'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Thể chất & VNeID */}
        <div>
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-6">
            <Activity className="h-4 w-4" />
            <span>5. Thể chất, Sức khỏe & Định danh điện tử VNeID</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-1 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chiều cao</span>
              <span className="text-xl font-bold text-slate-800">{student.physical.height} <span className="text-xs font-normal text-slate-500">cm</span></span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-1 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cân nặng</span>
              <span className="text-xl font-bold text-slate-800">{student.physical.weight} <span className="text-xs font-normal text-slate-500">kg</span></span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-1 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Biết bơi</span>
              <span className="text-sm font-bold mt-1">
                {student.physical.canSwim ? (
                  <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">✓ Có</span>
                ) : (
                  <span className="text-slate-600 bg-slate-200 px-2.5 py-0.5 rounded-full inline-block">Chưa</span>
                )}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-1 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mắt</span>
              <span className="text-sm font-bold mt-1">
                {student.physical.eyeCondition && student.physical.eyeCondition !== 'Bình thường' ? (
                  <span className="text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block">{student.physical.eyeCondition}</span>
                ) : (
                  <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">Bình thường</span>
                )}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-1 text-center col-span-2 sm:col-span-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">VNeID Mức 2</span>
              <span className="text-sm font-bold mt-1">
                {student.physical.vneidLevel2 ? (
                  <span className="text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full inline-block">✓ Đã cài</span>
                ) : (
                  <span className="text-slate-600 bg-slate-200 px-2.5 py-0.5 rounded-full inline-block">Chưa</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Action Footer from Professional Polish Design */}
      <div className="bg-slate-50 p-6 sm:p-8 border-t border-slate-200 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
        <button
          id="btn-confirm-correct"
          type="button"
          onClick={onConfirmCorrect}
          className="w-full sm:w-auto flex-1 max-w-[260px] h-14 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer text-base"
        >
          <Check className="h-5 w-5" />
          <span>Xác nhận ĐÚNG</span>
        </button>

        <button
          id="btn-report-error"
          type="button"
          onClick={onReportError}
          className="w-full sm:w-auto flex-1 max-w-[260px] h-14 bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer text-base"
        >
          <X className="h-5 w-5" />
          <span>Báo SAI</span>
        </button>
      </div>
    </div>
  );
};
