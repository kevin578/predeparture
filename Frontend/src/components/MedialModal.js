import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import { Auth, Storage } from 'aws-amplify'
import { FileCopy, Delete } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

const modalStyles = {
  content: {
    width: 580,
    height: 530,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
    padding: 25,
  },
  overlay: {
    zIndex: 110,
  },
}

const FileContainer = styled.div`
  margin-top: 10px;
  margin-left: 10px;
`

const FilePath = styled.div`
  margin-bottom: 5px;
`

const SelectedFileContainer = styled.span`
  margin-left: 40px;
  position: relative;
  top: 4px;
`

const UploadedFiles = styled.h3`
  margin-top: 30px;
  margin-bottom: 0px;
`

const FileListItem = styled.div`
  display: flex;
  border-bottom: 1px solid #d8d8d8;
  margin-bottom: 10px;
  width: 75%;
`

const DeleteText = styled.span`
  font-size: 14px;
  text-decoration: underline;
  color: #9b1b1b;
  position: relative;
  left: 15px;
  top: 3px;
  cursor: pointer;
`

const iconStyles = {
  marginLeft: 10,
  fontSize: 16,
  cursor: 'pointer',
  position: 'relative',
  top: 7,
}

export default function MedialModal(props) {
  const [selectedFileName, setSelectedFileName] = useState('No file selected')
  const [file, setFile] = useState('')
  const [fileList, setFileList] = useState([''])
  const [disableUpload, setDisableUpload] = useState(true)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = () => {
    Storage.list('')
      .then(result => setFileList(result))
      .catch(err => console.log(err))
  }

  const onChange = e => {
    const filePointer = e.target.files[0]
    setSelectedFileName(filePointer.name)
    setDisableUpload(false)
    setFile(filePointer)
  }

  const uploadFiles = () => {
    Storage.put(file.name, file, {
      progressCallback(progress) {
        setSelectedFileName(
          `Uploaded: ${Math.round((progress.loaded / progress.total) * 100)}%`
        )
      },
      contentType: file.type,
    })
      .then(result => {
        loadContent()
        setSelectedFileName('No file selected')
        setFile('')
        setDisableUpload(true)
      })
      .catch(err => console.log(err))
  }

  const copyText = text => {
    resetDelete()
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  const getFileList = () =>
    fileList.map((item, index) => {
      return (
        <FileListItem key = {`fileListItem${index}`}>
          <FilePath key={item.key}>{item.key}</FilePath>
          <FileCopy style={iconStyles} onClick={() => copyText(item.key)} />
          {!item.delete && (
            <Delete style={iconStyles} onClick={() => toggleDelete(index)} />
          )}
          {item.delete && (
            <DeleteText onClick={() => deleteItem(item.key)}>
              Confirm Delete
            </DeleteText>
          )}
        </FileListItem>
      )
    })

  const resetDelete = () => {
    let fileListCopy = fileList
    fileListCopy = fileListCopy.map(item => {
      item.delete = false
      return item
    })
    setFileList(fileListCopy)
  }

  const toggleDelete = index => {
    resetDelete()
    let fileListCopy = fileList
    fileListCopy = fileListCopy.map((item, ind) => {
      if (index == ind) {
        item.delete = true
      }
      return item
    })
    setFileList(fileListCopy)
  }

  const deleteItem = item => {
    Storage.remove(item)
      .then(result => {
        resetDelete();
        loadContent()
      })
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
      <input
        type="file"
        onChange={e => onChange(e)}
        id="contained-button-file"
        style={{ display: 'none' }}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" color="primary">
          Select File
        </Button>
      </label>

      <Button
        variant="contained"
        style={{ marginLeft: 25 }}
        disabled={disableUpload}
        onClick={() => uploadFiles()}
      >
        Upload
      </Button>

      <SelectedFileContainer>{selectedFileName}</SelectedFileContainer>

      <UploadedFiles>Uploaded Files</UploadedFiles>
      <FileContainer>{getFileList()}</FileContainer>
    </Modal>
  )
}
