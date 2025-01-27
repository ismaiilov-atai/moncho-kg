import { useNavigate } from '@tanstack/react-router'

export const useNavHome = (session_id = '', guest = 0, slotId = '') => {
  const navigate = useNavigate()
  return () => {
    navigate({
      to: '/',
      search: {
        session_id,
        guest,
        slotId,
      },
    })
  }
}