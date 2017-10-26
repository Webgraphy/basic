$(function () {
    $(document).on('submit', '.form', function (e) {
        e.preventDefault();
        var form = this;

        var errors = 0;

        $(this).find('input[type="text"]:visible, textarea.required, input[type="checkbox"], select').each(function(data) {
            if ($(this).val() == '') {
                $(this).parent().addClass('has-error has-feedback');

                errors++;
            } else {
                $(this).parent().removeClass('has-error has-feedback');
            }

            if ($(this).attr('type') == 'checkbox') {
                if ($(this).is(':checked')) {
                    $(this).parents('.checkbox').removeClass('has-error has-feedback');
                } else {
                    $(this).parents('.checkbox').addClass('has-error has-feedback');

                    errors++;
                }
            }
        });

        if (errors == 0) {
            $.ajax({
                type: $(this).attr('method'),
                url: $(this).attr('action'),
                data: $(this).serialize(),
                resetForm: true,
                success: function (result) {
                    $(form).html('<h3>РЎРїР°СЃРёР±Рѕ!</h3><p>РРЅС„РѕСЂРјР°С†РёСЏ СѓСЃРїРµС€РЅРѕ РѕС‚РїСЂР°РІР»РµРЅР°.');
                }
            });
        }
    });

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
                items: 4
            }
        }
    });

    new WOW().init();
    $(':input').inputmask();
});