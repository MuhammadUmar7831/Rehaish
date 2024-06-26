import { useRef, useState } from "react";
import { app } from "../firebase/OAuthApi";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { suffixFormater } from "../utils/myListing.utils";
import { editListingApi } from "../api/lisiting.api";
import { setLoading } from "../redux/slices/loading.slice";

export default function useEditListing() {
  const { selectedListing } = useSelector((state) => state.selectedListing);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [type, setType] = useState(selectedListing.type);
  const [offer, setOffer] = useState(selectedListing.offer);
  const [regularPrice, setRegularPrice] = useState(
    selectedListing.regularPrice
  );
  const [discountPrice, setDiscountPrice] = useState(
    selectedListing.discountPrice
  );
  const [furnished, setFurnished] = useState(selectedListing.furnished);
  const [parkingSpot, setParkingSpot] = useState(selectedListing.parkingSpot);
  const [beds, setBeds] = useState(selectedListing.beds);
  const [baths, setBaths] = useState(selectedListing.baths);
  const [size, setSize] = useState(
    parseInt(selectedListing.size.split(" ")[0])
  );
  const [sizeUnit, setSizeUnit] = useState(selectedListing.size.split(" ")[1]);
  const [name, setName] = useState(selectedListing.name);
  const [description, setDescription] = useState(selectedListing.description);
  const [address, setAddress] = useState(selectedListing.address);
  const [imageUrls, setImageUrls] = useState(selectedListing.imageUrls);
  const [createSuccess, setCreateSuccess] = useState(false);

  const [regularPriceWithSuffix, setRegularPriceWithSuffix] = useState(
    suffixFormater(regularPrice)
  );
  const [discountPriceWithSuffix, setDiscountPriceWithSuffix] = useState(
    suffixFormater(discountPrice)
  );

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

  const deleteImageFromFireBaseStorage = async (indexToDelete) => {
    try {
      dispatch(setLoading(true));

      const storage = getStorage(app);
      const storagePath = imageUrls[indexToDelete].replace(
        "gs://" + storage.bucket + "/",
        ""
      );
      const imageRef = ref(storage, storagePath);

      await deleteObject(imageRef);

      const updatedImageUrls = Array.from(imageUrls);
      updatedImageUrls.splice(indexToDelete, 1);
      setImageUrls(updatedImageUrls);

      setError(false);
    } catch (error) {
      setError(error.message);
    }
    dispatch(setLoading(false));
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
    if (
      selectedFiles.length > 0 &&
      selectedFiles.length <= 6 - imageUrls.length
    ) {
      setFiles(selectedFiles);
      setError(false);
    } else {
      if (selectedFiles.length === 0) {
        fileInputRef.current.value = "";
        setError("Please choose at least one file.");
      } else if (selectedFiles.length > 6 - imageUrls.length) {
        fileInputRef.current.value = "";
        setError(`Please choose ${6 - imageUrls.length} or fewer files.`);
      }
    }
  };

  const validateInputs = () => {
    if (imageUrls.length + files.length === 0) {
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
      const urls = [...imageUrls];
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

  const handleEdit = async (e) => {
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
          _id: selectedListing._id,
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
        const res = await editListingApi(formData);
        if (res.success) {
          setError(res.message);
        }
      }
    }
    dispatch(setLoading(false));
  };

  const handleRegularPriceChange = (e) => {
    const val = e.target.value;
    console.log("selected Listing", selectedListing);
    console.log("imageUrls", imageUrls);
    setRegularPrice(val);
    setRegularPriceWithSuffix(suffixFormater(val));
  };

  const handleDiscountPriceChange = (e) => {
    const val = e.target.value;
    setDiscountPrice(val);
    setDiscountPriceWithSuffix(suffixFormater(val));
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(imageUrls);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImageUrls(items);
  };

  return {
    name,
    description,
    address,
    size,
    sizeUnit,
    type,
    parkingSpot,
    furnished,
    offer,
    beds,
    baths,
    regularPrice,
    discountPrice,
    imageUrls,
    fileInputRef,
    error,
    createSuccess,
    handleEdit,
    setName,
    setDescription,
    setAddress,
    setSize,
    setSizeUnit,
    setType,
    setParkingSpot,
    setFurnished,
    setOffer,
    setBeds,
    setBaths,
    setRegularPrice,
    setDiscountPrice,
    setImageUrls,
    chooseFiles,
    files,
    handleRemoveFileButtonClick,
    handleRegularPriceChange,
    handleDiscountPriceChange,
    regularPriceWithSuffix,
    discountPriceWithSuffix,
    onDragEnd,
    deleteImageFromFireBaseStorage,
  };
}
