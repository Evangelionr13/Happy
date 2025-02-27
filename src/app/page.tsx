// src/app/page.tsx
"use client"; // เพิ่มบรรทัดนี้ 

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Confetti from 'react-confetti';
import './post.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeBoxProps {
  value: number;
  label: string;
}

export default function Home() {
  const [isSurprise, setIsSurprise] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true); // สถานะของปุ่ม
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // นับถอยหลังถึงวันเกิด
  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const birthday = new Date('2025-03-3'); // เปลี่ยนเป็นวันเกิดแฟน
      const now = new Date();
      const difference = birthday.getTime() - now.getTime();

// อัปเดตสถานะของปุ่ม
    if (difference <= 0) {
        setIsButtonDisabled(false); // เปิดปุ่มเมื่อถึงเวลา
       }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center">
      <Head>
        <title>Surprise for My Love! 💖</title>
      </Head>

      {isSurprise && <Confetti recycle={false} numberOfPieces={500} />}

      <h1 className="text-4xl md:text-6xl font-bold text-rose-600 mb-8 animate-bounce">
        Happy Birthday My Love! 🎉
      </h1>

      <button 
        onClick={() => setIsSurprise(true)}
        disabled={isButtonDisabled} // ใช้สถานะของปุ่ม
        className="bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition-all mb-8"
      >
        Don't click until the time is right 🎁
      </button>

      {isSurprise && (
        <div className="animate-fadeIn max-w-2xl bg-white p-8 rounded-lg shadow-lg">
          <p className="text-xl mb-4">💌 dear my love...</p>
          <p className="mb-4">Happy birthday... This year may not be like previous years, but no matter what changes, one thing that will never change is the good wishes I have for you. I want you to be happy, I want you to get everything you hope for. Even though I'm in a different position now, know that you are still the most important person in my heart. I miss every moment we had together, I miss your laughter, I miss the days we talked without any worries. If I could hug you right now, I would do it without hesitation. On this birthday, I wish you only the best. And if there is a day when you feel tired or weak, I will be by your side no matter how long time passes. I'll still wait for you. 🎂❤️ If life makes you tired... Remember that there are still people who love you very much and still care about you, like me. </p>
          <div className="image-container">
            <Image 
              src="/images/us1.jpg" 
              width= {200} 
              height={200} 
              alt="Our Memory 1"
              className="Image"
            />
            <Image 
              src="/images/us2.png" 
              width={200} 
              height={200} 
              alt="Our Memory 2"
              className="Imagee"
            />
            <Image 
              src="/images/us3.jpg" 
              width={200} 
              height={200} 
              alt="Our Memory 3"
              className="Image"
            />
          </div>
          <audio 
            controls 
            autoPlay={isSurprise}
            onPlay={() => setIsPlaying(true)}
            src="/music.mp3"
          />
        </div>
      )}

      <div className="mt-8 text-center">
        <h2 className="text-2xl mb-4">🎂 Countdown to a special birthday!</h2>
        <div className="flex gap-4 justify-center">
          <TimeBox value={timeLeft.days} label="day"/>
          <TimeBox value={timeLeft.hours} label="hour"/>
          <TimeBox value={timeLeft.minutes} label="minute"/>
          <TimeBox value={timeLeft.seconds} label="second"/>
        </div>
      </div>
    </div>
  );
}

const TimeBox: React.FC<TimeBoxProps> = ({ value, label }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="text-2xl font-bold text-rose-600">{value}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);