import styled from "styled-components";

import CloseIcon from "@mui/icons-material/Close";

import useManageEditor from "hooks/useManageEditor";

/**
 * @summary 에디터 위쪽에 나오면 탭바 아이템
 * @param id fileId
 * @param name fileName
 * @param width 가로 크기
 */

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.itemWidth};
  height: 100%;
  border: ${(props) => props.itmeBorder};
  background-color: #353535;
  color: white;
  cursor: pointer;
  &.active {
    background-color: #111111;
  }
`;

const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 100%;
  text-align: center;
`;
const CloseBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  text-align: center;
`;

function EditorMainUpperItem(props) {
  const {
    data: { showFile },
    handler: { setShowFile, closeFile },
  } = useManageEditor();

  const handleItemClick = () => {
    setShowFile(props.id);
  };
  const handleCloseBtnClick = () => {
    closeFile(props.id);
  };

  return (
    <Container
      itemWidth={props.itemWidth}
      className={showFile === props.id && "active"}
    >
      <Name onClick={() => handleItemClick()}>{props.name}</Name>
      <CloseBtn onClick={() => handleCloseBtnClick()}>
        <CloseIcon style={{ fontSize: 14 }} />
      </CloseBtn>
    </Container>
  );
}

export default EditorMainUpperItem;
