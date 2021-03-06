(function ($) {
  Drupal.behaviors.augovCommon = {
    attach:function (context, settings) {
      /*
       * @requires jquery.jumpMenu.js
       * Creates a drop down menu for the mobile site
       */
      $('#region-header-main-menu ul.menu').clone().appendTo('#block-superfish-1 .content').addClass('mobile-menu').jumpMenu();

      /*
       * Add default text to search block
       */
      var search_form = $('#block-search-form input.form-text');

      search_form.attr('value', 'Search the website');

      search_form.focus(function () {
        if ($(this).val() == 'Search the website') {
          $(this).val('');
          $(this).addClass('enter-search-text');
          $(this).removeClass('search-text-help');
        }
      });

      search_form.blur(function () {
        if ($(this).val() == '') {
          $(this).val('Search the website');
          $(this).removeClass('enter-search-text');
          $(this).addClass('search-text-help');
        }
      });

      /**
       * Trim body text in homepage carousel
       */
      $('#block-views-feature-article-block .view-feature-article .views-row').each(function () {
        var summaryText = $(this).find('.field-name-body .field-item').text();
        var summaryTextLength = summaryText.length;

        if (summaryTextLength > 290) {
          $(this).find('.field-name-body .field-item').text(summaryText.substring(0, 290) + "...")
        }
      });

      $('#block-views-footer-teaser-block .views-row').addClass('clearfix');

      /**
       * Search form interactions
       */

      $('#search-form #edit-keys').attr('data-value', $('#search-form #edit-keys').val());

      $('#search-form #edit-keys').focus(function() {
        if ($(this).val() == $(this).attr('data-value')) {
         $(this).val('');
        }
      });

      $('#search-form #edit-keys').blur(function() {
        if ($(this).val() == '') {
         $(this).val($(this).attr('data-value'));
        }
      });

      /**
       * Main menu hover delay
       */

      $('#region-header-main-menu .menu li a').mouseleave(function(){

        // if this li has a nested <ul>
        if ($(this).parent().children('ul').length > 0) {
          $(this).addClass('hover-style').delay(800).queue(function(next){
            $(this).removeClass('hover-style');
            next();
          });
        }
      });

      /**
       * Skip to content focus
       */
      $('#region-content').attr('tabindex', '-1');
      $('#skip-to-content').click(function () {
        $('#region-content').focus();
      });

    }
  };

  //Make menu icon accessible
  $(window).load( function() {
    var $menuBtn = $('#collapsed-menu-button');
    $menuBtn.attr('href', '#');

    if ( $menuBtn.text() == 'Menu' ) {
      $menuBtn.html( 'Menu<span class="sr-only"> - Expand</span>');
    }

    // Accessible home slider
    if ( $('body').hasClass('front') ) {
      if ( $('.slides').length ) {
        $('.slides').before('<h2 class="sr-only">Slideshow</h2>');
      }
      if ( $('.flex-control-paging').length ) {
        $('.flex-control-paging').before('<span class="sr-only">Slideshow controls - links have visual effect only:</span>');
      }
    }

    if ( $('.osky-accordion').length ) {
      $('.osky-accordion').each( function() {
        $(this).before('<p class="sr-only">Click a heading to expand or collapse content.</p>');
      });
    }

  });
}(jQuery));
