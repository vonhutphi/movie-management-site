import {combineReducers} from 'redux';
import authReducer from '../container/AdminTemplate/AuthPage/modules/reducer';
import listUserReducer from '../container/AdminTemplate/QuanLyNguoiDung/modules/ListUser/reducer'
import editUserReducer from '../container/AdminTemplate/QuanLyNguoiDung/modules/EditUser/reducer'
import deleteUserReducer from '../container/AdminTemplate/QuanLyNguoiDung/modules/DeleteUser/reducer'
import addUserReducer from '../container/AdminTemplate/QuanLyNguoiDung/modules/AddUser/reducer'
import listMovieReducer from '../container/AdminTemplate/QuanLyPhim/modules/ListMovie/reducer'
import addMovieReducer from '../container/AdminTemplate/QuanLyPhim/modules/AddMovie/reducer'
import editMovieReducer from '../container/AdminTemplate/QuanLyPhim/modules/EditMovie/reducer'
import deleteMovieReducer from '../container/AdminTemplate/QuanLyPhim/modules/DeleteMovie/reducer';
import listCinemaReducer from '../container/AdminTemplate/QuanLyPhim/TaoLichChieu/modules/HeThongRap/reducer'
import listTheaterReducer from '../container/AdminTemplate/QuanLyPhim/TaoLichChieu/modules/CumRap/reducer'
import showTimeReducer from '../container/AdminTemplate/QuanLyPhim/TaoLichChieu/modules/LichChieu/reducer';
import filmShowTimerReducer from '../container/AdminTemplate/QuanLyPhim/TaoLichChieu/TableLichChieu/modules/reducer';
import addShowTimeDetailReducer from '../container/AdminTemplate/QuanLyPhim/TaoLichChieu/TableLichChieu/LichChieuTheoRap/LichChieuTheoCumRap/modules/reducer'
import getMovieDetailReducer from '../container/AdminTemplate/QuanLyPhim/modules/GetMovieDetail/reducer'
import getUserDetailReducer from '../container/AdminTemplate/QuanLyNguoiDung/modules/GetUserDetail/reducer'
const rootReducer = combineReducers({
    authReducer,
    listUserReducer,
    editUserReducer,
    deleteUserReducer,
    addUserReducer,
    listMovieReducer,
    addMovieReducer,
    editMovieReducer,
    deleteMovieReducer,
    listCinemaReducer,
    listTheaterReducer,
    showTimeReducer,
    filmShowTimerReducer,
    addShowTimeDetailReducer,
    getMovieDetailReducer,
    getUserDetailReducer
})
export default rootReducer;