import { Meta } from './../Meta';
import { AppConfig } from '../../../utils/appConfig';

export const siteTitle = 'team13socialapp';

const Layout = ({ children, title, content }) => {
  return (
    <>
      <div className="main-content-view">
        <Meta title={AppConfig.title} description={AppConfig.description} />
        {/* <TopNav /> */}
        <main>
          <div className="main-wrapper">{children}</div>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

Layout.defaultProps = {
  title: 'social media',
  description: 'mvp v0',
};

export default Layout;
