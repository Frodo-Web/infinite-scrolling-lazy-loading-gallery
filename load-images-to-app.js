const fs = require("fs");
const path = require("path");
const relativeArrayPath = './src/Application/IMAGE.js';
const relativeImagesPath = './docs/images';
const dirname = path.resolve(relativeImagesPath);


async function readDir(dirname) {
    const allResults = [];

    try {
        const files = await fs.promises.readdir(dirname);

        for (const fileName of files) {
            allResults.push('./images/' + fileName);
        }
        return allResults;
    } catch (error) {
        console.log(error);
    }
}

readDir(dirname).then(data => {
    const images = JSON.stringify(data);
    const str = 'const IMAGE = ' + '\n' + images + ';' + '\n\n' + 'export default IMAGE;';
    fs.writeFile(
        path.resolve(relativeArrayPath),
        str,
        function (err) {
            if (err) {
                console.error(err);
            }
        }
    );
});