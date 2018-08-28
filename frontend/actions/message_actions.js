import * as MessageAPIUtil from '../utils/message_api_util';

export const RECEIVE_MESSAGE_ERRORS = 'RECEIVE_MESSAGE_ERRORS';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

const receiveMessages = (messages) => {
  return {
    type: RECEIVE_MESSAGES,
    messages
  };
};

const receiveMessage = (message) => {
  return {
    type: RECEIVE_MESSAGE,
    message
  };
};

export const receiveMessageErrors = (errors) => {
  return {
    type: RECEIVE_MESSAGE_ERRORS,
    errors
  };
};

export const fetchMessages = () => (dispatch) => {
  return MessageAPIUtil.fetchMessages().then(response => dispatch(receiveMessages(response.messages)));
};

export const createMessage = (formMessage) => (dispatch) => {
  return MessageAPIUtil.createMessage(formMessage).then(
    response => dispatch(receiveMessage(response.message)),
    errors => dispatch(receiveMessageErrors(errors.responseJSON))
  );
};