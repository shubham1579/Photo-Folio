import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firestore";
import { useAuth } from "./authContext";


const albumContext = createContext();

const useAlbum = () => {
    const value = useContext(albumContext);
    return value;
}

const AlbumContextProvider = ({ children }) => {

    const [albumTitle, setalbumTitle] = useState('');
    const [albums, setAlbums] = useState([]);
    const [albumFormVisible, setAlbumFormVisible] = useState(false);
    const [imageComponent, setImageComponent] = useState(false);

    const { userId } = useAuth();

    // Loading all the albums on the first render
    useEffect(() => {
        onSnapshot(collection(db, `userAlbums/${userId}/myAlbums`), (snapshot) => {
            const albumsFromDB = snapshot.docs.map((doc) => {
                return {
                id: doc.id,
                ...doc.data()
                }
            });

            // Sorting the albums according to the time created
            const sortedAlbums = [...albumsFromDB].sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            setAlbums(sortedAlbums);
        });
    }, [userId]);

    // Album name
    function albumName(e){
        setalbumTitle(e.target.value);
    }

    // Adding album to the database
    async function addAlbum(e){
        e.preventDefault();

        if(userId){
            // Handling the case for not creating two albums of same name
            const albumExist = albums.some((album) => album.albumTitle === albumTitle);

            if(!albumExist){
                await addDoc(collection(db, `userAlbums/${userId}/myAlbums`), {
                    albumTitle,
                    createdAt: Date.now()
                });
            }
            else{
                alert("An album with this name already exists");
            }

            setalbumTitle('');
            setAlbumFormVisible(false);
        }
    }

    // Setting up the albumTitle for the imagelist component
    function imageList(name){
        setalbumTitle(name);    
        setImageComponent(true);
    }
    
    function albumComponent(e){
        e.preventDefault();
        setalbumTitle('');
        setImageComponent(false);
    }


    return (
        <albumContext.Provider value={{ imageComponent, albumFormVisible, albumTitle, addAlbum, albumName, setAlbumFormVisible, albums, imageList, albumComponent }}>
            { children }
        </albumContext.Provider>
    )

}

export { useAlbum, AlbumContextProvider }