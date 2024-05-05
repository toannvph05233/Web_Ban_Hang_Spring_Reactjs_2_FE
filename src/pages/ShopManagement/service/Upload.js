import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from "uuid";

const uploadImage = (storage, files, setPath, setLoading) => {
    if (!files || files.length === 0) return;
    setLoading(true);
    const upload = Array.from(files).map((file) => {
        const imageRef = ref(storage, `image/${file.name + v4()}`);
        return uploadBytes(imageRef, file)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((url) => {
                setPath((path) => [
                    ...path,
                    { name: url }
                ]);
            });
    });
    Promise.all(upload).then(() => {
        setLoading(false)
    })
};

export default uploadImage;