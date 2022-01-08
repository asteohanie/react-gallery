import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
    //storing the file(selected) in a local state [statename, functiontoupdatestate] = useState(initialvalue):
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    //the only file types we'll allow
    const types = ['image/png', 'image/jpeg']

    const changeHandler = (e) => {
        let selected = e.target.files[0];
        //target is for import, get first file
        //to check if a file was uploaded then update the state with that file:
        if (selected && types.includes(selected.type)){
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png or jpeg)');
        }
    }

    return (
        <form>
            <label>
                <input type='file' onChange={changeHandler}/>
                {/* allows user to upload file */}
                <span>+</span>
            </label>
                <div className='output'>
                    {/* conditional rendering- if error is true, output the div */}
                    {error && <div className='error>'>{error}</div>}
                    { file && <div>{file.name}</div>}
                    {/* for the user to see what they've selected */}
                    { file && <ProgressBar file={file} setFile={setFile}/>}
                </div>
        
        </form>
    )

}

export default UploadForm;

// https://firebase.google.com/docs/storage/web/upload-files