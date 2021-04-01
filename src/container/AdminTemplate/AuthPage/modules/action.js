import * as ActionType from './constant';
import Axios from 'axios';

export const actLoginApi = (user,history)=>{
    return dispatch=>{
        dispatch(actLoginRequest());
        Axios({
            url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap',
            method: 'POST',
            data: user,
        }).then((result)=>{
            if(result.data.maLoaiNguoiDung==='QuanTri'){
                dispatch(actLoginSuccess(result.data));
                localStorage.setItem('UserAdmin',JSON.stringify(result.data));
                history.push("/quan-ly-phim");
            } else {
                return Promise.reject({
                    response: {data: 'Không có quyền truy cập'}
                })
            }
        }).catch((err)=>{
            dispatch(actLoginFailed(err));
        })
    }
}
const actLoginRequest = ()=>{
    return {
        type: ActionType.AUTH_PAGE_REQUEST,
    }
}
const actLoginSuccess = (data) => {
    return {
        type: ActionType.AUTH_PAGE_SUCCESS,
        payload: data,
    }
}
const actLoginFailed = (err)=>{
    return{
        type: ActionType.AUTH_PAGE_FAILED,
        payload: err,
    }
}