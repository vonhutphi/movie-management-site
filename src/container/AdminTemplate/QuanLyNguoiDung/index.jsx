import React, { useEffect, useMemo, useState } from "react";
import "./QuanLyNguoiDung.scss";
import { makeStyles } from "@material-ui/core/styles";
import { actListUserApi } from "./modules/ListUser/action";
import { connect } from "react-redux";
// import Loader from "./../../../components/Loader";
import Pagination from "@material-ui/lab/Pagination";
import UserItem from "./UserItem";
import { actSetUserEdit } from "./modules/ListUser/action";
import SearchAdmin from "../../../components/SearchAdmin";
import { Link, useRouteMatch } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import Loader from "../../../components/Loader";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function QuanLyNguoiDung(props) {
  let { url } = useRouteMatch();
  const propsAni = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });
  const ITEMS_PER_PAGE = 10;
  const classes = useStyles();
  const { userList, loading, deleteData } = props;
  // const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(1);
  // const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    props.fetchListUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteData]);
  // useEffect(() => {
  //   props.fetchListUser();
  //   // setData(userList);
  // }, [deleteData]);
  const commentData = useMemo(() => {
    //  setData(userList);
    if (userList) {
      let computedComments = userList;
      if (search) {
        computedComments = computedComments.filter(
          (user) =>
            user.taiKhoan.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            user.email.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
      }
      // setTotalItems(computedComments.length);
      return computedComments.slice(
        (current - 1) * ITEMS_PER_PAGE,
        (current - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }
  }, [current, userList, search]);
  const renderListUser = () => {
    return (
      commentData &&
      commentData.map((item, index) => {
        return <UserItem key={index} item={item} url={url} stt={index + 1} />;
      })
    );
  };
  const handleChange = (e, value) => {
    setCurrent(value);
    console.log(value);
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <animated.div style={propsAni}>
      <div className="quanLy" id="quanLyNguoiDung">
        <div className="mainContent">
          <div className="admin-header row m-0">
            <div className="addBtn col-sm-2 col-lg-3 p-0">
              {/* Button trigger modal */}
              <Link
                to="/quan-ly-nguoi-dung/them-nguoi-dung"
                type="button"
                className="add btn "
                onClick={() => {
                  props.setUserEdit({
                    taiKhoan: "",
                    matKhau: "",
                    hoTen: "",
                    email: "",
                    soDt: "",
                    maNhom: "",
                    maLoaiNguoiDung: "",
                  });
                }}
              >
                <i className="fa fa-plus"></i>
                <p className="d-none d-xl-inline-block">Th??m ng?????i d??ng</p>
              </Link>
            </div>
            <div className="col-sm-10 col-lg-9 p-0">
              <SearchAdmin
                onSearch={(value) => {
                  setSearch(value);
                  setCurrent(1);
                }}
                typeSearch={"T??m ki???m ng?????i d??ng..."}
              />
            </div>
          </div>
          <div className="data-table table-responsive userTable">
            <div className="mainTable">
              <div className="table-header row m-0">
                <div className="table-header-item col-sm-1">STT</div>
                <div className="table-header-item col-sm-2">T??i kho???n</div>
                <div className="table-header-item col-sm-2">H??? t??n</div>
                <div className="table-header-item col-sm-3">Email</div>
                <div className="table-header-item col-sm-2">S??? ??i???n tho???i</div>
                <div className="table-header-item col-sm-2">Thao t??c</div>
              </div>
              <div className="table-body">{renderListUser()}</div>
            </div>
          </div>
          <div className={`${classes.root} pagination`}>
            <Pagination
              count={userList && Math.ceil(userList.length / 10)}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </animated.div>
  );
}
const mapStateToProps = (state) => {
  return {
    userList: state.listUserReducer.userList,
    loading: state.listUserReducer.loading,
    deleteData: state.deleteUserReducer.data,
    addData: state.addUserReducer.data,
    editData: state.editUserReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchListUser: () => {
      dispatch(actListUserApi());
    },
    setUserEdit: (user) => {
      dispatch(actSetUserEdit(user));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QuanLyNguoiDung);
