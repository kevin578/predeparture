import React, {useEffect} from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import { Auth, Storage } from 'aws-amplify'

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

    useEffect(()=> {
    loadContent()
  }, []);

  function loadContent() {
    Storage.list('')
    .then(result => console.log(result))
    .catch(err => console.log(err));
  }

  function onChange(e) {
    const file = e.target.files[0]
    console.log(file.name, file.type);
    Storage.put(file.name, file, {
      contentType: file.type,
    })
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel="Media"
      ariaHideApp={false}
      onRequestClose={props.closeModal}
      style={modalStyles}
    >
      <input type="file" onChange={e => onChange(e)} />


    </Modal>
  )
}
