import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { actListTheaterApi } from "./modules/CumRap/action";
import { actListCinemaApi } from "./modules/HeThongRap/action";
import Moment from "moment";
import { actShowTimeApi } from "./modules/LichChieu/action";
import { DatePicker } from "antd";
import { TimePicker } from "antd";
import { Link } from "react-router-dom";
import "./TaoLichChieu.scss";
// import Loader from "../../../../components/Loader";
import TableLichChieu from "./TableLichChieu";
import Swal from "sweetalert2/dist/sweetalert2.js";
function TaoLichChieu(props) {
  // const { Option } = Select;

  const {
    heThongRap,
    cumRap,
    addShowTimeData,
    filmShowTime,
    // loadingShowTime,
  } = props;
  const [tenRap, setTenRap] = useState("Chọn hệ thống rạp");
  const [tenCumRap, setTenCumRap] = useState("Chọn cụm rạp");
  const [maRap, setMaRap] = useState("Chọn rạp");
  const [ngayChieuGioChieu, setNgayChieuGioChieu] = useState({
    values: { ngayChieu: "", gioChieu: "" },
    errors: { ngayChieu: "", gioChieu: "" },
  });
  const [thongTinLichChieu, setThongTinLichChieu] = useState({
    maPhim: props.match.params.maPhim,
    ngayChieuGioChieu: "",
    maRap: "",
    giaVe: "",
  });
  
  // const [error, setError] = useState("");
  useEffect(() => {
    props.fetchHeThongRap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (tenRap !== "Chọn hệ thống rạp") {
      props.fetchCumRap(tenRap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenRap]);
  const renderHeThongRap = useMemo(() => {
    return (
      heThongRap &&
      heThongRap.map((rap, index) => {
        return (
          <p
            key={index}
            className="dropdown-item"
            onClick={() => {
              setTenRap(rap.maHeThongRap);
              setMaRap("Chọn rạp");
              setTenCumRap("Chọn cụm rạp");
            }}
          >
            {rap.maHeThongRap}
          </p>
        );
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heThongRap]);

  const renderCumRap = useMemo(() => {
    if (tenRap === "Chọn hệ thống rạp") {
      return <p className="dropdown-item">Vui lòng chọn hệ thống rạp</p>;
    }
    return (
      cumRap &&
      cumRap.map((item, index) => {
        return (
          <p
            key={index}
            className="dropdown-item"
            onClick={() => {
              setTenCumRap(item.tenCumRap);
              setMaRap("Chọn rạp");
            }}
          >
            {item.tenCumRap}
          </p>
        );
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumRap]);

  const renderRap = useMemo(() => {
    if (tenRap === "Chọn hệ thống rạp" || tenCumRap === "Chọn cụm rạp") {
      return (
        <p className="dropdown-item">Vui lòng chọn hệ thống rạp và cụm rạp</p>
      );
    }
    for (let key in cumRap) {
      // console.log(cumRap[key]);
      if (cumRap[key].tenCumRap === tenCumRap) {
        return cumRap[key].danhSachRap.map((item, index) => {
          return (
            <p
              key={index}
              className="dropdown-item"
              onClick={() => {
                setMaRap(item.tenRap);
                setThongTinLichChieu({
                  ...thongTinLichChieu,
                  maRap: item.maRap,
                });
              }}
            >
              {item.tenRap} - Mã rạp: {item.maRap}
            </p>
          );
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenCumRap, cumRap, tenRap]);

  const renderTableLichChieu = useMemo(() => {
    return (
      <TableLichChieu
        maPhim={props.match.params.maPhim}
        addShowTimeData={addShowTimeData}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addShowTimeData]);

  const validation = () => {
    let valid = true;
    for (let key in ngayChieuGioChieu.values) {
      if (ngayChieuGioChieu.values[key] === "") {
        valid = false;
      }
    }
    if (tenRap === "Chọn hệ thống rạp") {
      valid = false;
    }
    if (tenCumRap === "Chọn cụm rạp") {
      valid = false;
    }
    if (maRap === "Chọn rạp") {
      valid = false;
    }
    if (thongTinLichChieu.giaVe === "") {
      valid = false;
    }
    // if (!valid) {
    //   setError("Vui lòng điền đầy đủ thông tin trước khi tạo lịch chiếu");
    // } else {
    //   setError("");
    // }

    return valid;
  };

  const addShowTime = () => {
    if (validation()) {
      props.fetchAddShowTime({
        ...thongTinLichChieu,
        ngayChieuGioChieu:
          ngayChieuGioChieu.values.ngayChieu +
          " " +
          ngayChieuGioChieu.values.gioChieu,
      });
    } else {
      Swal.fire({
        text: "Vui lòng điền đầy đủ thông tin trước khi tạo lịch chiếu",
      });
    }
  };
  // if(loadingShowTime) return <Loader/>
  return (
    <div className="admin-content ">
      <div id="taoLichChieu">
        <div className="back-arrow">
          <Link to="/quan-ly-phim">
            <i className="fa fa-arrow-left"></i>
          </Link>
        </div>
        <h3 className="titleLichChieu mb-4">
          Tạo lịch chiếu:{" "}
          <span style={{ fontWeight: "500", color: "#333" }}>
            {filmShowTime && filmShowTime.tenPhim}
            {/* {filmInfo && filmInfo.tenPhim} */}
          </span>
        </h3>
        <div className="thongTinShowTime row">
          <div className="hinhAnhPhim col-sm-2">
            <img
              src={filmShowTime && filmShowTime.hinhAnh}
              // src={filmInfo && filmInfo.hinhAnh}
              style={{ width: "85%", borderRadius: "10px" }}
              alt=""
            />
          </div>
          <div className="thongTinLichChieu col-sm-10">
            <p style={{ fontSize: "1rem" }}>
              Điền vào thông tin sau để tạo lịch chiếu:
            </p>
            <div className="thongTinRap row">
              <div className="dropdown col-sm-4">
                <button
                  className="btn btn-secondary"
                  type="button"
                  id="heThongRap"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {tenRap}
                  <i className="fa fa-angle-down"></i>
                </button>
                <div className="dropdown-menu" aria-labelledby="heThongRap">
                  {renderHeThongRap}
                </div>
              </div>
              <div className="dropdown col-sm-4">
                <button
                  className="btn btn-secondary"
                  type="button"
                  id="cumRap"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {tenCumRap}
                  <i className="fa fa-angle-down"></i>
                </button>
                <div className="dropdown-menu" aria-labelledby="cumRap">
                  {renderCumRap}
                </div>
              </div>
              <div className="dropdown col-sm-4">
                <button
                  className="btn btn-secondary"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {maRap}
                  <i className="fa fa-angle-down"></i>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  {renderRap}
                </div>
              </div>
            </div>
            <div className="thongTinNgayChieu row">
              <div className="chonNgay col-sm-4 ">
                <label htmlFor="" className="d-block">
                  Ngày chiếu
                </label>
                <DatePicker
                  placeholder="Chọn ngày chiếu"
                  onChange={(date, dateString) => {
                    setNgayChieuGioChieu({
                      ...ngayChieuGioChieu,
                      values: {
                        ...ngayChieuGioChieu.values,
                        ngayChieu: Moment(dateString).format("DD-MM-YYYY"),
                      },
                    });
                  }}
                />
                <span>{ngayChieuGioChieu.errors.ngayChieu}</span>
              </div>
              <div className="chonGio col-sm-4 ">
                <label htmlFor="" className="d-block">
                  Giờ chiếu
                </label>
                <TimePicker
                  placeholder="Chọn giờ chiếu"
                  // defaultValue={Moment("00:00:00", "HH:mm:ss")}
                  onChange={(time, timeString) => {
                    setNgayChieuGioChieu({
                      ...ngayChieuGioChieu,
                      values: {
                        ...ngayChieuGioChieu.values,
                        gioChieu: timeString,
                      },
                    });
                  }}
                />
                <span>{ngayChieuGioChieu.errors.gioChieu}</span>
              </div>
              <div className="chonGiaVe col-sm-4">
                <label htmlFor="">Giá vé</label>
                <input
                  className="form-control"
                  type="text"
                  name="giaVe"
                  onChange={(e) => {
                    setThongTinLichChieu({
                      ...thongTinLichChieu,
                      giaVe: e.target.value,
                    });
                  }}
                  value={thongTinLichChieu.giaVe}
                />
              </div>
            </div>
            {/* <div>{error}</div> */}
            <button
              className="btn btn-info btnTaoLichChieu col-sm-3"
              onClick={addShowTime}
            >
              Tạo lịch chiếu
            </button>
          </div>
        </div>
        <div className="bangLichChieu">{renderTableLichChieu}</div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    heThongRap: state.listCinemaReducer.data,
    cumRap: state.listTheaterReducer.dataCine,
    filmShowTime: state.filmShowTimerReducer.data,
    loadingShowTime: state.filmShowTimerReducer.loading,
    addShowTimeData: state.showTimeReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchHeThongRap: () => {
      dispatch(actListCinemaApi());
    },
    fetchCumRap: (maHTR) => {
      dispatch(actListTheaterApi(maHTR));
    },
    fetchAddShowTime: (showTime) => {
      dispatch(actShowTimeApi(showTime));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaoLichChieu);
