"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

const Profile = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    const router = useRouter();

    const {data: session} = useSession();


    useEffect(() => {
        if(!session){
            router.push('/login');
        }
        else{
            setName(session.user.name);
            setEmail(session.user.email);
        }

    }, [router, session])

    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content w-full flex flex-col gap-10">
            <h1 className="text-center text-4xl font-bold">Your Profile</h1>
          <div className="card bg-base-100 w-[50%] shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="name" onChange={(e)=>setName(e.target.value)} placeholder="Name" value={name} className="input input-bordered disabled:text-gray-500" disabled={name.length!==0} required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="email" value={email} className="input input-bordered disabled:text-gray-500" disabled={email.length!==0} required />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary w-[100px]" disabled={email.length!==0 && name.length!==0}>Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}

export default Profile
