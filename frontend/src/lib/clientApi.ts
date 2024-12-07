import { InitOtpType, VerificationReport, VerifyError } from '@/types/auth-types';
import { Buffer } from 'buffer';
const URL = import.meta.env.VITE_SINCH_BASE_URL;

const BASIC_AUTHENTICAITON = `${import.meta.env.VITE_SINCH_KEY!}:${import.meta.env.VITE_SINCH_SECRET!}`

const sinchHeaders = {
  'Authorization': `Basic ${Buffer.from(BASIC_AUTHENTICAITON).toString('base64')}`,
  'Content-Type': 'application/json; charset=utf-8'
};

const initOtpCode = async (phoneNumber: string): Promise<InitOtpType | VerifyError> => {
  try {
    const resp = await fetch(URL, {
      method: 'POST',
      headers: sinchHeaders,
      body: JSON.stringify({
        identity: {
          type: 'number',
          endpoint: phoneNumber
        },
        method: 'sms'
      })
    });
    const data = await resp.json();
    if ('errorCode' in data) throw data as VerifyError
    return data as InitOtpType;
  } catch (error) {
    throw error as VerifyError;
  }
}

const verifyOtpCode = async ({ code, phoneNumber }: { code: string, phoneNumber: string }): Promise<VerificationReport | VerifyError> => {
  try {
    const resp = await fetch(`${URL}/number/${phoneNumber}`, {
      method: 'PUT',
      headers: sinchHeaders,
      body: JSON.stringify({
        method: 'sms',
        sms: {
          code: code
        }
      })
    })
    const result = await resp.json();
    if ('errorCode' in result) throw result as VerifyError
    return result as VerificationReport;
  } catch (error) {
    throw error as VerifyError;
  }
}

const clientApi = {
  initOtpCode,
  verifyOtpCode
}

export default clientApi;



