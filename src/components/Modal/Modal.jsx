import { Overlay, ModalContainer } from "./Modal.styled";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export function Modal ({closeModal, url}) {

    

  const  handleBackdropClick = e => {
        if(e.currentTarget === e.target) {
            closeModal();
        }
    }

    useEffect(() => {

const handleKeyDown = e => {
        if (e.code === 'Escape') {
            closeModal();
        }
    }

        window.addEventListener('keydown', handleKeyDown)
        return () => {  window.removeEventListener('keydown', handleKeyDown)}
    },[closeModal])

    // componentDidMount () {
    //     window.addEventListener('keydown', this.handleKeyDown)
    // }

    // componentWillUnmount () {
    //     window.removeEventListener('keydown', this.handleKeyDown)
    // }

    
        return createPortal(
            <Overlay onClick={handleBackdropClick}>
                <ModalContainer>
                    <img src={url} alt=""/>
                </ModalContainer>
            </Overlay>,
            modalRoot,
        )
   
}

Modal.propTypes = {
    closeModal: PropTypes.func,
    url: PropTypes.string,
}