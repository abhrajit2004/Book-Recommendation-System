"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {

    
    const { data: session } = useSession()

    const router = useRouter();



    return (
        <div className="navbar bg-base-100 flex flex-col md:flex-row">
            <div className="flex-1">
                <Link href={"/"} className="btn btn-ghost text-xl">RecomBook</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 flex justify-center items-center gap-[10px] md:gap-4">
                    <li><Link href={"/"}>Home</Link></li>
                    <li><Link href={"/dashboard"}>Dashboard</Link></li>
                    {session && <li><Link href={"/favorites"}>Favorites</Link></li>}
                    {/* <li><a>Your Profile</a></li> */}
                    {/* <li>
        <details>
          <summary>Parent</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
      </li> */}
                    {/* <li><input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search Books" className="input input-bordered w-full max-w-xs" value={search} /></li> */}
                    {session && <li><button onClick={()=>router.push('/profile')} className="btn btn-primary">Profile</button></li>}
                    {session && <li><button onClick={()=>signOut()} className="btn btn-primary">Log Out</button></li>}
                    {!session && <li><button onClick={()=>router.push('/login')} className="btn btn-primary">Log In</button></li>}
                    {/* <li><button className="btn btn-primary">Sign Up</button></li> */}
                </ul>
            </div>
        </div>
    )
}

export default Navbar
