import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  redirectIEToEdge = () => {
    const recommendEdgeUrl =
      "https://support.microsoft.com/office/160fa918-d581-4932-9e4e-1075c4713595";
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
          window.location = 'microsoft-edge:' + window.location;
          setTimeout(function() {
            window.location = '${recommendEdgeUrl}';
          }, 1);
        }`,
        }}
      ></script>
    );
  };
  render() {
    const { redirectIEToEdge } = this;
    return (
      <Html lang="ko">
        <Head>
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <meta name="theme-color" content="#ffffff" />
          {redirectIEToEdge()}
          <meta property="og:type" content="website" />
          {/* <meta property="og:url" content="https://staku.net/" /> */}
          {/* <meta property="og:site_name" content="Staku" /> */}
          <meta property="og:locale" content="ko-KR" />
          {/* <meta name="twitter:card" content="summary_large_image" /> */}
          {/* <meta name="twitter:site" content="@staku" /> */}
          {/* <meta name="twitter:site:id" content="@staku" /> */}
          {/* <meta name="twitter:creator" content="@staku" /> */}
          {/* <meta name="twitter:creator:id" content="@staku" /> */}
        </Head>
        <body>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
