import ImageForm from "./ImageForm";
import backbtn from '../images/back.png';
import deletebtn from '../images/trash-bin.png';
import Carousel from "./Carousel";
import { useImage } from "../contextAPI/ImageContext";
import { useAlbum } from "../contextAPI/AlbumContext";

function ImageList(){

    const { carouselVisibility, imageFormVisible, setImageFormVisible, images, openCarousel, mouseLeave, mouseOver, handleDelete, hoveredIndex } = useImage();

    const { albumComponent, albumTitle } = useAlbum();

    return (
        <>

            <div className='flex flex-col rounded-xl gap-3 mx-auto my-0 w-[92%] sm:w-[65vw]'>

                {carouselVisibility ? <Carousel /> : ''}

                <div className='flex items-center justify-between mt-4'>

                    <span
                        className="items-center aspect-[1] bg-[#fcfcfc] shadow-[0_3px_8px_rgba(0,0,0,0.24)] cursor-pointer flex justify-center w-[35px] sm:w-[50px] mr-[30px] rounded-[50%]"
                        onClick={(e) => albumComponent(e)}
                    >
                        <img className="w-[20px] sm:w-[30px]" src={backbtn} alt="back" />
                    </span>

                    <h3 className="font-semibold text-lg sm:text-3xl">Images in {albumTitle}</h3>

                    <button
                        className={`${imageFormVisible ? 'bg-[rgba(255,19,0,.1)] text-[#ff1300] cursor-pointer font-bold px-1 text-sm py-[2px] sm:px-2.5 sm:py-[5px] rounded-[5px] border-2 border-solid border-[#ff1300]' : 'bg-[rgba(0,119,255,0.1)] text-[#07f] cursor-pointer font-bold px-1 text-sm py-[2px] sm:px-2.5 sm:py-[5px] rounded-[5px] border-2 border-solid border-[#07f]'}`} 
                        onClick={() => setImageFormVisible(!imageFormVisible)}
                    >
                        {imageFormVisible ? 'Cancel' : 'Add Image'}
                    </button>

                </div>

                {imageFormVisible ? <ImageForm /> : ''}

                <div className='w-[98%] sm:w-[67vw] gap-[15px] flex justify-start flex-wrap mt-5 my-0'>

                    {images.map((image, i) => (
                        
                        <div key={i} className='flex flex-col w-[47%] lg:w-[31%] h-[145px] cursor-pointer relative shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] mb-5 p-2.5 pb-0 rounded-[5px]' onMouseLeave={() => mouseLeave(i)} onMouseEnter={() => mouseOver(i)}>
                            
                            <div onClick={() => handleDelete(image)} className={`absolute right-[-15px] top-[-15px] transition-[0.3s] border-none outline-none ${hoveredIndex === i ? 'block' : 'hidden'}`}>
                                <img className="w-[35px]" src={deletebtn} alt="delete" />
                            </div>
                            
                            <img className="h-[80%] object-cover w-full" src={image.url} alt={image.imgTitle} onClick={() => openCarousel(i)} />
                            <span className="text-center">{image.imgTitle}</span>

                        </div>

                    ))}

                </div>

            </div>

        </>
    );

}

export default ImageList;