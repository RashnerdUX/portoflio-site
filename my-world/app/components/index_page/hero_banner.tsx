import React from 'react'

export const HeroBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/20 banner-bg mt-4">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div className="relative flex items-center justify-between gap-8 p-8 md:p-12 min-h-[320px]">
        <div className="absolute inset-0 z-0">
            <img alt="MCU" className="w-full h-full object-cover object-right" src="https://images.squarespace-cdn.com/content/v1/5ccabcf60b77bdbb3acaf70a/1567683272122-6PF2QDD6NF68VHMGQJOC/dd5r35v-e8431f3b-2f7a-4b39-9945-fa6611506b83.jpg?format=2500w"/>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>
        <div className="relative z-10 text-left max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter leading-tight" style={{ textShadow: '0 0 15px rgba(102, 15, 189, 0.8)' }}>Welcome to <span className='text-primary'>the Index</span></h1>
            <p className="mt-4 text-gray-300">Your ultimate guide to the Marvel Cinematic Universe. Explore rankings, track your watch progress, and dive deep into movie details with our unique rating system.</p>
        </div>
        </div>
    </div>
  )
}

export default HeroBanner;
