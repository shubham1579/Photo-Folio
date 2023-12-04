import { useImage } from '../contextAPI/ImageContext';

function Carousel(){

    const { endCarousel, previousImage, nextImage, image } = useImage();

    return (
        <>
            <div className='flex items-center justify-center gap-7 fixed z-50 inset-0 bg-[rgba(0,0,0,.5)] px-2'>
                <button
                    onClick={(e) => endCarousel(e)}
                    className='absolute right-2 top-2 sm:right-12 sm:top-12 flex items-center justify-center aspect-auto-[1] border-none cursor-pointer rounded-[50%] text-lg sm:text-2xl font-semibold outline-none transition-[.3s] w-[45px] sm:w-[60px] bg-white py-2 sm:py-3'
                >
                    X
                </button>
                <button 
                    onClick={(e) => previousImage(e)} 
                    className='flex items-center justify-center aspect-auto-[1] border-none cursor-pointer rounded-[50%] text-2xl font-semibold outline-none transition .3s w-[45px] sm:w-[60px] bg-white py-0.5 sm:py-3'
                >
                    &lt;
                </button>
                <img
                    className='h-4/5 w-[60vw] object-fill'
                    src={image.url} alt={image.alt} 
                />
                <button 
                    onClick={(e) => nextImage(e)}
                    className='flex items-center justify-center aspect-auto-[1] border-none cursor-pointer rounded-[50%] text-2xl font-semibold outline-none transition .3s w-[45px] sm:w-[60px] bg-white py-0.5 sm:py-3'
                >
                    &gt;
                </button>
            </div>
        </>
    );

}

export default Carousel;