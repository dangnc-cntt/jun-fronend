import React, {useCallback, useState} from "react";
import {storage} from "./firebase";


export function UploadImage() {
    const [count, setCount] = useState(0);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
                if(count === 1){
                    setImage(null);
                    setCount(0);
                }
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                    });
            }
        )
    }

    if(image && count === 0){
        setCount(1);
        handleUpload();
    }

    return (
        <div>
            <progress value={progress} max={100}/>
            <br/>
            <br/>
            <img src={url || "http://via.placeholder.com/200x200"} alt="firebase-image"/>
            <br/>
            <br/>
            <br/>
            <input type="file" onChange={(e) => handleChange(e)}/>
            <button>Button</button>
        </div>
    )
}
