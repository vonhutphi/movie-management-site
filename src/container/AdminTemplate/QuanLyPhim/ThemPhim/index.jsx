import React, { useState, useRef, useCallback } from "react";
import "./ThemPhim.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actAddMovieApi } from "../modules/AddMovie/action";
import "sweetalert2/src/sweetalert2.scss";
import Moment from "moment";
import { useSpring, animated } from "react-spring";
import { DatePicker } from "antd";
import Swal from "sweetalert2/dist/sweetalert2.js";
function ThemPhim(props) {
  const { data } = props;
  const propsAni = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });
  const [img, setImg] = useState({
    file: "",
    imagePreviewUrl: "",
  });
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

  const MA_NHOM = "GP03";
  const convertName = (name) => {
    switch (name) {
      case "maPhim":
        return "Mã phim";
      case "tenPhim":
        return "Tên phim";
      case "biDanh":
        return "Bí danh";
      case "trailer":
        return "Trailer";
      case "hinhAnh":
        return "Hình ảnh";
      case "ngayKhoiChieu":
        return "Ngày Khởi Chiếu";
      case "moTa":
        return "Mô tả";
      case "danhGia":
        return "Đánh giá";
      default:
        return;
    }
  };
  const handleOnChange = (e) => {
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

    if (value.trim() === "") {
      newErrors[name] = convertName(name) + " không được để trống";
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
    }
  };
  const clearInput = useCallback(() => {
    if (data) {
      let newValue = { ...movie.values };
      for (let key in newValue) {
        newValue[key] = "";
      }
      setMovie({
        ...movie,
        values: newValue,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const addMovie = (e) => {
    // const { name, value } = e.target;
    e.preventDefault();
    // let newErr = { ...movie.errors };
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
      props.fetchAddMovie(form_data);
      clearInput();
    } else {
      Swal.fire({
        text: "Vui lòng điền đầy đủ thông tin trước khi thêm phim",
      });
    }
  };
  const hiddenFileInput = useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  return (
    <animated.div style={propsAni} className="admin-content" id="editUser">
      <div className="editUserMain">
        <div className="mainForm movieControl">
          <div className="back-arrow">
            <Link to="/quan-ly-phim">
              <i className="fa fa-arrow-left"></i>
            </Link>
          </div>
          <h3>Thêm phim</h3>
          <div className="row">
            <div className="movieImg col-sm-2">
              {renderPreview()}
              <button
                style={{ color: "white" }}
                className="btn mt-2"
                onClick={handleClick}
              >
                Hình ảnh
              </button>
              <input
                ref={hiddenFileInput}
                style={{ display: "none" }}
                type="file"
                className="form-control"
                name="hinhAnh"
                onChange={handleOnChange}
                // value={movie.values.hinhAnh}
              />
            </div>
            <form onSubmit={addMovie} className="col-sm-10">
              <div className="formRow row">
                <div className="form-group col-sm-6">
                  <label htmlFor="exampleInputEmail1">Mã phim</label>
                  <input
                    className="form-control"
                    name="maPhim"
                    onChange={handleOnChange}
                    value={movie.values.maPhim}
                  />
                  <span className="textError">{movie.errors.maPhim}</span>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="exampleInputEmail1">Tên phim</label>
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
                  <label htmlFor="exampleInputEmail1">Bí danh</label>
                  <input
                    className="form-control"
                    name="biDanh"
                    onChange={handleOnChange}
                    value={movie.values.biDanh}
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
                <div className=" col-sm-6">
                  <label htmlFor="exampleInputEmail1">Ngày khởi chiếu</label>
                  <DatePicker
                    placeholder="Chọn ngày khởi chiếu"
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
                  <label htmlFor="exampleInputEmail1">Đánh giá</label>
                  <input
                    className="form-control"
                    name="danhGia"
                    onChange={handleOnChange}
                    value={movie.values.danhGia}
                  />
                  <span className="textError">{movie.errors.danhGia}</span>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Mô tả</label>
                <textarea
                  className="form-control"
                  rows="4"
                  style={{ resize: "none" }}
                  name="moTa"
                  onChange={handleOnChange}
                  value={movie.values.moTa}
                />
                <span className="textError">{movie.errors.moTa}</span>
              </div>

              <div className="btnSubmit d-flex justify-content-sm-end">
                <button className="btn" type="submit">
                  Thêm
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
    data: state.addMovieReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAddMovie: (movie) => {
      dispatch(actAddMovieApi(movie));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ThemPhim);
