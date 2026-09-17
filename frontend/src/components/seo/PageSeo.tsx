import { useEffect } from "react";

type PageSeoProps = {
  title: string;
  description: string;
  path: string;
  keywords: string;
};

export default function PageSeo({ title, description, path, keywords }: PageSeoProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("robots", "index, follow");

    const canonical = document.head.querySelector<HTMLLinkElement>("link[rel='canonical']") ?? document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = `${window.location.origin}${path}`;
    document.head.appendChild(canonical);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Fonseca Digital",
      url: canonical.href,
      description,
      areaServed: "BR",
      serviceType: keywords.split(", "),
    };

    let script = document.head.querySelector<HTMLScriptElement>("script[data-page-schema]");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.pageSchema = "true";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [description, keywords, path, title]);

  return null;
}
