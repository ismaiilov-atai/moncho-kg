import { initOtpCode, verifyOtpCode } from '@/helpers/auth';
import { getUser } from '@/helpers/user';

const clientApi = {
  initOtpCode,
  verifyOtpCode,
  getUser
}

export default clientApi;



