import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setStatus } from "../../Actions/authActions";

const UploadStatus = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadEmoji, setuploadEmoji] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const videoRef = useRef(null);
const dispatch=useDispatch()
  const handlePlayPuase = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(file)
    const newfile = URL.createObjectURL(file);
    setPreviewUrl(newfile);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (selectedFile) {
        const formData=new FormData()
        formData.append('status',selectedFile)
        formData.append('uploadEmoji',uploadEmoji)

        dispatch(setStatus(formData))
    }


  };

  useEffect(() => {
    if (previewUrl && videoRef?.current) {
      videoRef.current.play();
    }
  }, [videoRef, previewUrl]);

  return (
    <div className="h-100 w-100 row justify-content-center align-items-start m-0 bg-secondary overflow-hidden">
      {previewUrl ? (
        <div className=" h-100 d-felx colum  video-container w-100 p-0 ">
          <div className=" preview-status justify-content-center align-items-center w-100 h-100 ">
            <video
              ref={videoRef}
              playsInline
              loop
              autoPlay
              height={"100%"}
              width={"100%"}
              src={previewUrl}
              onClick={handlePlayPuase}
              style={{ objectFit: "cover" }}
            ></video>
            <div className="uploadEmoji position-sticky bottom-0 w-100 bg-white ">
              <input
                type="text"
                className="p-3 w-75 mb-2 rounded "
                id="uploadEmoji"
                placeholder="Enter .."
                value={uploadEmoji}
                onChange={(e) => setuploadEmoji(e.target.value)}
                style={{
                  zIndex: "revert-layer",
                  border: "none",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                className="btn btn-success px-3 p-y-2  ms-4"
                onClick={submitHandler}
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
          <div
            className="close-Status position-fixed top-0 p-5 w-100 "
            onClick={() => setPreviewUrl("")}
          >
            <i className="fa-solid fa-xmark fs-1 font-bold"></i>{" "}
          </div>
        </div>
      ) : (
        <div className="h-100 w-100 d-flex justify-content-center align-items-end">
          <div className="h-25 w-100 p-3 form-group ">
            <label htmlFor="uploadStatus" className=" h-25">
              UploadStatus
            </label>

            <div className="row h-25 gap-3">
              <button className=" col-3 btn btn-primary p-2 ">Cancel</button>
              <input
                type="file"
                name="uploadfile"
                accept="video/mp4"
                id="uploadStatus"
                className="form-control p-2 mt-2 col-3 w-25 border-black"
                onChange={handleUploadFile}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadStatus;