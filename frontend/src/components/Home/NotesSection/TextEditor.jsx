import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuillWrapper = (props) => {
 
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleChange = (value) => {
    props.setState({ text: value });
    props.onChange({target:{name:"description", value:value}})
  };

  return (
    <div>
      <ReactQuill
        value={props.state.text}
        modules={modules}
        formats={formats}
        onChange={handleChange}
        className="text-black dark:text-[#eee]  "
      />
    </div>
  );
};

export default ReactQuillWrapper;
