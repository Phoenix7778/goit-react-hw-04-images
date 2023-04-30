import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query) {
      setIsLoading(true);

      fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=33824136-a1de31ce3e31340e081d1e63a&image_type=photo&orientation=horizontal&per_page=${perPage}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Sorry, nothing found on your request`)
          );
        })
        .then(data => {
          if (data.hits.length === 0) {
            Notiflix.Notify.failure(' Sorry, nothing found on your request');
            return;
          }
          setImages(prevState => [...prevState, ...data.hits]);
          setShowModal(true);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [query, page, perPage]);

  const handleSearchSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setPerPage(perPage);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '18px',
        paddingBottom: '25px',
      }}
    >
      <Searchbar onSubmit={handleSearchSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {images.length > 0 && showModal && <Button onBtnClick={handleLoadMore} />}
      {isLoading && <Loader />}
      {error && (
        <p>
          {error} There are no images for "{query}" search
        </p>
      )}
    </div>
  );
};
