import { ReactElement, useEffect, useState } from "react";
import { fetchUserPhotos } from "../../methods/fetchFunctions";
import { PhotoObj } from "../../models/DataObjects";
import GalleryPhoto from "./GalleryPhoto";
import styles from './Gallery.module.css';


const Gallery = (): ReactElement => {
    // get user from sessionStorage to use in fetch request
    const user: string | null = sessionStorage.getItem('loggedIn');
    
    // use state to cause re-render with updated photo data
    const [photoObjects, setPhotoObjects] = useState<PhotoObj[]>();
    const [deleted, setDeleted] = useState<boolean>(false);

    // function to fetch photos and set state
    const getUserPhotos = async (user: string): Promise<void> => {
        const userPhotos: PhotoObj[] = await fetchUserPhotos(user);
        setPhotoObjects(userPhotos);
    };

    // render one JSX element for each photo, pass down getUserPhotos to enable re-render after delete
    const renderedPhotos: JSX.Element[] | undefined = photoObjects?.map(photo =>
        < GalleryPhoto setDeleted={setDeleted} url={photo.url} photographer={photo.photographer} _id={photo._id} key={photo._id} />
    )

    // run fetch function at render
    useEffect((): void => { 
        if( user !== null ) {
            getUserPhotos(user) }
        }, [user]);

    useEffect((): void => {
        if(deleted && user !== null){
            getUserPhotos(user);
            setDeleted(false);
        } 
    }, [deleted, user]);

    return (
        <article className={photoObjects ? "gallery" : styles.gallery} >
            {photoObjects ? null: <h3>Take some photos!</h3>}
            <div className={styles.gridContainer}>
                {renderedPhotos}
            </div>
            
        </article>
    )
}

export default Gallery;