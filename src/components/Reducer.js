import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
function Reducer(state, action) {
  switch (action.type) {
    case 'addMedia': {
      return{
      ...state,
      images: action.payload.type === 'image'
        ?  [...state.images, action.payload.newFile]
        : state.images,
      videos: action.payload.type === 'video'
        ?  [...state.videos, action.payload.newFile]
        : state.videos,
      albums: action.payload.type === 'album'
        ?  [...state.albums, action.payload.newFile]
        : state.albums}
    }
    case 'addAlbum':{
      return {
        ...state,
        albums:[...state.albums , action.payload]
      }
    }
    case 'deleteMedia':
      return {
        ...state,
        images: action.payload.type === 'image'
          ? action.payload.updatedImage
          : state.images,
        videos: action.payload.type === 'video'
          ? action.payload.updatedVideo
          : state.videos,
        albums: action.payload.type === 'album'
          ? state.albums.filter(album => album.id !== action.payload.id)
          : state.albums

      }

    case 'addToAlbum':
      return {
        ...state,
        albums: state.albums.map((album) => {
          if (album.id === action.payload.albumId) {
            return {
              ...album,
              selected: action.payload.updated
            }
          }
          return album
        })
      }


    case 'setAlbums':
      return {
        ...state,
        albums: action.payload
      }
    case 'setImages':
      return {
        ...state,
        images: action.payload
      }
    case 'setVideos':
      return {
        ...state,
        videos: action.payload
      }

    default:
      return state;

  }
}

const initialState = {
  albums: [],
  images: [],
  videos: []
}
const MediaContext = createContext();
const MediaProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  const fetchData = useCallback(() => {
    axios.get('http://localhost:8000/images')
      .then((response) =>
        dispatch({ type: 'setImages', payload: response.data })
      )
      .catch((error) => console.log(error))

    axios.get('http://localhost:8000/videos')
      .then((response) =>
        dispatch({ type: 'setVideos', payload: response.data })
      )
      .catch((error) => console.log(error))

    axios.get('http://localhost:8000/Albums')
      .then((response) =>
        dispatch({ type: 'setAlbums', payload: response.data })
      )
      .catch((error) => console.log(error))
  })
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <MediaContext.Provider value={{ state, dispatch }}>
      {children}
    </MediaContext.Provider>
  )
}
export { MediaContext, MediaProvider };
