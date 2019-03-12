import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components'


const modalStyles = {
    content: {
      width: 380,
      height: 530,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 40,
      padding: 25,
    },
    overlay: {
      zIndex: 100,
    },
  }

export default function MedialModal(props) {
  return (
    <Modal
    isOpen={props.isOpen}
    contentLabel="Media"
    ariaHideApp={false}
    onRequestClose={props.closeModal}
    style={modalStyles}
  />
  )
}
