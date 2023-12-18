import { ReactElement, useEffect, useRef, useState } from "react";
import { videoOptions } from "../../models/CaptureOptions";
import { getVideo, takePhoto, savePhoto } from "./cameraFunctions";
import styles from './Camera.module.css';

const Camera = (): ReactElement => {
    // create refs to be able to update element attributes
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);

    // create 'captured' state to update camera button text
    const [captured, setCaptured] = useState<boolean>(false);

    // capture function to take a photo when camera button is clicked
    const capture = (): void => {
        // Take photo and save photo
        takePhoto(videoRef, photoRef);
        savePhoto(photoRef);

        // Show photo by toggling CSS class
        videoRef.current?.classList.toggle(styles.hidden);
        photoRef.current?.classList.toggle(styles.hidden);

        // Set state to handle button rerender
        setCaptured(true);
    };

    // function to switch back to displaying media stream 
    const backToCamera = (): void => {
        // Show stream by toggling CSS classs
        videoRef.current?.classList.toggle(styles.hidden);
        photoRef.current?.classList.toggle(styles.hidden);

        // Set state to handle button rerender
        setCaptured(false);
    };

    // cause re-render when user has approved camera usage (to display media stream)
    useEffect((): void => {
        getVideo(videoOptions, videoRef);
    }, [videoRef]);

    return (
        <section className={styles.Camera}>
            <section className={styles.cameraContainer} >
                <video className={styles.video} ref={videoRef} />
                <canvas className={`${styles.photo} ${styles.hidden}`} ref={photoRef} />
            </section>
            <button className="button" onClick={captured ? backToCamera : capture}>{captured ? 'Fånga ett nytt ögonblick' : 'Föreviga ett ögonblick'}</button>
        </section>
    )
};

export default Camera;