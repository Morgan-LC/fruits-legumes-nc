import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
}

const SITE_NAME = "Fruits & Légumes NC";

export function useSEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = `${title} — ${SITE_NAME}`;

    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", description);
      }
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute("content", description);
      }
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", `${title} — ${SITE_NAME}`);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", window.location.href);
    }
  }, [title, description]);
}
