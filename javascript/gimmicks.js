window.gimmicks = window.gimmicks || {};
window.gimmicks.tuple = (image, name, description) => {
    return [image, name, description];
};

window.gimmicks.items = [
    window.gimmicks.tuple('image1.png', 'Item 1', 'Description for item 1'),
    window.gimmicks.tuple('image2.png', 'Item 2', 'Description for item 2'),
    window.gimmicks.tuple('image3.png', 'Item 3', 'Description for item 3')
];
