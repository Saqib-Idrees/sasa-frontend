import Head from 'next/head';
import TopNav from './../TopNav';
import LeftSideNav from './../LeftSideNav';
import styles from './../Layout.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Footer from './../Footer';
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
