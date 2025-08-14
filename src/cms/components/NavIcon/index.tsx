import { Logo } from '@assets/Logo'
import Link from 'next/link'

export const NavIcon = () => {
  return (
    <Link href={'/admin'}>
      <Logo />
    </Link>
  )
}
