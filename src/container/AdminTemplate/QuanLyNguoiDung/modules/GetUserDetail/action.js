import * as ActionType from "./constant";
import Axios from "axios";

export const actGetUserDetailApi = (taiKhoan) => {
  return (dispatch) => {
    dispatch(actGetUserDetailRequest());

    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
      method: "POST",
      data: {
        taiKhoan: taiKhoan,
      },
    })
      .then((result) => {
        dispatch(actGetUserDetailSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actGetUserDetailFailed(err));
      });
  };
};
export const actDeleteUserDetail = () => {
  return {
    type: ActionType.DELETE_USER_DETAIL,
  };
};
const actGetUserDetailRequest = () => {
  return {
    type: ActionType.GET_USER_DETAIL_REQUEST,
  };
};
const actGetUserDetailSuccess = (data) => {
  return {
    type: ActionType.GET_USER_DETAIL_SUCCESS,
    payload: data,
  };
};
const actGetUserDetailFailed = (err) => {
  return {
    type: ActionType.GET_USER_DETAIL_FAILED,
    payload: err,
  };
};
