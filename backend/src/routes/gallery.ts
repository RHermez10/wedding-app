import express from 'express';
import { Account, accounts, Photo, photos, ResObj } from '../databases/databases';
const router = express.Router();

// GET PHOTOS - depending on admin status
router.get('', async (req, res) => {
    // prepare response object
    let resObj: ResObj = {
        success: false,
    }

    // check that request 'Authorization' header isn't undefined
    if (req.headers.authorization !== undefined) {
        // extract username from 'Authorization' header (to use when determining which photos to return)
        const user = req.headers.authorization.replace('Bearer ', '');

        // find user account to check if admin
        const account: Account[] = await accounts.find({ username: user });
        let photoArray: Photo[];

        // check if user is admin, in that case return all photos
        if (account[0].admin == true) {
            photoArray = await photos.find({});
        } else {
            // otherwise, only return photos taken by user
            photoArray = await photos.find({ photographer: user });
        }

        // if there are any photos, set success = true and put photos in response object
        if (photoArray.length > 0) {
            resObj.success = true;
            resObj.data = photoArray;
        };
    };

    // send response object to client
    res.json(resObj);
});

// POST PHOTOS - post a new photo to database
router.post('', (req, res) => {
    const photoObj = req.body;

    photos.insert(photoObj);

    res.status(200).send('OK!');
});

// DELETE PHOTO - delete photo by id
router.delete('', async (req, res) => {
    let result: ResObj = {success: false};

    // extract id from request body and remove corresponding photo object in database
    const photoId: string = req.body.id;
    const removed: number = await photos.remove({ _id: photoId }, {});

    // if any pictures were removed, set success = true
    if (removed > 0) {
        result.success = true;
    } 

    res.json(result);
});

module.exports = router;