(function ($) {
  "use strict";

  window.peerToPeer = $.extend({}, {

    init: function () {
      peerToPeer.initActiveLink();
      peerToPeer.initOpenModal();
      peerToPeer.initTabs();
      peerToPeer.initShowHideRewiews();
      peerToPeer.initUploadImage();
      peerToPeer.initCopyToClipboard();
      peerToPeer.initQrCode();
      peerToPeer.initTimer();
      peerToPeer.initHideBannerAccountClosed();
      peerToPeer.initToggleHeaderIcon();
      peerToPeer.initHeaderCabinetMenu();
      peerToPeer.initScrollDownChat();
      peerToPeer.initAutoCloseMenu();
      peerToPeer.initshowAuthentication();
      peerToPeer.initshowUploadedFiles();
      peerToPeer.initSelect();
      peerToPeer.initAccordion();
      peerToPeer.initCustomSelect();
      peerToPeer.initWalletSelect();
      peerToPeer.initOpenChat();
      peerToPeer.initwowAnimate();
      peerToPeer.initSlickSlider();
    },

    initActiveLink: function () {
      let activeLink = $("#header__left-side_link li a");

      activeLink.each(function () {
        const location = window.location.href;
        const link = this.href;
        if (location == link) {
          $(this).addClass('header__left-side_selected');
        }
      });
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

    initShowHideRewiews: function () {
      const showChar = 120,
        ellipsesText = "..."

      $('.rewiews-list__content_item').each(function () {
        const content = $(this).html();

        if (content.length > showChar) {
          const rewiws = content.substr(0, showChar);
          const rewiwsShowchar = content.substr(showChar, content.length - showChar);

          const html = rewiws + '<span class="moreEllipses">' + ellipsesText + '</span><span class="morecontent"><span class="hideComment hideCommentStatic">' +
            rewiwsShowchar;

          $(this).html(html);
        }

        if (content.length > showChar) {
          $(this).closest('.rewiews-list_item').addClass('link-show');
        }
      });

      $(".rewiews-list_item").click(function (e) {
        e.preventDefault();

        $(this).toggleClass('openRewiews');
        $(this).siblings(".openRewiews").toggleClass('openRewiews');
      });
    },

    initUploadImage: function () {
      let fileUpload = $(".file-upload"),
        uploadButton = $(".upload-button"),
        avatarImg = $('.profile-wrapper__left-side_avatar-img');

      const readURL = function (input) {
        if (input.files && input.files[0]) {
          const reader = new FileReader();

          reader.onload = function (e) {
            avatarImg.attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);
        }
      }

      fileUpload.on('change', function () {
        readURL(this);
      });

      uploadButton.on('click', function () {
        fileUpload.click();
      });
    },

    initCopyToClipboard: function () {
      new ClipboardJS('.copyToClipboard');
    },

    initQrCode: function () {
      try {
        const qrcode = new QRCode("qrCode");

        function makeCode() {
          const elText = document.getElementById("qrCode");

          qrcode.makeCode(elText.getAttribute('data-qr-text'));
        }

        makeCode();

      } catch (e) {

      }
    },

    initTimer: function () {
      if (typeof localStorage.getItem("min") !== 'undefined' && typeof localStorage.getItem("sec") !== 'undefined' && localStorage.getItem("min") != null && localStorage.getItem("sec") != null) {
        var min = localStorage.getItem("min");
        var sec = localStorage.getItem("sec");
      } else {
        var min = "0" + 1;
        var sec = "0" + 0;
      }
      var time;

      setInterval(function () {
        localStorage.setItem("min", min);
        localStorage.setItem("sec", sec);
        time = min + " : " + sec;

        $('.timer').html(time);
        if (sec == "00") {
          if (min != 0) {
            min--;
            sec = 59;
            if (min < 10) {
              min = "0" + min;
            }
          }
        } else {
          sec--;
          if (sec < 10) {
            sec = "0" + sec;
          }
        }
      }, 1000);
    },

    initHideBannerAccountClosed: function () {
      let toggleClass = $(".banner-accountIsClosed__close-btn");

      toggleClass.on("click", function () {

        let bannerAccountIsClosed = $(".banner-accountIsClosed");
        $(this).closest(bannerAccountIsClosed).hide();
      });
    },

    initToggleHeaderIcon: function () {
      let toggleClass = $(".log-in-header__right-side_bell, .log-in-header__right-side_mute");

      toggleClass.on("click", function () {
        $(this).toggleClass("header-icon-active");
      });
    },

    initHeaderCabinetMenu: function () {
      let toggleClass = $(".dropdown-header");

      toggleClass.on("click", function () {
        $(this).toggleClass("menu-active");
      });

      let stopPropagation = $('.dropdown-header-list');
      stopPropagation.click(function (e) {
        e.stopPropagation();
      });
    },

    initScrollDownChat: function () {
      const scrollDown = $('#scrollDown');
      scrollDown.scrollTop(scrollDown.prop("scrollHeight"));
    },

    initAutoCloseMenu: function () {
      $(document).mouseup(function (e) {
        var block = $(".menu-active");
        if (!block.is(e.target)
          && block.has(e.target).length === 0) {
          block.toggleClass('menu-active');
        }
      });
    },

    initshowAuthentication: function () {
      let hideContainer = $(".accordion__authentication-container_right-side-btn"),
        container = $('.accordion__authentication-container'),
        open = $('.accordion__authentication-open'),
        cancel = $('.accordion__authentication-open_btn-wrapper_cancel');

      hideContainer.on("click", function () {
        $(this).closest(container).hide();
        $(this).closest(container).siblings(open).show();
      });

      cancel.on("click", function () {
        $(this).closest(open).hide();
        $(this).closest(open).siblings(container).show();
      });
    },

    initshowUploadedFiles: function () {
      const inputaddAvatar = $("#addAvatar"),
        inputaddFiles = $("#addFiles"),
        output = $(".verifyDocuments__info_addFiles_wrapper-list"),
        wrapper = $(".verifyDocuments__info_addFiles_wrapper");

      if (inputaddAvatar) {
        inputaddAvatar.on("change", function () {
          $(this)
          .closest(wrapper)
          .find(output)
          .html('<ul>');

          for (let i = 0; i < inputaddAvatar[0].files.length; ++i) {
            $(this)
            .closest(wrapper)
            .find(output)
            .html(output.html() + '<li><img src="./assets/img/cabinet/settings/file-icon.svg" alt="file-icon">' + inputaddAvatar[0].files.item(i).name + '</li>');
          }
          
          $(this)
          .closest(wrapper)
          .find(output)
          .html(output.html() + '</ul>');
        });
      };

      if (inputaddFiles) {

        inputaddFiles.on("change", function () {

          $(this).closest(wrapper).find(output).html('<ul>');

          for (let i = 0; i < inputaddFiles[0].files.length; ++i) {
            $(this).closest(wrapper).find(output).html($(this).closest(wrapper).find(output).html() + '<li><img src="./assets/img/cabinet/settings/file-icon.svg" alt="file-icon">' + inputaddFiles[0].files.item(i).name + '</li>');
          }

          $(this).closest(wrapper).find(output).html($(this).closest(wrapper).find(output).html() + '</ul>');
        });
      };
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

    initCustomSelect: function () {
      if (!$(".custom_select").length) return false;
      let toggleSelect = $(".toggleSelect"),
        selectOption = $(".selectOption");

      toggleSelect.each(function () {
        $(this).on("click", function () {
          $(this)
            .closest(".custom_select")
            .toggleClass("menu-active");
        });
      });
      selectOption.each(function () {
        $(this).on("click", function () {
          let newCurrency = $(this).attr("data-currency"),
            prevCurrency = $(this)
              .closest(".custom_select")
              .find(".custom_select__choosen")
              .attr("data-choosen");

          $(this)
            .closest(".custom_select")
            .find(".custom_select__choosen")
            .attr("data-choosen", newCurrency);
          $(this).attr("data-currency", prevCurrency);
          $(this)
            .closest(".custom_select")
            .toggleClass("menu-active");
          refreshItemData($(".custom_select__choosen"));
          refreshItemData($(this));
        });
      });

      function refreshItemData(item) {
        item.each(function () {
          if ($(this).attr("data-choosen")) {
            let data = $(this).attr("data-choosen");
            $(this)
              .find("span")
              .html($(this).attr("data-choosen"));
          } else {
            let data = $(this).attr("data-currency");
            $(this)
              .find("span")
              .html($(this).attr("data-currency"));
          }
        });
      }
    },

    initSelect: function () {
      $('select').niceSelect();
    },

    initWalletSelect: function () {
      let dropdownInput = $(".wallet-dropdown__input"),
          dropdown = $(".wallet-dropdown"),
          toggleSelect = $(".custom_select__option"),
          selectChoosen = $(".wallet-dropdown__choosen"),
          selectHeader = $(".custom_select__header"),
          selectOptions = $(".custom_select__options");

      toggleSelect.each(function () {
        $(this).on("click", function () {
          if ($(this).closest(selectOptions).siblings(selectChoosen).attr("data-choosen") === 'Your Personal Wallet') {
            $(this)
            .closest(selectHeader)
            .siblings(dropdownInput)
            .show();
            $(this)
            .closest(dropdown)
            .addClass('wallet-dropdown_open');
          } else {
            $(this)
            .closest(selectHeader)
            .siblings(dropdownInput)
            .hide();
            $(this)
            .closest(dropdown)
            .removeClass('wallet-dropdown_open');
          }
        });
      });
    },

    initOpenChat: function () {
      let openChat = $('.open-chat');

      openChat.each(function () {
        $(this).on('click', function () {

          let toggleText = $(this).find('span');
          toggleText.text(function(i, toggle){
               return toggle === 'open chat' ? 'hide chat' : 'open chat'
            });

          let $this = $(this),
            index = $('.open-chat').index($this),
            content = $('.chat__wrapper').eq(index);
          content.toggleClass("open-chat-disabled");
        })
      });
    },

    initwowAnimate: function () {
      new WOW().init();
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
    }
  });

  $(document).ready(function () {
    peerToPeer.init();
  });
})(jQuery);

const showBanner = function (title, subTitle, color) {

  return new Promise(function (resolve, reject) {

    try {
      const block = $('.banner-red'),
        titleFunc = $('.banner-red__title'),
        subTitleFunc = $('.banner-red__subTitle'),
        bannerFunc = $('.banner-accountIsClosed');

      block.css("display", "flex");
      titleFunc.html(title);
      subTitleFunc.html(subTitle);
      bannerFunc.css("background-color", color);
      resolve();
    }
    catch (error) {
      reject(console.log(error))
    }
  });
}