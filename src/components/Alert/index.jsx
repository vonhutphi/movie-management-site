
import styled from "styled-components";

export const AlertMes = styled.div`
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 9;
  border-radius: 10px;
  padding: 10px 20px;
  display: ${(props) => (props.deleteStatus ? "block" : "none")};
  background-color: #00b894;
  color: white;
`;


