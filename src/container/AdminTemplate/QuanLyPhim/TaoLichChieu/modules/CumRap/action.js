import Axios from 'axios';
import * as ActionType from './constant';

export const actListTheaterApi = (maHeThongRap)=>{
    return dispatch => {
        dispatch(actListTheaterRequest());
        Axios({
            url:'https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap='+maHeThongRap,
            method: 'GET'
        }).then(result=>{
            dispatch(actListTheaterSuccess(result.data));
        }).catch(err=>{
            dispatch(actListTheaterFailed(err));
        })
    }
}
const actListTheaterRequest = () => {
    return {
        type: ActionType.LIST_CINE_REQUEST,
    }
}
const actListTheaterSuccess = (data) => {
    return {
        type: ActionType.LIST_CINE_SUCCESS,
        payload: data
    }
}
const actListTheaterFailed = (err) => {
    return {
        type: ActionType.LIST_CINE_FAILED,
        payload:err
    }
}