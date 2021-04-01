import React, { useMemo, useEffect, useState } from "react";
import "./QuanLyPhim.scss";
import Pagination from "@material-ui/lab/Pagination";
import SearchAdmin from "../../../components/SearchAdmin";
import { Link } from "react-router-dom";
import { actListMovieApi } from "./modules/ListMovie/action";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ItemFilm from "./ItemFilm";
import Loader from "../../../components/Loader";
import { useSpring, animated } from "react-spring";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  table: {
    minWidth: 650,
    borderRadius: "6px",
    boxShadow: "0 1px 4px 0 rgba(0,0,0,0.14)",
  },
}));
function QuanLyPhim(props) {
  const propsAni = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000},
  });
  const classes = useStyles();
  const ITEMS_PER_PAGE = 10;
  const { data, loading } = props;
  const [dataFilm, setDataFilm] = useState([]);
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const headers = [
    {
      name: "Mã phim",
    },
    {
      name: "Tên phim",
    },
    {
      name: "Hình ảnh",
    },
    {
      name: "Mô tả",
    },
    {
      name: "Mã nhóm ",
    },
    {
      name: "Ngày khởi chiếu",
    },
    {
      name: "Thao tác",
    },
  ];
  useEffect(() => {
    props.fetchListMovie();
  }, [props.dataDelete]);
  const dataRender = useMemo(() => {
    setDataFilm(data);
    if (data) {
      let computedData = data;
      if (search) {
        computedData = computedData.filter(
          (movie) =>
            movie.tenPhim.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
      }
      setTotalItems(computedData.length);
      return computedData.slice(
        (current - 1) * ITEMS_PER_PAGE,
        (current - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }
  }, [data, current, search]);

  const handleChange = (e, value) => {
    setCurrent(value);
    console.log(value);
  };
  const renderListMovie = () => {
    // if (loading) return <Loader />;
    return (
      dataRender &&
      dataRender.map((item, index) => {
        return <ItemFilm key={index} item={item} />;
      })
    );
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <animated.div style={propsAni}>
        <div className="quanLy" id="quanLyPhim">
          <div className="mainContent">
            <div className="admin-header row m-0">
              <div className="addBtn col-sm-2 col-lg-3 p-0">
                {/* Button trigger modal */}
                <Link
                  to="/quan-ly-phim/them-phim"
                  type="button"
                  className="add btn "
                >
                  <i class="fa fa-plus"></i>
                  <p className="d-none d-xl-inline-block">Thêm phim</p>
                </Link>
                {/* Modal */}
                {/* <ModalUser /> */}
              </div>
              <div className="col-sm-10 col-lg-9 p-0">
                <SearchAdmin
                  onSearch={(value) => {
                    setSearch(value);
                    setCurrent(1);
                  }}
                  typeSearch={"Tìm kiếm phim..."}
                />
              </div>
            </div>
            <div className="data-table table-responsive filmTable">
              <div className="mainTable">
                <div className="table-header row m-0">
                  <div className="table-header-item col-sm-1">Mã phim</div>
                  <div className="table-header-item col-sm-1">Hình ảnh</div>
                  <div className="table-header-item col-sm-3">Tên phim</div>
                  <div className="table-header-item col-sm-1">Đánh giá</div>
                  <div className="table-header-item col-sm-1">Mã nhóm</div>
                  <div className="table-header-item col-sm-2">
                    Ngày khởi chiếu
                  </div>
                  <div className="table-header-item col-sm-3">Thao tác</div>
                </div>
                <div className="table-body">{renderListMovie()}</div>
              </div>
            </div>
            <div className={classes.root} className="pagination">
              <Pagination
                count={data && Math.ceil(data.length / 10)}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </animated.div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.listMovieReducer.loading,
    data: state.listMovieReducer.data,
    dataDelete: state.deleteMovieReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchListMovie: () => {
      dispatch(actListMovieApi());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QuanLyPhim);
