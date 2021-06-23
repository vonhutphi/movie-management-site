import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { actLoginApi } from "./modules/action";
import { connect } from "react-redux";
import Validation from "./Validation";
import "./AuthPage.scss";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "30px 0 0 0",
      width: "100%",
    },
  },
}));
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiInputBase-input": {
      color: "black",
    },
    "& .MuiInputBase-root": {
      width: "100%",
    },
  },
})(TextField);

const handleValidation = () => {
  let validation = new Validation();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let isValid = true;
  isValid &= validation.kiemTraRong(
    username,
    "validateUserName",
    "tên tài khoản"
  );
  isValid &= validation.kiemTraRong(password, "validatePassWord", "mật khẩu");
  return isValid;
};

function AuthPage(props) {
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const classes = useStyles();
  const { err } = props;
  const handleLogin = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      props.fetchLogin(user, props.history);
    }
  };
  const handleOnChange = (e) => {
    //   console.log(e)
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const renderNoti = () => {
    if (err) {
      document.getElementById("validatePassWord").style.opacity = "1";
      return <>{err.response.data}</>;
    }
  };
  return (
    <div id="logIn">
      <div className="logInMain row">
        <div className="logInLeft col-xs-12 col-sm-12 col-lg-6">
          {/* <img
            src={require("./../../../assets/images/web-logo.png").default}
            alt=""
          /> */}
          <h3>Đăng Nhập</h3>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleLogin}
          >
            <CssTextField
              id="username"
              label="Tài khoản"
              className="d-block m-t-5"
              onChange={handleOnChange}
              name="taiKhoan"
              value={user.taiKhoan}
            />
            <p id="validateUserName"></p>
            <CssTextField
              id="password"
              label="Mật khẩu"
              type="password"
              className="d-block m-t-5"
              onChange={handleOnChange}
              name="matKhau"
              value={user.matKhau}
            />
            <p id="validatePassWord">{renderNoti()}</p>

            <button type="submit">Đăng nhập</button>
          </form>
        </div> 
        <div className="logInRight 	d-none d-sm-flex col-sm-12 col-lg-6">
          <div className="logInInfo ">
            <h4 className='text-white'>You can log in by using the following account: </h4>
            <p>Username: anhhung321</p>
            <p>Password: 321321</p>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    data: state.authReducer.data,
    err: state.authReducer.err,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchLogin: (data, history) => {
      dispatch(actLoginApi(data, history));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
