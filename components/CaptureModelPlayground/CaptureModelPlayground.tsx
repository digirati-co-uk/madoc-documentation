// @ts-ignore
import { EditShorthandCaptureModel, EditorSlots, utility } from '@madoc.io/capture-models';
import { Suspense, useState } from 'react';
import { FilePreview } from '@madoc.io/components';

const { captureModelShorthandText } = utility;

const Template = (_props: any) => {
  const { shorthand, data, document, structure, slotConfig: _slotConfig, ...props } = _props;

  return (
    <Suspense fallback="loading...">
      <EditShorthandCaptureModel
        slotConfig={_slotConfig}
        data={data}
        template={shorthand || document}
        structure={structure}
        fullDocument={!!document}
        keepExtraFields
      >
        <EditorSlots.TopLevelEditor {...props} />
      </EditShorthandCaptureModel>
    </Suspense>
  );
};

export default function ShorthandEditor() {
  const [value, setValue] = useState(`Label {@type/international-field} {@langs/en,de}
Description
Tag {@many} {@type/text-field} {@pluralLabel/Tags}`);
  const [doc, setDoc] = useState(() => captureModelShorthandText(value));

  return (
    <>
      <div className="flex mt-10 mb-5">
        <div className="flex-1 flex flex-col">
          <textarea
            className="border border-gray-300 rounded p-2 active:border-blue-500 focus:border-blue-500  focus:outline-none"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            rows={15}
          />
          <button
            className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600 active:bg-blue-700 drop-shadow-sm"
            onClick={() => setDoc(captureModelShorthandText(value))}
          >
            Preview
          </button>
        </div>
        <div className="flex-1 ml-6">
          <Template document={doc} />
        </div>
      </div>
      <div>
        <FilePreview fileName="model.json" lazyLoad={() => ({ value: JSON.stringify(doc, null, 2), type: 'json' })} />
      </div>
    </>
  );
}
