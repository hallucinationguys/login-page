import Image from 'next/image'
import Link from 'next/link'
import System from '@/public/img/System.png'

export default function Home() {
  const navigationItems = [
    { title: 'Documentation', path: 'https://github.com/The-System-Guys' },
    { title: 'About us', path: 'https://github.com/The-System-Guys' },
  ]

  return (
    <>
      <div className="w-full flex items-center p-8">
        <div className="mx-2 flex flex-row items-center w-full">
          <Image alt="" className="w-12 h-12 mx-4 rounded-full" src={System} />
          <p className="text-xl font-bold whitespace-nowrap">
            The System Guys service
          </p>

          <nav className="flex w-full justify-end">
            <div className="items-center px-4 ">
              <ul className="flex flex-row">
                {navigationItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-gray-700 hover:text-pink-700 mx-2">
                    <Link href={item.path}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="w-full flex justify-center items-center text-3xl font-bold my-12">
          Hi There 👋
        </p>
      </div>
    </>
  )
}
