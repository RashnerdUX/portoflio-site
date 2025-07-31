// To manually help TS recognise svg files
declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string; // Also exports the string path
  export default src;
}

declare module '*.svg?react' {
  import * as React from 'react';
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}