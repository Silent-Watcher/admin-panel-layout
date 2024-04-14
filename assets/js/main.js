(function ($) {
  'use strict';
  /*--
    Commons Variables
-----------------------------------*/
  let $window = $(window);
  let $body = $('body');

  /*--
    Adomx Dropdown (Custom Dropdown)
-----------------------------------*/
  if ($('.adomx-dropdown').length) {
    let $adomxDropdown = $('.adomx-dropdown'),
      $adomxDropdownMenu = $adomxDropdown.find('.adomx-dropdown-menu');

    $adomxDropdown.on('click', '.toggle', function (e) {
      e.preventDefault();
      let $this = $(this);
      if (!$this.parent().hasClass('show')) {
        $adomxDropdown.removeClass('show');
        $adomxDropdownMenu.removeClass('show');
        $this
          .siblings('.adomx-dropdown-menu')
          .addClass('show')
          .parent()
          .addClass('show');
      } else {
        $this
          .siblings('.adomx-dropdown-menu')
          .removeClass('show')
          .parent()
          .removeClass('show');
      }
    });
    /*Close When Click Outside*/
    $body.on('click', function (e) {
      let $target = e.target;
      if (
        !$($target).is('.adomx-dropdown') &&
        !$($target).parents().is('.adomx-dropdown') &&
        $adomxDropdown.hasClass('show')
      ) {
        $adomxDropdown.removeClass('show');
        $adomxDropdownMenu.removeClass('show');
      }
    });
  }

  /*--
    Header Search Open/Close
-----------------------------------*/
  let $headerSearchOpen = $('.header-search-open'),
    $headerSearchClose = $('.header-search-close'),
    $headerSearchForm = $('.header-search-form');
  $headerSearchOpen.on('click', function () {
    $headerSearchForm.addClass('show');
  });
  $headerSearchClose.on('click', function () {
    $headerSearchForm.removeClass('show');
  });

  /*--
    Side Header
-----------------------------------*/
  let $sideHeaderToggle = $('.side-header-toggle'),
    $sideHeaderClose = $('.side-header-close'),
    $sideHeader = $('.side-header');

  /*Add/Remove Show/Hide Class On Depending on Viewport Width*/
  function $sideHeaderClassToggle() {
    let $windowWidth = $window.width();
    if ($windowWidth >= 1200) {
      $sideHeader.removeClass('hide').addClass('show');
    } else {
      $sideHeader.removeClass('show').addClass('hide');
    }
  }
  $sideHeaderClassToggle();
  /*Side Header Toggle*/
  $sideHeaderToggle.on('click', function () {
    if ($sideHeader.hasClass('show')) {
      $sideHeader.removeClass('show').addClass('hide');
    } else {
      $sideHeader.removeClass('hide').addClass('show');
    }
  });
  /*Side Header Close (Visiable Only On Mobile)*/
  $sideHeaderClose.on('click', function () {
    $sideHeader.removeClass('show').addClass('hide');
  });

  /*--
    Side Header Menu
-----------------------------------*/
  let $sideHeaderNav = $('.side-header-menu'),
    $sideHeaderSubMenu = $sideHeaderNav.find('.side-header-sub-menu');

  /*Add Toggle Button in Off Canvas Sub Menu*/
  $sideHeaderSubMenu
    .siblings('a')
    .append(
      '<span class="menu-expand"><i class="zmdi zmdi-chevron-down"></i></span>'
    );

  /*Close Off Canvas Sub Menu*/
  $sideHeaderSubMenu.slideUp();

  /*Category Sub Menu Toggle*/
  $sideHeaderNav.on('click', 'li a, li .menu-expand', function (e) {
    let $this = $(this);
    if (
      $this.parent('li').hasClass('has-sub-menu') ||
      $this.attr('href') === '#' ||
      $this.hasClass('menu-expand')
    ) {
      e.preventDefault();
      if ($this.siblings('ul:visible').length) {
        $this
          .parent('li')
          .removeClass('active')
          .children('ul')
          .slideUp()
          .siblings('a')
          .find('.menu-expand i')
          .removeClass('zmdi-chevron-up')
          .addClass('zmdi-chevron-down');
        $this
          .parent('li')
          .siblings('li')
          .removeClass('active')
          .find('ul:visible')
          .slideUp()
          .siblings('a')
          .find('.menu-expand i')
          .removeClass('zmdi-chevron-up')
          .addClass('zmdi-chevron-down');
      } else {
        $this
          .parent('li')
          .addClass('active')
          .children('ul')
          .slideDown()
          .siblings('a')
          .find('.menu-expand i')
          .removeClass('zmdi-chevron-down')
          .addClass('zmdi-chevron-up');
        $this
          .parent('li')
          .siblings('li')
          .removeClass('active')
          .find('ul:visible')
          .slideUp()
          .siblings('a')
          .find('.menu-expand i')
          .removeClass('zmdi-chevron-up')
          .addClass('zmdi-chevron-down');
      }
    }
  });

  // Adding active class to nav menu depending on page
  let pageUrl = window.location.href.substr(
    window.location.href.lastIndexOf('/') + 1
  );
  $('.side-header-menu a').each(function () {
    if ($(this).attr('href') === pageUrl || $(this).attr('href') === '') {
      $(this)
        .closest('li')
        .addClass('active')
        .parents('li')
        .addClass('active')
        .children('ul')
        .slideDown()
        .siblings('a')
        .find('.menu-expand i')
        .removeClass('zmdi-chevron-down')
        .addClass('zmdi-chevron-up');
    } else if (
      window.location.pathname === '/' ||
      window.location.pathname === '/index.html'
    ) {
      $('.side-header-menu a[href="index.html"]')
        .closest('li')
        .addClass('active')
        .parents('li')
        .addClass('active')
        .children('ul')
        .slideDown()
        .siblings('a')
        .find('.menu-expand i')
        .removeClass('zmdi-chevron-down')
        .addClass('zmdi-chevron-up');
    }
  });

  $window.on('load', function () {
    // dark mode
    const toggleDARK = document.querySelector('.toggle-dark');
    toggleDARK.addEventListener('click', function () {
      if (document.body.classList.contains('skin-dark')) {
        document.body.classList.remove('skin-dark');
        this.firstElementChild.src = 'assets/images/moon.svg';
        $body.removeClass(function (index, className) {
          return (className.match(/\bheader-top-\S+/g) || []).join(' ');
        });
        $body.removeClass(function (index, className) {
          return (className.match(/\bside-header-\S+/g) || []).join(' ');
        });
      } else {
        document.body.classList.add('skin-dark');
        this.firstElementChild.src = 'assets/images/sun.svg';
      }
    });
  });
})(jQuery);
