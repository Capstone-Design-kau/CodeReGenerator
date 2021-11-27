import StopIcon from "@mui/icons-material/Stop";

function ButtonStop(props) {
  return (
    <StopIcon
      style={{ color: "#ffb200c2", cursor: "pointer" }}
      onClick={() => props.handleBtnClick?.()}
    ></StopIcon>
  );
}

export default ButtonStop;
