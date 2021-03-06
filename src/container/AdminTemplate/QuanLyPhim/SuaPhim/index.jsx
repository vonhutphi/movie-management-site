import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "sweetalert2/src/sweetalert2.scss";
import Moment from "moment";
import "./SuaPhim.scss";
import { actEditMovieApi } from "../modules/EditMovie/action";

import { useSpring, animated } from "react-spring";
import { DatePicker } from "antd";
import {
  actDeleteMovieDetail,
  actGetMovieDetailApi,
} from "../modules/GetMovieDetail/action";
import Loader from "../../../../components/Loader";

function SuaPhim(props) {
  const propsAni = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const { filmDetail, loading } = props;
  const [img, setImg] = useState({
    file: "",
    imagePreviewUrl: "",
  });
  // const [date, setDate] = useState("");
  const [movie, setMovie] = useState({
    values: {
      maPhim: "",
      tenPhim: "",
      biDanh: "",
      trailer: "",
      ngayKhoiChieu: "",
      moTa: "",
      danhGia: "",
      maNhom: "",
      hinhAnh: "",
    },
    errors: {
      maPhim: "",
      tenPhim: "",
      biDanh: "",
      trailer: "",
      ngayKhoiChieu: "",
      moTa: "",
      danhGia: "",
      maNhom: "",
      hinhAnh: "",
    },
  });
  useEffect(() => {
    props.fetchFilmDetail(props.match.params.maPhim);

    return () => {
      props.deleteDetail();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (filmDetail) {
      setMovie({
        ...movie,
        values: {
          maPhim: filmDetail.maPhim,
          tenPhim: filmDetail.tenPhim,
          biDanh: filmDetail.biDanh,
          trailer: filmDetail.trailer,
          ngayKhoiChieu: filmDetail.ngayKhoiChieu,
          moTa: filmDetail.moTa,
          danhGia: filmDetail.danhGia,
          maNhom: filmDetail.maNhom,
          hinhAnh: filmDetail.hinhAnh,
        },
      });
      
      // console.log(new Date(filmDetail.ngayKhoiChieu).toLocaleDateString());
      // console.log(filmDetail.ngayKhoiChieu)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filmDetail]);

  const MA_NHOM = "GP03";
  const convertName = (name) => {
    switch (name) {
      case "maPhim":
        return "M?? phim";
      case "tenPhim":
        return "T??n phim";
      case "biDanh":
        return "B?? danh";
      case "trailer":
        return "Trailer";
      case "hinhAnh":
        return "H??nh ???nh";
      case "ngayKhoiChieu":
        return "Ng??y Kh???i Chi???u";
      case "moTa":
        return "M?? t???";
      default:
        return;
    }
  };
  const handleOnChange = (e) => {
    console.log(e);
    let { name, value } = e.target;
    // let newValue = { ...movie.values, [name]: value };
    let newErrors = { ...movie.errors };
    if (name === "hinhAnh") {
      setMovie({
        errors: newErrors,
        values: { ...movie.values, hinhAnh: e.target.files[0] },
      });
    } else if (name === "ngayKhoiChieu") {
      setMovie({
        errors: newErrors,
        values: {
          ...movie.values,
          ngayKhoiChieu: Moment(value).format("DD-MM-YYYY"),
        },
      });
    } else {
      setMovie({
        errors: newErrors,
        values: {
          ...movie.values,
          [name]: value,
          maNhom: MA_NHOM,
        },
      });
    }

    // if (name === "hinhAnh") {
    //  console.log(e.target.files[0])
    // }
    if (value.trim() === "") {
      newErrors[name] = convertName(name) + " kh??ng ???????c ????? tr???ng";
    } else {
      newErrors[name] = "";
    }
    if (name === "hinhAnh") {
      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        setImg({
          file: file,
          imagePreviewUrl: reader.result,
        });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };
  const renderPreview = () => {
    if (img.imagePreviewUrl) {
      return <img src={img.imagePreviewUrl} alt="" />;
    } else {
      return <img src={movie.values.hinhAnh} alt="" />;
    }
  };
  const editMovie = (e) => {
    e.preventDefault();

    let valid = true;
    const { values, errors } = movie;
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
      let form_data = new FormData();
      for (let key in movie.values) {
        form_data.append(key, movie.values[key]);
        console.log(form_data.get(key));
      }
      props.fetchEditMovie(form_data);
      console.log(" thanh cong");
    } else alert("k thanh cong");
  };
  const hiddenFileInput = useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  if (loading) return <Loader />;
  return (
    <animated.div style={propsAni} className="admin-content" id="editUser">
      <div className="editUserMain">
        <div className="mainForm movieControl editFilm">
          <div className="back-arrow">
            <Link to="/quan-ly-phim">
              <i className="fa fa-arrow-left"></i>
            </Link>
          </div>
          <h3>S???a phim</h3>
          <div className="row">
            <div className="movieImg col-sm-2">
              {renderPreview()}
              <button
                style={{ color: "white" }}
                className="btn btn-info mt-2"
                onClick={handleClick}
              >
                H??nh ???nh
              </button>
              <input
                ref={hiddenFileInput}
                style={{ display: "none" }}
                type="file"
                className="form-control"
                name="hinhAnh"
                onChange={handleOnChange}
              />
            </div>
            <form onSubmit={editMovie} className="col-sm-10">
              <div className="formRow row">
                <div className="form-group col-sm-6">
                  <label htmlFor="exampleInputEmail1">M?? phim</label>
                  <input
                    className="form-control"
                    name="maPhim"
                    onChange={handleOnChange}
                    value={movie.values.maPhim}
                  />
                  <span className="textError">{movie.errors.maPhim}</span>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="exampleInputEmail1">T??n phim</label>
                  <input
                    className="form-control"
                    name="tenPhim"
                    onChange={handleOnChange}
                    value={movie.values.tenPhim}
                  />
                  <span className="textError">{movie.errors.tenPhim}</span>
                </div>
              </div>
              <div className="formRow row">
                <div className="form-group col-sm-6">
                  <label htmlFor="exampleInputEmail1">B?? danh</label>
                  <input
                    className="form-control"
                    name="biDanh"
                    onChange={handleOnChange}
                    value={movie.values.biDanh}
                    disabled
                  />
                  <span className="textError">{movie.errors.biDanh}</span>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="exampleInputEmail1">Trailer</label>
                  <input
                    className="form-control"
                    name="trailer"
                    onChange={handleOnChange}
                    value={movie.values.trailer}
                  />
                  <span className="textError">{movie.errors.trailer}</span>
                </div>
              </div>
              <div className="formRow row">
                <div className="form-group col-sm-6">
                  <label htmlFor="exampleInputEmail1">Ng??y kh???i chi???u</label>
                  {/* <input
                    type="date"
                    className="form-control"
                    name="ngayKhoiChieu"
                    onChange={handleOnChange}
                    value={Moment(
                      new Date(movie.values.ngayKhoiChieu).toLocaleDateString()
                    ).format("YYYY-MM-DD")}
                  /> */}
                  <DatePicker
                    
      
                    onChange={(date, dateString) => {
                      setMovie({
                        ...movie,
                        values: {
                          ...movie.values,
                          ngayKhoiChieu: Moment(dateString).format(
                            "DD-MM-YYYY"
                          ),
                        },
                      });
                    }}
                  />
                  <span className="textError">
                    {movie.errors.ngayKhoiChieu}
                  </span>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="exampleInputEmail1">????nh gi??</label>
                  <input
                    className="form-control"
                    name="danhGia"
                    onChange={handleOnChange}
                    value={movie.values.danhGia}
                    disabled
                  />
                  <span className="textError">{movie.errors.trailer}</span>
                </div>
                {/* <div className="form-group col-sm-6">
                  <label htmlFor="exampleInputEmail1">H??nh ???nh</label>
                  <input
                    type="file"
                    className="form-control customFileInput"
                    name="hinhAnh"
                    onChange={handleOnChange}
                  />
                  <span className="textError">{movie.errors.hinhAnh}</span>
                </div> */}
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">M?? t???</label>
                <textarea
                  className="form-control"
                  rows="4"
                  // style={{ resize: "none" }}
                  name="moTa"
                  onChange={handleOnChange}
                  value={movie.values.moTa}
                />
                <span className="textError">{movie.errors.moTa}</span>
              </div>

              <div className="btnSubmit d-flex justify-content-sm-end">
                <button className="btn" type="submit">
                  L??u thay ?????i
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </animated.div>
  );
}
const mapStateToProps = (state) => {
  return {
    movieEdit: state.listMovieReducer.movieEdit,
    filmDetail: state.getMovieDetailReducer.data,
    loading: state.getMovieDetailReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchEditMovie: (movie) => {
      dispatch(actEditMovieApi(movie));
    },
    fetchFilmDetail: (maPhim) => {
      dispatch(actGetMovieDetailApi(maPhim));
    },
    deleteDetail: () => {
      dispatch(actDeleteMovieDetail());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SuaPhim);
