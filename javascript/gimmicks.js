global.gimmicks = global.gimmicks || {};
global.gimmicks.tuple = (image, name, description) => {
    return [image, name, description];
};

global.gimmicks.items = [
    global.gimmicks.tuple('image1.png', 'Item 1', 'Description for item 1'),
    global.gimmicks.tuple('image2.png', 'Item 2', 'Description for item 2'),
    global.gimmicks.tuple('image3.png', 'Item 3', 'Description for item 3')
];
