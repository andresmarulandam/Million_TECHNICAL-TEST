import '@testing-library/jest-dom';

// Mock para las imágenes
Object.defineProperty(global, 'Image', {
  writable: true,
  value: class MockImage {
    onload?: () => void;
    constructor() {
      setTimeout(() => {
        if (this.onload) {
          this.onload();
        }
      }, 100);
    }
  },
});
