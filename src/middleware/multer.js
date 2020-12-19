const multer = require ("multer")

const storages = multer.diskStorage({
    destination: "public/upload",
    filename : (req, file, cb) => {
        cb(null, new Date().toDateString() + "-" + file.originalname)
    }
})

const filter = (req, file, cb) => {
    if(file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
       cb(null, true)
    } else {
        cb(null, false)
    }
}



const upload = multer({
    storage : storages,
    fileFilter : filter
})

module.exports = upload;