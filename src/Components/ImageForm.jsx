import { useImage } from '../contextAPI/ImageContext';

function ImageForm(){

    const { addImage, title, imageTitle, url, imageURL } = useImage();

    return (
        <>
            <div className='bg-[#f4f4f4] shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] flex flex-col gap-2.5 w-[98%] sm:w-[50vw] mx-auto my-0 md:mt-2 p-5 rounded-[10px]'>
                <span className='font-semibold text-lg sm:text-2xl'>Add image to Album</span>
                <form className='flex flex-col gap-[20px]' onSubmit={(e) => addImage(e)}>
                    <input className='text-base sm:text-[1.2rem] font-light transition-[0.3s] pl-[10px] sm:pl-[15px] pr-2.5 sm:py-2.5 rounded-[30px] border-[3px] border-solid border-transparent outline-none placeholder:text-sm lg:placeholder:text-lg' placeholder='Title' value={title} onChange={(e) => imageTitle(e)} />
                    <input className='text-base sm:text-[1.2rem] font-light transition-[0.3s] pl-[10px] sm:pl-[15px] pr-2.5 sm:py-2.5 rounded-[30px] border-[3px] border-solid border-transparent outline-none placeholder:text-sm lg:placeholder:text-lg' placeholder='Image URL' value={url} onChange={(e) => imageURL(e)} />
                    <div className='flex justify-center items-start gap-7'>
                        <button className='bg-[#07f] shadow-[0_3px_8px_rgba(0,0,0,0.24)] text-white cursor-pointer text-sm sm:text-[1.1rem] font-semibold w-[70px] sm:w-[100px] rounded-[7px] border-none py-1 sm:py-2' type="submit">Add</button>
                        <button className='bg-[#ff1300] shadow-[0_3px_8px_rgba(0,0,0,0.24)] text-white cursor-pointer text-sm sm:text-[1.1rem] font-semibold w-[70px] sm:w-[100px] rounded-[7px] border-none py-1 sm:py-2' type="reset">Clear</button>
                    </div>
                </form>
            </div>
        </>
    );

}

export default ImageForm;