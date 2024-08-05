const imagePreview = (file) => {
    return new Promise((resolve, reject) => {
        if (!file || !file.type.startsWith('image/')) {
            alert("The file is not an image")
            reject(new Error('The file is not an image.'));
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            const imageUrl = URL.createObjectURL(file);
            resolve(imageUrl);
        };

        reader.onerror = function (error) {
            alert("Something went wrong")
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}

export default imagePreview;
