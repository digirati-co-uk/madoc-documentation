import dynamic from 'next/dynamic';

export const ModelEditor = dynamic(() => import('./ModelEditor.lazy'), {
  ssr: false,
});
