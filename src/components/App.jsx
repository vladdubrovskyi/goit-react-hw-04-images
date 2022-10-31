import React, { useState, useEffect } from "react"

import { Searchbar } from "components/Searchbar/Searchbar"
import { ImageGallery } from 'components/ImageGallery/ImageGallery'
import { Button } from "./Button/Button"
import { Modal } from "./Modal/Modal";
import { ThreeDots } from "react-loader-spinner";
import {getFetchImages} from "components/API/Api"

export function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [chosenLargeImageURL, setChosenLargeImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

 
const onOpenModalWithLargeImage = (url) => {
    setChosenLargeImageURL(url)
  }

  const onModalClose = () => {
    setChosenLargeImageURL("")
  }

 const formSubmitHandler = (name) => {
    if (name.trim().length === 0) {
      alert('Please, enter request');
      return
    }
   setImages([]);
   setPage(1)
   setName(name)
  };
  
  const loadMore = () => {
    setPage(state =>  {return state + 1})
  }
  
useEffect(() => {
    async function fetchData() {
      const fetchImages = await getFetchImages(name, page);

      const requiredPropertiesImages = fetchImages.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        })
      );

      setImages(images => [...images, ...requiredPropertiesImages]);
      setIsLoading(false);
    }

    if (name.trim() === '') {
      return;
    }

    try {
      fetchData();
    } catch (error) {
      setError(error.message);
    }
  }, [name, page]);


  
    return (
      <>
        <Searchbar onSubmit={formSubmitHandler} />
        <ImageGallery images={images} onClick={onOpenModalWithLargeImage} />
        {error && <p>{error}</p>}
        {isLoading && (<ThreeDots
          height="50"
          width="50"
          color='#303f9f'
          ariaLabel='loading'
        />)}
        {images.length > 0 && <Button loadMore= {loadMore} /> }
        {chosenLargeImageURL && (<Modal closeModal={onModalClose} url={chosenLargeImageURL}/>)}
    
      </>
    )
  }

