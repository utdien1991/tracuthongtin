import { StudentRecord, VerificationRecord } from '../types';
import { getAccessToken } from './googleAuth';

export interface SheetMetadata {
  spreadsheetId: string;
  spreadsheetUrl: string;
  title: string;
  sheets: { sheetId: number; title: string }[];
}

export interface SyncResult {
  success: boolean;
  spreadsheetId: string;
  spreadsheetUrl: string;
  updatedRows: number;
  syncedAt: string;
}

function formatSheetApiError(status: number, rawError: string): Error {
  if (
    status === 403 &&
    (rawError.includes('ACCESS_TOKEN_SCOPE_INSUFFICIENT') ||
      rawError.includes('insufficient authentication scopes'))
  ) {
    return new Error(
      'Tài khoản Google chưa cấp quyền thao tác Google Sheets (Lỗi 403: Thiếu quyền truy cập). Vui lòng bấm "Đăng xuất & Cấp lại quyền" để nhận quyền mới.'
    );
  }
  return new Error(`Thao tác Google Sheets thất bại (${status}): ${rawError}`);
}

/**
 * Creates a brand new Google Spreadsheet in the user's Google Drive.
 */
export async function createGoogleSheet(
  title: string = 'HoSo_DoiSoat_THPT_GiongRieng_10T4'
): Promise<SheetMetadata> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Chưa đăng nhập tài khoản Google. Vui lòng đăng nhập.');
  }

  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title,
      },
      sheets: [
        {
          properties: {
            title: 'DoiSoat_HocSinh_10T4',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw formatSheetApiError(response.status, errText);
  }

  const data = await response.json();
  return {
    spreadsheetId: data.spreadsheetId,
    spreadsheetUrl: data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`,
    title: data.properties?.title || title,
    sheets: (data.sheets || []).map((s: any) => ({
      sheetId: s.properties?.sheetId,
      title: s.properties?.title,
    })),
  };
}

/**
 * Validates and fetches metadata for an existing Google Spreadsheet.
 */
export async function getGoogleSheetMetadata(spreadsheetId: string): Promise<SheetMetadata> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Chưa đăng nhập tài khoản Google. Vui lòng đăng nhập.');
  }

  const cleanId = extractSpreadsheetId(spreadsheetId);
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${cleanId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.text();
    throw formatSheetApiError(response.status, err);
  }

  const data = await response.json();
  return {
    spreadsheetId: data.spreadsheetId,
    spreadsheetUrl: data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`,
    title: data.properties?.title || 'Google Sheet',
    sheets: (data.sheets || []).map((s: any) => ({
      sheetId: s.properties?.sheetId,
      title: s.properties?.title,
    })),
  };
}

/**
 * Helper to extract spreadsheetId from either a raw ID or full Google Sheets URL.
 */
export function extractSpreadsheetId(input: string): string {
  const trimmed = input.trim();
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return trimmed;
}

/**
 * Writes or updates student profiles and verification audit data to the Google Sheet.
 */
export async function syncStudentsDataToSheet(
  spreadsheetId: string,
  students: StudentRecord[],
  verifications: Record<string, VerificationRecord>,
  sheetTitle: string = 'DoiSoat_HocSinh_10T4'
): Promise<SyncResult> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Chưa đăng nhập tài khoản Google. Vui lòng đăng nhập.');
  }

  const cleanId = extractSpreadsheetId(spreadsheetId);

  // First ensure sheet exists or get metadata
  const meta = await getGoogleSheetMetadata(cleanId);
  let targetSheetTitle = meta.sheets[0]?.title || 'Sheet1';
  // Check if our preferred sheet exists
  const existingTarget = meta.sheets.find((s) => s.title === sheetTitle);
  if (existingTarget) {
    targetSheetTitle = existingTarget.title;
  }

  // Header columns
  const headers = [
    'STT',
    'Lớp',
    'Họ và tên',
    'Ngày sinh',
    'Giới tính',
    'Số CCCD (12 số)',
    'Ngày cấp CCCD',
    'Dân tộc',
    'Tôn giáo',
    'Nơi sinh (theo GKS)',
    'Xã, tỉnh nơi sinh mới',
    'Quê quán (cũ)',
    'Xã, tỉnh quê quán mới',
    'Nơi thường trú',
    'Họ tên Cha',
    'Nghề nghiệp Cha',
    'SĐT Cha',
    'Họ tên Mẹ',
    'Nghề nghiệp Mẹ',
    'SĐT Mẹ',
    'SĐT Học sinh',
    'Chiều cao (cm)',
    'Cân nặng (kg)',
    'Tình trạng mắt',
    'Biết bơi',
    'Trạng thái VNeID',
    'Trạng thái đối soát',
    'Thời gian xác nhận',
    'Người xác nhận',
    'Trường thông tin báo sai',
    'Nội dung chỉnh sửa đề xuất',
    'SĐT liên hệ đối soát',
  ];

  const rows = students.map((s) => {
    const v = verifications[s.idCard.number];
    const statusText = !v
      ? 'Chưa tra cứu đối soát'
      : v.status === 'confirmed_correct'
      ? 'ĐÃ XÁC NHẬN CHÍNH XÁC 100%'
      : 'CÓ PHẢN ÁNH THÔNG TIN SAI';

    const birthNewStr =
      s.birthPlace.ward === 'Đợi hội đồng sư phạm xác thực'
        ? 'Đợi hội đồng sư phạm xác thực'
        : s.birthPlace.province &&
          s.birthPlace.province !== 'Đợi hội đồng sư phạm xác thực' &&
          !s.birthPlace.ward.includes(s.birthPlace.province)
        ? `${s.birthPlace.ward}, ${s.birthPlace.province}`
        : s.birthPlace.ward;

    const homeNewStr =
      s.hometown.ward === 'Đợi hội đồng sư phạm xác thực'
        ? 'Đợi hội đồng sư phạm xác thực'
        : s.hometown.province && !s.hometown.ward.includes(s.hometown.province)
        ? `${s.hometown.ward}, ${s.hometown.province}`
        : s.hometown.ward;

    const permAddressStr =
      s.permanentAddress.fullAddress ||
      [s.permanentAddress.hamlet, s.permanentAddress.ward, s.permanentAddress.province]
        .filter(Boolean)
        .join(', ');

    return [
      s.stt,
      s.classGroup,
      s.fullName,
      s.birthDate,
      s.gender,
      s.idCard.number,
      s.idCard.issueDate || '—',
      s.ethnicity,
      s.religion,
      s.birthPlace.detail,
      birthNewStr,
      s.hometown.detail,
      homeNewStr,
      permAddressStr,
      s.father?.name || '—',
      s.father?.job || '—',
      s.father?.phone || '—',
      s.mother?.name || '—',
      s.mother?.job || '—',
      s.mother?.phone || '—',
      s.contact?.studentPhone || '—',
      s.physical?.height ? `${s.physical.height} cm` : '—',
      s.physical?.weight ? `${s.physical.weight} kg` : '—',
      s.physical?.eyeCondition || '—',
      s.physical?.canSwim ? 'Biết bơi' : 'Chưa biết',
      s.physical?.vneidLevel2 ? 'Mức 2' : 'Chưa cài',
      statusText,
      v?.verifiedAt || '—',
      v?.verifiedBy || '—',
      (v?.wrongFields || []).join('; ') || '—',
      v?.correctionNotes || '—',
      v?.contactPhone || '—',
    ];
  });

  const allValues = [headers, ...rows];

  // 1. Clear existing range to avoid stale data
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${cleanId}/values/${encodeURIComponent(targetSheetTitle)}!A1:AF100:clear`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  // 2. Put new values
  const writeRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${cleanId}/values/${encodeURIComponent(
      targetSheetTitle
    )}!A1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range: `${targetSheetTitle}!A1:AF${allValues.length}`,
        majorDimension: 'ROWS',
        values: allValues,
      }),
    }
  );

  if (!writeRes.ok) {
    const err = await writeRes.text();
    throw formatSheetApiError(writeRes.status, err);
  }

  // 3. Format header styling (Navy blue background, white bold text, freeze 1st row)
  try {
    const targetSheetObj = meta.sheets.find((s) => s.title === targetSheetTitle) || meta.sheets[0];
    const sheetId = targetSheetObj?.sheetId || 0;

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${cleanId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          // Format header row
          {
            repeatCell: {
              range: {
                sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: headers.length,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.12, green: 0.23, blue: 0.53 }, // Dark Navy #1e3a8a
                  textFormat: {
                    foregroundColor: { red: 1, green: 1, blue: 1 },
                    bold: true,
                    fontSize: 10,
                  },
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE',
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)',
            },
          },
          // Auto-resize columns
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId,
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: headers.length,
              },
            },
          },
        ],
      }),
    });
  } catch (formatErr) {
    console.warn('Formatting Google Sheet header note:', formatErr);
    // Non-blocking formatting failure
  }

  return {
    success: true,
    spreadsheetId: cleanId,
    spreadsheetUrl: meta.spreadsheetUrl,
    updatedRows: rows.length,
    syncedAt: new Date().toLocaleString('vi-VN'),
  };
}
