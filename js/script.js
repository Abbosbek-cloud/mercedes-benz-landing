window.addEventListener('DOMContentLoaded', () => {
  const data = {
    menu: [
      {
        img: 'img/tabs/1.jpg',
        altimg: 'vegy',
        title: '2021 Mercedes-Benz C-Class',
        descr:
          "The 2021 Mercedes-Benz C-Class finishes in the top half of our luxury small car rankings. It's powerful and upscale, but it has so-so...",
        price: 245,
      },
      {
        img: 'img/tabs/2.jpg',
        altimg: 'vegy',
        title: "2021 Mercedes-Benz C-Class'",
        descr:
          "The 2021 Mercedes-Benz C-Class finishes in the top half of our luxury small car rankings. It's powerful and upscale, but it has so-so...",
        price: 230,
      },
      {
        img: 'img/tabs/3.jpg',
        altimg: 'vegy',
        title: "2021 Mercedes-Benz C-Class'",
        descr:
          "The 2021 Mercedes-Benz C-Class finishes in the top half of our luxury small car rankings. It's powerful and upscale, but it has so-so...",
        price: 245,
      },
    ],
    requests: [
      {
        name: 'await',
        phone: '+998976785734',
        id: 1,
      },
      {
        name: 'await',
        phone: '+998976785734',
        id: 2,
      },
      {
        name: 'abek01',
        phone: '76876',
        id: 3,
      },
      {
        name: 'abek01',
        phone: '76876',
        id: 4,
      },
      {
        name: 'abek01',
        phone: '76876',
        id: 5,
      },
    ],
  };

  //   Loader - Hide after page loads
  const loader = document.querySelector('.loader');

  window.addEventListener('load', () => {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';

    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  });

  //   Modal

  const allModalBtn = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

  allModalBtn.forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimer);
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') === '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimer = setTimeout(openModal, 50000);

  function showMyModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showMyModalByScroll);
    }
  }
  window.addEventListener('scroll', showMyModalByScroll);

  // TABS
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabContent = document.querySelectorAll('.tabcontent'),
    headerParents = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.style.display = 'none';
    });
    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  headerParents.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //   slider

  const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'), // get a parent div of all slides
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    current = document.querySelector('#current'),
    total = document.querySelector('#total'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector('.offer__slider_inner');

  let slideIndex = 1,
    offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';

  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';
  let indicator = document.createElement('ol'),
    dots = [];

  indicator.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none
      `;

  slider.append(indicator);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin: 0 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
      `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicator.append(dot);
    dots.push(dot);
  }

  function updateSlider() {
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = '.5'));
    dots[slideIndex - 1].style.opacity = 1;
  }

  next.addEventListener('click', () => {
    if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
      offset = 0;
      slideIndex = 1;
    } else {
      offset += +width.replace(/\D/g, '');
      slideIndex++;
    }
    updateSlider();
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.replace(/\D/g, '') * (slides.length - 1);
      slideIndex = slides.length;
    } else {
      offset -= +width.replace(/\D/g, '');
      slideIndex--;
    }
    updateSlider();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = +slideTo;
      offset = +width.replace(/\D/g, '') * (slideTo - 1);

      updateSlider();
    });
  });

  // Auto slide
  let autoSlideInterval = setInterval(() => {
    if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
      offset = 0;
      slideIndex = 1;
    } else {
      offset += +width.replace(/\D/g, '');
      slideIndex++;
    }
    updateSlider();
  }, 5000);

  // Stop auto slide on hover
  slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  // Resume auto slide when mouse leaves
  slider.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
        offset = 0;
        slideIndex = 1;
      } else {
        offset += +width.replace(/\D/g, '');
        slideIndex++;
      }
      updateSlider();
    }, 5000);
  });

  //   classes

  class CarCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transferToUsd = 10.8;
      this.transferSoumToDollar();
    }

    transferSoumToDollar() {
      this.price = this.price * this.transferToUsd;
    }

    render() {
      const div = document.createElement('div');
      if (this.classes.length === 0) {
        this.classes = 'menu__item';
        div.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => div.classList.add(className));
      }
      div.innerHTML = `
              <div class="menu__item">
                  <img src=${this.src} alt=${this.alt} />
                  <h3 class="menu__item-subtitle">${this.title}</h3>  
                  <div class="menu__item-descr">
                      ${this.descr}
                  </div>
                  <div class="menu__item-divider"></div>
                  <div class="menu__item-price">
                      <div class="menu__item-cost">Price: </div>
                      <div class="menu__item-total">
                          <span>$${this.price.toFixed(2)}</span>
                      </div>
                  </div>
              </div>
            `;
      this.parent.append(div);
    }
  }

  data.menu.forEach(({ img, altimg, descr, price, title }) => {
    new CarCard(img, altimg, title, descr, price, '.menu .container').render();
  });

  //   dates
  const deadline = '2025-12-31';

  function getTime(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((total / 1000) % 60),
      minutes = Math.floor((total / 1000 / 60) % 60),
      hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    return {
      total: total,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const time = getTime(endtime);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      minutes.innerHTML = getZero(time.minutes);
      seconds.innerHTML = getZero(time.seconds);
      if (time.total <= 0) {
        clearInterval(timeInterval);
        days.innerHTML = '00';
        hours.innerHTML = '00';
        minutes.innerHTML = '00';
        seconds.innerHTML = '00';
      }
    }
  }
  setClock('.timer', deadline);

  //   accordion
  const accordion = document.querySelectorAll('.accordion');

  accordion.forEach((acc) => {
    acc.addEventListener('click', () => {
      // Close all other accordions
      accordion.forEach((otherAcc) => {
        if (otherAcc !== acc && otherAcc.classList.contains('active')) {
          otherAcc.classList.remove('active');
          const otherPanel = otherAcc.nextElementSibling;
          otherPanel.style.maxHeight = null;
        }
      });

      // Toggle current accordion
      acc.classList.toggle('active');
      const panel = acc.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // Scroll reveal animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document.querySelectorAll('.menu__item, .offer__advantages, .promotion').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Touch Support for Slider
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50;

  slidesWrapper.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  slidesWrapper.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true },
  );

  function handleSwipe() {
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) < minSwipeDistance) {
      return;
    }

    if (swipeDistance > 0) {
      // Swipe left - next slide
      if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
        offset = 0;
        slideIndex = 1;
      } else {
        offset += +width.replace(/\D/g, '');
        slideIndex++;
      }
    } else {
      // Swipe right - previous slide
      if (offset == 0) {
        offset = +width.replace(/\D/g, '') * (slides.length - 1);
        slideIndex = slides.length;
      } else {
        offset -= +width.replace(/\D/g, '');
        slideIndex--;
      }
    }

    updateSlider();
  }

  // Prevent zoom on double tap for buttons (iOS Safari)
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('touchend', (e) => {
      e.preventDefault();
      button.click();
    });
  });

  // Optimize animations for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // Reduce animation delays on mobile
    document.querySelectorAll('[style*="animation-delay"]').forEach((el) => {
      const currentStyle = el.style.cssText;
      el.style.cssText = currentStyle.replace(/animation-delay:\s*[\d.]+s/g, 'animation-delay: 0.1s');
    });
  }

  // Prevent body scroll when modal is open (better for mobile)
  function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  const originalOpenModal = openModal;
  openModal = function () {
    originalOpenModal();
    document.body.addEventListener('touchmove', preventScroll, { passive: false });
  };

  const originalCloseModal = closeModal;
  closeModal = function () {
    originalCloseModal();
    document.body.removeEventListener('touchmove', preventScroll);
  };

  // Improve form validation feedback
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    const inputs = form.querySelectorAll('input[required]');

    inputs.forEach((input) => {
      input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.classList.add('red');

        setTimeout(() => {
          input.classList.remove('red');
        }, 2000);
      });

      input.addEventListener('input', () => {
        if (input.validity.valid) {
          input.classList.remove('red');
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      console.log('Form submitted:', data);

      // Show success message
      const successMsg = document.createElement('div');
      successMsg.textContent = 'Thank you! We will contact you soon.';
      successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #54ed39;
        color: #fff;
        padding: 20px 40px;
        border-radius: 8px;
        font-size: 18px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      `;

      document.body.appendChild(successMsg);

      setTimeout(() => {
        successMsg.style.opacity = '0';
        successMsg.style.transition = 'opacity 0.5s';

        setTimeout(() => {
          successMsg.remove();
        }, 500);
      }, 3000);

      form.reset();
      closeModal();
    });
  });

  // Add performance optimization for scroll
  let ticking = false;
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Add header shadow on scroll
        const header = document.querySelector('.header');
        if (lastScrollY > 50) {
          header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
          header.style.transition = 'box-shadow 0.3s ease';
        } else {
          header.style.boxShadow = 'none';
        }

        ticking = false;
      });

      ticking = true;
    }
  });

  // Image fade-in effect for better visual experience
  const images = document.querySelectorAll('img[src]');

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Check if image is already loaded
          if (img.complete && img.naturalHeight !== 0) {
            // Image already loaded, fade it in immediately
            img.style.opacity = '1';
          } else {
            // Image not loaded yet, wait for load event
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';

            img.onload = () => {
              img.style.opacity = '1';
            };

            // Fallback in case onload doesn't fire
            setTimeout(() => {
              img.style.opacity = '1';
            }, 500);
          }

          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px', // Start loading slightly before image enters viewport
    },
  );

  // Set initial state and observe images
  images.forEach((img) => {
    img.style.transition = 'opacity 0.3s ease';
    // Only hide images that aren't loaded yet
    if (!img.complete || img.naturalHeight === 0) {
      img.style.opacity = '0';
    }
    imageObserver.observe(img);
  });
});
