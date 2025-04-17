import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { useAuthStore } from '@/stores/signup-store'
import { FirebaseError } from 'firebase/app'
import { auth } from '@/lib/firebase'
import { toast } from '@/hooks/use-toast'
import { t } from 'i18next'



const { forwardAuthPageCount } = useAuthStore.getState()

const setupRecaptcha = async () => {
  window.recaptchaVerifier = new RecaptchaVerifier(getAuth(), 'g-recaptcha', {
    size: 'invisible',
    callback: (_: any) => {
      console.log('reCAPTCHA resolved')
    }
  })
}

const sendOTP = async (phoneNumber: string) => {
  await setupRecaptcha()
  const appVerifier = window.recaptchaVerifier

  try {
    const confirmation = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    )
    window.confirmationResult = confirmation
    forwardAuthPageCount()
  } catch (error) {
    if (error instanceof FirebaseError) {
      Number(error.code) >= 500 ?
        toast({ variant: 'destructive', title: 'OOOPS!', description: t('firebase-down-auth') })
        :
        toast({ variant: 'destructive', title: 'OOOPS!', description: error.message })
    } else {
      window.recaptchaVerifier.render().then((widgetId: string) => {
        window.grecaptcha.reset(widgetId)
      })
    }
  }
}

const isLoggedOutPath = (path: string) => {
  return path === '/login' || path === '/signup';
};

export { RecaptchaVerifier, signInWithPhoneNumber, sendOTP, isLoggedOutPath }