import Script from "next/script"

/**
 * Retargeting pixels for Google Ads and Meta (Facebook) Ads.
 *
 * SETUP:
 * 1. Replace GOOGLE_ADS_ID below with your Google Ads / GA4 tag ID (e.g. "AW-XXXXXXXXX" or "G-XXXXXXXXXX").
 * 2. Replace META_PIXEL_ID below with your Meta Pixel ID (e.g. "1234567890").
 *
 * The scripts only render once you replace the placeholder values.
 */
const GOOGLE_ADS_ID = "GOOGLE_ADS_ID" // e.g. "AW-123456789"
const META_PIXEL_ID = "META_PIXEL_ID" // e.g. "1234567890"

export function TrackingPixels() {
  const googleEnabled = GOOGLE_ADS_ID && !GOOGLE_ADS_ID.startsWith("GOOGLE_")
  const metaEnabled = META_PIXEL_ID && !META_PIXEL_ID.startsWith("META_")

  return (
    <>
      {googleEnabled && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}');
            `}
          </Script>
        </>
      )}

      {metaEnabled && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  )
}
