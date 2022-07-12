import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
    return (
        <Html>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Potta+One&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Moo+Lah+Lah&display=swap" rel="stylesheet" />
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-9MX46PMTPM"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments)};
                        gtag('js', new Date());
                        gtag('config', 'G-9MX46PMTPM');
                    `}
                </Script>
            </Head>
            <body className='bg-white-liz dark:bg-black-liz'>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}