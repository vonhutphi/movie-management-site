import React from "react";
import { connect } from "react-redux";
import { actListUserApi, actSetUserEdit } from "../modules/ListUser/action";
import { fetchDeleteUserApi } from "../modules/DeleteUser/action";
import "./UserItem.scss";
import { Link } from "react-router-dom";


function UserItem(props) {
  const { item, stt } = props;
  const handleDelete = () => {
    props.deleteUser(item.taiKhoan);
  };
  
  return (
    <>
      <div className="table-body-item row ml-0 mr-0" id="tableBodyUser">
        <div className="col-sm-1">
          <p>{stt}</p>
        </div>
        <div align="left" className="tai-khoan col-sm-2">
          <p>{item.taiKhoan}</p>
        </div>
        <div align="left" className="ho-ten col-sm-2">
          <p>{item.hoTen}</p>
        </div>
        <div align="left" className="email col-sm-3">
          <p>{item.email}</p>
        </div>
        <div align="left" className="so-dien-thoai col-sm-2">
          <p>{item.soDt}</p>
        </div>
        <div className=" thaoTac col-sm-2 thaoTac row m-0 align-items-center justify-content-sm-between">
          <div className="btnSua">
            <Link to={`quan-ly-nguoi-dung/sua/${item.taiKhoan}`}>
              <i
                className="fa fa-edit"
                onClick={() => {
                  // props.setUserEdit(item);
                }}
              ></i>
            </Link>
          </div>
          <div className="btnXoa">
            <i className="fa fa-trash" onClick={handleDelete}></i>
          </div>
          <div className="btnInfo">
            <i className="fa fa-info"></i>
          </div>
        </div>
      </div>
   
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    err: state.deleteUserReducer.err,
    data: state.deleteUserReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUserEdit: (user) => {
      dispatch(actSetUserEdit(user));
    },
    deleteUser: (taiKhoan) => {
      dispatch(fetchDeleteUserApi(taiKhoan));
    },
    fetchListUser: () => {
      dispatch(actListUserApi());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserItem);
