var a = 0;
$(window).scroll(function() {

  var oTop = $('#counter').offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $('.counter-value').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 2000,
          easing: 'swing',
          step: function() {
            if (countTo >= 10) {
            $this.text((Math.floor(this.countNum)) + '+'); 
            } else {
              $this.text(Math.floor(this.countNum));
            }
          },
          complete: function() {
            if (countTo >= 10) {
            $this.text((this.countNum) + '+'); 
            } else {
              $this.text(this.countNum); 
            }
            //alert('finished');
          }

        });
    });
    a = 1;
  }

});