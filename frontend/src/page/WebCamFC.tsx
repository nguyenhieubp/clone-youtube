import React from "react";
import Webcam from "react-webcam";

const WebCamFC: React.FC = () => {
  const webcamRef = React.useRef<any>(null);
  const [images, setImages] = React.useState<Array<string>>([]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages([...images, imageSrc]);
  }, [images]);

  return (
    <>
      <div className="flex flex-col items-center">
        <Webcam
          width={400}
          height={800}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
        <button
          className="border-1 p-2 bg-black text-white mt-4"
          onClick={capture}
        >
          Capture photo
        </button>
      </div>
      <div className="grid gap-8 grid-cols-5  mt-[4rem]">
        {images.map((item, index) => (
          <img
            key={index}
            className="w-full h-full object-cover"
            src={item}
            alt=""
          />
        ))}
      </div>
    </>
  );
};

export default WebCamFC;
