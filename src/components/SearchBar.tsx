import React, { useState } from 'react';
import { Search, X, AlertCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface SearchBarProps {
  onSearch: (cccd: string) => void;
  isSearching?: boolean;
  searchError: string | null;
  currentQuery: string;
}

const SAMPLE_STUDENTS = [
  { cccd: '091211012066', name: 'Ngô Quốc Anh', class: '10T4' },
  { cccd: '091211000973', name: 'Trương Kiều Tuấn Anh', class: '10T4' },
  { cccd: '091311008103', name: 'Trần Hồng Duyên', class: '10T4' },
  { cccd: '091211009476', name: 'Lê Quốc Khôi', class: '10T4' },
  { cccd: '091211018829', name: 'Ngô Minh Thuận', class: '10T4' },
  { cccd: '091311003492', name: 'Thạch Diệp Khánh Hân', class: '10T4' },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isSearching,
  searchError,
  currentQuery,
}) => {
  const [inputVal, setInputVal] = useState(currentQuery);
  const [showSamples, setShowSamples] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal);
    }
  };

  const handleSelectSample = (sampleCccd: string) => {
    setInputVal(sampleCccd);
    onSearch(sampleCccd);
  };

  const handleClear = () => {
    setInputVal('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
        <h2 className="text-xs font-bold uppercase text-slate-500 mb-3 tracking-widest">
          Tra cứu thông tin theo CCCD
        </h2>

        <form onSubmit={handleSubmit} className="relative">
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                id="cccd-search-input"
                type="text"
                inputMode="numeric"
                maxLength={15}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Nhập 12 số Căn cước công dân..."
                className="w-full h-12 pl-12 pr-10 bg-slate-100 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white text-base sm:text-lg font-mono text-slate-900 transition-all placeholder:text-slate-400 font-medium"
              />
              {inputVal && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                  title="Xóa tìm kiếm"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <button
              id="btn-submit-search"
              type="submit"
              disabled={!inputVal.trim() || isSearching}
              className="px-8 h-12 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
            >
              <Search className="h-4 w-4" />
              <span>Tìm kiếm</span>
            </button>
          </div>
        </form>

        {/* Error Message */}
        {searchError && (
          <div
            id="search-error-alert"
            className="mt-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm text-red-800"
          >
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
            <div>
              <p className="font-semibold text-xs uppercase tracking-wider">Không tìm thấy hồ sơ phù hợp</p>
              <p className="text-xs text-red-700 mt-0.5">{searchError}</p>
            </div>
          </div>
        )}

        {/* Sample Testing Bar */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-medium text-slate-500">
              <HelpCircle className="h-3.5 w-3.5 text-blue-700" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Gợi ý tra cứu mẫu (THPT Giồng Riềng):</span>
            </div>
            <button
              type="button"
              onClick={() => setShowSamples(!showSamples)}
              className="text-xs text-blue-700 hover:underline flex items-center gap-1 font-semibold"
            >
              {showSamples ? 'Thu gọn' : 'Xem danh sách mẫu'}
              {showSamples ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>

          {showSamples && (
            <div className="mt-2.5 flex flex-wrap gap-1.5 pt-2">
              {SAMPLE_STUDENTS.map((item) => (
                <button
                  key={item.cccd}
                  type="button"
                  onClick={() => handleSelectSample(item.cccd)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  <span className="font-mono text-blue-800 font-bold">{item.cccd}</span>
                  <span className="text-slate-500">({item.name} - {item.class})</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
