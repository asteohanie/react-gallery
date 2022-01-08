import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState, useEffect } from 'react';
import { storage, collectionRef } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    // image url that we get back from storage after upload
    //everytime a new file is uploaded, useEffect runs
    useEffect(() => {
        //references
        const storageRef = ref(storage, file.name);

        //put file in reference location:
        const uploadTask = uploadBytesResumable(storageRef, file);
        const createDoc = async(url) => {
            await addDoc(collectionRef, { name: file.name, url: url, createdAt: serverTimestamp()})
        }

        uploadTask.on('state_changed', (snapshot)=> {
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        },
        () => {
            const url = getDownloadURL(storageRef).then((url) => createDoc(url));
            setUrl(url);
            })
    }, [file]);
    //ver 8:
    // storageRef.put(file).on('state_changed', (snap) => {
    //     let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
    //     setProgress(percentage);
    // }, (err) => {
    //     setError(err);
    // }, async () => {
    //     const url = await storageRef.getDownloadURL();
    //     setUrl(url);
    // })

    return { progress, url, error }

}

export default useStorage;

//Firebase 9: Ordering Data and Timestamps:
//https://www.youtube.com/watch?v=7aDG3L-bTS8&list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb&index=8
