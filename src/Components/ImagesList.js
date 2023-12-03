import { useEffect, useState } from "react";
import ImageForm from "./ImageForm";
import ImageStyles from './ImagesList.module.css';
import backbtn from '../images/back.png';
import editbtn from '../images/edit.png';
import deletebtn from '../images/trash-bin.png';
import { db } from '../firestore';
import { collection, doc, setDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import Carousel from "./Carousel";

function ImageList(props){

    // Setting various states for use
    const [imgTitle, setImageTitle] = useState('');

    const [imgURL, setImageURL] = useState('');

    const [visible, setVisibility] = useState(false);

    const [btnName, setBtnName] = useState('Add Image');

    const [images, setImages] = useState([]);

    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const [btnText, setBtnText] = useState('Add');

    const [update, setUpdate] = useState('');

    const [time, setTime] = useState(0);

    const [carouselVisibility, setCarouselVisibility] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);

    // Logic to load all the images from the respective album
    useEffect(() => {
        onSnapshot(collection(db, `albums/${props.title}/images`), (snapshot) => {
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
    }, [images, props.title]);

    // Handling the button name from Add Image/cancel
    function handleBtnName(e){
        e.preventDefault();
        if(visible === false){
            setBtnName('Cancel');

            setVisibility(true);
            setImageTitle('');
            setImageURL('');
            setBtnText('Add');
        }
        else{
            setBtnName('Add Image');

            setVisibility(false);
        }
    }

    // Function for adding an image in the database and updating the state variable
    async function addImage(e){
        e.preventDefault();

        const imageData = {
            imgTitle,
            url: imgURL,
            createdAt: Date.now()
        }

        if(btnText === 'Add'){
            await setDoc(doc(db, `albums/${props.title}/images`, imgTitle), imageData);
        }
        else{
            await deleteDoc(doc(db, `albums/${props.title}/images`, update));
            await setDoc(doc(db, `albums/${props.title}/images`, imgTitle), {
                imgTitle,
                url: imgURL,
                createdAt: time
            });
        }
        setImageTitle('');
        setImageURL('');
        setVisibility(false);

    }

    // setting up the image title
    function imageTitle(e){
        setImageTitle(e.target.value);
    }

    // Setting up the image url
    function imageURL(e){
        setImageURL(e.target.value);
    }

    // Clear the field image title and url
    function clearFields(e){
        e.preventDefault();
        setImageTitle('');
        setImageURL('');
    }

    // Handling the visibility of edit and delete button
    function mouseOver(index){
        setHoveredIndex(index);
    }
    
    function mouseLeave(index){
        index = -1
        setHoveredIndex(index);
    }

    // Handling the edit image functionality
    function handleEdit(image){
        setUpdate(image.id);
        setTime(image.createdAt);
        setVisibility(true);
        setBtnName('Cancel');
        setBtnText('Update');
        setImageTitle(image.imgTitle);
        setImageURL(image.url);
    }

    // deletion of an image
    async function handleDelete(image){
        await deleteDoc(doc(db, `albums/${props.title}/images`, image.id));
    }

    // Opening the carousel
    function handleClick(index){
        setCurrentIndex(index)
        setImageTitle(images[currentIndex].imgTitle);
        setImageURL(images[currentIndex].url);
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
        if(currentIndex >= 0){
            setCurrentIndex(currentIndex - 1);
        }
        else{
            return;
        }
        setImageTitle(images[currentIndex].imgTitle);
        setImageURL(images[currentIndex].url);
    }
    
    // To show the next image
    function nextImage(e){
        e.preventDefault();
        if(currentIndex < images.length - 1){
            setCurrentIndex(currentIndex + 1);
        }
        setImageTitle(images[currentIndex].imgTitle);
        setImageURL(images[currentIndex].url);
    }

    return (
        <>

            <div className={ImageStyles.container}>

                {carouselVisibility ? <Carousel previousImage = {previousImage} nextImage = {nextImage} endCarousel = {endCarousel} url = {imgURL} alt = {imgTitle} /> : ''}

                <div className={ImageStyles.heading}>

                    <span onClick={(e) => props.albumComponent(e)}><img src={backbtn} alt="back" /></span>
                    <h3>Images in {props.title}</h3>
                    <button className={visible ? ImageStyles.deletebtn : ImageStyles.addbtn} onClick={(e) => handleBtnName(e)}>{btnName}</button>

                </div>

                {visible ? <ImageForm btnText = {btnText} title = {imgTitle} url = {imgURL} imageTitle = {(e) => imageTitle(e)} imageURL = {(e) => imageURL(e)} clearFields = {(e) => clearFields(e)} addImage = {addImage} /> : ''}

                <div className={ImageStyles.list}>

                    {images.map((image, i) => (
                        
                        <div key={i} className={ImageStyles.image} onClick={() => handleClick(i)} onMouseLeave={() => mouseLeave(i)} onMouseEnter={() => mouseOver(i)}>
                            
                            <div onClick={() => handleEdit(image)} className={`${ImageStyles.editimg} ${hoveredIndex === i ? ImageStyles.active : ''}`}>
                                <img src={editbtn} alt="update" />
                            </div>
                            
                            <div onClick={() => handleDelete(image)} className={`${ImageStyles.deleteimg} ${hoveredIndex === i ? ImageStyles.activedel : ''}`}>
                                <img src={deletebtn} alt="delete" />
                            </div>
                            
                            <img src={image.url} alt={image.imgTitle} />
                            <span>{image.imgTitle}</span>

                        </div>

                    ))}

                </div>

            </div>

        </>
    );

}

export default ImageList;