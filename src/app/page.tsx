'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          router.push(`/${latitude}/${longitude}`)
        },
        () => {
          // Caso o usuário negue a permissão
          router.push(`/-7.6117323/15.0563515`)
        },
      )
    } else {
      // Caso o navegador não suporte geolocalização
      router.push(`/-7.6117323/15.0563515`)
    }
  }, [])

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-400 text-white font-[family-name:var(--font-geist-sans)] p-4'>
      <Loader2 className='animate-spin' size={30} />
    </div>
  )
}
