'use client';

import { NotionRenderer as Renderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';

interface NotionRendererProps {
  recordMap: any;
}

export default function NotionRenderer({ recordMap }: NotionRendererProps) {
  return (
    <div className="notion-renderer-wrapper">
      <Renderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        disableHeader
        components={{
          // Customize components if needed
        }}
      />
    </div>
  );
}
