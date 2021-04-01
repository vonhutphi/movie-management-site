import * as ActionType from "./constant";
import Axios from "axios";
import { Toast } from "../../../../../components/Toast";

export const fetchEditUserApi = (user) => {
  let accessToken = "";
  if (localStorage.getItem("UserAdmin")) {
    accessToken = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  }
  return (dispatch) => {
    dispatch(actEditUserRequest());
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      method: "PUT",
      data: user,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((result) => {
        dispatch(actEditUserSuccess(result.data));
        Toast.fire({
          icon: "success",
          title: `Sửa người dùng thành công`,
        });
      })
      .catch((err) => {
        dispatch(actEditUserFailed(err));
        Toast.fire({
          icon: "error",
          title: err.response.data,
        });
      });
  };
};
const actEditUserRequest = () => {
  return {
    type: ActionType.EDIT_USER_REQUEST,
  };
};
const actEditUserSuccess = (data) => {
  return {
    type: ActionType.EDIT_USER_SUCCESS,
    payload: data,
  };
};
const actEditUserFailed = (err) => {
  return {
    type: ActionType.EDIT_USER_FAILED,
    payload: err,
  };
};
