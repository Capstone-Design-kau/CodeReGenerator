import ReplayIcon from "@mui/icons-material/Replay";

function ButtonReplay(props) {
  return (
    <ReplayIcon
      style={{ color: "#a6e22e", cursor: "pointer" }}
      onClick={() => props.handleBtnClick?.()}
    />
  );
}

export default ButtonReplay;
