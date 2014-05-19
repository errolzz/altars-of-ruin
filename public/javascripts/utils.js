var U = {};

U.findOne = function(array, key, value) {
    for (var i = array.length - 1; i >= 0; i--) {
        if(array[i][key] === value) {
            return array[i];
        }
    };
}

U.removeOne = function(array, item) {
    for (var i = array.length - 1; i >= 0; i--) {
        if(array[i] == item) {
            return array.splice(i, 1)[0];
        }
    };
}

U.scrollTo = function(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        U.scrollTo(element, to, duration - 10);
    }, 10);
}

U.clearSelection = function() {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
    return false;
}

//level 2 = 10 kills
//level 10 = 42 kills
//level 20 = 82 kills
//level 50 = 206 kills
U.calculateXpToLevel = function(heroLevel) {
    return heroLevel * (6 + heroLevel * 1); //DEVNOTE: * 4
}

U.getParentByClass = function(element, className) {
    var parent = element.parentNode,
        loops = 0;

    while(checkParentClasses(parent, className).match == false && loops < 1000 && parent.nodeName != 'HTML') {
        parent = parent.parentNode;
        loops++;
    }

    return loops == 1000 ? null : parent;
}

function checkParentClasses(element, className) {
    var parentClasses = element.className.split(' ');

    for (var i = parentClasses.length - 1; i >= 0; i--) {
        if(className == parentClasses[i]) {
            return {el: element, match: true};
        }
    };

    return {el: element.parentNode, match: false};
}

var a = ['a','b','c','d','e','f','g','h'];
U.getWeightedItem = function(array, mostLikelyIndex, minChance, maxChance) {
    var roll = Math.random();
    //which end of the array is farther from the mostLikelyIndex
    var farthestItemFromIndex = mostLikelyIndex >= Math.floor(array.length / 2) ? array.length - 1 : 0;

    //figure out chance increment based on min, max, and item index
    var increment = 0;
    //bind sections of a 0-1 roll to the range of array items
    //0.5-1 = 'f'
    //
}

/*
    
a10 b c d e f g60 h i

*/