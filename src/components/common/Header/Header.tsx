import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiUserCircle } from "react-icons/hi";

type Props = {};

const Header = (props: Props) => {
  const { data: session } = useSession();

  return (
    <header className="w-full">
      <div className="md:hidden">
        <div className="flex justify-between p-6">
          <GiHamburgerMenu size="2em" />
          <HiUserCircle size="2em" />
        </div>
      </div>
      <nav className="hidden md:block">
        <ul className="flex p-4">
          <li className="mr-2">
            <Link href="/">WebQuipo</Link>
          </li>
          <li className="mx-4">
            <Link href="/boards">Boards</Link>
          </li>
          {session?.user ? (
            <li className="ml-auto" onClick={() => signOut()}>
              Sign Out
            </li>
          ) : (
            <li className="ml-auto" onClick={() => signIn()}>
              Sign In
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
