import { useEffect, useState } from "react";
import { FiGlobe } from "react-icons/fi";
import LanguageLoader from "./LanguageLoader";
import { loadGoogleTranslate } from "./googleTranslate";

export default function TranslateButton() {
  const [loading, setLoading] = useState(false);

  const [english, setEnglish] = useState(
    localStorage.getItem("language") === "en",
  );

  useEffect(() => {
    localStorage.setItem("language", english ? "en" : "pt");
  }, [english]);

  function changeLanguage() {
    setLoading(true);

    loadGoogleTranslate(() => {
      setTimeout(() => {
        const combo = document.querySelector(
          ".goog-te-combo",
        ) as HTMLSelectElement;

        if (!combo) {
          setLoading(false);
          return;
        }

        const next = !english;

        combo.value = next ? "en" : "pt";
        combo.dispatchEvent(new Event("change"));

        setEnglish(next);

        setTimeout(() => setLoading(false), 800);
      }, 1200);
    });
  }

  return (
    <>
      <button
        onClick={changeLanguage}
        className="inline-flex items-center gap-2 rounded-xl border border-primary px-5 py-3 font-semibold text-primary transition hover:bg-primary hover:text-primaryText"
      >
        <FiGlobe aria-hidden="true" />
        {english ? "Português" : "English"}
      </button>

      <LanguageLoader open={loading} />

      <div id="google_translate_element" className="hidden" />
    </>
  );
}
