import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function MovieItem(props) {
  return (
    <Card className="movie-card card card--z-3">
      <Link to={`movie/${props.id}`}>
        <CardImg top className="movie-item-image" src={props.url} alt={props.altText} />
        <CardTitle>{props.title}</CardTitle>
        {/* <CardBody>
          <CardTitle>{props.title}</CardTitle>
          <CardSubtitle>{props.subtitle}</CardSubtitle>
          <CardText className="movie-item-text">{props.text || props.children}</CardText>
        </CardBody> */}
      </Link>
    </Card>
  );
}
