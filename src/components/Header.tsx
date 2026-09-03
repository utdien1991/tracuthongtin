import React from 'react';
import { ShieldCheck, School, Lock } from 'lucide-react';

interface HeaderProps {
  onOpenAudit: () => void;
  auditCount: { confirmed: number; reported: number; total: number };
}

export const Header: React.FC<HeaderProps> = ({ onOpenAudit, auditCount }) => {
  return (
    <header className="border-b border-slate-200 bg-white shadow-xs">
      {/* Top Banner: Quốc hiệu & Tiêu ngữ */}
      <div className="bg-slate-900 px-6 py-2 text-center text-xs tracking-wider text-slate-300">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
            CỔNG THÔNG TIN ĐỐI SOÁT HỒ SƠ HỌC SINH NĂM HỌC 2025 - 2026
          </div>
          <div className="hidden sm:block text-slate-400">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM — Độc lập - Tự do - Hạnh phúc
          </div>
        </div>
      </div>

      {/* Main Professional Polish Header Bar */}
      <div className="mx-auto max-w-5xl px-6 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-white font-bold italic shadow-xs">
              <School className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                SỞ GIÁO DỤC VÀ ĐÀO TẠO AN GIANG
              </div>
              <h1 className="text-lg font-semibold tracking-tight text-slate-800 uppercase">
                TRƯỜNG THPT GIỒNG RIỀNG
              </h1>
            </div>
          </div>

          {/* Teacher / Auditor Indicator & Actions */}
          <div className="flex items-center gap-4 text-sm text-slate-500 self-end sm:self-center">
            <div className="hidden md:flex flex-col items-end leading-tight">
              <span className="font-medium text-slate-700 text-xs">Cán bộ phụ trách</span>
              <span className="text-[11px] text-slate-400">Tổ Quản lý hồ sơ & GVCN</span>
            </div>

            <button
              id="btn-teacher-audit"
              onClick={onOpenAudit}
              className="inline-flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
              title="Xem tiến độ đối soát hồ sơ lớp"
            >
              <ShieldCheck className="h-4 w-4 text-blue-700" />
              <span>Tiến độ đối soát</span>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-800">
                {auditCount.confirmed + auditCount.reported}/{auditCount.total}
              </span>
            </button>
          </div>
        </div>

        {/* Security Notice Banner */}
        <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-600">
          <Lock className="h-4 w-4 shrink-0 text-slate-500" />
          <span>
            <strong className="text-slate-800">Bảo mật thông tin:</strong> Hệ thống không công khai danh sách. Vui lòng nhập đúng 12 chữ số Căn cước công dân (CCCD) để mở khóa hồ sơ đối soát.
          </span>
        </div>
      </div>
    </header>
  );
};
