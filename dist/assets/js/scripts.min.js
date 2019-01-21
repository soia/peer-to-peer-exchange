(function ($) {
  "use strict";

  window.inflot = $.extend({}, {

    init: function () {
      inflot.initOpenModal();

      
      inflot.initMenu();
      inflot.initSearch();
      inflot.initLiked();
      inflot.initTabs();
      inflot.initAccordion();
      inflot.initHideAccordion();
      inflot.initShowHideRewiews();
      inflot.initPreloader();
      inflot.initSelect();
      inflot.initDeckSelect();
      inflot.initDatePicker();
      inflot.initSlickSlider();
    },

    initOpenModal: function () {
      $('.popUp').magnificPopup({
        delegate: 'a',
        removalDelay: 500,
        callbacks: {
          beforeOpen: function () {
            this.st.mainClass = this.st.el.attr('data-effect');
          }
        },
        midClick: true
      });
    },



    initMenu: function () {
      let dynamicMenu = $("#menu"),
        btnMenu = $(".btnMenu"),
        body = $("#body"),
        svg = $("#svg")

      btnMenu.on("click", function () {
        dynamicMenu.toggleClass("menu_visible");
        body.toggleClass("overflow-hidden");
        svg.toggleClass('active-header-menu');
      });
    },

    initSearch: function () {
      let btn = $(".header__right-side_search"),
        input = $(".search-box-input")

      btn.click(function () {
        input.toggleClass("active").focus;
        input.val("");
      });
    },

    initLiked: function () {
      let likeClicked = $('.like-id-click')

      likeClicked.each(function () {
        $(this).on('click', function () {
          let $this = $(this),
            index = $('.like-id-click').index($this),
            content = $('.like path').eq(index);
          content.toggleClass("like-clicked");
        })
      });
    },

    initTabs: function () {
      $('ul.tab-container__tab .tab-link').click(function () {
        let tab_id = $(this).attr('data-tab');

        $('ul.tab-container__tab .tab-link').removeClass('selected-item');
        $('.tab-content-remove').removeClass('selected-item');

        $(this).addClass('selected-item');
        $("#" + tab_id).addClass('selected-item');
      })

      $('ul.tab-container__tab .tab-team').click(function () {
        let tab_id = $(this).attr('data-tab');

        $('ul.tab-container__tab .tab-team').removeClass('selected-item');
        $('.team-tab-remove').removeClass('selected-item');

        $(this).addClass('selected-item');
        $("#" + tab_id).addClass('selected-item');
      })
    },

    initAccordion: function () {
      $(function () {
        $(".accordion").accordion({
          collapsible: true,
          heightStyle: "content"
        });

      });

      $(function () {
        let icons = {
          header: "ui-icon-plus",
          activeHeader: "ui-icon-minusthick"
        };
        $(".accordion").accordion({
          icons: icons,
          icons: icons
        });
        $("#toggle").button().on("click", function () {
          if ($(".accordion").accordion("option", "icons")) {
            $(".accordion").accordion("option", "icons", null);
          } else {
            $(".accordion").accordion("option", "icons", icons);
          }
        });
      });
    },

    initHideAccordion: function () {
      let btnAccordion = $('.btn-accordion')

      btnAccordion.on('click', function (e) {
        e.preventDefault();

        let $this = $(this),
          index = $('.btn-accordion').index($this),
          content = $('.hideAccordion').eq(index);

        if (!$this.hasClass('trigger')) {
          $this.addClass('trigger');
          $this.html('Скрыть');

          content.slideDown();
        } else {
          $this.removeClass('trigger');
          $this.html('Показать');

          content.slideUp();
        }
      });
    },

    initShowHideRewiews: function () {
      let showChar = 100,
        ellipsesText = "...",
        moretext = "Читать далее",
        lesstext = "Скрыть"

      $('.rewiews-list__content_item').each(function () {
        let content = $(this).html();

        if (content.length > showChar) {

          let rewiws = content.substr(0, showChar);
          let rewiwsShowchar = content.substr(showChar - 1, content.length - showChar);

          let html = rewiws + '<span class="moreEllipses">' + ellipsesText + '</span><span class="morecontent"><span class="hideComment hideCommentStatic">' +
            rewiwsShowchar + '</span><a href="" class="rewiews-list__link">' + moretext + '</a></span>';

          $(this).html(html);
        }

      });

      $(".rewiews-list_item").click(function (e) {
        e.preventDefault();

        $(this).toggleClass('openRewiews');

        let $this = $(this),
          index = $('.rewiews-list_item').index($this),
          itemLink = $('.rewiews-list__link').eq(index),
          moreEllipses = $('.moreEllipses').eq(index),
          hideCommentStatic = $('.hideCommentStatic').eq(index)

        if (itemLink.hasClass("less")) {
          itemLink.removeClass("less");
          itemLink.html(moretext);
        } else {
          itemLink.addClass("less");
          itemLink.html(lesstext);
        }

        moreEllipses.toggle();
        hideCommentStatic.toggleClass('hideComment');

        return false;
      });
    },

    initPreloader: function () {
      setTimeout(function () {
        $('#preloader').fadeOut();
        $('.loader').delay(600).fadeOut('slow');
      }, 300);
    },

    initSelect: function () {
      $('select').niceSelect();
    },

    initDeckSelect: function () {
      let deckDrop = $('#deck-drop'),
        img = $('#deck-img')

      deckDrop.niceSelect('update');

      deckDrop.on('change', function () {
        let url = $(this).find(':selected').data('price');
        img.attr('src', url);
      });
    },

    initDatePicker: function () {

      $('.datepicker-here').datepicker({
        autoClose: true,
        minDate: new Date()
      });

      $('.datepicker-range').datepicker({
        autoClose: true,
        range: true,
        multipleDatesSeparator: "  -  ",
        minDate: new Date()
      });
    },

    initSlickSlider: function () {
      $(".header__wrapper-slider").slick({
        infinite: true,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              arrows: false
            }
          }
        ]
      });

      $('.compositionApplication').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        responsive: [
          {
            breakpoint: 9999,
            settings: "unslick"
          },
          {
            breakpoint: 1024,
          },
          {
            breakpoint: 768,
            settings: {
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
            }
          }
        ]
      });

      $('.requestDesktopSlider').slick({
        slidesToShow: 9,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        responsive: [
          {
            breakpoint: 1250,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 4,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      });

      $(".wrapper-small-slider").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1250,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              centerMode: true,
              variableWidth: false,
              centerPadding: '60px',

            }
          }
        ]
      });

      $(".wrapper-medium-slider").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1250,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              centerMode: true,
              variableWidth: false,
              centerPadding: '60px'

            }
          }
        ]
      });

      $('.mobile-slider').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 9999,
            settings: "unslick"
          },
          {
            breakpoint: 1024,
            settings: "unslick"
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              arrows: false
            }
          }
        ]
      });

      $(".cabins-slider").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,

        responsive: [
          {
            breakpoint: 1250,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1.2,
              slidesToScroll: 1,
              arrows: false
            }
          }
        ]
      });

      $(".documents__slider").slick({
        infinite: true,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,

        responsive: [
          {
            breakpoint: 1250,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              autoplay: false
            }
          }
        ]
      });

      $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav',
        autoplay: false,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              variableWidth: true,
              fade: false
            }
          }
        ]
      });

      $('.slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        focusOnSelect: true
      });
    }
  });

  $(document).ready(function () {
    inflot.init();
  });
})(jQuery);