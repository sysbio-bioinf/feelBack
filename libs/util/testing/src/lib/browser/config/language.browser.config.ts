export const BrowserLanguageDE = {
  onBeforeLoad: (_contentWindow: any) => {
    Object.defineProperty(_contentWindow.navigator, 'language', {
      value: 'de-DE',
    });
  },
};

export const BrowserLanguageEN = {
  onBeforeLoad: (_contentWindow: any) => {
    Object.defineProperty(_contentWindow.navigator, 'language', {
      value: 'en-US',
    });
  },
};
