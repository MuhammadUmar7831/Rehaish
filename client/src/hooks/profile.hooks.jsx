import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase/OAuthApi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { deleteUserApi, updateUserApi } from "../api/user.api";
import { setLoading } from "../redux/slices/loading.slice";
import { setUser } from "../redux/slices/user.slice";

export default function useProfile() {
  const { user } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [imageFile, setImageFile] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(user.avatar);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [error, setError] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (imageFile) {
      const isImage = imageFile.type.startsWith("image/");
      const imageUrl = isImage ? URL.createObjectURL(imageFile) : user.avatar;
      setImageUrl(imageUrl);
    }
  }, [imageFile]);

  const handleNameBlur = () => {
    if (newName.length < 3) {
      setNewName(user.name);
    }
    setEditingName(false);
  };

  const handleNameInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "avatar/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      await setImageUrl(downloadURL);
      setImageFile(null);
      setError(false);
      return downloadURL;
    } catch (error) {
      setError(error.message);
      setImageUrl(user.avatar);
      return false;
    }
  };

  const handleUpdate = async () => {
    dispatch(setLoading(true));
    var uploadRes = false;
    if (imageFile) {
      uploadRes = await handleFileUpload(imageFile);
    }
    const img = uploadRes === false ? user.avatar : uploadRes;
    const formData = {
      name: newName,
      avatar: img,
    };
    const res = await updateUserApi(formData);

    dispatch(setLoading(false));
    if (res.success === false) {
      setError(res.message);
      return;
    }
    dispatch(setUser(res.user));
  };

  const deleteUser = async ()=>{
    dispatch(setLoading(true));
    const res = await deleteUserApi();
    dispatch(setLoading(false));

    if (res.success === false){
      setError(res.message);
      return;
    }
    dispatch(setUser(null));

  }

  return {
    fileRef,
    imageFile,
    error,
    setError,
    setImageFile,
    imageUrl,
    setImageUrl,
    editingName,
    setEditingName,
    newName,
    setNewName,
    handleNameBlur,
    handleNameInputChange,
    handleFileUpload,
    handleUpdate,
    deleteModalOpen,
    setDeleteModalOpen,
    deleteUser
  };
}
