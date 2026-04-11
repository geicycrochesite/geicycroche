import { Suspense } from 'react'
import SetupAdminClient from './SetupAdminClient'

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SetupAdminClient />
    </Suspense>
  )
}
