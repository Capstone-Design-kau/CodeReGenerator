import { useState, useEffect } from "react";
import styled from "styled-components";

import useManageEditor from "hooks/useManageEditor";

import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

/**
 * @summary 재귀적으로 아이템 생성
 * @param type 타입 명시 file or folder
 * @param parentId 부모 파일의 id
 * @param id 파일의 id
 * @param name 파일명
 * @param contents 내부 콘텐츠
 * @param children 자식 파일들
 * @param depth 파일 깊이
 */

const Container = styled.div`
  cursor: pointer;
`;

const Information = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - ${(props) => props.paddingLeft}px);
  height: 30px;
  padding-left: ${(props) => props.paddingLeft}px;
  background-color: ${(props) => props.active && "#7272726a"};
  font-size: 15px;

  &:hover {
    background-color: #7272726a;
  }
`;

const ChildrenWrapper = styled.div`
  width: 100%;
`;

function EditorFileTree(props) {
  const [childrenElements, setContents] = useState();
  const {
    data: { selectedId },
    handler: { setSelectedId, openFile, setShowFile },
  } = useManageEditor();

  useEffect(() => {
    if (props.type === "folder") {
      const items = props.children.map((el) => (
        <EditorFileTree
          key={"child-" + el.id}
          type={el.type}
          parentId={el.parentId}
          name={el.name}
          id={el.id}
          contents={el.contents}
          children={el.children}
          depth={props.depth + 1}
        />
      ));
      setContents(items);
    }
  }, [props]);

  const handleItemClick = () => {
    const folderId = props.type === "folder" ? props.id : props.parentId;
    setSelectedId(props.id, folderId);
  };

  const handleDoubleClick = () => {
    if (props.type === "file") {
      openFile(props.id, props.name, props.contents);
      setShowFile(props.id);
    } else {
      //TODO : 폴더 열리고 접히는 거 구현해야 함
    }
  };

  return (
    <Container>
      <Information
        active={props.id === selectedId}
        paddingLeft={props.depth * 10}
        onClick={() => handleItemClick()}
        onDoubleClick={() => handleDoubleClick()}
      >
        {props.type === "folder" && (
          <FolderIcon style={{ fontSize: 15, color: "skyblue" }} />
        )}
        {props.type === "file" && (
          <InsertDriveFileIcon style={{ fontSize: 15, color: "gray" }} />
        )}
        {props.name}
      </Information>
      <ChildrenWrapper>{childrenElements}</ChildrenWrapper>
    </Container>
  );
}

export default EditorFileTree;
