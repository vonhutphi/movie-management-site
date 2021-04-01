import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import LichChieuTheoRap from "./LichChieuTheoRap";
import { actdeleteShowTime, actFilmShowTimeApi } from "./modules/action";
import "./TableLichChieu.scss";
import { useSpring, animated } from "react-spring";
import {
  actAddShowTimeDetail,
  actDeleteShowTimeDetail,
} from "./LichChieuTheoRap/LichChieuTheoCumRap/modules/action";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import SearchAdmin from "../../../../../components/SearchAdmin";

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
}));
function TableLichChieu(props) {
  const ITEMS_PER_PAGE = 20;
  const classes = useStyles();
  const propsAni = useSpring({
    opacity: 1,
    from: {
      opacity: 0,
    },
    config: {
      duration: 1000,
    },
  });
  const [thongTinLichChieu, setThongTinLichChieu] = useState();
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const { filmShowTime, maPhim, addShowTimeData, detailShowTimeList } = props;

  useEffect(() => {
    props.fetchFilmShowTime(maPhim);
  }, [addShowTimeData]);
  useEffect(() => {
    return (
      filmShowTime &&
      filmShowTime.heThongRapChieu.map((CineSystem) => {
        const maHeThongRap = CineSystem.maHeThongRap;
        return CineSystem.cumRapChieu.map((cumRapDetail) => {
          const tenCumRap = cumRapDetail.tenCumRap;
          return cumRapDetail.lichChieuPhim.map((item) => {
            props.addDetail({
              maHeThongRap,
              tenCumRap,
              maLichChieu: item.maLichChieu,
              ngayChieuGioChieu: `${new Date(
                item.ngayChieuGioChieu
              ).toLocaleDateString()} ${new Date(
                item.ngayChieuGioChieu
              ).toLocaleTimeString()}`,
              giaVe: item.giaVe,
              thoiLuong: item.thoiLuong,
            });
          });
        });
      })
    );
  }, [filmShowTime]);
  //unmount => clear state.data tren reducer
  useEffect(() => {
    return () => {
      props.deleteDetail();
      props.deleteShowTime();
    };
  }, []);

  const dataLichChieu = useMemo(() => {
    setThongTinLichChieu(detailShowTimeList);
    if (detailShowTimeList) {
      let computedData = detailShowTimeList;
      if (search) {
        computedData = computedData.filter(
          (showTime) =>
            showTime.maLichChieu.toLowerCase().indexOf(search.toLowerCase()) !==
              -1 ||
            showTime.maHeThongRap
              .toLowerCase()
              .indexOf(search.toLowerCase()) !== -1 ||
            showTime.tenCumRap.toLowerCase().indexOf(search.toLowerCase()) !==
              -1
        );
      }
      setTotalItems(computedData.length);
      return computedData.slice(
        (current - 1) * ITEMS_PER_PAGE,
        (current - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }
  }, [current, search, detailShowTimeList]);
  const renderListChieu = () => {
    return (
      dataLichChieu &&
      dataLichChieu.map((item, index) => {
        return (
          <div key={index} className="lichChieuItem row ml-0 mr-0">
            <div className="col-sm-1">{item.maHeThongRap}</div>
            <div className="col-sm-3">{item.tenCumRap}</div>
            <div className="col-sm-2">{item.maLichChieu}</div>
            <div className="col-sm-2">{item.ngayChieuGioChieu}</div>
            <div className="col-sm-2">{item.giaVe}</div>
            <div className="col-sm-2">{item.thoiLuong} phút</div>
          </div>
        );
      })
    );
  };
  const handleChange = (e, value) => {
    setCurrent(value);
  };

  return (
    <animated.div
      style={propsAni}
      className="data-table table-responsive showTimeTable"
    >
      <div className="row m-0 mb-2 mt-4 align-items-center">
        <div className="col-sm-5 p-0">
          <h4>Thông tin lịch chiếu</h4>
        </div>
        <div className="col-sm-7 p-0">
          <SearchAdmin
            onSearch={(value) => {
              setSearch(value);
              setCurrent(1);
            }}
            typeSearch={"Tìm kiếm theo mã lịch chiếu, cụm rạp, hệ thống rạp..."}
          />
        </div>
      </div>
      <div className="mainTable">
        <div className="bangLichChieuChiTiet_header row m-0">
          <div className="table-header-item col-sm-1">Hệ thống rạp</div>
          <div className="table-header-item col-sm-3">Cụm rạp</div>
          <div className="table-header-item col-sm-2">Mã lịch chiếu</div>
          <div className="table-header-item col-sm-2">Ngày giờ chiếu</div>
          <div className="table-header-item col-sm-2">Giá vé</div>
          <div className="table-header-item col-sm-2">Thời lượng phim</div>
        </div>
        <div className="">{renderListChieu()}</div>
        <div className={classes.root} className="pagination">
          <Pagination
            count={
              thongTinLichChieu && Math.ceil(thongTinLichChieu.length / 20)
            }
            onChange={handleChange}
          />
        </div>
      </div>
    </animated.div>
  );
}
const mapStateToProps = (state) => {
  return {
    filmShowTime: state.filmShowTimerReducer.data,
    detailShowTimeList: state.addShowTimeDetailReducer.data,
    loading: state.filmShowTimerReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchFilmShowTime: (maPhim) => {
      dispatch(actFilmShowTimeApi(maPhim));
    },
    addDetail: (detail) => {
      dispatch(actAddShowTimeDetail(detail));
    },
    deleteDetail: () => {
      dispatch(actDeleteShowTimeDetail());
    },
    deleteShowTime: () => {
      dispatch(actdeleteShowTime());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableLichChieu);
