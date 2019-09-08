/**
 * Application assets config (used in the App and Webpack builder)
 */
var glob = require("glob");


module.exports = {
    build_directory : "build",
    assets_map : {
        vendor: [
            './src/assets/js/vendor/style-vendor.js',
            // './src/assets/vendors/before-after/before-after.js',
        ],
        app: [
            './src/assets/js/app/style-app.js',
            './src/assets/js/app/indexPage.js',
        ],
        images: glob.sync("./src/assets/images/nonoptimised/*.*"),
        // icons: glob.sync("./src/assets/images/favicons/*.*"),
        // svg: glob.sync("./src/assets/images/svg/*.*")
    }
};
