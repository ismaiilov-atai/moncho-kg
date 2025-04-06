import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { useAuthStore } from '@/stores/signup-store'
import { FirebaseError } from 'firebase/app'
import { toast } from '@/hooks/use-toast'
import { auth } from '@/lib/firebase'
import { t } from 'i18next'


const { authPageCount, forwardAuthPageCount } = useAuthStore.getState()

const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'g-recaptcha', {
      size: 'invisible',
      callback: (_: any) => {
        console.log('reCAPTCHA resolved')
      }
    })
  }
}

const sendOTP = async (phoneNumber: string) => {
  setupRecaptcha()
  const appVerifier = window.recaptchaVerifier

  try {
    const confirmation = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    )
    window.confirmationResult = confirmation
    forwardAuthPageCount(authPageCount)
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

export { RecaptchaVerifier, signInWithPhoneNumber, sendOTP }