import * as ActionType from "./constant";

let initialState = {
  data: [],
};

const addShowTimeDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_SHOWTIME_DETAIL:
      const newData = [...state.data];
      const {
        maHeThongRap,
        tenCumRap,
        maLichChieu,
        ngayChieuGioChieu,
        giaVe,
        thoiLuong,
      } = action.payload;
      const itemShowTime = {
        maHeThongRap,
        tenCumRap,
        maLichChieu,
        ngayChieuGioChieu: `${new Date(
          ngayChieuGioChieu
        ).toLocaleDateString()} ${new Date(
          ngayChieuGioChieu
        ).toLocaleTimeString()}`,
        giaVe,
        thoiLuong,
      };
      if (newData.findIndex((item)=> item.maLichChieu === itemShowTime.maLichChieu) === -1) {
        newData.push(itemShowTime);
      }
      state.data = newData;
      return { ...state };
    case ActionType.DELETE_SHOWTIME_DETAIL:
      state.data = [];
      return { ...state };
    default:
      return { ...state };
  }
};
export default addShowTimeDetailReducer;
