// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Preview } from '@storybook/react-webpack5';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      options: {
        // 👇 Default options
        dark: { name: 'Dark', value: '#333' },
        light: { name: 'Light', value: '#F7F9F2' }
      }
    }
  },
  initialGlobals: {
    // 👇 Set the initial background color
    backgrounds: { value: 'dark' }
  }
};

export default preview;
