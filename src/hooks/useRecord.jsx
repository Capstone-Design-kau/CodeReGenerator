import stack from "data-structure/stack";
import { useDispatch, useSelector } from "react-redux";
import editorSlice from "store/reducers/editorSlice";

const useRecord = () => {
  const dispatch = useDispatch();
  const actions = editorSlice.actions;
  const state = useSelector((state) => state.editorReducer);
  const isRecording = useSelector(
    (state) => state.editorReducer.record.isRecording
  );

  const recordStart = (startTime = Date.now()) => {
    dispatch(actions.startRecord({ startTime }));
  };
  const recordStop = () => {
    dispatch(actions.endRecord());
    console.log("stop");
  };
  const recordReplay = () => {
    console.log("replay");
    const backup = { ...state.openList };

    const startTime = state.record.startTime;
    const flow = state.record.flow;

    // code tree clear
    dispatch(actions.initRoot());

    // code tabs clear
    flow.forEach((el) => {
      const time = el.time - startTime;
      if (time < 0) return;
      const code = "waiting being typed....";
      const id = el.option.fileId;
      dispatch(actions.updateOpenFile({ id, code }));
    });

    // code replay
    flow.forEach((el) => {
      const time = el.time - startTime;
      if (time < 0) return;
      else {
        const type = el.type;

        switch (type) {
          case "TextInput": {
            const data = {
              code: el.option.code,
              id: el.option.fileId,
            };

            setTimeout(() => {
              dispatch(actions.updateOpenFile(data));
            }, time);
            break;
          }

          case "FileMake": {
            const data = {
              id: el.option.fileId,
              name: el.option.fileName,
              folderId: el.option.parentId,
            };

            setTimeout(() => {
              dispatch(actions.addFile(data));
            }, time);
            break;
          }

          case "FolderMake": {
            const data = {
              id: el.option.folderId,
              name: el.option.folderName,
              folderId: el.option.parentId,
            };

            setTimeout(() => {
              dispatch(actions.addFolder(data));
            }, time);

            break;
          }

          case "FileAndFolderDelete": {
            const data = {
              deleteId: el.option.id,
            };
            setTimeout(() => {
              dispatch(actions.removeFileAndFolder(data));
            }, time);
            break;
          }
          default:
        }
      }
    });
  };
  const recordTextInput = (fileId, code, timeStamp = Date.now()) => {
    if (isRecording) {
      dispatch(actions.textInputRecord({ fileId, code, timeStamp }));
    }
  };
  const recordFileMake = (
    fileId,
    parentId,
    fileName,
    timeStamp = Date.now()
  ) => {
    if (isRecording) {
      dispatch(
        actions.fileMakeRecord({ fileId, parentId, fileName, timeStamp })
      );
    }
  };
  const recordFolderMake = (
    folderId,
    parentId,
    folderName,
    timeStamp = Date.now()
  ) => {
    if (isRecording) {
      dispatch(
        actions.folderMakeRecord({ folderId, parentId, folderName, timeStamp })
      );
    }
  };
  const recordFileAndFolderDelete = (id, timeStamp = Date.now()) => {
    if (isRecording) {
      dispatch(actions.fileAndFolderDeleteRecord({ id, timeStamp }));
    }
  };

  return {
    data: {
      isRecording,
    },
    handler: {
      recordStart,
      recordStop,
      recordReplay,
      recordTextInput,
      recordFileMake,
      recordFolderMake,
      recordFileAndFolderDelete,
    },
  };
};

export default useRecord;
