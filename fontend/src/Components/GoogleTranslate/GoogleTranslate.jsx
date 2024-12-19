import { useEffect } from "react";
import Cookies from "js-cookie";

const GoogleTranslate = () => {
  useEffect(() => {
    const userLang = Cookies.get("userLang") || "en";

    const loadGoogleTranslate = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // Default page language
          includedLanguages: "en,fr", // List of allowed languages
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );

      // Handle post-initialization language change
      if (userLang === "fr") {
        const interval = setInterval(() => {
          const comboElement = document.querySelector(".goog-te-combo");
          if (comboElement) {
            comboElement.value = userLang;
            comboElement.dispatchEvent(new Event("change"));
            clearInterval(interval); // Stop checking once it's done
          }
        }, 500); // Poll every 500ms
      }
    };

    // Load Google Translate script dynamically
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Ensure callback is globally available
    window.googleTranslateElementInit = loadGoogleTranslate;

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, []); // Run once on component mount

  return <div id='google_translate_element'></div>;
};

export default GoogleTranslate;
