import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_RESET,
  UPDATE_USERDATA_FAIL,
  UPDATE_USERDATA_REQUEST,
  UPDATE_USERDATA_RESET,
  UPDATE_USERDATA_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constants/userConstant";

import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${process.env.REACT_BACKEND_URL}/api/v1/login`,
      { email, password },
      {
        withCredentials: true,
      },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${process.env.REACT_BACKEND_URL}/api/v1/register`,
      userdata,
      config
    );

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_BACKEND_URL}/api/v1/me`,
      {
        withCredentials: true,
      },
      config
    );

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_BACKEND_URL}/api/v1/admin/users`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: ALL_USER_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USER_FAIL, payload: error.response.data.message });
  }
};

export const getUserDetails =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });

      const { data } = await axios.get(
        `${process.env.REACT_BACKEND_URL}/api/v1/admin/user/${id}`,
        {
          withCredentials: true,
        }
      );

      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const alluser = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_BACKEND_URL}/api/v1/admin/users`
    );

    localStorage.setItem("users", JSON.stringify(getState().allUsers.users));
    dispatch({ type: ALL_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_USER_FAIL, payload: error.response.data.message });
  }
};
export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_BACKEND_URL}/api/v1/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

export const updateProfile = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `${process.env.REACT_BACKEND_URL}/api/v1/me/update`,
      userdata,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    // const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${process.env.REACT_BACKEND_URL}/api/v1/password/update`,
      password,
      // config,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateUser =
  ({ id }, userData) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USERDATA_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `${process.env.REACT_BACKEND_URL}/api/v1/admin/user/${id}`,
        // { withCredentials: true },
        userData
        // config
      );

      dispatch({ type: UPDATE_USERDATA_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_USERDATA_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//DElete user-- admin
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(
      `${process.env.REACT_BACKEND_URL}/api/v1/admin/user/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${process.env.REACT_BACKEND_URL}/api/v1/forgot`,
      email,
      config
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const resetPassword =
  ({ token }, password) =>
  async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `${process.env.REACT_BACKEND_URL}/api/v1/password/reset/${token}`,
        password,
        config,
        { withCredentials: true }
      );

      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
