import { useRef, useState } from "react";
import { app } from "../firebase/OAuthApi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slices/loading.slice";
import { createListingApi } from "../api/createListing.api";

export default function useCreateListing() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [type, setType] = useState("rent");
  const [offer, setOffer] = useState(false);
  const [regularPrice, setRegularPrice] = useState(1);
  const [discountPrice, setDiscountPrice] = useState(1);
  const [furnished, setFurnished] = useState(false);
  const [parkingSpot, setParkingSpot] = useState(false);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [size, setSize] = useState(1);
  const [sizeUnit, setSizeUnit] = useState("marla");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [createSuccess, setCreateSuccess] = useState(false);

  const fileInputRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const checkFilesType = (files) => {
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        return false;
      }
    }
    return true;
  };

  const removeFile = (index, files) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    return updatedFiles;
  };

  const handleRemoveFileButtonClick = async (index) => {
    const updatedFiles = removeFile(index, files);
    await setFiles(updatedFiles);
  };

  const chooseFiles = async (e) => {
    const temp = e.target.files;
    if (!temp) return;

    const isImages = await checkFilesType(Array.from(temp));
    if (!isImages) {
      fileInputRef.current.value = "";
      setError("Please choose image files.");
      return;
    }

    const selectedFiles = [...files, ...Array.from(temp)];
    if (selectedFiles.length > 0 && selectedFiles.length < 7) {
      setFiles(selectedFiles);
      setError(false);
    } else {
      if (selectedFiles.length === 0) {
        fileInputRef.current.value = "";
        setError("Please choose at least one file.");
      } else if (selectedFiles.length > 6) {
        fileInputRef.current.value = "";
        setError("Please choose six or fewer files.");
      }
    }
  };

  const validateInputs = () => {
    if (files.length === 0) {
      setError("please choose at least one files");
      return false;
    }

    if (offer && parseInt(regularPrice) <= parseInt(discountPrice)) {
      setError("discount price must be less than regular price");
      return false;
    }
    return true;
  };

  const handleSingleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `${user.email}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      return downloadURL;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  const handleFileUpload = async () => {
    try {
      const urls = [];
      for (let i = 0; i < files.length; i++) {
        const url = await handleSingleFileUpload(files[i]);
        urls.push(url);
      }

      if (urls.some((url) => url === null)) {
        return null;
      }

      return urls;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const isValidInputs = validateInputs();
    dispatch(setLoading(true));
    if (isValidInputs) {
      setError(false);
      const urls = await handleFileUpload();
      if (!urls) {
        console.log(!urls);
      } else {
        setCreateSuccess(true);
        const formData = {
          name: name,
          description: description,
          address: address,
          regularPrice: regularPrice,
          discountPrice: discountPrice,
          baths: baths,
          beds: beds,
          furnished: furnished,
          parkingSpot: parkingSpot,
          type: type,
          size: size + " " + sizeUnit,
          offer: offer,
          imageUrls: urls,
          userRef: user._id,
        };
        const res = await createListingApi(formData);
        if (res.success) {
          setError(res.message);
        }
      }
    }
    dispatch(setLoading(false));
  };

  return {
    fileInputRef,
    error,
    createSuccess,
    handleCreate,
    setName,
    setDescription,
    setAddress,
    setSize,
    setSizeUnit,
    type,
    setType,
    parkingSpot,
    setParkingSpot,
    setFurnished,
    offer,
    setOffer,
    setBeds,
    setBaths,
    setRegularPrice,
    setDiscountPrice,
    chooseFiles,
    files,
    handleRemoveFileButtonClick,
  };
}
