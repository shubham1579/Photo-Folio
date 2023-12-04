// Importing css modules
import { useAlbum } from '../contextAPI/AlbumContext';

function AlbumForm(){

    const { addAlbum, title, albumName } = useAlbum();

    return (
        <>
            <div className='bg-[#f4f4f4] shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] flex flex-col gap-2.5 w-[92%] sm:w-[67vw] mt-8 sm:mt-[50px] mb-[30px] mx-auto p-3 sm:p-5 rounded-[10px]'>
                
                <span className='font-semibold text-xl sm:text-2xl'>Add an Album</span>
                <form className='flex items-center justify-evenly gap-[10px]' onSubmit={(e) => addAlbum(e)}>
                    <input className='text-base sm:text-[1.2rem] font-light transition-[0.3s] w-3/5 pl-[10px] sm:pl-[15px] pr-2.5 sm:py-2.5 rounded-[30px] border-[3px] border-solid border-transparent outline-none placeholder:text-sm sm:placeholder:text-lg' placeholder='Album name' value={title} onChange={(e) => albumName(e)} />
                    <button className='bg-[#07f] shadow-[0_3px_8px_rgba(0,0,0,0.24)] text-white cursor-pointer text-sm sm:text-[1.1rem] font-semibold w-[70px] sm:w-[100px] rounded-[7px] border-none py-1 sm:py-2' type="submit">Add</button>
                    <button className='bg-[#ff1300] shadow-[0_3px_8px_rgba(0,0,0,0.24)] text-white cursor-pointer text-sm sm:text-[1.1rem] font-semibold w-[70px] sm:w-[100px] rounded-[7px] border-none py-1 sm:py-2' type="reset">Clear</button>
                </form>

            </div>
        </>
    );

}

export default AlbumForm;