import axios from 'axios';

const $ = window.$;
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const CLEAR_MESSAGE_ERRORS = 'CLEAR_MESSAGE_ERRORS';
export const RECEIVE_MESSAGE_ERRORS = 'RECEIVE_MESSAGE_ERRORS';

export const createMessage = (formMessage, history) => (dispatch) => {
  axios
    .post('/api/messages', formMessage)
    .then(response => {
      const text = response.data.text;
      dispatch(receiveMessage(text));
    })
    .catch(error =>
      dispatch({
        type: RECEIVE_MESSAGE_ERRORS,
        payload: error.response.data
      })
    );
};