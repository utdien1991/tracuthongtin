import React from 'react';
import { StudentRecord, VerificationRecord } from '../types';

interface VerificationSlipPrintProps {
  student: StudentRecord;
  verification: VerificationRecord | null;
}

export const VerificationSlipPrint: React.FC<VerificationSlipPrintProps> = ({
  student,
  verification,
}) => {
  return (
    <div className="hidden print:block p-8 max-w-2xl mx-auto bg-white text-black font-sans leading-relaxed text-sm">
      {/* Header */}
      <div className="text-center pb-4 border-b-2 border-black">
        <div className="text-xs uppercase font-semibold">SỞ GIÁO DỤC VÀ ĐÀO TẠO AN GIANG</div>
        <div className="text-base font-bold uppercase">TRƯỜNG THPT GIỒNG RIỀNG</div>
        <div className="text-xs italic mt-1">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
        <div className="text-xs font-semibold">Độc lập - Tự do - Hạnh phúc</div>
      </div>

      <div className="text-center my-6">
        <h2 className="text-xl font-bold uppercase tracking-wide">
          PHIẾU XÁC THỰC ĐỐI SOÁT HỒ SƠ HỌC SINH
        </h2>
        <p className="text-xs italic text-gray-700">
          (Dùng cho học sinh & phụ huynh nộp đối soát về bộ phận Quản lý hồ sơ / GVCN)
        </p>
      </div>

      {/* Info Sections */}
      <div className="space-y-4 text-xs">
        <div className="border border-black p-3">
          <div className="font-bold uppercase mb-2 border-b pb-1">I. THÔNG TIN HỌC SINH</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              Họ và tên: <strong className="text-sm">{student.fullName}</strong>
            </div>
            <div>
              Lớp: <strong>{student.classGroup}</strong> (STT: #{student.stt})
            </div>
            <div>
              Số Căn cước (CCCD): <strong>{student.idCard.number}</strong>
            </div>
            <div>
              Ngày cấp: <strong>{student.idCard.issueDate}</strong> ({student.idCard.issuePlace})
            </div>
            <div>
              Ngày sinh: <strong>{student.birthDate}</strong>
            </div>
            <div>
              Giới tính: <strong>{student.gender}</strong>
            </div>
            <div>
              Dân tộc: <strong>{student.ethnicity}</strong>
            </div>
            <div>
              Tôn giáo: <strong>{student.religion || 'Không'}</strong>
            </div>
            <div>
              Chiều cao / Cân nặng: <strong>{student.physical.height} cm / {student.physical.weight} kg</strong>
            </div>
            <div>
              VNeID Mức 2: <strong>{student.physical.vneidLevel2 ? 'Đã cài đặt' : 'Chưa cài'}</strong>
            </div>
          </div>
        </div>

        <div className="border border-black p-3">
          <div className="font-bold uppercase mb-2 border-b pb-1">II. CƯ TRÚ & QUÊ QUÁN</div>
          <div className="space-y-1.5 text-xs">
            <div>
              Chỗ ở hiện nay: <strong>{student.currentAddress.hamlet}, {student.currentAddress.ward}, {student.currentAddress.province}</strong>
            </div>
            <div>
              Hộ khẩu thường trú: <strong>{student.permanentAddress.hamlet}, {student.permanentAddress.ward}, {student.permanentAddress.province}</strong>
            </div>
            <div>
              Nơi sinh (theo Giấy khai sinh): <strong>{student.birthPlace.detail}</strong>
              <span className="block text-[11px] text-gray-700">
                Xã, tỉnh theo địa chỉ mới:{' '}
                <strong>
                  {student.birthPlace.ward === 'Đợi hội đồng sư phạm xác thực'
                    ? 'Đợi hội đồng sư phạm xác thực'
                    : student.birthPlace.province &&
                      student.birthPlace.province !== 'Đợi hội đồng sư phạm xác thực' &&
                      !student.birthPlace.ward.includes(student.birthPlace.province)
                    ? `${student.birthPlace.ward}, ${student.birthPlace.province}`
                    : student.birthPlace.ward}
                </strong>
              </span>
            </div>
            <div>
              Quê quán (địa chỉ cũ): <strong>{student.hometown.detail}</strong>
              <span className="block text-[11px] text-gray-700">Xã, tỉnh theo địa chỉ mới: <strong>{student.hometown.ward}</strong></span>
            </div>
          </div>
        </div>

        <div className="border border-black p-3">
          <div className="font-bold uppercase mb-2 border-b pb-1">III. THÔNG TIN PHỤ HUYNH & LIÊN HỆ</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              Cha: <strong>{student.father.name || '—'}</strong> ({student.father.birthYear || '—'})
            </div>
            <div>
              SĐT Bố: <strong>{student.father.phone || '—'}</strong>
            </div>
            <div>
              Mẹ: <strong>{student.mother.name || '—'}</strong> ({student.mother.birthYear || '—'})
            </div>
            <div>
              SĐT Mẹ: <strong>{student.mother.phone || '—'}</strong>
            </div>
            <div>
              SĐT Học sinh: <strong>{student.contact.studentPhone || '—'}</strong>
            </div>
            <div>
              Nghề nghiệp cha/mẹ: <strong>{student.father.job || '—'} / {student.mother.job || '—'}</strong>
            </div>
          </div>
        </div>

        <div className="border border-black p-3">
          <div className="font-bold uppercase mb-2 border-b pb-1">IV. KẾT QUẢ ĐỐI SOÁT CỦA HỌC SINH / PHỤ HUYNH</div>
          <div>
            Trạng thái xác nhận:{' '}
            <strong className="uppercase">
              {verification?.status === 'confirmed_correct'
                ? 'ĐÃ XÁC NHẬN CHÍNH XÁC 100%'
                : verification?.status === 'reported_error'
                ? 'BÁO SAI THÔNG TIN - CẦN ĐÍNH CHÍNH'
                : 'CHƯA XÁC NHẬN'}
            </strong>
          </div>
          {verification?.status === 'reported_error' && (
            <div className="mt-2 text-xs">
              <div>
                Trường bị sai: <strong>{(verification.wrongFields || []).join(', ')}</strong>
              </div>
              <div>
                Nội dung cần sửa: <strong>{verification.correctionNotes}</strong>
              </div>
              <div>
                SĐT liên hệ lại: <strong>{verification.contactPhone}</strong>
              </div>
            </div>
          )}
          <div className="mt-1">
            Thời gian xác nhận:{' '}
            <strong>
              {verification?.verifiedAt ||
                new Date().toLocaleString('vi-VN', { dateStyle: 'medium', timeStyle: 'short' })}
            </strong>
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="mt-8 grid grid-cols-2 text-center text-xs">
        <div>
          <div className="font-semibold">GIÁO VIÊN CHỦ NHIỆM</div>
          <div className="italic text-gray-500 mt-1">(Ký và ghi rõ họ tên)</div>
          <div className="h-16"></div>
        </div>
        <div>
          <div className="italic">Giồng Riềng, ngày ..... tháng ..... năm 202...</div>
          <div className="font-semibold mt-1">HỌC SINH / PHỤ HUYNH XÁC NHẬN</div>
          <div className="italic text-gray-500 mt-1">(Ký và ghi rõ họ tên)</div>
          <div className="h-16"></div>
          <div className="font-medium">{verification?.verifiedBy || student.fullName}</div>
        </div>
      </div>
    </div>
  );
};
