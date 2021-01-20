$(window).scroll(function() {
    if ($(window).scrollTop() > 250) {
      $("#background").stop().fadeOut();
    } else {
      $("#background").stop().fadeIn();
    }
  });
  