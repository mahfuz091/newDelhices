import "quill/dist/quill.snow.css";
import send from "../../assets/images/Send Button.svg";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ReactQuill from "react-quill";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
const Editor = ({ handlePost, handleNotePost, note, setFormData }) => {
  const reactQuillRef = useRef(null);
  const [value, setValue] = useState("");
  const [valueText, setValueText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [quill, setQuill] = useState(null);

  const wordCountp = wordCount / 1000;

  var modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],

      ["link"],
    ],
  };
  var formats = ["bold", "italic", "underline", "align", "link"];

  const TOOLBAR_OPTIONS = [
    ["bold", "italic", "underline", "link"],
    [{ list: "ordered" }, { list: "bullet" }],
  ];

  const removeEmptyTags = (htmlString) => {
    // Define a regular expression to match empty HTML tags with only <br> or empty space inside
    const emptyTagRegex = /<[^>]*>(\s*|<br\s*\/?>)\s*<\/[^>]*>/gi;

    // Replace all occurrences of empty tags with an empty string
    return htmlString.replace(emptyTagRegex, "");
  };

  console.log(value, "value");

  const handleProcedureContentChange = (content, _, __, editor, event) => {
    setValue(content);
    setQuill(editor);
    setFormData((prev) => ({
      ...prev,
      description: content,
    }));

    let cleanedContent = removeEmptyTags(content);
    console.log(cleanedContent);
    setValueText(cleanedContent);

    const text = editor.getText();

    const strippedText = text.replace(/\s+/g, "").trim();
    const words = strippedText.split("").filter(Boolean).length;

    const spaces = text.length - text.replace(/\s/g, "").length;
    // console.log(words, spaces);

    // Set word count including spaces
    setWordCount(words + spaces - 1);

    // setWordCount(words);

    const htmlString = content;

    const tempDiv = document.createElement("div");

    tempDiv.innerHTML = htmlString;
    const textContent = String(tempDiv.textContent || tempDiv.innerText);
  };

  const handleClick = (valueText) => {
    if (note && wordCount <= 1000) {
      handleNotePost(valueText);
      setValue("");
    } else if (wordCount <= 1000) {
      handlePost(valueText);

      setValue("");
    } else {
      toast.error("Error: Word count exceeds 1000 characters.");
    }
  };
  const checkCharacterCount = (event) => {
    console.log(event);
    const quill = reactQuillRef.current?.getEditor();
    if (!quill) return;

    if (event.key === "Enter" && event.shiftKey) {
      // If Shift+Enter is pressed
      event.preventDefault(); // Prevent default behavior (inserting a new line)
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (wordCount > 1000) {
        toast.error("Error: Word count exceeds 1000 characters.");
      } else {
        // Perform the action (handleClick) if word count is within limit
        handleClick(valueText);
      }
    }

    const quillDOMNode = reactQuillRef?.current;

    if (quillDOMNode) {
      const unprivilegedEditor = reactQuillRef.current.unprivilegedEditor;

      if (
        (unprivilegedEditor.getLength() >= 1000 && event.key !== "Backspace") ||
        (unprivilegedEditor.getLength() >= 1000 && event.key === "Enter")
      ) {
        toast.error("Error: Word count exceeds 1000 characters.");
        event.preventDefault();
      }
    }
  };

  return (
    <div className='w-full mt-auto border-[1px] rounded-[10px] relative bg-white dark:bg-[#292c35] border-[#444] dark:border-[#B0AEAE] editor'>
      <ReactQuill
        onKeyDown={checkCharacterCount}
        ref={reactQuillRef}
        theme='snow'
        // modules={modules}
        // formats={formats}
        modules={{
          toolbar: {
            container: TOOLBAR_OPTIONS,
          },
        }}
        value={value}
        placeholder='Write here ....'
        onChange={handleProcedureContentChange}
        style={{ border: "none" }}
        id='quill'
      ></ReactQuill>
    </div>
  );
};

export default Editor;
