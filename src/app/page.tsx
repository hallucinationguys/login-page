'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAuthContext } from 'src/contexts/authentication'
import Favicon from '@/public/favicon/android-chrome-512x512.png'
import { Button } from './components/Button'

export default function Home() {
  const navigationItems = [
    { title: 'Documentation', path: 'https://github.com/hallucinationguys' },
    { title: 'About us', path: 'https://github.com/hallucinationguys' },
  ]

  const { user, logout } = useAuthContext()

  return (
    <div>
      <div className="w-full flex items-center p-8">
        <div className="mx-2 flex flex-row items-center w-full">
          <Image alt="" className="w-16 h-16 mx-4 rounded-full" src={Favicon} />
          <p className="text-xl font-bold whitespace-nowrap">
            Hallucination Guys
          </p>

          <nav className="flex w-full justify-end">
            <div className="items-center px-4 flex flex-row">
              <ul className="flex flex-row items-center ">
                {navigationItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-gray-700 hover:text-pink-700 mx-2 text-lg"
                  >
                    <Link href={item.path}>{item.title}</Link>
                  </li>
                ))}
                {user ? (
                  <Button
                    appearance="link"
                    className="w-fit"
                    size="xl"
                    type="button"
                    onClick={logout}
                  >
                    Log out
                  </Button>
                ) : (
                  <div />
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="w-full flex justify-center items-center text-3xl font-bold my-12">
          Hi There 👋
        </p>
        <div className="flex flex-col justify-center items-center">
          {user ? (
            <>
              <p className=" text-2xl font-bold">
                Full name: {`${user?.first_name} ${user?.last_name}`}
              </p>
              <p className=" text-2xl font-bold">Email: {user?.email}</p>
            </>
          ) : (
            <p className=" text-2xl font-bold">
              You need to be logged in to view information
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
