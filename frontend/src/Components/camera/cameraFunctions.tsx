import { PhotoObj } from "../../models/DataObjects";
import { CaptureOptions } from "../../models/CaptureOptions";

// ACCESS USER MEDIA
export const getVideo = (captureOptions: CaptureOptions, videoRef: React.RefObject<HTMLVideoElement>): void => {
    // getUserMedia function to get mediaStream
    navigator.mediaDevices.getUserMedia(captureOptions)
        .then((Stream: MediaStream): void => {
            // use videoRef to manage HTML element
            const video: HTMLVideoElement | null = videoRef.current;

            // if video element isn't null, set the acquired mediastream as srcObject and play video element 
            if (video !== null) {
                video.srcObject = Stream;
                video.play();
            };
        })
        .catch((err: Error): void => console.error(err));
};

// TAKE A PHOTO
export const takePhoto = (videoRef: React.RefObject<HTMLVideoElement>, photoRef: React.RefObject<HTMLCanvasElement>): void => {
    // set height and width to prepare photo render
    const width: number = 414;
    const height: number = width;

    // use refs to manage HTML elements
    const video: HTMLVideoElement | null = videoRef.current;
    const photo: HTMLCanvasElement | null = photoRef.current;

    // if elements are valid, set width and height properties of photo element
    if (photo !== null && video !== null) {
        photo.width = width;
        photo.height = height;

        // set rendering context to 2D
        const ctx: CanvasRenderingContext2D | null = photo.getContext('2d');
        
        if (ctx !== null) {
            // use canvas method to render image from media stream, use width and height to render photo of desired size
            ctx.drawImage(video, 0, 0, width, height);
        };
    };
};


// SAVE A TAKEN PHOTO - fetch POST request
export const savePhoto = async (photoRef: React.RefObject<HTMLCanvasElement>): Promise<any> => {
    // access taken photo by using ref
    const photo: HTMLCanvasElement | null = photoRef.current;
    // use canvas method to save photo as data URL
    const saved: string | undefined = photo?.toDataURL('image/jpeg', 0.1);
    // get current user from sessionStorage to determine photographer
    const photographer: string | null = sessionStorage.getItem('loggedIn');

    // if there is no saved photo or no photographer, return
    if (saved === undefined || photographer === null) {
        return;
    };
    
    // otherwise, prepare request object
    const photoObj: PhotoObj = {
        url: saved,
        photographer: photographer
    };

    // and make POST-request to server with above photo object
    try {
        const response: Response = await fetch('http://localhost:1337/gallery', {
            method: "POST",
            body: JSON.stringify(photoObj),
            headers: { "Content-Type": "application/json" },
        });

    } catch (err) {
        console.error('Error in posting photo: ', err);
    };
};