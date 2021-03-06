import axios from 'axios'

export const addContentToHistory = (content, user) => {



  return new Promise((resolve, reject) => {
    axios
      .put(
        'https://6qb13v2ut8.execute-api.us-east-1.amazonaws.com/dev/addItemToHistory',
        {
          content,
          user,
          stage: process.env.NODE_ENV
        }
      )
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const getContentHistory = ()=> {
  return new Promise((resolve, reject) => {
    axios
      .get(
        'https://6qb13v2ut8.execute-api.us-east-1.amazonaws.com/dev/getItemHistory',
        {
          params: {
            stage: process.env.NODE_ENV
          }
        }
      )
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}
