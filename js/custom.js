// Modern Portfolio JavaScript - Ayush Jha
// Enhanced with 3D Effects and Parallax

(function($) {
  "use strict";

  // Smooth scrolling
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 800);
        
        // Close mobile menu after clicking
        $('.navbar-collapse').collapse('hide');
        return false;
      }
    }
  });

  // Navbar scroll effect
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $('#mainNav').addClass('scrolled');
    } else {
      $('#mainNav').removeClass('scrolled');
    }
    
    // Active section highlighting
    var scrollPos = $(document).scrollTop() + 100;
    $('.nav-link').each(function() {
      var currLink = $(this);
      var refElement = $(currLink.attr('href'));
      if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('.nav-link').removeClass('active');
        currLink.addClass('active');
      } else {
        currLink.removeClass('active');
      }
    });
  });

  // 3D Mouse Tracking for Cards
  function init3DCardEffects() {
    const cards = document.querySelectorAll('.card-3d, .stat-card, .skill-category, .cert-card, .education-card, .award-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
  }

  function handleMouseMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(10px)
      scale3d(1.02, 1.02, 1.02)
    `;
  }

  function handleMouseLeave(e) {
    const card = e.currentTarget;
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(0px)
      scale3d(1, 1, 1)
    `;
  }

  // Parallax Effect for Sections
  function initParallaxEffect() {
    $(window).scroll(function() {
      var scrolled = $(window).scrollTop();
      
      // Hero parallax
      $('.hero-bg').css('transform', 'translateY(' + (scrolled * 0.5) + 'px) translateZ(-50px)');
      
      // Section parallax
      $('.parallax-layer').each(function() {
        var speed = $(this).data('speed') || 0.3;
        var yPos = -(scrolled * speed);
        $(this).css('transform', 'translate3d(0, ' + yPos + 'px, 0)');
      });
    });
  }

  // Scroll animations with 3D entrance
  function checkScroll() {
    $('.animate-on-scroll').each(function() {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      
      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass('animated');
      }
    });
  }

  $(window).on('scroll', checkScroll);
  $(window).on('load', checkScroll);

  // Ripple effect on buttons
  function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  $('.btn, .social-icon').on('click', createRipple);

  // Counter animation for stats
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Trigger counter animation when stats section is visible
  let statsAnimated = false;
  $(window).scroll(function() {
    if (!statsAnimated && $('#about').length) {
      var aboutTop = $('#about').offset().top;
      var aboutBottom = aboutTop + $('#about').outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      
      if (aboutBottom > viewportTop && aboutTop < viewportBottom) {
        statsAnimated = true;
        // Add entrance animation
        $('.stat-card').each(function(index) {
          $(this).css({
            'animation-delay': (index * 0.1) + 's',
            'animation': 'fadeInUp3d 0.8s ease-out forwards'
          });
        });
      }
    }
  });

  // Form submission handling
  $('#contact-form').submit(function(e) {
    e.preventDefault();
    
    // Get form data
    var formData = {
      name: $('#name').val(),
      email: $('#email').val(),
      subject: $('#subject').val(),
      message: $('#message').val()
    };
    
    // Show success message with animation
    const button = $(this).find('button[type="submit"]');
    button.html('<i class="fas fa-check me-2"></i>Sent!');
    button.addClass('btn-success').removeClass('btn-primary');
    
    setTimeout(() => {
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
      button.html('<i class="fas fa-paper-plane me-2"></i>Send Message');
      button.removeClass('btn-success').addClass('btn-primary');
    }, 1000);
  });

  // Preloader with 3D effect
  $(window).on('load', function() {
    $('#preloader').fadeOut(800);
  });

  // Enhanced parallax effect for hero section
  $(window).scroll(function() {
    var scrolled = $(window).scrollTop();
    $('.hero-bg').css('transform', 'translateY(' + (scrolled * 0.5) + 'px) translateZ(-50px) scale(1.1)');
    $('.hero-content').css('transform', 'translateY(' + (scrolled * 0.3) + 'px) translateZ(20px)');
  });

  // Typed.js initialization
  if (typeof Typed !== 'undefined' && $('#typed-text').length) {
    new Typed('#typed-text', {
      strings: [
        'Generative AI Solution Developer',
        'Full-Stack Developer',
        'Azure & AWS Expert',
        'DevOps Engineer',
        'LLM Specialist',
        'Multi-Agent Systems Developer',
        'RAG Pipeline Architect'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  // Tilt effect for skill tags
  $('.skill-tag').hover(
    function() {
      $(this).css('transform', 'translateY(-5px) rotateZ(' + (Math.random() * 10 - 5) + 'deg) translateZ(10px)');
    },
    function() {
      $(this).css('transform', 'translateY(0) rotateZ(0deg) translateZ(0)');
    }
  );

  // Add glow effect to certification cards on hover
  $('.cert-card').hover(
    function() {
      $(this).addClass('glow-on-hover');
    },
    function() {
      $(this).removeClass('glow-on-hover');
    }
  );

  // Smooth entrance for timeline items
  function animateTimeline() {
    $('.timeline-item').each(function(index) {
      $(this).css({
        'animation-delay': (index * 0.2) + 's',
        'animation': 'fadeInLeft3d 0.8s ease-out forwards'
      });
    });
  }

  // Trigger timeline animation when visible
  let timelineAnimated = false;
  $(window).scroll(function() {
    if (!timelineAnimated && $('#experience').length) {
      var expTop = $('#experience').offset().top;
      var expBottom = expTop + $('#experience').outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      
      if (expBottom > viewportTop && expTop < viewportBottom) {
        timelineAnimated = true;
        animateTimeline();
      }
    }
  });

  // Initialize all 3D effects
  $(document).ready(function() {
    init3DCardEffects();
    initParallaxEffect();
    
    // Add perspective to body
    $('body').css('perspective', '1000px');
    
    // Add floating animation to random elements
    $('.stat-card, .skill-category').each(function(index) {
      if (index % 2 === 0) {
        $(this).addClass('float-animation');
      }
    });
  });

  // Mouse parallax for hero section
  $(document).mousemove(function(e) {
    var mouseX = e.pageX / $(window).width() - 0.5;
    var mouseY = e.pageY / $(window).height() - 0.5;
    
    $('.hero-name').css('transform', 
      'translateX(' + (mouseX * 20) + 'px) translateY(' + (mouseY * 20) + 'px) translateZ(30px)'
    );
    
    $('.hero-title').css('transform', 
      'translateX(' + (mouseX * -15) + 'px) translateY(' + (mouseY * -15) + 'px) translateZ(20px)'
    );
  });

  // Add sparkle effect on certification badges
  setInterval(function() {
    $('.cert-badge, .award-icon').each(function() {
      if (Math.random() > 0.7) {
        $(this).css('animation', 'pulse3d 1s ease-out');
        setTimeout(() => {
          $(this).css('animation', '');
        }, 1000);
      }
    });
  }, 3000);

})(jQuery);
