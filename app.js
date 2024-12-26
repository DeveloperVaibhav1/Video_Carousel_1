$(document).ready(function() {
  const players = Array.from(document.querySelectorAll('.plyr')).map(p => new Plyr(p));

  $(window).on('load', function() {
      $('#loader').fadeOut();
  });

  players.forEach(player => {
      const videoElement = player.elements.video;

      if (videoElement) {
          videoElement.addEventListener('click', () => {
              if (player.paused) {
                  player.play();  
              } else {
                  player.pause(); 
              }
          });
      } else {
          console.error('Video element not found for player', player);
      }

      player.on('play', () => {
          players.forEach(otherPlayer => {
              if (otherPlayer !== player) {
                  otherPlayer.pause();
              }
          });
      });
  });

  function adjustCenteredVideo() {
      $('.owl-carousel .item').each(function() {
          const videoElement = $(this).find('video')[0];
          if (videoElement) {
              if ($(this).hasClass('active')) {
                  $(this).find('video').css({
                      transform: 'scale(1.5)',  
                      transition: 'transform 0.3s ease',  
                  });
              } else {
                  $(this).find('video').css({
                      transform: 'scale(1)',  
                      transition: 'transform 0.3s ease',  
                  });
              }
          }
      });
  }

  adjustCenteredVideo();

  var owl = $('.owl-carousel');
  owl.owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      responsive: {
          0: {
              items: 1
          },
          768: {
              items: 2
          },
          1024: {
              items: 3
          }
      }
  });

  owl.on('changed.owl.carousel', function(event) {
      players.forEach(player => player.pause());

      setTimeout(() => {
          adjustCenteredVideo();

          const playersInView = Array.from(document.querySelectorAll('.owl-item.active .plyr')).map(p => new Plyr(p));
          playersInView.forEach(player => {
              player.on('play', () => {
                  playersInView.forEach(otherPlayer => {
                      if (otherPlayer !== player) {
                          otherPlayer.pause();
                      }
                  });
              });
          });
      }, 300);
  });
});
