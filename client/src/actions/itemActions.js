import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  ADD_ITEM_FULL,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get("http://localhost:5000/articles")
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (item) => (dispatch, getState) => {
  axios
    .post("http://localhost:5000/articles/add", item, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItemFull = (item) => (dispatch, getState) => {
  axios
    .post("http://localhost:5000/articles/upload", item, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ITEM_FULL,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (id) => (dispatch, getState) => {
  axios
    .delete(`http://localhost:5000/articles/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
