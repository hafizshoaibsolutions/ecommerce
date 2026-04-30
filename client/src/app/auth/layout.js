import React from "react";
import Image from "next/image";

export default function AuthLayout({
  children
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel (Background Image + Overlay + Text) */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center">
        {/* Background Image */}
        <Image
          src="https://res.cloudinary.com/dpbayuhxl/image/upload/v1758638333/mern-ecommerce/fpgfaumut2nnbfizkmcx.jpg"
          alt="Shopping"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay (dark for contrast) */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Marketing Text */}
        <div className="relative z-10 text-white max-w-md p-10">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Shop Smart. Live Better.
          </h1>
          <p className="text-lg text-gray-200">
            Discover top-quality products, curated deals, and seamless shopping experiences — all in one place.
          </p>
        </div>
      </div>

      {/* Right Panel (Form Area) */}
      <div className="flex flex-1 justify-center items-center bg-gray-50">
        <div className="w-full max-w-md p-8">{children}</div>
      </div>
    </div>
  );
}


