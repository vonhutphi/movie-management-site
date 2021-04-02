
import QuanLyNguoiDung from '../container/AdminTemplate/QuanLyNguoiDung'
import QuanLyPhim from '../container/AdminTemplate/QuanLyPhim'
import SuaNguoiDung from '../container/AdminTemplate/QuanLyNguoiDung/SuaNguoiDung'
import ThemNguoiDung from '../container/AdminTemplate/QuanLyNguoiDung/ThemNguoiDung'
import ThemPhim from '../container/AdminTemplate/QuanLyPhim/ThemPhim'
import SuaPhim from '../container/AdminTemplate/QuanLyPhim/SuaPhim'
import TaoLichChieu from '../container/AdminTemplate/QuanLyPhim/TaoLichChieu'
const routeAdmin = [
    {
        path: '/quan-ly-phim',
        component: QuanLyPhim,
        exact: true
    },
    {
        path: '/quan-ly-phim/them-phim',
        component: ThemPhim,
        exact: false
    },
    {
        path: '/quan-ly-phim/sua-phim/:maPhim',
        component: SuaPhim,
        exact: false
    },
    {
        path: '/quan-ly-phim/tao-lich-chieu/:maPhim',
        component: TaoLichChieu,
        exact: false
    },
    {
        path: '/quan-ly-nguoi-dung',
        component: QuanLyNguoiDung,
        exact:true
    },
    {
        path:'/quan-ly-nguoi-dung/sua/:taiKhoan',
        component: SuaNguoiDung,
        exact:false
    },
    {
        path: '/quan-ly-nguoi-dung/them-nguoi-dung',
        component: ThemNguoiDung,
        exact:false
    }
]
export {routeAdmin};