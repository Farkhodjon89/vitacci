import React, { Fragment } from 'react'
import Document, { Head, Main, NextScript, Html } from 'next/document'

import { GA_TRACKING_ID } from '../utils/gtag'

export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    // Check if in production
    const isProduction = process.env.NODE_ENV === 'production'

    return {
      ...initialProps,
      isProduction,
    }
  }

  render() {
    const { isProduction } = this.props

    return (
      <Html>
        <Head>
          {isProduction && (
            <Fragment>
              <meta name='facebook-domain-verification' content='dluysspicuzp8g0quvbb6yh50qhlll' />
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
  
                      gtag('config', '${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                      });
                    `,
                }}
              />
            </Fragment>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
