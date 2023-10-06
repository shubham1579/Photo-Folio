import { useEffect, useState } from "react";
import AlbumStyles from './AlbumList.module.css';
import albumLogo from '../images/album.png';
import AlbumForm from './AlbumForm';
import ImageList from "./ImagesList";
import { db } from '../firestore';
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";

function AlbumList(){

    // creating various states for use

    const [title, setTitle] = useState('');

    const [albums, setAlbums] = useState([]);

    const [btnName, setBtnName] = useState('Add Album');

    const [visible, setVisible] = useState(false);

    const [imageComponent, setImageComponent] = useState(false);

    // Loading all the albums on the first render
    useEffect(() => {
        onSnapshot(collection(db, "albums"), (snapshot) => {
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
    }, []);

    // Handling the button name of add Album/Cancel
    function handleBtnName(e){
        e.preventDefault();

        if(visible === false){
            setBtnName('Cancel');

            setVisible(true);
        }
        else{
            setBtnName('Add Album');

            setVisible(false);
        }
    }

    // Clearing the title field of the album
    function clearName(e){
        e.preventDefault();
        setTitle('');
    }

    // Album name
    function albumName(e){
        setTitle(e.target.value);
    }

    // Adding album to the database
    async function handleAlbum(e){
        e.preventDefault();

        // Handling the case for not creating two albums of same name
        const albumExist = albums.some((album) => album.title === title);

        if(!albumExist){
            await setDoc(doc(db, 'albums', title), {
                title,
                createdAt: Date.now()
            });
        }
        else{
            alert("An album with this name already exists");
        }

        setTitle('');
        setVisible(false);
        setBtnName('Add Album');
    }

    // Setting up the title for the imagelist component
    function imageList(name){

        setTitle(name);
    
        setImageComponent(true);
    }
    
    function albumComponent(e){
        e.preventDefault();

        setTitle('');

        setImageComponent(false);
    }

    return (
        <>
            {!imageComponent ? <div>
                {visible ? <AlbumForm title = {title} clearName = {clearName} addAlbum = {handleAlbum} albumName = {albumName} /> : ''}

                <div className={AlbumStyles.container}>
                    <div className={AlbumStyles.heading}>
                        <span>All Albums</span>
                        <button className={visible ? AlbumStyles.deletebtn : AlbumStyles.addbtn} onClick={(e) => handleBtnName(e)}>{btnName}</button>
                    </div>
                    <div className={AlbumStyles.list}>
                        {albums.map((album) => (
                            <div key={album.id} className={AlbumStyles.album} onClick={() => imageList(album.title)}>
                                <img src={albumLogo} alt='Album' />
                                <span>{album.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div> : <div><ImageList title = {title} albumComponent = {albumComponent} /></div>}
        </>
    );

}

export default AlbumList;