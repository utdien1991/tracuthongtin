import React, { useState } from 'react';
import { StudentRecord, VerificationRecord } from '../types';
import { X, CheckCircle2, AlertTriangle, Send } from 'lucide-react';

interface VerificationModalProps {
  type: 'correct' | 'error' | null;
  student: StudentRecord;
  onClose: () => void;
  onSave: (record: VerificationRecord) => void;
}

const ERROR_FIELD_OPTIONS = [
  'Họ và tên hoặc Ngày sinh',
  'Giới tính / Dân tộc / Tôn giáo',
  'Số CCCD / Ngày cấp / Nơi cấp',
  'Chỗ ở hiện nay (Số nhà, Ấp, Xã/Phường)',
  'Hộ khẩu thường trú',
  'Nơi sinh / Quê quán',
  'Họ tên hoặc Năm sinh Cha / Mẹ',
  'Nghề nghiệp Cha / Mẹ',
  'Số điện thoại Cha / Mẹ / Học sinh',
  'Chiều cao / Cân nặng / Mắt / Bơi lội',
  'Tình trạng cài đặt VNeID Mức 2',
  'Thông tin khác',
];

export const VerificationModal: React.FC<VerificationModalProps> = ({
  type,
  student,
  onClose,
  onSave,
}) => {
  if (!type) return null;

  // Form states
  const [verifierName, setVerifierName] = useState('Học sinh / Phụ huynh');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [phone, setPhone] = useState(
    student.contact.studentPhone || student.father.phone || student.mother.phone || ''
  );

  const toggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleConfirmCorrect = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      cccd: student.idCard.number,
      status: 'confirmed_correct',
      verifiedAt: '',
      verifiedBy: verifierName.trim() || 'Học sinh / Phụ huynh',
    });
    onClose();
  };

  const handleReportError = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      cccd: student.idCard.number,
      status: 'reported_error',
      verifiedAt: '',
      verifiedBy: verifierName.trim() || 'Học sinh / Phụ huynh',
      wrongFields: selectedFields.length > 0 ? selectedFields : ['Thông tin chung'],
      correctionNotes: notes.trim() || 'Cần kiểm tra và cập nhật lại thông tin',
      contactPhone: phone.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          title="Đóng"
        >
          <X className="h-5 w-5" />
        </button>

        {type === 'correct' ? (
          /* Modal Xác nhận ĐÚNG */
          <form onSubmit={handleConfirmCorrect} className="space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Đối soát dữ liệu
                </div>
                <h3 className="text-lg font-bold text-slate-900">Xác nhận thông tin ĐÚNG</h3>
                <p className="text-xs text-slate-500">
                  Học sinh: <strong className="text-slate-800">{student.fullName}</strong> (Lớp {student.classGroup})
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700 leading-relaxed">
              Bằng việc bấm xác nhận, bạn cam kết đã kiểm tra kỹ toàn bộ các trường thông tin định danh, cư trú, gia đình và thể chất của học sinh trên biểu mẫu là hoàn toàn chính xác.
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Người thực hiện xác nhận:
              </label>
              <input
                type="text"
                value={verifierName}
                onChange={(e) => setVerifierName(e.target.value)}
                placeholder="Ví dụ: Phụ huynh em Ngô Quốc Anh..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-100 font-medium"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                id="btn-submit-confirm-correct"
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Xác nhận thông tin chính xác</span>
              </button>
            </div>
          </form>
        ) : (
          /* Modal Báo SAI / Cần sửa */
          <form onSubmit={handleReportError} className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
                <AlertTriangle className="h-7 w-7" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Đính chính hồ sơ
                </div>
                <h3 className="text-lg font-bold text-slate-900">Báo sai thông tin & Cần chỉnh sửa</h3>
                <p className="text-xs text-slate-500">
                  Học sinh: <strong className="text-slate-800">{student.fullName}</strong> (CCCD: {student.idCard.number})
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-700 leading-relaxed">
              Vui lòng tích chọn các mục thông tin chưa chính xác và ghi chú rõ nội dung đúng để giáo viên chủ nhiệm & ban quản lý hồ sơ cập nhật lại.
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Chọn các trường thông tin bị sai (có thể chọn nhiều mục):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-44 overflow-y-auto p-2 border border-slate-200 rounded-xl bg-slate-50">
                {ERROR_FIELD_OPTIONS.map((field) => {
                  const isChecked = selectedFields.includes(field);
                  return (
                    <label
                      key={field}
                      className={`flex items-center gap-2 p-1.5 rounded-lg cursor-pointer text-xs select-none transition-colors ${
                        isChecked ? 'bg-rose-100/70 text-rose-900 font-semibold' : 'text-slate-700 hover:bg-slate-200/60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleField(field)}
                        className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                      />
                      <span>{field}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Chi tiết nội dung cần sửa chính xác: <span className="text-rose-600">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ví dụ: Ngày sinh đúng là 05/08/2010; Số điện thoại bố đổi thành 0987xxxxxx; Thường trú tại Ấp 7 chứ không phải Ấp 6..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-rose-600 focus:outline-hidden focus:ring-2 focus:ring-rose-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Người báo thông tin:
                </label>
                <input
                  type="text"
                  value={verifierName}
                  onChange={(e) => setVerifierName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Số điện thoại để GVCN liên hệ:
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="SĐT liên lạc..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                id="btn-submit-report-error"
                type="submit"
                disabled={!notes.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 px-6 py-2.5 text-xs font-bold text-white disabled:bg-slate-300 disabled:cursor-not-allowed shadow-xs transition-colors cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Gửi phản ánh đính chính</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
