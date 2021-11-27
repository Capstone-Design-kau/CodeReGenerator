import { useDispatch, useSelector } from "react-redux";
import editorSlice from "store/reducers/editorSlice";

const useManageEditor = () => {
  const dispatch = useDispatch();
  const filesAndFolders = useSelector((state) => state.editorReducer.root);
  const selectedId = useSelector((state) => state.editorReducer.selectedId);
  const folderId = useSelector((state) => state.editorReducer.folderId);
  const openList = useSelector((state) => state.editorReducer.openList);
  const showFile = useSelector((state) => state.editorReducer.showFile);
  const idCount = useSelector((state) => state.editorReducer.idCount);

  const { actions } = editorSlice;

  const addFile = (filename) => {
    const id = idCount;
    const parentId = folderId;
    dispatch(actions.addFile({ name: filename }));
    return { id, parentId };
  };
  const addFolder = (folderName) => {
    const id = idCount;
    const parentId = folderId;
    dispatch(actions.addFolder({ name: folderName }));
    return { id, parentId };
  };
  const removeFileAndFolder = () => {
    const id = selectedId;
    dispatch(actions.removeFileAndFolder());
    return { id };
  };

  const setSelectedId = (selectedId, folderId) => {
    dispatch(actions.setSelectedId({ selectedId, folderId }));
  };
  const openFile = (fileId, name, contents) => {
    const isOpen = openList.filter((el) => el.id === fileId);
    if (isOpen.length === 0) {
      dispatch(actions.openFile({ id: fileId, name, contents }));
    }
  };
  const closeFile = (fileId) => {
    dispatch(actions.closeFile({ id: fileId }));
  };
  const setShowFile = (id) => {
    dispatch(actions.setShowFile({ id }));
  };

  return {
    data: {
      filesAndFolders,
      selectedId,
      openList,
      showFile,
    },
    handler: {
      addFile,
      addFolder,
      setSelectedId,
      openFile,
      closeFile,
      setShowFile,
      removeFileAndFolder,
    },
  };
};

export default useManageEditor;
