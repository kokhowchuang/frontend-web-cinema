'use client';

import { Card, CardBody, CardFooter, Image } from '@heroui/react';
import { Movie } from '../types/movie';

const MovieCard = ({ movie }: { movie: Movie }) => {
  const imagePath = movie.poster_path || movie.backdrop_path;

  return (
    <Card isPressable isHoverable>
      <CardBody>
        <Image
          src={`https://image.tmdb.org/t/p/w500${imagePath}`}
          alt={movie.title}
          width={250}
          height={375}
        />
      </CardBody>
      <CardFooter>
        <div className='font-bold'>{movie.title}</div>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
