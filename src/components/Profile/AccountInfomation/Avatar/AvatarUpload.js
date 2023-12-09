import React, {useEffect, useState} from 'react';
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import uploadFileWithProgress from "../../../../firebase/uploadFileWithProgress";
import "./avatarUpload.scss";

const AvatarUpload = ({file, setAvatarFile, avatarURL, setAvatarURL, values}) => {
    const [avatarPreview, setAvatarPreview] = useState("");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let url;
        const uploadImages = async () =>{
            if (!file) return;
            url = URL.createObjectURL(file);
            setAvatarPreview(url);
            const imageUrl = await uploadFileWithProgress(file, setProgress);
            setAvatarURL(imageUrl);
        }
        uploadImages().then();

        return () => {
            if (url) URL.revokeObjectURL(url);
        }
    }, [file])

    useEffect(()=>{
        setProgress(100);
    }, [])

    useEffect(()=>{
        setAvatarPreview(avatarURL);
    }, [avatarURL])

    const handleDeleteAvatar = () => {
        setAvatarPreview("");
        setAvatarFile(null);
        setAvatarURL("");
        values.avatar = "";
    }
    return (
        <div className={`position-relative d-inline-block avatar-upload ${avatarPreview ? '' : 'd-none'}`}>
            <img src={avatarPreview} className={`img-thumbnail ${progress < 100 ? 'brightness-50' : ''}`} alt=""
                 width={250} height={250} loading="lazy"/>
            {progress >= 100 &&
                <span className="position-absolute top-0 p-2 fs-5 btn-delete"
                      onClick={handleDeleteAvatar}>
                      <i className="bi bi-trash-fill"></i>
                </span>
            }
            {progress < 100 &&
                <CircularProgressWithLabel value={progress}/>
            }
        </div>
    );
};

export default AvatarUpload;