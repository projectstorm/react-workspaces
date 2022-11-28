import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BodyWidget } from './BodyWidget';

// this is just here to show you the many ways you can import the library (you can uncomment it)
import './umd-vs-es6';

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.querySelector('#application'));
  root.render(<BodyWidget />);
});
