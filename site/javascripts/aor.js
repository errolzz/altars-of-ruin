
(function() {
    $('.menu-button').click(function() {
        showMenu();
    });

    function showMenu() {
        $('.menu-button').hide();
        $('.main-menu').show();
        setTimeout(function() {
            $('body').on('click', hideMenu);
            $('body').on('touchend', hideMenu);
        }, 200);
    }

    function hideMenu(e) {
        if($(e.target).closest('.main-menu').length > 0) {
            console.log('in menu')
            return;
        }

        $('.menu-button').show();
        $('.main-menu').hide();
        setTimeout(function() {
            $('body').off('click', hideMenu);
            $('body').off('touchend', hideMenu);
        }, 200);
    }
})();