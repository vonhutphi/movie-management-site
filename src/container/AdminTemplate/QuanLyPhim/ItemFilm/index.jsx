import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actDeleteMovieApi } from "../modules/DeleteMovie/action";
import { actGetMovieDetailApi } from "../modules/GetMovieDetail/action";
import { setMovieEdit } from "../modules/ListMovie/action";
import "./ItemFilm.scss";
function ItemFilm(props) {
  const { item } = props;
  const showMoTa = () => {
    document.getElementById(`${item.biDanh}`).style.display = "block";
  };
  return (
    <div
      className="table-body-item row ml-0 mr-0"
      // data-toggle="collapse"
      // data-target={`#${item.biDanh}`}
      id="tableBodyFilm"
    >
      <div className="col-sm-1">
        <p>{item.maPhim}</p>
      </div>
      <div align="left" className="hinh-anh col-sm-1">
        <img src={item.hinhAnh} alt="" />
      </div>
      <div align="left" className="ten-phim col-sm-3">
        <p>{item.tenPhim}</p>
      </div>
      <div align="left" className="danh-gia col-sm-1">
        <p>{item.danhGia}</p>
      </div>
      <div align="left" className="ma-nhom col-sm-1">
        <p>{item.maNhom}</p>
      </div>
      <div align="left" className="col-sm-2">
        <p>{new Date(item.ngayKhoiChieu).toLocaleDateString()}</p>
      </div>
      <div className="col-sm-3 thaoTac row m-0 align-items-center justify-content-md-between">
        <div className="btnLichChieu">
          <Link to={`/quan-ly-phim/tao-lich-chieu/${item.maPhim}`}>
            <button className="btn">Tạo Lịch Chiếu</button>
          </Link>
        </div>
        <div className="btnSua">
          <Link to={`/quan-ly-phim/sua-phim/${item.maPhim}`}>
            <i
              class="fa fa-edit"
              onClick={() => {
                // props.setFilmEdit(item);
                // props.fetchFilmDetail(item.maPhim)
              }}
            ></i>
          </Link>
        </div>
        <div className="btnXoa">
          <i
            class="fa fa-trash"
            onClick={() => props.deleteFilm(item.maPhim)}
          ></i>
        </div>
      </div>
    
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilmEdit: (movie) => {
      dispatch(setMovieEdit(movie));
    },
    deleteFilm: (maPhim) => {
      dispatch(actDeleteMovieApi(maPhim));
    },
    fetchFilmDetail: maPhim =>{
      dispatch(actGetMovieDetailApi(maPhim))
    }
  };
};
export default connect(null, mapDispatchToProps)(ItemFilm);
