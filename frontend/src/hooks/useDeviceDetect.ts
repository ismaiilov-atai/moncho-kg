import { useDeviceStore } from '@/stores/device-store'
import { useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const useDeviceDetect = () => {
  const { isMobile, updateIsMobile } = useDeviceStore(state => state)
  const router = useRouter()
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 600) updateIsMobile(true)
      else updateIsMobile(false)
      router.invalidate()
    })
  }, [window.innerWidth, isMobile])
}