'use client'

import { Button } from '@/app/components/ui/button'

import { logoutAction } from '../login/actions'

export default function SignOutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="outline" size="sm">
        Sign out
      </Button>
    </form>
  )
}
