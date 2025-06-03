'use client';

import { Card, CardBody, CardFooter, Image } from '@heroui/react';
import { Movie } from '../types/movie';

type MoviePreview = Pick<
  Movie,
  'id' | 'title' | 'poster_path' | 'backdrop_path' | 'popularity'
>;

const MovieCard = ({ movie }: { movie: MoviePreview }) => {
  const imagePath = movie.poster_path || movie.backdrop_path;

  return (
    <Card isPressable isHoverable>
      <CardBody>
        <Image
          src={`https://image.tmdb.org/t/p/w500${imagePath}`}
          alt={movie.title}
          width={450}
          height={575}
        />
      </CardBody>
      <CardFooter>
        <div className='flex flex-col text-left'>
          <div className='font-bold'>{movie.title}</div>
          <div className=''>{movie.popularity}</div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
