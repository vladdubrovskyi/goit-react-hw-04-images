import { Overlay, ModalContainer } from "./Modal.styled";
import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.closeModal();
        }
    }

    handleBackdropClick = e => {
        if(e.currentTarget === e.target) {
            this.props.closeModal();
        }
    }

    componentDidMount () {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    render () {
        return createPortal(
            <Overlay onClick={this.handleBackdropClick}>
                <ModalContainer>
                    <img src={this.props.url} alt=""/>
                </ModalContainer>
            </Overlay>,
            modalRoot,
        )
    };
}

Modal.propTypes = {
    closeModal: PropTypes.func,
    url: PropTypes.string,
}