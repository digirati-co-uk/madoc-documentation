import Link from 'next/link';

export function ConfigOverview({ config }: { config: Record<string, any> }) {
  const keys = Object.keys(config);

  return (
    <div>
      {keys.map((key) => {
        const item = config[key];
        return (
          <div key={key} className="relative border p-5 mb-6 mt-6 rounded-md drop-shadow-sm bg-white pb-8">
            <div id={key} style={{ position: 'absolute', top: '-5em', visibility: 'hidden' }} />
            <h3 className="nx-font-semibold nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100  nx-text-2xl">
              <Link href={`#${key}`}>{item.label}</Link>
            </h3>

            {item.inlineLabel && (
              <p className="p-3">
                <input type="checkbox" disabled checked className="mr-2" /> {item.inlineLabel}
              </p>
            )}

            <p>{item.description || <span className="text-gray-500">No description</span>}</p>

            {item.defaultValue && typeof item.defaultValue === 'string' && (
              <div className="nx-mt-4 flex items-center">
                <h4 className="text-gray-400">Default value</h4>
                <p className="text-gray-800 font-semibold text-sm ml-3">{item.defaultValue}</p>
              </div>
            )}

            {item.type === 'dropdown-field' && (
              <div className="nx-mt-4">
                <h4 className="text-blue-800 font-semibold">Available options</h4>
                <p className="mb-2 text-gray-500 text-sm">You can choose one of these</p>
                <ul className="list-disc ml-8">
                  {item.options.map((option: any) => {
                    return (
                      <li key={option.value}>
                        <span className="ml-1 text-gray-700">{option.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {item.type === 'checkbox-list-field' && (
              <div className="nx-mt-4">
                <h4 className="text-blue-800 font-semibold">Available checkboxes</h4>
                <p className="mb-2 text-gray-500 text-sm">You can turn any of these options on or off</p>
                <ul className="list-disc ml-8">
                  {item.options.map((option: any) => {
                    return (
                      <li key={option.value}>
                        <span className="ml-1 text-gray-700">{option.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
