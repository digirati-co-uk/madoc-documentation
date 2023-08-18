import React from 'react';
import { Callout } from 'nextra/components';
import { ArrowRightIcon, GitHubIcon } from 'nextra/icons';

export function Codebase({ children, label }: { children: string; label?: string }) {
  return (
    <Callout emoji={<GitHubIcon className="pt-1" />} type="info">
      <strong>{label} can be found in the codebase at</strong>
      <br />

      <a
        href={`https://github.com/digirati-co-uk/madoc-platform/tree/main/${children}`}
        target="_blank"
        className="px-4 py-2 mt-2 bg-white rounded gap-4 inline-flex items-center hover:bg-blue-50 mb-2"
      >
        <code>{children}</code>
        <ArrowRightIcon className="w-5" />
      </a>
    </Callout>
  );
}
