import CarouselStyle from './Carousel.module.css';

function Carousel(props){

    return (
        <>
            <div className={CarouselStyle.container}>
                <button onClick={(e) => props.endCarousel(e)}>X</button>
                <button onClick={(e) => props.previousImage(e)}>&lt;</button>
                <img src={props.url} alt={props.alt} />
                <button onClick={(e) => props.nextImage(e)}>&gt;</button>
            </div>
        </>
    );

}

export default Carousel;