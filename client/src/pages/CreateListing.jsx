import { Upload, CheckSquare, DollarSign, Image, Plus } from "react-feather";

export default function CreateListing() {
  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl text-center mt-5 mb-10">Create Listing</h1>
      <form>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-5/6">
            <div className="flex flex-col mt-2">
              <label htmlFor="name" className="text-xl">
                Name
              </label>
              <input
                className="bg-slate-100 border p-3 my-2 rounded-md focus:outline-none focus:bg-white focus:border-slate-300"
                type="text"
                name="name"
                id="name"
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
                placeholder="address"
                minLength={12}
                maxLength={62}
                required
              />
            </div>
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2 text-lg mt-5">
                <input type="checkbox" name="sell" id="sell" className="w-4" />
                <label htmlFor="sell">Sell</label>
              </div>
              <div className="flex gap-2 text-lg mt-5">
                <input type="checkbox" name="rent" id="rent" className="w-4" />
                <label htmlFor="rent">Rent</label>
              </div>
              <div className="flex gap-2 text-lg mt-5">
                <input
                  type="checkbox"
                  name="parking_spot"
                  id="parking_spot"
                  className="w-4"
                />
                <label htmlFor="parking_spot">Parking Spot</label>
              </div>
              <div className="flex gap-2 text-lg mt-5">
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  className="w-4"
                />
                <label htmlFor="furnished">Furnished</label>
              </div>
              <div className="flex gap-2 text-lg mt-5">
                <input
                  type="checkbox"
                  name="offer"
                  id="offer"
                  className="w-4"
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
                  defaultValue={1}
                  min={1}
                  max={15}
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
                  defaultValue={1}
                  min={1}
                  max={15}
                  required
                />
                <label htmlFor="baths" className="text-xl">
                  Baths
                </label>
              </div>
            </div>
            <div className="flex flex-wrap gap-10 mt-8">
              <div>
                <input
                  className="bg-slate-100 border p-3 my-2 mr-2 rounded-md focus:outline-none focus:bg-white focus:border-slate-300"
                  type="number"
                  name="regularPrice"
                  id="regularPrice"
                  defaultValue={1}
                  min={1}
                  required
                />
                <label htmlFor="beds">
                  Regular Price <span>Rs./month</span>
                </label>
              </div>
              <div>
                <input
                  className="bg-slate-100 border p-3 my-2 mr-2 rounded-md focus:outline-none focus:bg-white focus:border-slate-300"
                  type="number"
                  name="discountPrice"
                  id="discountPrice"
                  defaultValue={1}
                  min={1}
                  required
                />
                <label htmlFor="baths">
                  Discount Price <span>Rs./month</span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <span className="font-semibold">Images:</span> The first image will
            be the cover (max 6)
            <input
              type="file"
              name="images"
              id="images"
              className="border w-full my-5 p-3"
              multiple
            />
            <div className="flex justify-end">
              <button type="submit" className="bg-green-600 text-lg text-white px-5 py-2 rounded-md hover:bg-green-800 transition duration-200 focus:outline-none focus:ring focus:ring-green-400 flex items-center">
                create
                <Plus color="white" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
