import styled from "styled-components";
import ButtonPlay from "components/common/ButtonPlay";
import ButtonReplay from "components/common/ButtonReplay";
import ButtonStop from "components/common/ButtonStop";
import useRecord from "hooks/useRecord";

const Container = styled.div`
  width: 100%;
  height: calc(100% - 1px);
  background-color: #111111;
  border-bottom: 1px solid white;
`;

function EditorNavbar() {
  const {
    data: { isRecording },
    handler,
  } = useRecord();

  const handlePlayClick = () => {
    const startTime = Date.now();
    handler.recordStart(startTime);
  };
  return (
    <Container>
      {!isRecording && <ButtonPlay handleBtnClick={handlePlayClick} />}
      {isRecording && <ButtonStop handleBtnClick={handler.recordStop} />}
      <ButtonReplay handleBtnClick={handler.recordReplay} />
    </Container>
  );
}
export default EditorNavbar;
