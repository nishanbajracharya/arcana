'use client';

import dynamic from 'next/dynamic';

const Canvas = dynamic(() => import('./Home'), {
  ssr: false,
});

export default function Page() {
  return <Canvas />;
}
