import api from "../../Config/api";
import {
  FETCH_CHAT_BY_PROJECT_FAILURE,
  FETCH_CHAT_BY_PROJECT_REQUEST,
  FETCH_CHAT_BY_PROJECT_SUCCESS,
  FETCH_CHAT_MESSAGES_FAILURE,
  FETCH_CHAT_MESSAGES_REQUEST,
  FETCH_CHAT_MESSAGES_SUCCESS,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
} from "./ActionTypes";

export const sendMessage = (messageData) => {
  return async (dispatch) => {
    dispatch({ type: SEND_MESSAGE_REQUEST });

    try {
      const response = await api.post("/api/messages/send", messageData);
      console.log("message sent",response.data);
      dispatch({ type: SEND_MESSAGE_SUCCESS, messages: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: SEND_MESSAGE_FAILURE, error: error.message });
    }
  };
};

export const fetchChatByProject = (projectId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CHAT_BY_PROJECT_REQUEST });

    try {
      const response = await api.get(`/api/projects/${projectId}/chat`);
      console.log("fetch chat by project succesfully", response.data);
      dispatch({ type: FETCH_CHAT_BY_PROJECT_SUCCESS, chat: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_CHAT_BY_PROJECT_FAILURE, error: error.message });
    }
  };
};

export const fetchChatMessages = (chatId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CHAT_MESSAGES_REQUEST });

    try {
      const response = await api.get(`/api/messages/chat/${chatId}`);
      console.log("fetch messages by chat id", response.data)
      dispatch({ type: FETCH_CHAT_MESSAGES_SUCCESS, messages: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_CHAT_MESSAGES_FAILURE, error: error.message });
    }
  };
};