import { useState, useEffect } from "react";

import styled from "styled-components";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-okaidia.css";

// hooks
import useManageEditor from "hooks/useManageEditor";
import useRecord from "hooks/useRecord";
import { useRef } from "react";

/**
 * @summary 본격적으로 코딩을 작성하는 부분
 * @param id fileId
 * @param contents 맨처음에 콘텐츠에 들어갈 내용
 */

const Container = styled.div`
  overflow: auto;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #111111;
  cursor: text;
  z-index: ${(props) => props.z ?? 0};

  textarea {
    outline: 0;
  }
`;

function EditorMainContents(props) {
  const [code, setCode] = useState("");
  const [extend, setExtend] = useState("js");
  const {
    data: { showFile },
  } = useManageEditor();
  const {
    handler: { recordTextInput },
  } = useRecord();

  const targetContainer = useRef();

  useEffect(() => {
    setCode(props.contents);
  }, [props.contents]);

  useEffect(() => {
    recordTextInput(showFile, code);
  }, [code]);

  useEffect(() => {
    const extend = props.name.split(".")[1];
    console.log(extend);
  }, [props.name]);

  const handleContainerClick = (e) => {
    if (e.target === targetContainer.current) {
      const editor = targetContainer.current.children[0].children[0];
      editor.focus();
    }
  };

  return (
    <Container
      ref={targetContainer}
      z={props.id === showFile ? 1 : 0}
      onClick={(e) => handleContainerClick(e)}
    >
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages[extend])}
        padding={20}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 15,
          color: "#e2e2e2",
        }}
      />
    </Container>
  );
}
export default EditorMainContents;
