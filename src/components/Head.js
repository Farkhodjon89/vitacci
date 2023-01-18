import React, { Fragment } from 'react'
import format from 'string-template'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { META_DATA_FOR_PAGES } from '../../config'

export const HeadData = ({
  title,
  description,
  pageUrl,
  pageData,
  product,
}) => {
  let _pageUrl = (pageUrl || '').split('/')

  if (_pageUrl.length > 2) {
    _pageUrl[_pageUrl.length - 1] = ''
  }

  _pageUrl = _pageUrl.join('/')

  const formatText = (data, property) => {
    let text = format(data[property], pageData)

    if (data.keys) {
      for (const key of data.keys) {
        text = text.replace(key, '').trim()
      }
    }

    return text
  }

  const defaultTitle =
    'Роскошная женская обувь и женские сумки в Ташкенте | Vitacci'
  const defaultDescription =
    'Европейски бренд Vitacci предлагает широкую линию женской обуви, женских сумок и аксессуаров. Будьте неотразимы, раскройте свой стиль с нами.'

  const _title =
    title ||
    (META_DATA_FOR_PAGES[_pageUrl] &&
      formatText(META_DATA_FOR_PAGES[_pageUrl], 'title')) ||
    defaultTitle
  const _description =
    description ||
    (META_DATA_FOR_PAGES[_pageUrl] &&
      formatText(META_DATA_FOR_PAGES[_pageUrl], 'description')) ||
    defaultDescription

  const pixelProductData = product
    ? {
        content_ids: String(product.id),
        content_type: 'product',
        value: parseInt(product.price || 0),
        currency: 'UZS',
      }
    : null

  const productRichSnippets =
    _pageUrl === '/product/'
      ? {
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: product.name,
          image: product.image[0],
          description: product.description || _description,
          brand: 'Vitacci',
          mpn: product.sku,
          offers: {
            '@type': 'Offer',
            url: `https://vitacci.uz/product/${product.slug}`,
            priceCurrency: 'UZS',
            price: product.price,
            priceValidUntil: '2031-01-01',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            bestRating: '5',
            worstRating: '0',
            ratingCount: '1',
            reviewCount: '1',
          },
          review: {
            '@type': 'Review',
            name: product.name,
            reviewBody: `Лучшие ${product.name} за ${product.price} сум!`,
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
              worstRating: '0',
            },
            datePublished: '2020-11-01',
            author: { '@type': 'Person', name: 'Vitacci' },
            publisher: { '@type': 'Organization', name: 'Vitacci' },
          },
        }
      : null

  const blogRichSnippets =
    _pageUrl === '/blog/'
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://vitacci.uz/blog/${pageData.id}`,
          },
          headline: pageData.postTitle,
          description: _description,
          image: pageData.image,
          author: {
            '@type': 'Organization',
            name: 'Vitacci',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Vitacci',
            logo: {
              '@type': 'ImageObject',
              url: 'https://vitacci.uz/new-logo.png',
            },
          },
          datePublished: pageData.date,
          dateModified: pageData.date,
        }
      : null

  return (
    <Fragment>
      <NextSeo
        title={_title}
        description={_description}
        openGraph={{
          images: [
            {
              url: product
                ? product.image[0]
                : `${process.env.PUBLIC_URL}/new-logo.png`,
            },
          ],
          url: 'https://vitacci.uz',
          title: _title,
          site_name: 'Vitacci',
          locale: 'ru_RU',
          type: 'website',
          description: _description,
        }}
        twitter={{
          cardType: 'summary',
          handle: '@handle',
          site: '@site',
          title: _title,
          description: _description,
        }}
      />

      <Head>
        <title>{_title}</title>

        {/* <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href={`${process.env.PUBLIC_URL}/favicon-32x32.png`}
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href={`${process.env.PUBLIC_URL}/favicon-16x16.png`}
        /> */}

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />

        <Fragment>
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: `
            {
              "@context": "https://schema.org",
              "@type": "ShoeStore",
              "name": "Vitacci",
              "address": {
              "@type": "PostalAddress",
              "streetAddress": "ул. ​Сайилгох, 7",
              "addressLocality": "Ташкент",
              "addressRegion": "",
              "postalCode": "100017"
            },
              "image": "https://vitacci.uz/new-logo.png",
              "email": "info@vitacci.uz",
              "telePhone": "+998909256000",
              "url": "https://vitacci.uz/",
              "sameAs": [
              "https://www.facebook.com/vitacciuz",
              "https://www.instagram.com/vitacci.uz/?igshid=1a7ahw8dpp7bv",
              "https://t.me/VITACCIuz_bot"
              ],
              "paymentAccepted": [ "cash", "credit card" ],
              "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 10:00-22:00",
              "openingHoursSpecification": [ {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
              ],
              "opens": "10:00",
              "closes": "22:00"
            } ],
              "priceRange":"$$"
            }
          `,
            }}
          />
        </Fragment>

        {process.env.NODE_ENV === 'production' && _pageUrl === '/product/' ? (
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(productRichSnippets),
            }}
          />
        ) : null}

        {process.env.NODE_ENV === 'production' && _pageUrl === '/blog/' ? (
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(blogRichSnippets),
            }}
          />
        ) : null}

        {process.env.NODE_ENV === 'production' ? (
          <Fragment>
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                  ym(66842074, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true,
                  ecommerce:"dataLayer"
                });`,
              }}
            />

            <noscript
              dangerouslySetInnerHTML={{
                __html: `
                <div>
                  <img
                    src="https://mc.yandex.ru/watch/66842074"
                    style="position:absolute; left:-9999px;"
                    alt=""
                  />
                </div>
                `,
              }}
            />
          </Fragment>
        ) : null}

        {process.env.NODE_ENV === 'production' ? (
          <Fragment>
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '683191909215379');
                  fbq('track', 'PageView');
                  ${
                    product
                      ? `fbq('track', 'ViewContent', ${JSON.stringify(
                          pixelProductData
                        )});`
                      : ''
                  }
                `,
              }}
            />

            <noscript
              dangerouslySetInnerHTML={{
                __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=683191909215379&ev=PageView&noscript=1" />`,
              }}
            />
          </Fragment>
        ) : null}
      </Head>
    </Fragment>
  )
}
