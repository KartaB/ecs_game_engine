let imagesList = []

function AddImage(_name, _path) {
    let img = new Image();   // Create new img element
    img.src = _path; // Set source path

    imagesList[_name] = img
}

function GetImage(_name) {
    return imagesList[_name]
}

export default {
    AddImage,
    GetImage
}