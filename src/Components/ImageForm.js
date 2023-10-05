import ImageFormStyles from './ImageForm.module.css';

function ImageForm(props){

    return (
        <>
            <div className={ImageFormStyles.container}>
                <span className={ImageFormStyles.heading}>Add image to Album</span>
                <form className={ImageFormStyles.form} onSubmit={(e) => props.addImage(e)}>
                    <input className={ImageFormStyles.Input} placeholder='Title' value={props.title} onChange={(e) => props.imageTitle(e)} />
                    <input className={ImageFormStyles.Input} placeholder='Image URL' value={props.url} onChange={(e) => props.imageURL(e)} />
                    <div className={ImageFormStyles.actions}>
                        <button className={ImageFormStyles.addbtn} type="submit">{props.btnText}</button>
                        <button className={ImageFormStyles.deletebtn} type="submit" onClick={(e) => props.clearFields(e)}>Clear</button>
                    </div>
                </form>
            </div>
        </>
    );

}

export default ImageForm;