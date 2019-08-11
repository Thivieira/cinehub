import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../Layout.jsx';
import MovieGallery from '../components/Infinite/MovieGallery.jsx';
import InputSection from '../components/InputSection.jsx';
import { Container, Row, Col } from 'reactstrap';

export default function Home() {
  return (
    <Layout>
      <Helmet>
        <meta />
      </Helmet>
      <Row className="justify-content-center">
        <InputSection />
      </Row>
      <Row>
        <MovieGallery />
      </Row>
    </Layout>
  );
}
