import { DeviceActions, DeviceState } from '@/types/device'
import { create } from 'zustand/react'

export const useDeviceStore = create<DeviceState & DeviceActions>((set) => ({
  isMobile: window.innerWidth < 500,
  updateIsMobile: (isMobile) => set(() => ({ isMobile }))
}))