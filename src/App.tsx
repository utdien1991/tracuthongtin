import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { StudentProfile } from './components/StudentProfile';
import { VerificationModal } from './components/VerificationModal';
import { TeacherAuditModal } from './components/TeacherAuditModal';
import { GoogleSheetsSyncModal } from './components/GoogleSheetsSyncModal';
import { VerificationSlipPrint } from './components/VerificationSlipPrint';
import { STUDENTS_DATA, findStudentByCCCD } from './data/studentsData';
import {
  getVerifications,
  getVerificationForStudent,
  saveVerification,
  clearVerification,
} from './utils/storage';
import { StudentRecord, VerificationRecord } from './types';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  FileCheck2,
  FileSpreadsheet,
  HelpCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [verifications, setVerifications] = useState<Record<string, VerificationRecord>>({});
  const [modalType, setModalType] = useState<'correct' | 'error' | null>(null);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isGoogleSheetsOpen, setIsGoogleSheetsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load verifications from localStorage
  useEffect(() => {
    setVerifications(getVerifications());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSearch = (cccd: string) => {
    const cleanCCCD = cccd.trim().replace(/\D/g, '');
    setSearchQuery(cccd);

    if (!cleanCCCD) {
      setSearchError('Vui lòng nhập số Căn cước công dân để tra cứu.');
      setSelectedStudent(null);
      return;
    }

    const student = findStudentByCCCD(cleanCCCD);
    if (student) {
      setSelectedStudent(student);
      setSearchError(null);
      // Smooth scroll to profile
      window.scrollTo({ top: 180, behavior: 'smooth' });
    } else {
      setSelectedStudent(null);
      setSearchError(
        `Không tìm thấy hồ sơ học sinh với số CCCD "${cccd}". Vui lòng kiểm tra lại 12 chữ số trên thẻ CCCD hoặc liên hệ Giáo viên chủ nhiệm.`
      );
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedStudent(null);
    setSearchError(null);
  };

  const handleSaveVerification = (record: VerificationRecord) => {
    saveVerification(record);
    const updated = getVerifications();
    setVerifications(updated);
    if (record.status === 'confirmed_correct') {
      showToast('Đã ghi nhận xác nhận thông tin chính xác thành công!');
    } else {
      showToast('Đã gửi phản ánh thông tin cần sửa đổi về ban quản lý!');
    }
  };

  const handleResetVerification = () => {
    if (selectedStudent) {
      clearVerification(selectedStudent.idCard.number);
      const updated = getVerifications();
      setVerifications(updated);
      showToast('Đã đặt lại trạng thái đối soát cho học sinh này.');
    }
  };

  const handleClearAllVerifications = () => {
    if (window.confirm('Bạn có chắc chắn muốn đặt lại toàn bộ dữ liệu phản hồi đối soát?')) {
      localStorage.removeItem('thpt_giongrieng_student_verifications_v1');
      setVerifications({});
      showToast('Đã xóa dữ liệu đối soát thử nghiệm.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Counts for header badge
  const verifiedList: VerificationRecord[] = Object.values(verifications);
  const confirmedCount = verifiedList.filter((v) => v.status === 'confirmed_correct').length;
  const reportedCount = verifiedList.filter((v) => v.status === 'reported_error').length;

  const currentStudentVerification = selectedStudent
    ? verifications[selectedStudent.idCard.number] || null
    : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-xl transition-all animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen View (Hidden when printing) */}
      <div className="print:hidden flex-1 flex flex-col">
        {/* Official School Header */}
        <Header
          onOpenAudit={() => setIsAuditOpen(true)}
          onOpenGoogleSheets={() => setIsGoogleSheetsOpen(true)}
          auditCount={{
            confirmed: confirmedCount,
            reported: reportedCount,
            total: STUDENTS_DATA.length,
          }}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 space-y-8">
          {/* Search Section */}
          <div className="space-y-3">
            <div className="text-center max-w-xl mx-auto">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                Hệ thống xác thực trực tuyến
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Tra Cứu Hồ Sơ & Đối Soát Dữ Liệu
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Nhập số Căn cước công dân (12 số) của học sinh để mở khóa hồ sơ và thực hiện xác nhận.
              </p>
            </div>

            <SearchBar
              onSearch={handleSearch}
              searchError={searchError}
              currentQuery={searchQuery}
            />
          </div>

          {/* Conditional View: Profile or Privacy Placeholder */}
          {selectedStudent ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Kết quả tra cứu theo CCCD: <strong className="text-slate-800">{selectedStudent.idCard.number}</strong>
                </span>
                <button
                  onClick={handleClearSearch}
                  className="text-xs text-blue-700 hover:text-blue-900 hover:underline font-bold cursor-pointer"
                >
                  ← Tra cứu CCCD khác
                </button>
              </div>

              <StudentProfile
                student={selectedStudent}
                verification={currentStudentVerification}
                onConfirmCorrect={() => setModalType('correct')}
                onReportError={() => setModalType('error')}
                onResetVerification={handleResetVerification}
                onPrint={handlePrint}
              />
            </div>
          ) : (
            /* When NO search is performed: Strict Privacy & Guidance Banner (NO public student list) */
            <div className="w-full max-w-3xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs text-center space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 border border-slate-200">
                <Search className="h-8 w-8 text-slate-600" />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Bảo mật dữ liệu cá nhân
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Chưa có thông tin học sinh nào được hiển thị
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Nhằm tuân thủ nguyên tắc bảo mật thông tin cá nhân và Nghị định 13/2023/NĐ-CP, hệ
                  thống{' '}
                  <strong className="text-slate-700">
                    không hiển thị danh sách học sinh công khai
                  </strong>
                  . Mỗi học sinh hoặc phụ huynh chỉ có thể xem và xác thực đúng hồ sơ khi nhập chính
                  xác số Căn cước công dân (CCCD).
                </p>
              </div>

              {/* 3 Step Instruction Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-white text-[10px] font-bold">
                      1
                    </span>
                    <span className="uppercase tracking-wider">Nhập số CCCD</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Nhập 12 chữ số Căn cước công dân trên thẻ hoặc mã định danh cá nhân của học sinh.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-white text-[10px] font-bold">
                      2
                    </span>
                    <span className="uppercase tracking-wider">Kiểm tra hồ sơ</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Rà soát từng trường: định danh, nơi sinh, quê quán, thường trú, thông tin cha mẹ,
                    thể chất...
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-white text-[10px] font-bold">
                      3
                    </span>
                    <span className="uppercase tracking-wider">Xác nhận / Báo sai</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Bấm xác nhận đúng nếu khớp 100%, hoặc tích chọn trường bị sai kèm nội dung đính chính.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 mt-auto">
          <div className="max-w-5xl mx-auto px-4 space-y-1">
            <div className="font-semibold text-slate-700">
              TRƯỜNG THPT GIỒNG RIỀNG — TỈNH AN GIANG
            </div>
            <div>
              Phần mềm quản lý & đối soát hồ sơ học sinh năm học 2025 - 2026. Mọi thắc mắc vui lòng
              liên hệ Ban Giám hiệu hoặc Giáo viên chủ nhiệm.
            </div>
          </div>
        </footer>
      </div>

      {/* Printable Sheet (Visible only when user prints) */}
      {selectedStudent && (
        <VerificationSlipPrint
          student={selectedStudent}
          verification={currentStudentVerification}
        />
      )}

      {/* Modal Confirm Correct or Report Error */}
      {selectedStudent && modalType && (
        <VerificationModal
          type={modalType}
          student={selectedStudent}
          onClose={() => setModalType(null)}
          onSave={handleSaveVerification}
        />
      )}

      {/* Teacher / Admin Audit Modal */}
      <TeacherAuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        verifications={verifications}
        onSelectStudentCCCD={handleSearch}
        onClearAll={handleClearAllVerifications}
        onOpenGoogleSheets={() => {
          setIsAuditOpen(false);
          setIsGoogleSheetsOpen(true);
        }}
      />

      {/* Google Sheets Cloud Storage & Sync Modal */}
      <GoogleSheetsSyncModal
        isOpen={isGoogleSheetsOpen}
        onClose={() => setIsGoogleSheetsOpen(false)}
        students={STUDENTS_DATA}
        verifications={verifications}
        onSyncSuccess={(res) => {
          showToast(`Đã lưu trữ trực tuyến thành công ${res.updatedRows} hồ sơ lên Google Sheet!`);
        }}
      />
    </div>
  );
}
