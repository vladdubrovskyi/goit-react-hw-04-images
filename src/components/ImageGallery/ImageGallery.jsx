import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import PropTypes from 'prop-types';
import {GalleryList} from "components/ImageGallery/ImageGallery.styled"
export const ImageGallery = ({ images, onClick }) => {
  return (<GalleryList>
            {images.map(image => {
                return <ImageGalleryItem key={image.id} item={image} onClick={onClick}/>})}
  </GalleryList>)

};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  onClick: PropTypes.func,
}