'use client';

import { Link } from '@heroui/link';
import { Snippet } from '@heroui/snippet';
import { Code } from '@heroui/code';
import { button as buttonStyles } from '@heroui/theme';

import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import { GithubIcon } from '@/components/icons';
import MovieCard from '@/components/movie-card';
import { useMovieStore } from '@/store/movieStore';
import { useEffect, useMemo, useRef } from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from '@heroui/react';

export default function Home() {
  const { movies, fetchMovies, loading, setSort, sort } = useMovieStore();
  const loader = useRef<HTMLDivElement | null>(null);

  const sortOptions = [
    { key: 'primary_release_date.desc', label: 'Latest Release Date' },
    { key: 'primary_release_date.asc', label: 'Oldest Release Date' },
    { key: 'original_title.asc', label: 'A - Z' },
    { key: 'original_title.desc', label: 'Z - A' },
    { key: 'vote_average.desc', label: 'Highest Rating' },
    { key: 'vote_average.asc', label: 'Lowest Rating' },
  ];

  useEffect(() => {
    fetchMovies();
  }, [sort]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting)
        setTimeout(() => {
          fetchMovies(true);
        }, 5000);
    });
    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);

  const sorting = useMemo(() => {
    return sortOptions.find((option) => option.key === sort)?.label ?? 'Sort';
  }, [sort]);

  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
      <div className='inline-block max-w-xl text-center justify-center'>
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: 'violet' })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: 'mt-4' })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <Dropdown>
        <DropdownTrigger>
          <Button variant='bordered'>{sorting}</Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Sort movies'
          onAction={(key) => setSort(key as string)}
        >
          {sortOptions.map((option) => (
            <DropdownItem key={option.key}>{option.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      <div className='grid grid-cols-3'>
        {movies.map((movie, index) => (
          <div key={movie.id + '-' + index}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
        <Spinner size='lg' label='Loading...' />
        <div ref={loader} style={{ height: 1 }}></div>
      </div>

      <div className='flex gap-3'>
        <Link
          isExternal
          className={buttonStyles({
            color: 'primary',
            radius: 'full',
            variant: 'shadow',
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: 'bordered', radius: 'full' })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className='mt-8'>
        <Snippet hideCopyButton hideSymbol variant='bordered'>
          <span>
            Get started by editing <Code color='primary'>app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
