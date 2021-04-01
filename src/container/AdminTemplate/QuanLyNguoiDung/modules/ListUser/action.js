import * as ActionType from "./constant";
import Axios from "axios";

export const actListUserApi = () => {
  return (dispatch) => {
    dispatch(actListUserRequest());
    setTimeout(() => {
      Axios({
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP03`,
        method: "GET",
      })
        .then((result) => {
          dispatch(actListUserSuccess(result.data));
        })
        .catch((err) => {
          dispatch(actListUserFailed(err));
        });
    }, 500);
  };
};
export const actSetUserEdit = (data) => {
  return {
    type: ActionType.SET_USER_EDIT,
    payload: data,
  };
};
const actListUserRequest = () => {
  return {
    type: ActionType.LIST_USER_REQUEST,
  };
};
const actListUserSuccess = (data) => {
  return {
    type: ActionType.LIST_USER_SUCCESS,
    payload: data,
  };
};
const actListUserFailed = (err) => {
  return {
    type: ActionType.LIST_USER_FAILED,
    payload: err,
  };
};
