import React from "react";

export default function Hero() {
  return (
    <div className="relative flex items-center justify-center h-screen">
      <div
        className="absolute top-0 left-0 inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="relative z-10 container mx-auto text-center text-white">
        <div className="text-left p-2">
          <h1 className="text-gray-200 text-5xl font-bold mb-4">
            Find your next <span className="text-zinc-400">perfect</span>
            <br />
            place with ease
          </h1>
          <p className="text-lg text-white mb-8">
            Rehaish will help you find your home fast, easy and comfortable.
            <br />
            Our expert support are always available.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
