import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firestore";
import { useAuth } from "./authContext";
import { useAlbum } from "./AlbumContext";


const imageContext = createContext();

const useImage = () => {
    const value = useContext(imageContext);
    return value;
}

const ImageContextProvider = ({ children }) => {

    // Setting various states for use
    const [imgTitle, setImageTitle] = useState('');
    const [imgURL, setImageURL] = useState('');
    const [imageFormVisible, setImageFormVisible] = useState(false);
    const [images, setImages] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const [carouselVisibility, setCarouselVisibility] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [image, setImage] = useState(null);

    const { userId } = useAuth();
    const { albumTitle } = useAlbum();

    // Logic to load all the images from the respective album
    useEffect(() => {
        if(albumTitle){
            onSnapshot(collection(db, `images/${userId}/${albumTitle}`), (snapshot) => {
                const imagesFromDB = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });
    
                // Sorting the images on the basis of the creation time
                const sortedImages = [...imagesFromDB].sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
    
                setImages(sortedImages);
            });
        }
    }, [userId, albumTitle]);

    // Function for adding an image in the database and updating the state variable
    async function addImage(e){
        e.preventDefault();

        const imageData = {
            imgTitle,
            url: imgURL,
            createdAt: Date.now()
        }

        await addDoc(collection(db, `images/${userId}/${albumTitle}`), imageData);
        setImageTitle('');
        setImageURL('');
        setImageFormVisible(false);

    }

    // setting up the image title
    function imageTitle(e){
        setImageTitle(e.target.value);
    }

    // Setting up the image url
    function imageURL(e){
        setImageURL(e.target.value);
    }

    // Handling the visibility of edit and delete button
    function mouseOver(index){
        setHoveredIndex(index);
    }
    
    function mouseLeave(index){
        index = -1
        setHoveredIndex(index);
    }

    // deletion of an image
    async function handleDelete(image){
        await deleteDoc(doc(db, `images/${userId}/${albumTitle}`, image.id));
    }

    // Opening the carousel
    function openCarousel(index){
        setCurrentIndex(index);
        setImage(images[index]);
        setCarouselVisibility(true);
    }

    // End carousel
    function endCarousel(e){
        e.preventDefault();
        setCarouselVisibility(false);
    }

    // For showing the previous image
    function previousImage(e){
        e.preventDefault();
        console.log('prev image', currentIndex);
        if(currentIndex > 0){
            setCurrentIndex(currentIndex - 1);
        }
        setImage(images[currentIndex]);
    }
    
    // To show the next image
    function nextImage(e){
        e.preventDefault();
        console.log('next image', currentIndex);
        if(currentIndex < images.length - 1){
            setCurrentIndex(currentIndex + 1);
        }
        setImage(images[currentIndex]);
    }


    return (
        <imageContext.Provider value={{ carouselVisibility, imageFormVisible, images,setImageFormVisible, openCarousel, mouseLeave, mouseOver, handleDelete, hoveredIndex, endCarousel, previousImage, nextImage, addImage, imageTitle, imageURL, image }}>
            { children }
        </imageContext.Provider>
    )

}

export { useImage, ImageContextProvider }