import React, { Component } from "react"
import axios from "axios"
import { Searchbar } from "components/Searchbar/Searchbar"
import { ImageGallery } from 'components/ImageGallery/ImageGallery'
import { Button } from "./Button/Button"
import { Modal } from "./Modal/Modal";
import { ThreeDots } from "react-loader-spinner";

const apiKey = "29821254-cc8d55b85aa42c363f8211fb8"
const baseUrl = "https://pixabay.com/api/?"

export class App extends Component {
  state = {
    images: [],
    page: 1,
    name: "",
    chosenLargeImageURL: "",
    isLoading: false,
    error: null
  }
onOpenModalWithLargeImage = (url) => {
    this.setState({
      chosenLargeImageURL: url,
    })
  }

  onModalClose = () => {
    this.setState({
      chosenLargeImageURL: "",
    })
  }


 pushImagesToState = (response) => {
    const imagesFromResponse = response.data.hits;
    let newSearchArray = [];
    newSearchArray = [...this.state.images, ...imagesFromResponse];
    this.setState(({ images }) => ({ images: newSearchArray }));
  };

  formSubmitHandler = (name) => {
    if (name.trim().length === 0) {
      alert('Please, enter request');
      return
    }

    this.setState({
      images: [],
    page: 1,
    name
  })
  };
  
  loadMore = () => {
    this.setState(prevState => ({
    page : prevState.page + 1
  }))
  }
  

  
  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page || prevState.name !== this.state.name) {
    
      try {   
        
        this.setState({isLoading : true})
        axios.get(`${baseUrl}q=${this.state.name}&page=${this.state.page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`).then(response => {
          if (response.data.hits.length > 0) { this.pushImagesToState(response) } else {alert ('No images found');}
        })
      
      } catch (error) {
        this.setState({
          error: error.message,
          isLoading: false
        })
      } finally {
        this.setState({ isLoading: false }) 
      }
    }
  }

  render() {
    let {images, chosenLargeImageURL, isLoading, error} = this.state
    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery images={this.state.images} onClick={this.onOpenModalWithLargeImage} />
        {error && <p>{error}</p>}
        {isLoading && (<ThreeDots
          height="50"
          width="50"
          color='#303f9f'
          ariaLabel='loading'
        />)}
        {images.length > 0 && <Button loadMore= {this.loadMore} /> }
        {chosenLargeImageURL && (<Modal closeModal={this.onModalClose} url={chosenLargeImageURL}/>)}
        
      
      </>
    )
  }
}
