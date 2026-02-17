import api from "../../Config/api";
import {
    ASSIGNED_ISSUE_TO_USER_FAILURE,
    ASSIGNED_ISSUE_TO_USER_REQUEST,
  ASSIGNED_ISSUE_TO_USER_SUCCESS,
  CREATE_ISSUE_FAILURE,
  CREATE_ISSUE_REQUEST,
  CREATE_ISSUE_SUCCESS,
  DELETE_ISSUE_FAILURE,
  DELETE_ISSUE_REQUEST,
  DELETE_ISSUE_SUCCESS,
  FETCH_ISSUES_BY_ID_FAILURE,
  FETCH_ISSUES_BY_ID_REQUEST,
  FETCH_ISSUES_BY_ID_SUCCESS,
  FETCH_ISSUES_FAILURE,
  FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS,
  UPDATE_ISSUE_STATUS_FAILURE,
  UPDATE_ISSUE_STATUS_REQUEST,
} from "./ActionTypes";

export const fetchIssues = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ISSUES_REQUEST });
    try {
      const response = await api.get(`/api/issues/project/${id}`);
      console.log("fetched issues", response.data);
      dispatch({ type: FETCH_ISSUES_SUCCESS, issues: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_ISSUES_FAILURE, error: error.messsage });
    }
  };
};

export const fetchIssueById = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ISSUES_BY_ID_REQUEST });
    try {
      const response = await api.get(`/api/issues/${id}`);
      console.log("fetched issues by id", response.data);
      dispatch({ type: FETCH_ISSUES_BY_ID_SUCCESS, issues: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_ISSUES_BY_ID_FAILURE, error: error.messsage });
    }
  };
};

export const updateIssueStatus = ( id, status ) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ISSUE_STATUS_REQUEST });
    try {
      const response = await api.put(
        `/api/issues/${id}/status/${status}`,
      );
      console.log("updated issues", response.data);
      dispatch({ type: FETCH_ISSUES_SUCCESS, issues: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: UPDATE_ISSUE_STATUS_FAILURE, error: error.messsage });
    }
  };
};

export const assignedUserToIssue = ({issueId,userId}) => {
  return async (dispatch) => {
    dispatch({ type: ASSIGNED_ISSUE_TO_USER_REQUEST });
    try {
      const response = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
      console.log("assignee user to issues", response.data);
      dispatch({ type: ASSIGNED_ISSUE_TO_USER_SUCCESS,issue: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: ASSIGNED_ISSUE_TO_USER_FAILURE, error: error.messsage });
    }
  };
};

export const createIssue = (issueData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_ISSUE_REQUEST })
    try {
      const response = await api.post("/api/issues", issueData);
      console.log("issue created", response)
      dispatch({type:CREATE_ISSUE_SUCCESS,issue:response.data})
    } catch (error) {
      console.log(error);
      dispatch({type:CREATE_ISSUE_FAILURE,error:error.message})
    }
  }
}

export const deleteIssue= (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ISSUE_REQUEST });
    try {
      const response = await api.delete(`/api/issues/${id}`);
      console.log("deleted issues by id", response.data);
      dispatch({ type: DELETE_ISSUE_SUCCESS,issueId:id });
    } catch (error) {
      console.log(error);
      dispatch({ type: DELETE_ISSUE_FAILURE, error: error.messsage });
    }
  };
};