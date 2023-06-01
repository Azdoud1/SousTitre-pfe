import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditText.css";

function EditText (){
 const [value, setValue] = useState("");
 return (
    <div clasName="container">
        <div className="row">
<div className="editor">
    <ReactQuill 
    theme="snow"
    value={value}
    onChange={setValue}
    className="editor-input"
    modules={modules}
    />
</div>
        </div>
    </div>
 )   
}