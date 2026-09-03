import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  googleSignIn,
  logoutGoogle,
  initAuth,
  getAccessToken,
  setAccessTokenInMemory,
} from '../services/googleAuth';
import {
  createGoogleSheet,
  getGoogleSheetMetadata,
  syncStudentsDataToSheet,
  extractSpreadsheetId,
  SheetMetadata,
  SyncResult,
} from '../services/googleSheets';
import { StudentRecord, VerificationRecord } from '../types';
import {
  FileSpreadsheet,
  X,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  PlusCircle,
  Link as LinkIcon,
  LogOut,
  Shield,
  Cloud,
  Check,
  AlertTriangle,
  FileCheck,
} from 'lucide-react';

interface GoogleSheetsSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentRecord[];
  verifications: Record<string, VerificationRecord>;
  onSyncSuccess?: (result: SyncResult) => void;
}

const STORAGE_KEY_SHEET_CONFIG = 'thpt_giongrieng_google_sheet_config_v1';

export const GoogleSheetsSyncModal: React.FC<GoogleSheetsSyncModalProps> = ({
  isOpen,
  onClose,
  students,
  verifications,
  onSyncSuccess,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  // Spreadsheet configuration
  const [spreadsheetId, setSpreadsheetId] = useState<string>('');
  const [spreadsheetTitle, setSpreadsheetTitle] = useState<string>('');
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string>('');
  const [customSheetName, setCustomSheetName] = useState<string>(
    'Hồ Sơ & Đối Soát 10T4 - THPT Giồng Riềng'
  );
  const [existingUrlInput, setExistingUrlInput] = useState<string>('');

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState<SyncResult | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  // Mandatory confirmation dialog for updating/modifying Google Sheet data
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Load stored sheet configuration
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SHEET_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.spreadsheetId) {
          setSpreadsheetId(parsed.spreadsheetId);
          setSpreadsheetTitle(parsed.title || 'Google Sheet');
          setSpreadsheetUrl(
            parsed.url || `https://docs.google.com/spreadsheets/d/${parsed.spreadsheetId}/edit`
          );
        }
        if (parsed.lastSync) {
          setLastSyncResult(parsed.lastSync);
        }
      }
    } catch (e) {
      console.error('Error loading saved sheet config:', e);
    }
  }, []);

  // Initialize auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setHasToken(Boolean(token));
      },
      () => {
        setCurrentUser(null);
        setHasToken(false);
      }
    );
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setStatusMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setHasToken(true);
        setStatusMessage({
          type: 'success',
          text: `Đăng nhập thành công tài khoản Google: ${res.user.email}`,
        });
      }
    } catch (error: any) {
      console.error(error);
      setStatusMessage({
        type: 'error',
        text: `Đăng nhập Google không thành công: ${error.message || 'Vui lòng thử lại'}`,
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutGoogle();
      setCurrentUser(null);
      setHasToken(false);
      setStatusMessage({
        type: 'info',
        text: 'Đã đăng xuất khỏi tài khoản Google.',
      });
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleReauth = async () => {
    try {
      await logoutGoogle();
      setCurrentUser(null);
      setHasToken(false);
      await handleSignIn();
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleCreateNewSheet = async () => {
    if (!hasToken) {
      setStatusMessage({
        type: 'error',
        text: 'Vui lòng đăng nhập Google trước khi tạo file Google Sheet.',
      });
      return;
    }

    setIsCreating(true);
    setStatusMessage(null);
    try {
      const meta = await createGoogleSheet(
        customSheetName.trim() || 'Hồ Sơ & Đối Soát 10T4 - THPT Giồng Riềng'
      );
      setSpreadsheetId(meta.spreadsheetId);
      setSpreadsheetTitle(meta.title);
      setSpreadsheetUrl(meta.spreadsheetUrl);

      // Save to localStorage
      localStorage.setItem(
        STORAGE_KEY_SHEET_CONFIG,
        JSON.stringify({
          spreadsheetId: meta.spreadsheetId,
          title: meta.title,
          url: meta.spreadsheetUrl,
          lastSync: lastSyncResult,
        })
      );

      setStatusMessage({
        type: 'success',
        text: `Đã tạo thành công file Google Sheet mới trên Google Drive: "${meta.title}"`,
      });
    } catch (error: any) {
      console.error(error);
      setStatusMessage({
        type: 'error',
        text: `Lỗi tạo Google Sheet: ${error.message}`,
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleConnectExisting = async () => {
    if (!hasToken) {
      setStatusMessage({
        type: 'error',
        text: 'Vui lòng đăng nhập Google trước khi liên kết file.',
      });
      return;
    }

    const cleanId = extractSpreadsheetId(existingUrlInput);
    if (!cleanId) {
      setStatusMessage({
        type: 'error',
        text: 'Vui lòng nhập đường link (URL) hoặc mã ID Google Sheet hợp lệ.',
      });
      return;
    }

    setIsCreating(true);
    setStatusMessage(null);
    try {
      const meta = await getGoogleSheetMetadata(cleanId);
      setSpreadsheetId(meta.spreadsheetId);
      setSpreadsheetTitle(meta.title);
      setSpreadsheetUrl(meta.spreadsheetUrl);
      setExistingUrlInput('');

      // Save to localStorage
      localStorage.setItem(
        STORAGE_KEY_SHEET_CONFIG,
        JSON.stringify({
          spreadsheetId: meta.spreadsheetId,
          title: meta.title,
          url: meta.spreadsheetUrl,
          lastSync: lastSyncResult,
        })
      );

      setStatusMessage({
        type: 'success',
        text: `Đã kết nối thành công với Google Sheet: "${meta.title}"`,
      });
    } catch (error: any) {
      console.error(error);
      setStatusMessage({
        type: 'error',
        text: `Không thể kết nối đến Google Sheet này: ${error.message}. Hãy chắc chắn bạn đã có quyền truy cập.`,
      });
    } finally {
      setIsCreating(false);
    }
  };

  // Trigger confirmation dialog before executing the sync operation
  const requestSyncConfirmation = () => {
    if (!hasToken) {
      setStatusMessage({
        type: 'error',
        text: 'Vui lòng đăng nhập Google trước khi đồng bộ.',
      });
      return;
    }
    if (!spreadsheetId) {
      setStatusMessage({
        type: 'error',
        text: 'Vui lòng tạo hoặc liên kết một file Google Sheet trước.',
      });
      return;
    }
    setShowConfirmModal(true);
  };

  const executeSync = async () => {
    setShowConfirmModal(false);
    setIsSyncing(true);
    setStatusMessage(null);

    try {
      const result = await syncStudentsDataToSheet(
        spreadsheetId,
        students,
        verifications,
        'DoiSoat_HocSinh_10T4'
      );

      setLastSyncResult(result);
      if (onSyncSuccess) onSyncSuccess(result);

      // Persist config with last sync
      localStorage.setItem(
        STORAGE_KEY_SHEET_CONFIG,
        JSON.stringify({
          spreadsheetId,
          title: spreadsheetTitle,
          url: spreadsheetUrl,
          lastSync: result,
        })
      );

      setStatusMessage({
        type: 'success',
        text: `Đã lưu trữ trực tuyến thành công ${result.updatedRows} hồ sơ và kết quả đối soát lên Google Sheet!`,
      });
    } catch (error: any) {
      console.error(error);
      setStatusMessage({
        type: 'error',
        text: `Đồng bộ lên Google Sheet thất bại: ${error.message}`,
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const verifiedList = Object.values(verifications) as VerificationRecord[];
  const confirmedCount = verifiedList.filter(
    (v) => v.status === 'confirmed_correct'
  ).length;
  const reportedCount = verifiedList.filter(
    (v) => v.status === 'reported_error'
  ).length;

  return (
    <div
      id="google-sheets-sync-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/30">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-2">
                Lưu Trữ Dữ Liệu Trực Tuyến Lên Google Sheet
              </h3>
              <p className="text-xs text-slate-300">
                Đồng bộ tự động hồ sơ 45 học sinh và nhật ký đối soát vào Google Drive
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Status Message Notification */}
          {statusMessage && (
            <div
              className={`rounded-xl p-3.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 border ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : statusMessage.type === 'error'
                  ? 'bg-rose-50 border-rose-200 text-rose-800'
                  : 'bg-blue-50 border-blue-200 text-blue-800'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                ) : statusMessage.type === 'error' ? (
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                ) : (
                  <Shield className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
                )}
                <span className="font-medium leading-relaxed">{statusMessage.text}</span>
              </div>

              {(statusMessage.text.includes('Lỗi 403') ||
                statusMessage.text.includes('insufficient') ||
                statusMessage.text.includes('quyền truy cập') ||
                statusMessage.text.includes('PERMISSION_DENIED')) && (
                <button
                  type="button"
                  onClick={handleReauth}
                  disabled={isSigningIn}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-rose-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-800 transition-colors shadow-2xs cursor-pointer"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isSigningIn ? 'animate-spin' : ''}`} />
                  <span>Đăng xuất & Cấp lại quyền Google</span>
                </button>
              )}
            </div>
          )}

          {/* Step 1: Google Account Authentication */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
                  1
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Tài Khoản Google Cán Bộ / GVCN
                </span>
              </div>
              {currentUser && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                  Đã kết nối
                </span>
              )}
            </div>

            {!currentUser ? (
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500 max-w-sm">
                  Đăng nhập bằng tài khoản Google để ứng dụng có quyền tạo và cập nhật bảng tính trên
                  Google Drive của bạn một cách an toàn.
                </p>

                {/* Official Google Sign In Button (styled as mandated by SKILL.md) */}
                <button
                  id="btn-google-signin"
                  onClick={handleSignIn}
                  disabled={isSigningIn}
                  className="gsi-material-button inline-flex items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 active:bg-slate-100 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <div className="gsi-material-button-icon h-4 w-4">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      style={{ display: 'block' }}
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      ></path>
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      ></path>
                    </svg>
                  </div>
                  <span className="gsi-material-button-contents">
                    {isSigningIn ? 'Đang kết nối...' : 'Sign in with Google'}
                  </span>
                </button>
              </div>
            ) : (
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="Avatar"
                      className="h-9 w-9 rounded-full border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      {currentUser.displayName?.[0] || 'G'}
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      {currentUser.displayName || 'Tài khoản Google'}
                    </div>
                    <div className="text-[11px] text-slate-500">{currentUser.email}</div>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 font-medium px-2 py-1 rounded-md hover:bg-slate-100 transition-colors self-end sm:self-center cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Choose or Create Google Sheet */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
                  2
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  File Google Sheet Lưu Trữ Trực Tuyến
                </span>
              </div>
            </div>

            {/* Currently Active Spreadsheet Card */}
            {spreadsheetId ? (
              <div className="rounded-xl border-2 border-emerald-500/30 bg-white p-4 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                      File bảng tính đang kết nối:
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mt-0.5">
                      <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                      {spreadsheetTitle || 'HoSo_DoiSoat_THPT_GiongRieng_10T4'}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">ID: {spreadsheetId}</p>
                  </div>

                  <a
                    id="link-open-google-sheet"
                    href={spreadsheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-300 px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors self-start sm:self-center"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Mở trên Google Sheets</span>
                  </a>
                </div>

                {lastSyncResult && (
                  <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span>
                      Đồng bộ gần nhất: <strong>{lastSyncResult.syncedAt}</strong>
                    </span>
                    <span className="text-emerald-700 font-medium">
                      ✓ Đã lưu {lastSyncResult.updatedRows} hồ sơ
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                Chưa có file Google Sheet nào được thiết lập. Hãy chọn 1 trong 2 cách bên dưới để bắt đầu:
              </p>
            )}

            {/* Sub-actions: Create New or Connect Existing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {/* Option A: Create New */}
              <div className="rounded-lg border border-slate-200 bg-white p-3.5 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <PlusCircle className="h-4 w-4 text-blue-600" />
                  <span>Cách A: Tạo file Google Sheet mới</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Hệ thống sẽ tự động tạo bảng tính chuẩn hóa gồm 32 cột thông tin trên Google Drive
                  của bạn.
                </p>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600">Tên file:</label>
                  <input
                    type="text"
                    value={customSheetName}
                    onChange={(e) => setCustomSheetName(e.target.value)}
                    placeholder="Hồ Sơ & Đối Soát 10T4..."
                    className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <button
                  id="btn-create-google-sheet"
                  onClick={handleCreateNewSheet}
                  disabled={!hasToken || isCreating}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-xs font-bold text-white hover:bg-blue-800 transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>{isCreating ? 'Đang khởi tạo...' : 'Tạo mới trên Google Drive'}</span>
                </button>
              </div>

              {/* Option B: Connect Existing */}
              <div className="rounded-lg border border-slate-200 bg-white p-3.5 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <LinkIcon className="h-4 w-4 text-slate-700" />
                  <span>Cách B: Dùng file Google Sheet có sẵn</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Dán đường link (URL) hoặc mã Spreadsheet ID của file bạn đã tạo từ trước để liên kết.
                </p>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600">URL / ID Google Sheet:</label>
                  <input
                    type="text"
                    value={existingUrlInput}
                    onChange={(e) => setExistingUrlInput(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <button
                  id="btn-connect-google-sheet"
                  onClick={handleConnectExisting}
                  disabled={!hasToken || !existingUrlInput.trim() || isCreating}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <LinkIcon className="h-3.5 w-3.5" />
                  <span>Liên kết file có sẵn</span>
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Perform Synchronization with Data Overview */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
                  3
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Thực Hiện Đồng Bộ & Lưu Trữ Dữ Liệu
                </span>
              </div>
            </div>

            {/* Quick Metrics of Data Being Pushed */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                <div className="text-lg font-extrabold text-slate-900">{students.length}</div>
                <div className="text-[10px] font-semibold uppercase text-slate-500">
                  Tổng học sinh 10T4
                </div>
              </div>
              <div className="rounded-lg bg-white p-2.5 border border-emerald-200">
                <div className="text-lg font-extrabold text-emerald-600">{confirmedCount}</div>
                <div className="text-[10px] font-semibold uppercase text-emerald-700">
                  Xác nhận 100%
                </div>
              </div>
              <div className="rounded-lg bg-white p-2.5 border border-amber-200">
                <div className="text-lg font-extrabold text-amber-600">{reportedCount}</div>
                <div className="text-[10px] font-semibold uppercase text-amber-700">
                  Báo sai thông tin
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-blue-50/60 p-3 rounded-lg border border-blue-100 flex items-start gap-2">
              <Cloud className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
              <span>
                Dữ liệu đồng bộ bao gồm đầy đủ 32 trường: Định danh, CCCD, Nơi sinh theo Giấy khai sinh,
                Địa chỉ mới, Quê quán, Thông tin cha mẹ, SĐT, Tình trạng thể chất, và Toàn bộ nhật ký
                đối soát của học sinh/phụ huynh.
              </span>
            </div>

            <button
              id="btn-sync-to-sheets"
              onClick={requestSyncConfirmation}
              disabled={!hasToken || !spreadsheetId || isSyncing}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-md disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>
                {isSyncing
                  ? 'Đang đồng bộ dữ liệu lên Google Sheet...'
                  : 'Lưu Trữ & Cập Nhật Lên Google Sheet Ngay'}
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <span>Hệ thống tuân thủ bảo mật Google Workspace OAuth & Firebase Auth</span>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>

      {/* Mandatory User Confirmation Dialog for Workspace API mutating operation */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/70 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Xác nhận lưu trữ lên Google Sheet?
              </h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Bạn sắp thực hiện cập nhật{' '}
              <strong className="text-slate-900">toàn bộ {students.length} hồ sơ học sinh</strong> và
              nhật ký đối soát hiện tại vào file Google Sheet:{' '}
              <strong className="text-emerald-700">{spreadsheetTitle || spreadsheetId}</strong>.
            </p>

            <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-700 space-y-1 border border-slate-200">
              <div>• Bảng tính đích: <strong>DoiSoat_HocSinh_10T4</strong></div>
              <div>• Số lượng dòng cập nhật: <strong>{students.length} học sinh</strong></div>
              <div>• Trạng thái xác nhận: <strong>{confirmedCount} đúng</strong>, <strong>{reportedCount} báo sai</strong></div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              Thao tác này sẽ ghi đè nội dung bảng tính để đảm bảo tính đồng nhất mới nhất giữa hệ thống
              và Google Drive.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                id="btn-confirm-execute-sync"
                onClick={executeSync}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
              >
                Xác nhận lưu lên Google Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
