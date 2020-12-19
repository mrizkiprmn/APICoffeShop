const { uploader } = require("../Configs/cloudInary")

async function uploads(filePath) {
    try {
        let result = await uploader.upload(filePath, {
            folder: "products",
            use_filename: true,
        })
        return result.url
    } catch (error) {
        throw error
    }
}

module.exports = uploads