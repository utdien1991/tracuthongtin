import React, { useState } from 'react';
import { VerificationRecord, StudentRecord } from '../types';
import { STUDENTS_DATA } from '../data/studentsData';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Download,
  Trash2,
  Clock,
  Search,
  FileSpreadsheet,
} from 'lucide-react';

interface TeacherAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  verifications: Record<string, VerificationRecord>;
  onSelectStudentCCCD: (cccd: string) => void;
  onClearAll: () => void;
  onOpenGoogleSheets: () => void;
}

export const TeacherAuditModal: React.FC<TeacherAuditModalProps> = ({
  isOpen,
  onClose,
  verifications,
  onSelectStudentCCCD,
  onClearAll,
  onOpenGoogleSheets,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'error' | 'unverified'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const totalStudents = STUDENTS_DATA.length;
  const verifiedList: VerificationRecord[] = Object.values(verifications);
  const correctCount = verifiedList.filter((v) => v.status === 'confirmed_correct').length;
  const errorCount = verifiedList.filter((v) => v.status === 'reported_error').length;
  const unverifiedCount = totalStudents - (correctCount + errorCount);

  // Filter items
  const studentItems = STUDENTS_DATA.map((s) => {
    const v = verifications[s.idCard.number];
    return {
      student: s,
      verification: v || null,
      status: v ? v.status : 'unverified',
    };
  }).filter((item) => {
    if (filter === 'correct' && item.status !== 'confirmed_correct') return false;
    if (filter === 'error' && item.status !== 'reported_error') return false;
    if (filter === 'unverified' && item.status !== 'unverified') return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        item.student.fullName.toLowerCase().includes(q) ||
        item.student.idCard.number.includes(q) ||
        item.student.classGroup.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const exportCSV = () => {
    const headers = [
      'STT',
      'Họ và tên',
      'Lớp',
      'Số CCCD',
      'Nơi sinh (GKS)',
      'Xã, tỉnh nơi sinh mới',
      'Trạng thái đối soát',
      'Thời gian xác nhận',
      'Người xác nhận',
      'Trường thông tin báo sai',
      'Ghi chú chỉnh sửa',
      'SĐT liên hệ',
    ];

    const rows = STUDENTS_DATA.map((s) => {
      const v = verifications[s.idCard.number];
      const statusText = !v
        ? 'Chưa tra cứu'
        : v.status === 'confirmed_correct'
        ? 'Chính xác 100%'
        : 'Báo thông tin sai';
      const birthNewStr =
        s.birthPlace.ward === 'Đợi hội đồng sư phạm xác thực'
          ? 'Đợi hội đồng sư phạm xác thực'
          : s.birthPlace.province &&
            s.birthPlace.province !== 'Đợi hội đồng sư phạm xác thực' &&
            !s.birthPlace.ward.includes(s.birthPlace.province)
          ? `${s.birthPlace.ward}, ${s.birthPlace.province}`
          : s.birthPlace.ward;

      return [
        s.stt,
        `"${s.fullName}"`,
        s.classGroup,
        `"${s.idCard.number}"`,
        `"${s.birthPlace.detail.replace(/"/g, '""')}"`,
        `"${birthNewStr.replace(/"/g, '""')}"`,
        `"${statusText}"`,
        `"${v?.verifiedAt || ''}"`,
        `"${v?.verifiedBy || ''}"`,
        `"${(v?.wrongFields || []).join('; ')}"`,
        `"${(v?.correctionNotes || '').replace(/"/g, '""')}"`,
        `"${v?.contactPhone || ''}"`,
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `DoiSoat_HoSo_THPT_GiongRieng_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Quản trị viên & GVCN
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Báo cáo tiến độ đối soát hồ sơ học sinh
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Trường THPT Giồng Riềng • Khối 10 (Năm học 2025 - 2026)
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stats Summary Bento */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Tổng số học sinh</div>
            <div className="text-2xl font-bold text-slate-800 mt-1">{totalStudents}</div>
          </div>

          <div
            onClick={() => setFilter('correct')}
            className={`rounded-xl border p-3.5 text-center cursor-pointer transition-colors ${
              filter === 'correct' ? 'border-emerald-500 bg-emerald-50/90' : 'border-slate-200 bg-emerald-50/40 hover:bg-emerald-50/70'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center justify-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Đã xác nhận đúng</span>
            </div>
            <div className="text-2xl font-bold text-emerald-700 mt-1">{correctCount}</div>
          </div>

          <div
            onClick={() => setFilter('error')}
            className={`rounded-xl border p-3.5 text-center cursor-pointer transition-colors ${
              filter === 'error' ? 'border-rose-500 bg-rose-50/90' : 'border-slate-200 bg-rose-50/40 hover:bg-rose-50/70'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-rose-800 flex items-center justify-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
              <span>Báo sai / Cần sửa</span>
            </div>
            <div className="text-2xl font-bold text-rose-700 mt-1">{errorCount}</div>
          </div>

          <div
            onClick={() => setFilter('unverified')}
            className={`rounded-xl border p-3.5 text-center cursor-pointer transition-colors ${
              filter === 'unverified' ? 'border-amber-500 bg-amber-50/90' : 'border-slate-200 bg-amber-50/40 hover:bg-amber-50/70'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center justify-center gap-1">
              <Clock className="h-3.5 w-3.5 text-amber-600" />
              <span>Chưa đối soát</span>
            </div>
            <div className="text-2xl font-bold text-amber-700 mt-1">{unverifiedCount}</div>
          </div>
        </div>

        {/* Action & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tất cả ({totalStudents})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                filter === 'correct' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Đúng ({correctCount})
            </button>
            <button
              onClick={() => setFilter('error')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                filter === 'error' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Báo sai ({errorCount})
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
            <button
              id="btn-audit-open-google-sheets"
              onClick={onOpenGoogleSheets}
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-2xs cursor-pointer"
              title="Lưu trữ và đồng bộ trực tuyến vào Google Sheet"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
              <span>Lưu Google Sheet</span>
            </button>
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
              title="Tải tệp Excel / CSV để GVCN cập nhật"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span>Xuất CSV</span>
            </button>
            {Object.keys(verifications).length > 0 && (
              <button
                onClick={onClearAll}
                className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50/50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                title="Xóa toàn bộ phản hồi đã lưu để thử lại"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Đặt lại</span>
              </button>
            )}
          </div>
        </div>

        {/* Audit List Table */}
        <div className="flex-1 overflow-y-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/75 sticky top-0 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">STT</th>
                <th className="p-3">Họ và tên</th>
                <th className="p-3">Lớp</th>
                <th className="p-3">Số CCCD</th>
                <th className="p-3">Trạng thái đối soát</th>
                <th className="p-3">Ghi chú phản ánh</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {studentItems.map((item) => (
                <tr key={item.student.idCard.number} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono text-slate-400">#{item.student.stt}</td>
                  <td className="p-3 font-semibold text-slate-900">{item.student.fullName}</td>
                  <td className="p-3 font-semibold text-blue-700">{item.student.classGroup}</td>
                  <td className="p-3 font-mono text-slate-600 font-medium">{item.student.idCard.number}</td>
                  <td className="p-3">
                    {item.status === 'confirmed_correct' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="h-3 w-3" />
                        Chính xác
                      </span>
                    ) : item.status === 'reported_error' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-100/80 px-2.5 py-0.5 text-[11px] font-bold text-rose-800 border border-rose-200">
                        <AlertTriangle className="h-3 w-3" />
                        Cần sửa
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
                        Chưa đối soát
                      </span>
                    )}
                  </td>
                  <td className="p-3 max-w-xs truncate text-[11px] text-slate-600">
                    {item.verification?.correctionNotes ||
                      (item.verification?.wrongFields
                        ? item.verification.wrongFields.join(', ')
                        : '—')}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        onSelectStudentCCCD(item.student.idCard.number);
                        onClose();
                      }}
                      className="text-blue-700 hover:text-blue-900 font-bold text-xs hover:underline cursor-pointer"
                    >
                      Xem hồ sơ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
