import { HelmetProvider, Helmet } from 'react-helmet-async'

export function MetaTags() {
  return (
    <Helmet>
      <title>WebCraft Vault — The Anatomy of Iconic Websites</title>
      <meta name="description" content="An immersive exhibition of 30+ animations, 20 font pairings, 15 color palettes, and 10 UI patterns. Built for designers who refuse to ship boring." />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="WebCraft Vault — The Anatomy of Iconic Websites" />
      <meta property="og:description" content="An immersive exhibition of award-winning web design ingredients." />
      <meta property="og:image" content="/og-image.svg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="WebCraft Vault" />
      <meta name="twitter:description" content="An immersive exhibition of award-winning web design ingredients." />
      <meta name="twitter:image" content="/og-image.svg" />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: 'WebCraft Vault',
          description: 'An immersive exhibition of 30+ animations, 20 font pairings, 15 color palettes, and 10 UI patterns.',
          genre: 'Interactive Design Exhibition',
          inLanguage: 'en',
        })}
      </script>
    </Helmet>
  )
}

export { HelmetProvider }
