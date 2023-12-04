import albumLogo from '../images/album.png';
import AlbumForm from './AlbumForm';
import ImageList from "./ImagesList";
import { useAlbum } from "../contextAPI/AlbumContext";

function AlbumList(){

    const { imageComponent, albumFormVisible, setAlbumFormVisible, albums, imageList } = useAlbum();

    return (
        <>
            {!imageComponent ? <div>
                {albumFormVisible ? <AlbumForm /> : ''}

                <div className='m-auto w-[92%] md:w-[70%]'>
                    <div className='flex items-center justify-between my-[30px]'>
                        <span className='text-xl sm:text-[1.7rem] font-bold'>My Albums</span>
                        <button className={`${albumFormVisible ? 'bg-[rgba(255,19,0,.1)] text-[#ff1300] cursor-pointer font-bold px-1 text-sm py-[2px] sm:px-2.5 sm:py-[5px] rounded-[5px] border-2 border-solid border-[#ff1300]' : 'bg-[rgba(0,119,255,0.1)] text-[#07f] cursor-pointer font-bold px-1 text-sm py-[2px] sm:px-2.5 sm:py-[5px] rounded-[5px] border-2 border-solid border-[#07f]'}`} onClick={() => setAlbumFormVisible(!albumFormVisible)}>{albumFormVisible ? 'Cancel' : 'Add Album'}</button>
                    </div>
                    <div className='flex justify-start gap-[14.5px] xl:gap-[25px] flex-wrap'>
                        {albums.map((album) => (
                            <div key={album.id} className='flex flex-col justify-between items-center w-[30%] sm:w-[31%] lg:w-[23%] h-[110px] sm:h-[180px] xl:h-[210px] cursor-pointer mb-5 rounded-[5px] border-[5px] border-solid border-[#eee] hover:border-[#a0a0f9]' onClick={() => imageList(album.albumTitle)}>
                                <img src={albumLogo} alt='Album' className='w-[25%] xl:w-[20%] mt-[28px] sm:mt-[45px] xl:mt-[55px]' />
                                <span className='text-center text-sm sm:text-xl font-semibold bg-[#eee] w-full pt-1.5 sm:pt-2.5 sm:pb-[5px]'>{album.albumTitle}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div> : <div><ImageList /></div>}
        </>
    );

}

export default AlbumList;