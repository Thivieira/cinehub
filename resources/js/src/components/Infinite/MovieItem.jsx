import React from 'react';
import { Card, CardImg, CardTitle, CardSubtitle, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function MovieItem(props) {
  return (
    <Card className="movie-card card card--z-3">
      <Link to={`movie/${props.id}`}>
        <CardImg top className="movie-item-image" src={props.url} alt={props.altText} />
        <CardBody>
          <CardTitle>{props.title}</CardTitle>
          <CardSubtitle>
            Release Date: {moment(props.item.release_date).format('DD/MM/YYYY')}
          </CardSubtitle>
        </CardBody>
      </Link>
    </Card>
  );
}
