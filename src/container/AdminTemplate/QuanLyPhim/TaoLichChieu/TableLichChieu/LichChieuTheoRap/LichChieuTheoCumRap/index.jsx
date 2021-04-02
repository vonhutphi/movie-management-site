// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { actAddShowTimeDetail } from "./modules/action";

// function LichChieuTheoCumRap({
//   cumRapDetail,
//   maHeThongRap,
//   detailShowTimeList,
//   ...props
// }) {
//   const { tenCumRap } = cumRapDetail;
//   const [listThongTinLichChieu, setListThongTinLichChieu] = useState();
//   const renderLichChieuChiTiet = () => {
//     return cumRapDetail.lichChieuPhim.map((item, index) => {
//       return (
//         <>
//           <div className="lichChieuItem row ml-0 mr-0">
//             <div className="col-sm-1">{maHeThongRap}</div>
//             <div className="col-sm-3">{tenCumRap}</div>
//             <div className="col-sm-2">{item.maLichChieu}</div>
//             <div className="col-sm-2">{`${new Date(
//               item.ngayChieuGioChieu
//             ).toLocaleDateString()} ${new Date(
//               item.ngayChieuGioChieu
//             ).toLocaleTimeString()}`}</div>
//             <div className="col-sm-2">{item.giaVe}</div>
//             <div className="col-sm-2">{item.thoiLuong} phút</div>
//           </div>
//         </>
//       );
//     });
//   };


//   return (
//     <>
//       <div className="bangLichChieuChiTiet">{renderLichChieuChiTiet()}</div>
//     </>
//   );
// }
// const mapStateToProps = (state) => {
//   return {
//     detailShowTimeList: state.addShowTimeDetailReducer.data,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addDetail: (detail) => {
//       dispatch(actAddShowTimeDetail(detail));
//     },
//   };
// };
// export default connect(null, mapDispatchToProps)(LichChieuTheoCumRap);
