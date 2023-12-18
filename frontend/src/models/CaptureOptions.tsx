// TypeScript interface for capture options to use when requesting user media
export interface CaptureOptions {
    audio: boolean,
    video: boolean | {
        width: number | { ideal: number },
        height: number | { ideal: number }
    }
};

// the specific options we want to use
export const videoOptions: CaptureOptions = {
    audio: false,
    video: { width: {ideal: 720}, height: {ideal: 720} }
};