import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { dummyData } from '../data/dummyData'
export default function Testimonials(){
  return (
    <section className="testimonial-section mt-10 bg-gradient-to-br from-primary to-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-2xl font-bold mb-6">What Our Users Say</h2>
        <div className="max-w-3xl mx-auto">
          <Swiper modules={[Autoplay]} spaceBetween={20} slidesPerView={1} autoplay={{delay:4500}}>
            {dummyData.testimonials.map((t,i)=>(
              <SwiperSlide key={i}>
                <div className="text-center px-4">
                  <div className="w-20 h-20 rounded-full border-4 border-white mx-auto flex items-center justify-center text-xl font-bold mb-4 bg-white/10">{t.avatar}</div>
                  <p className="italic text-lg mb-3">"{t.text}"</p>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm opacity-90">{t.role}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
