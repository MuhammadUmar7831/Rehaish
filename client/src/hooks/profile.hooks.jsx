import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase/OAuthApi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function useProfile() {
  const { user } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [imageFile, setImageFile] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(user.avatar);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [error, setError] = useState(false);

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

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "avatar/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        setError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setImageFile(null);
        });
      }
    );
  };

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
  };
}
