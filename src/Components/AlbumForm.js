// Importing css modules
import AlbumFormStyles from './AlbumForm.module.css';

function AlbumForm(props){

    return (
        <>
            <div className={AlbumFormStyles.container}>
                
                <span className={AlbumFormStyles.heading}>Add an Album</span>
                <form className={AlbumFormStyles.form} onSubmit={(e) => props.addAlbum(e)}>
                    <input className={AlbumFormStyles.formInput} placeholder='Album name' value={props.title} onChange={(e) => props.albumName(e)} />
                    <button className={AlbumFormStyles.addbtn} type="submit">Add</button>
                    <button className={AlbumFormStyles.deletebtn} type="submit" onClick={(e) => props.clearName(e)}>Clear</button>
                </form>

            </div>
        </>
    );

}

export default AlbumForm;