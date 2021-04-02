import React, { useState, useCallback } from "react";
import "./ThemNguoiDung.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { fetchAddUserApi } from "../modules/AddUser/action";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useSpring, animated } from "react-spring";
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
function ThemNguoiDung(props) {
  const {  data } = props;
  const classes = useStyles();
  const MA_NHOM = "GP03";
  const propsAni = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });
  let [user, setUser] = useState({
    values: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: "",
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
  const clearInput = useCallback(() => {
    if (data) {
      let newValue = { ...user.values };
      for (let key in newValue) {
        newValue[key] = "";
      }
      setUser({
        ...user,
        values: newValue,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const addUser = (e) => {
    e.preventDefault();
    let valid = true;
    let { values, errors } = user;
    for (let key in values) {
      if (values[key] === "") {
        valid = false;
      }
    }
    for (let key in errors) {
      if (errors[key] !== "") {
        valid = false;
      }
    }
    if (valid) {
      props.fetchAddUser(user.values);
      clearInput();
    } else {
      Swal.fire({
        text: "Vui lòng điền đầy đủ thông tin trước khi thêm người dùng",
      });
    }
  };

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

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    let newValues = { ...user.values, [name]: value, maNhom: MA_NHOM };
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
    if (name === "soDt") {
      const re = /^[0-9]*$/;
      if (!re.test(value)) {
        newErrors[name] = "Vui lòng nhập đúng định dạng số điện thoại";
      } else {
        newErrors[name] = "";
      }
    }
  };
  return (
    <animated.div style={propsAni} className="admin-content" id="editUser">
      <div className="editUserMain row">
        <div className="mainForm  col-lg-6">
          <div className="back-arrow">
            <Link to="/quan-ly-nguoi-dung">
              <i className="fa fa-arrow-left"></i>
            </Link>
          </div>
          <h3>Thêm người dùng</h3>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={addUser}
          >
            <TextField
              error={user.isInvalid.taiKhoan}
              id="outlined-error-helper-text"
              label="Tài khoản"
              variant="outlined"
              name="taiKhoan"
              onChange={handleOnChange}
              value={user.values.taiKhoan}
              helperText={user.errors.taiKhoan}
            />
            <TextField
              error={user.isInvalid.matKhau}
              label="Mật khẩu"
              variant="outlined"
              name="matKhau"
              onChange={handleOnChange}
              value={user.values.matKhau}
              helperText={user.errors.matKhau}
            />
            <TextField
              error={user.isInvalid.hoTen}
              label="Họ tên"
              variant="outlined"
              name="hoTen"
              onChange={handleOnChange}
              value={user.values.hoTen}
              helperText={user.errors.hoTen}
            />
            <TextField
              error={user.isInvalid.email}
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              onChange={handleOnChange}
              value={user.values.email}
              helperText={user.errors.email}
            />
            <TextField
              error={user.isInvalid.soDt}
              label="Số điện thoại"
              variant="outlined"
              name="soDt"
              onChange={handleOnChange}
              value={user.values.soDt}
              helperText={user.errors.soDt}
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
                onChange={handleOnChange}
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
                Thêm
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
    err: state.addUserReducer.err,
    data: state.addUserReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAddUser: (user) => {
      dispatch(fetchAddUserApi(user));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ThemNguoiDung);
