interface GoogleTranslate {
  translate: {
    TranslateElement: new (
      options: {
        pageLanguage: string;
        includedLanguages: string;
        autoDisplay: boolean;
      },
      elementId: string,
    ) => unknown;
  };
}

declare global {
  interface Window {
    google: GoogleTranslate;
    googleTranslateElementInit: () => void;
  }
}

let initialized = false;

export function loadGoogleTranslate(callback: () => void) {
  if (initialized) {
    callback();
    return;
  }

  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "pt",
        includedLanguages: "en",
        autoDisplay: false,
      },
      "google_translate_element",
    );

    initialized = true;

    callback();
  };

  const script = document.createElement("script");

  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

  document.body.appendChild(script);
}
