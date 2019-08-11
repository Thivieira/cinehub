import React from 'react';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { Row, Card, CardBody, CardText, CardTitle } from 'reactstrap';

export default function NotFound() {
  return (
    <Layout>
      <Row>
        <Card className="movie-details-card">
          <CardBody className="movie-card-body">
            <CardTitle>
              <h1>Page not found :(</h1>
            </CardTitle>
            <CardText>
              Maybe the page you are looking for has been removed, or you typed in the wrong URL
            </CardText>
          </CardBody>
        </Card>
      </Row>
      <Row className="justify-content-center">
        <Link to="/" class="back-link text-center">
          Go back now and browse more movies!
        </Link>
      </Row>
    </Layout>
  );
}
