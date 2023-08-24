import dynamic from 'next/dynamic';

export const CaptureModelPlayground = dynamic(() => import('./CaptureModelPlayground'), {
  ssr: false,
});
