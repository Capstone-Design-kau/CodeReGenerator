import { createSlice } from "@reduxjs/toolkit";
import stack from "data-structure/stack";

//parentId, id
const insertData = (state, name, type, parentId, id) => {
  const newData = {
    type: type,
    parentId: parentId,
    id: id,
    name: name,
    contents: "",
    children: [],
  };

  const st = new stack();
  st.push(state.root);
  while (!st.empty()) {
    const new_st = st.pop();
    if (new_st.id === parentId) {
      new_st.children.push(newData);
      break;
    }
    new_st.children.forEach((el) => {
      st.push(el);
    });
  }
  while (!st.empty()) st.pop();
};

const slice = createSlice({
  name: "editor",
  initialState: {
    root: {
      type: "folder",
      parentId: -1,
      id: 0,
      name: "test_root",
      contents: "",
      children: [],
    },
    record: {
      /**
       * @summary record되는 데이터
       * @param isRecording 기록 중인지 체크
       * @param startTime 시작시간
       * @param flow 입력되는 정보
       */
      //startTime,
      //flow : [{time, type, option}]
      isRecording: false,
      startTime: 0,
      flow: [],
    },
    idCount: 100,
    selectedId: 0,
    folderId: 0,
    openList: [],
    showFile: -1,
  },
  reducers: {
    /**
     * @summary 초기화
     */
    init: (state) => {
      state = {
        root: {
          type: "folder",
          parentId: -1,
          id: 0,
          name: "test_root",
          contents: "",
          children: [],
        },
        record: {
          isRecording: false,
          startTime: 0,
          flow: [],
        },
        idCount: 100,
        selectedId: 0,
        folderId: 0,
        openList: [],
        showFile: -1,
      };
    },
    initRoot: (state) => {
      state.root = {
        type: "folder",
        parentId: -1,
        id: 0,
        name: "test_root",
        contents: "",
        children: [],
      };
    },

    /**
     * @summary 파일 및 폴더를 추가하는 리듀서, 아이디 값 자동 생성
     * @param payload.name 이름
     * @param payload.folderId 파일이 포함된 폴더 아이디
     * @param payload.id 파일 아이디
     */
    addFile: (state, action) => {
      const name = action.payload.name;
      const folderId = action.payload.folderId ?? state.folderId;
      const id = action.payload.id ?? state.idCount++;
      insertData(state, name, "file", folderId, id);
    },
    addFolder: (state, action) => {
      const name = action.payload.name;
      const folderId = action.payload.folderId ?? state.folderId;
      const id = action.payload.id ?? state.idCount++;
      insertData(state, name, "folder", folderId, id);
    },

    /**
     * @summary 파일 및 폴더를 삭제하는 리듀서
     * @param payload.id 파일 및 폴더를 삭제할 폴더의 id
     */
    removeFileAndFolder: (state, action) => {
      const deleteId = action.payload?.deleteId ?? state.selectedId;

      console.log(action, deleteId);
      const st = new stack();
      st.push(state.root);
      while (!st.empty()) {
        const file = st.pop();

        let targetIndex = undefined;
        file.children.forEach((el, index) => {
          if (el.id === deleteId) {
            targetIndex = index;

            // close the open tabs
            // delete list
            // Expect O(nlogn)
            const deleteList = new Set();
            const dst = new stack();
            dst.push(el);
            while (!dst.empty()) {
              const deleteFile = dst.pop();
              deleteList.add(deleteFile.id);
              deleteFile.children.forEach((del) => {
                dst.push(del);
              });
            }
            while (!dst.empty()) dst.pop();

            // flag for new show body
            let flag = false;
            state.openList = state.openList.filter((el) => {
              if (deleteList.has(el.id)) {
                if (el.id === state.showFile) flag = true;
                return false;
              } else {
                return true;
              }
            });
            if (flag) {
              state.showFile = state.openList[0]?.id;
            }
          }
        });

        if (targetIndex !== undefined) {
          console.log(file.children[targetIndex].name);
          file.children = file.children.filter(
            (el, index) => index !== targetIndex
          );
        }

        file.children.forEach((el) => {
          st.push(el);
        });
      }
      while (!st.empty()) st.pop();
    },

    /**
     * @summary selectedId 설정하기
     * @param payload.selectedId 선택된 파일의 아이디
     * @param payload.folderId 선택된 파일이 속하는 폴더, 폴더는 자기 자신
     */
    setSelectedId: (state, action) => {
      state.selectedId = action.payload.selectedId;
      state.folderId = action.payload.folderId;
    },

    /**
     * @summary openList 설정, 열려있는 파일 목록 갱신
     * @param payload.id 새로 갱신하는 파일의 id
     * @param payload.name 파일 이름
     * @param payload.contents 새로 갱신하는 파일의 id
     */
    openFile: (state, action) => {
      const { id, name, contents } = action.payload;
      state.openList.push({ id, name, contents });
    },

    /**
     * @summary closeTab, 현재 보고있는 파일 닫기
     * @id FileId
     */
    closeFile: (state, action) => {
      state.openList = state.openList.filter((el, index) => {
        if (el.id === action.payload.id) {
          state.showFile =
            state.openList[index - 1]?.id ??
            state.openList[index + 1]?.id ??
            -1;
        }
        return el.id !== action.payload.id;
      });
    },

    /**
     * @summary updateOpenFile, 열려있는 오픈탭에 들어가는 내용 수정
     * @id FileId
     */
    updateOpenFile: (state, action) => {
      const file = state.openList.filter((el) => el.id === action.payload.id);
      if (file.length !== 0) {
        file[0].contents = action.payload.code;
      }
    },

    /**
     * @summary showFile설정, 보고있는 파일의 아이디 값
     * @id FileId
     */
    setShowFile: (state, action) => {
      state.showFile = action.payload.id;
    },

    /**
     * @summary record되는 데이터
     * @param startTime 시작시간
     * @param flow 입력되는 정보
     */
    startRecord: (state, action) => {
      state.record.isRecording = true;
      state.record.startTime = action.payload.startTime;
    },
    endRecord: (state) => {
      state.record.isRecording = false;
    },
    textInputRecord: (state, action) => {
      const fileId = action.payload.fileId;
      const code = action.payload.code;
      const timeStamp = action.payload.timeStamp;

      state.record.flow.push({
        time: timeStamp,
        type: "TextInput",
        option: {
          fileId,
          code,
        },
      });
    },
    fileMakeRecord: (state, action) => {
      const fileId = action.payload.fileId;
      const parentId = action.payload.parentId;
      const fileName = action.payload.fileName;
      const timeStamp = action.payload.timeStamp;

      state.record.flow.push({
        time: timeStamp,
        type: "FileMake",
        option: {
          fileId,
          parentId,
          fileName,
        },
      });
    },
    folderMakeRecord: (state, action) => {
      const folderId = action.payload.folderId;
      const parentId = action.payload.parentId;
      const folderName = action.payload.folderName;
      const timeStamp = action.payload.timeStamp;

      state.record.flow.push({
        time: timeStamp,
        type: "FolderMake",
        option: {
          folderId,
          parentId,
          folderName,
        },
      });
    },
    fileAndFolderDeleteRecord: (state, action) => {
      const id = action.payload.id;
      const timeStamp = action.payload.timeStamp;

      state.record.flow.push({
        time: timeStamp,
        type: "FileAndFolderDelete",
        option: {
          id,
        },
      });
    },
  },
});

export default slice;
