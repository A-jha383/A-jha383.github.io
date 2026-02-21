// ===================================
// AI/ML Portfolio JavaScript - Ayush Jha
// Neural Network Animations & Interactive Effects
// ===================================

(function($) {
  "use strict";

  // ===== NEURAL NETWORK BACKGROUND =====
  function initNeuralNetwork() {
    const canvas = document.getElementById('neural-bg');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let nodes = [];
    let animationFrame;
    const nodeCount = window.innerWidth < 768 ? 30 : 60;
    
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    // Create neural nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    function drawNetwork() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 200) {
            const opacity = (1 - dist / 200) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            
            const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            gradient.addColorStop(0, `rgba(108, 99, 255, ${opacity})`);
            gradient.addColorStop(1, `rgba(0, 217, 255, ${opacity})`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 99, 255, ${node.opacity})`;
        ctx.fill();
        
        // Glow effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 217, 255, ${node.opacity * 0.3})`;
        ctx.fill();
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });
      
      animationFrame = requestAnimationFrame(drawNetwork);
    }
    
    drawNetwork();
  }

  // ===== HERO PARTICLES =====
  function initParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: ${Math.random() > 0.5 ? 'rgba(108, 99, 255, 0.4)' : 'rgba(0, 217, 255, 0.4)'};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 10 + 8}s ease-in-out infinite ${Math.random() * 5}s;
        pointer-events: none;
      `;
      container.appendChild(particle);
    }
    
    // Add particle animation CSS
    if (!document.getElementById('particle-styles')) {
      const style = document.createElement('style');
      style.id = 'particle-styles';
      style.textContent = `
        @keyframes particleFloat {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(${Math.random() * 50 - 25}px, -30px) scale(1.2); opacity: 0.6; }
          50% { transform: translate(${Math.random() * 50 - 25}px, -60px) scale(0.8); opacity: 0.4; }
          75% { transform: translate(${Math.random() * 50 - 25}px, -30px) scale(1.1); opacity: 0.5; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ===== SMOOTH SCROLLING =====
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 800, 'swing');
        $('.navbar-collapse').collapse('hide');
        return false;
      }
    }
  });

  // ===== NAVBAR SCROLL =====
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

  // ===== 3D CARD EFFECTS =====
  function init3DCardEffects() {
    const cards = document.querySelectorAll('.card-3d, .stat-card, .skill-category, .cert-card, .education-card, .award-card, .ai-card, .project-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
  }

  function handleMouseMove(e) {
    if (window.innerWidth < 768) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(5px)
      scale3d(1.02, 1.02, 1.02)
    `;
  }

  function handleMouseLeave(e) {
    const card = e.currentTarget;
    card.style.transform = '';
  }

  // ===== SCROLL ANIMATIONS =====
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

  // ===== HERO METRIC COUNTER =====
  function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-value[data-count]');
    
    metrics.forEach(metric => {
      const target = parseInt(metric.getAttribute('data-count'));
      const duration = 2000;
      const start = 0;
      let startTimestamp = null;
      
      function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        metric.textContent = Math.floor(eased * (target - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          metric.textContent = target;
        }
      }
      
      window.requestAnimationFrame(step);
    });
  }

  // Trigger metrics when hero is visible
  let metricsAnimated = false;
  $(window).scroll(function() {
    if (!metricsAnimated && $('.hero-metrics').length) {
      var metricsTop = $('.hero-metrics').offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).height();
      
      if (metricsTop < viewportBottom) {
        metricsAnimated = true;
        animateMetrics();
      }
    }
  });

  // Also trigger on load if already visible
  $(window).on('load', function() {
    if (!metricsAnimated && $('.hero-metrics').length) {
      animateMetrics();
      metricsAnimated = true;
    }
  });

  // ===== STAT COUNTER ANIMATION =====
  let statsAnimated = false;
  $(window).scroll(function() {
    if (!statsAnimated && $('#about').length) {
      var aboutTop = $('#about').offset().top;
      var aboutBottom = aboutTop + $('#about').outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      
      if (aboutBottom > viewportTop && aboutTop < viewportBottom) {
        statsAnimated = true;
        $('.stat-card').each(function(index) {
          $(this).css({
            'animation-delay': (index * 0.15) + 's',
            'animation': 'fadeInUp3d 0.8s ease-out forwards'
          });
        });
      }
    }
  });

  // ===== TIMELINE ANIMATION =====
  let timelineAnimated = false;
  $(window).scroll(function() {
    if (!timelineAnimated && $('#experience').length) {
      var expTop = $('#experience').offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).height();
      
      if (expTop < viewportBottom) {
        timelineAnimated = true;
        $('.timeline-item').each(function(index) {
          $(this).css({
            'animation-delay': (index * 0.2) + 's',
            'animation': 'fadeInLeft3d 0.8s ease-out forwards'
          });
        });
      }
    }
  });

  // ===== AI CARD ENTRANCE =====
  let aiCardsAnimated = false;
  $(window).scroll(function() {
    if (!aiCardsAnimated && $('#ai-expertise').length) {
      var sectionTop = $('#ai-expertise').offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).height();
      
      if (sectionTop < viewportBottom) {
        aiCardsAnimated = true;
        $('.ai-card').each(function(index) {
          $(this).css({
            'animation-delay': (index * 0.12) + 's',
            'animation': 'fadeInUp3d 0.7s ease-out forwards'
          });
        });
      }
    }
  });

  // ===== RIPPLE EFFECT =====
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
    setTimeout(() => ripple.remove(), 600);
  }

  $('.btn, .social-icon').on('click', createRipple);

  // ===== FORM HANDLER =====
  $('#contact-form').submit(function(e) {
    e.preventDefault();
    
    const button = $(this).find('button[type="submit"]');
    const originalHTML = button.html();
    
    button.html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');
    button.prop('disabled', true);
    
    setTimeout(() => {
      button.html('<i class="fas fa-check me-2"></i>Sent!');
      button.addClass('btn-success').css('background', 'linear-gradient(135deg, #00E676, #00C853)');
      
      setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
        button.html(originalHTML);
        button.prop('disabled', false);
        button.removeClass('btn-success').css('background', '');
      }, 1200);
    }, 1500);
  });

  // ===== PRELOADER =====
  $(window).on('load', function() {
    setTimeout(function() {
      $('#preloader').css({
        'opacity': '0',
        'visibility': 'hidden'
      });
      setTimeout(function() {
        $('#preloader').css('display', 'none');
      }, 600);
    }, 1500);
  });

  // ===== TYPED.JS =====
  if (typeof Typed !== 'undefined' && $('#typed-text').length) {
    new Typed('#typed-text', {
      strings: [
        'Generative AI Specialist',
        'LLM & RAG Architect',
        'Multi-Agent Systems Builder',
        'Azure AI Engineer',
        'Full-Stack AI Developer',
        'Cloud ML Engineer',
        'Prompt Engineering Expert'
      ],
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 2500,
      loop: true,
      showCursor: true,
      cursorChar: '▊'
    });
  }

  // ===== HERO PARALLAX =====
  $(window).scroll(function() {
    var scrolled = $(window).scrollTop();
    if (scrolled < window.innerHeight) {
      $('.hero-bg').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
      $('.hero-content').css('opacity', 1 - (scrolled / (window.innerHeight * 0.8)));
      $('.hero-visual').css('opacity', 1 - (scrolled / (window.innerHeight * 0.8)));
    }
  });

  // ===== MOUSE PARALLAX FOR HERO BRAIN =====
  $(document).mousemove(function(e) {
    if (window.innerWidth < 992) return;
    
    var mouseX = (e.pageX / $(window).width() - 0.5) * 2;
    var mouseY = (e.pageY / $(window).height() - 0.5) * 2;
    
    $('.brain-core').css('transform', 
      'translate(calc(-50% + ' + (mouseX * 8) + 'px), calc(-50% + ' + (mouseY * 8) + 'px))'
    );
    
    $('.ring-1').css('transform', 
      'translate(calc(-50% + ' + (mouseX * -3) + 'px), calc(-50% + ' + (mouseY * -3) + 'px)) rotate(' + (Date.now() / 100) + 'deg)'
    );
  });

  // ===== SKILL TAG HOVER EFFECT =====
  $('.skill-tag').hover(
    function() {
      $(this).css('transform', 'translateY(-3px) scale(1.05)');
    },
    function() {
      $(this).css('transform', '');
    }
  );

  // ===== CERT BADGE SPARKLE =====
  setInterval(function() {
    $('.cert-badge, .award-icon, .ai-card-icon').each(function() {
      if (Math.random() > 0.8) {
        $(this).css('filter', 'brightness(1.3)');
        setTimeout(() => {
          $(this).css('filter', '');
        }, 500);
      }
    });
  }, 3000);

  // ===== INITIALIZE =====
  $(document).ready(function() {
    initNeuralNetwork();
    initParticles();
    init3DCardEffects();
    
    // Add floating animation
    $('.stat-card, .skill-category').each(function(index) {
      if (index % 3 === 0) {
        $(this).addClass('float-animation');
      }
    });
  });

})(jQuery);
