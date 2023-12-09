import React, {useEffect, useState} from 'react';
import CircularProgressWithLabel from "../AccountInfomation/Avatar/CircularProgressWithLabel";
import uploadFileWithProgress from "../../../firebase/uploadFileWithProgress";
import "../AccountInfomation/Avatar/avatarUpload.scss";

const PostUpload = ({file, setAvatarFile, avatarURL, setAvatarURL, values}) => {
    const [imagePreview, setImagePreview] = useState("");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let url;
        const uploadImages = async () =>{
            if (!file) return;
            url = URL.createObjectURL(file);
            setImagePreview(url);
            const imageUrl = await uploadFileWithProgress(file, setProgress);
            setAvatarURL(imageUrl);
        }
        uploadImages().then(()=>{
            console.log(imagePreview)
        }).catch(err=>{
            console.log(err)
        });

        return () => {
            if (url) URL.revokeObjectURL(url);
        }
    }, [file])

    useEffect(()=>{
        setProgress(100);
    }, [])

    useEffect(()=>{
        setImagePreview(avatarURL);
    }, [avatarURL])

    const handleDeleteAvatar = () => {
        setImagePreview("");
        setAvatarFile(null);
        setAvatarURL("");
        values.avatar = "";
    }
    return (
        <div className={`position-relative d-inline-block avatar-upload ${imagePreview ? '' : 'd-none'}`}>
            <img src={imagePreview} className={`img-thumbnail ${progress < 100 ? 'brightness-50' : ''}`} alt=""
                 width={150} loading="lazy"/>
            {/*{progress >= 100 &&*/}
            {/*    <span className="position-absolute top-0 p-2 fs-5 btn-delete"*/}
            {/*          onClick={handleDeleteAvatar}>*/}
            {/*          <i className="bi bi-trash-fill"></i>*/}
            {/*    </span>*/}
            {/*}*/}
            {progress < 100 &&
                <CircularProgressWithLabel value={progress}/>
            }
        </div>
    );
};

export default PostUpload;