import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
// import { env } from '../../../config';
import { AppConfig } from '../../utils/appConfig';

// type IMetaProps = {
//   title: string;
//   description: string;
//   canonical?: string;
// };

const Meta = (props) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon"
          href={`/assets/images/favicon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/assets/images/favicon.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/assets/images/favicon.png`}
          key="icon16"
        />
        <link rel="icon" href={`/assets/images/favicon.ico`} key="favicon" />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
        }}
      />
    </>
  );
};

export { Meta };
