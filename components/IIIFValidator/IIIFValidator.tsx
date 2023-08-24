import { useState } from 'react';
import { useExternalManifest, useVault, VaultProvider } from 'react-iiif-vault';
import { Button, Callout } from 'nextra/components';
import { IIIFExplorer } from '@manifest-editor/iiif-browser';
import '@manifest-editor/iiif-browser/dist/style.css';

export function IIIFValidator() {
  const [manifest, setManifest] = useState<string | null>(null);

  const submitForm = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setManifest(data.get('manifest') as string);
  };

  return (
    <VaultProvider>
      <div className="p-5  mt-3 mb-3 rounded border drop-shadow-sm bg-white border-gray-200">
        <h4 className="text-xl font-bold mb-3 text-gray-600 flex-1 border-b pb-3">IIIF Validator</h4>
        <p className="mb-4">Validate IIIF manifests and collections.</p>
        {manifest ? (
          <>
            <ValidatorResult manifest={manifest} />
            <div className="mt-3">
              <Button onClick={() => setManifest(null)}>Reset</Button>
            </div>
          </>
        ) : (
          <form onSubmit={submitForm} className="flex">
            <input
              className="pl-4 pr-4 pt-2 pb-2 border border-gray-300 rounded w-1/2"
              name="manifest"
              type="text"
              placeholder={'Enter a IIIF manifest or collection URL'}
            />
            <button className="bg-blue-200 p-1 rounded hover:bg-blue-100 active:shadow-inner pl-2 pr-2 ml-2">
              Validate
            </button>
          </form>
        )}
      </div>
    </VaultProvider>
  );
}

function ValidatorResult(props: { manifest: string }) {
  const vault = useVault();
  const { manifest, isLoaded, error } = useExternalManifest(props.manifest);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (error) {
    return <Callout type="error">{error.toString()}</Callout>;
  }

  if (!manifest || !isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Callout type="default">
        Valid <strong>IIIF {manifest.type}</strong> with <strong>{manifest.items.length}</strong> items.
        <Button onClick={() => setIsPreviewOpen((o) => !o)}>{isPreviewOpen ? 'Hide preview' : 'Show preview'}</Button>
      </Callout>
      {isPreviewOpen && (
        <IIIFExplorer
          height={550}
          hideHeader
          hideBack
          window={false}
          entry={manifest}
          output={{ type: 'url' }}
          vault={vault}
          outputTypes={[]}
        />
      )}
    </>
  );
}
