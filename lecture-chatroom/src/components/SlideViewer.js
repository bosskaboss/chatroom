import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';


export default function SlideViewer({ lectureCode, slideNumber }) {
  const fileUrl = `http://localhost:4000/download/${lectureCode}.pdf`;

  return (
    <div>
      <Document file={fileUrl} onLoadError={console.error}>
        <Page pageNumber={slideNumber} />
      </Document>
      <p style={{ textAlign: 'center' }}>Slide {slideNumber}</p>
    </div>
  );
}
