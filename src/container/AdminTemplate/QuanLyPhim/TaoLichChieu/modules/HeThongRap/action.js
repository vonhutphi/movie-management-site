import * as ActionType from './constant';
import Axios from 'axios';


export const actListCinemaApi = () => {
    return dispatch => {
        dispatch(actListCinemaRequest());
        Axios({
            url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap',
            method: 'GET',
        }).then((result)=>{
            dispatch(actListCinemaSuccess(result.data));
        }).catch((err)=>{
            dispatch(actListCinemaFailed(err));
        })
    }
}
const actListCinemaRequest = () => {
    return {
        type: ActionType.LIST_CINEMA_REQUEST
    }
}
const actListCinemaSuccess = (data) => {
    return {
        type: ActionType.LIST_CINEMA_SUCCESS,
        payload: data
    }
}
const actListCinemaFailed = (err) => {
    return {
        type: ActionType.LIST_CINEMA_FAILED,
        payload: err
    }
}