import React from 'react'
import Link from 'next/link'

const Hero = () => {
    return (
        <>
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">
                        Welcome to my platform for learning and sharing knowledge. Here you can find a lot of resources to learn and grow.
                    </p>
                    <Link href={"/dashboard"} className="btn btn-primary">Get Started</Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Hero
