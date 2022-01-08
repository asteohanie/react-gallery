import { useState, useEffect } from "react";
import { collectionRef, db, q } from "../firebase/config";
import { getDocs, onSnapshot, orderBy, query } from "firebase/firestore";

//custom active listener hook
const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(q, (snapshot) => {
            let documents = [];
            snapshot.docs.forEach((doc) => {
                documents.push({...doc.data(), id: doc.id});
            })
            setDocs(documents);
        });
        return () => unsub();
        
    }, [collection])

    return { docs };
}

export default useFirestore;
