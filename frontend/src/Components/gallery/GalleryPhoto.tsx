import { ReactElement, useState } from "react";
import { deletePhoto } from "../../methods/fetchFunctions";
import styles from './GalleryPhoto.module.css';
import deleteSvg from '../svgs/delete-icon.svg';

// TypeScript interface to handle props
interface PhotoProps {
    url: string,
    photographer: string,
    _id: string | undefined,
    setDeleted: React.Dispatch<React.SetStateAction<boolean>>,
}

const GalleryPhoto = (props: PhotoProps): ReactElement => {
    const { url, photographer, _id, setDeleted } = props;
    const { gridItem, deleteIcon, img} = styles;
    const [deleteError, setDeleteError] = useState<string>();

    // DELETE PHOTO
    const handleDelete = async (): Promise<void> => {
        // await result success of delete request
        const { success } = await deletePhoto(_id);
        const user: string | null = sessionStorage.getItem('loggedIn');

        // if delete was unsuccessful, display error message
        if (!success) {
            setDeleteError('Failed to delete photo.')
        }

        // if successfull and user is logged in, set deleted = true
        if (success && user !== null) {
            setDeleted(true);
        };
    };

    return (
        <section className={gridItem}>
            <img className={deleteIcon} src={deleteSvg} onClick={handleDelete} alt="delete photo" />
            <img className={img} src={url} alt={`By ${photographer}`} />
            <p>{`by ${photographer}`}</p>
            <p style={{color: "red"}}>{deleteError}</p>
        </section>
    )
}

export default GalleryPhoto;