import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import logo from './public/assets/logo.svg';


const config: DocsThemeConfig = {
  logo: <img src={logo.src} alt="madoc logo" width="150" />,
  project: {
    link: 'https://github.com/digirati-co-uk/madoc-platform',
  },
  primaryHue: 252 ,
  docsRepositoryBase: 'https://github.com/digirati-co-uk/madoc-docs',
  footer: {
    text: 'Madoc',
  },
}

export default config
