import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

export default function MovieItem(props) {
  return (
    <Card className="movie-card">
      <CardImg top className="movie-item-image" src={props.url} alt={props.altText} />
      <CardBody>
        <CardTitle>{props.title}</CardTitle>
        <CardSubtitle>{props.subtitle}</CardSubtitle>
        <CardText className="movie-item-text">{props.text || props.children}</CardText>
      </CardBody>
    </Card>
  );
}
