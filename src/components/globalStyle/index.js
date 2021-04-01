import { ThemeProvider, createGlobalStyle } from "styled-components";

// export const GlobalStyle = createGlobalStyle`
// @media screen and (max-width: 1236px) {
//   #sideBar{
//     transform: translateX(${(props) =>
//       props.theme.status === true ? "0" : "-100%"})
//   }
// }
// `;

export const GlobalStyle = createGlobalStyle`
#sideBar{
  transform: translateX(${(props) =>
    props.theme.status === true ? "0" : "-100%"})
} 
`;

// export const GlobalStyle = createGlobalStyle`
//   .quanLy,html{
//     background-color: ${(props) =>
//       props.theme.mode === "dark" ? "#18191A" : "#dbe8f171"}
//   }
//   #sideBar{
//     background-color: ${(props) =>
//       props.theme.mode === "dark" ? "#18191A" : "#fafafa"}
//   }

//   #sideBar .sideBarItem li a{
//     color: ${(props) => (props.theme.mode === "dark" ? "white" : "#3c4858")}
//   }
//   .table-body-item{
//       background-color: ${(props) =>
//         props.theme.mode === "dark" ? "#363738" : "white"};
//       color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
//   }
//   .table-body-item .thaoTac i{
//     color:${(props) =>
//       props.theme.mode === "dark" ? "grey" : "rgba(0, 0, 0, 0.5)"};
//   }
//   .quanLy .mainContent .data-table .table-header{
//     color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
//   }
//   .form-control{
//     background-color: ${(props) =>
//       props.theme.mode === "dark" ? "#363738" : "white"};
//     border-color: ${(props) =>
//       props.theme.mode === "dark" ? "#363738" : "#ced4da"};
//     &:focus{
//         background-color: ${(props) =>
//           props.theme.mode === "dark" ? "#363738" : "white"};
//         color: ${(props) =>
//           props.theme.mode === "dark" ? "white" : "#363738"};
//         border-color: ${(props) =>
//           props.theme.mode === "dark" ? "#363738" : "#ced4da"}!important;
//     }

//   }
//   #navBarAdmin{
//     background-color: ${(props) =>
//       props.theme.mode === "dark" ? "#242526" : "white"};
// }
// `;
