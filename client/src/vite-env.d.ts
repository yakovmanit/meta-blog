/// <reference types="vite/client" />

declare module '*.svg?react' {
  import { FunctionComponent, SVGProps } from 'react';
  const component: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default component;
}
