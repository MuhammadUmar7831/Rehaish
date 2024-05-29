import { MdEdit } from "react-icons/md";
import { RefreshCcw, Trash2, LogOut, Plus, List } from "react-feather";
import { useSelector } from "react-redux";
import useProfile from "../hooks/profile.hooks";
import LoadingOverlay from "../interface/LoadingOverlay";
import PopupModal from "../interface/PopupModal";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loading);

  const {
    fileRef,
    setImageFile,
    imageUrl,
    editingName,
    setEditingName,
    newName,
    error,
    handleNameBlur,
    handleNameInputChange,
    handleUpdate,
    deleteModalOpen,
    setDeleteModalOpen,
    deleteUser,
    signoutModalOpen,
    setSignoutModalOpen,
    signout,
  } = useProfile();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      {/* modal for delete */}
      <PopupModal
        isOpen={deleteModalOpen}
        onConfirm={deleteUser}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        onCancel={() => {
          setDeleteModalOpen(false);
        }}
        message={"Are you sure you want to delete your account?"}
      />
      {/* modal for signout */}
      <PopupModal
        isOpen={signoutModalOpen}
        onConfirm={signout}
        onClose={() => {
          setSignoutModalOpen(false);
        }}
        onCancel={() => {
          setSignoutModalOpen(false);
        }}
        message={"Are you sure you want to signout?"}
      />
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 shadow-lg rounded-lg w-full max-w-3xl mx-10 my-10 relative">
          <div className="p-8">
            <div className="flex justify-center relative">
              <div className="relative -mt-16">
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  hidden
                  ref={fileRef}
                  accept="image/*"
                />
                <img
                  src={imageUrl}
                  alt="Profile"
                  className="rounded-full w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:opacity-90 cursor-pointer"
                />
                <div
                  className="absolute bottom-0 right-0 -mb-4 mr-4"
                  onClick={() => fileRef.current.click()}
                >
                  <span className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-200">
                    <MdEdit className="text-gray-600 w-6 h-6" />
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-8 text-lg text-center">
              {error && <p className="text-red-500">Failed! {error}</p>}
              {editingName ? (
                <input
                  type="text"
                  value={newName}
                  onChange={handleNameInputChange}
                  onBlur={handleNameBlur}
                  onKeyPress={handleKeyPress}
                  autoFocus
                  className="font-bold w-2/3 text-3xl text-gray-900 border-b-2 border-gray-400 outline-none"
                />
              ) : (
                <h1
                  className="font-bold text-3xl text-gray-900"
                  onClick={() => setEditingName(true)}
                >
                  {newName}
                </h1>
              )}
              <p className="text-sm text-gray-600">Email: {user.email}</p>
            </div>
            <div className="flex flex-wrap justify-center mt-6 space-x-4">
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-gray-900 text-white px-6 py-3 my-2 text-xs md:text-base rounded-md hover:bg-black transition duration-200 focus:outline-none focus:ring focus:ring-gray-400 flex items-center"
              >
                <RefreshCcw className="mr-2 w-5 md:w-6" color="white" />
                <span className="text-white">Update</span>
              </button>
              <Link
                to={"/create-listing"}
                className="bg-gray-900 text-white px-6 py-3 my-2 text-xs md:text-base rounded-md hover:bg-black transition duration-200 focus:outline-none focus:ring focus:ring-gray-400 flex items-center"
              >
                <Plus className="mr-2 w-5 md:w-6" color="white" />
                <span className="text-white">Create Listing</span>
              </Link>
              <Link
                to={"/listing"}
                className="bg-gray-900 text-white px-6 py-3 my-2 text-xs md:text-base rounded-md hover:bg-black transition duration-200 focus:outline-none focus:ring focus:ring-gray-400 flex items-center"
              >
                <List className="mr-2 w-5 md:w-6" color="white" />
                <span className="text-white">Listings</span>
              </Link>
            </div>
            <div className="flex justify-end w-full p-2 my-4">
              <Trash2
                onClick={() => setDeleteModalOpen(true)}
                className="mx-2 cursor-pointer"
                color="red"
              />
              <LogOut
                onClick={() => setSignoutModalOpen(true)}
                className="mx-2 cursor-pointer"
                color="orange"
              />
            </div>
            <div className="mt-8">
              <h2 className="font-medium text-gray-900 text-left">
                Recent Activities
              </h2>
              <div className="mt-4 space-y-2">
                <div className="border-t border-gray-300 py-4">
                  <div className="flex items-center px-4">
                    <img
                      src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                      alt="Activity"
                      className="rounded-full h-6 shadow-md mr-2"
                    />
                    <p className="text-sm text-gray-700">
                      Updated his status{" "}
                      <span className="text-gray-500 text-xs">
                        {user.updatedAt}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
