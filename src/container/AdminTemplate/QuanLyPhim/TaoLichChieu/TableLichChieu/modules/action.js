import Axios from 'axios';
import * as ActionType from './constant';

export const actdeleteShowTime = ()=>{
    return {
        type: ActionType.DELETE_SHOWTIME
    }
}
export const actFilmShowTimeApi = (maPhim)=>{
    return dispatch => {
        dispatch(actFilmShowTimeRequest());
        Axios({
            url:'https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim='+maPhim,
            method: 'GET'
        }).then(result=>{
            dispatch(actFilmShowTimeSuccess(result.data));
        }).catch(err=>{
            dispatch(actFilmShowTimeFailed(err));
        })
    }
}
const actFilmShowTimeRequest = () => {
    return {
        type: ActionType.FILM_SHOWTIME_REQUEST,
    }
}
const actFilmShowTimeSuccess = (data) => {
    return {
        type: ActionType.FILM_SHOWTIME_SUCCESS,
        payload: data
    }
}
const actFilmShowTimeFailed = (err) => {
    return {
        type: ActionType.FILM_SHOWTIME_FAILED,
        payload:err
    }
}