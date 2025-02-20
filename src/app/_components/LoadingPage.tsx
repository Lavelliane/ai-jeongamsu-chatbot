import React from 'react';
import Image from 'next/image';

const LoadingPage = () => {
  return (
    <main className="max-w-6xl w-full h-screen md:p-16 mx-auto">
      <div className="flex items-center justify-center w-full h-full">
        <Image
          loading="eager"
          src={'/jeonghamsu-icons/1.svg'}
          alt="jeonghamsu loading state"
          width={200}
          height={200}
        />
      </div>
    </main>
  );
};

export default LoadingPage;
