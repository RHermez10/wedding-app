"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const databases_1 = require("../databases/databases");
const router = express_1.default.Router();
// GET PHOTOS - depending on admin status
router.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // prepare response object
    let resObj = {
        success: false,
    };
    // check that request 'Authorization' header isn't undefined
    if (req.headers.authorization !== undefined) {
        // extract username from 'Authorization' header (to use when determining which photos to return)
        const user = req.headers.authorization.replace('Bearer ', '');
        // find user account to check if admin
        const account = yield databases_1.accounts.find({ username: user });
        let photoArray;
        // check if user is admin, in that case return all photos
        if (account[0].admin == true) {
            photoArray = yield databases_1.photos.find({});
        }
        else {
            // otherwise, only return photos taken by user
            photoArray = yield databases_1.photos.find({ photographer: user });
        }
        // if there are any photos, set success = true and put photos in response object
        if (photoArray.length > 0) {
            resObj.success = true;
            resObj.data = photoArray;
        }
        ;
    }
    ;
    // send response object to client
    res.json(resObj);
}));
// POST PHOTOS - post a new photo to database
router.post('', (req, res) => {
    const photoObj = req.body;
    databases_1.photos.insert(photoObj);
    res.status(200).send('OK!');
});
// DELETE PHOTO - delete photo by id
router.delete('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = { success: false };
    // extract id from request body and remove corresponding photo object in database
    const photoId = req.body.id;
    const removed = yield databases_1.photos.remove({ _id: photoId }, {});
    // if any pictures were removed, set success = true
    if (removed > 0) {
        result.success = true;
    }
    res.json(result);
}));
module.exports = router;
