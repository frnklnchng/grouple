import * as APIUtil from '../util/message_util';
import axios from 'axios';
export const RECEIVE_ALL_MESSAGES = 'RECEIVE_ALL_MESSAGES';

export const receiveAllMessages = () => ({
  type: RECEIVE_ALL_MESSAGES,

})
//should do all the things