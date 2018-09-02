import axios from 'axios';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const GET_ALL_MESSAGES = 'GET_ALL_MESSAGES';
export const RECEIVE_MESSAGE_ERRORS = 'RECEIVE_MESSAGE_ERRORS';

export const fetchAllMessages = () => (dispatch) => {
  return (
    axios.get('/api/messages')
    .then(response => dispatch(getAllMessages(response.data)))
    .catch((error) => dispatch(receiveMessageErrors(error.response.data)))
  );
};

export const postMessage = (message) => (dispatch) => {
  return (
    axios.post('/api/messages/post', message)
    .then(response => dispatch(receiveMessage(response.data)))
    .catch(error => dispatch(receiveMessageErrors(error.response.data)))
  );
};

export const receiveMessage = (message) => {
  return {
    type: RECEIVE_MESSAGE,
    message: message
  };
}

export const getAllMessages = (allMsgs) => {
  return {
    type: GET_ALL_MESSAGES,
    payload: allMsgs,
  };
};

export const receiveMessageErrors = (errors) => {
  return {
    type: RECEIVE_MESSAGE_ERRORS,
    errors: errors
  };
}