import React, { useState, useRef, useEffect } from 'react'
import { dummyData } from '../data/dummyData'
import { Link } from 'react-router-dom'

export default function Marquee() {
  const [isPaused, setIsPaused] = useState(false)
  const marqueeRef = useRef(null)
  const contentRef = useRef(null)
  const animationRef = useRef(null)
  const positionRef = useRef(0)

  useEffect(() => {
    const marqueeElement = marqueeRef.current
    const contentElement = contentRef.current

    if (!marqueeElement || !contentElement) return

    const speed = 2.5 // Pixels per frame
    const fps = 60 // Frames per second

    const animate = () => {
      if (!isPaused) {
        positionRef.current -= speed
        // Reset position when content has scrolled completely
        if (-positionRef.current >= contentElement.offsetWidth) {
          positionRef.current = marqueeElement.offsetWidth
        }
        contentElement.style.transform = `translateX(${positionRef.current}px)`
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start the animation
    animationRef.current = requestAnimationFrame(animate)

    // Clean up on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused])

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  return (
    <div 
      className="bg-gradient-to-r from-primary to-dark text-white overflow-hidden py-2 shadow-md relative"
      ref={marqueeRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={contentRef}
        className="flex gap-8 px-4 py-2 whitespace-nowrap"
        style={{ transform: 'translateX(0px)' }}
      >
        {dummyData.trendingDerivatives.map((s, i) => (
          <Link
            to={`/derivatives?symbol=${s.symbol}`}
            key={i}
            className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300 cursor-pointer flex-shrink-0"
          >
            <div className="font-semibold bg-white/10 px-2 py-1 rounded-md group-hover:bg-accent2 transition-colors duration-300">
              {s.symbol}
            </div>
            <div>₹{s.price.toFixed(2)}</div>
            <div className={s.change >= 0 ? 'text-green-300 font-semibold' : 'text-red-300 font-semibold'}>
              {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)} ({s.changePercent >= 0 ? '+' : ''}{s.changePercent.toFixed(2)}%)
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}