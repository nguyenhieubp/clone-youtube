import React from "react";
import ItemComment from "./ItemComment";
import "../../styles/index.css";

const Comments: React.FC = () => {
  const [valueComment, setValueComment] = React.useState("");
  const [focus, setFocus] = React.useState(false);

  const handleCancel = () => {
    setValueComment("");
    setFocus(false);
  };

  const handleSend = () => {
    setFocus(false);
    setValueComment("");
  };

  return (
    <div>
      <div className="p-[1rem]">
        <div>9999 Comments</div>
        <div className="mt-[2rem]">
          <div className="flex items-center">
            <div className="w-[5rem] h-[5rem]">
              <img
                className="w-full h-full rounded-full object-cover"
                src="https://storage.googleapis.com/support-forums-api/avatar/profile-1282-14415867656491347169.jpg"
                alt=""
              />
            </div>
            <textarea
              id="form-comment"
              onFocus={() => setFocus(true)}
              value={valueComment}
              onChange={(e) => setValueComment(e.target.value)}
              style={
                focus
                  ? { borderBottom: "3px solid black", height: "15rem" }
                  : { borderBottom: "1px solid black" }
              }
              className="ml-[3rem] border-b-[1px] inline-block w-full h-[5rem]"
            />
          </div>
        </div>
        <div className="flex justify-end p-[1rem]">
          <button
            onClick={handleCancel}
            className="p-[1.25rem] rounded-[2rem] mx-[1rem] hover:bg-[#a7a09d49]"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            style={
              valueComment.length > 0
                ? { background: "blue", color: "white" }
                : {}
            }
            className="p-[1.25rem] bg-[#f2f2f2] rounded-[2rem] mx-[1rem] hover:bg-[#a7a09d49]"
          >
            Comment
          </button>
        </div>
        <div className="mt-[2rem]">
          <ItemComment></ItemComment>
          <ItemComment></ItemComment>
          <ItemComment></ItemComment>
          <ItemComment></ItemComment>
        </div>
      </div>
    </div>
  );
};

export default Comments;
