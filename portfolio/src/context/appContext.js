import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import appReducer from './reducers'
import {GET_PROJECTS,GET_PROJECT_DETAILS,GET_MY_DETAILS, OPEN_MODAL, CLOSE_MODAL, GET_SOCIAL_LINKES, SEND_CONTACT_SUCCESS} from './actions'

const initialState = {
  projects: [],
  projectDetails: {},
  myDetails:{},
  modalOpen: false,
  modalImage: "",
  instagram:'',
  facebook:'',
  linkedIn:'',
  modalImages:[],
  sending: false,
  error: null,
  message: null,
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getMyProjects');
      dispatch({
        type: GET_PROJECTS,
        payload: response.data,
      });
      console.log("response.data", response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const getProjectDetails = async (projectId) => {
    try {
      const response = await axios.get(`http://localhost:5000/getMyProjects/${projectId}`);
      dispatch({
        type: GET_PROJECT_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getMyDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/getMyDetails`);
      dispatch({
        type: GET_MY_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

   const sendContactForm = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/contact', formData);
      dispatch({
        type: SEND_CONTACT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      throw error.response.data;
    }
  };

  const getSocialLinks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/socialLinks`);
      dispatch({
        type: GET_SOCIAL_LINKES,
        payload: response.data,
      });
      console.log("social links", response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (imageUrl) => {
    dispatch({ type: OPEN_MODAL, payload: imageUrl });
    console.log("props.image",imageUrl)
  };

  const openModalImages = (modalImages) => {
    dispatch({ type: OPEN_MODAL, payload: modalImages });
    console.log("modalImages",modalImages)
  };

  const closeModal = () => {
    dispatch({ type:CLOSE_MODAL });
  };
  

  const value = {
    projects: state.projects,
    projectDetails: state.projectDetails,
    myDetails:state.myDetails,
    modalImage:state.modalImage,
    modalOpen:state.modalOpen,
    facebook:state.facebook,
    instagram:state.instagram,
    linkedIn:state.linkedIn,
    modalImages:state.modalImages,
    message:state.message,
    getProjects,
    getProjectDetails,
    getMyDetails,
    sendContactForm,
    getSocialLinks,
    openModal,
    closeModal,
    openModalImages
  };

  useEffect(()=>{
    getProjects()
    getMyDetails()
    getSocialLinks()
  },[])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
