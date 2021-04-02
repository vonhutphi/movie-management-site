import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "./SuaNguoiDung.scss";
import { connect } from "react-redux";
import { actSetUserEdit } from "../modules/ListUser/action";
import { fetchEditUserApi } from "../modules/EditUser/action";
import { Link } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { useSpring, animated } from "react-spring";
import {
  actDeleteUserDetail,
  actGetUserDetailApi,
} from "../modules/GetUserDetail/action";
import Loader from '../../../../components/Loader'
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
function SuaNguoiDung(props) {
  const { loading,userDetail } = props;
  const classes = useStyles();
  const propsAni = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });
  const [user, setUser] = useState({
    values: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: "",

      // taiKhoan: userDetail && userDetail.taiKhoan,
      // matKhau: userDetail && userDetail.matKhau,
      // hoTen: userDetail && userDetail.hoTen,
      // email: userDetail && userDetail.email,
      // soDt: userDetail && userDetail.soDT,
      // maNhom: userDetail && userDetail.maNhom,
      // maLoaiNguoiDung: userDetail && userDetail.loaiNguoiDung,
    },
    errors: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: "",
    },
    isInvalid: {
      taiKhoan: false,
      matKhau: false,
      hoTen: false,
      email: false,
      soDt: false,
      maNhom: false,
      maLoaiNguoiDung: false,
    },
  });
  useEffect(() => {
    props.getDetailUser(props.match.params.taiKhoan);
    return () => {
      props.deleteDetailUser();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (userDetail) {
      setUser({
        ...user,
        values: {
          taiKhoan: userDetail.taiKhoan,
          matKhau: userDetail.matKhau,
          hoTen: userDetail.hoTen,
          email: userDetail.email,
          soDt: userDetail.soDT,
          maNhom: userDetail.maNhom,
          maLoaiNguoiDung: userDetail.loaiNguoiDung,
        },
      });
    }
    
    // setUser({ ...user, values: userEdit });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetail]);
  const convertName = (name) => {
    switch (name) {
      case "taiKhoan":
        return "Tài khoản";
      case "matKhau":
        return "Mật khẩu";
      case "hoTen":
        return "Họ và tên";
      case "email":
        return "Email";
      case "soDt":
        return "Số điện thoại";
      case "maLoaiNguoiDung":
        return "Mã loại người dùng";
      default:
        return;
    }
  };
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValues = { ...user.values, [name]: value, maNhom: "GP03" };
    let newErrors = { ...user.errors };
    let newInvalid = { ...user.isInvalid };
    setUser({
      values: newValues,
      errors: newErrors,
      isInvalid: newInvalid,
    });
    if (value.trim() === "") {
      newErrors[name] = convertName(name) + " không được để trống";
      newInvalid[name] = true;
    } else {
      newErrors[name] = "";
      newInvalid[name] = false;
    }
    if (type === "email") {
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;// eslint-disable-line
      if (!re.test(value)) {
        newErrors[name] = convertName(name) + " không đúng định dạng";
        newInvalid[name] = true;
      } else {
        newErrors[name] = "";
        newInvalid[name] = false;
      }
    }
  };
  const handleEditUser = (e) => {
    e.preventDefault();
    props.fetchEditUser(user.values);
  };
  if(loading) return <Loader/>
  return (
    <animated.div style={propsAni} className="admin-content" id="editUser">
      <div className="editUserMain row">
        <div className="mainForm col-lg-6">
          <div className="back-arrow">
            <Link to="/quan-ly-nguoi-dung">
              <i className="fa fa-arrow-left"></i>
            </Link>
          </div>
          <h3>Sửa thông tin người dùng</h3>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleEditUser}
          >
            <TextField
              id="standard-required"
              label="Tài khoản"
              variant="outlined"
              onChange={handleChange}
              name="taiKhoan"
              value={user.values.taiKhoan}
              disabled
            />
            <TextField
              id="standard-required"
              label="Mật khẩu"
              variant="outlined"
              name="matKhau"
              onChange={handleChange}
              value={user.values.matKhau}
              helperText={user.errors.matKhau}
              error={user.isInvalid.matKhau}
            />
            <TextField
              id="standard-required"
              label="Họ tên"
              variant="outlined"
              name="hoTen"
              onChange={handleChange}
              value={user.values.hoTen}
              helperText={user.errors.hoTen}
              error={user.isInvalid.hoTen}
            />
            <TextField
              id="standard-required"
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              onChange={handleChange}
              value={user.values.email}
              helperText={user.errors.email}
              error={user.isInvalid.email}
            />
            <TextField
              id="standard-required"
              label="Số điện thoại"
              name="soDt"
              variant="outlined"
              onChange={handleChange}
              value={user.values.soDt}
              helperText={user.errors.soDt}
              error={user.isInvalid.soDt}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Loại người dùng
              </InputLabel>
              <Select
                error={user.isInvalid.maLoaiNguoiDung}
                variant="outlined"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={user.values.maLoaiNguoiDung}
                onChange={handleChange}
                helperText={user.errors.maLoaiNguoiDung}
                label="Loại người dùng"
                name="maLoaiNguoiDung"
              >
                <MenuItem value="QuanTri">Quản Trị</MenuItem>
                <MenuItem value="KhachHang">Khách Hàng</MenuItem>
              </Select>
            </FormControl>
            <div className="btnSubmit d-flex justify-content-sm-end">
              <button className="btn" type="submit">
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </animated.div>
  );
}
const mapStateToProps = (state) => {
  return {
    userEdit: state.listUserReducer.userEdit,
    userDetail: state.getUserDetailReducer.data,
    loading: state.getUserDetailReducer.loading
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUserEdit: (user) => {
      dispatch(actSetUserEdit(user));
    },
    fetchEditUser: (user) => {
      dispatch(fetchEditUserApi(user));
    },
    getDetailUser: (taiKhoan) => {
      dispatch(actGetUserDetailApi(taiKhoan));
    },
    deleteDetailUser: () => {
      dispatch(actDeleteUserDetail());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SuaNguoiDung);
