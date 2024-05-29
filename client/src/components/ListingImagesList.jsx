import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ImagePreview from "../interface/ImagePreview";
import { useState } from "react";

export default function ListingImagesList(props) {
  const { imageUrls, onDragEnd } = props;
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const handlePreviewClick = (url) => {
    console.log(previewImageUrl !== null);
    setPreviewImageUrl(url);
  };
  return (
    <>
      {previewImageUrl !== null && (
        <ImagePreview
          url={previewImageUrl}
          onClose={() => {
            setPreviewImageUrl(null);
          }}
        />
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="imageUrls">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {imageUrls.map((imageUrl, index) => (
                <Draggable key={imageUrl} draggableId={imageUrl} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex justify-between"
                    >
                      <img
                        src={imageUrl}
                        alt={`Image ${index}`}
                        className="my-2 w-32 h-20 object-cover"
                      />
                      <div>
                        <button
                          type="button"
                          className="text-red-500 mx-2"
                          // onClick={handleRemoveFileButtonClick}
                        >
                          delete
                        </button>
                        <button
                          type="button"
                          className="text-blue-500 mx-2"
                          onClick={() => {
                            handlePreviewClick(imageUrl);
                          }}
                        >
                          preview
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
