import * as ActionType from "./constant";
import Axios from "axios";
import { Toast } from "../../../../../../components/Toast";

export const actShowTimeApi = (data) => {
  let accessToken = "";
  if (localStorage.getItem("UserAdmin")) {
    accessToken = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  }
  return (dispatch) => {
    dispatch(actShowTimeRequest());
    Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
      method: "POST",
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        dispatch(actShowTimeSuccess(res.data));
        Toast.fire({
          icon: "success",
          title: `Tạo lịch chiếu thành công`,
        })
      })
      .catch((err) => {
        dispatch(actShowTimeFailed(err));
        Toast.fire({
          icon: "error",
          title: `${err.response.data}`,
        })
      });
  };
};
const actShowTimeRequest = () => {
  return {
    type: ActionType.CREATE_SHOWTIME_REQUEST,
  };
};
const actShowTimeSuccess = (data) => {
  return {
    type: ActionType.CREATE_SHOWTIME_SUCCESS,
    payload: data,
  };
};
const actShowTimeFailed = (err) => {
  return {
    type: ActionType.CREATE_SHOWTIME_FAILED,
    payload: err,
  };
};
