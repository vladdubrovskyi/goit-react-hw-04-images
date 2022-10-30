import {GalleryItem, GalleryImage } from "components/ImageGalleryItem/ImageGalleryItem.styled"
import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ item, onClick }) => {
  const {webformatURL, tag, largeImageURL} = item;
  return (
    <GalleryItem>
      <GalleryImage 
       src={webformatURL} alt={tag} onClick={() => onClick(largeImageURL)}
      />
    </GalleryItem>
  );
};
ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tag: PropTypes.string,
  })),
  onClick: PropTypes.func,}