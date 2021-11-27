import { useState } from "react";

import styled from "styled-components";

// material ui
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

// components
import EditorFileTree from "./EditorFileTree";

// hooks
import useManageEditor from "hooks/useManageEditor";
import useRecord from "hooks/useRecord";

const Container = styled.div`
  width: calc(100% - 1px);
  height: 100%;
  border-right: 1px solid lightgray;
  background-color: #111111;
`;

const UpperIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 30px;
  border-bottom: 1px solid lightgray;
  color: white;

  > * {
    margin-right: 8px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const ProjectName = styled.div`
  width: calc(100% - 30px);
  padding: 5px 15px;
  border-bottom: 1px solid grey;
  color: white;
`;

const FilesAndFolders = styled.div`
  width: calc(100% - 30px);
  padding: 10px 15px;
  color: white;
`;

function EditorFileManager() {
  const { data, handler: manageHandler } = useManageEditor();
  const { handler: recordHandler } = useRecord();
  const { filesAndFolders: rootFile } = data;

  const handleDeleteClick = () => {
    if (window.confirm("선택한 파일을 정말로 삭제하시겠습니까?")) {
      const { id } = manageHandler.removeFileAndFolder();
      console.log("id : ", id);
      recordHandler.recordFileAndFolderDelete(id);
    }
  };

  const handleFileAddClick = () => {
    const name = prompt("File Name");
    if (name) {
      const { id, parentId } = manageHandler.addFile(name);
      recordHandler.recordFileMake(id, parentId, name);
    }
  };

  const handleFolderAddClick = () => {
    const name = prompt("Folder Name");
    if (name) {
      const { id, parentId } = manageHandler.addFolder(name);
      recordHandler.recordFolderMake(id, parentId, name);
    }
  };

  return (
    <Container>
      <UpperIcons>
        <span onClick={() => handleFileAddClick()}>
          <InsertDriveFileIcon style={{ fontSize: 20 }} />
        </span>
        <span onClick={() => handleFolderAddClick()}>
          <CreateNewFolderIcon style={{ fontSize: 20 }} />
        </span>
        <span onClick={() => handleDeleteClick()}>
          <DeleteIcon style={{ fontSize: 20 }} />
        </span>
      </UpperIcons>
      <ProjectName>New Project</ProjectName>
      <FilesAndFolders>
        <EditorFileTree
          type={rootFile.type}
          parentId={rootFile.parentId}
          name={rootFile.name}
          id={rootFile.id}
          contents={rootFile.contents}
          children={rootFile.children}
          depth={0}
        />
      </FilesAndFolders>
    </Container>
  );
}
export default EditorFileManager;
