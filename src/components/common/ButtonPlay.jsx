import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function ButtonPlay(props) {
  return (
    <PlayArrowIcon
      style={{ color: "#ff4444", cursor: "pointer" }}
      onClick={props.handleBtnClick}
    />
  );
}

export default ButtonPlay;
