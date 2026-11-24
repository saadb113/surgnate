import { useEffect } from 'react';

export const SITE_URL = 'https://surgnate.vercel.app';
const DEFAULT_IMAGE = '/images/HomeImg2.jpg';

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Keeps <title>, description, canonical, social tags and robots directives
 * in sync with the active client-side route.
 */
export function usePageMeta({ title, description, path = '/', image = DEFAULT_IMAGE, noindex = false }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const fullImage = `${SITE_URL}${image}`;

    if (title) {
      document.title = title;
      upsertMeta('property', 'og:title', title);
      upsertMeta('name', 'twitter:title', title);
    }
    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
      upsertMeta('name', 'twitter:description', description);
    }

    upsertCanonical(url);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', fullImage);
    upsertMeta('name', 'twitter:image', fullImage);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  }, [title, description, path, image, noindex]);
}
