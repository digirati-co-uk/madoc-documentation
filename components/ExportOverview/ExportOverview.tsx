import { exportConfig } from '@madoc.io/config';
import { InternationalString } from '@iiif/presentation-3';
import { LocaleString } from '@iiif/vault-helpers/react-i18next';
import Link from 'next/link';
import { FilePreview } from '@madoc.io/components';
import canvasApi from './examples/canvas-api.json';
import canvasAnnotationExportOa from './examples/canvas-annotation-export-oa.json';
import canvasAnnotationExportW3C from './examples/canvas-annotation-export-w3c.json';
import manifestApi from './examples/manifest-api.json';

interface Item {
  type: string;
  supportedTypes: string[];
  metadata: {
    label: InternationalString;
    description: InternationalString;
    filePatterns: string[];
  };
  configuration?: any;
}

const keys = Object.keys(exportConfig);

const examples = {
  'canvas-api-export': [
    {
      name: 'Simple canvas',
      data: canvasApi,
    },
  ],
  'canvas-annotation-export': [
    {
      name: 'W3C annotation',
      data: canvasAnnotationExportW3C,
    },
    {
      name: 'Open annotation',
      data: canvasAnnotationExportOa,
    },
  ],
  'manifest-api-export': [
    {
      name: 'Simple manifest',
      data: manifestApi,
    },
  ],
  'project-csv-simple-export': [
    {
      name: 'Simple CSV',
      type: 'csv',
      data: `model_id,doc_id,field_a,field_b,manifest,canvas
14977ce1-8293-4467-88d6-f8bb58a02a96,7be69729-c802-4c85-8310-11a3f920a666,field a entry 1, field b entry 1,272277,272283
14977ce1-8293-4467-88d6-f8bb58a02a96,7be69729-c802-4c85-8310-11a3f920a666,field a entry 2, field b entry 2,272277,272283
14977ce1-8293-4467-88d6-f8bb58a02a96,7be69729-c802-4c85-8310-11a3f920a666,field a entry 3, field b entry 3,272277,272283`,
    },
  ],
};

export function ExportOverview() {
  return (
    <div className="mt-2 mb-2">
      {keys.map((key) => {
        const item = exportConfig[key as keyof typeof exportConfig] as Item;
        const example = examples[item.type as keyof typeof examples];
        return (
          <div key={key} className="bg-white rounded border mb-4 p-4 drop-shadow-sm">
            <div id={key} style={{ position: 'absolute', top: '-5em', visibility: 'hidden' }} />
            <h2 className="text-lg font-semibold">
              <Link href={`#${key}`}>
                <LocaleString>{item.metadata.label}</LocaleString>
              </Link>
            </h2>
            <p className="text-gray-400 text-sm">{item.type}</p>
            <p className="mb-2">
              <LocaleString>{item.metadata.description}</LocaleString>
            </p>
            <div className="flex items-center mb-2">
              <h3 className="text-blue-800 font-semibold text-sm mr-3">Supported types</h3>
              {item.supportedTypes.map((type) => (
                <span key={type}>{type}</span>
              ))}
            </div>
            <ul>
              {(item.metadata.filePatterns || []).map((pattern) => (
                <li key={pattern} className="mb-2 bg-blue-50 p-2 rounded text-sm">
                  <code>{pattern}</code>
                </li>
              ))}
            </ul>
            {example ? (
              <>
                <h3 className="mt-4 text-sm font-semibold mb-2 text-blue-800">
                  Example export{example.length > 1 && 's'}
                </h3>
                {example.map((file) => (
                  <FilePreview
                    key={file.name}
                    contentType={'application/json'}
                    fileName={file.name}
                    lazyLoad={() => ({
                      type: file.type || 'json',
                      value: JSON.stringify(file.data, null, 2),
                    })}
                  />
                ))}
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
