/**
 * @summary Editor Page
 */

import styled from "styled-components";

import EditorConsole from "components/editor/EditorConsole";
import EditorFileManager from "components/editor/EditorFileManager";
import EditorMain from "components/editor/EditorMain";
import EditorNavbar from "components/editor/EditorNavbar";
import EditorQna from "components/editor/EditorQna";
import EditorSearch from "components/editor/EditorSearch";
import { useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  > header {
    height: 30px;
    background-color: red;
  }

  > main {
    display: flex;
    width: 100%;
    height: calc(100% - 30px);
  }
`;

const MainLeft = styled.div`
  width: ${(props) => props.width};
  height: 100%;
`;
const MainCenter = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  background-color: #1f1f1f;
`;
const MainRight = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  background-color: white;
`;

function Editor(props) {
  const [leftWidth, setLeftWidth] = useState(200);
  const [rightWidth, setRightWidth] = useState(200);
  return (
    <Container>
      <header>
        <EditorNavbar />
      </header>
      <main>
        <MainLeft width={leftWidth + "px"}>
          <EditorFileManager />
        </MainLeft>

        <MainCenter width={`calc(100% - ${leftWidth + rightWidth}px)`}>
          <EditorMain />
          <EditorConsole />
        </MainCenter>

        <MainRight width={rightWidth + "px"}>
          <EditorQna />
          <EditorSearch />
        </MainRight>
      </main>
    </Container>
  );
}
export default Editor;
