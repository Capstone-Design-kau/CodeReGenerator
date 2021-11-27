import { useState } from "react";

import styled from "styled-components";

// components
import EditorMainUpperItem from "./EditorMainUpperItem";
import EditorMainContents from "./EditorMainContents";

// hooks
import useManageEditor from "hooks/useManageEditor";
import { useEffect } from "react";

const Container = styled.div`
  width: 100%;
  height: calc(100% - 200px);
  background-color: #111111;
`;
const MainUpper = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  background-color: #353535;
  > * {
    flex-grow: 0;
    flex-shrink: 0;
  }
`;
const MainLower = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 30px);
  background-color: #353535;
`;

function EditorMain() {
  const {
    data: { openList },
  } = useManageEditor();

  const [upperContents, setUpperContents] = useState();
  const [lowerContents, setLowerContents] = useState();

  useEffect(() => {
    const items = openList.map((el) => (
      <EditorMainUpperItem
        key={"item-" + el.id}
        name={el.name}
        id={el.id}
        itemWidth={"100px"}
      />
    ));
    const contents = openList.map((el) => (
      <EditorMainContents
        key={"content-" + el.id}
        name={el.name}
        id={el.id}
        contents={el.contents}
      />
    ));
    setUpperContents(items);
    setLowerContents(contents);
  }, [openList]);

  return (
    <Container>
      <MainUpper>{upperContents}</MainUpper>
      <MainLower>{lowerContents}</MainLower>
    </Container>
  );
}
export default EditorMain;
