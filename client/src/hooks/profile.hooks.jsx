import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function useProfile() {
  const { user } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [imageFile, setImageFile] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(user.avatar); // Default to user avatar
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(user.name);

  useEffect(() => {
    console.log(imageFile);
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

  return {
    fileRef,
    imageFile,
    setImageFile,
    imageUrl,
    setImageUrl,
    editingName,
    setEditingName,
    newName,
    setNewName,
    handleNameBlur,
    handleNameInputChange,
  };
}
