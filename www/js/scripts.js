$(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 0,
        dots: false,
        nav: true,
        navText: ['<i class="glyphicon glyphicon-chevron-left"></i>', '<i class="glyphicon glyphicon-chevron-right"></i>'],
        responsive: {
            0:{
                items: 2
            },
            600:{
                items: 4
            },
            1000:{
                items: 7
            }
        }
    })
});