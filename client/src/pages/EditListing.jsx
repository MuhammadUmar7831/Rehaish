import { Image, Edit } from "react-feather";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingOverlay from "../interface/LoadingOverlay";
import useEditListing from "../hooks/editListing.hooks";
import ListingImagesList from "../components/ListingImagesList";

export default function EditListing() {
  const { loading } = useSelector((state) => state.loading);
  const {
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
  } = useEditListing();

  return (
    <>
      {loading && <LoadingOverlay />}
      <main className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl text-center mt-5 mb-10">Edit Listing</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {createSuccess && (
          <p className="text-green-500 text-center">
            <Link to={"/listing"} className="text-blue-500 hover:underline">
              listing
            </Link>{" "}
            edited successfully
          </p>
        )}
        <form onSubmit={handleEdit}>
          <div className="flex flex-col gap-6">
            <div className="">
              <div className="flex flex-col mt-2">
                <label htmlFor="name" className="text-xl">
                  Name
                </label>
                <input
                  className="bg-slate-100 border p-3 my-2 rounded-md focus:outline-none focus:bg-white focus:border-slate-300"
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  placeholder="name"
                  minLength={12}
                  maxLength={62}
                  required
                />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="description" className="text-xl">
                  Description
                </label>
                <textarea
                  className="bg-slate-100 border p-3 my-2 rounded-md focus:outline-none focus:bg-white focus:border-slate-300"
                  name="description"
                  id="description"
                  placeholder="200 charecters are allowed"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                  minLength={12}
                  maxLength={200}
                  required
                />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="address" className="text-xl">
                  Address
                </label>
                <input
                  className="bg-slate-100 border p-3 my-2 rounded-md focus:outline-none focus:bg-white focus:border-slate-300"
                  name="address"
                  type="text"
                  id="address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={address}
                  placeholder="address"
                  minLength={12}
                  maxLength={62}
                  required
                />
              </div>
              <label htmlFor="size" className="text-xl">
                Size
              </label>
              <div className="flex mt-2 gap-2">
                <input
                  type="number"
                  name="size"
                  id="size"
                  step="0.25"
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                  className="bg-slate-100 border p-3 my-2 rounded-md focus:outline-none focus:bg-white focus:border-slate-300"
                  min={1}
                  value={size}
                  required
                />
                <select
                  onChange={(e) => {
                    setSizeUnit(e.target.value);
                  }}
                  name="sizeUnit"
                  id="sizeUnit"
                  value={sizeUnit}
                >
                  <option value="marla">Marla</option>
                  <option value="kanal">Kanal</option>
                </select>
              </div>
              <div className="flex gap-6">
                <div className="flex gap-2 text-lg mt-5">
                  <input
                    type="radio"
                    name="type"
                    id="sell"
                    className="w-4"
                    checked={type === "sell"}
                    onChange={() => setType("sell")}
                  />
                  <label htmlFor="sell">Sell</label>
                </div>
                <div className="flex gap-2 text-lg mt-5">
                  <input
                    type="radio"
                    name="type"
                    id="rent"
                    className="w-4"
                    checked={type === "rent"}
                    onChange={() => setType("rent")}
                  />
                  <label htmlFor="rent">Rent</label>
                </div>
              </div>
              <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2 text-lg mt-5">
                  <input
                    type="checkbox"
                    name="parking_spot"
                    id="parking_spot"
                    className="w-4"
                    checked={parkingSpot}
                    onChange={(e) => {
                      setParkingSpot(!parkingSpot);
                    }}
                  />
                  <label htmlFor="parking_spot">Parking Spot</label>
                </div>
                <div className="flex gap-2 text-lg mt-5">
                  <input
                    type="checkbox"
                    name="furnished"
                    id="furnished"
                    className="w-4"
                    checked={furnished}
                    onChange={() => {
                      setFurnished(!furnished);
                    }}
                  />
                  <label htmlFor="furnished">Furnished</label>
                </div>
                <div className="flex gap-2 text-lg mt-5">
                  <input
                    type="checkbox"
                    name="offer"
                    id="offer"
                    className="w-4"
                    checked={offer}
                    onChange={() => {
                      setOffer(!offer);
                    }}
                  />
                  <label htmlFor="offer">Offer</label>
                </div>
              </div>
              <div className="flex flex-wrap gap-10 mt-8">
                <div>
                  <input
                    className="bg-slate-100 border p-3 my-2 mr-2 rounded-md focus:outline-none focus:bg-white focus:border-slate-300"
                    type="number"
                    name="beds"
                    id="beds"
                    value={beds}
                    min={1}
                    max={15}
                    onChange={(e) => {
                      setBeds(e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="beds" className="text-xl">
                    Beds
                  </label>
                </div>
                <div>
                  <input
                    className="bg-slate-100 border p-3 my-2 mr-2 rounded-md focus:outline-none focus:bg-white focus:border-slate-300"
                    type="number"
                    name="baths"
                    id="baths"
                    value={baths}
                    min={1}
                    max={15}
                    onChange={(e) => {
                      setBaths(e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="baths" className="text-xl">
                    Baths
                  </label>
                </div>
              </div>
              <div className="flex flex-col flex-wrap mt-8 gap-5">
                {regularPriceWithSuffix}
                <div>
                  <input
                    className="bg-slate-100 border p-3 my-2 mr-2 rounded-md focus:outline-none focus:bg-white focus:border-slate-300"
                    type="number"
                    name="regularPrice"
                    id="regularPrice"
                    defaultValue={regularPrice}
                    onChange={handleRegularPriceChange}
                    min={1}
                    required
                  />
                  <label htmlFor="beds">
                    Regular Price {type === "rent" && <span>Rs./month</span>}
                  </label>
                </div>
                {offer && (
                  <>
                    {" "}
                    {discountPriceWithSuffix}
                    <div>
                      <input
                        className="bg-slate-100 border p-3 my-2 mr-2 rounded-md focus:outline-none focus:bg-white focus:border-slate-300"
                        type="number"
                        name="discountPrice"
                        id="discountPrice"
                        defaultValue={discountPrice}
                        onChange={handleDiscountPriceChange}
                        min={1}
                        required
                      />
                      <label htmlFor="baths">
                        Discount Price{" "}
                        {type === "rent" && <span>Rs./month</span>}
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
            {imageUrls.length < 6 && (
              <div>
                <span className="font-semibold">Images:</span> upload images
                here {" "}
                <span className="text-blue-500">
                  (max {6 - imageUrls.length})
                </span>
                <input
                  type="file"
                  name="images"
                  id="images"
                  ref={fileInputRef}
                  onChange={chooseFiles}
                  accept="image/*"
                  hidden
                  multiple
                />
                <div
                  className="border w-full my-5 p-3 flex gap-2 cursor-pointer"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Image className="w-6 h-6" />
                  {files && files.length > 0 ? `${files.length} ` : `no `}file
                  chosen
                </div>
                <div className="flex flex-wrap">
                  {files && files.length > 0 && (
                    <>
                      <p>Preview</p>
                      <div className="flex flex-col w-full">
                        {files.map((file, index) => (
                          <div className="flex justify-between">
                            <img
                              key={index}
                              src={URL.createObjectURL(file)}
                              alt={`Image ${index}`}
                              className="my-2 w-32 h-32 object-cover"
                            />
                            <button
                              type="button"
                              className="text-red-500"
                              onClick={handleRemoveFileButtonClick}
                            >
                              remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold mt-5 text-lg">Uploaded Images</p>
            <span className="my-2">The first image will be the cover image. Drag the images to change the order</span>
            <ListingImagesList
              imageUrls={imageUrls}
              onDragEnd={onDragEnd}
              deleteImage={deleteImageFromFireBaseStorage}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-lg text-white px-5 py-2 my-2 rounded-md hover:bg-green-800 transition duration-200 focus:outline-none focus:ring focus:ring-green-400 flex items-center"
            >
              update
              <Edit color="white" size={20} className="mx-2"/>
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
