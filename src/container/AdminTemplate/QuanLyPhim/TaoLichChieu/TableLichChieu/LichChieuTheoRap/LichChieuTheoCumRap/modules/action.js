import * as ActionType from './constant'

export const actAddShowTimeDetail = (detail) => {
    return {
        type: ActionType.ADD_SHOWTIME_DETAIL,
        payload: detail,
    }
}
export const actDeleteShowTimeDetail = () =>{
    return {
        type: ActionType.DELETE_SHOWTIME_DETAIL,
    }
}