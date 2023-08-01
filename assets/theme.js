
/*
* @license
* Broadcast Theme (c) Invisible Themes
*
* Modified versions of the theme code
* are not supported by Groupthought.
*
*/

(function (AOS, bodyScrollLock, themeAddresses, themeCurrency, Sqrl, Flickity, FlickityFade, Rellax, MicroModal, themeImages) {
  'use strict';

  window.theme = window.theme || {};

  window.theme.sizes = {
    mobile: 480,
    small: 750,
    large: 990,
    widescreen: 1400,
  };

  window.theme.keyboardKeys = {
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    LEFTARROW: 37,
    RIGHTARROW: 39,
  };

  window.theme.focusable = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function floatLabels(container) {
    const floats = container.querySelectorAll('.form-field');
    floats.forEach((element) => {
      const label = element.querySelector('label');
      const input = element.querySelector('input, textarea');
      if (label && input) {
        input.addEventListener('keyup', (event) => {
          if (event.target.value !== '') {
            label.classList.add('label--float');
          } else {
            label.classList.remove('label--float');
          }
        });
        if (input.value && input.value.length) {
          label.classList.add('label--float');
        }
      }
    });
  }

  let screenOrientation = getScreenOrientation();

  function readHeights() {
    const h = {};
    h.windowHeight = Math.min(window.screen.height, window.innerHeight);
    h.announcementHeight = getHeight('[data-section-type*="announcement"] [data-bar-top]');
    h.footerHeight = getHeight('[data-section-type*="footer"]');
    h.menuHeight = getHeight('[data-header-height]');
    h.headerHeight = h.menuHeight + h.announcementHeight;
    h.collectionNavHeight = getHeight('[data-collection-nav]');
    h.logoHeight = getFooterLogoWithPadding();

    return h;
  }

  function setVarsOnResize() {
    document.addEventListener('theme:resize', resizeVars);
    setVars();
  }

  function setVars() {
    const {windowHeight, announcementHeight, headerHeight, logoHeight, menuHeight, footerHeight, collectionNavHeight} = readHeights();
    const newsletterSmallLeft = document.querySelector('[data-newsletter-holder].newsletter--top-left');
    const cookiePopup = document.querySelector('[data-tracking-consent]');
    const articleSocials = document.querySelector('[data-article-socials]');
    let defaultOuter = 16;

    document.documentElement.style.setProperty('--full-screen', `${windowHeight}px`);
    document.documentElement.style.setProperty('--three-quarters', `${windowHeight * (3 / 4)}px`);
    document.documentElement.style.setProperty('--two-thirds', `${windowHeight * (2 / 3)}px`);
    document.documentElement.style.setProperty('--one-half', `${windowHeight / 2}px`);
    document.documentElement.style.setProperty('--one-third', `${windowHeight / 3}px`);

    document.documentElement.style.setProperty('--menu-height', `${menuHeight}px`);
    document.documentElement.style.setProperty('--announcement-height', `${announcementHeight}px`);
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    document.documentElement.style.setProperty('--collection-nav-height', `${collectionNavHeight}px`);

    document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
    document.documentElement.style.setProperty('--content-full', `${windowHeight - headerHeight - logoHeight / 2}px`);
    document.documentElement.style.setProperty('--content-min', `${windowHeight - headerHeight - footerHeight}px`);

    if (document.querySelector('[data-tracking-consent].popup-cookies--bottom')) {
      document.documentElement.style.setProperty('--cookie-bar-height', `${document.querySelector('[data-tracking-consent].popup-cookies--bottom').offsetHeight}px`);
    }

    document.documentElement.style.setProperty('--newsletter-small-height', newsletterSmallLeft ? `${newsletterSmallLeft.offsetHeight}px` : '0px');

    document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);

    if (cookiePopup && cookiePopup.offsetHeight > 0) {
      defaultOuter = cookiePopup.offsetHeight + Number(getComputedStyle(cookiePopup).bottom.replace('px', ''));
    } else if (articleSocials && articleSocials.offsetHeight > 0) {
      defaultOuter += articleSocials.offsetHeight;
    }

    document.documentElement.style.setProperty('--mobile-newsletter-with-cookie-height', `${defaultOuter}px`);
  }

  function resizeVars() {
    // restrict the heights that are changed on resize to avoid iOS jump when URL bar is shown and hidden
    const {windowHeight, announcementHeight, headerHeight, logoHeight, menuHeight, footerHeight, collectionNavHeight} = readHeights();
    const newsletterSmallLeft = document.querySelector('[data-newsletter-holder].newsletter--top-left');
    const cookiePopup = document.querySelector('[data-tracking-consent]');
    const articleSocials = document.querySelector('[data-article-socials]');
    const currentScreenOrientation = getScreenOrientation();
    let defaultOuter = 16;

    if (currentScreenOrientation !== screenOrientation) {
      // Only update the heights on screen orientation change
      document.documentElement.style.setProperty('--full-screen', `${windowHeight}px`);
      document.documentElement.style.setProperty('--three-quarters', `${windowHeight * (3 / 4)}px`);
      document.documentElement.style.setProperty('--two-thirds', `${windowHeight * (2 / 3)}px`);
      document.documentElement.style.setProperty('--one-half', `${windowHeight / 2}px`);
      document.documentElement.style.setProperty('--one-third', `${windowHeight / 3}px`);

      // Update the screen orientation state
      screenOrientation = currentScreenOrientation;
    }

    document.documentElement.style.setProperty('--menu-height', `${menuHeight}px`);
    document.documentElement.style.setProperty('--announcement-height', `${announcementHeight}px`);
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    document.documentElement.style.setProperty('--collection-nav-height', `${collectionNavHeight}px`);

    document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
    document.documentElement.style.setProperty('--content-full', `${windowHeight - headerHeight - logoHeight / 2}px`);
    document.documentElement.style.setProperty('--content-min', `${windowHeight - headerHeight - footerHeight}px`);

    if (document.querySelector('[data-tracking-consent].popup-cookies--bottom')) {
      document.documentElement.style.setProperty('--cookie-bar-height', `${document.querySelector('[data-tracking-consent].popup-cookies--bottom').offsetHeight}px`);
    }

    document.documentElement.style.setProperty('--newsletter-small-height', newsletterSmallLeft ? `${newsletterSmallLeft.offsetHeight}px` : '0px');

    if (cookiePopup && cookiePopup.offsetHeight > 0) {
      defaultOuter = cookiePopup.offsetHeight + Number(getComputedStyle(cookiePopup).bottom.replace('px', ''));
    } else if (articleSocials && articleSocials.offsetHeight > 0) {
      defaultOuter += articleSocials.offsetHeight;
    }

    document.documentElement.style.setProperty('--mobile-newsletter-with-cookie-height', `${defaultOuter}px`);
  }

  function getScreenOrientation() {
    if (window.matchMedia('(orientation: portrait)').matches) {
      return 'portrait';
    }

    if (window.matchMedia('(orientation: landscape)').matches) {
      return 'landscape';
    }
  }

  function getHeight(selector) {
    const el = document.querySelector(selector);
    if (el) {
      return el.offsetHeight;
    } else {
      return 0;
    }
  }

  function getFooterLogoWithPadding() {
    const height = getHeight('[data-footer-logo]');
    if (height > 0) {
      return height + 20;
    } else {
      return 0;
    }
  }

  function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

  function singles(frame, wrappers) {
    // sets the height of any frame passed in with the
    // tallest preventOverflowContent as well as any image in that frame
    let padding = 64;
    let tallest = 0;

    wrappers.forEach((wrap) => {
      if (wrap.offsetHeight > tallest) {
        const getMarginTop = parseInt(window.getComputedStyle(wrap).marginTop);
        const getMarginBottom = parseInt(window.getComputedStyle(wrap).marginBottom);
        const getMargin = getMarginTop + getMarginBottom;
        if (getMargin > padding) {
          padding = getMargin;
        }

        tallest = wrap.offsetHeight;
      }
    });
    const images = frame.querySelectorAll('[data-overflow-background]');
    const frames = [frame, ...images];
    frames.forEach((el) => {
      el.style.setProperty('min-height', `calc(${tallest + padding}px + var(--header-padding))`);
    });
  }

  function doubles(section) {
    if (window.innerWidth < window.theme.sizes.small) {
      // if we are below the small breakpoint, the double section acts like two independent
      // single frames
      let singleFrames = section.querySelectorAll('[data-overflow-frame]');
      singleFrames.forEach((singleframe) => {
        const wrappers = singleframe.querySelectorAll('[data-overflow-content]');
        singles(singleframe, wrappers);
      });
      return;
    }

    const padding = parseInt(getComputedStyle(section).getPropertyValue('--outer')) * 2;
    let tallest = 0;

    const frames = section.querySelectorAll('[data-overflow-frame]');
    const contentWrappers = section.querySelectorAll('[data-overflow-content]');
    contentWrappers.forEach((content) => {
      if (content.offsetHeight > tallest) {
        tallest = content.offsetHeight;
      }
    });
    const images = section.querySelectorAll('[data-overflow-background]');
    let applySizes = [...frames, ...images];
    applySizes.forEach((el) => {
      el.style.setProperty('min-height', `${tallest + padding}px`);
    });
    section.style.setProperty('min-height', `${tallest + padding + 2}px`);
  }

  function preventOverflow(container) {
    const singleFrames = container.querySelectorAll('.js-overflow-container');
    if (singleFrames) {
      singleFrames.forEach((frame) => {
        const wrappers = frame.querySelectorAll('.js-overflow-content');
        singles(frame, wrappers);
        document.addEventListener('theme:resize', () => {
          singles(frame, wrappers);
        });
      });
    }

    const doubleSections = container.querySelectorAll('[data-overflow-wrapper]');
    if (doubleSections) {
      doubleSections.forEach((section) => {
        doubles(section);
        document.addEventListener('theme:resize', () => {
          doubles(section);
        });
      });
    }
  }

  function debounce(fn, time) {
    let timeout;
    return function () {
      // eslint-disable-next-line prefer-rest-params
      if (fn) {
        const functionCall = () => fn.apply(this, arguments);
        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
      }
    };
  }

  let lastWindowWidth = window.innerWidth;
  let lastWindowHeight = window.innerHeight;

  function dispatch() {
    document.dispatchEvent(
      new CustomEvent('theme:resize', {
        bubbles: true,
      })
    );

    if (lastWindowWidth !== window.innerWidth) {
      document.dispatchEvent(
        new CustomEvent('theme:resize:width', {
          bubbles: true,
        })
      );

      lastWindowWidth = window.innerWidth;
    }

    if (lastWindowHeight !== window.innerHeight) {
      document.dispatchEvent(
        new CustomEvent('theme:resize:height', {
          bubbles: true,
        })
      );

      lastWindowHeight = window.innerHeight;
    }
  }

  function resizeListener() {
    window.addEventListener(
      'resize',
      debounce(function () {
        dispatch();
      }, 50)
    );
  }

  let prev = window.pageYOffset;
  let up = null;
  let down = null;
  let wasUp = null;
  let wasDown = null;
  let scrollLockTimeout = 0;

  function dispatch$1() {
    const position = window.pageYOffset;
    if (position > prev) {
      down = true;
      up = false;
    } else if (position < prev) {
      down = false;
      up = true;
    } else {
      up = null;
      down = null;
    }
    prev = position;
    document.dispatchEvent(
      new CustomEvent('theme:scroll', {
        detail: {
          up,
          down,
          position,
        },
        bubbles: false,
      })
    );
    if (up && !wasUp) {
      document.dispatchEvent(
        new CustomEvent('theme:scroll:up', {
          detail: {position},
          bubbles: false,
        })
      );
    }
    if (down && !wasDown) {
      document.dispatchEvent(
        new CustomEvent('theme:scroll:down', {
          detail: {position},
          bubbles: false,
        })
      );
    }
    wasDown = down;
    wasUp = up;
  }

  function lock(e) {
    bodyScrollLock.disableBodyScroll(e.detail, {
      allowTouchMove: (el) => el.tagName === 'TEXTAREA',
    });
    document.documentElement.setAttribute('data-scroll-locked', '');
  }

  function unlock() {
    // Prevent body scroll lock race conditions
    scrollLockTimeout = setTimeout(() => {
      document.body.removeAttribute('data-drawer-closing');
    }, 20);

    if (document.body.hasAttribute('data-drawer-closing')) {
      document.body.removeAttribute('data-drawer-closing');

      if (scrollLockTimeout) {
        clearTimeout(scrollLockTimeout);
      }

      return;
    } else {
      document.body.setAttribute('data-drawer-closing', '');
    }

    document.documentElement.removeAttribute('data-scroll-locked');
    bodyScrollLock.clearAllBodyScrollLocks();
  }

  function scrollListener() {
    let timeout;
    window.addEventListener(
      'scroll',
      function () {
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(function () {
          dispatch$1();
        });
      },
      {passive: true}
    );

    window.addEventListener('theme:scroll:lock', lock);
    window.addEventListener('theme:scroll:unlock', unlock);
  }

  const wrap = (toWrap, wrapperClass = '', wrapperOption) => {
    const wrapper = wrapperOption || document.createElement('div');
    wrapper.classList.add(wrapperClass);
    toWrap.parentNode.insertBefore(wrapper, toWrap);
    return wrapper.appendChild(toWrap);
  };

  function wrapElements(container) {
    // Target tables to make them scrollable
    const tableSelectors = '.rte table';
    const tables = container.querySelectorAll(tableSelectors);
    tables.forEach((table) => {
      wrap(table, 'rte__table-wrapper');
    });

    // Target iframes to make them responsive
    const iframeSelectors = '.rte iframe[src*="youtube.com/embed"], .rte iframe[src*="player.vimeo"], .rte iframe#admin_bar_iframe';
    const frames = container.querySelectorAll(iframeSelectors);
    frames.forEach((frame) => {
      wrap(frame, 'rte__video-wrapper');
    });
  }

  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }

  function isTouch() {
    if (isTouchDevice()) {
      document.documentElement.className = document.documentElement.className.replace('no-touch', 'supports-touch');
      window.theme.touch = true;
    } else {
      window.theme.touch = false;
    }
  }

  function ariaToggle(container) {
    const toggleButtons = container.querySelectorAll('[data-aria-toggle]');
    if (toggleButtons.length) {
      toggleButtons.forEach((element) => {
        element.addEventListener('click', function (event) {
          event.preventDefault();
          const currentTarget = event.currentTarget;
          currentTarget.setAttribute('aria-expanded', currentTarget.getAttribute('aria-expanded') == 'false' ? 'true' : 'false');
          const toggleID = currentTarget.getAttribute('aria-controls');

          document.querySelector(`#${toggleID}`).classList.toggle('expanding');
          document.querySelector(`#${toggleID}`).classList.toggle('expanded');

          setTimeout(function () {
            document.querySelector(`#${toggleID}`).classList.remove('expanding');
          }, 500);
        });
      });
    }
  }

  function loading() {
    document.body.classList.add('is-loaded');
  }

  if (window.theme.settings.enableAnimations) {
    AOS.init({
      once: true,
      offset: 50,
      duration: 1000,
    });
  }

  resizeListener();
  scrollListener();
  isTouch();
  ariaToggle(document);

  window.addEventListener('load', () => {
    setVarsOnResize();
    floatLabels(document);
    preventOverflow(document);
    wrapElements(document);
    loading();
  });

  document.addEventListener('shopify:section:load', (e) => {
    const container = e.target;
    floatLabels(container);
    preventOverflow(container);
    wrapElements(container);
    ariaToggle(document);
    setVarsOnResize();
  });

  (function () {
    function n(n) {
      var i = window.innerWidth || document.documentElement.clientWidth,
        r = window.innerHeight || document.documentElement.clientHeight,
        t = n.getBoundingClientRect();
      return t.top >= 0 && t.bottom <= r && t.left >= 0 && t.right <= i;
    }
    function t(n) {
      var i = window.innerWidth || document.documentElement.clientWidth,
        r = window.innerHeight || document.documentElement.clientHeight,
        t = n.getBoundingClientRect(),
        u = (t.left >= 0 && t.left <= i) || (t.right >= 0 && t.right <= i),
        f = (t.top >= 0 && t.top <= r) || (t.bottom >= 0 && t.bottom <= r);
      return u && f;
    }
    function i(n, i) {
      function r() {
        var r = t(n);
        r != u && ((u = r), typeof i == 'function' && i(r, n));
      }
      var u = t(n);
      window.addEventListener('load', r);
      window.addEventListener('resize', r);
      window.addEventListener('scroll', r);
    }
    function r(t, i) {
      function r() {
        var r = n(t);
        r != u && ((u = r), typeof i == 'function' && i(r, t));
      }
      var u = n(t);
      window.addEventListener('load', r);
      window.addEventListener('resize', r);
      window.addEventListener('scroll', r);
    }
    window.visibilityHelper = {isElementTotallyVisible: n, isElementPartiallyVisible: t, inViewportPartially: i, inViewportTotally: r};
  })();

  const showElement = (elem, removeProp = false, prop = 'block') => {
    if (elem) {
      if (removeProp) {
        elem.style.removeProperty('display');
      } else {
        elem.style.display = prop;
      }
    }
  };

  /**
   * Module to show Recently Viewed Products
   *
   * Copyright (c) 2014 Caroline Schnapp (11heavens.com)
   * Dual licensed under the MIT and GPL licenses:
   * http://www.opensource.org/licenses/mit-license.php
   * http://www.gnu.org/licenses/gpl.html
   *
   */

  Shopify.Products = (function () {
    const config = {
      howManyToShow: 4,
      howManyToStoreInMemory: 10,
      wrapperId: 'recently-viewed-products',
      section: null,
      onComplete: null,
    };

    let productHandleQueue = [];
    let wrapper = null;
    let howManyToShowItems = null;

    const cookie = {
      configuration: {
        expires: 90,
        path: '/',
        domain: window.location.hostname,
      },
      name: 'shopify_recently_viewed',
      write: function (recentlyViewed) {
        const recentlyViewedString = recentlyViewed.join(' ');
        document.cookie = `${this.name}=${recentlyViewedString}; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}`;
      },
      read: function () {
        let recentlyViewed = [];
        let cookieValue = null;
        const templateProduct = document.querySelector('#template-product');

        if (document.cookie.indexOf('; ') !== -1 && document.cookie.split('; ').find((row) => row.startsWith(this.name))) {
          cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith(this.name))
            .split('=')[1];
        }

        if (cookieValue !== null) {
          recentlyViewed = cookieValue.split(' ');
        }

        if (templateProduct) {
          const currentProduct = templateProduct.getAttribute('data-product-handle');

          // Remove current product from the array
          if (recentlyViewed.indexOf(currentProduct) != -1) {
            const currentProductIndex = recentlyViewed.indexOf(currentProduct);
            recentlyViewed.splice(currentProductIndex, 1);
          }
        }

        return recentlyViewed;
      },
      destroy: function () {
        const cookieVal = null;
        document.cookie = `${this.name}=${cookieVal}; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}`;
      },
      remove: function (productHandle) {
        const recentlyViewed = this.read();
        const position = recentlyViewed.indexOf(productHandle);
        if (position !== -1) {
          recentlyViewed.splice(position, 1);
          this.write(recentlyViewed);
        }
      },
    };

    const finalize = (wrapper, section) => {
      showElement(wrapper, true);
      const cookieItemsLength = cookie.read().length;

      if (Shopify.recentlyViewed && howManyToShowItems && cookieItemsLength && cookieItemsLength < howManyToShowItems && wrapper.children.length) {
        let allClassesArr = [];
        let addClassesArr = [];
        let objCounter = 0;
        for (const property in Shopify.recentlyViewed) {
          objCounter += 1;
          const objString = Shopify.recentlyViewed[property];
          const objArr = objString.split(' ');
          const propertyIdx = parseInt(property.split('_')[1]);
          allClassesArr = [...allClassesArr, ...objArr];

          if (cookie.read().length === propertyIdx || (objCounter === Object.keys(Shopify.recentlyViewed).length && !addClassesArr.length)) {
            addClassesArr = [...addClassesArr, ...objArr];
          }
        }

        for (let i = 0; i < wrapper.children.length; i++) {
          const element = wrapper.children[i];
          if (allClassesArr.length) {
            element.classList.remove(...allClassesArr);
          }

          if (addClassesArr.length) {
            element.classList.add(...addClassesArr);
          }
        }
      }

      // If we have a callback.
      if (config.onComplete) {
        try {
          config.onComplete(wrapper, section);
        } catch (error) {
          console.log(error);
        }
      }
    };

    const moveAlong = (shown, productHandleQueue, wrapper, section) => {
      if (productHandleQueue.length && shown < config.howManyToShow) {
        fetch(`${window.theme.routes.root}products/${productHandleQueue[0]}?section_id=api-product-grid-item`)
          .then((response) => response.text())
          .then((product) => {
            const aosDelay = shown * 150;
            const aosImageDuration = shown * 100 + 800;
            const aosTextDuration = shown * 50 + 800;
            const anchorAnimation = wrapper.id ? `#${wrapper.id}` : '';
            const fresh = document.createElement('div');
            let productReplaced = product.includes('||itemIndex||') ? product.replaceAll('||itemIndex||', shown) : product;
            productReplaced = productReplaced.includes('||itemAosDelay||') ? productReplaced.replaceAll('||itemAosDelay||', aosDelay) : productReplaced;
            productReplaced = productReplaced.includes('||itemAosImageDuration||') ? productReplaced.replaceAll('||itemAosImageDuration||', aosImageDuration) : productReplaced;
            productReplaced = productReplaced.includes('||itemAosTextDuration||') ? productReplaced.replaceAll('||itemAosTextDuration||', aosTextDuration) : productReplaced;
            productReplaced = productReplaced.includes('||itemAnimationAnchor||') ? productReplaced.replaceAll('||itemAnimationAnchor||', anchorAnimation) : productReplaced;
            fresh.innerHTML = productReplaced;

            wrapper.innerHTML += fresh.querySelector('[data-api-content]').innerHTML;

            productHandleQueue.shift();
            shown++;
            moveAlong(shown, productHandleQueue, wrapper, section);
          })
          .catch(() => {
            cookie.remove(productHandleQueue[0]);
            productHandleQueue.shift();
            moveAlong(shown, productHandleQueue, wrapper, section);
          });
      } else {
        finalize(wrapper, section);
      }
    };

    return {
      showRecentlyViewed: function (params) {
        const paramsNew = params || {};
        const shown = 0;

        // Update defaults.
        Object.assign(config, paramsNew);

        // Read cookie.
        productHandleQueue = cookie.read();

        // Element where to insert.
        wrapper = document.querySelector(`#${config.wrapperId}`);

        // How many products to show.
        howManyToShowItems = config.howManyToShow;
        config.howManyToShow = Math.min(productHandleQueue.length, config.howManyToShow);

        // If we have any to show.
        if (config.howManyToShow && wrapper) {
          // Getting each product with an Ajax call and rendering it on the page.
          moveAlong(shown, productHandleQueue, wrapper, config.section);
        }
      },

      getConfig: function () {
        return config;
      },

      clearList: function () {
        cookie.destroy();
      },

      recordRecentlyViewed: function (params) {
        const paramsNew = params || {};

        // Update defaults.
        Object.assign(config, paramsNew);

        // Read cookie.
        let recentlyViewed = cookie.read();

        // If we are on a product page.
        if (window.location.pathname.indexOf('/products/') !== -1) {
          // What is the product handle on this page.
          const productHandle = decodeURIComponent(window.location.pathname)
            .match(
              /\/products\/([a-z0-9\-]|[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|[\u203B]|[\w\u0430-\u044f]|[\u0400-\u04FF]|[\u0900-\u097F]|[\u0590-\u05FF\u200f\u200e]|[\u0621-\u064A\u0660-\u0669 ])+/
            )[0]
            .split('/products/')[1];
          // In what position is that product in memory.
          const position = recentlyViewed.indexOf(productHandle);

          // If not in memory.
          if (position === -1) {
            // Add product at the start of the list.
            recentlyViewed.unshift(productHandle);
            // Only keep what we need.
            recentlyViewed = recentlyViewed.splice(0, config.howManyToStoreInMemory);
          } else {
            // Remove the product and place it at start of list.
            recentlyViewed.splice(position, 1);
            recentlyViewed.unshift(productHandle);
          }

          // Update cookie.
          cookie.write(recentlyViewed);
        }
      },

      hasProducts: cookie.read().length > 0,
    };
  })();

  const getUrlString = (params, keys = [], isArray = false) => {
    const p = Object.keys(params)
      .map((key) => {
        let val = params[key];

        if ('[object Object]' === Object.prototype.toString.call(val) || Array.isArray(val)) {
          if (Array.isArray(params)) {
            keys.push('');
          } else {
            keys.push(key);
          }
          return getUrlString(val, keys, Array.isArray(val));
        } else {
          let tKey = key;

          if (keys.length > 0) {
            const tKeys = isArray ? keys : [...keys, key];
            tKey = tKeys.reduce((str, k) => {
              return '' === str ? k : `${str}[${k}]`;
            }, '');
          }
          if (isArray) {
            return `${tKey}[]=${val}`;
          } else {
            return `${tKey}=${val}`;
          }
        }
      })
      .join('&');

    keys.pop();
    return p;
  };

  const hideElement = (elem) => {
    if (elem) {
      elem.style.display = 'none';
    }
  };

  const fadeIn = (el, display, callback = null) => {
    el.style.opacity = 0;
    el.style.display = display || 'block';
    let flag = true;

    (function fade() {
      let val = parseFloat(el.style.opacity);
      if (!((val += 0.1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }

      if (parseInt(val) === 1 && flag && typeof callback === 'function') {
        flag = false;
        callback();
      }
    })();
  };

  /**
   * Module to add a shipping rates calculator to cart page.
   *
   * Copyright (c) 2011-2012 Caroline Schnapp (11heavens.com)
   * Dual licensed under the MIT and GPL licenses:
   * http://www.opensource.org/licenses/mit-license.php
   * http://www.gnu.org/licenses/gpl.html
   *
   * Modified version -- coupled with Broadcast theme markup
   *
   */

  if (typeof Shopify.Cart === 'undefined') {
    Shopify.Cart = {};
  }

  Shopify.Cart.ShippingCalculator = (function () {
    const _config = {
      submitButton: theme.strings.shippingCalcSubmitButton,
      submitButtonDisabled: theme.strings.shippingCalcSubmitButtonDisabled,
      templateId: 'shipping-calculator-response-template',
      wrapperId: 'wrapper-response',
      customerIsLoggedIn: false,
    };
    const _render = function (response) {
      const template = document.querySelector(`#${_config.templateId}`);
      const wrapper = document.querySelector(`#${_config.wrapperId}`);

      if (template && wrapper) {
        wrapper.innerHTML = '';
        let ratesList = '';
        let ratesText = '';
        let successClass = 'error center';
        let markup = template.innerHTML;
        const rateRegex = /[^[\]]+(?=])/g;

        if (response.rates && response.rates.length) {
          let rateTemplate = rateRegex.exec(markup)[0];
          response.rates.forEach((rate) => {
            let rateHtml = rateTemplate;
            rateHtml = rateHtml.replace(/\|\|rateName\|\|/, rate.name);
            rateHtml = rateHtml.replace(/\|\|ratePrice\|\|/, Shopify.Cart.ShippingCalculator.formatRate(rate.price));
            ratesList += rateHtml;
          });
        }

        if (response.success) {
          successClass = 'success center';
          const createdNewElem = document.createElement('div');
          createdNewElem.innerHTML = template.innerHTML;
          const noShippingElem = createdNewElem.querySelector('[data-template-no-shipping]');

          if (response.rates.length < 1 && noShippingElem) {
            ratesText = noShippingElem.getAttribute('data-template-no-shipping');
          }
        } else {
          ratesText = response.errorFeedback;
        }

        markup = markup.replace(rateRegex, '').replace('[]', '');
        markup = markup.replace(/\|\|ratesList\|\|/g, ratesList);
        markup = markup.replace(/\|\|successClass\|\|/g, successClass);
        markup = markup.replace(/\|\|ratesText\|\|/g, ratesText);

        wrapper.innerHTML += markup;
      }
    };
    const _enableButtons = function () {
      const getRatesButton = document.querySelector('.get-rates');
      getRatesButton.removeAttribute('disabled');
      getRatesButton.classList.remove('disabled');
      getRatesButton.value = _config.submitButton;
    };
    const _disableButtons = function () {
      const getRatesButton = document.querySelector('.get-rates');
      getRatesButton.setAttribute('disabled', 'disabled');
      getRatesButton.classList.add('disabled');
      getRatesButton.value = _config.submitButtonDisabled;
    };
    const _getCartShippingRatesForDestination = function (shipping_address) {
      const encodedShippingAddressData = encodeURI(
        getUrlString({
          shipping_address: shipping_address,
        })
      );
      const url = `${window.theme.routes.cart}/shipping_rates.json?${encodedShippingAddressData}`;
      const request = new XMLHttpRequest();
      request.open('GET', url, true);

      request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
          const response = JSON.parse(this.response);
          const rates = response.shipping_rates;
          _onCartShippingRatesUpdate(rates, shipping_address);
        } else {
          _onError(this);
        }
      };

      request.onerror = function () {
        _onError(this);
      };

      request.send();
    };
    const _fullMessagesFromErrors = function (errors) {
      const fullMessages = [];

      for (const error in errors) {
        for (const message of errors[error]) {
          fullMessages.push(error + ' ' + message);
        }
      }

      return fullMessages;
    };
    const _onError = function (XMLHttpRequest) {
      hideElement(document.querySelector('#estimated-shipping'));

      const shippingChild = document.querySelector('#estimated-shipping em');
      if (shippingChild) {
        while (shippingChild.firstChild) shippingChild.removeChild(shippingChild.firstChild);
      }
      _enableButtons();
      let feedback = '';
      const data = eval('(' + XMLHttpRequest.responseText + ')');
      if (data.message) {
        feedback = data.message + '(' + data.status + '): ' + data.description;
      } else {
        feedback = 'Error : ' + _fullMessagesFromErrors(data).join('; ');
      }
      if (feedback === 'Error : country is not supported.') {
        feedback = 'We do not ship to this destination.';
      }
      _render({
        rates: [],
        errorFeedback: feedback,
        success: false,
      });

      showElement(document.querySelector(`#${_config.wrapperId}`));
    };
    const _onCartShippingRatesUpdate = function (rates, shipping_address) {
      _enableButtons();
      let readable_address = '';
      if (shipping_address.zip) {
        readable_address += shipping_address.zip + ', ';
      }
      if (shipping_address.province) {
        readable_address += shipping_address.province + ', ';
      }
      readable_address += shipping_address.country;
      const shippingChild = document.querySelector('#estimated-shipping em');
      if (rates.length && shippingChild) {
        shippingChild.textContent = rates[0].price == '0.00' ? window.theme.strings.free : themeCurrency.formatMoney(rates[0].price, theme.moneyFormat);
      }
      _render({
        rates: rates,
        address: readable_address,
        success: true,
      });

      const fadeElements = document.querySelectorAll(`#${_config.wrapperId}, #estimated-shipping`);

      if (fadeElements.length) {
        fadeElements.forEach((element) => {
          fadeIn(element);
        });
      }
    };

    const _init = function () {
      const getRatesButton = document.querySelector('.get-rates');
      const fieldsContainer = document.querySelector('#address_container');
      const selectCountry = document.querySelector('#address_country');
      const selectProvince = document.querySelector('#address_province');
      const htmlEl = document.querySelector('html');
      let locale = 'en';
      if (htmlEl.hasAttribute('lang') && htmlEl.getAttribute('lang') !== '') {
        locale = htmlEl.getAttribute('lang');
      }

      if (fieldsContainer) {
        themeAddresses.AddressForm(fieldsContainer, locale, {
          shippingCountriesOnly: true,
        });
      }

      if (selectCountry && selectCountry.hasAttribute('data-default') && selectProvince && selectProvince.hasAttribute('data-default')) {
        selectCountry.addEventListener('change', function () {
          selectCountry.removeAttribute('data-default');
          selectProvince.removeAttribute('data-default');
        });
      }

      if (getRatesButton) {
        getRatesButton.addEventListener('click', function (e) {
          _disableButtons();
          const wrapper = document.querySelector(`#${_config.wrapperId}`);
          while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
          hideElement(wrapper);
          const shippingAddress = {};
          let elemCountryVal = selectCountry.value;
          let elemProvinceVal = selectProvince.value;
          const elemCountryData = selectCountry.getAttribute('data-default-fullname');
          if (elemCountryVal === '' && elemCountryData && elemCountryData !== '') {
            elemCountryVal = elemCountryData;
          }
          const elemProvinceData = selectProvince.getAttribute('data-default-fullname');
          if (elemProvinceVal === '' && elemProvinceData && elemProvinceData !== '') {
            elemProvinceVal = elemProvinceData;
          }
          shippingAddress.zip = document.querySelector('#address_zip').value || '';
          shippingAddress.country = elemCountryVal || '';
          shippingAddress.province = elemProvinceVal || '';
          _getCartShippingRatesForDestination(shippingAddress);
        });

        if (_config.customerIsLoggedIn && getRatesButton.classList.contains('get-rates--trigger')) {
          const zipElem = document.querySelector('#address_zip');
          if (zipElem && zipElem.value) {
            getRatesButton.dispatchEvent(new Event('click'));
          }
        }
      }
    };
    return {
      show: function (params) {
        params = params || {};
        Object.assign(_config, params);
        document.addEventListener('DOMContentLoaded', function () {
          _init();
        });
      },
      getConfig: function () {
        return _config;
      },
      formatRate: function (cents) {
        const price = cents === '0.00' ? window.theme.strings.free : themeCurrency.formatMoney(cents, theme.moneyFormat);
        return price;
      },
    };
  })();

  function isVisible(el) {
    var style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden';
  }

  /**
   * A11y Helpers
   * -----------------------------------------------------------------------------
   * A collection of useful functions that help make your theme more accessible
   */

  /**
   * Moves focus to an HTML element
   * eg for In-page links, after scroll, focus shifts to content area so that
   * next `tab` is where user expects. Used in bindInPageLinks()
   * eg move focus to a modal that is opened. Used in trapFocus()
   *
   * @param {Element} container - Container DOM element to trap focus inside of
   * @param {Object} options - Settings unique to your theme
   * @param {string} options.className - Class name to apply to element on focus.
   */
  function forceFocus(element, options) {
    options = options || {};

    var savedTabIndex = element.tabIndex;

    element.tabIndex = -1;
    element.dataset.tabIndex = savedTabIndex;
    element.focus();
    if (typeof options.className !== 'undefined') {
      element.classList.add(options.className);
    }
    element.addEventListener('blur', callback);

    function callback(event) {
      event.target.removeEventListener(event.type, callback);

      element.tabIndex = savedTabIndex;
      delete element.dataset.tabIndex;
      if (typeof options.className !== 'undefined') {
        element.classList.remove(options.className);
      }
    }
  }

  /**
   * If there's a hash in the url, focus the appropriate element
   * This compensates for older browsers that do not move keyboard focus to anchor links.
   * Recommendation: To be called once the page in loaded.
   *
   * @param {Object} options - Settings unique to your theme
   * @param {string} options.className - Class name to apply to element on focus.
   * @param {string} options.ignore - Selector for elements to not include.
   */

  function focusHash(options) {
    options = options || {};
    var hash = window.location.hash;
    var element = document.getElementById(hash.slice(1));

    // if we are to ignore this element, early return
    if (element && options.ignore && element.matches(options.ignore)) {
      return false;
    }

    if (hash && element) {
      forceFocus(element, options);
    }
  }

  /**
   * When an in-page (url w/hash) link is clicked, focus the appropriate element
   * This compensates for older browsers that do not move keyboard focus to anchor links.
   * Recommendation: To be called once the page in loaded.
   *
   * @param {Object} options - Settings unique to your theme
   * @param {string} options.className - Class name to apply to element on focus.
   * @param {string} options.ignore - CSS selector for elements to not include.
   */

  function bindInPageLinks(options) {
    options = options || {};
    var links = Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]'));

    function queryCheck(selector) {
      return document.getElementById(selector) !== null;
    }

    return links.filter(function (link) {
      if (link.hash === '#' || link.hash === '') {
        return false;
      }

      if (options.ignore && link.matches(options.ignore)) {
        return false;
      }

      if (!queryCheck(link.hash.substr(1))) {
        return false;
      }

      var element = document.querySelector(link.hash);

      if (!element) {
        return false;
      }

      link.addEventListener('click', function () {
        forceFocus(element, options);
      });

      return true;
    });
  }

  function focusable(container) {
    var elements = Array.prototype.slice.call(
      container.querySelectorAll('[tabindex],' + '[draggable],' + 'a[href],' + 'area,' + 'button:enabled,' + 'input:not([type=hidden]):enabled,' + 'object,' + 'select:enabled,' + 'textarea:enabled')
    );

    // Filter out elements that are not visible.
    // Copied from jQuery https://github.com/jquery/jquery/blob/2d4f53416e5f74fa98e0c1d66b6f3c285a12f0ce/src/css/hiddenVisibleSelectors.js
    return elements.filter(function (element) {
      return !!((element.offsetWidth || element.offsetHeight || element.getClientRects().length) && isVisible(element));
    });
  }

  /**
   * Traps the focus in a particular container
   *
   * @param {Element} container - Container DOM element to trap focus inside of
   * @param {Element} elementToFocus - Element to be focused on first
   * @param {Object} options - Settings unique to your theme
   * @param {string} options.className - Class name to apply to element on focus.
   */

  var trapFocusHandlers = {};

  function trapFocus(container, options) {
    options = options || {};
    var elements = focusable(container);
    var elementToFocus = options.elementToFocus || container;
    var first = elements[0];
    var last = elements[elements.length - 1];

    removeTrapFocus();

    trapFocusHandlers.focusin = function (event) {
      if (container !== event.target && !container.contains(event.target) && first && first === event.target) {
        first.focus();
      }

      if (event.target !== container && event.target !== last && event.target !== first) return;
      document.addEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.focusout = function () {
      document.removeEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.keydown = function (event) {
      if (event.keyCode !== window.theme.keyboardKeys.TAB) return; // If not TAB key

      // On the last focusable element and tab forward, focus the first element.
      if (event.target === last && !event.shiftKey) {
        event.preventDefault();
        first.focus();
      }

      //  On the first focusable element and tab backward, focus the last element.
      if ((event.target === container || event.target === first) && event.shiftKey) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener('focusout', trapFocusHandlers.focusout);
    document.addEventListener('focusin', trapFocusHandlers.focusin);

    forceFocus(elementToFocus, options);
  }

  /**
   * Removes the trap of focus from the page
   */
  function removeTrapFocus() {
    document.removeEventListener('focusin', trapFocusHandlers.focusin);
    document.removeEventListener('focusout', trapFocusHandlers.focusout);
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  }

  /**
   * Add a preventive message to external links and links that open to a new window.
   * @param {string} elements - Specific elements to be targeted
   * @param {object} options.messages - Custom messages to overwrite with keys: newWindow, external, newWindowExternal
   * @param {string} options.messages.newWindow - When the link opens in a new window (e.g. target="_blank")
   * @param {string} options.messages.external - When the link is to a different host domain.
   * @param {string} options.messages.newWindowExternal - When the link is to a different host domain and opens in a new window.
   * @param {object} options.prefix - Prefix to namespace "id" of the messages
   */
  function accessibleLinks(elements, options) {
    if (typeof elements !== 'string') {
      throw new TypeError(elements + ' is not a String.');
    }

    elements = document.querySelectorAll(elements);

    if (elements.length === 0) {
      return;
    }

    options = options || {};
    options.messages = options.messages || {};

    var messages = {
      newWindow: options.messages.newWindow || 'Opens in a new window.',
      external: options.messages.external || 'Opens external website.',
      newWindowExternal: options.messages.newWindowExternal || 'Opens external website in a new window.',
    };

    var prefix = options.prefix || 'a11y';

    var messageSelectors = {
      newWindow: prefix + '-new-window-message',
      external: prefix + '-external-message',
      newWindowExternal: prefix + '-new-window-external-message',
    };

    function generateHTML(messages) {
      var container = document.createElement('ul');
      var htmlMessages = Object.keys(messages).reduce(function (html, key) {
        return (html += '<li id=' + messageSelectors[key] + '>' + messages[key] + '</li>');
      }, '');

      container.setAttribute('hidden', true);
      container.innerHTML = htmlMessages;

      document.body.appendChild(container);
    }

    function externalSite(link) {
      return link.hostname !== window.location.hostname;
    }

    elements.forEach(function (link) {
      var target = link.getAttribute('target');
      var rel = link.getAttribute('rel');
      var isExternal = externalSite(link);
      var isTargetBlank = target === '_blank';
      var missingRelNoopener = rel === null || rel.indexOf('noopener') === -1;

      if (isTargetBlank && missingRelNoopener) {
        var relValue = rel === null ? 'noopener' : rel + ' noopener';
        link.setAttribute('rel', relValue);
      }

      if (isExternal && isTargetBlank) {
        link.setAttribute('aria-describedby', messageSelectors.newWindowExternal);
      } else if (isExternal) {
        link.setAttribute('aria-describedby', messageSelectors.external);
      } else if (isTargetBlank) {
        link.setAttribute('aria-describedby', messageSelectors.newWindow);
      }
    });

    generateHTML(messages);
  }

  var a11y = /*#__PURE__*/Object.freeze({
    __proto__: null,
    forceFocus: forceFocus,
    focusHash: focusHash,
    bindInPageLinks: bindInPageLinks,
    focusable: focusable,
    trapFocus: trapFocus,
    removeTrapFocus: removeTrapFocus,
    accessibleLinks: accessibleLinks
  });

  function FetchError(object) {
    this.status = object.status || null;
    this.headers = object.headers || null;
    this.json = object.json || null;
    this.body = object.body || null;
  }
  FetchError.prototype = Error.prototype;

  const selectors = {
    quantityHolder: '[data-quantity-holder]',
    quantityField: '[data-quantity-field]',
    quantityButton: '[data-quantity-button]',
    quantityMinusButton: '[data-quantity-minus]',
    quantityPlusButton: '[data-quantity-plus]',
    quantityReadOnly: 'read-only',
    isDisabled: 'is-disabled',
  };

  class QuantityCounter {
    constructor(holder, inCart = false) {
      this.holder = holder;
      this.quantityUpdateCart = inCart;
    }

    init() {
      // Settings
      this.settings = selectors;

      // DOM Elements
      this.quantity = this.holder.querySelector(this.settings.quantityHolder);

      if (!this.quantity) {
        return;
      }

      this.field = this.quantity.querySelector(this.settings.quantityField);
      this.buttons = this.quantity.querySelectorAll(this.settings.quantityButton);
      this.increaseButton = this.quantity.querySelector(this.settings.quantityPlusButton);

      // Set value or classes
      this.quantityValue = Number(this.field.value || 0);
      this.cartItemID = this.field.getAttribute('data-id');
      this.maxValue = Number(this.field.getAttribute('max')) > 0 ? Number(this.field.getAttribute('max')) : null;
      this.minValue = Number(this.field.getAttribute('min')) > 0 ? Number(this.field.getAttribute('min')) : 0;
      this.disableIncrease = this.disableIncrease.bind(this);

      // Flags
      this.emptyField = false;

      // Methods
      this.updateQuantity = this.updateQuantity.bind(this);
      this.decrease = this.decrease.bind(this);
      this.increase = this.increase.bind(this);

      this.disableIncrease();

      // Events
      if (!this.quantity.classList.contains(this.settings.quantityReadOnly)) {
        this.changeValueOnClick();
        this.changeValueOnInput();
      }
    }

    /**
     * Change field value when click on quantity buttons
     *
     * @return  {Void}
     */

    changeValueOnClick() {
      const that = this;

      this.buttons.forEach((element) => {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          const clickedElement = event.target;
          const isDescrease = clickedElement.matches(that.settings.quantityMinusButton) || clickedElement.closest(that.settings.quantityMinusButton);
          const isIncrease = clickedElement.matches(that.settings.quantityPlusButton) || clickedElement.closest(that.settings.quantityPlusButton);

          if (isDescrease) {
            that.decrease();
          }

          if (isIncrease) {
            that.increase();
          }

          that.updateQuantity();
        });
      });
    }

    /**
     * Change field value when input new value in a field
     *
     * @return  {Void}
     */

    changeValueOnInput() {
      const that = this;

      this.field.addEventListener(
        'input',
        function () {
          that.quantityValue = this.value;

          if (this.value === '') {
            that.emptyField = true;
          }

          that.updateQuantity();
        },
        this
      );
    }

    /**
     * Update field value
     *
     * @return  {Void}
     */

    updateQuantity() {
      if (this.maxValue < this.quantityValue && this.maxValue !== null) {
        this.quantityValue = this.maxValue;
      }

      if (this.minValue > this.quantityValue) {
        this.quantityValue = this.minValue;
      }

      this.field.value = this.quantityValue;

      this.disableIncrease();

      document.dispatchEvent(new CustomEvent('theme:popout:update'));

      if (this.quantityUpdateCart) {
        this.updateCart();
      }
    }

    /**
     * Decrease value
     *
     * @return  {Void}
     */

    decrease() {
      if (this.quantityValue > this.minValue) {
        this.quantityValue--;

        return;
      }

      this.quantityValue = 0;
    }

    /**
     * Increase value
     *
     * @return  {Void}
     */

    increase() {
      this.quantityValue++;
    }

    /**
     * Disable increase
     *
     * @return  {[type]}  [return description]
     */

    disableIncrease() {
      this.increaseButton.classList.toggle(this.settings.isDisabled, this.quantityValue >= this.maxValue && this.maxValue !== null);
    }

    /**
     * Update cart
     *
     * @return  {Void}
     */

    updateCart() {
      const event = new CustomEvent('theme:cart:update', {
        bubbles: true,
        detail: {
          id: this.cartItemID,
          quantity: this.quantityValue,
          valueIsEmpty: this.emptyField,
        },
      });

      this.holder.dispatchEvent(event);
    }
  }

  const classes = {
    animated: 'animated',
    active: 'is-active',
    added: 'is-added',
    disabled: 'is-disabled',
    drawerVisible: 'drawer--visible',
    error: 'has-error',
    headerStuck: 'js__header__stuck',
    hidden: 'is-hidden',
    loading: 'is-loading',
    open: 'is-open',
    success: 'is-success',
    visible: 'is-visible',
    focused: 'is-focused',
    expanded: 'is-expanded',
    updated: 'is-updated',
  };

  const selectors$1 = {
    apiContent: '[data-api-content]',
    apiLineItems: '[data-api-line-items]',
    apiUpsellItems: '[data-api-upsell-items]',
    animation: '[data-animation]',
    additionalCheckoutButtons: '.additional-checkout-buttons',
    burgerButton: '[data-drawer-toggle]',
    buttonAddToCart: '[data-add-to-cart]',
    buttonQuickAddMobile: '[data-quick-add-btn-mobile]',
    buttonHolder: '[data-foot-holder]',
    buttonSkipUpsellProduct: '[data-skip-upsell-product]',
    cartBarAdd: '[data-add-to-cart-bar]',
    cartCloseError: '[data-cart-error-close]',
    cartDiscountsHolder: '[data-cart-discounts-holder]',
    cartDrawer: '[data-cart-drawer]',
    cartDrawerBody: '[data-cart-drawer-body]',
    cartEmpty: '[data-cart-empty]',
    cartErrors: '[data-cart-errors]',
    cartItemRemove: '[data-item-remove]',
    cartMessage: '[data-cart-message]',
    cartMessageValue: 'data-cart-message',
    cartOriginalTotal: '[data-cart-original-total]',
    cartOriginaTotalPrice: '[data-cart-original-total-price]',
    cartPage: '[data-cart-page]',
    cartProgress: '[data-cart-progress]',
    cartToggleElement: '[data-cart-toggle]',
    cartTotal: '[data-cart-total]',
    cartTotalDiscountsTemplate: '[data-cart-total-discount]',
    cartWidget: '[data-cart-widget]',
    cartWidgetContent: '[data-cart-widget-content]',
    expandButton: '[data-expand-button]',
    errorMessage: '[data-error-message]',
    formCloseError: '[data-close-error]',
    formErrorsContainer: '[data-cart-errors-container]',
    headerWrapper: '[data-header-wrapper]',
    item: '[data-item]',
    itemsHolder: '[data-items-holder]',
    leftToSpend: '[data-left-to-spend]',
    navDrawer: '[data-drawer]',
    outerSection: '[data-section-id]',
    upsellProductsHolder: '[data-upsell-products]',
    quickAddHolder: '[data-quick-add-holder]',
    quickAddModal: '[data-quick-add-modal]',
    quickAddButtonText: '[data-quick-add-btn-text]',
    qtyInput: '[data-quantity-field]',
  };

  const attributes = {
    quickAddHolder: 'data-quick-add-holder',
    quickAddVariant: 'data-quick-add-variant',
  };

  const settings = {
    cartDrawerEnabled: window.theme.settings.cartDrawerEnabled,
    times: {
      timeoutAnimationComplete: 500,
      timeoutButtonReset: 1000,
    },
  };

  class CartDrawer {
    constructor() {
      if (window.location.pathname.endsWith('/password')) {
        return;
      }

      this.init();
    }

    init() {
      // DOM Elements
      this.html = document.documentElement;
      this.body = document.body;
      this.cartPage = document.querySelector(selectors$1.cartPage);
      this.cartDrawer = document.querySelector(selectors$1.cartDrawer);
      this.cartDrawerBody = document.querySelector(selectors$1.cartDrawerBody);
      this.cartEmpty = document.querySelector(selectors$1.cartEmpty);
      this.buttonHolder = document.querySelector(selectors$1.buttonHolder);
      this.itemsHolder = document.querySelector(selectors$1.itemsHolder);
      this.items = document.querySelectorAll(selectors$1.item);
      this.cartTotal = document.querySelector(selectors$1.cartTotal);
      this.cartMessage = document.querySelectorAll(selectors$1.cartMessage);
      this.cartOriginalTotal = document.querySelector(selectors$1.cartOriginalTotal);
      this.cartOriginaTotalPrice = document.querySelector(selectors$1.cartOriginaTotalPrice);
      this.cartDiscountHolder = document.querySelector(selectors$1.cartDiscountsHolder);
      this.expandButton = document.querySelectorAll(selectors$1.expandButton);
      this.cartTotalDiscountTemplate = document.querySelector(selectors$1.cartTotalDiscountsTemplate).innerHTML;
      this.cartErrorHolder = document.querySelector(selectors$1.cartErrors);
      this.cartCloseErrorMessage = document.querySelector(selectors$1.cartCloseError);
      this.headerWrapper = document.querySelector(selectors$1.headerWrapper);
      this.accessibility = a11y;
      this.navDrawer = document.querySelector(selectors$1.navDrawer);
      this.upsellProductsHolder = document.querySelector(selectors$1.upsellProductsHolder);

      // Define Cart object depending on if we have cart drawer or cart page
      this.cart = this.cartDrawer || this.cartPage;

      this.form = null;

      this.build = this.build.bind(this);

      // AJAX request
      this.addToCart = this.addToCart.bind(this);
      this.updateCart = this.updateCart.bind(this);
      this.addToCartCallback = this.addToCartCallback.bind(this);
      this.productAddCallback = this.productAddCallback.bind(this);

      // Cart events
      this.openCartDrawer = this.openCartDrawer.bind(this);
      this.closeCartDrawer = this.closeCartDrawer.bind(this);
      this.toggleCartDrawer = this.toggleCartDrawer.bind(this);
      this.openCartDrawerOnProductAdded = this.openCartDrawerOnProductAdded.bind(this);
      this.animateItems = this.animateItems.bind(this);
      this.requestItemsAnimationFrame = this.requestItemsAnimationFrame.bind(this);
      this.cartAnimationTimeout = 0;

      // Upsell products
      this.skipUpsellProductsArray = [];
      this.skipUpsellProductEvent();
      this.checkSkippedUpsellProductsFromStorage();
      this.toggleCartUpsellWidgetVisibility();

      // Checking
      this.hasItemsInCart = this.hasItemsInCart.bind(this);

      // Set classes
      this.toggleClassesOnContainers = this.toggleClassesOnContainers.bind(this);

      // Cart variables
      this.subtotal = window.theme.subtotal;

      // Flags
      this.totalItems = this.items.length;
      this.cartDrawerIsOpen = false;
      this.cartDiscounts = 0;
      this.cartDrawerEnabled = settings.cartDrawerEnabled;
      this.cartUpdateFailed = false;

      // Cart Events
      this.eventToggleCart();
      this.expandEvents();
      this.cartEvents();
      this.cartEventAdd();
      this.cartEventRemoveError();

      // Init quantity for fields
      this.initQuantity();

      // Set ATC button text width variable
      this.getQuickAddButtonTextWidth();

      // Init estimate shipping calculator
      this.estimateShippingCalculator();

      // Attributes
      if (this.cartMessage.length > 0) {
        this.cartFreeLimitShipping = Number(this.cartMessage[0].getAttribute('data-limit')) * 100 * window.Shopify.currency.rate;
        this.circumference = 28 * Math.PI; // radius - stroke * 4 * PI

        this.freeShippingMessageHandle(this.subtotal);
        this.updateProgress();
      }

      document.addEventListener('theme:cart:add', this.addToCartCallback);
      document.addEventListener('theme:cart:loaded', this.requestItemsAnimationFrame);
      document.addEventListener('theme:product:add', this.productAddCallback);
      document.addEventListener('theme:product:added', this.openCartDrawerOnProductAdded);
    }

    /**
     * Init quantity field functionality
     *
     * @return  {Void}
     */

    initQuantity() {
      this.items = document.querySelectorAll(selectors$1.item);

      this.items.forEach((item) => {
        const initQuantity = new QuantityCounter(item, true);

        initQuantity.init();
        this.cartUpdateEvent(item);
      });
    }

    /**
     * Expand blocks and close siblings
     *
     * @return  {Void}
     */

    expandEvents() {
      const widgets = document.querySelectorAll(selectors$1.cartWidget);

      this.expandButton.forEach((item) => {
        item.addEventListener('click', (event) => {
          event.preventDefault();

          const widget = document.querySelector(item.getAttribute('href'));

          item.classList.toggle(classes.active);
          widget.classList.toggle(classes.expanded);

          if (widgets.length > 1) {
            widgets.forEach((content) => {
              if (content !== widget.parentElement) {
                const buttonExpand = content.querySelector(selectors$1.expandButton);

                buttonExpand.classList.remove(classes.active);
                buttonExpand.nextElementSibling.classList.remove(classes.expanded);
              }
            });
          }
        });
      });
    }

    /**
     * Cart update event hook
     *
     * @return  {Void}
     */

    cartUpdateEvent(item) {
      item.addEventListener('theme:cart:update', () => {
        this.updateCart(
          {
            id: event.detail.id,
            quantity: event.detail.quantity,
          },
          item,
          event.detail.valueIsEmpty
        );
      });
    }

    /**
     *  Callback for add product to the cart
     */
    addToCartCallback(event) {
      const quickAddObject = event.detail;
      const button = event.detail.button;
      const formData = event.detail.data ? JSON.stringify({items: [event.detail.data]}) : null;

      if (!formData) return;

      this.addToCart(formData, quickAddObject, button);
    }

    /**
     * Cart events
     *
     * @return  {Void}
     */

    cartEvents() {
      const cartItemRemove = document.querySelectorAll(selectors$1.cartItemRemove);

      cartItemRemove.forEach((button) => {
        const item = button.closest(selectors$1.item);
        button.addEventListener('click', (event) => {
          event.preventDefault();

          if (button.classList.contains(classes.disabled)) return;

          this.updateCart(
            {
              id: button.dataset.id,
              quantity: 0,
            },
            item
          );
        });
      });

      if (this.cartCloseErrorMessage) {
        this.cartCloseErrorMessage.addEventListener('click', (event) => {
          event.preventDefault();

          this.cartErrorHolder.classList.remove(classes.expanded);
        });
      }
    }

    /**
     * Cart event add product to cart
     *
     * @return  {Void}
     */

    cartEventAdd() {
      document.addEventListener('click', (event) => {
        const clickedElement = event.target;

        if (clickedElement.matches(selectors$1.buttonAddToCart) || (clickedElement.closest(selectors$1.buttonAddToCart) && clickedElement)) {
          let formData = '';
          let button = clickedElement.matches(selectors$1.buttonAddToCart) ? clickedElement : clickedElement.closest(selectors$1.buttonAddToCart);

          if (button.hasAttribute(attributes.quickAddVariant)) {
            formData = JSON.stringify({
              items: [
                {
                  id: Number(button.getAttribute(attributes.quickAddVariant)),
                  quantity: 1,
                },
              ],
            });
          } else {
            this.form = clickedElement.closest('form');
            formData = new FormData(this.form);
          }

          if (this.form !== null && this.form.querySelector('[type="file"]')) {
            return;
          }

          event.preventDefault();

          if (clickedElement.hasAttribute('disabled') || clickedElement.parentNode.hasAttribute('disabled')) {
            return;
          }
          this.addToCart(formData, null, button);

          document.dispatchEvent(
            new CustomEvent('theme:cart:add', {
              bubbles: true,
              detail: {
                selector: clickedElement,
              },
            })
          );
        }
      });
    }

    /**
     * Cart event remove out of stock error
     *
     * @return  {Void}
     */

    cartEventRemoveError() {
      document.addEventListener('click', (event) => {
        const clickedElement = event.target;

        if (clickedElement.matches(selectors$1.formCloseError) || clickedElement.closest(selectors$1.formCloseError)) {
          event.preventDefault();

          const errorContainer = clickedElement.closest(selectors$1.formErrorsContainer);

          if (errorContainer) {
            errorContainer.classList.remove(classes.visible);
          }
        }
      });
    }

    /**
     * Estimate shippint calculator
     *
     * @return  {Void}
     */

    estimateShippingCalculator() {
      Shopify.Cart.ShippingCalculator.show({
        submitButton: theme.strings.shippingCalcSubmitButton,
        submitButtonDisabled: theme.strings.shippingCalcSubmitButtonDisabled,
        customerIsLoggedIn: theme.settings.customerLoggedIn,
        moneyFormat: theme.moneyWithCurrencyFormat,
      });
    }

    /**
     * Get response from the cart
     *
     * @return  {Void}
     */

    getCart() {
      fetch(theme.routes.root + 'cart.js')
        .then(this.cartErrorsHandler)
        .then((response) => response.json())
        .then((response) => {
          this.newTotalItems = response.items.length;
          this.subtotal = response.total_price;
          this.itemCount = response.item_count;
          this.cartDiscounts = response.total_discount;

          this.buildTotalPrice(response);

          document.dispatchEvent(
            new CustomEvent('theme:cart:change', {
              bubbles: true,
              detail: {
                cart: response,
              },
            })
          );

          return fetch(theme.routes.cart + '?section_id=api-cart-items');
        })
        .then((response) => response.text())
        .then((response) => {
          const element = document.createElement('div');
          element.innerHTML = response;

          const cleanResponse = element.querySelector(selectors$1.apiContent);
          this.build(cleanResponse);
        })
        .catch((error) => console.log(error));
    }

    /**
     * Add item(s) to the cart and show the added item(s)
     *
     * @param   {String}  data
     * @param   {DOM Element/Object}  quickAddHolder
     * @param   {DOM Element}  button
     *
     * @return  {Void}
     */

    addToCart(data, quickAddObject = null, button = null) {
      const quickAddHolder = quickAddObject ? quickAddObject.element : null;
      let buttonQuickAddMobile = null;
      let dataObj = {
        method: 'POST',
        body: data,
      };

      if (typeof data === 'string') {
        const headers = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        dataObj = {...dataObj, ...headers};
      }

      if (this.cartDrawerEnabled) {
        if (button) {
          button.classList.add(classes.loading);
          button.disabled = true;
        }

        if (quickAddHolder) {
          quickAddHolder.classList.add(classes.visible);
          buttonQuickAddMobile = quickAddHolder.querySelector(selectors$1.buttonQuickAddMobile);
        }
      }

      fetch(theme.routes.root + 'cart/add.js', dataObj)
        .then((response) => response.json())
        .then((response) => {
          if (response.status) {
            if (quickAddHolder !== null) {
              this.addToCartError(response, quickAddHolder, button);
            } else {
              this.addToCartError(response, null, button);
            }

            if (button) {
              button.classList.remove(classes.loading);
              button.disabled = false;
            }

            if (buttonQuickAddMobile) {
              buttonQuickAddMobile.classList.remove(classes.loading);
              buttonQuickAddMobile.disabled = false;
            }

            return;
          }

          if (this.cartDrawerEnabled) {
            if (button) {
              button.classList.remove(classes.hidden, classes.loading);
              button.classList.add(classes.added);

              button.dispatchEvent(
                new CustomEvent('theme:product:add', {
                  detail: {
                    response: response,
                    button: button,
                  },
                  bubbles: true,
                })
              );
            }

            if (buttonQuickAddMobile) {
              buttonQuickAddMobile.classList.remove(classes.hidden, classes.loading);
              buttonQuickAddMobile.classList.add(classes.added);
            }

            this.getCart();
          } else {
            window.location = theme.routes.cart;
          }
        })
        .catch((error) => console.log(error));
    }

    /**
     * Update cart
     *
     * @param   {Object}  updateData
     *
     * @return  {Void}
     */

    updateCart(updateData = {}, currentItem = null, valueIsEmpty = false) {
      let newCount = null;
      let oldCount = null;
      let newItem = null;
      let updatedQuantity = updateData.quantity;

      if (currentItem !== null) {
        currentItem.classList.add(classes.loading);
      }

      this.disableCartItems();

      fetch(theme.routes.root + 'cart.js')
        .then(this.cartErrorsHandler)
        .then((response) => response.json())
        .then((response) => {
          const matchKeys = (item) => item.key === updateData.id;
          const index = response.items.findIndex(matchKeys);
          oldCount = response.item_count;
          newItem = response.items[index].title;

          const data = {
            line: `${index + 1}`,
            quantity: updatedQuantity,
          };

          return fetch(theme.routes.root + 'cart/change.js', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
          });
        })
        .then(this.cartErrorsHandler)
        .then((response) => response.json())
        .then((response) => {
          if (valueIsEmpty) {
            updatedQuantity = 1;
          }

          if (updatedQuantity !== 0) {
            this.cartUpdateFailed = newCount === oldCount;
            this.updateErrorText(newItem);
          }

          this.getCart();
        })
        .catch((error) => console.log(error));
    }

    /**
     * Disable cart items buttons and inputs
     *
     * @return  {Void}
     */
    disableCartItems() {
      if (this.items) {
        this.items.forEach((item) => {
          const itemInput = item.querySelector('input');
          const itemButtons = item.querySelectorAll('button');

          item.classList.add(classes.disabled);
          itemInput.blur();
          itemInput.disabled = true;
          if (itemButtons.length) {
            itemButtons.forEach((itemButton) => {
              itemButton.disabled = true;
            });
          }
        });
      }
    }

    /**
     * Update error text
     *
     * @param   {String}  itemTitle
     *
     * @return  {Void}
     */

    updateErrorText(itemTitle) {
      this.cartErrorHolder.querySelector(selectors$1.errorMessage).innerText = itemTitle;
    }

    /**
     * Toggle error message
     *
     * @return  {Void}
     */

    toggleErrorMessage() {
      if (!this.cartErrorHolder) return;

      if (this.cartUpdateFailed) {
        this.cartErrorHolder.classList.add(classes.expanded);
      } else {
        this.cartErrorHolder.classList.remove(classes.expanded);
      }

      // Reset cart error events flag
      this.cartUpdateFailed = false;
    }

    /**
     * Handle errors
     *
     * @param   {Object}  response
     *
     * @return  {Object}
     */

    cartErrorsHandler(response) {
      if (!response.ok) {
        return response.json().then(function (json) {
          const e = new FetchError({
            status: response.statusText,
            headers: response.headers,
            json: json,
          });
          throw e;
        });
      }
      return response;
    }

    /**
     * Add to cart error handle
     *
     * @param   {Object}  data
     * @param   {DOM Element/Null} quickAddHolder
     * @param   {DOM Element/Null} button
     *
     * @return  {Void}
     */

    addToCartError(data, quickAddHolder, button) {
      if (this.cartDrawerEnabled && button && button.closest(selectors$1.cartDrawer) !== null && !button.closest(selectors$1.cartDrawer)) {
        this.closeCartDrawer();
      }

      if (button !== null) {
        const outerContainer = button.closest(selectors$1.outerSection) || button.closest(selectors$1.quickAddHolder) || button.closest(selectors$1.quickAddModal);
        let errorContainer = outerContainer?.querySelector(selectors$1.formErrorsContainer);
        const buttonUpsellHolder = button.closest(selectors$1.quickAddHolder);

        if (buttonUpsellHolder && buttonUpsellHolder.querySelector(selectors$1.formErrorsContainer)) {
          errorContainer = buttonUpsellHolder.querySelector(selectors$1.formErrorsContainer);
        }

        if (errorContainer) {
          errorContainer.innerHTML = `<div class="errors">${data.message}: ${data.description}<span class="errors__close" data-close-error><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" class="icon"><path d="M15.89 14.696l-4.734-4.734 4.717-4.717c.4-.4.37-1.085-.03-1.485s-1.085-.43-1.485-.03L9.641 8.447 4.97 3.776c-.4-.4-1.085-.37-1.485.03s-.43 1.085-.03 1.485l4.671 4.671-4.688 4.688c-.4.4-.37 1.085.03 1.485s1.085.43 1.485.03l4.688-4.687 4.734 4.734c.4.4 1.085.37 1.485-.03s.43-1.085.03-1.485z"/></svg></span></div>`;
          errorContainer.classList.add(classes.visible);
        }

        button.dispatchEvent(
          new CustomEvent('theme:product:add-error', {
            detail: {
              response: data,
            },
            bubbles: true,
          })
        );
      }

      if (quickAddHolder) {
        quickAddHolder.dispatchEvent(
          new CustomEvent('theme:cart:error', {
            bubbles: true,
            detail: {
              message: data.message,
              description: data.description,
              holder: quickAddHolder,
            },
          })
        );
      }
    }

    /**
     * Add product to cart events
     *
     * @return  {Void}
     */
    productAddCallback(event) {
      if (theme.settings.cartDrawerEnabled) {
        let buttons = [];
        let quickAddHolder = null;
        let buttonQuickAddMobile = null;
        const buttonATC = event.target;
        const cartBarButtonATC = document.querySelector(selectors$1.cartBarAdd);

        buttons.push(buttonATC);
        quickAddHolder = buttonATC.closest(selectors$1.quickAddHolder);

        if (quickAddHolder) {
          buttonQuickAddMobile = quickAddHolder.querySelector(selectors$1.buttonQuickAddMobile);
          if (buttonQuickAddMobile) {
            buttons.push(buttonQuickAddMobile);
          }
        }

        if (cartBarButtonATC) {
          buttons.push(cartBarButtonATC);
        }

        buttons.forEach((button) => {
          button.classList.remove(classes.loading);
          button.classList.add(classes.added);
        });

        setTimeout(() => {
          buttons.forEach((button) => {
            button.classList.remove(classes.added);
            button.disabled = false;
          });

          if (quickAddHolder) {
            quickAddHolder.classList.remove(classes.visible);
          }
        }, settings.times.timeoutButtonReset);
      }
    }

    /**
     * Open cart drawer when product is added to cart
     *
     * @return  {Void}
     */
    openCartDrawerOnProductAdded() {
      if (this.cartDrawer && !this.cartDrawerIsOpen) {
        this.openCartDrawer();
      }
    }

    /**
     * Open cart drawer and add class on body
     *
     * @return  {Void}
     */

    openCartDrawer() {
      this.cartDrawerIsOpen = true;

      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.cartDrawer}));
      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.cartDrawerBody}));

      this.cartDrawer.classList.add(classes.open);

      // Observe Additional Checkout Buttons
      this.observeAdditionalCheckoutButtons();

      // Animate cart items
      this.requestItemsAnimationFrame();

      // Trap focus after cart items animation is completed
      this.trapFocusAfterAnimationsComplete();
    }

    trapFocusAfterAnimationsComplete() {
      if (this.cartAnimationTimeout) {
        clearTimeout(this.cartAnimationTimeout);
      }
      this.cartAnimationTimeout = setTimeout(() => {
        this.accessibility.trapFocus(this.cartDrawer, {
          elementToFocus: this.cartDrawer.querySelector(selectors$1.cartToggleElement),
        });
      }, settings.times.timeoutAnimationComplete);
    }

    /**
     * Close cart drawer and remove class on body
     *
     * @return  {Void}
     */

    closeCartDrawer() {
      this.cartDrawerIsOpen = false;

      document.dispatchEvent(
        new CustomEvent('theme:cart:close', {
          bubbles: true,
        })
      );

      // Cart elements animation reset
      this.resetAnimatedItems();
      this.itemsHolder.classList.remove(classes.updated);
      this.cartEmpty.classList.remove(classes.updated);
      this.cartErrorHolder.classList.remove(classes.expanded);
      this.cartDrawer.classList.remove(classes.open);
      this.accessibility.removeTrapFocus();

      if (this.body.classList.contains(classes.focused)) {
        const buttonOpenCart = this.headerWrapper.querySelectorAll(`${selectors$1.cartToggleElement}`);
        if (buttonOpenCart.length) {
          buttonOpenCart.forEach((button) => {
            if (isVisible(button)) {
              setTimeout(() => {
                button.focus();
              }, 200);

              return true;
            }
          });
        }
      }

      document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
    }

    /**
     * Toggle cart drawer
     *
     * @return  {Void}
     */

    toggleCartDrawer() {
      if (!this.cartDrawerIsOpen) {
        this.openCartDrawer();
      } else {
        this.closeCartDrawer();
      }
    }

    /**
     * Event click to element to open cart drawer
     *
     * @return  {Void}
     */

    eventToggleCart() {
      document.addEventListener('click', (event) => {
        const clickedElement = event.target;
        const isNotCartButton = !(clickedElement.matches(selectors$1.cartToggleElement) || clickedElement.closest(selectors$1.cartToggleElement));
        const isNotCartDrawerOrCartDrawerChild = !(clickedElement.matches(selectors$1.cartDrawer) || clickedElement.closest(selectors$1.cartDrawer));
        const isNotPairProduct = !(clickedElement.matches(selectors$1.buttonSkipUpsellProduct) || clickedElement.closest(selectors$1.buttonSkipUpsellProduct));

        if (clickedElement.matches(selectors$1.cartToggleElement) || clickedElement.closest(selectors$1.cartToggleElement)) {
          event.preventDefault();

          this.toggleCartDrawer();
        } else if (this.cartDrawerIsOpen && isNotCartButton && isNotCartDrawerOrCartDrawerChild && isNotPairProduct) {
          this.closeCartDrawer();
        }
      });

      if (this.cartDrawer) {
        this.cartDrawer.addEventListener('keyup', (event) => {
          if (event.which === window.theme.keyboardKeys.ESCAPE) {
            this.closeCartDrawer();
          }
        });
      }
    }

    /**
     * Toggle classes on different containers and messages
     *
     * @return  {Void}
     */

    toggleClassesOnContainers() {
      const hasItemsInCart = this.hasItemsInCart();

      this.cartEmpty.classList.toggle(classes.hidden, hasItemsInCart);
      this.buttonHolder.classList.toggle(classes.hidden, !hasItemsInCart);
      this.itemsHolder.classList.toggle(classes.hidden, !hasItemsInCart);
    }

    /**
     * Build cart depends on results
     *
     * @param   {Object}  data
     *
     * @return  {Void}
     */

    build(data) {
      const cartItemsData = data.querySelector(selectors$1.apiLineItems);
      const upsellItemsData = data.querySelector(selectors$1.apiUpsellItems);
      const cartEmptyData = Boolean(cartItemsData === null && upsellItemsData === null);

      if (cartEmptyData) {
        this.itemsHolder.innerHTML = data;
        this.upsellProductsHolder.innerHTML = '';
      } else {
        this.itemsHolder.innerHTML = cartItemsData.innerHTML;
        this.upsellProductsHolder.innerHTML = upsellItemsData.innerHTML;
        this.getQuickAddButtonTextWidth();
        this.skipUpsellProductEvent();
        this.checkSkippedUpsellProductsFromStorage();
        this.toggleCartUpsellWidgetVisibility();
      }

      // Update cart total price
      this.cartTotal.innerHTML = this.subtotal === 0 ? window.theme.strings.free : themeCurrency.formatMoney(this.subtotal, theme.moneyWithCurrencyFormat);

      if (this.totalItems !== this.newTotalItems) {
        this.totalItems = this.newTotalItems;

        this.toggleClassesOnContainers();
      }

      // Add class "is-updated" line items holder to reduce cart items animation delay via CSS variables
      if (this.cartDrawerIsOpen) {
        this.itemsHolder.classList.add(classes.updated);
      }

      // Prepare empty cart buttons for animation
      if (!this.hasItemsInCart()) {
        this.cartEmpty.querySelectorAll(selectors$1.animation).forEach((item) => {
          item.classList.remove(classes.animated);
        });
      }

      this.freeShippingMessageHandle(this.subtotal);
      this.cartEvents();
      this.initQuantity();
      this.toggleErrorMessage();

      if (this.cartMessage.length > 0) {
        this.updateProgress();
      }

      document.dispatchEvent(
        new CustomEvent('theme:cart:loaded', {
          bubbles: true,
        })
      );

      document.dispatchEvent(
        new CustomEvent('theme:product:added', {
          bubbles: true,
        })
      );
    }

    /**
     * Calculate ATC button text width
     *
     * @return  {Void}
     */

    getQuickAddButtonTextWidth() {
      if (!this.upsellProductsHolder) return;

      const quickAddButtonsText = this.upsellProductsHolder.querySelectorAll(selectors$1.quickAddButtonText);

      if (quickAddButtonsText.length) {
        quickAddButtonsText.forEach((item) => {
          item.parentNode.style.setProperty('--btn-text-width', `${item.clientWidth}px`);
        });
      }
    }

    /**
     * Check for items in the cart
     *
     * @return  {Void}
     */

    hasItemsInCart() {
      return this.totalItems > 0;
    }

    /**
     * Build total cart total price
     *
     * @param   {Object}  data
     *
     * @return  {Void}
     */

    buildTotalPrice(data) {
      if (data.original_total_price > data.total_price && data.cart_level_discount_applications.length > 0) {
        this.cartOriginalTotal.classList.remove(classes.hidden);
        this.cartOriginaTotalPrice.innerHTML = data.original_total_price === 0 ? window.theme.strings.free : themeCurrency.formatMoney(data.original_total_price, theme.moneyFormat);
      } else {
        this.cartOriginalTotal.classList.add(classes.hidden);
      }

      if (data.cart_level_discount_applications.length > 0) {
        const discountsMarkup = this.buildCartTotalDiscounts(data.cart_level_discount_applications);

        this.cartDiscountHolder.classList.remove(classes.hidden);
        this.cartDiscountHolder.innerHTML = discountsMarkup;
      } else {
        this.cartDiscountHolder.classList.add(classes.hidden);
      }
    }

    /**
     * Build cart total discounts
     *
     * @param   {Array}  discounts
     *
     * @return  {String}
     */

    buildCartTotalDiscounts(discounts) {
      let discountMarkup = '';

      discounts.forEach((discount) => {
        discountMarkup += Sqrl.render(this.cartTotalDiscountTemplate, {
          discountTitle: discount.title,
          discountTotalAllocatedAmount: themeCurrency.formatMoney(discount.total_allocated_amount, theme.moneyFormat),
        });
      });

      return discountMarkup;
    }

    /**
     * Show/hide free shipping message
     *
     * @param   {Number}  total
     *
     * @return  {Void}
     */

    freeShippingMessageHandle(total) {
      if (this.cartMessage.length > 0) {
        document.querySelectorAll(selectors$1.cartMessage).forEach((message) => {
          const hasQualifiedShippingMessage = message.hasAttribute(selectors$1.cartMessageValue) && message.getAttribute(selectors$1.cartMessageValue) === 'true' && total !== 0;

          message.classList.toggle(classes.success, hasQualifiedShippingMessage && total >= this.cartFreeLimitShipping);
          message.classList.toggle(classes.hidden, total === 0 || !hasQualifiedShippingMessage);
        });
      }
    }

    /**
     * Cart bar progress with message for free shipping
     *
     * @param   {Number}  progress
     *
     */
    cartBarProgress(progress = null) {
      document.querySelectorAll(selectors$1.cartProgress).forEach((element) => {
        this.setProgress(element, progress === null ? element.getAttribute('data-percent') : progress);
      });
    }

    /**
     * Set circle progress
     *
     * @param   {DOM Element}  holder
     * @param   {Number}       percent
     *
     * @return  {Void}
     */

    setProgress(holder, percent) {
      const offset = this.circumference - ((percent / 100) * this.circumference) / 2;

      holder.style.strokeDashoffset = offset;
    }

    /**
     * Update progress when update cart
     *
     * @return  {Void}
     */

    updateProgress() {
      const newPercentValue = (this.subtotal / this.cartFreeLimitShipping) * 100;
      const leftToSpend = themeCurrency.formatMoney(this.cartFreeLimitShipping - this.subtotal, theme.moneyFormat);

      document.querySelectorAll(selectors$1.leftToSpend).forEach((element) => {
        element.innerHTML = leftToSpend;
      });

      this.cartBarProgress(newPercentValue > 100 ? 100 : newPercentValue);
    }

    /**
     * Skip upsell product
     */
    skipUpsellProductEvent() {
      if (this.upsellProductsHolder === null) {
        return;
      }
      const skipButtons = this.upsellProductsHolder.querySelectorAll(selectors$1.buttonSkipUpsellProduct);

      if (skipButtons.length) {
        skipButtons.forEach((button) => {
          button.addEventListener('click', (event) => {
            event.preventDefault();
            const productID = button.closest(selectors$1.quickAddHolder).getAttribute(attributes.quickAddHolder);

            if (!this.skipUpsellProductsArray.includes(productID)) {
              this.skipUpsellProductsArray.push(productID);
            }

            // Add skipped upsell product to session storage
            window.sessionStorage.setItem('skip_upsell_products', this.skipUpsellProductsArray);

            // Remove upsell product from cart
            this.removeUpsellProduct(productID);
            this.toggleCartUpsellWidgetVisibility();
          });
        });
      }
    }

    /**
     * Check for skipped upsell product added to session storage
     */
    checkSkippedUpsellProductsFromStorage() {
      const skippedUpsellItemsFromStorage = window.sessionStorage.getItem('skip_upsell_products');
      if (!skippedUpsellItemsFromStorage) return;

      const skippedUpsellItemsFromStorageArray = skippedUpsellItemsFromStorage.split(',');

      skippedUpsellItemsFromStorageArray.forEach((productID) => {
        if (!this.skipUpsellProductsArray.includes(productID)) {
          this.skipUpsellProductsArray.push(productID);
        }

        this.removeUpsellProduct(productID);
      });
    }

    removeUpsellProduct(productID) {
      // Remove skipped upsell product from Cart
      const upsellProduct = this.upsellProductsHolder.querySelector(`[${attributes.quickAddHolder}="${productID}"]`);

      if (upsellProduct) {
        upsellProduct.parentNode.remove();
      }
    }

    /**
     * Show or hide cart upsell products widget visibility
     */
    toggleCartUpsellWidgetVisibility() {
      // Hide upsell container if no items
      const upsellItems = this.upsellProductsHolder.querySelectorAll(selectors$1.quickAddHolder);
      const cartWidget = this.upsellProductsHolder.closest(selectors$1.cartWidget);

      if (!cartWidget) return;

      const cartWidgetToggleButton = cartWidget.querySelector(selectors$1.expandButton);
      const cartWidgetContent = cartWidget.querySelector(selectors$1.cartWidgetContent);

      cartWidget.classList.toggle(classes.hidden, !upsellItems.length);
      cartWidget.classList.toggle(classes.animated, upsellItems.length);

      if (cartWidgetToggleButton) {
        cartWidgetToggleButton.classList.toggle(classes.active, upsellItems.length);
      }

      if (cartWidgetContent) {
        cartWidgetContent.classList.toggle(classes.expanded, upsellItems.length);
      }
    }

    observeAdditionalCheckoutButtons() {
      // identify an element to observe
      const additionalCheckoutButtons = this.cartDrawer.querySelector(selectors$1.additionalCheckoutButtons);
      if (additionalCheckoutButtons) {
        // create a new instance of `MutationObserver` named `observer`,
        // passing it a callback function
        const observer = new MutationObserver(() => {
          this.accessibility.removeTrapFocus();
          this.accessibility.trapFocus(this.cartDrawer, {
            elementToFocus: this.cartDrawer.querySelector(selectors$1.cartToggleElement),
          });
          observer.disconnect();
        });

        // call `observe()` on that MutationObserver instance,
        // passing it the element to observe, and the options object
        observer.observe(additionalCheckoutButtons, {subtree: true, childList: true});
      }
    }

    /**
     * Remove initially added AOS classes to allow animation on cart drawer open
     *
     * @return  {Void}
     */
    resetAnimatedItems() {
      this.cart.querySelectorAll(selectors$1.animation).forEach((item) => {
        item.classList.remove(classes.animated);
      });
    }

    requestItemsAnimationFrame() {
      requestAnimationFrame(this.animateItems);
    }

    /**
     * Cart elements opening animation
     *
     * @return  {Void}
     */
    animateItems() {
      this.cart.querySelectorAll(selectors$1.animation).forEach((item) => {
        item.classList.add(classes.animated);
      });
    }
  }

  window.cart = new CartDrawer();

  const slideUp = (target, duration = 500) => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  };

  const classes$1 = {
    focus: 'is-focused',
    open: 'is-open',
    accordionToggle: 'accordion-toggle',
    tabLink: 'tab-link',
  };

  const selectors$2 = {
    inPageLink: '[data-skip-content]',
    linkesWithOnlyHash: 'a[href="#"]',
    triggerFocusElement: '[data-focus-element]',
    accordionContent: '.accordion-content',
    accordionToggle: 'data-accordion-toggle',
  };

  class Accessibility {
    constructor() {
      this.init();
    }

    init() {
      this.a11y = a11y;

      // DOM Elements
      this.html = document.documentElement;
      this.body = document.body;
      this.inPageLink = document.querySelector(selectors$2.inPageLink);
      this.linkesWithOnlyHash = document.querySelectorAll(selectors$2.linkesWithOnlyHash);
      this.lastFocused = null;

      // Flags
      this.isFocused = false;

      // A11Y init methods
      this.a11y.focusHash();
      this.a11y.bindInPageLinks();

      // Events
      this.clickEvents();
      this.focusEvents();
      this.focusEventsOff();
      this.closeExpandedElements();
    }

    /**
     * Clicked events accessibility
     *
     * @return  {Void}
     */

    clickEvents() {
      if (this.inPageLink) {
        this.inPageLink.addEventListener('click', (event) => {
          event.preventDefault();
        });
      }

      if (this.linkesWithOnlyHash) {
        this.linkesWithOnlyHash.forEach((item) => {
          item.addEventListener('click', (event) => {
            event.preventDefault();
          });
        });
      }
    }

    /**
     * Focus events
     *
     * @return  {Void}
     */

    focusEvents() {
      document.addEventListener('keyup', (event) => {
        if (event.keyCode !== window.theme.keyboardKeys.TAB) {
          return;
        }

        this.body.classList.add(classes$1.focus);
        this.isFocused = true;
      });

      // Expand modals
      document.addEventListener('keyup', (event) => {
        if (!this.isFocused) {
          return;
        }

        const target = event.target;
        const pressEnterOrSpace = event.keyCode === window.theme.keyboardKeys.ENTER || event.keyCode === window.theme.keyboardKeys.SPACE;
        const targetElement = target.matches(selectors$2.triggerFocusElement) || target.closest(selectors$2.triggerFocusElement);
        const isAccordion =
          target.classList.contains(classes$1.accordionToggle) ||
          target.parentNode.classList.contains(classes$1.accordionToggle) ||
          target.hasAttribute(selectors$2.accordionToggle) ||
          target.parentNode.hasAttribute(selectors$2.accordionToggle);
        const isTab = target.classList.contains(classes$1.tabLink) || target.parentNode.classList.contains(classes$1.tabLink);

        if (pressEnterOrSpace && targetElement) {
          if (this.lastFocused === null) {
            this.lastFocused = target;
          }

          if (isAccordion) {
            target.click();
          }

          if (isTab) {
            target.click();
          }
        }
      });

      // Focus addToCart button or quickview button
      document.addEventListener('theme:cart:add', (event) => {
        this.lastFocused = event.detail.selector;
      });
    }

    /**
     * Focus events off
     *
     * @return  {Void}
     */

    focusEventsOff() {
      document.addEventListener('mousedown', () => {
        this.body.classList.remove(classes$1.focus);
        this.isFocused = false;
      });
    }

    /**
     * Close expanded elements with when press escape
     *
     * @return  {Void}
     */

    closeExpandedElements() {
      document.addEventListener('keyup', (event) => {
        if (event.keyCode !== window.theme.keyboardKeys.ESCAPE) {
          return;
        }

        const accordionContents = document.querySelectorAll(selectors$2.accordionContent);

        if (accordionContents.length) {
          for (let i = 0; i < accordionContents.length; i++) {
            if (accordionContents[i].style.display !== 'block') {
              continue;
            }

            const accordionArrow = accordionContents[i].previousElementSibling;
            accordionArrow.classList.remove(classes$1.open);

            slideUp(accordionContents[i]);
          }
        }

        if (this.lastFocused !== null) {
          setTimeout(() => {
            this.lastFocused.focus();
            this.lastFocused = null;
          }, 600);
        }
      });
    }
  }

  window.accessibility = new Accessibility();

  theme.ProductModel = (function () {
    let modelJsonSections = {};
    let models = {};
    let xrButtons = {};
    const selectors = {
      productMediaWrapper: '[data-product-single-media-wrapper]',
      productSlideshow: '[data-product-slideshow]',
      productXr: '[data-shopify-xr]',
      dataMediaId: 'data-media-id',
      dataModelId: 'data-model-id',
      dataModel3d: 'data-shopify-model3d-id',
      modelViewer: 'model-viewer',
      modelJson: '#ModelJson-',
      classMediaHidden: 'media--hidden',
      deferredMedia: '[data-deferred-media]',
      deferredMediaButton: '[data-deferred-media-button]',
    };
    const classes = {
      isLoading: 'is-loading',
    };

    function init(mediaContainer, sectionId) {
      modelJsonSections[sectionId] = {
        loaded: false,
      };

      const deferredMediaButton = mediaContainer.querySelector(selectors.deferredMediaButton);

      if (deferredMediaButton) {
        deferredMediaButton.addEventListener('click', loadContent.bind(this, mediaContainer, sectionId));
      }
    }

    function loadContent(mediaContainer, sectionId) {
      if (mediaContainer.querySelector(selectors.deferredMedia).getAttribute('loaded')) {
        return;
      }

      mediaContainer.classList.add(classes.isLoading);
      const content = document.createElement('div');
      content.appendChild(mediaContainer.querySelector('template').content.firstElementChild.cloneNode(true));
      const modelViewerElement = content.querySelector('model-viewer');
      const deferredMedia = mediaContainer.querySelector(selectors.deferredMedia);
      deferredMedia.appendChild(modelViewerElement).focus();
      deferredMedia.setAttribute('loaded', true);
      const mediaId = mediaContainer.dataset.mediaId;
      const modelId = modelViewerElement.dataset.modelId;
      const xrButton = mediaContainer.closest(selectors.productSlideshow).parentElement.querySelector(selectors.productXr);
      xrButtons[sectionId] = {
        element: xrButton,
        defaultId: modelId,
      };

      models[mediaId] = {
        modelId: modelId,
        mediaId: mediaId,
        sectionId: sectionId,
        container: mediaContainer,
        element: modelViewerElement,
      };

      window.Shopify.loadFeatures([
        {
          name: 'shopify-xr',
          version: '1.0',
          onLoad: setupShopifyXr,
        },
        {
          name: 'model-viewer-ui',
          version: '1.0',
          onLoad: setupModelViewerUi,
        },
      ]);
    }

    function setupShopifyXr(errors) {
      if (errors) {
        console.warn(errors);
        return;
      }
      if (!window.ShopifyXR) {
        document.addEventListener('shopify_xr_initialized', function () {
          setupShopifyXr();
        });
        return;
      }

      for (const sectionId in modelJsonSections) {
        if (modelJsonSections.hasOwnProperty(sectionId)) {
          const modelSection = modelJsonSections[sectionId];
          if (modelSection.loaded) {
            continue;
          }

          const modelJson = document.querySelector(`${selectors.modelJson}${sectionId}`);
          if (modelJson) {
            window.ShopifyXR.addModels(JSON.parse(modelJson.innerHTML));
            modelSection.loaded = true;
          }
        }
      }
      window.ShopifyXR.setupXRElements();
    }

    function setupModelViewerUi(errors) {
      if (errors) {
        console.warn(errors);
        return;
      }

      for (const key in models) {
        if (models.hasOwnProperty(key)) {
          const model = models[key];
          if (!model.modelViewerUi) {
            model.modelViewerUi = new Shopify.ModelViewerUI(model.element);
          }
          setupModelViewerListeners(model);
        }
      }
    }

    function setupModelViewerListeners(model) {
      const xrButton = xrButtons[model.sectionId];

      model.container.addEventListener('theme:media:visible', function () {
        xrButton.element.setAttribute(selectors.dataModel3d, model.modelId);

        pauseOtherMedia(model.mediaId);

        if (window.theme.touch) {
          return;
        }
        model.modelViewerUi.play();
      });

      model.container.addEventListener('theme:media:hidden', function () {
        model.modelViewerUi.pause();
      });

      model.container.addEventListener('xrLaunch', function () {
        model.modelViewerUi.pause();
      });

      model.element.addEventListener('load', () => {
        model.container.classList.remove(classes.isLoading);
        pauseOtherMedia(model.mediaId);
      });

      model.element.addEventListener('shopify_model_viewer_ui_toggle_play', function () {
        pauseOtherMedia(model.mediaId);
      });
    }

    function pauseOtherMedia(mediaId) {
      const mediaIdString = `[${selectors.dataMediaId}="${mediaId}"]`;
      const currentMedia = document.querySelector(`${selectors.productMediaWrapper}${mediaIdString}`);
      const otherMedia = document.querySelectorAll(`${selectors.productMediaWrapper}:not(${mediaIdString})`);

      currentMedia.classList.remove(selectors.classMediaHidden);
      if (otherMedia.length) {
        otherMedia.forEach((element) => {
          element.dispatchEvent(new CustomEvent('theme:media:hidden'));
          element.classList.add(selectors.classMediaHidden);
        });
      }
    }

    function removeSectionModels(sectionId) {
      for (const key in models) {
        if (models.hasOwnProperty(key)) {
          const model = models[key];
          if (model.sectionId === sectionId) {
            delete models[key];
          }
        }
      }
      delete modelJsonSections[sectionId];
      delete theme.mediaInstances[sectionId];
    }

    return {
      init: init,
      loadContent: loadContent,
      removeSectionModels: removeSectionModels,
    };
  })();

  const selectors$3 = {
    templateAddresses: '.template-addresses',
    addressNewForm: '#AddressNewForm',
    btnNew: '.address-new-toggle',
    btnEdit: '.address-edit-toggle',
    btnDelete: '.address-delete',
    classHide: 'hide',
    dataFormId: 'data-form-id',
    dataConfirmMessage: 'data-confirm-message',
    editAddress: '#EditAddress',
    addressCountryNew: 'AddressCountryNew',
    addressProvinceNew: 'AddressProvinceNew',
    addressProvinceContainerNew: 'AddressProvinceContainerNew',
    addressCountryOption: '.address-country-option',
    addressCountry: 'AddressCountry',
    addressProvince: 'AddressProvince',
    addressProvinceContainer: 'AddressProvinceContainer',
  };

  class Addresses {
    constructor(section) {
      this.section = section;
      this.addressNewForm = this.section.querySelector(selectors$3.addressNewForm);

      this.init();
    }

    init() {
      if (this.addressNewForm) {
        const section = this.section;
        const newAddressForm = this.addressNewForm;
        this.customerAddresses();

        const newButtons = section.querySelectorAll(selectors$3.btnNew);
        if (newButtons.length) {
          newButtons.forEach((element) => {
            element.addEventListener('click', function () {
              newAddressForm.classList.toggle(selectors$3.classHide);
            });
          });
        }

        const editButtons = section.querySelectorAll(selectors$3.btnEdit);
        if (editButtons.length) {
          editButtons.forEach((element) => {
            element.addEventListener('click', function () {
              const formId = this.getAttribute(selectors$3.dataFormId);
              section.querySelector(`${selectors$3.editAddress}_${formId}`).classList.toggle(selectors$3.classHide);
            });
          });
        }

        const deleteButtons = section.querySelectorAll(selectors$3.btnDelete);
        if (deleteButtons.length) {
          deleteButtons.forEach((element) => {
            element.addEventListener('click', function () {
              const formId = this.getAttribute(selectors$3.dataFormId);
              const confirmMessage = this.getAttribute(selectors$3.dataConfirmMessage);
              if (confirm(confirmMessage)) {
                Shopify.postLink(window.theme.routes.addresses_url + '/' + formId, {parameters: {_method: 'delete'}});
              }
            });
          });
        }
      }
    }

    customerAddresses() {
      // Initialize observers on address selectors, defined in shopify_common.js
      if (Shopify.CountryProvinceSelector) {
        new Shopify.CountryProvinceSelector(selectors$3.addressCountryNew, selectors$3.addressProvinceNew, {
          hideElement: selectors$3.addressProvinceContainerNew,
        });
      }

      // Initialize each edit form's country/province selector
      const countryOptions = this.section.querySelectorAll(selectors$3.addressCountryOption);
      countryOptions.forEach((element) => {
        const formId = element.getAttribute(selectors$3.dataFormId);
        const countrySelector = `${selectors$3.addressCountry}_${formId}`;
        const provinceSelector = `${selectors$3.addressProvince}_${formId}`;
        const containerSelector = `${selectors$3.addressProvinceContainer}_${formId}`;

        new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
          hideElement: containerSelector,
        });
      });
    }
  }

  const template = document.querySelector(selectors$3.templateAddresses);
  if (template) {
    new Addresses(template);
  }

  const selectors$4 = {
    accountTemplateLogged: '.customer-logged-in',
    account: '.account',
    accountSidebarMobile: '.account-sidebar--mobile',
  };

  class Account {
    constructor(section) {
      this.section = section;

      this.init();
    }

    init() {
      if (this.section.querySelector(selectors$4.account)) {
        this.accountMobileSidebar();
      }
    }

    accountMobileSidebar() {
      this.section.querySelector(selectors$4.accountSidebarMobile).addEventListener('click', function () {
        const nextElem = this.nextElementSibling;

        if (nextElem && nextElem.tagName === 'UL') {
          nextElem.classList.toggle('visible');
        }
      });
    }
  }

  const template$1 = document.querySelector(selectors$4.accountTemplateLogged);
  if (template$1) {
    new Account(template$1);
  }

  const selectors$5 = {
    form: '[data-account-form]',
    showReset: '[data-show-reset]',
    hideReset: '[data-hide-reset]',
    recover: '[data-recover-password]',
    login: '[data-login-form]',
    recoverHash: '#recover',
    hideClass: 'is-hidden',
  };

  class Login {
    constructor(form) {
      this.form = form;
      this.showButton = form.querySelector(selectors$5.showReset);
      this.hideButton = form.querySelector(selectors$5.hideReset);
      this.recover = form.querySelector(selectors$5.recover);
      this.login = form.querySelector(selectors$5.login);
      this.init();
    }

    init() {
      if (window.location.hash == selectors$5.recoverHash) {
        this.showRecoverPasswordForm();
      } else {
        this.hideRecoverPasswordForm();
      }
      this.showButton.addEventListener(
        'click',
        function (e) {
          e.preventDefault();
          this.showRecoverPasswordForm();
        }.bind(this),
        false
      );
      this.hideButton.addEventListener(
        'click',
        function (e) {
          e.preventDefault();
          this.hideRecoverPasswordForm();
        }.bind(this),
        false
      );
    }

    showRecoverPasswordForm() {
      this.login.classList.add(selectors$5.hideClass);
      this.recover.classList.remove(selectors$5.hideClass);
      window.location.hash = selectors$5.recoverHash;
      return false;
    }

    hideRecoverPasswordForm() {
      this.recover.classList.add(selectors$5.hideClass);
      this.login.classList.remove(selectors$5.hideClass);
      window.location.hash = '';
      return false;
    }
  }

  const loginForm = document.querySelector(selectors$5.form);
  if (loginForm) {
    new Login(loginForm);
  }

  window.Shopify = window.Shopify || {};
  window.Shopify.theme = window.Shopify.theme || {};
  window.Shopify.theme.sections = window.Shopify.theme.sections || {};

  window.Shopify.theme.sections.registered = window.Shopify.theme.sections.registered || {};
  window.Shopify.theme.sections.instances = window.Shopify.theme.sections.instances || [];
  const registered = window.Shopify.theme.sections.registered;
  const instances = window.Shopify.theme.sections.instances;

  const selectors$6 = {
    id: 'data-section-id',
    type: 'data-section-type',
  };

  class Registration {
    constructor(type = null, components = []) {
      this.type = type;
      this.components = validateComponentsArray(components);
      this.callStack = {
        onLoad: [],
        onUnload: [],
        onSelect: [],
        onDeselect: [],
        onBlockSelect: [],
        onBlockDeselect: [],
        onReorder: [],
      };
      components.forEach((comp) => {
        for (const [key, value] of Object.entries(comp)) {
          const arr = this.callStack[key];
          if (Array.isArray(arr) && typeof value === 'function') {
            arr.push(value);
          } else {
            console.warn(`Unregisted function: '${key}' in component: '${this.type}'`);
            console.warn(value);
          }
        }
      });
    }

    getStack() {
      return this.callStack;
    }
  }

  class Section {
    constructor(container, registration) {
      this.container = validateContainerElement(container);
      this.id = container.getAttribute(selectors$6.id);
      this.type = registration.type;
      this.callStack = registration.getStack();

      try {
        this.onLoad();
      } catch (e) {
        console.warn(`Error in section: ${this.id}`);
        console.warn(this);
        console.warn(e);
      }
    }

    callFunctions(key, e = null) {
      this.callStack[key].forEach((func) => {
        const props = {
          id: this.id,
          type: this.type,
          container: this.container,
        };
        if (e) {
          func.call(props, e);
        } else {
          func.call(props);
        }
      });
    }

    onLoad() {
      this.callFunctions('onLoad');
    }

    onUnload() {
      this.callFunctions('onUnload');
    }

    onSelect(e) {
      this.callFunctions('onSelect', e);
    }

    onDeselect(e) {
      this.callFunctions('onDeselect', e);
    }

    onBlockSelect(e) {
      this.callFunctions('onBlockSelect', e);
    }

    onBlockDeselect(e) {
      this.callFunctions('onBlockDeselect', e);
    }

    onReorder(e) {
      this.callFunctions('onReorder', e);
    }
  }

  function validateContainerElement(container) {
    if (!(container instanceof Element)) {
      throw new TypeError('Theme Sections: Attempted to load section. The section container provided is not a DOM element.');
    }
    if (container.getAttribute(selectors$6.id) === null) {
      throw new Error('Theme Sections: The section container provided does not have an id assigned to the ' + selectors$6.id + ' attribute.');
    }

    return container;
  }

  function validateComponentsArray(value) {
    if ((typeof value !== 'undefined' && typeof value !== 'object') || value === null) {
      throw new TypeError('Theme Sections: The components object provided is not a valid');
    }

    return value;
  }

  /*
   * @shopify/theme-sections
   * -----------------------------------------------------------------------------
   *
   * A framework to provide structure to your Shopify sections and a load and unload
   * lifecycle. The lifecycle is automatically connected to theme editor events so
   * that your sections load and unload as the editor changes the content and
   * settings of your sections.
   */

  function register(type, components) {
    if (typeof type !== 'string') {
      throw new TypeError('Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered');
    }

    if (typeof registered[type] !== 'undefined') {
      throw new Error('Theme Sections: A section of type "' + type + '" has already been registered. You cannot register the same section type twice');
    }

    if (!Array.isArray(components)) {
      components = [components];
    }

    const section = new Registration(type, components);
    registered[type] = section;

    return registered;
  }

  function load(types, containers) {
    types = normalizeType(types);

    if (typeof containers === 'undefined') {
      containers = document.querySelectorAll('[' + selectors$6.type + ']');
    }

    containers = normalizeContainers(containers);

    types.forEach(function (type) {
      const registration = registered[type];

      if (typeof registration === 'undefined') {
        return;
      }

      containers = containers.filter(function (container) {
        // Filter from list of containers because container already has an instance loaded
        if (isInstance(container)) {
          return false;
        }

        // Filter from list of containers because container doesn't have data-section-type attribute
        if (container.getAttribute(selectors$6.type) === null) {
          return false;
        }

        // Keep in list of containers because current type doesn't match
        if (container.getAttribute(selectors$6.type) !== type) {
          return true;
        }

        instances.push(new Section(container, registration));

        // Filter from list of containers because container now has an instance loaded
        return false;
      });
    });
  }

  function reorder(selector) {
    var instancesToReorder = getInstances(selector);

    instancesToReorder.forEach(function (instance) {
      instance.onReorder();
    });
  }

  function unload(selector) {
    var instancesToUnload = getInstances(selector);

    instancesToUnload.forEach(function (instance) {
      var index = instances
        .map(function (e) {
          return e.id;
        })
        .indexOf(instance.id);
      instances.splice(index, 1);
      instance.onUnload();
    });
  }

  function getInstances(selector) {
    var filteredInstances = [];

    // Fetch first element if its an array
    if (NodeList.prototype.isPrototypeOf(selector) || Array.isArray(selector)) {
      var firstElement = selector[0];
    }

    // If selector element is DOM element
    if (selector instanceof Element || firstElement instanceof Element) {
      var containers = normalizeContainers(selector);

      containers.forEach(function (container) {
        filteredInstances = filteredInstances.concat(
          instances.filter(function (instance) {
            return instance.container === container;
          })
        );
      });

      // If select is type string
    } else if (typeof selector === 'string' || typeof firstElement === 'string') {
      var types = normalizeType(selector);

      types.forEach(function (type) {
        filteredInstances = filteredInstances.concat(
          instances.filter(function (instance) {
            return instance.type === type;
          })
        );
      });
    }

    return filteredInstances;
  }

  function getInstanceById(id) {
    var instance;

    for (var i = 0; i < instances.length; i++) {
      if (instances[i].id === id) {
        instance = instances[i];
        break;
      }
    }
    return instance;
  }

  function isInstance(selector) {
    return getInstances(selector).length > 0;
  }

  function normalizeType(types) {
    // If '*' then fetch all registered section types
    if (types === '*') {
      types = Object.keys(registered);

      // If a single section type string is passed, put it in an array
    } else if (typeof types === 'string') {
      types = [types];

      // If single section constructor is passed, transform to array with section
      // type string
    } else if (types.constructor === Section) {
      types = [types.prototype.type];

      // If array of typed section constructors is passed, transform the array to
      // type strings
    } else if (Array.isArray(types) && types[0].constructor === Section) {
      types = types.map(function (Section) {
        return Section.type;
      });
    }

    types = types.map(function (type) {
      return type.toLowerCase();
    });

    return types;
  }

  function normalizeContainers(containers) {
    // Nodelist with entries
    if (NodeList.prototype.isPrototypeOf(containers) && containers.length > 0) {
      containers = Array.prototype.slice.call(containers);

      // Empty Nodelist
    } else if (NodeList.prototype.isPrototypeOf(containers) && containers.length === 0) {
      containers = [];

      // Handle null (document.querySelector() returns null with no match)
    } else if (containers === null) {
      containers = [];

      // Single DOM element
    } else if (!Array.isArray(containers) && containers instanceof Element) {
      containers = [containers];
    }

    return containers;
  }

  if (window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (event) {
      var id = event.detail.sectionId;
      var container = event.target.querySelector('[' + selectors$6.id + '="' + id + '"]');

      if (container !== null) {
        load(container.getAttribute(selectors$6.type), container);
      }
    });

    document.addEventListener('shopify:section:reorder', function (event) {
      var id = event.detail.sectionId;
      var container = event.target.querySelector('[' + selectors$6.id + '="' + id + '"]');
      var instance = getInstances(container)[0];

      if (typeof instance === 'object') {
        reorder(container);
      }
    });

    document.addEventListener('shopify:section:unload', function (event) {
      var id = event.detail.sectionId;
      var container = event.target.querySelector('[' + selectors$6.id + '="' + id + '"]');
      var instance = getInstances(container)[0];

      if (typeof instance === 'object') {
        unload(container);
      }
    });

    document.addEventListener('shopify:section:select', function (event) {
      var instance = getInstanceById(event.detail.sectionId);

      if (typeof instance === 'object') {
        instance.onSelect(event);
      }
    });

    document.addEventListener('shopify:section:deselect', function (event) {
      var instance = getInstanceById(event.detail.sectionId);

      if (typeof instance === 'object') {
        instance.onDeselect(event);
      }
    });

    document.addEventListener('shopify:block:select', function (event) {
      var instance = getInstanceById(event.detail.sectionId);

      if (typeof instance === 'object') {
        instance.onBlockSelect(event);
      }
    });

    document.addEventListener('shopify:block:deselect', function (event) {
      var instance = getInstanceById(event.detail.sectionId);

      if (typeof instance === 'object') {
        instance.onBlockDeselect(event);
      }
    });
  }

  const selectors$7 = {
    collectionImage: '.collection-item__image',
    columnImage: '.column__image__wrapper',
    aos: '[data-aos]',
    flickityNextArrow: '.flickity-button.next',
    flickityPrevArrow: '.flickity-button.previous',
    heroContent: '.hero__content',
    heroContentWrapper: '.hero__content__wrapper',
    link: 'a:not(.hero__btn)',
    nextArrow: '[data-next-arrow]',
    prevArrow: '[data-prev-arrow]',
    productItemImage: '.product-item__image',
    slide: '[data-slide]',
    slideValue: 'data-slide',
    slider: '[data-slider]',
    sliderThumb: '[data-slider-thumb]',
    sliderThumbClick: '[data-slider-thumb-click]',
    slideshowSlideImg: '.slide-image-img',
  };

  const attributes$1 = {
    sliderOptions: 'data-options',
    arrowPositionMiddle: 'data-arrow-position-middle',
    aspectRatio: 'data-aspectratio',
    equalizeHeight: 'data-equalize-height',
    setHeight: 'data-set-height',
    slideIndex: 'data-slide-index',
    sliderAnimate: 'data-slider-animate',
    sliderAnimateOnce: 'data-slider-animate-once',
    slidesDesktop: 'data-slides-desktop',
    slidesLargeDesktop: 'data-slides-large-desktop',
    slidesMobileDesktop: 'data-slides-mobile',
    slidesTabletDesktop: 'data-slides-tablet',
    slideTextColor: 'data-slide-text-color',
  };

  const classes$2 = {
    aosAnimated: 'aos-animated',
    flickityResize: 'flickity-resize',
    heroContentTransparent: 'hero__content--transparent',
    isSelected: 'is-selected',
    sliderArrowsHidden: 'flickity-button-hide',
    sliderInitialized: 'js-slider--initialized',
    aosAnimate: 'aos-animate',
  };

  const sections = {};

  class Slider {
    constructor(container, slideshow = null) {
      this.container = container;
      this.slideshow = slideshow || this.container.querySelector(selectors$7.slider);

      if (!this.slideshow) return;

      this.slideshowSlides = this.slideshow.querySelectorAll(selectors$7.slide);
      this.sliderPrev = this.container.querySelector(selectors$7.prevArrow);
      this.sliderNext = this.container.querySelector(selectors$7.nextArrow);
      this.sliderThumbs = this.container.querySelectorAll(selectors$7.sliderThumb);
      this.sliderThumbsClick = this.container.querySelectorAll(selectors$7.sliderThumbClick);
      this.multipleSlides = this.slideshow.hasAttribute(attributes$1.slidesLargeDesktop);
      this.dataEqualizeHeight = this.slideshow.getAttribute(attributes$1.equalizeHeight) === 'true';
      this.sliderAnimate = this.slideshow.getAttribute(attributes$1.sliderAnimate) === 'true';
      this.sliderAnimateOnce = this.slideshow.getAttribute(attributes$1.sliderAnimateOnce) === 'true';
      this.setMinHeightFlag = this.slideshow.getAttribute(attributes$1.setHeight) === 'true';

      this.resizeEvent = debounce(() => this.resizeEvents(), 100);
      this.resizeEventAlt = debounce(() => this.addRemoveSlidesForDevices(), 100);
      this.resetSliderEvent = () => this.resetSlider();

      if (this.slideshow.hasAttribute(attributes$1.sliderOptions)) {
        this.customOptions = JSON.parse(decodeURIComponent(this.slideshow.getAttribute(attributes$1.sliderOptions)));
      }

      this.flkty = null;

      this.init();
    }

    init() {
      this.setMinHeight();

      this.sliderOptions = {
        contain: true,
        wrapAround: true,
        adaptiveHeight: true,
        ...this.customOptions,
        on: {
          ready: () => {
            if (this.sliderAnimate && this.sliderAnimateOnce && Boolean(this.sliderOptions.autoPlay)) {
              const currentSlide = this.slideshow.querySelector(`.${classes$2.isSelected}`);
              currentSlide.classList.add(classes$2.aosAnimated);
            }

            setTimeout(() => {
              this.slideshow.parentNode.dispatchEvent(
                new CustomEvent('theme:slider:loaded', {
                  bubbles: true,
                  detail: {
                    slider: this,
                  },
                })
              );
            }, 10);

            this.slideActions();

            if (this.slideshow.classList.contains(classes$2.isSelected)) {
              this.slideshow.classList.remove(classes$2.isSelected);
            }
            if (this.sliderOptions.prevNextButtons) {
              this.initArrows();
              this.positionArrows();
            }
          },
          resize: () => {
            if (this.sliderOptions.prevNextButtons) {
              this.positionArrows();
            }
          },
        },
      };

      if (this.sliderOptions.fade) {
        this.flkty = new FlickityFade(this.slideshow, this.sliderOptions);
      }

      if (!this.sliderOptions.fade) {
        this.flkty = new Flickity(this.slideshow, this.sliderOptions);
      }

      if (this.dataEqualizeHeight) {
        this.equalizeHeight();
      }

      if (this.sliderPrev) {
        this.sliderPrev.addEventListener('click', (e) => {
          e.preventDefault();

          this.flkty.previous(true);
        });
      }

      if (this.sliderNext) {
        this.sliderNext.addEventListener('click', (e) => {
          e.preventDefault();

          this.flkty.next(true);
        });
      }

      this.flkty.on('change', () => this.slideActions(true));

      this.addRemoveSlidesForDevices();

      window.addEventListener('resize', this.resizeEventAlt);

      if (this.sliderAnimate) {
        this.flkty.on('settle', () => this.sliderSettle());
      }

      if (this.setMinHeightFlag || this.multipleSlides) {
        window.addEventListener('resize', this.resizeEvent);
      }

      if (this.sliderThumbsClick.length) {
        this.sliderThumbsClick.forEach((element) => {
          element.addEventListener('click', (e) => {
            e.preventDefault();
            const slideIndex = [...element.parentElement.children].indexOf(element);
            this.flkty.select(slideIndex);
          });
        });
      }

      this.container.addEventListener('theme:tab:change', this.resetSliderEvent);
    }

    sliderSettle() {
      let animatedItems = this.slideshow.querySelectorAll(`.${classes$2.isSelected} ${selectors$7.aos}`);

      if (this.sliderAnimateOnce) {
        animatedItems = this.slideshow.querySelectorAll(`.${classes$2.isSelected}:not(.${classes$2.aosAnimated}) .${classes$2.aosAnimated}`);
      }

      if (animatedItems.length) {
        animatedItems.forEach((animatedItem) => {
          animatedItem.classList.add(classes$2.aosAnimate);

          if (this.sliderAnimateOnce) {
            animatedItem.closest(`.${classes$2.isSelected}`).classList.add(classes$2.aosAnimated);
          }
        });
      }
    }

    // Move slides to their initial position
    resetSlider() {
      if (this.slideshow) {
        if (this.flkty && this.flkty.isActive) {
          this.flkty.select(0, false, true);
        } else {
          this.slideshow.scrollTo({
            left: 0,
            behavior: 'auto',
          });
        }
      }
    }

    addRemoveSlidesForDevices() {
      this.hasDiffSlidesForMobileDesktop =
        Array.prototype.filter.call(this.slideshowSlides, (slide) => {
          if (slide.classList.contains('desktop') || slide.classList.contains('mobile')) {
            return slide;
          }
        }).length > 0;

      if (!this.hasDiffSlidesForMobileDesktop) {
        return;
      }

      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      let selectorSlides = null;

      if (windowWidth < theme.sizes.small) {
        selectorSlides = `${selectors$7.slide}.mobile, ${selectors$7.slide}:not(.desktop)`;
      } else {
        selectorSlides = `${selectors$7.slide}.desktop, ${selectors$7.slide}:not(.mobile)`;
      }

      this.flkty.options.cellSelector = selectorSlides;
      this.flkty.selectCell(0, false, true);
      this.flkty.reloadCells();
      this.flkty.reposition();
      this.flkty.resize();
      this.slideActions();
    }

    resizeEvents() {
      this.setMinHeight();

      if (this.multipleSlides) {
        if (this.sliderOptions.prevNextButtons) {
          this.initArrows();
        }
        this.flkty.resize();
        if (!this.slideshow.classList.contains(classes$2.sliderInitialized)) {
          this.flkty.select(0);
        }
      }
    }

    slideActions(changeEvent = false) {
      const currentSlide = this.slideshow.querySelector(`.${classes$2.isSelected}`);
      const currentSlideTextColor = currentSlide.getAttribute(attributes$1.slideTextColor);
      const currentSlideLink = currentSlide.querySelector(selectors$7.link);
      const buttons = this.slideshow.querySelectorAll(`${selectors$7.slide} a, ${selectors$7.slide} button`);

      if (currentSlideLink && this.sliderOptions.groupCells && changeEvent) {
        currentSlideLink.focus();
      }

      if (buttons.length) {
        buttons.forEach((button) => {
          const slide = button.closest(selectors$7.slide);
          if (slide) {
            const tabIndex = slide.classList.contains(classes$2.isSelected) ? 0 : -1;
            button.setAttribute('tabindex', tabIndex);
          }
        });
      }

      if (currentSlideTextColor !== 'rgba(0,0,0,0)' && currentSlideTextColor !== '') {
        this.slideshow.style.setProperty('--text', currentSlideTextColor);
      }

      this.setMinHeight();

      if (this.sliderAnimate) {
        let animatedItems = this.slideshow.querySelectorAll(`.${classes$2.isSelected} .${classes$2.aosAnimate}`);
        if (this.sliderAnimateOnce) {
          animatedItems = this.slideshow.querySelectorAll(`.${classes$2.isSelected}:not(.${classes$2.aosAnimated}) .${classes$2.aosAnimate}`);
        }
        if (animatedItems.length) {
          animatedItems.forEach((animatedItem) => {
            animatedItem.classList.remove(classes$2.aosAnimate);
            if (this.sliderAnimateOnce) {
              animatedItem.classList.add(classes$2.aosAnimated);
            }
          });
        }
      }

      if (this.sliderThumbs.length && this.sliderThumbs.length === this.slideshowSlides.length && currentSlide.hasAttribute(attributes$1.slideIndex)) {
        const slideIndex = parseInt(currentSlide.getAttribute(attributes$1.slideIndex));
        const currentThumb = this.container.querySelector(`${selectors$7.sliderThumb}.${classes$2.isSelected}`);
        if (currentThumb) {
          currentThumb.classList.remove(classes$2.isSelected);
        }
        this.sliderThumbs[slideIndex].classList.add(classes$2.isSelected);
      }
    }

    setMinHeight() {
      if (!this.setMinHeightFlag) return;

      this.slideshowSlides.forEach((element) => {
        const slideImageImg = element.querySelector(selectors$7.slideshowSlideImg);
        let slideAspectRatio = '';
        if (slideImageImg && slideImageImg.hasAttribute(attributes$1.aspectRatio)) {
          slideAspectRatio = slideImageImg.getAttribute(attributes$1.aspectRatio);
        }

        let slideTextContentHeight = 0;
        let getMargin = 0;
        const slideTextContent = element.querySelector(selectors$7.heroContent);
        if (slideTextContent) {
          const getMarginTop = parseInt(window.getComputedStyle(slideTextContent).marginTop);
          const getMarginBottom = parseInt(window.getComputedStyle(slideTextContent).marginBottom);
          getMargin = getMarginTop + getMarginBottom;
          slideTextContentHeight = slideTextContent.offsetHeight + getMargin;
        }

        const slideWidth = parseInt(getComputedStyle(element, null).width.replace('px', ''));
        let slideHeight = parseInt(slideWidth / slideAspectRatio) || 0;
        const isCurrentSlide = element.classList.contains(classes$2.isSelected);

        if (slideTextContentHeight > slideHeight) {
          slideHeight = slideTextContentHeight;
        }

        const minHeightValue = `calc(${slideHeight}px + var(--header-padding))`;
        element.style.setProperty('min-height', minHeightValue);
        const heroContentWrapper = element.querySelector(selectors$7.heroContentWrapper);
        if (heroContentWrapper) {
          heroContentWrapper.style.setProperty('min-height', minHeightValue);
        }
        if (isCurrentSlide) {
          this.slideshow.parentElement.style.setProperty('min-height', minHeightValue);
        }
      });
    }

    positionArrows() {
      if (this.slideshow.hasAttribute(attributes$1.arrowPositionMiddle) && this.sliderOptions.prevNextButtons) {
        const itemImage = this.slideshow.querySelector(selectors$7.collectionImage) || this.slideshow.querySelector(selectors$7.productItemImage) || this.slideshow.querySelector(selectors$7.columnImage);

        // Prevent 'clientHeight' of null error if no image
        if (!itemImage) return;

        this.slideshow.querySelector(selectors$7.flickityPrevArrow).style.top = itemImage.clientHeight / 2 + 'px';
        this.slideshow.querySelector(selectors$7.flickityNextArrow).style.top = itemImage.clientHeight / 2 + 'px';
      }
    }

    initArrows() {
      if (!this.multipleSlides) return;
      const slidesNumberCustom = parseInt(this.slideshow.getAttribute(attributes$1.slidesLargeDesktop));
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const desktopSlides = this.slideshow.hasAttribute(attributes$1.slidesDesktop) ? parseInt(this.slideshow.getAttribute(attributes$1.slidesDesktop)) : 3;
      const tabletSlides = this.slideshow.hasAttribute(attributes$1.slidesTabletDesktop) ? parseInt(this.slideshow.getAttribute(attributes$1.slidesTabletDesktop)) : 2;
      const mobileSlides = this.slideshow.hasAttribute(attributes$1.slidesMobileDesktop) ? parseInt(this.slideshow.getAttribute(attributes$1.slidesMobileDesktop)) : 1;
      const largeDesktopCheck = windowWidth > 1339 && this.slideshowSlides.length > slidesNumberCustom;
      const desktopCheck = windowWidth <= 1339 && windowWidth > 1023 && this.slideshowSlides.length > desktopSlides;
      const tabletCheck = windowWidth <= 1023 && windowWidth > 749 && this.slideshowSlides.length > tabletSlides;
      const mobileCheck = windowWidth <= 749 && this.slideshowSlides.length > mobileSlides;
      const flag = Boolean(largeDesktopCheck || desktopCheck || tabletCheck || mobileCheck);
      this.slideshow.classList.toggle(classes$2.sliderArrowsHidden, !flag);
      this.slideshow.classList.toggle(classes$2.sliderInitialized, flag);
    }

    equalizeHeight() {
      Flickity.prototype._createResizeClass = function () {
        setTimeout(() => {
          this.element.classList.add(classes$2.flickityResize);
        });
      };

      Flickity.createMethods.push('_createResizeClass');

      const resize = Flickity.prototype.resize;
      Flickity.prototype.resize = function () {
        this.element.classList.remove(classes$2.flickityResize);
        resize.call(this);
        this.element.classList.add(classes$2.flickityResize);
      };

      this.flkty.resize();
    }

    onUnload() {
      if (this.setMinHeightFlag || this.multipleSlides) {
        window.removeEventListener('resize', this.resizeEvent);
      }

      if (this.slideshow && this.flkty) {
        this.flkty.options.watchCSS = false;
        this.flkty.destroy();
      }

      this.container.removeEventListener('theme:tab:change', this.resetSliderEvent);
    }

    onBlockSelect(evt) {
      if (!this.slideshow) return;
      // Ignore the cloned version
      const slide = this.slideshow.querySelector(`[${selectors$7.slideValue}="${evt.detail.blockId}"]`);

      if (!slide) return;
      let slideIndex = parseInt(slide.getAttribute(attributes$1.slideIndex));

      if (this.multipleSlides && !this.slideshow.classList.contains(classes$2.sliderInitialized)) {
        slideIndex = 0;
      }

      this.slideshow.classList.add(classes$2.isSelected);

      // Go to selected slide, pause autoplay
      this.flkty.selectCell(slideIndex);
      this.flkty.stopPlayer();
    }

    onBlockDeselect() {
      if (!this.slideshow) return;
      this.slideshow.classList.remove(classes$2.isSelected);

      if (!this.sliderOptions.hasOwnProperty('autoPlay')) return;
      this.flkty.playPlayer();
    }
  }

  const slider = {
    onLoad() {
      sections[this.id] = [];
      const els = this.container.querySelectorAll(selectors$7.slider);
      els.forEach((el) => {
        sections[this.id].push(new Slider(this.container, el));
      });
    },
    onUnload() {
      sections[this.id].forEach((el) => {
        if (typeof el.onUnload === 'function') {
          el.onUnload();
        }
      });
    },
    onBlockSelect(e) {
      sections[this.id].forEach((el) => {
        if (typeof el.onBlockSelect === 'function') {
          el.onBlockSelect(e);
        }
      });
    },
    onBlockDeselect(e) {
      sections[this.id].forEach((el) => {
        if (typeof el.onBlockDeselect === 'function') {
          el.onBlockDeselect(e);
        }
      });
    },
  };

  const throttle = (fn, wait) => {
    let prev, next;
    return function invokeFn(...args) {
      const now = Date.now();
      next = clearTimeout(next);
      if (!prev || now - prev >= wait) {
        // eslint-disable-next-line prefer-spread
        fn.apply(null, args);
        prev = now;
      } else {
        next = setTimeout(invokeFn.bind(null, ...args), wait - (now - prev));
      }
    };
  };

  const selectors$8 = {
    tooltip: 'data-tooltip',
    tooltipStopMouseEnter: 'data-tooltip-stop-mouseenter',
  };

  const classes$3 = {
    tooltipDefault: 'tooltip-default',
    visible: 'is-visible',
    hiding: 'is-hiding',
  };

  let sections$1 = {};

  class Tooltip {
    constructor(el, options = {}) {
      this.tooltip = el;
      if (!this.tooltip.hasAttribute(selectors$8.tooltip)) return;
      this.label = this.tooltip.getAttribute(selectors$8.tooltip);
      this.class = options.class || classes$3.tooltipDefault;
      this.transitionSpeed = options.transitionSpeed || 200;
      this.hideTransitionTimeout = 0;
      this.addPinEvent = () => this.addPin();
      this.addPinMouseEvent = () => this.addPin(true);
      this.removePinEvent = (event) => throttle(this.removePin(event), 50);
      this.removePinMouseEvent = (event) => this.removePin(event, true, true);
      this.init();
    }

    init() {
      if (!document.querySelector(`.${this.class}`)) {
        const tooltipTemplate = `<div class="${this.class}__arrow"></div><div class="${this.class}__inner"><div class="${this.class}__text"></div></div>`;
        const tooltipElement = document.createElement('div');
        tooltipElement.className = this.class;
        tooltipElement.innerHTML = tooltipTemplate;
        document.body.appendChild(tooltipElement);
      }

      this.tooltip.addEventListener('mouseenter', this.addPinMouseEvent);
      this.tooltip.addEventListener('mouseleave', this.removePinMouseEvent);
      this.tooltip.addEventListener('theme:tooltip:init', this.addPinEvent);
      document.addEventListener('theme:tooltip:close', this.removePinEvent);
    }

    addPin(stopMouseEnter = false) {
      const tooltipTarget = document.querySelector(`.${this.class}`);

      if (tooltipTarget && ((stopMouseEnter && !this.tooltip.hasAttribute(selectors$8.tooltipStopMouseEnter)) || !stopMouseEnter)) {
        const tooltipTargetArrow = tooltipTarget.querySelector(`.${this.class}__arrow`);
        const tooltipTargetInner = tooltipTarget.querySelector(`.${this.class}__inner`);
        const tooltipTargetText = tooltipTarget.querySelector(`.${this.class}__text`);
        tooltipTargetText.textContent = this.label;

        const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const tooltipTargetWidth = tooltipTargetInner.offsetWidth;
        const tooltipRect = this.tooltip.getBoundingClientRect();
        const tooltipTop = tooltipRect.top;
        const tooltipWidth = tooltipRect.width;
        const tooltipHeight = tooltipRect.height;
        const tooltipTargetPositionTop = tooltipTop + tooltipHeight + window.scrollY;
        let tooltipTargetPositionLeft = tooltipRect.left - tooltipTargetWidth / 2 + tooltipWidth / 2;
        const tooltipLeftWithWidth = tooltipTargetPositionLeft + tooltipTargetWidth;
        const tooltipTargetWindowDifference = tooltipLeftWithWidth - windowWidth;

        if (tooltipTargetWindowDifference > 0) {
          tooltipTargetPositionLeft -= tooltipTargetWindowDifference;
        }

        if (tooltipTargetPositionLeft < 0) {
          tooltipTargetPositionLeft = 0;
        }

        tooltipTargetArrow.style.left = `${tooltipRect.left + tooltipWidth / 2}px`;
        tooltipTarget.style.top = `${tooltipTargetPositionTop}px`;
        tooltipTargetInner.style.transform = `translateX(${tooltipTargetPositionLeft}px)`;
        tooltipTarget.classList.remove(classes$3.hiding);
        tooltipTarget.classList.add(classes$3.visible);

        document.addEventListener('theme:scroll', this.removePinEvent);
      }
    }

    removePin(event, stopMouseEnter = false, hideTransition = false) {
      const tooltipTarget = document.querySelector(`.${this.class}`);
      const tooltipVisible = tooltipTarget.classList.contains(classes$3.visible);

      if (tooltipTarget && ((stopMouseEnter && !this.tooltip.hasAttribute(selectors$8.tooltipStopMouseEnter)) || !stopMouseEnter)) {
        if (tooltipVisible && (hideTransition || event.detail.hideTransition)) {
          tooltipTarget.classList.add(classes$3.hiding);

          if (this.hideTransitionTimeout) {
            clearTimeout(this.hideTransitionTimeout);
          }

          this.hideTransitionTimeout = setTimeout(() => {
            tooltipTarget.classList.remove(classes$3.hiding);
          }, this.transitionSpeed);
        }

        tooltipTarget.classList.remove(classes$3.visible);

        document.removeEventListener('theme:scroll', this.removePinEvent);
      }
    }

    unload() {
      this.tooltip.removeEventListener('mouseenter', this.addPinMouseEvent);
      this.tooltip.removeEventListener('mouseleave', this.removePinMouseEvent);
      this.tooltip.removeEventListener('theme:tooltip:init', this.addPinEvent);
      document.removeEventListener('theme:tooltip:close', this.removePinEvent);
      document.removeEventListener('theme:scroll', this.removePinEvent);
    }
  }

  const tooltipSection = {
    onLoad() {
      sections$1[this.id] = [];
      const els = this.container.querySelectorAll(`[${selectors$8.tooltip}]`);
      els.forEach((el) => {
        sections$1[this.id].push(new Tooltip(el));
      });
    },
    onUnload: function () {
      sections$1[this.id].forEach((el) => {
        if (typeof el.unload === 'function') {
          el.unload();
        }
      });
    },
  };

  const selectors$9 = {
    copyClipboard: '[data-copy-clipboard]',
    tooltip: 'data-tooltip',
  };

  const classes$4 = {
    visible: 'is-visible',
  };

  const sections$2 = {};

  class CopyClipboard {
    constructor(section) {
      this.container = section.container;
      this.copyButtons = this.container.querySelectorAll(selectors$9.copyClipboard);

      if (this.copyButtons.length) {
        this.init();
      }
    }

    init() {
      this.copyButtons.forEach((el) => {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          const copyText = this.getAttribute('href');
          this.style.position = 'static';
          let inputElem = document.createElement('input');
          inputElem.type = 'text';
          this.appendChild(inputElem);
          const newInput = this.querySelector('input');
          newInput.value = copyText;
          newInput.select();
          newInput.setSelectionRange(0, 99999); /* For mobile devices */
          document.execCommand('copy');
          this.style.removeProperty('position');
          this.removeChild(newInput);

          if (this.hasAttribute(selectors$9.tooltip) && windowWidth >= theme.sizes.small) {
            this.classList.add(classes$4.visible);
            this.dispatchEvent(new CustomEvent('theme:tooltip:init', {bubbles: true}));

            setTimeout(() => {
              this.classList.remove(classes$4.visible);
              document.dispatchEvent(
                new CustomEvent('theme:tooltip:close', {
                  bubbles: false,
                  detail: {
                    hideTransition: true,
                  },
                })
              );
            }, 2000);
          }
        });
      });
    }
  }

  const copyClipboard = {
    onLoad() {
      sections$2[this.id] = new CopyClipboard(this);
    },
  };

  const slideDown = (target, duration = 500, showDisplay = 'block', checkHidden = true) => {
    let display = window.getComputedStyle(target).display;
    if (checkHidden && display !== 'none') {
      return;
    }
    target.style.removeProperty('display');
    if (display === 'none') display = showDisplay;
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  };

  const slideToggle = (target, duration = 500, showDisplay = 'block') => {
    if (window.getComputedStyle(target).display === 'none') {
      return slideDown(target, duration, showDisplay);
    } else {
      return slideUp(target, duration);
    }
  };

  var sections$3 = {};

  const parallaxHero = {
    onLoad() {
      sections$3[this.id] = [];
      const frames = this.container.querySelectorAll('[data-parallax-wrapper]');
      frames.forEach((frame) => {
        const inner = frame.querySelector('[data-parallax-img]');

        sections$3[this.id].push(
          new Rellax(inner, {
            center: true,
            round: true,
            frame: frame,
          })
        );
      });

      window.addEventListener('load', () => {
        sections$3[this.id].forEach((image) => {
          if (typeof image.refresh === 'function') {
            image.refresh();
          }
        });
      });
    },
    onUnload: function () {
      sections$3[this.id].forEach((image) => {
        if (typeof image.destroy === 'function') {
          image.destroy();
        }
      });
    },
  };

  const selectors$a = {
    sidebar: '.sidebar',
    widgetCategories: '.widget--categories',
    widgetLinksEl: '.widget__links',
    widgetLinks: '.widget__links .has-sub-nav > a',
    widgetLinksSub: '.widget__links .submenu > li > a',
    listEl: 'li',
    linkEl: 'a',
    articleSingle: '.article--single',
    sidebarContents: '.sidebar__contents',
    hasSubNav: '.has-sub-nav',
  };

  const classes$5 = {
    open: 'open',
    active: 'active',
    submenu: 'submenu',
  };

  const sections$4 = {};

  class Article {
    constructor(section) {
      this.container = section.container;
      this.sidebar = this.container.querySelector(selectors$a.sidebar);
      this.widgetCategories = this.container.querySelector(selectors$a.widgetCategories);
      this.resizeEvent = () => this.categories();

      this.init();
    }

    init() {
      if (this.sidebar) {
        this.sidebarNav();
      }
    }

    sidebarNav() {
      this.navStates();

      // Dropdown Menus
      this.container.addEventListener('click', (e) => {
        const checkLinkTag = e.target.tagName.toLowerCase() === selectors$a.linkEl;
        const checkLinkParent = e.target.closest(`${selectors$a.listEl}${selectors$a.hasSubNav}`);
        const checkLinkClosest = e.target.closest(selectors$a.widgetLinksEl);
        const checkLink = checkLinkTag && checkLinkParent && checkLinkClosest;
        const submenu = e.target.nextElementSibling;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const isMobile = windowWidth < theme.sizes.small;

        if (!isMobile && checkLink && submenu) {
          submenu.parentElement.classList.toggle(classes$5.active);
          submenu.classList.toggle(classes$5.open);
          submenu.setAttribute('aria-expanded', submenu.classList.contains(classes$5.open));
          slideToggle(submenu);

          e.preventDefault();
        }
      });

      if (this.widgetCategories) {
        this.widgetCategoriesNext = this.widgetCategories.nextSibling;
        this.widgetCategoriesParentNode = this.widgetCategories.parentNode;

        this.categories();

        document.addEventListener('theme:resize', this.resizeEvent);
      }
    }

    navStates() {
      // Nav Active States
      const links = this.container.querySelectorAll(`${selectors$a.widgetLinks}, ${selectors$a.widgetLinksSub}`);

      if (links.length) {
        links.forEach((element) => {
          const href = element.getAttribute('href');
          const location = window.location.pathname;

          if (href === location) {
            const elementClosest = element.closest(selectors$a.hasSubNav);
            element.closest('li').classList.add(classes$5.active);
            if (!elementClosest) return;
            elementClosest.classList.add(classes$5.active);
            const submenu = elementClosest.querySelector(`.${classes$5.submenu}`);

            if (submenu) {
              submenu.classList.toggle(classes$5.open);
              submenu.setAttribute('aria-expanded', submenu.classList.contains(classes$5.open));
              showElement(submenu);
            }
          }
        });
      }
    }

    categories() {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const isMobile = windowWidth < theme.sizes.small;
      const widgetCategories = document.querySelector(selectors$a.widgetCategories);
      if (isMobile) {
        document.querySelector(selectors$a.articleSingle).prepend(widgetCategories);
      } else {
        this.widgetCategoriesParentNode.insertBefore(widgetCategories, this.widgetCategoriesNext);
      }
    }

    onUnload() {
      if (this.widgetCategories) {
        document.removeEventListener('theme:resize', this.resizeEvent);
      }
    }
  }

  const articleSection = {
    onLoad() {
      sections$4[this.id] = new Article(this);
    },
    onUnload(e) {
      sections$4[this.id].onUnload(e);
    },
  };

  register('article', [articleSection, slider, tooltipSection, copyClipboard, parallaxHero]);

  register('blog-template', [slider]);

  register('hero', parallaxHero);

  const selectors$b = {
    popoutWrapper: '[data-popout]',
    popoutList: '[data-popout-list]',
    popoutToggle: '[data-popout-toggle]',
    popoutInput: '[data-popout-input]',
    popoutOptions: '[data-popout-option]',
    popoutPrevent: 'data-popout-prevent',
    popoutQuantity: 'data-quantity-field',
    dataValue: 'data-value',
    ariaExpanded: 'aria-expanded',
    ariaCurrent: 'aria-current',
    productGridImage: '[data-product-image]',
    productGrid: '[data-product-grid-item]',
  };

  const classes$6 = {
    listVisible: 'popout-list--visible',
    currentSuffix: '--current',
    popoutAlternative: 'popout-container--alt',
    visible: 'is-visible',
  };

  let sections$5 = {};

  class Popout {
    constructor(popout) {
      this.container = popout;
      this.popoutList = this.container.querySelector(selectors$b.popoutList);
      this.popoutToggle = this.container.querySelector(selectors$b.popoutToggle);
      this.popoutInput = this.container.querySelector(selectors$b.popoutInput);
      this.popoutOptions = this.container.querySelectorAll(selectors$b.popoutOptions);
      this.productGrid = this.popoutList.closest(selectors$b.productGrid);
      this.popoutPrevent = this.container.getAttribute(selectors$b.popoutPrevent) === 'true';
      this.popupToggleFocusoutEvent = (evt) => this.popupToggleFocusout(evt);
      this.popupListFocusoutEvent = (evt) => this.popupListFocusout(evt);
      this.popupToggleClickEvent = (evt) => this.popupToggleClick(evt);
      this.containerKeyupEvent = (evt) => this.containerKeyup(evt);
      this.popupOptionsClickEvent = (evt) => this.popupOptionsClick(evt);
      this._connectOptionsDispatchEvent = (evt) => this._connectOptionsDispatch(evt);

      this._connectOptions();
      this._connectToggle();
      this._onFocusOut();
      this.popupListMaxWidth();

      if (this.popoutInput && this.popoutInput.hasAttribute(selectors$b.popoutQuantity)) {
        document.addEventListener('theme:popout:update', this.updatePopout.bind(this));
      }
    }

    unload() {
      if (this.popoutOptions.length) {
        this.popoutOptions.forEach((element) => {
          element.removeEventListener('theme:popout:click', this.popupOptionsClickEvent);
          element.removeEventListener('click', this._connectOptionsDispatchEvent);
        });
      }

      this.popoutToggle.removeEventListener('click', this.popupToggleClickEvent);

      this.popoutToggle.removeEventListener('focusout', this.popupToggleFocusoutEvent);

      this.popoutList.removeEventListener('focusout', this.popupListFocusoutEvent);

      this.container.removeEventListener('keyup', this.containerKeyupEvent);
    }

    popupToggleClick(evt) {
      const ariaExpanded = evt.currentTarget.getAttribute(selectors$b.ariaExpanded) === 'true';

      if (this.productGrid) {
        const productGridItemImage = this.productGrid.querySelector(selectors$b.productGridImage);

        if (productGridItemImage) {
          productGridItemImage.classList.toggle(classes$6.visible, !ariaExpanded);
        }

        this.popoutList.style.maxHeight = `${Math.abs(this.popoutToggle.getBoundingClientRect().bottom - this.productGrid.getBoundingClientRect().bottom)}px`;
      }

      evt.currentTarget.setAttribute(selectors$b.ariaExpanded, !ariaExpanded);
      this.popoutList.classList.toggle(classes$6.listVisible);
      this.popupListMaxWidth();
    }

    popupToggleFocusout(evt) {
      const popoutLostFocus = this.container.contains(evt.relatedTarget);

      if (!popoutLostFocus) {
        this._hideList();
      }
    }

    popupListFocusout(evt) {
      const childInFocus = evt.currentTarget.contains(evt.relatedTarget);
      const isVisible = this.popoutList.classList.contains(classes$6.listVisible);

      if (isVisible && !childInFocus) {
        this._hideList();
      }
    }

    popupListMaxWidth() {
      this.popoutList.style.maxWidth = `${parseInt(document.body.clientWidth - this.popoutList.getBoundingClientRect().left)}px`;
    }

    popupOptionsClick(evt) {
      const link = evt.target.closest(selectors$b.popoutOptions);
      if (link.attributes.href.value === '#') {
        evt.preventDefault();

        let attrValue = '';

        if (evt.currentTarget.getAttribute(selectors$b.dataValue)) {
          attrValue = evt.currentTarget.getAttribute(selectors$b.dataValue);
        }

        this.popoutInput.value = attrValue;

        if (this.popoutPrevent) {
          this.popoutInput.dispatchEvent(new Event('change'));

          if (!evt.detail.preventTrigger && this.popoutInput.hasAttribute(selectors$b.popoutQuantity)) {
            this.popoutInput.dispatchEvent(new Event('input'));
          }

          const currentElement = this.popoutList.querySelector(`[class*="${classes$6.currentSuffix}"]`);
          let targetClass = classes$6.currentSuffix;

          if (currentElement && currentElement.classList.length) {
            for (const currentElementClass of currentElement.classList) {
              if (currentElementClass.includes(classes$6.currentSuffix)) {
                targetClass = currentElementClass;
                break;
              }
            }
          }

          const listTargetElement = this.popoutList.querySelector(`.${targetClass}`);

          if (listTargetElement) {
            listTargetElement.classList.remove(`${targetClass}`);
            evt.currentTarget.parentElement.classList.add(`${targetClass}`);
          }

          const targetAttribute = this.popoutList.querySelector(`[${selectors$b.ariaCurrent}]`);

          if (targetAttribute && targetAttribute.hasAttribute(`${selectors$b.ariaCurrent}`)) {
            targetAttribute.removeAttribute(`${selectors$b.ariaCurrent}`);
            evt.currentTarget.setAttribute(`${selectors$b.ariaCurrent}`, 'true');
          }

          if (attrValue !== '') {
            this.popoutToggle.textContent = attrValue;
          }

          this.popupToggleFocusout(evt);
          this.popupListFocusout(evt);
        } else {
          this._submitForm(attrValue);
        }
      }
    }

    updatePopout() {
      const targetElement = this.popoutList.querySelector(`[${selectors$b.dataValue}="${this.popoutInput.value}"]`);
      if (targetElement) {
        targetElement.dispatchEvent(
          new CustomEvent('theme:popout:click', {
            cancelable: true,
            bubbles: true,
            detail: {
              preventTrigger: true,
            },
          })
        );

        if (!targetElement.parentElement.nextSibling) {
          this.container.classList.add(classes$6.popoutAlternative);
        }
      } else {
        this.container.classList.add(classes$6.popoutAlternative);
      }
    }

    containerKeyup(evt) {
      if (evt.which !== window.theme.keyboardKeys.ESCAPE) {
        return;
      }
      this._hideList();
      this.popoutToggle.focus();
    }

    bodyClick(evt) {
      const isOption = this.container.contains(evt.target);
      const isVisible = this.popoutList.classList.contains(classes$6.listVisible);

      if (isVisible && !isOption) {
        this._hideList();
      }
    }

    _connectToggle() {
      this.popoutToggle.addEventListener('click', this.popupToggleClickEvent);
    }

    _connectOptions() {
      if (this.popoutOptions.length) {
        this.popoutOptions.forEach((element) => {
          element.addEventListener('theme:popout:click', this.popupOptionsClickEvent);
          element.addEventListener('click', this._connectOptionsDispatchEvent);
        });
      }
    }

    _connectOptionsDispatch(evt) {
      const event = new CustomEvent('theme:popout:click', {
        cancelable: true,
        bubbles: true,
        detail: {
          preventTrigger: false,
        },
      });

      if (!evt.target.dispatchEvent(event)) {
        evt.preventDefault();
      }
    }

    _onFocusOut() {
      this.popoutToggle.addEventListener('focusout', this.popupToggleFocusoutEvent);

      this.popoutList.addEventListener('focusout', this.popupListFocusoutEvent);

      this.container.addEventListener('keyup', this.containerKeyupEvent);

      document.body.addEventListener('click', this.bodyClick.bind(this));
    }

    _submitForm() {
      const form = this.container.closest('form');
      if (form) {
        form.submit();
      }
    }

    _hideList() {
      this.popoutList.classList.remove(classes$6.listVisible);
      this.popoutToggle.setAttribute(selectors$b.ariaExpanded, false);
    }
  }

  const popoutSection = {
    onLoad() {
      sections$5[this.id] = [];
      const wrappers = this.container.querySelectorAll(selectors$b.popoutWrapper);
      wrappers.forEach((wrapper) => {
        sections$5[this.id].push(new Popout(wrapper));
      });
    },
    onUnload() {
      sections$5[this.id].forEach((popout) => {
        if (typeof popout.unload === 'function') {
          popout.unload();
        }
      });
    },
  };

  const selectors$c = {
    headerSticky: '[data-header-sticky]',
    headerHeight: '[data-header-height]',
  };

  const scrollTo = (elementTop) => {
    /* Sticky header check */
    const headerHeight =
      document.querySelector(selectors$c.headerSticky) && document.querySelector(selectors$c.headerHeight) ? document.querySelector(selectors$c.headerHeight).getBoundingClientRect().height : 0;

    window.scrollTo({
      top: elementTop + window.scrollY - headerHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  class PopupCookie {
    constructor(name, value, expires) {
      this.configuration = {
        expires: expires, // session cookie
        path: '/',
        domain: window.location.hostname,
      };
      this.name = name;
      this.value = value;
    }

    write() {
      const hasCookie = document.cookie.indexOf('; ') !== -1 && !document.cookie.split('; ').find((row) => row.startsWith(this.name));

      if (hasCookie || document.cookie.indexOf('; ') === -1) {
        document.cookie = `${this.name}=${this.value}; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}`;
      }
    }

    read() {
      if (document.cookie.indexOf('; ') !== -1 && document.cookie.split('; ').find((row) => row.startsWith(this.name))) {
        const returnCookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith(this.name))
          .split('=')[1];

        return returnCookie;
      } else {
        return false;
      }
    }

    destroy() {
      if (document.cookie.split('; ').find((row) => row.startsWith(this.name))) {
        document.cookie = `${this.name}=null; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}`;
      }
    }
  }

  const selectors$d = {
    newsletterForm: '[data-newsletter-form]',
    newsletterHeading: '[data-newsletter-heading]',
    newsletterPopup: '[data-newsletter]',
  };

  const classes$7 = {
    success: 'has-success',
    error: 'not-success',
    hide: 'hide',
  };

  const attributes$2 = {
    cookieNameAttribute: 'data-cookie-name',
  };

  const sections$6 = {};

  class NewsletterCheckForResult {
    constructor(newsletter) {
      this.sessionStorage = window.sessionStorage;
      this.newsletter = newsletter;
      this.popup = this.newsletter.closest(selectors$d.newsletterPopup);
      if (this.popup) {
        this.cookie = new PopupCookie(this.popup.getAttribute(attributes$2.cookieNameAttribute), 'user_has_closed', null);
      }

      this.stopSubmit = true;
      this.isChallengePage = false;
      this.formID = null;

      this.checkForChallengePage();

      this.newsletterSubmit = (e) => this.newsletterSubmitEvent(e);

      if (!this.isChallengePage) {
        this.init();
      }
    }

    init() {
      this.newsletter.addEventListener('submit', this.newsletterSubmit);

      this.showMessage();
    }

    newsletterSubmitEvent(e) {
      if (this.stopSubmit) {
        e.preventDefault();

        this.removeStorage();
        this.writeStorage();
        this.stopSubmit = false;
        this.newsletter.submit();
      }
    }

    checkForChallengePage() {
      this.isChallengePage = window.location.pathname === '/challenge';
    }

    writeStorage() {
      if (this.sessionStorage !== undefined) {
        this.sessionStorage.setItem('newsletter_form_id', this.newsletter.id);
      }
    }

    readStorage() {
      this.formID = this.sessionStorage.getItem('newsletter_form_id');
    }

    removeStorage() {
      this.sessionStorage.removeItem('newsletter_form_id');
    }

    showMessage() {
      this.readStorage();

      if (this.newsletter.id === this.formID) {
        const newsletter = document.getElementById(this.formID);
        const newsletterHeading = newsletter.parentElement.querySelector(selectors$d.newsletterHeading);
        const submissionSuccess = window.location.search.indexOf('?customer_posted=true') !== -1;
        const submissionFailure = window.location.search.indexOf('accepts_marketing') !== -1;

        if (submissionSuccess) {
          newsletter.classList.remove(classes$7.error);
          newsletter.classList.add(classes$7.success);

          if (newsletterHeading) {
            newsletterHeading.classList.add(classes$7.hide);
            newsletter.classList.remove(classes$7.hide);
          }

          if (this.popup) {
            this.cookie.write();
          }
        } else if (submissionFailure) {
          newsletter.classList.remove(classes$7.success);
          newsletter.classList.add(classes$7.error);

          if (newsletterHeading) {
            newsletterHeading.classList.add(classes$7.hide);
            newsletter.classList.remove(classes$7.hide);
          }
        }

        if (submissionSuccess || submissionFailure) {
          window.addEventListener('load', () => {
            this.scrollToForm(newsletter);
          });
        }
      }
    }

    scrollToForm(newsletter) {
      const rect = newsletter.getBoundingClientRect();
      const isVisible =
        rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);

      if (!isVisible) {
        setTimeout(() => {
          scrollTo(newsletter.getBoundingClientRect().top);
        }, 500);
      }
    }

    unload() {
      this.newsletter.removeEventListener('submit', this.newsletterSubmit);
    }
  }

  const newsletterCheckForResultSection = {
    onLoad() {
      sections$6[this.id] = [];
      const newsletters = this.container.querySelectorAll(selectors$d.newsletterForm);
      newsletters.forEach((form) => {
        sections$6[this.id].push(new NewsletterCheckForResult(form));
      });
    },
    onUnload() {
      sections$6[this.id].forEach((form) => {
        if (typeof form.unload === 'function') {
          form.unload();
        }
      });
    },
  };

  register('footer', [popoutSection, parallaxHero, newsletterCheckForResultSection]);

  function Listeners() {
    this.entries = [];
  }

  Listeners.prototype.add = function (element, event, fn) {
    this.entries.push({element: element, event: event, fn: fn});
    element.addEventListener(event, fn);
  };

  Listeners.prototype.removeAll = function () {
    this.entries = this.entries.filter(function (listener) {
      listener.element.removeEventListener(listener.event, listener.fn);
      return false;
    });
  };

  /**
   * Find a match in the project JSON (using a ID number) and return the variant (as an Object)
   * @param {Object} product Product JSON object
   * @param {Number} value Accepts Number (e.g. 6908023078973)
   * @returns {Object} The variant object once a match has been successful. Otherwise null will be return
   */

  /**
   * Convert the Object (with 'name' and 'value' keys) into an Array of values, then find a match & return the variant (as an Object)
   * @param {Object} product Product JSON object
   * @param {Object} collection Object with 'name' and 'value' keys (e.g. [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }])
   * @returns {Object || null} The variant object once a match has been successful. Otherwise null will be returned
   */
  function getVariantFromSerializedArray(product, collection) {
    _validateProductStructure(product);

    // If value is an array of options
    var optionArray = _createOptionArrayFromOptionCollection(product, collection);
    return getVariantFromOptionArray(product, optionArray);
  }

  /**
   * Find a match in the project JSON (using Array with option values) and return the variant (as an Object)
   * @param {Object} product Product JSON object
   * @param {Array} options List of submitted values (e.g. ['36', 'Black'])
   * @returns {Object || null} The variant object once a match has been successful. Otherwise null will be returned
   */
  function getVariantFromOptionArray(product, options) {
    _validateProductStructure(product);
    _validateOptionsArray(options);

    var result = product.variants.filter(function (variant) {
      return options.every(function (option, index) {
        return variant.options[index] === option;
      });
    });

    return result[0] || null;
  }

  /**
   * Creates an array of selected options from the object
   * Loops through the project.options and check if the "option name" exist (product.options.name) and matches the target
   * @param {Object} product Product JSON object
   * @param {Array} collection Array of object (e.g. [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }])
   * @returns {Array} The result of the matched values. (e.g. ['36', 'Black'])
   */
  function _createOptionArrayFromOptionCollection(product, collection) {
    _validateProductStructure(product);
    _validateSerializedArray(collection);

    var optionArray = [];

    collection.forEach(function (option) {
      for (var i = 0; i < product.options.length; i++) {
        var name = product.options[i].name || product.options[i];
        if (name.toLowerCase() === option.name.toLowerCase()) {
          optionArray[i] = option.value;
          break;
        }
      }
    });

    return optionArray;
  }

  /**
   * Check if the product data is a valid JS object
   * Error will be thrown if type is invalid
   * @param {object} product Product JSON object
   */
  function _validateProductStructure(product) {
    if (typeof product !== 'object') {
      throw new TypeError(product + ' is not an object.');
    }

    if (Object.keys(product).length === 0 && product.constructor === Object) {
      throw new Error(product + ' is empty.');
    }
  }

  /**
   * Validate the structure of the array
   * It must be formatted like jQuery's serializeArray()
   * @param {Array} collection Array of object [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }]
   */
  function _validateSerializedArray(collection) {
    if (!Array.isArray(collection)) {
      throw new TypeError(collection + ' is not an array.');
    }

    if (collection.length === 0) {
      throw new Error(collection + ' is empty.');
    }

    if (collection[0].hasOwnProperty('name')) {
      if (typeof collection[0].name !== 'string') {
        throw new TypeError('Invalid value type passed for name of option ' + collection[0].name + '. Value should be string.');
      }
    } else {
      throw new Error(collection[0] + 'does not contain name key.');
    }
  }

  /**
   * Validate the structure of the array
   * It must be formatted as list of values
   * @param {Array} collection Array of object (e.g. ['36', 'Black'])
   */
  function _validateOptionsArray(options) {
    if (Array.isArray(options) && typeof options[0] === 'object') {
      throw new Error(options + 'is not a valid array of options.');
    }
  }

  var selectors$e = {
    idInput: '[name="id"]',
    planInput: '[name="selling_plan"]',
    optionInput: '[name^="options"]',
    quantityInput: '[name="quantity"]',
    propertyInput: '[name^="properties"]',
  };

  // Public Methods
  // -----------------------------------------------------------------------------

  /**
   * Returns a URL with a variant ID query parameter. Useful for updating window.history
   * with a new URL based on the currently select product variant.
   * @param {string} url - The URL you wish to append the variant ID to
   * @param {number} id  - The variant ID you wish to append to the URL
   * @returns {string} - The new url which includes the variant ID query parameter
   */

  function getUrlWithVariant(url, id) {
    if (/variant=/.test(url)) {
      return url.replace(/(variant=)[^&]+/, '$1' + id);
    } else if (/\?/.test(url)) {
      return url.concat('&variant=').concat(id);
    }

    return url.concat('?variant=').concat(id);
  }

  /**
   * Constructor class that creates a new instance of a product form controller.
   *
   * @param {Element} element - DOM element which is equal to the <form> node wrapping product form inputs
   * @param {Object} product - A product object
   * @param {Object} options - Optional options object
   * @param {Function} options.onOptionChange - Callback for whenever an option input changes
   * @param {Function} options.onPlanChange - Callback for changes to name=selling_plan
   * @param {Function} options.onQuantityChange - Callback for whenever an quantity input changes
   * @param {Function} options.onPropertyChange - Callback for whenever a property input changes
   * @param {Function} options.onFormSubmit - Callback for whenever the product form is submitted
   */
  class ProductForm {
    constructor(element, product, options) {
      this.element = element;
      this.form = this.element.tagName == 'FORM' ? this.element : this.element.querySelector('form');
      this.product = this._validateProductObject(product);
      this.variantElement = this.element.querySelector(selectors$e.idInput);

      options = options || {};

      this._listeners = new Listeners();
      this._listeners.add(this.element, 'submit', this._onSubmit.bind(this, options));

      this.optionInputs = this._initInputs(selectors$e.optionInput, options.onOptionChange);

      this.planInputs = this._initInputs(selectors$e.planInput, options.onPlanChange);

      this.quantityInputs = this._initInputs(selectors$e.quantityInput, options.onQuantityChange);

      this.propertyInputs = this._initInputs(selectors$e.propertyInput, options.onPropertyChange);
    }

    /**
     * Cleans up all event handlers that were assigned when the Product Form was constructed.
     * Useful for use when a section needs to be reloaded in the theme editor.
     */
    destroy() {
      this._listeners.removeAll();
    }

    /**
     * Getter method which returns the array of currently selected option values
     *
     * @returns {Array} An array of option values
     */
    options() {
      return this._serializeInputValues(this.optionInputs, function (item) {
        var regex = /(?:^(options\[))(.*?)(?:\])/;
        item.name = regex.exec(item.name)[2]; // Use just the value between 'options[' and ']'
        return item;
      });
    }

    /**
     * Getter method which returns the currently selected variant, or `null` if variant
     * doesn't exist.
     *
     * @returns {Object|null} Variant object
     */
    variant() {
      const opts = this.options();
      if (opts.length) {
        return getVariantFromSerializedArray(this.product, opts);
      } else {
        return this.product.variants[0];
      }
    }

    /**
     * Getter method which returns the current selling plan, or `null` if plan
     * doesn't exist.
     *
     * @returns {Object|null} Variant object
     */
    plan(variant) {
      let plan = {
        allocation: null,
        group: null,
        detail: null,
      };
      const formData = new FormData(this.form);
      const id = formData.get('selling_plan');

      if (id && variant) {
        plan.allocation = variant.selling_plan_allocations.find(function (item) {
          return item.selling_plan_id.toString() === id.toString();
        });
      }
      if (plan.allocation) {
        plan.group = this.product.selling_plan_groups.find(function (item) {
          return item.id.toString() === plan.allocation.selling_plan_group_id.toString();
        });
      }
      if (plan.group) {
        plan.detail = plan.group.selling_plans.find(function (item) {
          return item.id.toString() === id.toString();
        });
      }

      if (plan && plan.allocation && plan.detail && plan.allocation) {
        return plan;
      } else return null;
    }

    /**
     * Getter method which returns a collection of objects containing name and values
     * of property inputs
     *
     * @returns {Array} Collection of objects with name and value keys
     */
    properties() {
      return this._serializeInputValues(this.propertyInputs, function (item) {
        var regex = /(?:^(properties\[))(.*?)(?:\])/;
        item.name = regex.exec(item.name)[2]; // Use just the value between 'properties[' and ']'
        return item;
      });
    }

    /**
     * Getter method which returns the current quantity or 1 if no quantity input is
     * included in the form
     *
     * @returns {Array} Collection of objects with name and value keys
     */
    quantity() {
      return this.quantityInputs[0] ? Number.parseInt(this.quantityInputs[0].value, 10) : 1;
    }

    getFormState() {
      const variant = this.variant();
      return {
        options: this.options(),
        variant: variant,
        properties: this.properties(),
        quantity: this.quantity(),
        plan: this.plan(variant),
      };
    }

    // Private Methods
    // -----------------------------------------------------------------------------
    _setIdInputValue(variant) {
      if (variant && variant.id) {
        this.variantElement.value = variant.id.toString();
      } else {
        this.variantElement.value = '';
      }

      this.variantElement.dispatchEvent(new Event('change'));
    }

    _onSubmit(options, event) {
      event.dataset = this.getFormState();
      if (options.onFormSubmit) {
        options.onFormSubmit(event);
      }
    }

    _onOptionChange(event) {
      this._setIdInputValue(event.dataset.variant);
    }

    _onFormEvent(cb) {
      if (typeof cb === 'undefined') {
        return Function.prototype.bind();
      }

      return function (event) {
        event.dataset = this.getFormState();
        this._setIdInputValue(event.dataset.variant);
        cb(event);
      }.bind(this);
    }

    _initInputs(selector, cb) {
      var elements = Array.prototype.slice.call(this.element.querySelectorAll(selector));

      return elements.map(
        function (element) {
          this._listeners.add(element, 'change', this._onFormEvent(cb));
          return element;
        }.bind(this)
      );
    }

    _serializeInputValues(inputs, transform) {
      return inputs.reduce(function (options, input) {
        if (
          input.checked || // If input is a checked (means type radio or checkbox)
          (input.type !== 'radio' && input.type !== 'checkbox') // Or if its any other type of input
        ) {
          options.push(transform({name: input.name, value: input.value}));
        }

        return options;
      }, []);
    }

    _validateProductObject(product) {
      if (typeof product !== 'object') {
        throw new TypeError(product + ' is not an object.');
      }

      if (typeof product.variants[0].options === 'undefined') {
        throw new TypeError('Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route');
      }
      return product;
    }
  }

  function fetchProduct(handle) {
    const requestRoute = `${window.theme.routes.root}products/${handle}.js`;

    return window
      .fetch(requestRoute)
      .then((response) => {
        return response.json();
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function getScript(url, callback, callbackError) {
    let head = document.getElementsByTagName('head')[0];
    let done = false;
    let script = document.createElement('script');
    script.src = url;

    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function () {
      if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
        done = true;
        callback();
      } else {
        callbackError();
      }
    };

    head.appendChild(script);
  }

  const loaders = {};
  window.isYoutubeAPILoaded = false;
  window.isVimeoAPILoaded = false;

  function loadScript(options = {}) {
    if (!options.type) {
      options.type = 'json';
    }

    if (options.url) {
      if (loaders[options.url]) {
        return loaders[options.url];
      } else {
        return getScriptWithPromise(options.url, options.type);
      }
    } else if (options.json) {
      if (loaders[options.json]) {
        return Promise.resolve(loaders[options.json]);
      } else {
        return window
          .fetch(options.json)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            loaders[options.json] = response;
            return response;
          });
      }
    } else if (options.name) {
      const key = ''.concat(options.name, options.version);
      if (loaders[key]) {
        return loaders[key];
      } else {
        return loadShopifyWithPromise(options);
      }
    } else {
      return Promise.reject();
    }
  }

  function getScriptWithPromise(url, type) {
    const loader = new Promise((resolve, reject) => {
      if (type === 'text') {
        fetch(url)
          .then((response) => response.text())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        getScript(
          url,
          function () {
            resolve();
          },
          function () {
            reject();
          }
        );
      }
    });

    loaders[url] = loader;
    return loader;
  }

  function loadShopifyWithPromise(options) {
    const key = ''.concat(options.name, options.version);
    const loader = new Promise((resolve, reject) => {
      try {
        window.Shopify.loadFeatures([
          {
            name: options.name,
            version: options.version,
            onLoad: (err) => {
              onLoadFromShopify(resolve, reject, err);
            },
          },
        ]);
      } catch (err) {
        reject(err);
      }
    });
    loaders[key] = loader;
    return loader;
  }

  function onLoadFromShopify(resolve, reject, err) {
    if (err) {
      return reject(err);
    } else {
      return resolve();
    }
  }

  const selectors$f = {
    scrollbarAttribute: 'data-scrollbar',
    scrollbar: 'data-scrollbar-slider',
    scrollbarSlideFullWidth: 'data-scrollbar-slide-fullwidth',
    scrollbarArrowPrev: '[data-scrollbar-arrow-prev]',
    scrollbarArrowNext: '[data-scrollbar-arrow-next]',
  };
  const classes$8 = {
    hide: 'is-hidden',
  };
  const settings$1 = {
    delay: 200,
  };

  class NativeScrollbar {
    constructor(scrollbar) {
      this.scrollbar = scrollbar;

      this.arrowNext = this.scrollbar.parentNode.querySelector(selectors$f.scrollbarArrowNext);
      this.arrowPrev = this.scrollbar.parentNode.querySelector(selectors$f.scrollbarArrowPrev);

      if (this.scrollbar.hasAttribute(selectors$f.scrollbarAttribute)) {
        this.init();
        this.resize();
      }

      if (this.scrollbar.hasAttribute(selectors$f.scrollbar)) {
        this.scrollToVisibleElement();
      }
    }

    init() {
      if (this.arrowNext && this.arrowPrev) {
        this.toggleNextArrow();

        this.events();
      }
    }

    resize() {
      document.addEventListener('theme:resize', () => {
        this.toggleNextArrow();
      });
    }

    events() {
      this.arrowNext.addEventListener('click', (event) => {
        event.preventDefault();

        this.goToNext();
      });

      this.arrowPrev.addEventListener('click', (event) => {
        event.preventDefault();

        this.goToPrev();
      });

      this.scrollbar.addEventListener('scroll', () => {
        this.togglePrevArrow();
        this.toggleNextArrow();
      });
    }

    goToNext() {
      const moveWith = this.scrollbar.hasAttribute(selectors$f.scrollbarSlideFullWidth) ? this.scrollbar.getBoundingClientRect().width : this.scrollbar.getBoundingClientRect().width / 2;
      const position = moveWith + this.scrollbar.scrollLeft;

      this.move(position);

      this.arrowPrev.classList.remove(classes$8.hide);

      this.toggleNextArrow();
    }

    goToPrev() {
      const moveWith = this.scrollbar.hasAttribute(selectors$f.scrollbarSlideFullWidth) ? this.scrollbar.getBoundingClientRect().width : this.scrollbar.getBoundingClientRect().width / 2;
      const position = this.scrollbar.scrollLeft - moveWith;

      this.move(position);

      this.arrowNext.classList.remove(classes$8.hide);

      this.togglePrevArrow();
    }

    toggleNextArrow() {
      setTimeout(() => {
        this.arrowNext.classList.toggle(classes$8.hide, Math.round(this.scrollbar.scrollLeft + this.scrollbar.getBoundingClientRect().width + 1) >= this.scrollbar.scrollWidth);
      }, settings$1.delay);
    }

    togglePrevArrow() {
      setTimeout(() => {
        this.arrowPrev.classList.toggle(classes$8.hide, this.scrollbar.scrollLeft <= 0);
      }, settings$1.delay);
    }

    scrollToVisibleElement() {
      [].forEach.call(this.scrollbar.children, (element) => {
        element.addEventListener('click', (event) => {
          event.preventDefault();

          this.move(element.offsetLeft - element.clientWidth);
        });
      });
    }

    move(offsetLeft) {
      this.scrollbar.scrollTo({
        top: 0,
        left: offsetLeft,
        behavior: 'smooth',
      });
    }
  }

  const defaults = {
    color: 'ash',
  };

  const selectors$g = {
    gridSwatchForm: '[data-grid-swatch-form]',
    swatch: 'data-swatch',
    outerGrid: '[data-product-grid-item]',
    slide: '[data-grid-slide]',
    image: 'data-swatch-image',
    sectionId: '[data-section-id]',
    productInfo: '[data-product-information]',
    variant: 'data-swatch-variant',
    variantName: 'data-swatch-variant-name',
    button: '[data-swatch-button]',
    link: '[data-grid-link]',
    wrapper: '[data-grid-swatches]',
    template: '[data-swatch-template]',
    handle: 'data-swatch-handle',
    label: 'data-swatch-label',
    tooltip: 'data-tooltip',
    swatchCount: 'data-swatch-count',
    scrollbar: 'data-scrollbar',
    dataVariantTitle: 'data-variant-title',
  };

  const classes$9 = {
    visible: 'is-visible',
    stopEvents: 'no-events',
  };

  class ColorMatch {
    constructor(options = {}) {
      this.settings = {
        ...defaults,
        ...options,
      };

      this.match = this.init();
    }

    getColor() {
      return this.match;
    }

    init() {
      const getColors = loadScript({json: window.theme.assets.swatches});
      return getColors
        .then((colors) => {
          return this.matchColors(colors, this.settings.color);
        })
        .catch((e) => {
          console.log('failed to load swatch colors script');
          console.log(e);
        });
    }

    matchColors(colors, name) {
      let bg = '#E5E5E5';
      let img = null;
      const path = window.theme.assets.base || '/';
      const comparisonName = name.toLowerCase().replace(/\s/g, '');
      const array = colors.colors;

      if (array) {
        let indexArray = null;

        const hexColorArr = array.filter((colorObj, index) => {
          const neatName = Object.keys(colorObj).toString().toLowerCase().replace(/\s/g, '');

          if (neatName === comparisonName) {
            indexArray = index;

            return colorObj;
          }
        });

        if (hexColorArr.length && indexArray !== null) {
          const value = Object.values(array[indexArray])[0];
          bg = value;

          if (value.includes('.jpg') || value.includes('.jpeg') || value.includes('.png') || value.includes('.svg')) {
            img = `${path}${value}`;
            bg = '#888888';
          }
        }
      }

      return {
        color: this.settings.color,
        path: img,
        hex: bg,
      };
    }
  }

  class Swatch {
    constructor(element) {
      this.element = element;
      this.colorString = element.getAttribute(selectors$g.swatch);
      this.image = element.getAttribute(selectors$g.image);
      this.variant = element.getAttribute(selectors$g.variant);
      this.variantName = element.getAttribute(selectors$g.variantName);
      this.tooltip = this.element.closest(`[${selectors$g.tooltip}]`);
      const matcher = new ColorMatch({color: this.colorString});
      matcher.getColor().then((result) => {
        this.colorMatch = result;
        this.init();
      });
    }

    init() {
      this.setStyles();
      if (this.variant) {
        this.handleEvents();
      }

      if (this.tooltip) {
        new Tooltip(this.tooltip);
      }
    }

    setStyles() {
      if (this.colorMatch.hex) {
        this.element.style.setProperty('--swatch', `${this.colorMatch.hex}`);
      }
      if (this.colorMatch.path) {
        this.element.style.setProperty('background-image', `url(${this.colorMatch.path})`);
        this.element.style.setProperty('background-size', 'cover');
        this.element.style.setProperty('background-position', 'center center');
      }
    }

    handleEvents() {
      this.outer = this.element.closest(selectors$g.outerGrid);
      if (this.outer) {
        this.slide = this.outer.querySelector(selectors$g.slide);
        this.linkElement = this.outer.querySelector(selectors$g.link);
        this.linkElementAll = this.outer.querySelectorAll(selectors$g.link);
        this.linkDestination = getUrlWithVariant(this.linkElement.getAttribute('href'), this.variant);
        this.button = this.element.closest(selectors$g.button);
        this.imagesHidden = this.outer.querySelectorAll(`[${selectors$g.dataVariantTitle}][style*="display: none;"]`);
        this.outerHoverEvent = () => this.showHoverImages();

        if (this.button.closest(selectors$g.gridSwatchForm)) {
          this.button.addEventListener(
            'mouseenter',
            function () {
              this.changeImage();
            }.bind(this)
          );
        }

        if (!this.button.closest(selectors$g.gridSwatchForm)) {
          this.button.addEventListener(
            'click',
            function () {
              this.changeImage();
            }.bind(this)
          );
        }

        if (this.imagesHidden.length) {
          this.outer.addEventListener('mouseenter', this.outerHoverEvent);
        }
      }
    }

    showHoverImages() {
      this.imagesHidden.forEach((image) => {
        image.style.removeProperty('display');
      });

      this.outer.removeEventListener('mouseenter', this.outerHoverEvent);
    }

    changeImage() {
      this.linkElementAll.forEach((link) => {
        link.setAttribute('href', this.linkDestination);
      });

      this.slide.setAttribute('src', this.linkDestination);

      if (this.image) {
        const variantName = this.variantName.replaceAll('"', "'");
        const imageTarget = this.slide.querySelector(`[${selectors$g.dataVariantTitle}="${variantName}"]`);

        if (imageTarget) {
          const imageVisible = this.slide.querySelector(`[${selectors$g.dataVariantTitle}].${classes$9.visible}`);
          if (imageVisible) {
            imageVisible.classList.remove(classes$9.visible);
          }

          imageTarget.classList.add(classes$9.visible);
        }
      }
    }
  }

  class GridSwatch {
    constructor(wrap, container) {
      this.container = container;
      this.wrap = wrap;
      this.outerGrid = wrap.closest(selectors$g.outerGrid);
      this.productLink = wrap.closest(selectors$g.link);
      this.productInfo = wrap.closest(selectors$g.productInfo);
      this.template = document.querySelector(selectors$g.template).innerHTML;
      this.handle = wrap.getAttribute(selectors$g.handle);
      this.sectionId = this.wrap.closest(selectors$g.sectionId).dataset.sectionId;

      const label = wrap.getAttribute(selectors$g.label).trim().toLowerCase();
      fetchProduct(this.handle).then((product) => {
        this.product = product;
        this.colorOption = product.options.find(function (element) {
          return element.name.toLowerCase() === label || null;
        });

        if (this.colorOption) {
          this.swatches = this.colorOption.values;
          this.init();
        }
      });
    }

    init() {
      this.wrap.innerHTML = '';
      this.count = 0;
      this.swatches.forEach((swatch) => {
        let variant = null;
        let variantAvailable = false;
        let image = '';

        for (const productVariant of this.product.variants) {
          const optionWithSwatch = productVariant.options.includes(swatch);

          if (!variant && optionWithSwatch) {
            variant = productVariant;
          }

          // Use a variant with image if exists
          if (optionWithSwatch && productVariant.featured_media) {
            image = productVariant.featured_media.preview_image.src;
            variant = productVariant;
            break;
          }
        }

        for (const productVariant of this.product.variants) {
          const optionWithSwatch = productVariant.options.includes(swatch);

          if (optionWithSwatch && productVariant.available) {
            variantAvailable = true;
            break;
          }
        }

        if (variant) {
          this.wrap.innerHTML += Sqrl.render(this.template, {
            animation: window.theme.settings.enableAnimations ? ` style=--animation-delay:${(100 * this.count) / 1000}s; data-fades-in` : '',
            color: swatch,
            swatchStyle: window.theme.settings.swatchStyle,
            uniq: `${this.sectionId}-${this.product.id}-${variant.id}`,
            variant: variant.id,
            variantName: variant.title.replaceAll('"', "'"),
            available: variantAvailable,
            image: image,
          });
          this.count++;
        }
      });

      this.swatchCount = this.productLink.querySelector(`[${selectors$g.swatchCount}]`);
      this.swatchElements = this.wrap.querySelectorAll(`[${selectors$g.swatch}]`);
      this.swatchForm = this.productLink.querySelector(selectors$g.gridSwatchForm);
      this.hideSwatchesTimer = 0;

      if (this.swatchCount.hasAttribute(selectors$g.swatchCount)) {
        this.swatchCount.innerText = `${this.count} ${this.count > 1 ? theme.strings.otherColor : theme.strings.oneColor}`;

        this.swatchCount.addEventListener('mouseenter', () => {
          if (this.hideSwatchesTimer) clearTimeout(this.hideSwatchesTimer);

          this.productLink.classList.add(classes$9.stopEvents);
          this.swatchForm.classList.add(classes$9.visible);
        });

        // Prevent color swatches blinking on mouse move
        this.productInfo.addEventListener('mouseleave', () => {
          this.hideSwatchesTimer = setTimeout(() => {
            this.productLink.classList.remove(classes$9.stopEvents);
            this.swatchForm.classList.remove(classes$9.visible);
          }, 100);
        });
      }

      if (this.wrap.hasAttribute(selectors$g.scrollbar)) {
        new NativeScrollbar(this.wrap);
      }

      this.swatchElements.forEach((el) => {
        new Swatch(el);
      });
    }
  }

  const makeGridSwatches = (section) => {
    const gridSwatchWrappers = section.container.querySelectorAll(selectors$g.wrapper);
    gridSwatchWrappers.forEach((wrap) => {
      new GridSwatch(wrap, undefined);
    });
  };

  const swatchSection = {
    onLoad() {
      this.swatches = [];
      const els = this.container.querySelectorAll(`[${selectors$g.swatch}]`);
      els.forEach((el) => {
        this.swatches.push(new Swatch(el));
      });
    },
  };

  const swatchGridSection = {
    onLoad() {
      makeGridSwatches(this);
    },
  };

  const selectors$h = {
    productSlideshow: '[data-product-slideshow]',
    productThumbs: '[data-product-thumbs]',
    sliderThumb: '[data-thumb-item]',
    dataTallLayout: 'data-tall-layout',
    mediaType: 'data-type',
    dataMediaId: 'data-media-id',
    dataThumb: 'data-thumb',
    dataThumbIndex: 'data-thumb-index',
    deferredMediaButton: '[data-deferred-media-button]',
    ariaLabel: 'aria-label',
    dataThumbnail: '[data-thumbnail]',
    productSlideThumb: '.js-product-slide-thumb',
    classSelected: '.is-active',
    thumbsSlider: '[data-thumbs-slider]',
    quickAddModal: '[data-quick-add-modal]',
    focusedElement: '[data-focus-element]',
    zoomElement: '[data-zoom-wrapper]',
  };

  const classes$a = {
    btn: 'btn',
    active: 'is-active',
    focused: 'is-focused',
    dragging: 'is-dragging',
    selected: 'is-selected',
    sliderEnabled: 'flickity-enabled',
    mediaHidden: 'media--hidden',
  };

  const attributes$3 = {
    ariaCurrent: 'aria-current',
  };

  const thumbIcons = {
    model:
      '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-media-model" viewBox="0 0 26 26"><path class="icon-media-model-outline" d="M.5 25v.5h25V.5H.5z" fill="none"/><path class="icon-media-model-element" d="M19.13 8.28L14 5.32a2 2 0 0 0-2 0l-5.12 3a2 2 0 0 0-1 1.76V16a2 2 0 0 0 1 1.76l5.12 3a2 2 0 0 0 2 0l5.12-3a2 2 0 0 0 1-1.76v-6a2 2 0 0 0-.99-1.72zm-6.4 11.1l-5.12-3a.53.53 0 0 1-.26-.38v-6a.53.53 0 0 1 .27-.46l5.12-3a.53.53 0 0 1 .53 0l5.12 3-4.72 2.68a1.33 1.33 0 0 0-.67 1.2v6a.53.53 0 0 1-.26 0z" opacity=".6" style="isolation:isolate"/></svg>',
    video:
      '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-media-video" viewBox="0 0 26 26"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 25h24V1H1v24z"/><path class="icon-media-video-outline" d="M.5 25v.5h25V.5H.5V25z"/><path class="icon-media-video-element" fill-rule="evenodd" clip-rule="evenodd" d="M9.718 6.72a1 1 0 0 0-1.518.855v10.736a1 1 0 0 0 1.562.827l8.35-5.677a1 1 0 0 0-.044-1.682l-8.35-5.06z" opacity=".6"/></svg>',
  };

  class InitSlider {
    constructor(section) {
      this.container = section.container;
      this.tallLayout = this.container.getAttribute(selectors$h.dataTallLayout) === 'true';
      this.slideshow = this.container.querySelector(selectors$h.productSlideshow);
      this.thumbs = this.container.querySelector(selectors$h.productThumbs);
      this.mobileSliderEnable = this.container.getAttribute(selectors$h.mobileSliderEnable) === 'true';

      this.flkty = null;

      this.init();
    }

    init() {
      if (this.tallLayout) {
        this.initSliderMobile();

        document.addEventListener('theme:resize', () => {
          this.initSliderMobile();
        });
      } else {
        this.createSlider();
      }
    }

    initSliderMobile() {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const isMobile = windowWidth < theme.sizes.small;
      if (isMobile) {
        this.createSlider();
      } else {
        this.destroySlider();
      }
    }

    destroySlider() {
      const isSliderInitialized = this.slideshow.classList.contains(classes$a.sliderEnabled);

      if (isSliderInitialized) {
        this.flkty.destroy();
      }

      if (this.thumbs) {
        this.thumbs.innerHTML = '';
      }
    }

    createSlider() {
      if (!this.slideshow) {
        return;
      }

      const instance = this;
      const firstSlide = this.slideshow.querySelectorAll(`[${selectors$h.mediaType}]`)[0];
      let options = {
        autoPlay: false,
        prevNextButtons: false,
        contain: true,
        pageDots: false,
        adaptiveHeight: true,
        wrapAround: true,
        fade: true,
        on: {
          ready: function () {
            const slides = this.element;
            slides.addEventListener('keyup', (e) => {
              if (e.keyCode === window.theme.keyboardKeys.ENTER) {
                const zoomElement = slides.querySelector(`.${classes$a.selected} ${selectors$h.zoomElement}`);
                if (zoomElement) {
                  zoomElement.dispatchEvent(new Event('click', {bubbles: false}));
                  window.accessibility.lastElement = slides;
                }
              }
            });

            instance.sliderThumbs(this);
          },
        },
      };

      if (this.slideshow.closest(selectors$h.quickAddModal)) {
        options = {
          autoPlay: false,
          prevNextButtons: true,
          pageDots: false,
          wrapAround: true,
          fade: false,
          cellAlign: 'left',
          adaptiveHeight: false,
          on: {
            ready: function () {
              this.prevButton.element.classList.add(classes$a.btn);
              this.nextButton.element.classList.add(classes$a.btn);
            },
          },
        };
      }

      this.flkty = new FlickityFade(this.slideshow, options);
      this.flkty.resize();

      if (firstSlide) {
        const firstType = firstSlide.getAttribute(selectors$h.mediaType);

        if (firstType === 'model' || firstType === 'video' || firstType === 'external_video') {
          this.flkty.options.draggable = false;
          this.flkty.updateDraggable();
        }
      }

      this.flkty.on('change', function (index) {
        let lastSLideIdx = index;

        if (instance.thumbs) {
          const selectedElem = instance.thumbs.querySelector(selectors$h.classSelected);
          const currentSlide = instance.thumbs.querySelector(`${selectors$h.sliderThumb} [${selectors$h.dataThumbIndex}="${index}"]`);

          if (selectedElem) {
            const selectedElemThumb = selectedElem.querySelector(`[${selectors$h.dataThumbIndex}]`);
            lastSLideIdx = Array.from(selectedElem.parentElement.children).indexOf(selectedElem);
            selectedElem.classList.remove(classes$a.active);

            if (selectedElemThumb) {
              selectedElemThumb.setAttribute(attributes$3.ariaCurrent, false);
            }
          }

          if (currentSlide) {
            currentSlide.parentElement.classList.add(classes$a.active);
            currentSlide.setAttribute(attributes$3.ariaCurrent, true);
          }

          instance.scrollToThumb();
        }

        const currentMedia = this.cells[lastSLideIdx].element;
        const newMedia = this.selectedElement;

        currentMedia.dispatchEvent(new CustomEvent('theme:media:hidden'));
        newMedia.classList.remove(classes$a.mediaHidden);
      });

      this.flkty.on('settle', function () {
        const currentMedia = this.selectedElement;
        const otherMedia = Array.prototype.filter.call(currentMedia.parentNode.children, function (child) {
          return child !== currentMedia;
        });
        const mediaType = currentMedia.getAttribute(selectors$h.mediaType);
        const isFocusEnabled = document.body.classList.contains(classes$a.focused);

        if (mediaType === 'model' || mediaType === 'video' || mediaType === 'external_video') {
          // fisrt boolean sets value, second option false to prevent refresh
          instance.flkty.options.draggable = false;
          instance.flkty.updateDraggable();
        } else {
          instance.flkty.options.draggable = true;
          instance.flkty.updateDraggable();
        }

        if (isFocusEnabled) currentMedia.dispatchEvent(new Event('focus'));

        if (otherMedia.length) {
          otherMedia.forEach((element) => {
            element.classList.add(classes$a.mediaHidden);
          });
        }

        currentMedia.dispatchEvent(new CustomEvent('theme:media:visible'));

        // Force media loading if slide becomes visible
        const deferredMedia = currentMedia.querySelector('deferred-media');
        if (deferredMedia && deferredMedia.getAttribute('loaded') !== true) {
          currentMedia.querySelector(selectors$h.deferredMediaButton).dispatchEvent(new Event('click', {bubbles: false}));
        }
      });

      this.flkty.on('dragStart', (event, pointer) => {
        event.target.classList.add(classes$a.dragging);
      });

      this.flkty.on('dragEnd', (event, pointer) => {
        const draggedElem = this.flkty.element.querySelector(`.${classes$a.dragging}`);
        if (draggedElem) {
          draggedElem.classList.remove(classes$a.dragging);
        }
      });

      this.container.addEventListener('click', (e) => {
        const target = e.target;

        if (target.matches(selectors$h.productSlideThumb) || target.closest(selectors$h.productSlideThumb)) {
          e.preventDefault();
          const selector = target.matches(selectors$h.productSlideThumb) ? target : target.closest(selectors$h.productSlideThumb);
          const slideIdx = selector.hasAttribute(selectors$h.dataThumbIndex) ? parseInt(selector.getAttribute(selectors$h.dataThumbIndex)) : 0;

          this.flkty.select(slideIdx);
        }
      });
    }

    scrollToThumb() {
      const thumbs = this.container.querySelector(selectors$h.thumbsSlider);

      if (thumbs) {
        const thumb = thumbs.querySelector(selectors$h.classSelected);
        if (!thumb) return;
        const thumbsScrollTop = thumbs.scrollTop;
        const thumbsScrollLeft = thumbs.scrollLeft;
        const thumbsWidth = thumbs.offsetWidth;
        const thumbsHeight = thumbs.offsetHeight;
        const thumbsPositionBottom = thumbsScrollTop + thumbsHeight;
        const thumbsPositionRight = thumbsScrollLeft + thumbsWidth;
        const thumbPosTop = thumb.offsetTop;
        const thumbPosLeft = thumb.offsetLeft;
        const thumbWidth = thumb.offsetWidth;
        const thumbHeight = thumb.offsetHeight;
        const thumbRightPos = thumbPosLeft + thumbWidth;
        const thumbBottomPos = thumbPosTop + thumbHeight;
        const topCheck = thumbsScrollTop > thumbPosTop;
        const bottomCheck = thumbBottomPos > thumbsPositionBottom;
        const leftCheck = thumbsScrollLeft > thumbPosLeft;
        const rightCheck = thumbRightPos > thumbsPositionRight;
        const verticalCheck = bottomCheck || topCheck;
        const horizontalCheck = rightCheck || leftCheck;

        if (verticalCheck || horizontalCheck) {
          const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          const isMobile = windowWidth < theme.sizes.small;
          let scrollTopPosition = thumbPosTop - thumbsHeight + thumbHeight;
          let scrollLeftPosition = thumbPosLeft - thumbsWidth + thumbWidth;

          if (topCheck) {
            scrollTopPosition = thumbPosTop;
          }

          if (rightCheck && isMobile) {
            scrollLeftPosition += parseInt(window.getComputedStyle(thumbs).paddingRight);
          }

          if (leftCheck) {
            scrollLeftPosition = thumbPosLeft;

            if (isMobile) {
              scrollLeftPosition -= parseInt(window.getComputedStyle(thumbs).paddingLeft);
            }
          }

          thumbs.scrollTo({
            top: scrollTopPosition,
            left: scrollLeftPosition,
            behavior: 'smooth',
          });
        }
      }
    }

    sliderThumbs(thisEl) {
      const slides = thisEl.slides;

      if (this.thumbs && slides.length) {
        let slidesHtml = '';
        slides.forEach((element, i) => {
          const slide = element.cells[0].element;
          const type = slide.getAttribute(selectors$h.mediaType);
          const mediaId = slide.getAttribute(selectors$h.dataMediaId);
          const thumb = slide.getAttribute(selectors$h.dataThumb);
          const focusedElement = slide.querySelector(`button, ${selectors$h.focusedElement}`);
          let thumbAlt = '';
          const thumbIcon = thumbIcons[type] ? thumbIcons[type] : '';
          let selected = '';
          let ariaCurrent = false;

          if (slide.querySelector(`[${selectors$h.ariaLabel}]`)) {
            thumbAlt = slide.querySelector(`[${selectors$h.ariaLabel}]`).getAttribute(selectors$h.ariaLabel);
          }

          if (thumbAlt === '' && slide.hasAttribute(selectors$h.ariaLabel)) {
            thumbAlt = slide.getAttribute(selectors$h.ariaLabel);
          }

          slide.setAttribute('tabindex', '-1');

          if (focusedElement) {
            focusedElement.setAttribute('tabindex', '-1');
          }

          if (slide.classList.contains(classes$a.active) || i === 0) {
            selected = classes$a.active;
            ariaCurrent = true;
          }

          slidesHtml += `<div class="thumb ${selected}" data-thumb-item><a href="${thumb}" class="thumb__link thumb__link--${type} js-product-slide-thumb" data-thumb-index="${i}" data-thumbnail data-media-id="${mediaId}" aria-label="${thumbAlt}" aria-current="${ariaCurrent}"><img class="thumb__link__image lazyload" alt="${thumbAlt}" data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048, 2450, 2700, 3000, 3350, 3750, 4100]" data-sizes="auto" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="${thumb}">${thumbIcon}</a></div>`;
        });

        if (slidesHtml !== '') {
          slidesHtml = `<div class="thumbs-holder" data-thumbs-slider>${slidesHtml}</div>`;
          this.thumbs.innerHTML = slidesHtml;
        }
      }

      const productThumbImages = this.container.querySelectorAll(selectors$h.dataThumbnail);
      if (productThumbImages.length) {
        productThumbImages.forEach((element) => {
          element.addEventListener('click', function (e) {
            e.preventDefault();
          });

          element.addEventListener('keyup', function (e) {
            // On keypress Enter move the focus to the first focusable element in the related slide
            if (e.keyCode === window.theme.keyboardKeys.ENTER) {
              const mediaId = this.getAttribute(selectors$h.dataMediaId);
              const mediaElem = thisEl.element
                .querySelector(`[${selectors$h.dataMediaId}="${mediaId}"]`)
                .querySelectorAll('model-viewer, video, iframe, button, [href], input, [tabindex]:not([tabindex="-1"])')[0];
              if (mediaElem) {
                mediaElem.dispatchEvent(new Event('focus'));
                mediaElem.dispatchEvent(new Event('select'));
              }
            }
          });
        });
      }
    }
  }

  const selectors$i = {
    dataEnableSound: 'data-enable-sound',
    dataEnableBackground: 'data-enable-background',
    dataEnableAutoplay: 'data-enable-autoplay',
    dataEnableLoop: 'data-enable-loop',
    dataVideoId: 'data-video-id',
    dataVideoType: 'data-video-type',
    videoIframe: '[data-video-id]',
  };

  const classes$b = {
    loaded: 'loaded',
  };

  class LoadVideoVimeo {
    constructor(container) {
      this.container = container;
      this.player = this.container.querySelector(selectors$i.videoIframe);

      if (this.player) {
        this.videoID = this.player.getAttribute(selectors$i.dataVideoId);
        this.videoType = this.player.getAttribute(selectors$i.dataVideoType);
        this.enableBackground = this.player.getAttribute(selectors$i.dataEnableBackground) === 'true';
        this.disableSound = this.player.getAttribute(selectors$i.dataEnableSound) === 'false';
        this.enableAutoplay = this.player.getAttribute(selectors$i.dataEnableAutoplay) !== 'false';
        this.enableLoop = this.player.getAttribute(selectors$i.dataEnableLoop) !== 'false';

        if (this.videoType == 'vimeo') {
          this.init();
        }
      }
    }

    init() {
      this.loadVimeoPlayer();
    }

    loadVimeoPlayer() {
      const oembedUrl = 'https://vimeo.com/api/oembed.json';
      const vimeoUrl = 'https://vimeo.com/' + this.videoID;
      let paramsString = '';
      const state = this.player;

      const params = {
        url: vimeoUrl,
        background: this.enableBackground,
        muted: this.disableSound,
        autoplay: this.enableAutoplay,
        loop: this.enableLoop,
      };

      for (let key in params) {
        paramsString += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
      }

      fetch(`${oembedUrl}?${paramsString}`)
        .then((response) => response.json())
        .then(function (data) {
          state.innerHTML = data.html;

          setTimeout(function () {
            state.parentElement.classList.add(classes$b.loaded);
          }, 1000);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const selectors$j = {
    dataSectionId: 'data-section-id',
    dataEnableSound: 'data-enable-sound',
    dataHideOptions: 'data-hide-options',
    dataCheckPlayerVisibility: 'data-check-player-visibility',
    dataVideoId: 'data-video-id',
    dataVideoType: 'data-video-type',
    videoIframe: '[data-video-id]',
    videoWrapper: '.video-wrapper',
    youtubeWrapper: '[data-youtube-wrapper]',
  };

  const classes$c = {
    loaded: 'loaded',
  };

  const players = [];

  class LoadVideoYT {
    constructor(container) {
      this.container = container;
      this.player = this.container.querySelector(selectors$j.videoIframe);

      if (this.player) {
        this.videoOptionsVars = {};
        this.videoID = this.player.getAttribute(selectors$j.dataVideoId);
        this.videoType = this.player.getAttribute(selectors$j.dataVideoType);
        if (this.videoType == 'youtube') {
          this.checkPlayerVisibilityFlag = this.player.getAttribute(selectors$j.dataCheckPlayerVisibility) === 'true';
          this.playerID = this.player.querySelector(selectors$j.youtubeWrapper) ? this.player.querySelector(selectors$j.youtubeWrapper).id : this.player.id;
          if (this.player.hasAttribute(selectors$j.dataHideOptions)) {
            this.videoOptionsVars = {
              cc_load_policy: 0,
              iv_load_policy: 3,
              modestbranding: 1,
              playsinline: 1,
              autohide: 0,
              controls: 0,
              branding: 0,
              showinfo: 0,
              rel: 0,
              fs: 0,
              wmode: 'opaque',
            };
          }

          this.init();

          this.container.addEventListener('touchstart', function (e) {
            if (e.target.matches(selectors$j.videoWrapper) || e.target.closest(selectors$j.videoWrapper)) {
              const playerID = e.target.querySelector(selectors$j.videoIframe).id;
              players[playerID].playVideo();
            }
          });
        }
      }
    }

    init() {
      if (window.isYoutubeAPILoaded) {
        this.loadYoutubePlayer();
      } else {
        // Load Youtube API if not loaded yet
        loadScript({url: 'https://www.youtube.com/iframe_api'}).then(() => this.loadYoutubePlayer());
      }
    }

    loadYoutubePlayer() {
      const defaultYoutubeOptions = {
        height: '720',
        width: '1280',
        playerVars: this.videoOptionsVars,
        events: {
          onReady: (event) => {
            const eventIframe = event.target.getIframe();
            const id = eventIframe.id;
            const enableSound = document.querySelector(`#${id}`).getAttribute(selectors$j.dataEnableSound) === 'true';

            eventIframe.setAttribute('tabindex', '-1');

            if (enableSound) {
              event.target.unMute();
            } else {
              event.target.mute();
            }
            event.target.playVideo();

            if (this.checkPlayerVisibilityFlag) {
              this.checkPlayerVisibility(id);

              window.addEventListener(
                'scroll',
                throttle(() => {
                  this.checkPlayerVisibility(id);
                }, 150)
              );
            }
          },
          onStateChange: (event) => {
            // Loop video if state is ended
            if (event.data == 0) {
              event.target.playVideo();
            }
            if (event.data == 1) {
              // video is playing
              event.target.getIframe().parentElement.classList.add(classes$c.loaded);
            }
          },
        },
      };

      const currentYoutubeOptions = {...defaultYoutubeOptions};
      currentYoutubeOptions.videoId = this.videoID;
      if (this.videoID.length) {
        YT.ready(() => {
          players[this.playerID] = new YT.Player(this.playerID, currentYoutubeOptions);
        });
      }
      window.isYoutubeAPILoaded = true;
    }

    checkPlayerVisibility(id) {
      let playerID;
      if (typeof id === 'string') {
        playerID = id;
      } else if (id.data != undefined) {
        playerID = id.data.id;
      } else {
        return;
      }

      const playerElement = document.getElementById(playerID + '-container');
      if (!playerElement) return;
      const player = players[playerID];
      const box = playerElement.getBoundingClientRect();
      let isVisible = visibilityHelper.isElementPartiallyVisible(playerElement) || visibilityHelper.isElementTotallyVisible(playerElement);

      // Fix the issue when element height is bigger than the viewport height
      if (box.top < 0 && playerElement.clientHeight + box.top >= 0) {
        isVisible = true;
      }

      if (isVisible && player && typeof player.playVideo === 'function') {
        player.playVideo();
      } else if (!isVisible && player && typeof player.pauseVideo === 'function') {
        player.pauseVideo();
      }
    }

    onUnload() {
      const playerID = 'youtube-' + this.container.getAttribute(selectors$j.dataSectionId);
      if (!players[playerID]) return;
      players[playerID].destroy();
    }
  }

  const selectors$k = {
    popupContainer: '.pswp',
    popupCloseBtn: '.pswp__custom-close',
    popupIframe: 'iframe, video',
    popupCustomIframe: '.pswp__custom-iframe',
    popupThumbs: '.pswp__thumbs',
    popupButtons: '.pswp__button, .pswp__caption-close',
  };

  const classes$d = {
    current: 'is-current',
    customLoader: 'pswp--custom-loader',
    customOpen: 'pswp--custom-opening',
    loader: 'pswp__loader',
    popupCloseButton: 'pswp__button--close',
  };

  const attributes$4 = {
    dataOptionClasses: 'data-pswp-option-classes',
    dataVideoType: 'data-video-type',
    ariaCurrent: 'aria-current',
  };

  const loaderHTML = `<div class="${classes$d.loader}"><div class="loader pswp__loader-line"><div class="loader-indeterminate"></div></div></div>`;

  class LoadPhotoswipe {
    constructor(items, options = '') {
      this.items = items;
      this.pswpElement = document.querySelectorAll(selectors$k.popupContainer)[0];
      this.popup = null;
      this.popupThumbs = null;
      this.isVideo = false;
      this.popupThumbsContainer = this.pswpElement.querySelector(selectors$k.popupThumbs);
      this.closeBtn = this.pswpElement.querySelector(selectors$k.popupCloseBtn);
      this.keyupCloseEvent = (e) => this.keyupClose(e);
      this.a11y = a11y;

      const defaultOptions = {
        history: false,
        focus: false,
        mainClass: '',
      };
      this.options = options !== '' ? options : defaultOptions;

      this.init();
    }

    init() {
      this.pswpElement.classList.add(classes$d.customOpen);

      this.initLoader();

      loadScript({url: window.theme.assets.photoswipe})
        .then(() => this.loadPopup())
        .catch((e) => console.error(e));
    }

    initLoader() {
      if (this.pswpElement.classList.contains(classes$d.customLoader) && this.options !== '' && this.options.mainClass) {
        this.pswpElement.setAttribute(attributes$4.dataOptionClasses, this.options.mainClass);
        let loaderElem = document.createElement('div');
        loaderElem.innerHTML = loaderHTML;
        loaderElem = loaderElem.firstChild;
        this.pswpElement.appendChild(loaderElem);
      } else {
        this.pswpElement.setAttribute(attributes$4.dataOptionClasses, '');
      }
    }

    loadPopup() {
      const PhotoSwipe = window.themePhotoswipe.PhotoSwipe.default;
      const PhotoSwipeUI = window.themePhotoswipe.PhotoSwipeUI.default;

      if (this.pswpElement.classList.contains(classes$d.customLoader)) {
        this.pswpElement.classList.remove(classes$d.customLoader);
      }

      this.pswpElement.classList.remove(classes$d.customOpen);

      this.popup = new PhotoSwipe(this.pswpElement, PhotoSwipeUI, this.items, this.options);
      this.popup.init();

      this.initVideo();

      this.thumbsActions();

      if (this.isVideo) {
        this.hideUnusedButtons();
      }

      setTimeout(() => {
        this.a11y.trapFocus(this.pswpElement, {
          elementToFocus: this.closeBtn,
        });
      }, 200);

      this.popup.listen('close', () => this.onClose());

      if (this.options && this.options.closeElClasses && this.options.closeElClasses.length) {
        this.options.closeElClasses.forEach((closeClass) => {
          const closeElement = this.pswpElement.querySelector(`.pswp__${closeClass}`);
          if (closeElement) {
            closeElement.addEventListener('keyup', this.keyupCloseEvent);
          }
        });
      }
    }

    initVideo() {
      const videoContainer = this.pswpElement.querySelector(selectors$k.popupCustomIframe);
      if (videoContainer) {
        const videoType = videoContainer.getAttribute(attributes$4.dataVideoType);
        this.isVideo = true;

        if (videoType == 'youtube') {
          new LoadVideoYT(videoContainer.parentElement);
        } else if (videoType == 'vimeo') {
          new LoadVideoVimeo(videoContainer.parentElement);
        }
      }
    }

    thumbsActions() {
      if (this.popupThumbsContainer && this.popupThumbsContainer.firstChild) {
        this.popupThumbsContainer.addEventListener('wheel', (e) => this.stopDisabledScroll(e));
        this.popupThumbsContainer.addEventListener('mousewheel', (e) => this.stopDisabledScroll(e));
        this.popupThumbsContainer.addEventListener('DOMMouseScroll', (e) => this.stopDisabledScroll(e));

        this.popupThumbs = this.pswpElement.querySelectorAll(`${selectors$k.popupThumbs} > *`);
        this.popupThumbs.forEach((element, i) => {
          element.addEventListener('click', (e) => {
            e.preventDefault();
            const lastCurrentElement = element.parentElement.querySelector(`.${classes$d.current}`);
            lastCurrentElement.classList.remove(classes$d.current);
            lastCurrentElement.setAttribute(attributes$4.ariaCurrent, false);
            element.classList.add(classes$d.current);
            element.setAttribute(attributes$4.ariaCurrent, true);
            this.popup.goTo(i);
          });
        });

        this.popup.listen('imageLoadComplete', () => this.setCurrentThumb());
        this.popup.listen('beforeChange', () => this.setCurrentThumb());
      }
    }

    hideUnusedButtons() {
      const buttons = this.pswpElement.querySelectorAll(selectors$k.popupButtons);
      if (buttons.length) {
        buttons.forEach((element) => {
          if (!element.classList.contains(classes$d.popupCloseButton)) {
            element.style.display = 'none';
          }
        });
      }
    }

    stopDisabledScroll(e) {
      e.stopPropagation();
    }

    keyupClose(e) {
      if (e.keyCode === window.theme.keyboardKeys.ENTER) {
        this.popup.close();
      }
    }

    onClose() {
      const popupIframe = this.pswpElement.querySelector(selectors$k.popupIframe);
      if (popupIframe) {
        popupIframe.parentNode.removeChild(popupIframe);
      }

      if (this.popupThumbsContainer && this.popupThumbsContainer.firstChild) {
        while (this.popupThumbsContainer.firstChild) this.popupThumbsContainer.removeChild(this.popupThumbsContainer.firstChild);
      }

      this.pswpElement.setAttribute(attributes$4.dataOptionClasses, '');
      const loaderElem = this.pswpElement.querySelector(`.${classes$d.loader}`);
      if (loaderElem) {
        this.pswpElement.removeChild(loaderElem);
      }

      if (this.options && this.options.closeElClasses && this.options.closeElClasses.length) {
        this.options.closeElClasses.forEach((closeClass) => {
          const closeElement = this.pswpElement.querySelector(`.pswp__${closeClass}`);
          if (closeElement) {
            closeElement.removeEventListener('keyup', this.keyupCloseEvent);
          }
        });
      }

      this.a11y.removeTrapFocus();

      if (window.accessibility.lastElement) {
        setTimeout(() => {
          window.accessibility.lastElement.focus();
        }, 200);
      }
    }

    setCurrentThumb() {
      const lastCurrentThumb = this.pswpElement.querySelector(`${selectors$k.popupThumbs} > .${classes$d.current}`);
      if (lastCurrentThumb) {
        lastCurrentThumb.classList.remove(classes$d.current);
        lastCurrentThumb.setAttribute(attributes$4.ariaCurrent, false);
      }

      if (!this.popupThumbs) return;
      const currentThumb = this.popupThumbs[this.popup.getCurrentIndex()];
      currentThumb.classList.add(classes$d.current);
      currentThumb.setAttribute(attributes$4.ariaCurrent, true);
      this.scrollThumbs(currentThumb);
    }

    scrollThumbs(currentThumb) {
      const thumbsContainerLeft = this.popupThumbsContainer.scrollLeft;
      const thumbsContainerWidth = this.popupThumbsContainer.offsetWidth;
      const thumbsContainerPos = thumbsContainerLeft + thumbsContainerWidth;
      const currentThumbLeft = currentThumb.offsetLeft;
      const currentThumbWidth = currentThumb.offsetWidth;
      const currentThumbPos = currentThumbLeft + currentThumbWidth;

      if (thumbsContainerPos <= currentThumbPos || thumbsContainerPos > currentThumbLeft) {
        const currentThumbMarginLeft = parseInt(window.getComputedStyle(currentThumb).marginLeft);
        this.popupThumbsContainer.scrollTo({
          top: 0,
          left: currentThumbLeft - currentThumbMarginLeft,
          behavior: 'smooth',
        });
      }
    }
  }

  const selectors$l = {
    zoomWrapper: '[data-zoom-wrapper]',
    dataImageSrc: 'data-image-src',
    dataImageWidth: 'data-image-width',
    dataImageHeight: 'data-image-height',
    dataImageAlt: 'data-image-alt',
    dataImageZoomEnable: 'data-image-zoom-enable',
    thumbs: '.pswp__thumbs',
    caption: '[data-zoom-caption]',
  };

  const classes$e = {
    variantSoldOut: 'variant--soldout',
    variantUnavailable: 'variant--unavailable',
    popupThumb: 'pswp__thumb',
    popupClass: 'pswp-zoom-gallery',
    popupClassNoThumbs: 'pswp-zoom-gallery--single',
    popupTitle: 'product__title',
    popupTitleNew: 'product__title pswp__title',
  };

  class Zoom {
    constructor(section) {
      this.container = section.container;
      this.zoomWrappers = this.container.querySelectorAll(selectors$l.zoomWrapper);
      this.thumbsContainer = document.querySelector(selectors$l.thumbs);
      this.zoomCaptionElem = this.container.querySelector(selectors$l.caption);
      this.zoomEnable = this.container.getAttribute(selectors$l.dataImageZoomEnable) === 'true';

      if (this.zoomEnable) {
        this.init();
      }
    }

    init() {
      if (this.zoomWrappers.length) {
        this.zoomWrappers.forEach((element, i) => {
          element.addEventListener('click', (e) => {
            e.preventDefault();

            this.createZoom(i);

            window.accessibility.lastElement = element;
          });

          element.addEventListener('keyup', (e) => {
            // On keypress Enter move the focus to the first focusable element in the related slide
            if (e.keyCode === window.theme.keyboardKeys.ENTER) {
              e.preventDefault();

              this.createZoom(i);

              window.accessibility.lastElement = element;
            }
          });
        });
      }
    }

    createZoom(indexImage) {
      let items = [];
      let counter = 0;
      let thumbs = '';
      this.zoomWrappers.forEach((elementImage) => {
        const imgSrc = elementImage.getAttribute(selectors$l.dataImageSrc);
        const imgAlt = elementImage.hasAttribute(selectors$l.dataImageAlt) ? elementImage.getAttribute(selectors$l.dataImageAlt) : '';

        counter += 1;

        items.push({
          src: imgSrc,
          w: parseInt(elementImage.getAttribute(selectors$l.dataImageWidth)),
          h: parseInt(elementImage.getAttribute(selectors$l.dataImageHeight)),
          msrc: imgSrc,
        });

        thumbs += `<a href="#" class="${classes$e.popupThumb}" style="background-image: url('${imgSrc}')" aria-label="${imgAlt}" aria-current="false"></a>`;

        if (this.zoomWrappers.length === counter) {
          const options = {
            history: false,
            focus: false,
            index: indexImage,
            mainClass: counter === 1 ? `${classes$e.popupClass} ${classes$e.popupClassNoThumbs}` : `${classes$e.popupClass}`,
            showHideOpacity: true,
            howAnimationDuration: 150,
            hideAnimationDuration: 250,
            closeOnScroll: false,
            closeOnVerticalDrag: false,
            captionEl: true,
            closeEl: true,
            closeElClasses: ['caption-close', 'title'],
            tapToClose: false,
            clickToCloseNonZoomable: false,
            maxSpreadZoom: 2,
            loop: true,
            spacing: 0,
            allowPanToNext: true,
            pinchToClose: false,
            addCaptionHTMLFn: (item, captionEl, isFake) => {
              this.zoomCaption(item, captionEl, isFake);
            },
            getThumbBoundsFn: () => {
              const imageLocation = this.zoomWrappers[indexImage];
              const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
              const rect = imageLocation.getBoundingClientRect();
              return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
            },
          };

          new LoadPhotoswipe(items, options);

          if (this.thumbsContainer && thumbs !== '') {
            this.thumbsContainer.innerHTML = thumbs;
          }
        }
      });
    }

    zoomCaption(item, captionEl) {
      let captionHtml = '';
      const targetContainer = captionEl.children[0];
      if (this.zoomCaptionElem) {
        captionHtml = this.zoomCaptionElem.innerHTML;

        if (this.zoomCaptionElem.closest(`.${classes$e.variantSoldOut}`)) {
          targetContainer.classList.add(classes$e.variantSoldOut);
        } else {
          targetContainer.classList.remove(classes$e.variantSoldOut);
        }

        if (this.zoomCaptionElem.closest(`.${classes$e.variantUnavailable}`)) {
          targetContainer.classList.add(classes$e.variantUnavailable);
        } else {
          targetContainer.classList.remove(classes$e.variantUnavailable);
        }
      }

      captionHtml = captionHtml.replaceAll(classes$e.popupTitle, classes$e.popupTitleNew);
      targetContainer.innerHTML = captionHtml;
      return false;
    }
  }

  const hosts = {
    html5: 'html5',
    youtube: 'youtube',
    vimeo: 'vimeo',
  };

  const selectors$m = {
    deferredMedia: '[data-deferred-media]',
    deferredMediaButton: '[data-deferred-media-button]',
    productMediaWrapper: '[data-product-single-media-wrapper]',
    productMediaSlider: '[data-product-single-media-slider]',
    mediaContainer: '[data-video]',
    mediaId: 'data-media-id',
    dataTallLayout: 'data-tall-layout',
  };

  const classes$f = {
    mediaHidden: 'media--hidden',
  };

  theme.mediaInstances = {};
  class Video {
    constructor(section) {
      this.section = section;
      this.container = section.container;
      this.id = section.id;
      this.tallLayout = this.container.getAttribute(selectors$m.dataTallLayout) === 'true';
      this.players = {};
      this.init();
    }

    init() {
      const mediaContainers = this.container.querySelectorAll(selectors$m.mediaContainer);

      mediaContainers.forEach((mediaContainer) => {
        const deferredMediaButton = mediaContainer.querySelector(selectors$m.deferredMediaButton);

        if (deferredMediaButton) {
          deferredMediaButton.addEventListener('click', this.loadContent.bind(this, mediaContainer));
        }
      });
    }

    loadContent(mediaContainer) {
      if (mediaContainer.querySelector(selectors$m.deferredMedia).getAttribute('loaded')) {
        return;
      }

      const content = document.createElement('div');
      content.appendChild(mediaContainer.querySelector('template').content.firstElementChild.cloneNode(true));
      const mediaId = mediaContainer.dataset.mediaId;
      const element = content.querySelector('video, iframe');
      const host = this.hostFromVideoElement(element);
      const deferredMedia = mediaContainer.querySelector(selectors$m.deferredMedia);
      deferredMedia.appendChild(element).focus();
      deferredMedia.setAttribute('loaded', true);

      this.players[mediaId] = {
        mediaId: mediaId,
        sectionId: this.id,
        container: mediaContainer,
        element: element,
        host: host,
        ready: () => this.createPlayer(mediaId),
      };

      const video = this.players[mediaId];

      switch (video.host) {
        case hosts.html5:
          this.loadVideo(video, hosts.html5);
          break;
        case hosts.vimeo:
          if (window.isVimeoAPILoaded) {
            this.loadVideo(video, hosts.vimeo);
          } else {
            loadScript({url: 'https://player.vimeo.com/api/player.js'}).then(() => this.loadVideo(video, hosts.vimeo));
          }
          break;
        case hosts.youtube:
          if (window.isYoutubeAPILoaded) {
            this.loadVideo(video, hosts.youtube);
          } else {
            loadScript({url: 'https://www.youtube.com/iframe_api'}).then(() => this.loadVideo(video, hosts.youtube));
          }
          break;
      }
    }

    hostFromVideoElement(video) {
      if (video.tagName === 'VIDEO') {
        return hosts.html5;
      }

      if (video.tagName === 'IFRAME') {
        if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(video.src)) {
          return hosts.youtube;
        } else if (video.src.includes('vimeo.com')) {
          return hosts.vimeo;
        }
      }

      return null;
    }

    loadVideo(video, host) {
      if (video.host === host) {
        video.ready();
      }
    }

    createPlayer(mediaId) {
      const video = this.players[mediaId];

      switch (video.host) {
        case hosts.html5:
          // Force video play on iOS
          video.element.play();
          video.element.addEventListener('play', () => this.pauseOtherMedia(mediaId));

          video.element.play(); // Force video play on iOS
          video.container.addEventListener('theme:media:hidden', (event) => this.onHidden(event));
          video.container.addEventListener('xrLaunch', (event) => this.onHidden(event));
          video.container.addEventListener('theme:media:visible', (event) => this.onVisible(event));

          if (this.tallLayout) {
            this.observeVideo(video, mediaId);
          }

          break;
        case hosts.vimeo:
          this.players[mediaId].player = new Vimeo.Player(video.element);
          this.players[mediaId].player.play(); // Force video play on iOS

          window.isVimeoAPILoaded = true;

          video.container.addEventListener('theme:media:hidden', (event) => this.onHidden(event));
          video.container.addEventListener('xrLaunch', (event) => this.onHidden(event));
          video.container.addEventListener('theme:media:visible', (event) => this.onVisible(event));

          if (this.tallLayout) {
            this.observeVideo(video, mediaId);
          }

          break;
        case hosts.youtube:
          if (video.host == hosts.youtube && video.player) {
            return;
          }

          YT.ready(() => {
            const videoId = video.container.dataset.videoId;

            this.players[mediaId].player = new YT.Player(video.element, {
              videoId: videoId,
              events: {
                onReady: (event) => event.target.playVideo(), // Force video play on iOS
              },
            });

            window.isYoutubeAPILoaded = true;

            video.container.addEventListener('theme:media:hidden', (event) => this.onHidden(event));
            video.container.addEventListener('xrLaunch', (event) => this.onHidden(event));
            video.container.addEventListener('theme:media:visible', (event) => this.onVisible(event));

            if (this.tallLayout) {
              this.observeVideo(video, mediaId);
            }
          });

          break;
      }
    }

    observeVideo(video, mediaId) {
      let observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            const outsideViewport = entry.intersectionRatio != 1;

            if (outsideViewport) {
              this.pauseVideo(video);
            } else {
              this.playVideo(video);
              this.pauseOtherMedia(mediaId);
            }
          });
        },
        {threshold: 1}
      );
      observer.observe(video.element);
    }

    playVideo(video) {
      if (video.player && video.player.playVideo) {
        video.player.playVideo();
      } else if (video.element && video.element.play) {
        video.element.play();
      } else if (video.player && video.player.play) {
        video.player.play();
      }
    }

    pauseVideo(video) {
      if (video.player && video.player.pauseVideo) {
        video.player.pauseVideo();
      } else if (video.element && video.element.pause) {
        video.element.pause();
      } else if (video.player && video.player.pause) {
        video.player.pause();
      }
    }

    onHidden(event) {
      if (typeof event.target.dataset.mediaId !== 'undefined') {
        this.pauseVideo(this.players[event.target.dataset.mediaId]);
      }
    }

    onVisible(event) {
      if (typeof event.target.dataset.mediaId !== 'undefined') {
        this.playVideo(this.players[event.target.dataset.mediaId]);
      }
    }

    pauseOtherMedia(mediaId) {
      const mediaIdString = `[${selectors$m.mediaId}="${mediaId}"]`;
      const otherMedia = document.querySelectorAll(`${selectors$m.productMediaWrapper}:not(${mediaIdString})`);

      document.querySelector(`${selectors$m.productMediaWrapper}${mediaIdString}`).classList.remove(classes$f.mediaHidden);

      if (otherMedia.length) {
        otherMedia.forEach((element) => {
          element.dispatchEvent(new CustomEvent('theme:media:hidden'));
          element.classList.add(classes$f.mediaHidden);
        });
      }
    }
  }

  theme.mediaInstances = {};

  const selectors$n = {
    videoPlayer: '[data-video]',
    modelViewer: '[data-model]',
    sliderEnabled: 'flickity-enabled',
  };

  const classes$g = {
    mediaHidden: 'media--hidden',
  };

  class Media {
    constructor(section) {
      this.section = section;
      this.id = section.id;
      this.container = section.container;
    }

    init() {
      this.detect3d();
      this.launch3d();

      new Video(this.section);
      new Zoom(this.section);
      new InitSlider(this.section);
    }

    detect3d() {
      const modelViewerElements = this.container.querySelectorAll(selectors$n.modelViewer);
      if (modelViewerElements.length) {
        modelViewerElements.forEach((element) => {
          theme.ProductModel.init(element, this.id);
        });
      }
    }

    launch3d() {
      document.addEventListener('shopify_xr_launch', () => {
        const currentMedia = this.container.querySelector(`${selectors$n.modelViewer}:not(.${classes$g.mediaHidden})`);
        currentMedia.dispatchEvent(new CustomEvent('xrLaunch'));
      });
    }
  }

  const selectors$o = {
    form: '[data-product-form]',
    optionPosition: 'data-option-position',
    optionInput: '[name^="options"], [data-popout-option]',
    selectOptionValue: 'data-value',
    popout: '[data-popout]',
  };

  const classes$h = {
    soldOut: 'sold-out',
    unavailable: 'unavailable',
  };

  /**
   * Variant Sellout Precrime Click Preview
   * I think of this like the precrime machine in Minority report.  It gives a preview
   * of every possible click action, given the current form state.  The logic is:
   *
   * for each clickable name=options[] variant selection element
   * find the value of the form if the element were clicked
   * lookup the variant with those value in the product json
   * clear the classes, add .unavailable if it's not found,
   * and add .sold-out if it is out of stock
   *
   * Caveat: we rely on the option position so we don't need
   * to keep a complex map of keys and values.
   */

  class SelloutVariants {
    constructor(section, productJSON) {
      this.container = section;
      this.productJSON = productJSON;
      this.formSelector = this.container.querySelector(selectors$o.form);
      this.form = this.formSelector && this.formSelector.tagName == 'FORM' ? this.formSelector : this.formSelector.querySelector('form');
      this.formData = new FormData(this.form);
      this.optionElements = this.container.querySelectorAll(selectors$o.optionInput);

      if (this.productJSON && this.form) {
        this.init();
      }
    }

    init() {
      this.update();
    }

    update() {
      this.getCurrentState();

      this.optionElements.forEach((el) => {
        const parent = el.closest(`[${selectors$o.optionPosition}]`);
        if (!parent) return;
        const val = el.value || el.getAttribute(selectors$o.selectOptionValue);
        const positionString = parent.getAttribute(selectors$o.optionPosition);
        // subtract one because option.position in liquid does not count form zero, but JS arrays do
        const position = parseInt(positionString, 10) - 1;
        const selectPopout = el.closest(selectors$o.popout);

        let newVals = [...this.selections];
        newVals[position] = val;

        const found = this.productJSON.variants.find((element) => {
          // only return true if every option matches our hypothetical selection
          let perfectMatch = true;
          for (let index = 0; index < newVals.length; index++) {
            if (element.options[index] !== newVals[index]) {
              perfectMatch = false;
            }
          }
          return perfectMatch;
        });

        el.classList.remove(classes$h.soldOut, classes$h.unavailable);

        if (selectPopout) {
          selectPopout.classList.remove(classes$h.soldOut, classes$h.unavailable);
        }

        if (typeof found === 'undefined') {
          el.classList.add(classes$h.unavailable);

          if (selectPopout) {
            selectPopout.classList.add(classes$h.unavailable);
          }
        } else if (found && found.available === false) {
          el.classList.add(classes$h.soldOut);

          if (selectPopout) {
            selectPopout.classList.add(classes$h.soldOut);
          }
        }
      });
    }

    getCurrentState() {
      this.formData = new FormData(this.form);
      this.selections = [];
      for (var value of this.formData.entries()) {
        if (value[0].includes('options[')) {
          // push the current state of the form, dont worry about the group name
          // we will be using the array position instead of the name to match values
          this.selections.push(value[1]);
        }
      }
    }
  }

  const selectors$p = {
    product: '[data-product]',
    productForm: '[data-product-form]',
    addToCart: '[data-add-to-cart]',
    addToCartText: '[data-add-to-cart-text]',
    comparePrice: '[data-compare-price]',
    comparePriceText: '[data-compare-text]',
    formWrapper: '[data-form-wrapper]',
    originalSelectorId: '[data-product-select]',
    priceWrapper: '[data-price-wrapper]',
    productSlideshow: '[data-product-slideshow]',
    productImage: '[data-product-image]',
    productJson: '[data-product-json]',
    productPrice: '[data-product-price]',
    unitPrice: '[data-product-unit-price]',
    unitBase: '[data-product-base]',
    unitWrapper: '[data-product-unit]',
    isPreOrder: '[data-product-preorder]',
    sliderEnabled: 'flickity-enabled',
    productSlide: '.product__slide',
    dataTallLayout: 'data-tall-layout',
    dataEnableHistoryState: 'data-enable-history-state',
    subPrices: '[data-subscription-watch-price]',
    subSelectors: '[data-subscription-selectors]',
    subsToggle: '[data-toggles-group]',
    subsChild: 'data-group-toggle',
    subDescription: '[data-plan-description]',
    priceOffWrap: '[data-price-off]',
    priceOffType: '[data-price-off-type]',
    priceOffAmount: '[data-price-off-amount]',
    dataImageId: 'data-image-id',
    idInput: '[name="id"]',
    remainingCount: '[data-remaining-count]',
    remainingMax: '[data-remaining-max]',
    remainingMaxAttr: 'data-remaining-max',
    remainingWrapper: '[data-remaining-wrapper]',
    remainingJSON: '[data-product-remaining-json]',
    optionValue: '[data-option-value]',
    optionPosition: 'data-option-position',
  };

  const classes$i = {
    hide: 'hide',
    variantSoldOut: 'variant--soldout',
    variantUnavailable: 'variant--unavailable',
    productPriceSale: 'product__price--sale',
    remainingLow: 'count-is-low',
    remainingIn: 'count-is-in',
    remainingOut: 'count-is-out',
    remainingUnavailable: 'count-is-unavailable',
  };

  class ProductAddForm {
    constructor(section, modalHolder = null) {
      this.section = section;
      this.container = modalHolder || section.container;
      this.tallLayout = this.container.getAttribute(selectors$p.dataTallLayout) === 'true';
      this.product = this.container.querySelector(selectors$p.product);
      this.productForm = this.container.querySelector(selectors$p.productForm);
      this.sellout = null;
      this.enable = false;

      if (this.product || modalHolder !== null) {
        this.enable = true;
      }

      // Stop parsing if we don't have the product
      if (!this.enable || !this.productForm) {
        return;
      }

      this.priceOffWrap = this.container.querySelector(selectors$p.priceOffWrap);
      this.priceOffAmount = this.container.querySelector(selectors$p.priceOffAmount);
      this.priceOffType = this.container.querySelector(selectors$p.priceOffType);
      this.planDecription = this.container.querySelector(selectors$p.subDescription);

      this.remainingWrapper = this.container.querySelector(selectors$p.remainingWrapper);
      if (this.remainingWrapper) {
        const remainingMaxWrap = this.container.querySelector(selectors$p.remainingMax);
        if (!remainingMaxWrap) return;
        this.remainingMaxInt = parseInt(remainingMaxWrap.getAttribute(selectors$p.remainingMaxAttr), 10);
        this.remainingCount = this.container.querySelector(selectors$p.remainingCount);
        this.remainingJSONWrapper = this.container.querySelector(selectors$p.remainingJSON);
        this.remainingJSON = null;
        if (this.remainingJSONWrapper && this.remainingJSONWrapper.innerHTML !== '') {
          this.remainingJSON = JSON.parse(this.remainingJSONWrapper.innerHTML);
        } else {
          console.warn('Missing product quantity JSON');
        }
      }

      this.enableHistoryState = this.container.getAttribute(selectors$p.dataEnableHistoryState) === 'true';
      this.hasUnitPricing = this.container.querySelector(selectors$p.unitWrapper);
      this.subSelectors = this.container.querySelector(selectors$p.subSelectors);
      this.subPrices = this.container.querySelector(selectors$p.subPrices);
      this.isPreOrder = this.container.querySelector(selectors$p.isPreOrder);

      const counter = new QuantityCounter(this.container);
      counter.init();

      this.init();
    }

    init() {
      let productJSON = null;
      const productElemJSON = this.container.querySelector(selectors$p.productJson);
      if (productElemJSON) {
        productJSON = productElemJSON.innerHTML;
      }
      if (productJSON) {
        this.productJSON = JSON.parse(productJSON);
        this.linkForm();
        this.sellout = new SelloutVariants(this.container, this.productJSON);
      } else {
        console.error('Missing product JSON');
      }
    }

    destroy() {
      this.productForm.destroy();
    }

    linkForm() {
      this.productForm = new ProductForm(this.productForm, this.productJSON, {
        onOptionChange: this.onOptionChange.bind(this),
        onPlanChange: this.onPlanChange.bind(this),
      });
      this.pushState(this.productForm.getFormState());
      this.subsToggleListeners();
    }

    onOptionChange(evt) {
      this.pushState(evt.dataset);
      this.updateProductImage(evt);
    }

    onPlanChange(evt) {
      if (this.subPrices) {
        this.pushState(evt.dataset);
      }
    }

    pushState(formState) {
      this.productState = this.setProductState(formState);
      this.updateAddToCartState(formState);
      this.updateProductPrices(formState);
      this.updateSaleText(formState);
      this.updateSubscriptionText(formState);
      this.updateRemaining(formState);
      this.fireHookEvent(formState);
      this.updateLegend(formState);
      this.sellout?.update(formState);
      if (this.enableHistoryState) {
        this.updateHistoryState(formState);
      }
    }

    updateAddToCartState(formState) {
      const variant = formState.variant;
      let addText = theme.strings.addToCart;
      const priceWrapper = this.container.querySelectorAll(selectors$p.priceWrapper);
      const addToCart = this.container.querySelectorAll(selectors$p.addToCart);
      const addToCartText = this.container.querySelectorAll(selectors$p.addToCartText);
      const formWrapper = this.container.querySelectorAll(selectors$p.formWrapper);

      if (this.isPreOrder) {
        addText = theme.strings.preOrder;
      }

      if (priceWrapper.length && variant) {
        priceWrapper.forEach((element) => {
          element.classList.remove(classes$i.hide);
        });
      }

      if (addToCart.length) {
        addToCart.forEach((element) => {
          if (variant) {
            if (variant.available) {
              element.disabled = false;
            } else {
              element.disabled = true;
            }
          } else {
            element.disabled = true;
          }
        });
      }

      if (addToCartText.length) {
        addToCartText.forEach((element) => {
          if (variant) {
            if (variant.available) {
              element.innerHTML = addText;
            } else {
              element.innerHTML = theme.strings.soldOut;
            }
          } else {
            element.innerHTML = theme.strings.unavailable;
          }
        });
      }

      if (formWrapper.length) {
        formWrapper.forEach((element) => {
          if (variant) {
            if (variant.available) {
              element.classList.remove(classes$i.variantSoldOut, classes$i.variantUnavailable);
            } else {
              element.classList.add(classes$i.variantSoldOut);
              element.classList.remove(classes$i.variantUnavailable);
            }
            const formSelect = element.querySelector(selectors$p.originalSelectorId);
            if (formSelect) {
              formSelect.value = variant.id;
            }
          } else {
            element.classList.add(classes$i.variantUnavailable);
            element.classList.remove(classes$i.variantSoldOut);
          }
        });
      }
    }

    updateHistoryState(formState) {
      const variant = formState.variant;
      const plan = formState.plan;
      const location = window.location.href;
      if (variant && location.includes('/product')) {
        const url = new window.URL(location);
        const params = url.searchParams;
        params.set('variant', variant.id);
        if (plan && plan.detail && plan.detail.id && this.productState.hasPlan) {
          params.set('selling_plan', plan.detail.id);
        } else {
          params.delete('selling_plan');
        }
        url.search = params.toString();
        const urlString = url.toString();
        window.history.replaceState({path: urlString}, '', urlString);
      }
    }

    updateRemaining(formState) {
      const variant = formState.variant;
      if (variant && this.remainingWrapper && this.remainingJSON && this.remainingCount) {
        const newQuantity = this.remainingJSON[variant.id];
        if (newQuantity && newQuantity <= this.remainingMaxInt && newQuantity > 0) {
          this.remainingWrapper.classList.remove(classes$i.remainingIn, classes$i.remainingOut, classes$i.remainingUnavailable);
          this.remainingWrapper.classList.add(classes$i.remainingLow);
          this.remainingCount.innerHTML = newQuantity;
        } else if (this.productState.soldOut) {
          this.remainingWrapper.classList.remove(classes$i.remainingLow, classes$i.remainingIn, classes$i.remainingUnavailable);
          this.remainingWrapper.classList.add(classes$i.remainingOut);
        } else if (this.productState.available) {
          this.remainingWrapper.classList.remove(classes$i.remainingLow, classes$i.remainingOut, classes$i.remainingUnavailable);
          this.remainingWrapper.classList.add(classes$i.remainingIn);
        }
      } else if (this.remainingWrapper) {
        this.remainingWrapper.classList.remove(classes$i.remainingIn, classes$i.remainingOut, classes$i.remainingLow);
        this.remainingWrapper.classList.add(classes$i.remainingUnavailable);
      }
    }

    getBaseUnit(variant) {
      return variant.unit_price_measurement.reference_value === 1
        ? variant.unit_price_measurement.reference_unit
        : variant.unit_price_measurement.reference_value + variant.unit_price_measurement.reference_unit;
    }

    subsToggleListeners() {
      const toggles = this.container.querySelectorAll(selectors$p.subsToggle);

      toggles.forEach((toggle) => {
        toggle.addEventListener(
          'change',
          function (e) {
            const val = e.target.value.toString();
            const selected = this.container.querySelector(`[${selectors$p.subsChild}="${val}"]`);
            const groups = this.container.querySelectorAll(`[${selectors$p.subsChild}]`);
            if (selected) {
              selected.classList.remove(classes$i.hide);
              const first = selected.querySelector(`[name="selling_plan"]`);
              first.checked = true;
              first.dispatchEvent(new Event('change'));
            }
            groups.forEach((group) => {
              if (group !== selected) {
                group.classList.add(classes$i.hide);
                const plans = group.querySelectorAll(`[name="selling_plan"]`);
                plans.forEach((plan) => {
                  plan.checked = false;
                  plan.dispatchEvent(new Event('change'));
                });
              }
            });
          }.bind(this)
        );
      });
    }

    updateSaleText(formState) {
      if (this.productState.planSale) {
        this.updateSaleTextSubscription(formState);
      } else if (this.productState.onSale) {
        this.updateSaleTextStandard(formState);
      } else if (this.priceOffWrap) {
        this.priceOffWrap.classList.add(classes$i.hide);
      }
    }

    updateSaleTextStandard(formState) {
      if (this.priceOffType) {
        this.priceOffType.innerHTML = window.theme.strings.sale || 'sale';
      }
      const variant = formState.variant;
      const discountFloat = (variant.compare_at_price - variant.price) / variant.compare_at_price;
      const discountInt = Math.floor(discountFloat * 100);
      this.priceOffAmount.innerHTML = `${discountInt}%`;
      this.priceOffWrap.classList.remove(classes$i.hide);
    }

    updateSubscriptionText(formState) {
      if (formState.plan && this.planDecription) {
        this.planDecription.innerHTML = formState.plan.detail.description;
        this.planDecription.classList.remove(classes$i.hide);
      } else if (this.planDecription) {
        this.planDecription.classList.add(classes$i.hide);
      }
    }

    updateSaleTextSubscription(formState) {
      if (this.priceOffType) {
        this.priceOffType.innerHTML = window.theme.strings.subscription || 'subscripton';
      }
      const adjustment = formState.plan.detail.price_adjustments[0];
      const discount = adjustment.value;
      if (adjustment && adjustment.value_type === 'percentage') {
        this.priceOffAmount.innerHTML = `${discount}%`;
      } else {
        this.priceOffAmount.innerHTML = themeCurrency.formatMoney(discount, theme.moneyFormat);
      }
      this.priceOffWrap.classList.remove(classes$i.hide);
    }

    updateProductPrices(formState) {
      console.log("formState ", formState);
      const variant = formState.variant;
      const plan = formState.plan;
      const priceWrappers = this.container.querySelectorAll(selectors$p.priceWrapper);

      priceWrappers.forEach((wrap) => {
        const comparePriceEl = wrap.querySelector(selectors$p.comparePrice);
        const productPriceEl = wrap.querySelector(selectors$p.productPrice);
        const comparePriceText = wrap.querySelector(selectors$p.comparePriceText);

        let comparePrice = '';
        let price = '';

        if (this.productState.available) {
          comparePrice = variant.compare_at_price;
          price = variant.price;
        }

        if (this.productState.hasPlan) {
          price = plan.allocation.price;
        }

        if (this.productState.planSale) {
          comparePrice = plan.allocation.compare_at_price;
          price = plan.allocation.price;
        }

        if (comparePriceEl) {
          if (this.productState.onSale || this.productState.planSale) {
            comparePriceEl.classList.remove(classes$i.hide);
            comparePriceText.classList.remove(classes$i.hide);
            productPriceEl.classList.add(classes$i.productPriceSale);
          } else {
            comparePriceEl.classList.add(classes$i.hide);
            comparePriceText.classList.add(classes$i.hide);
            productPriceEl.classList.remove(classes$i.productPriceSale);
          }
          comparePriceEl.innerHTML = themeCurrency.formatMoney(comparePrice, theme.moneyFormat);
        }

        productPriceEl.innerHTML = price === 0 ? window.theme.strings.free : themeCurrency.formatMoney(price, theme.moneyFormat);
      });

      if (this.hasUnitPricing) {
        this.updateProductUnits(formState);
      }
    }

    updateProductUnits(formState) {
      const variant = formState.variant;
      const plan = formState.plan;
      let unitPrice = null;

      if (variant && variant.unit_price) {
        unitPrice = variant.unit_price;
      }
      if (plan && plan.allocation && plan.allocation.unit_price) {
        unitPrice = plan.allocation.unit_price;
      }

      if (unitPrice) {
        const base = this.getBaseUnit(variant);
        const formattedPrice = themeCurrency.formatMoney(unitPrice, theme.moneyFormat);
        this.container.querySelector(selectors$p.unitPrice).innerHTML = formattedPrice;
        this.container.querySelector(selectors$p.unitBase).innerHTML = base;
        showElement(this.container.querySelector(selectors$p.unitWrapper));
      } else {
        hideElement(this.container.querySelector(selectors$p.unitWrapper));
      }
    }

    fireHookEvent(formState) {
      const variant = formState.variant;
      this.container.dispatchEvent(
        new CustomEvent('theme:variant:change', {
          detail: {
            variant: variant,
          },
          bubbles: true,
        })
      );
    }

    /**
     * Tracks aspects of the product state that are relevant to UI updates
     * @param {object} evt - variant change event
     * @return {object} productState - represents state of variant + plans
     *  productState.available - current variant and selling plan options result in valid offer
     *  productState.soldOut - variant is sold out
     *  productState.onSale - variant is on sale
     *  productState.showUnitPrice - variant has unit price
     *  productState.requiresPlan - all the product variants requires a selling plan
     *  productState.hasPlan - there is a valid selling plan
     *  productState.planSale - plan has a discount to show next to price
     *  productState.planPerDelivery - plan price does not equal per_delivery_price - a prepaid subscription
     */
    setProductState(dataset) {
      const variant = dataset.variant;
      const plan = dataset.plan;

      const productState = {
        available: true,
        soldOut: false,
        onSale: false,
        showUnitPrice: false,
        requiresPlan: false,
        hasPlan: false,
        planPerDelivery: false,
        planSale: false,
      };

      if (!variant || (variant.requires_selling_plan && !plan)) {
        productState.available = false;
      } else {
        if (!variant.available) {
          productState.soldOut = true;
        }

        if (variant.compare_at_price > variant.price) {
          productState.onSale = true;
        }

        if (variant.unit_price) {
          productState.showUnitPrice = true;
        }

        if (this.product && this.product.requires_selling_plan) {
          productState.requiresPlan = true;
        }

        if (plan && this.subPrices) {
          productState.hasPlan = true;
          if (plan.allocation.per_delivery_price !== plan.allocation.price) {
            productState.planPerDelivery = true;
          }
          if (variant.price > plan.allocation.price) {
            productState.planSale = true;
          }
        }
      }
      return productState;
    }

    updateProductImage(evt) {
      const variant = evt.dataset.variant;

      if (variant) {
        // Update variant image, if one is set
        if (variant.featured_media) {
          const newImg = this.container.querySelector(`${selectors$p.productImage}[${selectors$p.dataImageId}="${variant.featured_media.id}"]`);
          const newImageParent = newImg?.closest(selectors$p.productSlide);
          // If we have a mobile breakpoint or the tall layout is disabled,
          // just switch the slideshow.
          if (newImageParent) {
            const newImagePos = Array.from(newImageParent.parentElement.children).indexOf(newImageParent);
            const slider = this.container.querySelector(selectors$p.productSlideshow);

            if (slider && slider.classList.contains(selectors$p.sliderEnabled)) {
              FlickityFade.data(slider).select(newImagePos);
            }

            if (!theme.variables.bpSmall && this.tallLayout) {
              // We know its a tall layout, if it's sticky
              // scroll to the images
              // Scroll to/reorder image unless it's the first photo on load
              const newImgTop = newImg.getBoundingClientRect().top;

              if (newImagePos === 0 && newImgTop + window.scrollY > window.pageYOffset) return;

              // Scroll to variant image
              document.dispatchEvent(
                new CustomEvent('theme:tooltip:close', {
                  bubbles: false,
                  detail: {
                    hideTransition: false,
                  },
                })
              );

              scrollTo(newImgTop);
            }
          }
        }
      }
    }

    updateLegend(formState) {
      const variant = formState.variant;
      if (variant) {
        const optionValues = this.container.querySelectorAll(selectors$p.optionValue);
        if (optionValues.length) {
          optionValues.forEach((optionValue) => {
            const selectorWrapper = optionValue.closest(`[${selectors$p.optionPosition}]`);
            if (selectorWrapper) {
              const optionPosition = selectorWrapper.getAttribute(selectors$p.optionPosition);
              const optionIndex = parseInt(optionPosition, 10) - 1;
              const selectedOptionValue = variant.options[optionIndex];
              optionValue.innerHTML = selectedOptionValue;
            }
          });
        }
      }
    }
  }

  const productFormSection = {
    onLoad() {
      this.section = new ProductAddForm(this);
    },
  };

  const classes$j = {
    added: 'is-added',
    disabled: 'is-disabled',
    error: 'has-error',
    hide: 'is-hidden',
    loading: 'is-loading',
    open: 'is-open',
    overlayText: 'product-item--overlay-text',
    visible: 'is-visible',
  };

  const settings$2 = {
    delayError: 3000,
  };

  const selectors$q = {
    addButtonWrapper: '[data-add-action-wrapper]',
    apiContent: '[data-api-content]',
    buttonQuickAdd: '[data-quick-add-btn]',
    buttonQuickAddMobile: '[data-quick-add-btn-mobile]',
    cartDrawer: '[data-cart-drawer]',
    cartLineItems: '[data-line-items]',
    focusable: 'button, [href], select, textarea, [tabindex]:not([tabindex="-1"])',
    media: '[data-media-slide]',
    messageError: '[data-message-error]',
    modalContainer: '[data-product-upsell-container]',
    modalContent: '[data-product-upsell-ajax]',
    productGridItem: 'data-product-grid-item',
    productInformationHolder: '[data-product-information]',
    popoutWrapper: '[data-popout]',
    quickAddHolder: 'data-quick-add-holder',
    quickAddModal: '[data-quick-add-modal]',
    quickAddModalTemplate: '[data-quick-add-modal-template]',
    quickAddVariant: 'data-quick-add-variant',
    quickAddPropName: 'data-quick-prop-name',
    quickAddPropValue: 'data-quick-prop-value',
    swatch: '[data-swatch]',
    tooltip: '[data-tooltip]',
  };

  class QuickAddProduct extends HTMLElement {
    constructor() {
      super();

      this.container = this;
      this.quickAddHolder = this.container.querySelector(`[${selectors$q.quickAddHolder}]`);

      if (this.quickAddHolder) {
        this.html = document.documentElement;
        this.isCartItem = Boolean(this.quickAddHolder.closest(selectors$q.cartLineItems));
        this.modalTemplate = this.quickAddHolder.querySelector(selectors$q.quickAddModalTemplate);
        this.modal = document.querySelector(selectors$q.quickAddModal);
        this.modalID = this.quickAddHolder.getAttribute(selectors$q.quickAddHolder);
        this.modalButton = this.quickAddHolder.querySelector(`[data-popup-${this.modalID}]`);
        this.handle = this.modalButton ? this.modalButton.getAttribute(`data-popup-${this.modalID}`) : null;
        this.cartDrawer = document.querySelector(selectors$q.cartDrawer);
        this.buttonQuickAdd = this.quickAddHolder.querySelector(selectors$q.buttonQuickAdd);
        this.button = this.modalButton || this.buttonQuickAdd;
        this.buttonQuickAddMobile = this.quickAddHolder.querySelector(selectors$q.buttonQuickAddMobile);
        this.modalScrollEvent = () => throttle(this.modalScroll(), 50);
        this.oldModalID = null;
        this.modalContainer = null;
        this.modalContent = null;

        if (this.modalTemplate && !this.modal) {
          const modalTemplateInner = this.modalTemplate.innerHTML;
          const htmlObject = document.createElement('div');
          htmlObject.innerHTML = modalTemplateInner;
          const modalHtml = htmlObject.querySelector(selectors$q.quickAddModal);
          document.body.appendChild(modalHtml);
          this.modal = document.querySelector(selectors$q.quickAddModal);
        }

        this.init();
      }
    }

    init() {
      /**
       * Modal button works for multiple variants products
       */
      if (this.modalButton && this.modalTemplate) {
        this.modalButton.addEventListener('click', (e) => {
          e.preventDefault();

          this.modalButton.classList.add(classes$j.loading);
          if (this.modal) {
            this.oldModalID = this.modal.id;

            if (this.modalID) {
              this.modal.id = this.modalID;
            }
          }

          this.getProductHTML();
        });
      }

      /**
       * Quick add button works for single variant products
       */
      if (this.buttonQuickAdd && this.buttonQuickAdd.hasAttribute(selectors$q.quickAddVariant)) {
        this.buttonQuickAdd.addEventListener('click', (e) => {
          e.preventDefault();
          const variantID = this.buttonQuickAdd.getAttribute(selectors$q.quickAddVariant);

          if (variantID) {
            let props = null;
            const propName = this.buttonQuickAdd.hasAttribute(selectors$q.quickAddPropName) ? this.buttonQuickAdd.getAttribute(selectors$q.quickAddPropName) : '';
            const propValue = this.buttonQuickAdd.hasAttribute(selectors$q.quickAddPropValue) ? this.buttonQuickAdd.getAttribute(selectors$q.quickAddPropValue) : '';

            if (propName !== '' && propValue !== '') {
              props = {
                [propName]: propValue,
              };
            }
            this.addToCart(variantID, props);
          }
        });

        if (theme.settings.enableQuickAdd && this.buttonQuickAdd.closest(`[${selectors$q.quickAddHolder}]`)) {
          this.errorHandler();
        }
      }

      if (this.buttonQuickAddMobile) {
        this.buttonQuickAddMobile.addEventListener('click', () => {
          this.buttonQuickAddMobile.classList.add(classes$j.loading);
          this.button.dispatchEvent(new Event('click'));
        });
      }

      document.addEventListener('theme:product:added', () => {
        this.resetQuickAddButtons();

        if (this.modal && this.modal.classList.contains(classes$j.open)) {
          MicroModal.close(this.modalID);
        }
      });
    }

    addToCart(id, props = null) {
      const label = this.buttonQuickAdd.closest(selectors$q.quickAddHolder) ? this.buttonQuickAdd : null;
      let data = {
        id: id,
        quantity: 1,
      };

      if (props) {
        const propertiesObj = {
          properties: props,
        };
        data = {...data, ...propertiesObj};
      }

      document.dispatchEvent(
        new CustomEvent('theme:cart:add', {
          bubbles: true,
          detail: {
            element: this.quickAddHolder,
            label,
            button: this.buttonQuickAdd,
            data,
          },
        })
      );
    }

    /**
     * Handle error cart response
     */
    errorHandler() {
      this.quickAddHolder.addEventListener('theme:cart:error', (event) => {
        const holder = event.detail.holder;
        const parentProduct = holder.closest(`[${selectors$q.productGridItem}]`);
        if (!parentProduct) return;
        const errorMessageHolder = holder.querySelector(selectors$q.messageError);
        const hasOverlayText = parentProduct.classList.contains(classes$j.overlayText);
        const productInfo = parentProduct.querySelector(selectors$q.productInformationHolder);
        const button = holder.querySelector(selectors$q.buttonQuickAdd);
        const buttonQuickAddMobile = holder.querySelector(selectors$q.buttonQuickAddMobile);

        if (button) {
          button.classList.remove(classes$j.added, classes$j.loading);
          button.classList.add(classes$j.error);
        }

        if (buttonQuickAddMobile) {
          buttonQuickAddMobile.classList.remove(classes$j.added, classes$j.loading);
          buttonQuickAddMobile.classList.add(classes$j.error);
        }

        if (errorMessageHolder) {
          errorMessageHolder.innerText = event.detail.description;
        }

        if (hasOverlayText) {
          productInfo.classList.add(classes$j.hide);
        }

        setTimeout(() => {
          this.resetQuickAddButtons();

          if (hasOverlayText) {
            productInfo.classList.remove(classes$j.hide);
          }
        }, settings$2.delayError);
      });
    }

    /**
     * Reset buttons to default states
     */
    resetQuickAddButtons() {
      if (this.quickAddHolder) {
        this.quickAddHolder.classList.remove(classes$j.visible);
      }

      if (this.button) {
        this.buttonQuickAdd.classList.remove(classes$j.added, classes$j.error);
        this.buttonQuickAdd.disabled = false;
      }

      if (this.buttonQuickAddMobile) {
        this.buttonQuickAddMobile.classList.remove(classes$j.added, classes$j.error);
        this.buttonQuickAddMobile.disabled = false;
      }
    }

    getProductHTML() {
      if (this.modalContent && this.oldModalID === this.modalID) {
        this.modalCreate();
      } else {
        window
          .fetch(`/products/${this.handle}?section_id=api-product-upsell`)
          .then(this.upsellErrorsHandler)
          .then((response) => {
            return response.text();
          })
          .then((response) => {
            const fresh = document.createElement('div');
            fresh.innerHTML = response;
            this.modalContent = document.querySelector(selectors$q.modalContent);
            this.modalContent.innerHTML = fresh.querySelector(selectors$q.apiContent).innerHTML;

            this.reInitFormFunctionalities();
            this.modalCreate();
          });
      }
    }

    reInitFormFunctionalities() {
      new ProductAddForm(null, this.modal);

      const swatchElements = this.modalContent.querySelectorAll(selectors$q.swatch);
      if (swatchElements.length) {
        swatchElements.forEach((el) => {
          new Swatch(el);
        });
      }

      const wrappers = this.modalContent.querySelectorAll(selectors$q.popoutWrapper);
      if (wrappers.length) {
        wrappers.forEach((wrapper) => {
          new Popout(wrapper);
        });
      }

      const tooltips = this.modalContent.querySelectorAll(selectors$q.tooltip);
      if (tooltips.length) {
        tooltips.forEach((tooltip) => {
          new Tooltip(tooltip);
        });
      }

      wrapElements(this.modalContent);
    }

    modalCreate() {
      this.modalContainer = document.querySelector(selectors$q.modalContainer);

      MicroModal.show(this.modalID, {
        onShow: (modal, el, event) => {
          const firstFocus = modal.querySelector(selectors$q.focusable);
          const mediaObject = {
            container: modal,
            id: this.modalID,
          };

          theme.mediaInstances[this.id] = new Media(mediaObject);
          theme.mediaInstances[this.id].init();

          this.quickAddHolder.classList.add(classes$j.disabled);

          if (this.modalButton) {
            this.modalButton.classList.remove(classes$j.loading);
            this.modalButton.disabled = true;
          }

          if (this.buttonQuickAddMobile) {
            this.buttonQuickAddMobile.classList.remove(classes$j.loading);
            this.buttonQuickAddMobile.disabled = true;
          }

          setTimeout(() => {
            trapFocus(modal, {elementToFocus: firstFocus});
          });

          document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.modalContainer}));

          this.modalContainer.addEventListener('scroll', this.modalScrollEvent);
        },
        onClose: (modal, el, event) => {
          const allMedia = modal.querySelectorAll(selectors$q.media);

          allMedia.forEach((media) => {
            media.dispatchEvent(new CustomEvent('pause'));
          });

          this.quickAddHolder.classList.remove(classes$j.disabled);

          if (this.modalButton) {
            this.modalButton.disabled = false;
          }

          if (this.buttonQuickAddMobile) {
            this.buttonQuickAddMobile.disabled = false;
          }

          removeTrapFocus();
          el.focus();

          if (!this.cartDrawer || !this.cartDrawer.classList.contains(classes$j.open)) {
            document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
          }

          this.modalContainer.removeEventListener('scroll', this.modalScrollEvent);
        },
      });
    }

    modalScroll() {
      document.dispatchEvent(
        new CustomEvent('theme:tooltip:close', {
          bubbles: false,
          detail: {
            hideTransition: false,
          },
        })
      );
    }

    upsellErrorsHandler(response) {
      if (!response.ok) {
        return response.json().then(function (json) {
          const e = new FetchError({
            status: response.statusText,
            headers: response.headers,
            json: json,
          });
          throw e;
        });
      }
      return response;
    }
  }

  const selectors$r = {
    siblingsInnerHolder: '[data-sibling-inner]',
    siblingCount: '[data-sibling-count]',
    siblingHolder: '[data-sibling-holder]',
    siblingFieldset: '[data-sibling-fieldset]',
    siblingLink: '[data-sibling-link]',
    siblingLinkValue: 'data-sibling-link',
    siblingIndexValue: 'data-sibling-index',
    siblingImageValue: 'data-sibling-image',
    productInfo: '[data-product-information]',
    siblingAddedImage: 'data-sibling-added-image',
    dataSiblingDefaultImage: 'data-sibling-default-image',
    link: '[data-grid-link]',
    linkValue: 'data-grid-link',
    productGridItem: '[data-product-grid-item]',
    slide: '[data-grid-slide]',
    targetHolder: '[data-sibling-target-holder]',
    targetElement: 'data-sibling-target-element',
  };

  const classes$k = {
    visible: 'is-visible',
    fade: 'is-fade',
    stopEvents: 'no-events',
    active: 'is-active',
  };

  class SiblingSwatch {
    constructor(swatch, product) {
      this.swatch = swatch;
      this.product = product;
      this.swatchLinkValue = this.swatch.hasAttribute(selectors$r.siblingLinkValue) ? this.swatch.getAttribute(selectors$r.siblingLinkValue) : '';
      this.imageSrcValue = this.swatch.hasAttribute(selectors$r.siblingImageValue) ? this.swatch.getAttribute(selectors$r.siblingImageValue) : '';
      this.swatchIndex = this.swatch.hasAttribute(selectors$r.siblingIndexValue) ? this.swatch.getAttribute(selectors$r.siblingIndexValue) : '';
      this.productLinks = this.product.querySelectorAll(selectors$r.link);
      this.targetHolder = this.product.querySelectorAll(selectors$r.targetHolder);
      this.slideImage = this.product.querySelector(selectors$r.slide);
      this.linkDetailsExist = this.productLinks.length && this.swatchLinkValue !== '';
      this.imageDetailsExist = this.slideImage && this.imageSrcValue !== '';
      this.targetDetailsExist = this.targetHolder.length && this.swatchIndex !== '';
      this.newLink = null;
      this.imageSrc = null;
      this.loadedImage = null;
      this.preloaderImg = null;

      this.init();
    }

    init() {
      if (this.linkDetailsExist || this.imageDetailsExist || this.targetDetailsExist) {
        this.swatch.addEventListener('mouseenter', () => this.changeDetails());
      }

      if (this.linkDetailsExist || this.imageDetailsExist) {
        this.product.addEventListener('mouseleave', () => {
          if (this.imageDetailsExist && this.slideImage.hasAttribute(selectors$r.siblingAddedImage) && this.slideImage.getAttribute(selectors$r.siblingAddedImage) !== '') {
            this.product.classList.remove(classes$k.active);
            this.fadeImage(true);
          }

          if (this.linkDetailsExist) {
            this.newLink = this.productLinks[0].hasAttribute(selectors$r.linkValue) ? this.productLinks[0].getAttribute(selectors$r.linkValue) : this.swatchLinkValue;
            this.changeLink();
          }
        });
      }

      if (this.productLinks.length) {
        this.swatch.addEventListener('click', () => {
          this.productLinks[0].click();
        });
      }
    }

    changeDetails() {
      this.product.classList.add(classes$k.active);

      if (this.linkDetailsExist) {
        this.newLink = this.swatchLinkValue;
        this.changeLink();
      }

      if (this.imageDetailsExist) {
        this.changeImage();
      }

      if (this.targetDetailsExist) {
        this.changeText();
      }
    }

    changeLink() {
      // Add current sibling link to PGI link
      this.productLinks.forEach((productLink) => {
        productLink.href = this.newLink;
      });
    }

    changeText() {
      this.targetHolder.forEach((targetHolder) => {
        const targetElement = targetHolder.querySelector(`[${selectors$r.targetElement}="${this.swatchIndex}"]`);
        const activeTarget = targetHolder.querySelector(`[${selectors$r.targetElement}].${classes$k.active}`);

        if (activeTarget) {
          activeTarget.classList.remove(classes$k.active);
        }

        if (targetElement) {
          targetElement.classList.add(classes$k.active);
        }
      });
    }

    changeImage() {
      // Add current sibling swatch image to PGI image
      if (!this.loadedImage) {
        const ratio = window.devicePixelRatio || 1;
        const pixels = this.slideImage.offsetWidth * ratio;
        const widthRounded = Math.ceil(pixels / 180) * 180;
        this.imageSrc = themeImages.getSizedImageUrl(this.imageSrcValue, `${widthRounded}x`);
        this.preloaderImg = document.createElement('img');
        this.preloaderImg.src = this.imageSrc;

        this.preloaderImg.addEventListener('load', () => {
          this.loadedImage = this.imageSrc;

          this.fadeImage();
        });
      } else if (this.loadedImage && this.slideImage.hasAttribute(selectors$r.siblingAddedImage) && this.slideImage.getAttribute(selectors$r.siblingAddedImage) !== this.loadedImage) {
        this.fadeImage();
      }
    }

    fadeImage(defaultImage = false) {
      // Add fade effect when the sibling product images are added
      this.slideImage.classList.add(classes$k.fade);

      if (!this.slideImage.hasAttribute(selectors$r.dataSiblingDefaultImage)) {
        this.slideImage.setAttribute(selectors$r.dataSiblingDefaultImage, this.slideImage.style.backgroundImage);
      }

      const animationDuration = window.getComputedStyle(this.slideImage).getPropertyValue('animation-duration');
      const timeoutDelay = animationDuration ? parseFloat(animationDuration) * 1000 : 0;
      const imageUrl = defaultImage && this.slideImage.hasAttribute(selectors$r.dataSiblingDefaultImage) ? this.slideImage.getAttribute(selectors$r.dataSiblingDefaultImage) : `url("${this.loadedImage}")`;
      const imageAttr = defaultImage && this.slideImage.hasAttribute(selectors$r.dataSiblingDefaultImage) ? '' : this.loadedImage;

      // Change image in the middle of fade effect
      setTimeout(() => {
        this.slideImage.style.setProperty('background-image', imageUrl);
        this.slideImage.setAttribute(selectors$r.siblingAddedImage, imageAttr);
      }, timeoutDelay / 2);

      setTimeout(() => {
        this.slideImage.classList.remove(classes$k.fade);
      }, timeoutDelay);

      this.preloaderImg = null;
    }
  }

  class Sibling {
    constructor(holder, product) {
      this.holder = holder;
      this.product = product;
      this.siblingScrollbar = this.holder.querySelector(selectors$r.siblingsInnerHolder);
      this.siblingCount = this.holder.querySelector(selectors$r.siblingCount);
      this.siblingFieldset = this.holder.querySelector(selectors$r.siblingFieldset);
      this.siblingLinks = this.holder.querySelectorAll(selectors$r.siblingLink);
      this.productInfo = this.holder.closest(selectors$r.productInfo);
      this.productLink = this.holder.closest(selectors$r.link);
      this.hideSwatchesTimer = 0;

      this.init();
    }

    init() {
      this.initScrollbar();

      if (this.siblingCount && this.siblingFieldset && this.productInfo) {
        this.siblingCount.addEventListener('mouseenter', () => this.showSiblings());

        // Prevent color swatches blinking on mouse move
        this.productInfo.addEventListener('mouseleave', () => this.hideSiblings());
      }

      if (this.siblingLinks.length) {
        this.siblingLinks.forEach((siblingLink) => {
          new SiblingSwatch(siblingLink, this.product);
        });
      }
    }

    showSiblings() {
      if (this.hideSwatchesTimer) clearTimeout(this.hideSwatchesTimer);

      if (this.productLink) {
        this.productLink.classList.add(classes$k.stopEvents);
      }

      this.siblingFieldset.classList.add(classes$k.visible);
    }

    hideSiblings() {
      this.hideSwatchesTimer = setTimeout(() => {
        if (this.productLink) {
          this.productLink.classList.remove(classes$k.stopEvents);
        }

        this.siblingFieldset.classList.remove(classes$k.visible);
      }, 100);
    }

    initScrollbar() {
      if (this.siblingScrollbar) {
        new NativeScrollbar(this.siblingScrollbar);
      }
    }
  }

  class Siblings {
    constructor(section) {
      this.container = section.container;
      this.siblingHolders = this.container.querySelectorAll(`${selectors$r.productGridItem} ${selectors$r.siblingHolder}`);

      if (this.siblingHolders.length) {
        this.siblingHolders.forEach((siblingHolder) => {
          new Sibling(siblingHolder, siblingHolder.closest(selectors$r.productGridItem));
        });
      }
    }
  }

  const siblings = {
    onLoad() {
      new Siblings(this);
    },
  };

  const selectors$s = {
    rangeSlider: '[data-range-slider]',
    rangeDotLeft: '[data-range-left]',
    rangeDotRight: '[data-range-right]',
    rangeLine: '[data-range-line]',
    rangeHolder: '[data-range-holder]',
    dataMin: 'data-se-min',
    dataMax: 'data-se-max',
    dataMinValue: 'data-se-min-value',
    dataMaxValue: 'data-se-max-value',
    dataStep: 'data-se-step',
    dataFilterUpdate: 'data-range-filter-update',
    priceMin: '[data-field-price-min]',
    priceMax: '[data-field-price-max]',
  };

  const classes$l = {
    initialized: 'is-initialized',
  };

  class RangeSlider {
    constructor(section) {
      this.container = section.container;
      this.slider = section.querySelector(selectors$s.rangeSlider);
      this.resizeFilters = () => this.init();

      if (this.slider) {
        this.onMoveEvent = (event) => this.onMove(event);
        this.onStopEvent = (event) => this.onStop(event);
        this.onStartEvent = (event) => this.onStart(event);
        this.startX = 0;
        this.x = 0;

        // retrieve touch button
        this.touchLeft = this.slider.querySelector(selectors$s.rangeDotLeft);
        this.touchRight = this.slider.querySelector(selectors$s.rangeDotRight);
        this.lineSpan = this.slider.querySelector(selectors$s.rangeLine);

        // get some properties
        this.min = parseFloat(this.slider.getAttribute(selectors$s.dataMin));
        this.max = parseFloat(this.slider.getAttribute(selectors$s.dataMax));

        this.step = 0.0;

        // normalize flag
        this.normalizeFact = 26;

        this.init();
      }
    }

    init() {
      // retrieve default values
      let defaultMinValue = this.min;
      if (this.slider.hasAttribute(selectors$s.dataMinValue)) {
        defaultMinValue = parseFloat(this.slider.getAttribute(selectors$s.dataMinValue));
      }
      let defaultMaxValue = this.max;

      if (this.slider.hasAttribute(selectors$s.dataMaxValue)) {
        defaultMaxValue = parseFloat(this.slider.getAttribute(selectors$s.dataMaxValue));
      }

      // check values are correct
      if (defaultMinValue < this.min) {
        defaultMinValue = this.min;
      }

      if (defaultMaxValue > this.max) {
        defaultMaxValue = this.max;
      }

      if (defaultMinValue > defaultMaxValue) {
        defaultMinValue = defaultMaxValue;
      }

      if (this.slider.getAttribute(selectors$s.dataStep)) {
        this.step = Math.abs(parseFloat(this.slider.getAttribute(selectors$s.dataStep)));
      }

      // initial reset
      this.reset();
      document.addEventListener('theme:resize', this.resizeFilters);

      // usefull values, min, max, normalize fact is the width of both touch buttons
      this.maxX = this.slider.offsetWidth - this.touchRight.offsetWidth;
      this.selectedTouch = null;
      this.initialValue = this.lineSpan.offsetWidth - this.normalizeFact;

      // set defualt values
      this.setMinValue(defaultMinValue);
      this.setMaxValue(defaultMaxValue);

      // link events
      this.touchLeft.addEventListener('mousedown', this.onStartEvent);
      this.touchRight.addEventListener('mousedown', this.onStartEvent);
      this.touchLeft.addEventListener('touchstart', this.onStartEvent);
      this.touchRight.addEventListener('touchstart', this.onStartEvent);

      // initialize
      this.slider.classList.add(classes$l.initialized);
    }

    reset() {
      this.touchLeft.style.left = '0px';
      this.touchRight.style.left = this.slider.offsetWidth - this.touchLeft.offsetWidth + 'px';
      this.lineSpan.style.marginLeft = '0px';
      this.lineSpan.style.width = this.slider.offsetWidth - this.touchLeft.offsetWidth + 'px';
      this.startX = 0;
      this.x = 0;
    }

    setMinValue(minValue) {
      const ratio = (minValue - this.min) / (this.max - this.min);
      this.touchLeft.style.left = Math.ceil(ratio * (this.slider.offsetWidth - (this.touchLeft.offsetWidth + this.normalizeFact))) + 'px';
      this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + 'px';
      this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + 'px';
      this.slider.setAttribute(selectors$s.dataMinValue, minValue);
    }

    setMaxValue(maxValue) {
      const ratio = (maxValue - this.min) / (this.max - this.min);
      this.touchRight.style.left = Math.ceil(ratio * (this.slider.offsetWidth - (this.touchLeft.offsetWidth + this.normalizeFact)) + this.normalizeFact) + 'px';
      this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + 'px';
      this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + 'px';
      this.slider.setAttribute(selectors$s.dataMaxValue, maxValue);
    }

    onStart(event) {
      // Prevent default dragging of selected content
      event.preventDefault();
      let eventTouch = event;

      if (event.touches) {
        eventTouch = event.touches[0];
      }

      if (event.currentTarget === this.touchLeft) {
        this.x = this.touchLeft.offsetLeft;
      } else if (event.currentTarget === this.touchRight) {
        this.x = this.touchRight.offsetLeft;
      }

      this.startX = eventTouch.pageX - this.x;
      this.selectedTouch = event.currentTarget;
      document.addEventListener('mousemove', this.onMoveEvent);
      document.addEventListener('mouseup', this.onStopEvent);
      document.addEventListener('touchmove', this.onMoveEvent);
      document.addEventListener('touchend', this.onStopEvent);
    }

    onMove(event) {
      let eventTouch = event;

      if (event.touches) {
        eventTouch = event.touches[0];
      }

      this.x = eventTouch.pageX - this.startX;

      if (this.selectedTouch === this.touchLeft) {
        if (this.x > this.touchRight.offsetLeft - this.selectedTouch.offsetWidth + 10) {
          this.x = this.touchRight.offsetLeft - this.selectedTouch.offsetWidth + 10;
        } else if (this.x < 0) {
          this.x = 0;
        }

        this.selectedTouch.style.left = this.x + 'px';
      } else if (this.selectedTouch === this.touchRight) {
        if (this.x < this.touchLeft.offsetLeft + this.touchLeft.offsetWidth - 10) {
          this.x = this.touchLeft.offsetLeft + this.touchLeft.offsetWidth - 10;
        } else if (this.x > this.maxX) {
          this.x = this.maxX;
        }
        this.selectedTouch.style.left = this.x + 'px';
      }

      // update line span
      this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + 'px';
      this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + 'px';

      // write new value
      this.calculateValue();

      // call on change
      if (this.slider.getAttribute('on-change')) {
        const fn = new Function('min, max', this.slider.getAttribute('on-change'));
        fn(this.slider.getAttribute(selectors$s.dataMinValue), this.slider.getAttribute(selectors$s.dataMaxValue));
      }

      this.onChange(this.slider.getAttribute(selectors$s.dataMinValue), this.slider.getAttribute(selectors$s.dataMaxValue));
    }

    onStop(event) {
      document.removeEventListener('mousemove', this.onMoveEvent);
      document.removeEventListener('mouseup', this.onStopEvent);
      document.removeEventListener('touchmove', this.onMoveEvent);
      document.removeEventListener('touchend', this.onStopEvent);

      this.selectedTouch = null;

      // write new value
      this.calculateValue();

      // call did changed
      this.onChanged(this.slider.getAttribute(selectors$s.dataMinValue), this.slider.getAttribute(selectors$s.dataMaxValue));
    }

    onChange(min, max) {
      const rangeHolder = this.slider.closest(selectors$s.rangeHolder);
      if (rangeHolder) {
        const priceMin = rangeHolder.querySelector(selectors$s.priceMin);
        const priceMax = rangeHolder.querySelector(selectors$s.priceMax);

        if (priceMin && priceMax) {
          priceMin.value = min;
          priceMax.value = max;
        }
      }
    }

    onChanged(min, max) {
      if (this.slider.hasAttribute(selectors$s.dataFilterUpdate)) {
        this.slider.dispatchEvent(new CustomEvent('theme:range:update', {bubbles: true}));
      }
    }

    calculateValue() {
      const newValue = (this.lineSpan.offsetWidth - this.normalizeFact) / this.initialValue;
      let minValue = this.lineSpan.offsetLeft / this.initialValue;
      let maxValue = minValue + newValue;

      minValue = minValue * (this.max - this.min) + this.min;
      maxValue = maxValue * (this.max - this.min) + this.min;

      if (this.step !== 0.0) {
        let multi = Math.floor(minValue / this.step);
        minValue = this.step * multi;

        multi = Math.floor(maxValue / this.step);
        maxValue = this.step * multi;
      }

      if (this.selectedTouch === this.touchLeft) {
        this.slider.setAttribute(selectors$s.dataMinValue, minValue);
      }

      if (this.selectedTouch === this.touchRight) {
        this.slider.setAttribute(selectors$s.dataMaxValue, maxValue);
      }
    }

    onUnload() {
      if (this.resizeFilters) {
        document.removeEventListener('theme:resize', this.resizeFilters);
      }
    }
  }

  const selectors$t = {
    collectionSidebar: '[data-collection-sidebar]',
    form: '[data-collection-filters-form]',
    input: 'input',
    select: 'select',
    label: 'label',
    textarea: 'textarea',
    priceMin: '[data-field-price-min]',
    priceMax: '[data-field-price-max]',
    priceMinValue: 'data-field-price-min',
    priceMaxValue: 'data-field-price-max',
    rangeMin: '[data-se-min-value]',
    rangeMax: '[data-se-max-value]',
    rangeMinValue: 'data-se-min-value',
    rangeMaxValue: 'data-se-max-value',
    rangeMinDefault: 'data-se-min',
    rangeMaxDefault: 'data-se-max',
    productsContainer: '[data-products-grid]',
    product: '[data-product-grid-item]',
    filterUpdateUrlButton: '[data-filter-update-url]',
    dataActiveFilters: '[data-active-filters]',
    dataActiveFiltersCount: 'data-active-filters-count',
    dataSort: 'data-sort-enabled',
    collectionNav: '[data-collection-nav]',
  };

  const classes$m = {
    hidden: 'hidden',
    loading: 'is-loading',
  };

  let sections$7 = {};

  class FiltersForm {
    constructor(section) {
      this.section = section;
      this.container = this.section.container;
      this.sidebar = this.container.querySelector(selectors$t.collectionSidebar);
      this.form = this.container.querySelector(selectors$t.form);
      this.sort = this.container.querySelector(`[${selectors$t.dataSort}]`);
      this.productsContainer = this.container.querySelector(selectors$t.productsContainer);
      this.collectionNav = this.container.querySelector(selectors$t.collectionNav);
      this.init();
    }

    init() {
      if (this.form) {
        this.initRangeSlider();

        this.sidebar.addEventListener(
          'input',
          debounce((e) => {
            const type = e.type;
            const target = e.target;

            if (type === selectors$t.input || type === selectors$t.select || type === selectors$t.label || type === selectors$t.textarea) {
              if (this.form && typeof this.form.submit === 'function') {
                const priceMin = this.form.querySelector(selectors$t.priceMin);
                const priceMax = this.form.querySelector(selectors$t.priceMax);
                if (priceMin && priceMax) {
                  if (target.hasAttribute(selectors$t.priceMinValue) && !priceMax.value) {
                    priceMax.value = priceMax.placeholder;
                  } else if (target.hasAttribute(selectors$t.priceMaxValue) && !priceMin.value) {
                    priceMin.value = priceMin.placeholder;
                  }
                }

                this.submitForm(e);
              }
            }
          }, 500)
        );

        this.sidebar.addEventListener('theme:range:update', (e) => this.updateRange(e));
      }

      if (this.sidebar) {
        this.sidebar.addEventListener('click', (e) => this.filterUpdateFromUrl(e));
      }

      if (this.productsContainer) {
        this.productsContainer.addEventListener('click', (e) => this.filterUpdateFromUrl(e));
      }

      if (this.sort) {
        this.container.addEventListener('theme:filter:update', (e) => this.submitForm(e));
      }

      if (this.sidebar || this.sort) {
        window.addEventListener('popstate', (e) => this.submitForm(e));
      }
    }

    initRangeSlider() {
      new RangeSlider(this.form);
    }

    filterUpdateFromUrl(e) {
      const target = e.target;
      if (target.matches(selectors$t.filterUpdateUrlButton) || (target.closest(selectors$t.filterUpdateUrlButton) && target)) {
        e.preventDefault();
        const button = target.matches(selectors$t.filterUpdateUrlButton) ? target : target.closest(selectors$t.filterUpdateUrlButton);
        this.submitForm(e, button.getAttribute('href'));
      }
    }

    submitForm(e, replaceHref = '') {
      this.sort = this.container.querySelector(`[${selectors$t.dataSort}]`);
      const sortValue = this.sort ? this.sort.getAttribute(selectors$t.dataSort) : '';
      if (!e || (e && e.type !== 'popstate')) {
        if (replaceHref === '') {
          const url = new window.URL(window.location.href);
          let filterUrl = url.searchParams;
          const filterUrlEntries = filterUrl;
          const filterUrlParams = Object.fromEntries(filterUrlEntries);
          const filterUrlRemoveString = filterUrl.toString();

          if (filterUrlRemoveString.includes('filter.') || filterUrlRemoveString.includes('page=')) {
            for (const key in filterUrlParams) {
              if (key.includes('filter.') || key === 'page') {
                filterUrl.delete(key);
              }
            }
          }

          if (this.form) {
            const formData = new FormData(this.form);
            const formParams = new URLSearchParams(formData);
            const rangeMin = this.form.querySelector(selectors$t.rangeMin);
            const rangeMax = this.form.querySelector(selectors$t.rangeMax);
            const rangeMinDefaultValue = rangeMin && rangeMin.hasAttribute(selectors$t.rangeMinDefault) ? rangeMin.getAttribute(selectors$t.rangeMinDefault) : '';
            const rangeMaxDefaultValue = rangeMax && rangeMax.hasAttribute(selectors$t.rangeMaxDefault) ? rangeMax.getAttribute(selectors$t.rangeMaxDefault) : '';
            let priceFilterDefaultCounter = 0;

            for (let [key, val] of formParams.entries()) {
              if (key.includes('filter.') && val) {
                filterUrl.append(key, val);

                if ((val === rangeMinDefaultValue && key === 'filter.v.price.gte') || (val === rangeMaxDefaultValue && key === 'filter.v.price.lte')) {
                  priceFilterDefaultCounter += 1;
                }
              }
            }

            if (priceFilterDefaultCounter === 2) {
              filterUrl.delete('filter.v.price.gte');
              filterUrl.delete('filter.v.price.lte');
            }
          }

          if (sortValue || (e && e.detail && e.detail.href)) {
            const sortString = sortValue ? sortValue : e.detail.href;
            filterUrl.set('sort_by', sortString);
          }

          const filterUrlString = filterUrl.toString();
          const filterNewParams = filterUrlString ? `?${filterUrlString}` : location.pathname;
          window.history.pushState(null, '', filterNewParams);
        } else {
          window.history.pushState(null, '', replaceHref);
        }
      } else if (this.sort) {
        this.sort.dispatchEvent(new CustomEvent('theme:filter:sort', {bubbles: false}));
      }

      if (this.productsContainer) {
        this.productsContainer.classList.add(classes$m.loading);
        fetch(`${window.location.pathname}${window.location.search}`)
          .then((response) => response.text())
          .then((data) => {
            this.productsContainer.innerHTML = new DOMParser().parseFromString(data, 'text/html').querySelector(selectors$t.productsContainer).innerHTML;

            if (this.sidebar) {
              this.sidebar.innerHTML = new DOMParser().parseFromString(data, 'text/html').querySelector(selectors$t.collectionSidebar).innerHTML;

              const activeFiltersCountContainer = this.sidebar.querySelector(`[${selectors$t.dataActiveFiltersCount}]`);
              const activeFiltersContainer = this.container.querySelector(selectors$t.dataActiveFilters);
              if (activeFiltersCountContainer && activeFiltersContainer) {
                const activeFiltersCount = parseInt(activeFiltersCountContainer.getAttribute(selectors$t.dataActiveFiltersCount));
                activeFiltersContainer.textContent = activeFiltersCount;
                activeFiltersContainer.classList.toggle(classes$m.hidden, activeFiltersCount < 1);
              }
            }

            if (this.form) {
              this.form = this.container.querySelector(selectors$t.form);

              // Init Range Slider
              this.initRangeSlider();
            }

            // Init Collection
            const collectionClass = new Collection(this.section);
            collectionClass.onUnload(false);

            // Init Grid Swatches
            makeGridSwatches(this.section);

            // Init Siblings
            new Siblings(this.section);

            // Init Tooltips
            document.dispatchEvent(
              new CustomEvent('theme:tooltip:close', {
                bubbles: false,
                detail: {
                  hideTransition: false,
                },
              })
            );

            if (this.collectionNav) {
              scrollTo(this.collectionNav.getBoundingClientRect().top);
            }

            setTimeout(() => {
              this.productsContainer.classList.remove(classes$m.loading);
            }, 500);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    updateRange(e) {
      if (this.form && typeof this.form.submit === 'function') {
        const rangeMin = this.form.querySelector(selectors$t.rangeMin);
        const rangeMax = this.form.querySelector(selectors$t.rangeMax);
        const priceMin = this.form.querySelector(selectors$t.priceMin);
        const priceMax = this.form.querySelector(selectors$t.priceMax);
        const checkElements = rangeMin && rangeMax && priceMin && priceMax;

        if (checkElements && rangeMin.hasAttribute(selectors$t.rangeMinValue) && rangeMax.hasAttribute(selectors$t.rangeMaxValue)) {
          const priceMinValue = parseInt(priceMin.placeholder);
          const priceMaxValue = parseInt(priceMax.placeholder);
          const rangeMinValue = parseInt(rangeMin.getAttribute(selectors$t.rangeMinValue));
          const rangeMaxValue = parseInt(rangeMax.getAttribute(selectors$t.rangeMaxValue));

          if (priceMinValue !== rangeMinValue || priceMaxValue !== rangeMaxValue) {
            priceMin.value = rangeMinValue;
            priceMax.value = rangeMaxValue;

            this.submitForm(e);
          }
        }
      }
    }

    unload() {
      if (this.form) {
        document.removeEventListener('theme:resize', this.resizeEvent);
      }
    }
  }

  const collectionFiltersForm = {
    onLoad() {
      sections$7[this.id] = new FiltersForm(this);
    },
    onUnload: function () {
      if (sections$7[this.id] && typeof sections$7[this.id].unload === 'function') {
        sections$7[this.id].unload();
      }
    },
  };

  const selectors$u = {
    dataSort: 'data-sort-enabled',
    sortLinks: '[data-sort-link]',
    sortValue: 'data-value',
    sortButton: '[data-popout-toggle]',
    sortButtonText: '[data-sort-button-text]',
    collectionSidebarHeading: '[data-collection-sidebar-heading]',
    collectionSidebar: '[data-collection-sidebar]',
    collectionSidebarSlider: '[data-collection-sidebar-slider]',
    collectionSidebarSlideOut: '[data-collection-sidebar-slide-out]',
    collectionSidebarCloseButton: '[data-collection-sidebar-close]',
    showMoreOptions: '[data-show-more]',
    groupTagsButton: '[data-aria-toggle]',
    collectionNav: '[data-collection-nav]',
    linkAdd: '[data-link-add]',
    linkRemove: '[data-link-remove]',
    linkHidden: '[data-link-hidden]',
    underlay: '[data-drawer-underlay]',
    swatch: 'data-swatch',
  };

  const classes$n = {
    expanded: 'expanded',
    expanding: 'expanding',
    noMobileAnimation: 'no-mobile-animation',
    hidden: 'is-hidden',
    active: 'is-active',
    sortActive: 'popout-list__item--current',
    sortPopoutActive: 'popout--active',
    focused: 'is-focused',
  };

  let sections$8 = {};
  class Collection {
    constructor(section) {
      this.container = section.container;
      this.sort = this.container.querySelector(`[${selectors$u.dataSort}]`);
      this.sortLinks = this.container.querySelectorAll(selectors$u.sortLinks);
      this.collectionSidebar = this.container.querySelector(selectors$u.collectionSidebar);
      this.collectionSidebarCloseButtons = this.container.querySelectorAll(selectors$u.collectionSidebarCloseButton);
      this.groupTagsButton = this.container.querySelector(selectors$u.groupTagsButton);
      this.collectionNav = this.container.querySelector(selectors$u.collectionNav);
      this.showMoreOptions = this.container.querySelectorAll(selectors$u.showMoreOptions);
      this.collectionSidebarHeading = this.container.querySelectorAll(selectors$u.collectionSidebarHeading);
      this.underlay = this.container.querySelector(selectors$u.underlay);
      this.swatches = this.container.querySelectorAll(`[${selectors$u.swatch}]`);
      this.accessibility = a11y;

      this.groupTagsButtonClickEvent = (evt) => this.groupTagsButtonClick(evt);
      this.collectionSidebarCloseEvent = (evt) => this.collectionSidebarClose(evt);
      this.collectionSidebarScrollEvent = () => this.collectionSidebarScroll();
      this.onClickEvent = (e) => this.onClick(e);
      this.onSortCheckEvent = (e) => this.onSortCheck(e);
      this.sidebarResizeEvent = () => this.toggleSidebarSlider();

      this.init();
    }

    init() {
      if (this.sort) {
        this.initSort();
      }

      if (this.groupTagsButton !== null) {
        this.toggleSidebarSlider();
        document.addEventListener('theme:resize', this.sidebarResizeEvent);

        this.groupTagsButton.addEventListener('click', this.groupTagsButtonClickEvent);

        // Prevent filters closing animation on page load
        setTimeout(() => {
          this.collectionSidebar.classList.remove(classes$n.noMobileAnimation);
        }, 1000);
      }

      if (this.collectionSidebarCloseButtons.length) {
        this.collectionSidebarCloseButtons.forEach(button => {
          button.addEventListener('click', this.collectionSidebarCloseEvent);
        });
      }

      // Hide filters sidebar on ESC keypress
      this.container.addEventListener(
        'keyup',
        function (evt) {
          if (evt.which !== window.theme.keyboardKeys.ESCAPE) {
            return;
          }
          this.hideSidebar();
        }.bind(this)
      );

      // Hide filters sidebar on underlay click
      if (this.underlay) {
        this.underlay.addEventListener('click', this.collectionSidebarCloseEvent);
      }

      // Show more options from the group
      if (this.showMoreOptions) {
        this.showMoreOptions.forEach((element) => {
          element.addEventListener('click', (event) => {
            event.preventDefault();

            element.parentElement.classList.add(classes$n.hidden);

            element.parentElement.previousElementSibling.querySelectorAll(selectors$u.linkHidden).forEach((link, index) => {
              link.classList.remove(classes$n.hidden);
              if (index === 0) {
                window.accessibility.lastFocused = link;
              }
            });

            const collectionSidebarSlideOut = this.container.querySelector(selectors$u.collectionSidebarSlideOut);
            if (collectionSidebarSlideOut) {
              this.accessibility.removeTrapFocus();
              this.accessibility.trapFocus(this.collectionSidebar, {
                elementToFocus: window.accessibility.lastFocused,
              });
            }
          });
        });
      }

      // Filter accordions events
      if (this.collectionSidebarHeading) {
        this.collectionSidebarHeading.forEach((element) => {
          element.addEventListener('click', (event) => this.collectionAccordion(event));

          element.addEventListener('keyup', (event) => {
            if ((event.which === window.theme.keyboardKeys.SPACE || event.which === window.theme.keyboardKeys.ENTER) && document.body.classList.contains(classes$n.focused)) {
              window.accessibility.lastFocused = event.currentTarget;
              this.collectionAccordion(event);
            }
          });
        });
      }

      // Init Swatches
      if (this.swatches) {
        this.swatches.forEach((swatch) => {
          new Swatch(swatch);
        });
      }

      this.showSidebarCallback(true);
    }

    collectionAccordion(event) {
      event.preventDefault();
      const currentTarget = event.currentTarget;
      const duration = 500;

      currentTarget.classList.toggle(classes$n.active);

      slideToggle(currentTarget.nextElementSibling, duration);

      if (currentTarget.nextElementSibling.nextElementSibling) {
        slideToggle(currentTarget.nextElementSibling.nextElementSibling, duration);
      }

      const collectionSidebarSlideOut = this.container.querySelector(selectors$u.collectionSidebarSlideOut);
      if (collectionSidebarSlideOut) {
        setTimeout(() => {
          this.accessibility.removeTrapFocus();
          this.accessibility.trapFocus(this.collectionSidebar);
          this.accessibility.trapFocus(this.collectionSidebar, {
            elementToFocus: window.accessibility.lastFocused,
          });
        }, duration);
      }
    }

    collectionSidebarScroll() {
      document.dispatchEvent(
        new CustomEvent('theme:tooltip:close', {
          bubbles: false,
          detail: {
            hideTransition: false,
          },
        })
      );
    }

    sortActions(link, submitForm = true) {
      const sort = link ? link.getAttribute(selectors$u.sortValue) : '';
      this.sort.setAttribute(selectors$u.dataSort, sort);

      const sortButtonText = this.sort.querySelector(selectors$u.sortButtonText);
      const sortActive = this.sort.querySelector(`.${classes$n.sortActive}`);
      if (sortButtonText) {
        const linkText = link ? link.textContent.trim() : '';
        sortButtonText.textContent = linkText;
      }
      if (sortActive) {
        sortActive.classList.remove(classes$n.sortActive);
      }
      this.sort.classList.toggle(classes$n.sortPopoutActive, link);

      if (link) {
        link.parentElement.classList.add(classes$n.sortActive);

        if (submitForm) {
          link.dispatchEvent(
            new CustomEvent('theme:filter:update', {
              bubbles: true,
              detail: {
                href: sort,
              },
            })
          );
        }
      }
    }

    onClick(e) {
      e.preventDefault();
      const sortButton = this.sort.querySelector(selectors$u.sortButton);
      if (sortButton) {
        sortButton.dispatchEvent(new Event('click'));
      }
      this.sortActions(e.currentTarget);
    }

    onSortCheck(e) {
      let link = null;
      if (window.location.search.includes('sort_by')) {
        const url = new window.URL(window.location.href);
        const urlParams = url.searchParams;

        for (const [key, val] of urlParams.entries()) {
          const linkSort = this.sort.querySelector(`[${selectors$u.sortValue}="${val}"]`);
          if (key.includes('sort_by') && linkSort) {
            link = linkSort;
            break;
          }
        }
      }

      this.sortActions(link, false);
    }

    initSort() {
      this.sortLinks.forEach((link) => {
        link.addEventListener('click', this.onClickEvent);
      });
      this.sort.addEventListener('theme:filter:sort', this.onSortCheckEvent);
    }

    showSidebarCallback(onLoad = false) {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const collectionSidebarSlider = this.container.querySelector(selectors$u.collectionSidebarSlider);
      const collectionSidebarSlideOut = this.container.querySelector(selectors$u.collectionSidebarSlideOut);
      const collectionSidebarScrollable = collectionSidebarSlider || collectionSidebarSlideOut;

      if (!onLoad) {
        if (collectionSidebarSlideOut === null) {
          if (windowWidth < theme.sizes.small) {
            const scrollTopPosition = this.collectionNav ? this.collectionNav.getBoundingClientRect().top : this.groupTagsButton.getBoundingClientRect().top;
            scrollTo(scrollTopPosition);
          } else {
            this.accessibility.removeTrapFocus();
            document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
          }
        }

        if (windowWidth < theme.sizes.small || collectionSidebarSlideOut !== null) {
          if (collectionSidebarSlideOut) {
            this.accessibility.trapFocus(this.collectionSidebar, {
              elementToFocus: this.collectionSidebar.querySelector(selectors$u.collectionSidebarCloseButton),
            });
          }
          document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: collectionSidebarScrollable}));
        }
      }

      if (collectionSidebarScrollable) {
        collectionSidebarScrollable.addEventListener('scroll', this.collectionSidebarScrollEvent);
      }
    }

    hideSidebar() {
      const collectionSidebarSlider = this.container.querySelector(selectors$u.collectionSidebarSlider);
      const collectionSidebarSlideOut = this.container.querySelector(selectors$u.collectionSidebarSlideOut);
      const collectionSidebarScrollable = collectionSidebarSlider || collectionSidebarSlideOut;

      this.groupTagsButton.setAttribute('aria-expanded', 'false');
      this.collectionSidebar.classList.add(classes$n.expanding);
      this.collectionSidebar.classList.remove(classes$n.expanded);

      if (collectionSidebarScrollable) {
        collectionSidebarScrollable.removeEventListener('scroll', this.collectionSidebarScrollEvent);
      }

      if (collectionSidebarSlideOut) {
        this.accessibility.removeTrapFocus();
      }

      setTimeout(() => {
        this.collectionSidebar.classList.remove(classes$n.expanding);
      }, 500);
      document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
    }

    toggleSidebarSlider() {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      if (windowWidth < theme.sizes.small) {
        this.hideSidebar();
      } else if (this.collectionSidebar.classList.contains(classes$n.expanded)) {
        this.showSidebarCallback();
      }
    }

    collectionSidebarClose(evt) {
      evt.preventDefault();
      this.hideSidebar();
      if (document.body.classList.contains(classes$n.focused) && this.groupTagsButton) {
        this.groupTagsButton.focus();
      }
    }

    groupTagsButtonClick() {
      if (this.collectionSidebar.classList.contains(classes$n.expanded)) {
        this.showSidebarCallback();
      } else {
        document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
      }
    }

    onUnload(flag = true) {
      if (this.groupTagsButton !== null) {
        document.removeEventListener('theme:resize', this.sidebarResizeEvent);
        this.groupTagsButton.removeEventListener('click', this.groupTagsButtonClickEvent);
      }

      if (this.collectionSidebarCloseButtons.length && flag) {
        this.collectionSidebarCloseButtons.forEach(button => {
          button.removeEventListener('click', this.collectionSidebarCloseEvent);
        });
      }

      if (this.collectionSidebarScrollable & flag) {
        this.collectionSidebarScrollable.removeEventListener('scroll', this.collectionSidebarScrollEvent);
      }

      if (this.underlay) {
        this.underlay.removeEventListener('click', this.collectionSidebarCloseEvent);
      }

      if (this.sort) {
        this.sortLinks.forEach((link) => {
          link.removeEventListener('click', this.onClickEvent);
        });
        this.sort.removeEventListener('theme:filter:sort', this.onSortCheckEvent);
      }
    }
  }

  const collectionSection = {
    onLoad() {
      sections$8[this.id] = new Collection(this);
    },
    onUnload() {
      sections$8[this.id].onUnload();
    },
  };

  register('collection', [slider, parallaxHero, collectionSection, popoutSection, swatchGridSection, collectionFiltersForm, tooltipSection, siblings]);

  if (!customElements.get('quick-add-product')) {
    customElements.define('quick-add-product', QuickAddProduct);
  }

  const selectors$v = {
    frame: '[data-ticker-frame]',
    scale: '[data-ticker-scale]',
    text: '[data-ticker-text]',
    clone: 'data-clone',
  };

  const attributes$5 = {
    speed: 'data-marquee-speed',
  };

  const classes$o = {
    animation: 'ticker--animated',
    unloaded: 'ticker--unloaded',
    comparitor: 'ticker__comparitor',
  };

  const settings$3 = {
    textAnimationTime: 1.63, // 100px going to move for 1.63s
    space: 100, // 100px
  };

  class Ticker {
    constructor(el, stopClone = false) {
      this.frame = el;
      this.stopClone = stopClone;
      this.scale = this.frame.querySelector(selectors$v.scale);
      this.text = this.frame.querySelector(selectors$v.text);

      this.comparitor = this.text.cloneNode(true);
      this.comparitor.classList.add(classes$o.comparitor);
      this.frame.appendChild(this.comparitor);
      this.scale.classList.remove(classes$o.unloaded);
      this.resizeEvent = debounce(() => this.checkWidth(), 100);
      this.listen();
    }

    unload() {
      document.removeEventListener('theme:resize', this.resizeEvent);
    }

    listen() {
      document.addEventListener('theme:resize', this.resizeEvent);
      this.checkWidth();
    }

    checkWidth() {
      const padding = window.getComputedStyle(this.frame).paddingLeft.replace('px', '') * 2;
      const speed = this.frame.getAttribute(attributes$5.speed) ? this.frame.getAttribute(attributes$5.speed) : settings$3.textAnimationTime;

      if (this.frame.clientWidth - padding < this.comparitor.clientWidth || this.stopClone) {
        this.text.classList.add(classes$o.animation);
        if (this.scale.childElementCount === 1) {
          this.clone = this.text.cloneNode(true);
          this.clone.setAttribute(selectors$v.clone, '');
          this.scale.appendChild(this.clone);

          if (this.stopClone) {
            for (let index = 0; index < 10; index++) {
              const cloneSecond = this.text.cloneNode(true);
              cloneSecond.setAttribute(selectors$v.clone, '');
              this.scale.appendChild(cloneSecond);
            }
          }

          const animationTimeFrame = ((this.text.clientWidth / settings$3.space) * Number(speed)).toFixed(2);

          this.scale.style.setProperty('--animation-time', `${animationTimeFrame}s`);
        }
      } else {
        this.text.classList.add(classes$o.animation);
        let clone = this.scale.querySelector(`[${selectors$v.clone}]`);
        if (clone) {
          this.scale.removeChild(clone);
        }
        this.text.classList.remove(classes$o.animation);
      }
    }
  }

  const selectors$w = {
    bar: '[data-bar]',
    barSlide: '[data-slide]',
    frame: '[data-ticker-frame]',
    header: '[data-header-wrapper]',
    slider: '[data-slider]',
    slideValue: 'data-slide',
    tickerScale: '[data-ticker-scale]',
    tickerText: '[data-ticker-text]',
    dataTargetReferrer: 'data-target-referrer',
  };

  const sections$9 = {};

  class Bar {
    constructor(holder) {
      this.barHolder = holder;
      this.locationPath = location.href;

      this.slides = this.barHolder.querySelectorAll(selectors$w.barSlide);
      this.slider = this.barHolder.querySelector(selectors$w.slider);

      this.init();
    }

    init() {
      this.removeAnnouncement();

      if (this.slider) {
        this.initSliders();
      }

      if (!this.slider) {
        this.initTickers(true);
      }
    }

    /**
     * Delete announcement which has a target referrer attribute and it is not contained in page URL
     */
    removeAnnouncement() {
      for (let index = 0; index < this.slides.length; index++) {
        const element = this.slides[index];

        if (!element.hasAttribute(selectors$w.dataTargetReferrer)) {
          continue;
        }

        if (this.locationPath.indexOf(element.getAttribute(selectors$w.dataTargetReferrer)) === -1 && !window.Shopify.designMode) {
          element.parentNode.removeChild(element);
        }
      }
    }

    /**
     * Init slider
     */
    initSliders() {
      this.slider = new Slider(this.barHolder);
      this.slider.flkty.reposition();

      this.barHolder.addEventListener('theme:slider:loaded', () => {
        this.initTickers();
      });
    }

    /**
     * Init tickers in sliders
     */
    initTickers(stopClone = false) {
      const frames = this.barHolder.querySelectorAll(selectors$w.frame);

      frames.forEach((element) => {
        new Ticker(element, stopClone);
      });
    }

    toggleTicker(e, isStoped) {
      const tickerScale = document.querySelector(selectors$w.tickerScale);
      const element = document.querySelector(`[${selectors$w.slideValue}="${e.detail.blockId}"]`);

      if (isStoped && element) {
        tickerScale.setAttribute('data-stop', '');
        tickerScale.querySelectorAll(selectors$w.tickerText).forEach((textHolder) => {
          textHolder.classList.remove('ticker--animated');
          textHolder.style.transform = `translate3d(${-(element.offsetLeft - element.clientWidth)}px, 0, 0)`;
        });
      }

      if (!isStoped && element) {
        tickerScale.querySelectorAll(selectors$w.tickerText).forEach((textHolder) => {
          textHolder.classList.add('ticker--animated');
          textHolder.removeAttribute('style');
        });
        tickerScale.removeAttribute('data-stop');
      }
    }

    onBlockSelect(e) {
      if (this.slider) {
        this.slider.onBlockSelect(e);
      } else {
        this.toggleTicker(e, true);
      }
    }

    onBlockDeselect(e) {
      if (this.slider) {
        this.slider.onBlockDeselect(e);
      } else {
        this.toggleTicker(e, false);
      }
    }
  }

  const bar = {
    onLoad() {
      sections$9[this.id] = [];
      const element = this.container.querySelector(selectors$w.bar);
      if (element) {
        sections$9[this.id].push(new Bar(element));
      }
    },
    onBlockSelect(e) {
      if (sections$9[this.id].length) {
        sections$9[this.id].forEach((el) => {
          if (typeof el.onBlockSelect === 'function') {
            el.onBlockSelect(e);
          }
        });
      }
    },
    onBlockDeselect(e) {
      if (sections$9[this.id].length) {
        sections$9[this.id].forEach((el) => {
          if (typeof el.onBlockSelect === 'function') {
            el.onBlockDeselect(e);
          }
        });
      }
    },
  };

  register('announcement', [bar]);

  const selectors$x = {
    body: 'body',
    drawerWrappper: '[data-drawer]',
    drawerInner: '[data-drawer-inner]',
    underlay: '[data-drawer-underlay]',
    stagger: '[data-stagger-animation]',
    wrapper: '[data-header-transparent]',
    transparent: 'data-header-transparent',
    drawerToggle: 'data-drawer-toggle',
    focusable: 'button, [href], select, textarea, [tabindex]:not([tabindex="-1"])',
  };

  const classes$p = {
    isVisible: 'drawer--visible',
    isFocused: 'is-focused',
    headerStuck: 'js__header__stuck',
  };

  let sections$a = {};

  class Drawer {
    constructor(el) {
      this.drawer = el;
      this.drawerWrapper = this.drawer.closest(selectors$x.drawerWrappper);
      this.drawerInner = this.drawer.querySelector(selectors$x.drawerInner);
      this.underlay = this.drawer.querySelector(selectors$x.underlay);
      this.wrapper = this.drawer.closest(selectors$x.wrapper);
      this.key = this.drawer.dataset.drawer;
      const btnSelector = `[${selectors$x.drawerToggle}='${this.key}']`;
      this.buttons = document.querySelectorAll(btnSelector);
      this.staggers = this.drawer.querySelectorAll(selectors$x.stagger);
      this.body = document.querySelector(selectors$x.body);

      this.initWatchFocus = (evt) => this.watchFocus(evt);

      this.connectToggle();
      this.connectDrawer();
      this.closers();
      this.staggerChildAnimations();
    }

    connectToggle() {
      this.buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          this.drawer.dispatchEvent(
            new CustomEvent('theme:drawer:toggle', {
              bubbles: false,
            })
          );
        });
      });
    }

    connectDrawer() {
      this.drawer.addEventListener('theme:drawer:toggle', () => {
        if (this.drawer.classList.contains(classes$p.isVisible)) {
          this.drawer.dispatchEvent(
            new CustomEvent('theme:drawer:close', {
              bubbles: true,
            })
          );
        } else {
          this.drawer.dispatchEvent(
            new CustomEvent('theme:drawer:open', {
              bubbles: true,
            })
          );
        }
      });

      document.addEventListener('theme:drawer:close', this.hideDrawer.bind(this));
      document.addEventListener('theme:drawer:open', this.showDrawer.bind(this));
    }

    staggerChildAnimations() {
      this.staggers.forEach((el) => {
        const children = el.querySelectorAll(':scope > * > [data-animates]');
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 50 + 10}ms`;
        });
      });
    }

    watchFocus(evt) {
      let drawerInFocus = this.wrapper.contains(evt.target);
      if (!drawerInFocus && this.body.classList.contains(classes$p.isFocused)) {
        this.hideDrawer();
      }
    }

    closers() {
      this.wrapper.addEventListener(
        'keyup',
        function (evt) {
          if (evt.which !== window.theme.keyboardKeys.ESCAPE) {
            return;
          }
          this.hideDrawer();
          this.buttons[0].focus();
        }.bind(this)
      );

      this.underlay.addEventListener('click', () => {
        this.hideDrawer();
      });
    }

    showDrawer() {
      document.dispatchEvent(
        new CustomEvent('theme:drawer:close', {
          bubbles: false,
        })
      );

      this.buttons.forEach((el) => {
        el.setAttribute('aria-expanded', true);
        el.classList.add(classes$p.isVisible);
      });

      this.drawer.classList.add(classes$p.isVisible);
      this.drawer.querySelector(selectors$x.focusable).focus();
      this.wrapper.setAttribute(selectors$x.transparent, false);

      document.addEventListener('focusin', this.initWatchFocus);
      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.drawerInner}));
    }

    hideDrawer() {
      this.buttons.forEach((el) => {
        el.setAttribute('aria-expanded', true);
        el.classList.remove(classes$p.isVisible);
      });

      this.drawer.classList.remove(classes$p.isVisible);
      document.removeEventListener('focusin', this.initWatchFocus);

      if (!this.wrapper.classList.contains(classes$p.headerStuck)) {
        this.wrapper.setAttribute(selectors$x.transparent, theme.settings.transparentHeader);
      }

      document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
      document.dispatchEvent(new CustomEvent('theme:sliderule:close', {bubbles: false}));
    }
  }

  const drawer = {
    onLoad() {
      sections$a[this.id] = [];
      const els = this.container.querySelectorAll(selectors$x.drawerWrappper);
      els.forEach((el) => {
        sections$a[this.id].push(new Drawer(el));
      });
    },
  };

  const selectors$y = {
    announcement: '[data-announcement-wrapper]',
    headerWrapper: '[data-header-wrapper]',
    header: '[data-header-wrapper] header',
  };

  const classes$q = {
    stuck: 'js__header__stuck',
    stuckAnimated: 'js__header__stuck--animated',
    triggerAnimation: 'js__header__stuck--trigger-animation',
    stuckBackdrop: 'js__header__stuck__backdrop',
    headerIsNotVisible: 'is-not-visible',
    hasStickyHeader: 'has-sticky-header',
  };

  const attributes$6 = {
    transparent: 'data-header-transparent',
    stickyHeader: 'data-header-sticky',
    scrollLock: 'data-scroll-locked',
  };

  let sections$b = {};

  class Sticky {
    constructor(el) {
      this.wrapper = el;
      this.type = this.wrapper.dataset.headerSticky;
      this.sticks = false;
      this.static = true;
      if (this.wrapper.hasAttribute(attributes$6.stickyHeader)) {
        this.sticks = true;
        this.static = false;
      }
      this.win = window;
      this.animated = this.type === 'directional';
      this.currentlyStuck = false;
      this.cls = this.wrapper.classList;
      const announcementEl = document.querySelector(selectors$y.announcement);
      const announcementHeight = announcementEl ? announcementEl.clientHeight : 0;
      this.headerHeight = document.querySelector(selectors$y.header).clientHeight;
      this.blur = this.headerHeight + announcementHeight;
      this.stickDown = this.headerHeight + announcementHeight;
      this.stickUp = announcementHeight;
      this.scrollEventStatic = () => this.checkIsVisible();
      this.scrollEventListen = (e) => this.listenScroll(e);
      this.scrollEventUpListen = () => this.scrollUpDirectional();
      this.scrollEventDownListen = () => this.scrollDownDirectional();
      if (this.wrapper.getAttribute(attributes$6.transparent) !== 'false') {
        this.blur = announcementHeight;
      }
      if (this.sticks) {
        this.stickDown = announcementHeight;
        this.scrollDownInit();
        document.body.classList.add(classes$q.hasStickyHeader);
      }

      if (this.static) {
        document.addEventListener('theme:scroll', this.scrollEventStatic);
      }

      this.listen();
    }

    unload() {
      if (this.sticks || this.animated) {
        document.removeEventListener('theme:scroll', this.scrollEventListen);
      }

      if (this.animated) {
        document.removeEventListener('theme:scroll:up', this.scrollEventUpListen);
        document.removeEventListener('theme:scroll:down', this.scrollEventDownListen);
      }

      if (this.static) {
        document.removeEventListener('theme:scroll', this.scrollEventStatic);
      }
    }

    listen() {
      if (this.sticks || this.animated) {
        document.addEventListener('theme:scroll', this.scrollEventListen);
      }

      if (this.animated) {
        document.addEventListener('theme:scroll:up', this.scrollEventUpListen);
        document.addEventListener('theme:scroll:down', this.scrollEventDownListen);
      }
    }

    listenScroll(e) {
      if (e.detail.down) {
        if (!this.currentlyStuck && e.detail.position > this.stickDown) {
          this.stickSimple();
        }
        if (!this.currentlyBlurred && e.detail.position > this.blur) {
          this.addBlur();
        }
      } else {
        if (e.detail.position <= this.stickUp) {
          this.unstickSimple();
        }
        if (e.detail.position <= this.blur) {
          this.removeBlur();
        }
      }
    }

    stickSimple() {
      if (this.animated) {
        this.cls.add(classes$q.stuckAnimated);
      }
      this.cls.add(classes$q.stuck);
      this.wrapper.setAttribute(attributes$6.transparent, false);
      this.currentlyStuck = true;
    }

    unstickSimple() {
      if (!document.documentElement.hasAttribute(attributes$6.scrollLock)) {
        // check for scroll lock
        this.cls.remove(classes$q.stuck);
        this.wrapper.setAttribute(attributes$6.transparent, theme.settings.transparentHeader);
        if (this.animated) {
          this.cls.remove(classes$q.stuckAnimated);
        }
        this.currentlyStuck = false;
      }
    }

    scrollDownInit() {
      if (window.scrollY > this.stickDown) {
        this.stickSimple();
      }
      if (window.scrollY > this.blur) {
        this.addBlur();
      }
    }

    stickDirectional() {
      this.cls.add(classes$q.triggerAnimation);
    }

    unstickDirectional() {
      this.cls.remove(classes$q.triggerAnimation);
    }

    scrollDownDirectional() {
      this.unstickDirectional();
    }

    scrollUpDirectional() {
      if (window.scrollY <= this.stickDown) {
        this.unstickDirectional();
      } else {
        this.stickDirectional();
      }
    }

    addBlur() {
      this.cls.add(classes$q.stuckBackdrop);
      this.currentlyBlurred = true;
    }

    removeBlur() {
      this.cls.remove(classes$q.stuckBackdrop);
      this.currentlyBlurred = false;
    }

    checkIsVisible() {
      const header = document.querySelector(selectors$y.headerWrapper);
      const isHeaderSticky = header.getAttribute(attributes$6.stickyHeader);
      const currentScroll = this.win.pageYOffset;

      if (!isHeaderSticky) {
        header.classList.toggle(classes$q.headerIsNotVisible, currentScroll >= this.headerHeight);
      }
    }
  }

  const stickyHeader = {
    onLoad() {
      sections$b = new Sticky(this.container);
    },
    onUnload: function () {
      if (typeof sections$b.unload === 'function') {
        sections$b.unload();
      }
    },
  };

  const selectors$z = {
    disclosureToggle: 'data-hover-disclosure-toggle',
    disclosureWrappper: '[data-hover-disclosure]',
    link: '[data-top-link]',
    wrapper: '[data-header-wrapper]',
    stagger: '[data-stagger]',
    staggerPair: '[data-stagger-first]',
    staggerAfter: '[data-stagger-second]',
    focusable: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  };

  const classes$r = {
    isVisible: 'is-visible',
    meganavVisible: 'meganav--visible',
    meganavIsTransitioning: 'meganav--is-transitioning',
  };

  let sections$c = {};
  let disclosures = {};
  class HoverDisclosure {
    constructor(el) {
      this.disclosure = el;
      this.wrapper = el.closest(selectors$z.wrapper);
      this.key = this.disclosure.id;
      this.trigger = document.querySelector(`[${selectors$z.disclosureToggle}='${this.key}']`);
      this.link = this.trigger.querySelector(selectors$z.link);
      this.grandparent = this.trigger.classList.contains('grandparent');
      this.transitionTimeout = 0;

      this.trigger.setAttribute('aria-haspopup', true);
      this.trigger.setAttribute('aria-expanded', false);
      this.trigger.setAttribute('aria-controls', this.key);

      this.connectHoverToggle();
      this.handleTablets();
      this.staggerChildAnimations();
    }

    onBlockSelect(evt) {
      if (this.disclosure.contains(evt.target)) {
        this.showDisclosure(evt);
      }
    }

    onBlockDeselect(evt) {
      if (this.disclosure.contains(evt.target)) {
        this.hideDisclosure();
      }
    }

    showDisclosure(e) {
      if (e && e.type && e.type === 'mouseenter') {
        this.wrapper.classList.add(classes$r.meganavIsTransitioning);
      }

      if (this.grandparent) {
        this.wrapper.classList.add(classes$r.meganavVisible);
      } else {
        this.wrapper.classList.remove(classes$r.meganavVisible);
      }
      this.trigger.setAttribute('aria-expanded', true);
      this.trigger.classList.add(classes$r.isVisible);
      this.disclosure.classList.add(classes$r.isVisible);

      if (this.transitionTimeout) {
        clearTimeout(this.transitionTimeout);
      }

      this.transitionTimeout = setTimeout(() => {
        this.wrapper.classList.remove(classes$r.meganavIsTransitioning);
      }, 200);
    }

    hideDisclosure() {
      this.disclosure.classList.remove(classes$r.isVisible);
      this.trigger.classList.remove(classes$r.isVisible);
      this.trigger.setAttribute('aria-expanded', false);
      this.wrapper.classList.remove(classes$r.meganavVisible, classes$r.meganavIsTransitioning);
    }

    staggerChildAnimations() {
      const simple = this.disclosure.querySelectorAll(selectors$z.stagger);
      simple.forEach((el, index) => {
        el.style.transitionDelay = `${index * 50 + 10}ms`;
      });

      const pairs = this.disclosure.querySelectorAll(selectors$z.staggerPair);
      pairs.forEach((child, i) => {
        const d1 = i * 150;
        child.style.transitionDelay = `${d1}ms`;
        child.parentElement.querySelectorAll(selectors$z.staggerAfter).forEach((grandchild, i2) => {
          const di1 = i2 + 1;
          const d2 = di1 * 20;
          grandchild.style.transitionDelay = `${d1 + d2}ms`;
        });
      });
    }

    handleTablets() {
      // first click opens the popup, second click opens the link
      this.trigger.addEventListener(
        'touchstart',
        function (e) {
          const isOpen = this.disclosure.classList.contains(classes$r.isVisible);
          if (!isOpen) {
            e.preventDefault();
            this.showDisclosure(e);
          }
        }.bind(this),
        {passive: true}
      );
    }

    connectHoverToggle() {
      this.trigger.addEventListener('mouseenter', (e) => this.showDisclosure(e));
      this.link.addEventListener('focus', (e) => this.showDisclosure(e));

      this.trigger.addEventListener('mouseleave', () => this.hideDisclosure());
      this.trigger.addEventListener('focusout', (e) => {
        const inMenu = this.trigger.contains(e.relatedTarget);
        if (!inMenu) {
          this.hideDisclosure();
        }
      });
      this.disclosure.addEventListener('keyup', (evt) => {
        if (evt.which !== window.theme.keyboardKeys.ESCAPE) {
          return;
        }
        this.hideDisclosure();
      });
    }
  }

  const hoverDisclosure = {
    onLoad() {
      sections$c[this.id] = [];
      disclosures = this.container.querySelectorAll(selectors$z.disclosureWrappper);
      disclosures.forEach((el) => {
        sections$c[this.id].push(new HoverDisclosure(el));
      });
    },
    onBlockSelect(evt) {
      sections$c[this.id].forEach((el) => {
        if (typeof el.onBlockSelect === 'function') {
          el.onBlockSelect(evt);
        }
      });
    },
    onBlockDeselect(evt) {
      sections$c[this.id].forEach((el) => {
        if (typeof el.onBlockDeselect === 'function') {
          el.onBlockDeselect(evt);
        }
      });
    },
  };

  const selectors$A = {
    count: 'data-cart-count',
  };

  class Totals {
    constructor(el) {
      this.section = el;
      this.counts = this.section.querySelectorAll(`[${selectors$A.count}]`);
      this.cart = null;
      this.listen();
    }

    listen() {
      document.addEventListener(
        'theme:cart:change',
        function (event) {
          this.cart = event.detail.cart;
          this.update();
        }.bind(this)
      );
    }

    update() {
      if (this.cart) {
        this.counts.forEach((count) => {
          count.setAttribute(selectors$A.count, this.cart.item_count);
          count.innerHTML = this.cart.item_count < 10 ? `${this.cart.item_count}` : '9+';
        });
      }
    }
  }
  const headerTotals = {
    onLoad() {
      new Totals(this.container);
    },
  };

  const selectors$B = {
    saleClass: 'sale',
    soldClass: 'sold-out',
    doubleImage: 'double__image',
  };

  function formatPrices(product) {
    // Append classes for on sale and sold out
    const on_sale = product.price <= product.compare_at_price_min;
    let classes = on_sale ? selectors$B.saleClass : '';
    classes += product.available ? '' : selectors$B.soldClass;
    // Add 'from' before min price if price varies
    product.price = product.price === 0 ? window.theme.strings.free : themeCurrency.formatMoney(product.price, theme.moneyFormat);
    product.price_with_from = product.price;
    if (product.price_varies) {
      const min = product.price_min === 0 ? window.theme.strings.free : themeCurrency.formatMoney(product.price_min, theme.moneyFormat);
      product.price_with_from = `<small>${window.theme.strings.from}</small> ${min}`;
    }

    // add a class if there's more than one media
    let double_class = '';
    if (product.media !== undefined) {
      if (product.media.length > 1) {
        double_class += selectors$B.doubleImage;
      }
    }

    const formatted = {
      ...product,
      classes,
      on_sale,
      double_class,
      sold_out: !product.available,
      sold_out_translation: window.theme.strings.soldOut,
      compare_at_price: themeCurrency.formatMoney(product.compare_at_price, theme.moneyFormat),
      compare_at_price_max: themeCurrency.formatMoney(product.compare_at_price_max, theme.moneyFormat),
      compare_at_price_min: themeCurrency.formatMoney(product.compare_at_price_min, theme.moneyFormat),
      price_max: themeCurrency.formatMoney(product.price_max, theme.moneyFormat),
      price_min: themeCurrency.formatMoney(product.price_min, theme.moneyFormat),
      unit_price: themeCurrency.formatMoney(product.unit_price, theme.moneyWithoutCurrencyFormat),
    };
    return formatted;
  }

  const selectors$C = {
    append: '[data-predictive-search-append]',
    input: 'data-predictive-search-input',
    productTemplate: '[product-grid-item-template]',
    productWrapper: '[data-product-wrap]',
    productWrapperOuter: '[data-product-wrap-outer]',
    titleTemplate: '[data-predictive-search-title-template]',
    titleWrapper: '[data-search-title-wrap]',
    searchPopdown: 'search-popdown',
    productResultsOuter: '[data-product-results-outer]',
  };

  const classes$s = {
    isSearched: 'is-searched',
    loadingClass: 'is-loading',
  };

  class SearchPredictive {
    constructor(input) {
      this.input = input;
      this.key = this.input.getAttribute(selectors$C.input);
      const appendSelector = `[id='${this.key}']`;
      this.append = document.querySelector(appendSelector);
      this.productTemplate = document.querySelector(selectors$C.productTemplate).innerHTML;
      this.titleTemplate = document.querySelector(selectors$C.titleTemplate).innerHTML;
      this.titleWrapper = document.querySelector(selectors$C.titleWrapper);
      this.productWrapper = this.append.querySelector(selectors$C.productWrapper);
      this.productWrapperOuter = this.append.querySelector(selectors$C.productWrapperOuter);
      this.popdown = document.getElementById(selectors$C.searchPopdown);
      this.result = null;
      this.accessibility = a11y;
      this.initSearch();
    }

    initSearch() {
      this.input.addEventListener(
        'input',
        debounce(
          function (event) {
            const val = event.target.value;
            if (val && val.length > 1) {
              this.productWrapperOuter.classList.add(classes$s.loadingClass);
              this.popdown.classList.add(classes$s.isSearched);
              this.render(val);
            } else {
              this.reset();
              this.popdown.classList.remove(classes$s.isSearched);
            }
          }.bind(this),
          300
        )
      );
      this.input.addEventListener('clear', this.reset.bind(this));
    }

    render(terms) {
      fetch(`${window.theme.routes.root}search/suggest.json?q=${encodeURIComponent(terms)}&resources[type]=product&resources[limit]=8&resources[options][unavailable_products]=last`)
        .then(this.handleErrors)
        .then((response) => response.json())
        .then((response) => {
          this.result = response.resources.results;

          if (!this.result.products.length) {
            this.popdown.classList.remove(classes$s.isSearched);
          }

          return this.fetchProducts(response.resources.results.products);
        })
        .then((response) => {
          this.reset(false);
          this.productWrapperOuter.classList.remove(classes$s.loadingClass);
          this.injectTitle(terms);
          this.injectProduct(response);
        })
        .catch((e) => {
          console.error(e);
        });
    }

    reset(clearTerms = true) {
      this.productWrapper.innerHTML = '';
      this.input.val = '';
      this.accessibility.removeTrapFocus();

      if (clearTerms) {
        this.titleWrapper.innerHTML = '';
      }
    }

    injectTitle(terms) {
      let title = window.theme.strings.noResultsFor;
      let count = '';
      if (this.result && this.result.products.length > 0) {
        count = this.result.products.length;
        title = window.theme.strings.resultsFor;
      }
      this.titleWrapper.innerHTML = Sqrl.render(this.titleTemplate, {
        count: count,
        title: title,
        query: terms,
      });
    }

    injectProduct(productHTML) {
      this.productWrapper.innerHTML += productHTML;
    }

    fetchProducts(products) {
      const promises = [];
      products.forEach((product) => {
        // because of a translation bug in the predictive search API
        // we need to fetch the product JSON from the handle
        promises.push(
          fetchProduct(product.handle).then((productJSON) => {
            const formatted = formatPrices(productJSON);
            return this.renderProduct(formatted);
          })
        );
      });

      return Promise.all(promises).then((result) => {
        let str = '';
        result.forEach((render) => {
          str += render;
        });
        return str;
      });
    }

    renderProduct(product) {
      let media = null;
      let mediaHover = null;
      let image = '';
      let secondImage = '';

      if (product.media !== undefined) {
        media = product.media[0];
        mediaHover = product.media[1];
      }

      if (media) {
        image = {
          thumb: themeImages.getSizedImageUrl(media.preview_image.src, '800x800'),
          alt: media.preview_image.src,
        };
      } else {
        image = {
          thumb: window.theme.assets.no_image,
          alt: '',
        };
      }

      if (mediaHover) {
        secondImage = {
          thumb: themeImages.getSizedImageUrl(mediaHover.preview_image.src, '800x800'),
          alt: mediaHover.preview_image.src,
        };
      }
      const stripHtmlRegex = /(<([^>]+)>)/gi;
      const title = product.title.replace(stripHtmlRegex, '');

      const updateValues = {
        ...product,
        title,
        image,
        secondImage,
      };

      return Sqrl.render(this.productTemplate, {product: updateValues});
    }

    handleErrors(response) {
      if (!response.ok) {
        return response.json().then(function (json) {
          const e = new FetchError({
            status: response.statusText,
            headers: response.headers,
            json: json,
          });
          throw e;
        });
      }
      return response;
    }
  }

  const selectors$D = {
    body: 'body',
    popdownTrigger: 'data-popdown-toggle',
    close: '[data-close-popdown]',
    input: '[data-predictive-search-input]',
    productResultsOuter: '[data-product-results-outer]',
  };

  const classes$t = {
    isVisible: 'is-visible',
    productGridOuter: 'product-grid-outer',
    focused: 'is-focused',
  };

  let sections$d = {};

  class SearchPopdownTriggers {
    constructor(trigger) {
      this.trigger = trigger;
      this.key = this.trigger.getAttribute(selectors$D.popdownTrigger);
      this.search = null;

      const popdownSelector = `[id='${this.key}']`;
      this.document = document;
      this.popdown = document.querySelector(popdownSelector);
      this.input = this.popdown.querySelector(selectors$D.input);
      this.close = this.popdown.querySelector(selectors$D.close);
      this.body = document.querySelector(selectors$D.body);
      this.accessibility = a11y;

      this.initTriggerEvents();

      // Initialized once for every search trigger
      this.initPopdownEvents();
    }

    initTriggerEvents() {
      this.trigger.setAttribute('aria-haspopup', true);
      this.trigger.setAttribute('aria-expanded', false);
      this.trigger.setAttribute('aria-controls', this.key);

      this.trigger.addEventListener('click', (evt) => {
        evt.preventDefault();

        if (!this.body.classList.contains(classes$t.focused)) {
          this.showPopdown();
        }
      });

      this.trigger.addEventListener('keyup', (evt) => {
        if ((evt.which === window.theme.keyboardKeys.SPACE || evt.which === window.theme.keyboardKeys.ENTER) && this.body.classList.contains(classes$t.focused)) {
          this.showPopdown();
        }
      });
    }

    initPopdownEvents() {
      this.search = new SearchPredictive(this.input);
      this.popdown.addEventListener(
        'keyup',
        function (evt) {
          if (evt.which !== window.theme.keyboardKeys.ESCAPE) {
            return;
          }
          this.hidePopdown();
        }.bind(this)
      );

      this.close.addEventListener(
        'click',
        function () {
          this.hidePopdown();
        }.bind(this)
      );

      this.document.addEventListener('click', (event) => {
        const clickedElement = event.target;
        const isNotSearchExpandButton = !(clickedElement.matches(`[${selectors$D.popdownTrigger}]`) || clickedElement.closest(`[${selectors$D.popdownTrigger}]`));
        const isNotSearchPopdownChild = !(clickedElement.matches(`#${this.key}`) || clickedElement.closest(`#${this.key}`));

        if (isNotSearchExpandButton && isNotSearchPopdownChild && this.popdown.classList.contains(classes$t.isVisible)) {
          this.hidePopdown();
        }
      });
    }

    hidePopdown() {
      this.popdown.classList.remove(classes$t.isVisible);
      this.input.form.reset();
      this.input.dispatchEvent(new CustomEvent('clear', {bubbles: false}));
      this.accessibility.removeTrapFocus();
      this.popdown.querySelector(selectors$D.productResultsOuter).classList.remove(classes$t.productGridOuter);
      document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));

      if (this.body.classList.contains(classes$t.focused)) {
        setTimeout(() => {
          this.trigger.focus();
        }, 200);
      }
    }

    showPopdown() {
      document.dispatchEvent(
        new CustomEvent('theme:drawer:close', {
          bubbles: false,
        })
      );

      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.popdown}));

      this.popdown.classList.add(classes$t.isVisible);
      const val = this.input.value;
      this.input.value = '';
      this.input.value = val;

      this.accessibility.trapFocus(this.popdown);
      this.input.focus();
    }
  }

  const searchPopdown = {
    onLoad() {
      sections$d[this.id] = [];
      const triggers = this.container.querySelectorAll(`[${selectors$D.popdownTrigger}]`);
      triggers.forEach((el) => {
        sections$d[this.id].push(new SearchPopdownTriggers(el));
      });
    },
  };

  const selectors$E = {
    slideruleOpen: 'data-sliderule-open',
    slideruleClose: 'data-sliderule-close',
    sliderulePane: 'data-sliderule-pane',
    slideruleWrappper: '[data-sliderule]',
    focusable: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    dataAnimates: 'data-animates',
    children: `:scope > [data-animates], 
             :scope > * > [data-animates], 
             :scope > * > * >[data-animates],
             :scope > * > .sliderule-grid  > *`,
  };

  const classes$u = {
    isVisible: 'is-visible',
    isHiding: 'is-hiding',
    isHidden: 'is-hidden',
  };

  let sections$e = {};

  class HeaderMobileSliderule {
    constructor(el) {
      this.sliderule = el;
      this.wrapper = el.closest(selectors$E.wrapper);
      this.key = this.sliderule.id;
      const btnSelector = `[${selectors$E.slideruleOpen}='${this.key}']`;
      const exitSelector = `[${selectors$E.slideruleClose}='${this.key}']`;
      this.trigger = document.querySelector(btnSelector);
      this.exit = document.querySelectorAll(exitSelector);
      this.pane = document.querySelector(`[${selectors$E.sliderulePane}]`);
      this.children = this.sliderule.querySelectorAll(selectors$E.children);

      this.trigger.setAttribute('aria-haspopup', true);
      this.trigger.setAttribute('aria-expanded', false);
      this.trigger.setAttribute('aria-controls', this.key);

      this.clickEvents();
      this.staggerChildAnimations();

      document.addEventListener('theme:sliderule:close', this.closeSliderule.bind(this));
    }

    clickEvents() {
      this.trigger.addEventListener(
        'click',
        function () {
          this.showSliderule();
        }.bind(this)
      );
      this.exit.forEach((element) => {
        element.addEventListener(
          'click',
          function () {
            this.hideSliderule();
          }.bind(this)
        );
      });
    }

    keyboardEvents() {
      this.trigger.addEventListener(
        'keyup',
        function (evt) {
          if (evt.which !== window.theme.keyboardKeys.SPACE) {
            return;
          }
          this.showSliderule();
        }.bind(this)
      );
      this.sliderule.addEventListener(
        'keyup',
        function (evt) {
          if (evt.which !== window.theme.keyboardKeys.ESCAPE) {
            return;
          }
          this.hideSliderule();
          this.buttons[0].focus();
        }.bind(this)
      );
    }

    staggerChildAnimations(reverse = false) {
      const childrenArr = reverse ? Array.prototype.slice.call(this.children).slice().reverse() : this.children;
      childrenArr.forEach((child, index) => {
        child.style.transitionDelay = `${index * 50 + 10}ms`;
      });
    }

    hideSliderule(close = false) {
      const paneStyle = window.getComputedStyle(this.pane);
      const paneTransitionDuration = parseFloat(paneStyle.getPropertyValue('transition-duration')) * 1000;
      const children = close ? this.pane.querySelectorAll(`.${classes$u.isVisible}`) : this.children;
      this.pane.style.setProperty('--sliderule-height', 'auto');
      this.staggerChildAnimations(true);
      this.pane.classList.add(classes$u.isHiding);
      this.sliderule.classList.add(classes$u.isHiding);
      this.sliderule.classList.remove(classes$u.isVisible);
      children.forEach((el) => {
        el.classList.remove(classes$u.isVisible);
      });
      const newPosition = parseInt(this.pane.dataset.sliderulePane, 10) - 1;
      this.pane.setAttribute(selectors$E.sliderulePane, newPosition);
      const hidedSelector = close ? `[${selectors$E.dataAnimates}].${classes$u.isHidden}` : `[${selectors$E.dataAnimates}="${newPosition}"].${classes$u.isHidden}`;
      const hidedItems = this.pane.querySelectorAll(hidedSelector);
      if (hidedItems.length) {
        hidedItems.forEach((element) => {
          element.classList.remove(classes$u.isHidden);
        });
      }

      setTimeout(() => {
        this.pane.classList.remove(classes$u.isHiding);
        this.sliderule.classList.remove(classes$u.isHiding);
        this.staggerChildAnimations();
      }, paneTransitionDuration);
    }

    showSliderule() {
      this.pane.style.setProperty('--sliderule-height', 'auto');
      this.sliderule.classList.add(classes$u.isVisible);
      this.children.forEach((el) => {
        el.classList.add(classes$u.isVisible);
      });
      const oldPosition = parseInt(this.pane.dataset.sliderulePane, 10);
      const newPosition = oldPosition + 1;
      this.pane.setAttribute(selectors$E.sliderulePane, newPosition);
      const hidedItems = this.pane.querySelectorAll(`[${selectors$E.dataAnimates}="${oldPosition}"]`);
      if (hidedItems.length) {
        const hidedItemsTransition = parseFloat(window.getComputedStyle(hidedItems[0]).getPropertyValue('transition-duration')) * 1000;
        setTimeout(() => {
          hidedItems.forEach((element) => {
            element.classList.add(classes$u.isHidden);
          });
        }, hidedItemsTransition);
      }

      const newHeight = parseInt(this.trigger.nextElementSibling.offsetHeight);
      this.pane.style.setProperty('--sliderule-height', `${newHeight}px`);
    }

    closeSliderule() {
      if (this.pane && this.pane.hasAttribute(selectors$E.sliderulePane) && parseInt(this.pane.getAttribute(selectors$E.sliderulePane)) > 0) {
        this.hideSliderule(true);
        if (parseInt(this.pane.getAttribute(selectors$E.sliderulePane)) > 0) {
          this.pane.setAttribute(selectors$E.sliderulePane, 0);
        }
      }
    }
  }

  const headerMobileSliderule = {
    onLoad() {
      sections$e[this.id] = [];
      const els = this.container.querySelectorAll(selectors$E.slideruleWrappper);
      els.forEach((el) => {
        sections$e[this.id].push(new HeaderMobileSliderule(el));
      });
    },
  };

  const selectors$F = {
    wrapper: '[data-header-wrapper]',
    html: 'html',
    style: 'data-header-style',
    widthContentWrapper: '[data-takes-space-wrapper]',
    widthContent: '[data-child-takes-space]',
    desktop: '[data-header-desktop]',
    cloneClass: 'js__header__clone',
    showMobileClass: 'js__show__mobile',
    backfill: '[data-header-backfill]',
    transparent: 'data-header-transparent',
    overrideBorder: 'header-override-border',
    firstSectionHasImage: '.main-content > .shopify-section:first-child [data-overlay-header]',
    preventTransparentHeader: '.main-content > .shopify-section:first-child [data-prevent-transparent-header]',
    deadLink: '.navlink[href="#"]',
  };

  let sections$f = {};

  class Header {
    constructor(el) {
      this.wrapper = el;
      this.html = document.querySelector(selectors$F.html);
      this.style = this.wrapper.dataset.style;
      this.desktop = this.wrapper.querySelector(selectors$F.desktop);
      this.isTransparentHeader = this.wrapper.getAttribute(selectors$F.transparent) !== 'false';
      this.overlayedImages = document.querySelectorAll(selectors$F.firstSectionHasImage);
      this.deadLinks = document.querySelectorAll(selectors$F.deadLink);
      this.headerUpdateEvent = debounce(() => this.checkForImage(), 500);
      this.resizeEventWidth = () => this.checkWidth();
      this.resizeEventOverlay = () => this.subtractAnnouncementHeight();

      this.killDeadLinks();
      if (this.style !== 'drawer' && this.desktop) {
        this.minWidth = this.getMinWidth();
        this.listenWidth();
      }
      this.checkForImage();
      this.listenSectionEvents();
    }

    checkForImage() {
      // check again for overlayed images
      this.overlayedImages = document.querySelectorAll(selectors$F.firstSectionHasImage);
      let preventTransparentHeader = document.querySelectorAll(selectors$F.preventTransparentHeader).length;

      if (this.overlayedImages.length && !preventTransparentHeader && this.isTransparentHeader) {
        // is transparent and has image, overlay the image
        this.listenOverlay();
        this.wrapper.setAttribute(selectors$F.transparent, true);
        document.querySelector(selectors$F.backfill).style.display = 'none';
        theme.settings.transparentHeader = true;
      } else {
        this.wrapper.setAttribute(selectors$F.transparent, false);
        document.querySelector(selectors$F.backfill).style.display = 'block';
        theme.settings.transparentHeader = false;
      }

      if (this.overlayedImages.length && !preventTransparentHeader && !this.isTransparentHeader) {
        // Have image but not transparent, remove border bottom
        this.wrapper.classList.add(selectors$F.overrideBorder);
      }

      this.subtractAnnouncementHeight();
    }

    listenOverlay() {
      document.addEventListener('theme:resize', this.resizeEventOverlay);
      this.subtractAnnouncementHeight();
    }

    listenWidth() {
      document.addEventListener('theme:resize', this.resizeEventWidth);
      this.checkWidth();
    }

    listenSectionEvents() {
      document.addEventListener('shopify:section:load', this.headerUpdateEvent);
      document.addEventListener('shopify:section:unload', this.headerUpdateEvent);
      document.addEventListener('shopify:section:reorder', this.headerUpdateEvent);
    }

    killDeadLinks() {
      this.deadLinks.forEach((el) => {
        el.onclick = (e) => {
          e.preventDefault();
        };
      });
    }

    subtractAnnouncementHeight() {
      const {windowHeight, announcementHeight, headerHeight} = readHeights();
      this.overlayedImages.forEach((el) => {
        if (theme.settings.transparentHeader) {
          el.style.setProperty('--full-screen', `${windowHeight - announcementHeight}px`);
        } else {
          // headerHeight includes announcement bar height
          el.style.setProperty('--full-screen', `${windowHeight - headerHeight}px`);
        }
        el.classList.add('has-overlay');
      });
    }

    checkWidth() {
      if (document.body.clientWidth < this.minWidth) {
        this.wrapper.classList.add(selectors$F.showMobileClass);
      } else {
        this.wrapper.classList.remove(selectors$F.showMobileClass);
      }
    }

    getMinWidth() {
      const comparitor = this.wrapper.cloneNode(true);
      comparitor.classList.add(selectors$F.cloneClass);
      document.body.appendChild(comparitor);
      const widthWrappers = comparitor.querySelectorAll(selectors$F.widthContentWrapper);
      let minWidth = 0;
      let spaced = 0;

      widthWrappers.forEach((context) => {
        const wideElements = context.querySelectorAll(selectors$F.widthContent);
        let thisWidth = 0;
        if (wideElements.length === 3) {
          thisWidth = _sumSplitWidths(wideElements);
        } else {
          thisWidth = _sumWidths(wideElements);
        }
        if (thisWidth > minWidth) {
          minWidth = thisWidth;
          spaced = wideElements.length * 20;
        }
      });

      document.body.removeChild(comparitor);
      return minWidth + spaced;
    }

    unload() {
      document.removeEventListener('theme:resize', this.resizeEventWidth);
      document.removeEventListener('theme:resize', this.resizeEventOverlay);
      document.removeEventListener('shopify:section:load', this.headerUpdateEvent);
      document.removeEventListener('shopify:section:unload', this.headerUpdateEvent);
      document.removeEventListener('shopify:section:reorder', this.headerUpdateEvent);
    }
  }

  function _sumSplitWidths(nodes) {
    let arr = [];
    nodes.forEach((el) => {
      if (el.firstElementChild) {
        arr.push(el.firstElementChild.clientWidth);
      }
    });
    if (arr[0] > arr[2]) {
      arr[2] = arr[0];
    } else {
      arr[0] = arr[2];
    }
    const width = arr.reduce((a, b) => a + b);
    return width;
  }
  function _sumWidths(nodes) {
    let width = 0;
    nodes.forEach((el) => {
      width += el.clientWidth;
    });
    return width;
  }

  const header = {
    onLoad() {
      sections$f = new Header(this.container);

      setVarsOnResize();
    },
    onUnload() {
      if (typeof sections$f.unload === 'function') {
        sections$f.unload();
      }
    },
  };

  register('header', [header, drawer, popoutSection, headerMobileSliderule, stickyHeader, hoverDisclosure, headerTotals, searchPopdown]);

  const selectors$G = {
    slider: '[data-slider]',
    slide: '[data-slide]',
    thumb: '[data-slider-thumb]',
  };

  const classes$v = {
    isSelected: 'is-selected',
  };

  const sections$g = {};

  class Look {
    constructor(section) {
      this.container = section.container;
      this.slider = this.container.querySelector(selectors$G.slider);
      this.slides = this.container.querySelectorAll(selectors$G.slide);
      this.thumbs = this.container.querySelectorAll(selectors$G.thumb);

      if (this.slider && this.slides.length && this.thumbs.length) {
        this.resizeEvent = () => this.checkPosition();

        this.slider.addEventListener('scroll', this.resizeEvent);
        document.addEventListener('theme:resize', this.resizeEvent);

        this.thumbs.forEach((thumb, i) => {
          thumb.addEventListener('click', () => {
            const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if (windowWidth < theme.sizes.small) {
              const parentPadding = parseInt(window.getComputedStyle(this.slider).paddingLeft);
              const thumbLeft = this.slides[i].offsetLeft;
              this.slider.scrollTo({
                top: 0,
                left: thumbLeft - parentPadding,
                behavior: 'smooth',
              });
            }
          });
        });
      }
    }

    checkPosition() {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (windowWidth < theme.sizes.small) {
        const sliderWidth = this.slider.offsetWidth;
        const sliderPositionLeft = this.slider.scrollLeft;
        const sliderPositionRight = sliderPositionLeft + sliderWidth;

        this.slides.forEach((slide, i) => {
          const slideWidth = slide.offsetWidth;
          const slidePositionLeft = slide.offsetLeft;
          const slidePositionRight = slidePositionLeft + slideWidth;
          let nextSlideCheck = false;
          const nextSlide = this.slides[i + 1];

          if (nextSlide) {
            const nextSlidePositionWidth = nextSlide.offsetWidth;
            const nextSlidePositionLeft = nextSlide.offsetLeft;
            const nextSlidePositionRight = nextSlidePositionLeft + nextSlidePositionWidth;

            if (sliderPositionRight >= nextSlidePositionRight) {
              nextSlideCheck = true;
            }
          }

          this.thumbs[i].classList.toggle(classes$v.isSelected, sliderPositionRight >= slidePositionRight && !nextSlideCheck);
        });
      }
    }

    onUnload() {
      if (this.slider && this.slides.length && this.thumbs.length) {
        document.removeEventListener('theme:resize', this.resizeEvent);
        this.slider.removeEventListener('scroll', this.resizeEvent);
      }
    }
  }

  const lookSection = {
    onLoad() {
      sections$g[this.id] = new Look(this);
    },
    onUnload(e) {
      sections$g[this.id].onUnload(e);
    },
  };

  register('look', [lookSection, slider, swatchGridSection, siblings]);

  if (!customElements.get('quick-add-product')) {
    customElements.define('quick-add-product', QuickAddProduct);
  }

  const selectors$H = {
    body: 'body',
    dataRelatedSectionElem: '[data-related-section]',
    dataTabsHolder: '[data-tabs-holder]',
    dataTab: 'data-tab',
    dataTabIndex: 'data-tab-index',
    dataTabStartIndex: 'data-start-index',
    dataTabStartIndexMobile: 'data-start-index-mobile',
    dataAos: '[data-aos]',
    blockId: 'data-block-id',
    tabsLi: '[data-tab]',
    tabLink: '.tab-link',
    tabLinkRecent: '.tab-link__recent',
    tabContent: '.tab-content',
    scrollbarHolder: '[data-scrollbar]',
    scrollbarArrowPrev: '[data-scrollbar-arrow-prev]',
    scrollbarArrowNext: '[data-scrollbar-arrow-next]',
    productModal: '[data-product-modal]',
  };

  const classes$w = {
    current: 'current',
    hide: 'hide',
    alt: 'alt',
    aosAnimate: 'aos-animate',
    aosNoTransition: 'aos-no-transition',
    focused: 'is-focused',
  };

  const sections$h = {};

  class GlobalTabs {
    constructor(holder) {
      this.container = holder;
      this.body = document.querySelector(selectors$H.body);
      this.accessibility = window.accessibility;

      if (this.container) {
        this.scrollbarHolder = this.container.querySelectorAll(selectors$H.scrollbarHolder);

        this.init();

        // Init native scrollbar
        this.initNativeScrollbar();
      }
    }

    init() {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const ctx = this.container;
      const tabsNavList = ctx.querySelectorAll(selectors$H.tabsLi);
      const startIdx = ctx.hasAttribute(selectors$H.dataTabStartIndex) ? ctx.getAttribute(selectors$H.dataTabStartIndex) : 0;
      let firstTabLink = ctx.querySelector(`${selectors$H.tabLink}-${startIdx}`);
      let firstTabContent = ctx.querySelector(`${selectors$H.tabContent}-${startIdx}`);

      if (windowWidth < theme.sizes.small) {
        const startIdxMobile = ctx.hasAttribute(selectors$H.dataTabStartIndexMobile) ? ctx.getAttribute(selectors$H.dataTabStartIndexMobile) : startIdx;
        firstTabLink = ctx.querySelector(`${selectors$H.tabLink}-${startIdxMobile}`);
        firstTabContent = ctx.querySelector(`${selectors$H.tabContent}-${startIdxMobile}`);
      }

      if (firstTabContent) {
        firstTabContent.classList.add(classes$w.current);
      }

      if (firstTabLink) {
        firstTabLink.classList.add(classes$w.current);
      }

      this.checkVisibleTabLinks();
      this.container.addEventListener('theme:tab:check', () => this.checkRecentTab());
      this.container.addEventListener('theme:tab:hide', () => this.hideRelatedTab());

      if (tabsNavList.length) {
        tabsNavList.forEach((element) => {
          const tabId = parseInt(element.getAttribute(selectors$H.dataTab));
          const tab = ctx.querySelector(`${selectors$H.tabContent}-${tabId}`);

          element.addEventListener('click', () => {
            this.tabChange(element, tab);
          });

          element.addEventListener('keyup', (event) => {
            if ((event.which === window.theme.keyboardKeys.SPACE || event.which === window.theme.keyboardKeys.ENTER) && this.body.classList.contains(classes$w.focused)) {
              this.tabChange(element, tab);
            }
          });
        });
      }
    }

    tabChange(element, tab) {
      if (element.classList.contains(classes$w.current)) {
        return;
      }

      this.container.querySelector(`${selectors$H.tabsLi}.${classes$w.current}`).classList.remove(classes$w.current);
      const lastCurrentTab = this.container.querySelector(`${selectors$H.tabContent}.${classes$w.current}`);
      lastCurrentTab.classList.remove(classes$w.current);

      element.classList.add(classes$w.current);
      tab.classList.add(classes$w.current);

      if (element.classList.contains(classes$w.hide)) {
        tab.classList.add(classes$w.hide);
      }

      this.checkVisibleTabLinks();

      this.accessibility.a11y.removeTrapFocus();

      this.container.dispatchEvent(new CustomEvent('theme:tab:change', {bubbles: true}));

      element.dispatchEvent(
        new CustomEvent('theme:form:sticky', {
          bubbles: true,
          detail: {
            element: 'tab',
          },
        })
      );

      this.animateItems(tab);
    }

    animateItems(tab, animated = true) {
      const animatedItems = tab.querySelectorAll(selectors$H.dataAos);

      if (animatedItems.length) {
        animatedItems.forEach((animatedItem) => {
          animatedItem.classList.remove(classes$w.aosAnimate);

          if (animated) {
            animatedItem.classList.add(classes$w.aosNoTransition);

            setTimeout(() => {
              animatedItem.classList.remove(classes$w.aosNoTransition);
              animatedItem.classList.add(classes$w.aosAnimate);
            });
          }
        });
      }
    }

    initNativeScrollbar() {
      if (this.scrollbarHolder.length) {
        this.scrollbarHolder.forEach((scrollbar) => {
          new NativeScrollbar(scrollbar);
        });
      }
    }

    checkVisibleTabLinks() {
      const tabsNavList = this.container.querySelectorAll(selectors$H.tabsLi);
      const tabsNavListHided = this.container.querySelectorAll(`${selectors$H.tabLink}.${classes$w.hide}`);
      const difference = tabsNavList.length - tabsNavListHided.length;

      if (difference < 2) {
        this.container.classList.add(classes$w.alt);
      } else {
        this.container.classList.remove(classes$w.alt);
      }
    }

    checkRecentTab() {
      const tabLink = this.container.querySelector(selectors$H.tabLinkRecent);

      if (tabLink) {
        tabLink.classList.remove(classes$w.hide);
        const tabLinkIdx = parseInt(tabLink.getAttribute(selectors$H.dataTab));
        const tabContent = this.container.querySelector(`${selectors$H.tabContent}[${selectors$H.dataTabIndex}="${tabLinkIdx}"]`);

        if (tabContent) {
          tabContent.classList.remove(classes$w.hide);

          this.animateItems(tabContent, false);
        }

        this.checkVisibleTabLinks();

        this.initNativeScrollbar();
      }
    }

    hideRelatedTab() {
      const relatedSection = this.container.querySelector(selectors$H.dataRelatedSectionElem);
      if (!relatedSection) {
        return;
      }

      const parentTabContent = relatedSection.closest(`${selectors$H.tabContent}.${classes$w.current}`);
      if (!parentTabContent) {
        return;
      }
      const parentTabContentIdx = parseInt(parentTabContent.getAttribute(selectors$H.dataTabIndex));
      const tabsNavList = this.container.querySelectorAll(selectors$H.tabsLi);

      if (tabsNavList.length > parentTabContentIdx) {
        const nextTabsNavLink = tabsNavList[parentTabContentIdx].nextSibling;

        if (nextTabsNavLink) {
          tabsNavList[parentTabContentIdx].classList.add(classes$w.hide);
          nextTabsNavLink.dispatchEvent(new Event('click'));
          this.initNativeScrollbar();
        }
      }
    }

    onBlockSelect(evt) {
      const element = this.container.querySelector(`${selectors$H.tabLink}[${selectors$H.blockId}="${evt.detail.blockId}"]`);
      if (element) {
        element.dispatchEvent(new Event('click'));

        element.parentNode.scrollTo({
          top: 0,
          left: element.offsetLeft - element.clientWidth,
          behavior: 'smooth',
        });
      }
    }
  }

  const tabs = {
    onLoad() {
      sections$h[this.id] = [];
      const tabHolders = this.container.querySelectorAll(selectors$H.dataTabsHolder);

      tabHolders.forEach((holder) => {
        sections$h[this.id].push(new GlobalTabs(holder));
      });
    },
    onBlockSelect(e) {
      sections$h[this.id].forEach((el) => {
        if (typeof el.onBlockSelect === 'function') {
          el.onBlockSelect(e);
        }
      });
    },
  };

  register('product-grid', [slider, swatchGridSection, tabs, siblings]);

  if (!customElements.get('quick-add-product')) {
    customElements.define('quick-add-product', QuickAddProduct);
  }

  const tokensReducer = (acc, token) => {
    const {el, elStyle, elHeight, rowsLimit, rowsWrapped, options} = acc;
    let oldBuffer = acc.buffer;
    let newBuffer = oldBuffer;

    if (rowsWrapped === rowsLimit + 1) {
      return {...acc};
    }
    const textBeforeWrap = oldBuffer;
    let newRowsWrapped = rowsWrapped;
    let newHeight = elHeight;
    el.innerHTML = newBuffer = oldBuffer.length ? `${oldBuffer}${options.delimiter}${token}${options.replaceStr}` : `${token}${options.replaceStr}`;

    if (parseFloat(elStyle.height) > parseFloat(elHeight)) {
      newRowsWrapped++;
      newHeight = elStyle.height;

      if (newRowsWrapped === rowsLimit + 1) {
        el.innerHTML = newBuffer = textBeforeWrap[textBeforeWrap.length - 1] === '.' && options.replaceStr === '...' ? `${textBeforeWrap}..` : `${textBeforeWrap}${options.replaceStr}`;

        return {...acc, elHeight: newHeight, rowsWrapped: newRowsWrapped};
      }
    }

    el.innerHTML = newBuffer = textBeforeWrap.length ? `${textBeforeWrap}${options.delimiter}${token}` : `${token}`;

    return {...acc, buffer: newBuffer, elHeight: newHeight, rowsWrapped: newRowsWrapped};
  };

  const ellipsis = (selector = '', rows = 1, options = {}) => {
    const defaultOptions = {
      replaceStr: '...',
      debounceDelay: 250,
      delimiter: ' ',
    };

    const opts = {...defaultOptions, ...options};

    const elements =
      selector &&
      (selector instanceof NodeList
        ? selector
        : selector.nodeType === 1 // if node type is Node.ELEMENT_NODE
        ? [selector] // wrap it in (NodeList) if it is a single node
        : document.querySelectorAll(selector));

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const elementHtml = el.innerHTML;
      const commentRegex = /<!--[\s\S]*?-->/g;
      const htmlWithoutComments = elementHtml.replace(commentRegex, '');
      const splittedText = htmlWithoutComments.split(opts.delimiter);

      el.innerHTML = '';
      const elStyle = window.getComputedStyle(el);

      splittedText.reduce(tokensReducer, {
        el,
        buffer: el.innerHTML,
        elStyle,
        elHeight: 0,
        rowsLimit: rows,
        rowsWrapped: 0,
        options: opts,
      });
    }
  };

  const fadeOut = (el, callback = null) => {
    el.style.opacity = 1;

    (function fade() {
      if ((el.style.opacity -= 0.1) < 0) {
        el.style.display = 'none';
      } else {
        requestAnimationFrame(fade);
      }

      if (parseFloat(el.style.opacity) === 0 && typeof callback === 'function') {
        callback();
      }
    })();
  };

  const selectors$I = {
    pickupContainer: 'data-store-availability-container',
    shopifySection: '.shopify-section',
    drawer: '[data-pickup-drawer]',
    drawerBody: '[data-pickup-drawer-body]',
    drawerOpen: '[data-pickup-drawer-open]',
    drawerClose: '[data-pickup-drawer-close]',
    body: 'body',
  };

  const classes$x = {
    isOpen: 'is-open',
    isHidden: 'hidden',
  };

  let sections$i = {};

  class PickupAvailability {
    constructor(section) {
      this.container = section.container;
      this.drawer = null;
      this.drawerBody = null;
      this.buttonDrawerOpen = null;
      this.buttonDrawerClose = null;
      this.body = document.querySelector(selectors$I.body);
      this.a11y = a11y;

      this.container.addEventListener('theme:variant:change', (event) => this.fetchPickupAvailability(event));

      this.closeEvent();
    }

    fetchPickupAvailability(event) {
      const container = this.container.querySelector(`[${selectors$I.pickupContainer}]`);
      if (!container) return;
      if ((event && !event.detail.variant) || (event && event.detail.variant && !event.detail.variant.available)) {
        container.classList.add(classes$x.isHidden);
        return;
      }
      const variantID = event && event.detail.variant ? event.detail.variant.id : container.getAttribute(selectors$I.pickupContainer);
      this.drawer = this.body.querySelector(selectors$I.drawer);

      // Remove cloned instances of pickup drawer
      if (this.drawer) {
        this.body.removeChild(this.drawer);
      }

      if (variantID) {
        fetch(`${window.theme.routes.root}variants/${variantID}/?section_id=api-pickup-availability`)
          .then(this.handleErrors)
          .then((response) => response.text())
          .then((text) => {
            const pickupAvailabilityHTML = new DOMParser().parseFromString(text, 'text/html').querySelector(selectors$I.shopifySection).innerHTML;
            container.innerHTML = pickupAvailabilityHTML;

            this.drawer = this.container.querySelector(selectors$I.drawer);
            if (!this.drawer) {
              container.classList.add(classes$x.isHidden);
              return;
            }
            // Clone Pickup drawer and append it to the end of <body>
            this.clone = this.drawer.cloneNode(true);
            this.body.appendChild(this.clone);

            // Delete the original instance of pickup drawer
            container.classList.remove(classes$x.isHidden);
            container.removeChild(this.drawer);

            this.drawer = this.body.querySelector(selectors$I.drawer);
            this.drawerBody = this.body.querySelector(selectors$I.drawerBody);
            this.buttonDrawerOpen = this.body.querySelector(selectors$I.drawerOpen);
            this.buttonDrawerClose = this.body.querySelectorAll(selectors$I.drawerClose);

            if (this.buttonDrawerOpen) {
              this.buttonDrawerOpen.addEventListener('click', () => {
                this.openDrawer();

                window.accessibility.lastElement = this.buttonDrawerOpen;
              });
            }

            if (this.buttonDrawerClose.length) {
              this.buttonDrawerClose.forEach((element) => {
                element.addEventListener('click', () => this.closeDrawer());
              });
            }

            this.drawer.addEventListener('keyup', (evt) => {
              if (evt.which !== window.theme.keyboardKeys.ESCAPE) {
                return;
              }
              this.closeDrawer();
            });
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }

    openDrawer() {
      if (this.drawer) {
        this.drawer.classList.add(classes$x.isOpen);
        this.drawer.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.drawerBody}));

        // Focus the close button on pickup drawer close
        setTimeout(() => {
          const elementToFocus = this.drawer.querySelector(selectors$I.drawerClose);
          this.a11y.removeTrapFocus();
          this.a11y.trapFocus(this.drawer, {
            elementToFocus: elementToFocus,
          });
        }, 200);
      }
    }

    closeDrawer() {
      if (this.drawer) {
        this.drawer.classList.remove(classes$x.isOpen);
        this.drawer.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true, detail: this.drawerBody}));
        this.a11y.removeTrapFocus();

        // Focus the last element on pickup drawer close
        if (window.accessibility.lastElement) {
          setTimeout(() => {
            window.accessibility.lastElement.focus();
          }, 200);
        }
      }
    }

    /**
     * Body click event to close pickup drawer
     *
     * @return  {Void}
     */
    closeEvent() {
      document.addEventListener('click', (event) => {
        const clickedElement = event.target;

        if (!clickedElement.matches(selectors$I.drawerOpen) && !clickedElement.closest(selectors$I.drawer)) {
          this.closeDrawer();
        }
      });
    }

    handleErrors(response) {
      if (!response.ok) {
        return response.json().then(function (json) {
          const e = new FetchError({
            status: response.statusText,
            headers: response.headers,
            json: json,
          });
          throw e;
        });
      }
      return response;
    }
  }

  const pickupAvailability = {
    onLoad() {
      sections$i[this.id] = new PickupAvailability(this);
    },
  };

  const selectors$J = {
    slideshow: '[data-product-slideshow]',
    dataStickyEnabled: 'data-sticky-enabled',
    productPage: '.product__page',
    formWrapper: '[data-form-wrapper]',
    headerSticky: '[data-header-sticky]',
    headerHeight: '[data-header-height]',
  };

  const classes$y = {
    sticky: 'is-sticky',
  };

  window.theme.variables = {
    productPageSticky: false,
  };

  const sections$j = {};

  class ProductSticky {
    constructor(section) {
      this.section = section;
      this.container = section.container;
      this.stickyEnabled = this.container.getAttribute(selectors$J.dataStickyEnabled) === 'true';
      this.formWrapper = this.container.querySelector(selectors$J.formWrapper);
      this.stickyScrollTop = 0;
      this.scrollLastPosition = 0;
      this.stickyDefaultTop = 0;
      this.currentPoint = 0;
      this.defaultTopBottomSpacings = 30;
      this.scrollTop = window.scrollY;
      this.scrollDirectionDown = true;
      this.requestAnimationSticky = null;
      this.stickyFormLoad = true;
      this.stickyFormLastHeight = null;
      this.onChangeCounter = 0;
      this.scrollEvent = (e) => this.scrollEvents(e);
      this.resizeEvent = (e) => this.resizeEvents(e);

      // The code should execute after truncate text in product.js - 50ms
      setTimeout(() => {
        this.init();
      }, 50);
    }

    init() {
      if (this.stickyEnabled) {
        this.stickyScrollCheck();

        document.addEventListener('theme:resize', this.resizeEvent);
      }

      this.initSticky();
    }

    initSticky() {
      if (theme.variables.productPageSticky) {
        this.requestAnimationSticky = requestAnimationFrame(() => this.calculateStickyPosition());

        this.formWrapper.addEventListener('theme:form:sticky', (e) => {
          this.removeAnimationFrame();

          this.requestAnimationSticky = requestAnimationFrame(() => this.calculateStickyPosition(e));
        });

        document.addEventListener('theme:scroll', this.scrollEvent);
      }
    }

    scrollEvents(e) {
      this.scrollTop = e.detail.position;
      this.scrollDirectionDown = e.detail.down;

      if (!this.requestAnimationSticky) {
        this.requestAnimationSticky = requestAnimationFrame(() => this.calculateStickyPosition());
      }
    }

    resizeEvents(e) {
      this.stickyScrollCheck();

      document.removeEventListener('theme:scroll', this.scrollEvent);

      this.initSticky();
    }

    stickyScrollCheck() {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const isDesktop = windowWidth >= window.theme.sizes.small;
      const targetFormWrapper = this.container.querySelector(`${selectors$J.productPage} ${selectors$J.formWrapper}`);

      if (!targetFormWrapper) return;

      if (isDesktop) {
        const form = this.container.querySelector(selectors$J.formWrapper);
        const slideshow = this.container.querySelector(selectors$J.slideshow);
        if (!form || !slideshow) return;
        const productCopyHeight = form.offsetHeight;
        const productImagesHeight = slideshow.offsetHeight;

        // Is the product description and form taller than window space
        // Is also shorter than the window and images
        if (productCopyHeight < productImagesHeight) {
          theme.variables.productPageSticky = true;
          targetFormWrapper.classList.add(classes$y.sticky);
        } else {
          theme.variables.productPageSticky = false;
          targetFormWrapper.classList.remove(classes$y.sticky);
        }
      } else {
        theme.variables.productPageSticky = false;
        targetFormWrapper.classList.remove(classes$y.sticky);
      }
    }

    calculateStickyPosition(e = null) {
      const eventExist = Boolean(e && e.detail);
      const isAccordion = Boolean(eventExist && e.detail.element && e.detail.element === 'accordion');
      const formWrapperHeight = this.formWrapper.offsetHeight;
      const heightDifference = window.innerHeight - formWrapperHeight - this.defaultTopBottomSpacings;
      const scrollDifference = Math.abs(this.scrollTop - this.scrollLastPosition);

      if (this.scrollDirectionDown) {
        this.stickyScrollTop -= scrollDifference;
      } else {
        this.stickyScrollTop += scrollDifference;
      }

      if (this.stickyFormLoad) {
        if (document.querySelector(selectors$J.headerSticky) && document.querySelector(selectors$J.headerHeight)) {
          this.stickyDefaultTop = parseInt(document.querySelector(selectors$J.headerHeight).getBoundingClientRect().height);
        } else {
          this.stickyDefaultTop = this.defaultTopBottomSpacings;
        }

        this.stickyScrollTop = this.stickyDefaultTop;
      }

      this.stickyScrollTop = Math.min(Math.max(this.stickyScrollTop, heightDifference), this.stickyDefaultTop);

      const differencePoint = this.stickyScrollTop - this.currentPoint;
      this.currentPoint = this.stickyFormLoad ? this.stickyScrollTop : this.currentPoint + differencePoint * 0.5;

      this.formWrapper.style.setProperty('--sticky-top', `${this.currentPoint}px`);

      this.scrollLastPosition = this.scrollTop;
      this.stickyFormLoad = false;

      if (
        (isAccordion && this.onChangeCounter <= 10) ||
        (isAccordion && this.stickyFormLastHeight !== formWrapperHeight) ||
        (this.stickyScrollTop !== this.currentPoint && this.requestAnimationSticky)
      ) {
        if (isAccordion) {
          this.onChangeCounter += 1;
        }

        if (isAccordion && this.stickyFormLastHeight !== formWrapperHeight) {
          this.onChangeCounter = 11;
        }

        this.requestAnimationSticky = requestAnimationFrame(() => this.calculateStickyPosition(e));
      } else if (this.requestAnimationSticky) {
        this.removeAnimationFrame();
      }

      this.stickyFormLastHeight = formWrapperHeight;
    }

    removeAnimationFrame() {
      if (this.requestAnimationSticky) {
        cancelAnimationFrame(this.requestAnimationSticky);
        this.requestAnimationSticky = null;
        this.onChangeCounter = 0;
      }
    }

    onUnload() {
      if (this.stickyEnabled) {
        document.removeEventListener('theme:resize', this.resizeEvent);
      }

      if (theme.variables.productPageSticky) {
        document.removeEventListener('theme:scroll', this.scrollEvent);
      }
    }
  }

  const productStickySection = {
    onLoad() {
      sections$j[this.id] = new ProductSticky(this);
    },
    onUnload() {
      sections$j[this.id].onUnload();
    },
  };

  const selectors$K = {
    elements: {
      accordionHolder: '[data-accordion-holder]',
      accordion: '[data-accordion]',
      accordionToggle: '[data-accordion-toggle]',
      accordionBody: '[data-accordion-body]',
      accordionExpandValue: 'data-accordion-expand',
      accordionBlockValue: 'data-block-id',
    },
    classes: {
      open: 'is-open',
    },
  };


  const sections$k = {};

  class GlobalAccordions {
    constructor(el) {
      this.container = el.container;
      this.accordion = this.container.querySelector(selectors$K.elements.accordion);
      this.accordionToggles = this.container.querySelectorAll(selectors$K.elements.accordionToggle);
      this.accordionTogglesLength = this.accordionToggles.length;
      this.accordionBody = this.container.querySelector(selectors$K.elements.accordionBody);

      if (this.accordionTogglesLength && this.accordionBody) {
        this.accordionEvents();
      }
    }

    accordionEvents() {
      this.accordionToggles.forEach((element) => {
        element.addEventListener(
          'click',
          throttle((event) => {
            event.preventDefault();
            const targetAccordionBody = element.parentElement.querySelector(selectors$K.elements.accordionBody);
            if (targetAccordionBody) {
              this.onAccordionToggle(element, targetAccordionBody);
            }
          }, 800)
        );
      });

      if (this.accordion.getAttribute(selectors$K.elements.accordionExpandValue) === 'true') {
        this.accordionToggles[0].classList.add(selectors$K.classes.open);

        showElement(this.accordionToggles[0].parentElement.querySelector(selectors$K.elements.accordionBody));
      }
    }

    closeOtherAccordions(element, slide = true) {
      let otherElements = [...this.accordionToggles];
      const holder = this.container.closest(selectors$K.elements.accordionHolder);
      if (holder) {
        otherElements = [...holder.querySelectorAll(selectors$K.elements.accordionToggle)];
      }

      otherElements.filter((otherElement) => {
        const otherElementAccordionBody = otherElement.parentElement.querySelector(selectors$K.elements.accordionBody);
        if (otherElement !== element && otherElement.classList.contains(selectors$K.classes.open) && otherElementAccordionBody) {
          this.onAccordionClose(otherElement, otherElementAccordionBody, slide);
        }
      });
    }

    onAccordionOpen(element, body, slide = true) {
      element.classList.add(selectors$K.classes.open);
      slideDown(body);

      this.closeOtherAccordions(element, slide);
    }

    onAccordionClose(element, body, slide = true) {
      element.classList.remove(selectors$K.classes.open);
      if (slide) {
        slideUp(body);
      } else {
        hideElement(body);
      }
    }

    onAccordionToggle(element, body) {
      element.classList.toggle(selectors$K.classes.open);
      slideToggle(body);

      this.closeOtherAccordions(element);

      element.dispatchEvent(
        new CustomEvent('theme:form:sticky', {
          bubbles: true,
          detail: {
            element: 'accordion',
          },
        })
      );
    }

    onBlockToggle(evt, blockSelect = true) {
      const targetAccordionToggle = this.container.querySelector(`${selectors$K.elements.accordionToggle}[${selectors$K.elements.accordionBlockValue}="${evt.detail.blockId}"]`);
      if (!targetAccordionToggle) return;
      const targetAccordionBody = targetAccordionToggle.parentElement.querySelector(selectors$K.elements.accordionBody);
      if (!targetAccordionBody) return;
      if (blockSelect) {
        this.onAccordionOpen(targetAccordionToggle, targetAccordionBody, false);
      } else {
        this.onAccordionClose(targetAccordionToggle, targetAccordionBody);
      }
    }

    onSelectToggle(sectionSelect = true) {
      if (this.accordionBody && this.accordionTogglesLength && this.accordionTogglesLength < 2) {
        if (sectionSelect) {
          this.onAccordionOpen(this.accordionToggles[0], this.accordionBody, false);
        } else {
          this.onAccordionClose(this.accordionToggles[0], this.accordionBody);
        }
      }
    }

    onSelect() {
      this.onSelectToggle(true);
    }

    onDeselect() {
      this.onSelectToggle(false);
    }

    onBlockSelect(evt) {
      this.onBlockToggle(evt, true);
    }

    onBlockDeselect(evt) {
      this.onBlockToggle(evt, false);
    }
  }

  const accordions = {
    onLoad() {
      sections$k[this.id] = new GlobalAccordions(this);
    },
    onSelect() {
      sections$k[this.id].onSelect();
    },
    onDeselect() {
      sections$k[this.id].onDeselect();
    },
    onBlockSelect(e) {
      sections$k[this.id].onBlockSelect(e);
    },
    onBlockDeselect(e) {
      sections$k[this.id].onBlockDeselect(e);
    },
  };

  const selectors$L = {
    headerSticky: '[data-header-sticky]',
    headerHeight: '[data-header-height]',
    scrollToElement: '[data-scroll-to]',
    scrollToElementValue: 'data-scroll-to',
    scrollToLinks: '[data-scroll-to-links]',
    scrollSpy: '[data-scroll-spy]',
    accordionHolder: '[data-accordion-holder]',
    accordionToggle: '[data-accordion-toggle]',
    tooltip: '[data-tooltip]',
    tooltipStopMousenterValue: 'data-tooltip-stop-mouseenter',
  };

  const classes$z = {
    open: 'is-open',
    selected: 'is-selected',
  };

  const sections$l = {};

  class ScrollToElement {
    constructor(section) {
      this.section = section;
      this.container = section.container;
      this.scrollToButtons = this.container.querySelectorAll(selectors$L.scrollToElement);
      this.scrollSpyElement = this.container.querySelector(selectors$L.scrollSpy);

      if (this.scrollToButtons.length) {
        this.init();
      }

      if (this.scrollSpyElement) {
        this.scrollSpy();
      }
    }

    init() {
      this.scrollToButtons.forEach((element) => {
        element.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(element.getAttribute(selectors$L.scrollToElementValue));

          if (!target) return;
          const accordionToggle = target.querySelector(selectors$L.accordionToggle);
          let timeoutFlag = false;
          const scrollToLinks = element.closest(selectors$L.scrollToLinks);

          if (scrollToLinks && !element.closest(selectors$L.scrollSpy)) {
            const selectedItems = scrollToLinks.querySelectorAll(`.${classes$z.selected}`);
            if (selectedItems.length) {
              selectedItems.forEach((selectedItem) => {
                selectedItem.classList.remove(classes$z.selected);
              });
            }
            element.classList.add(classes$z.selected);
          }

          // Open target accordion if they are inside it
          if (accordionToggle) {
            const accordionHolder = accordionToggle.closest(selectors$L.accordionHolder);

            if (!accordionToggle.classList.contains(classes$z.open) && accordionHolder && accordionHolder.querySelector(`${selectors$L.accordionToggle}.${classes$z.open}`)) {
              timeoutFlag = true;
            }

            if (!accordionToggle.classList.contains(classes$z.open)) {
              accordionToggle.dispatchEvent(new Event('click'));
            }
          }

          if (timeoutFlag) {
            setTimeout(() => this.scrollToElement(target), 500);
          } else {
            this.scrollToElement(target);
          }
        });
      });
    }

    scrollToElement(element) {
      scrollTo(element.getBoundingClientRect().top);

      const tooltips = document.querySelectorAll(`${selectors$L.tooltip}:not([${selectors$L.tooltipStopMousenterValue}])`);
      if (tooltips.length) {
        tooltips.forEach((tooltip) => {
          tooltip.setAttribute(selectors$L.tooltipStopMousenterValue, '');

          setTimeout(() => {
            tooltip.removeAttribute(selectors$L.tooltipStopMousenterValue);
          }, 1000);
        });
      }
    }

    scrollSpy() {
      const buttons = this.scrollSpyElement.querySelectorAll(selectors$L.scrollToElement);
      if (!buttons) return;
      const headerHeight =
        document.querySelector(selectors$L.headerSticky) && document.querySelector(selectors$L.headerHeight) ? document.querySelector(selectors$L.headerHeight).getBoundingClientRect().height : 0;

      window.addEventListener('scroll', () => {
        const scrollPos = Math.ceil(document.documentElement.scrollTop || document.body.scrollTop);
        buttons.forEach((element) => {
          const target = document.querySelector(element.getAttribute(selectors$L.scrollToElementValue));
          if (target.offsetTop - headerHeight <= scrollPos) {
            this.scrollSpyElement.querySelector(`.${classes$z.selected}`).classList.remove(classes$z.selected);
            this.scrollSpyElement.querySelector(`[${selectors$L.scrollToElementValue}="#${target.id}"]`).classList.add(classes$z.selected);
          }
        });
      });
    }
  }

  const scrollToElement = {
    onLoad() {
      sections$l[this.id] = new ScrollToElement(this);
    },
  };

  window.theme.variables = {
    bpSmall: false,
  };

  const selectors$M = {
    addToCart: '[data-add-to-cart]',
    priceWrapper: '[data-price-wrapper]',
    productImage: '[data-product-image]',
    productJson: '[data-product-json]',
    form: '[data-product-form]',
    thumbs: '[data-product-thumbs]',
    dataSectionId: 'data-section-id',
    dataTallLayout: 'data-tall-layout',
    dataCartBar: 'data-cart-bar',
    dataProductShare: '[data-product-share]',
    dataProductShareValue: 'data-product-share',
    dataProductShareTitleValue: 'data-product-share-title',
    cartBar: '#cart-bar',
    cartBarAdd: 'data-add-to-cart-bar',
    cartBarScroll: 'data-cart-bar-scroll',
    productSubmitAdd: '.product__submit__add',
    templateProduct: '#template-product',
    siteFooterWrapper: '.site-footer-wrapper',
    toggleTruncateHolder: '[data-truncated-holder]',
    toggleTruncateButton: '[data-truncated-button]',
    toggleTruncateContent: '[data-truncated-content]',
    toggleTruncateContentAttr: 'data-truncated-content',
    quickAddButton: '[data-quick-add-btn]',
    quickAddButtonText: '[data-quick-add-btn-text]',
    upsellButton: '[data-upsell-btn]',
    productPopupButton: 'data-product-popup',
    modalScrollContainer: '[data-tabs-holder]',
    formWrapper: '[data-form-wrapper]',
  };

  const classes$A = {
    expanded: 'is-expanded',
    visible: 'is-visible',
    loading: 'is-loading',
    added: 'is-added',
    siteFooterPush: 'site-footer--push',
    hasPopup: 'has-popup',
  };

  const sections$m = {};

  /**
   * Product section constructor.
   * @param {string} container - selector for the section container DOM element
   */
  class Product {
    constructor(section) {
      this.section = section;
      this.container = section.container;
      this.id = this.container.getAttribute(selectors$M.dataSectionId);
      this.tallLayout = this.container.getAttribute(selectors$M.dataTallLayout) === 'true';
      this.thumbs = this.container.querySelector(selectors$M.thumbs);
      this.shareButton = this.container.querySelector(selectors$M.dataProductShare);
      this.upsellButton = this.container.querySelector(selectors$M.upsellButton);
      this.quickAddButton = this.container.querySelector(selectors$M.quickAddButton);
      this.truncateElementHolder = this.container.querySelector(selectors$M.toggleTruncateHolder);
      this.truncateElement = this.container.querySelector(selectors$M.toggleTruncateContent);
      this.productPopupButton = this.container.querySelectorAll(`[${selectors$M.productPopupButton}]`);
      this.formWrapper = this.container.querySelector(selectors$M.formWrapper);
      this.cartBarExist = this.container.getAttribute(selectors$M.dataCartBar) === 'true';
      this.cartBar = this.container.querySelector(selectors$M.cartBar);
      this.scrollToTop = this.scrollToTop.bind(this);
      this.scrollEvent = (e) => this.scrollEvents(e);
      this.resizeEvent = (e) => this.resizeEvents(e);
      this.unlockTimer = 0;
      this.accessibility = a11y;

      // Record recently viewed products when the product page is loading
      Shopify.Products.recordRecentlyViewed();

      this.shareToggle();

      if (this.truncateElementHolder && this.truncateElement) {
        setTimeout(() => this.truncateText(), 50);
      }

      if (this.upsellButton) {
        this.getQuickAddButtonTextWidth();
      }

      if (this.upsellButton || (this.truncateElementHolder && this.truncateElement)) {
        document.addEventListener('theme:resize', this.resizeEvent);
      }

      // Stop parsing if we don't have the product json script tag when loading
      // section in the Theme Editor
      const productJson = this.container.querySelector(selectors$M.productJson);
      if ((productJson && !productJson.innerHTML) || !productJson) {
        const counter = new QuantityCounter(this.container);
        counter.init();
        return;
      }

      this.form = this.container.querySelector(selectors$M.form);

      this.init();

      if (this.cartBarExist) {
        this.initCartBar();
        document.addEventListener('theme:scroll', this.scrollEvent);
      }

      if (this.productPopupButton.length > 0) {
        this.productPopup();
      }
    }

    init() {
      theme.mediaInstances[this.id] = new Media(this.section);
      theme.mediaInstances[this.id].init();
    }

    scrollEvents(e) {
      if (this.cartBarExist) {
        this.cartBarScroll();
      }
    }

    resizeEvents(e) {
      if (this.truncateElementHolder && this.truncateElement) {
        this.truncateText();
      }

      if (this.quickAddButton) {
        this.getQuickAddButtonTextWidth();
      }
    }

    productPopup() {
      this.productPopupButton.forEach((button) => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const modal = document.querySelector(`#${button.getAttribute(selectors$M.productPopupButton)}`);
          const modalScrollContainer = modal.querySelector(selectors$M.modalScrollContainer);

          if (window.getComputedStyle(modal).display !== 'none') {
            fadeOut(modal);
            this.formWrapper.classList.remove(classes$A.hasPopup);
            this.accessibility.removeTrapFocus();

            if (this.unlockTimer) {
              clearTimeout(this.unlockTimer);
            }
            // delay scroll unlock to prevent content shifting
            this.unlockTimer = setTimeout(() => {
              document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
            }, 300);
          }

          if (window.getComputedStyle(modal).display === 'none') {
            fadeIn(modal);
            this.formWrapper.classList.add(classes$A.hasPopup);
            document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: modalScrollContainer}));
            this.accessibility.trapFocus(modal);
          }
        });
      });
    }

    getQuickAddButtonTextWidth() {
      const quickAddButtonText = this.upsellButton.querySelector(selectors$M.quickAddButtonText);
      if (quickAddButtonText) {
        this.upsellButton.style.setProperty('--btn-text-width', `${quickAddButtonText.clientWidth}px`);
      }
    }

    truncateText() {
      if (this.truncateElementHolder.classList.contains(classes$A.visible)) return;
      const styles = this.truncateElement.querySelectorAll('style');
      if (styles.length) {
        styles.forEach((style) => {
          this.truncateElementHolder.prepend(style);
        });
      }

      const truncateElementCloned = this.truncateElement.cloneNode(true);
      const truncateElementClass = this.truncateElement.getAttribute(selectors$M.toggleTruncateContentAttr);
      const truncateNextElement = this.truncateElement.nextElementSibling;
      if (truncateNextElement) {
        truncateNextElement.remove();
      }

      this.truncateElement.parentElement.append(truncateElementCloned);

      const truncateAppendedElement = this.truncateElement.nextElementSibling;
      truncateAppendedElement.classList.add(truncateElementClass);
      truncateAppendedElement.removeAttribute(selectors$M.toggleTruncateContentAttr);

      showElement(truncateAppendedElement);

      ellipsis(truncateAppendedElement, 5, {
        replaceStr: '',
        delimiter: ' ',
      });

      hideElement(truncateAppendedElement);

      if (this.truncateElement.innerHTML !== truncateAppendedElement.innerHTML) {
        this.truncateElementHolder.classList.add(classes$A.expanded);
      } else {
        truncateAppendedElement.remove();
        this.truncateElementHolder.classList.remove(classes$A.expanded);
      }

      this.toggleTruncatedContent(this.truncateElementHolder);
    }

    toggleTruncatedContent(holder) {
      const toggleButton = holder.querySelector(selectors$M.toggleTruncateButton);
      if (toggleButton) {
        toggleButton.addEventListener('click', (e) => {
          e.preventDefault();
          holder.classList.remove(classes$A.expanded);
          holder.classList.add(classes$A.visible);
        });
      }
    }

    shareToggle() {
      if (this.shareButton) {
        this.shareButton.addEventListener('click', function () {
          const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

          if (navigator.share && windowWidth <= 1024) {
            const shareTitle = this.hasAttribute(selectors$M.dataProductShareTitleValue) ? this.getAttribute(selectors$M.dataProductShareTitleValue) : window.location.hostname;
            const shareUrl = this.hasAttribute(selectors$M.dataProductShareValue) ? this.getAttribute(selectors$M.dataProductShareValue) : window.location.href;

            navigator
              .share({
                title: shareTitle,
                url: shareUrl,
              })
              .then(() => {
                console.log('Thanks for sharing!');
              })
              .catch(console.error);
          } else {
            this.parentElement.classList.toggle(classes$A.expanded);
          }
        });
      }
    }

    initCartBar() {
      // Submit product form on cart bar button click
      this.cartBarBtn = this.cartBar.querySelector(selectors$M.productSubmitAdd);
      if (this.cartBarBtn) {
        this.cartBarBtn.addEventListener('click', (e) => {
          e.preventDefault();

          if (e.target.hasAttribute(selectors$M.cartBarAdd)) {
            if (theme.settings.cartDrawerEnabled) {
              e.target.classList.add(classes$A.loading);
              e.target.setAttribute('disabled', 'disabled');
            }

            this.form.querySelector(selectors$M.addToCart).dispatchEvent(
              new Event('click', {
                bubbles: true,
              })
            );
          } else if (e.target.hasAttribute(selectors$M.cartBarScroll)) {
            this.scrollToTop();
          }
        });

        if (this.cartBarBtn.hasAttribute(selectors$M.cartBarAdd)) {
          document.addEventListener('theme:product:add-error', this.scrollToTop);
        }
      }
    }

    scrollToTop() {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const isDesktop = windowWidth >= window.theme.sizes.small;
      const scrollTarget = isDesktop ? this.container : this.form;

      scrollTo(scrollTarget.getBoundingClientRect().top);
    }

    cartBarScroll() {
      const scrolled = window.pageYOffset;
      const element = theme.variables.productPageSticky && this.formWrapper ? this.formWrapper : this.form;

      if (element && this.cartBar) {
        const siteFooter = document.querySelector(selectors$M.siteFooterWrapper);
        const formOffset = element.offsetTop;
        const formHeight = element.offsetHeight;
        const checkPosition = scrolled > formOffset + formHeight;

        this.cartBar.classList.toggle(classes$A.visible, checkPosition);
        if (siteFooter) {
          siteFooter.classList.toggle(classes$A.siteFooterPush, checkPosition);
          siteFooter.style.marginBottom = siteFooter.classList.contains(classes$A.siteFooterPush) ? `${this.cartBar.offsetHeight}px` : '0';
        }
      }
    }

    onUnload() {
      document.removeEventListener('theme:product:add-error', this.scrollToTop);

      if (this.quickAddButton || (this.truncateElementHolder && this.truncateElement)) {
        document.removeEventListener('theme:resize', this.resizeEvent);
      }

      if (this.cartBarExist) {
        document.removeEventListener('theme:scroll', this.scrollEvent);
      }
    }
  }

  const productSection = {
    onLoad() {
      sections$m[this.id] = new Product(this);
    },
    onUnload(e) {
      sections$m[this.id].onUnload(e);
    },
  };

  register('product', [productSection, pickupAvailability, productFormSection, swatchSection, tooltipSection, popoutSection, tabs, accordions, copyClipboard, scrollToElement, productStickySection]);

  if (!customElements.get('quick-add-product')) {
    customElements.define('quick-add-product', QuickAddProduct);
  }

  const selectors$N = {
    dataRelatedSectionElem: '[data-related-section]',
    dataRelatedProduct: '[data-product-grid-item]',
    dataProductId: 'data-product-id',
    dataLimit: 'data-limit',
    dataMinimum: 'data-minimum',
    recentlyViewed: '[data-recent-wrapper]',
    recentlyViewedWrapper: '[data-recently-viewed-wrapper]',
    recentlyProduct: '#recently-viewed-products',
    dataProductItem: '.product-item',
    slider: '[data-slider]',
  };

  const classes$B = {
    isHidden: 'is-hidden',
  };

  class Related {
    constructor(section) {
      this.section = section;
      this.sectionId = section.id;
      this.container = section.container;

      this.init();
      this.recent();
    }

    init() {
      const relatedSection = this.container.querySelector(selectors$N.dataRelatedSectionElem);

      if (!relatedSection) {
        return;
      }

      const self = this;
      const productId = relatedSection.getAttribute(selectors$N.dataProductId);
      const limit = relatedSection.getAttribute(selectors$N.dataLimit);
      const requestUrl = `${window.theme.routes.product_recommendations_url}?section_id=related&limit=${limit}&product_id=${productId}`;

      fetch(requestUrl)
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          const createdElement = document.createElement('div');
          createdElement.innerHTML = data;
          const inner = createdElement.querySelector(selectors$N.dataRelatedSectionElem);

          if (inner.querySelector(selectors$N.dataRelatedProduct)) {
            const innerHtml = inner.innerHTML;
            hideElement(relatedSection);
            relatedSection.innerHTML = innerHtml;
            slideDown(relatedSection);

            const relatedProducts = relatedSection.querySelectorAll(selectors$N.dataRelatedProduct);

            makeGridSwatches(self.section);

            // Init Siblings
            new Siblings(self.section);

            if (relatedProducts.length > 4 && relatedSection.querySelector(selectors$N.slider)) {
              new Slider(relatedSection);
            }
          } else {
            relatedSection.dispatchEvent(
              new CustomEvent('theme:tab:hide', {
                bubbles: true,
              })
            );
          }
        })
        .catch(function () {
          relatedSection.dispatchEvent(
            new CustomEvent('theme:tab:hide', {
              bubbles: true,
            })
          );
        });
    }

    recent() {
      const recentlyViewed = this.container.querySelector(selectors$N.recentlyViewed);
      const howManyToshow = recentlyViewed ? parseInt(recentlyViewed.getAttribute(selectors$N.dataLimit)) : 4;

      Shopify.Products.showRecentlyViewed({
        howManyToShow: howManyToshow,
        wrapperId: `recently-viewed-products-${this.sectionId}`,
        section: this.section,
        onComplete: (wrapper, section) => {
          const container = section.container;
          const recentlyViewedHolder = container.querySelector(selectors$N.recentlyViewed);
          const recentlyViewedWrapper = container.querySelector(selectors$N.recentlyViewedWrapper);
          const recentProducts = wrapper.querySelectorAll(selectors$N.dataProductItem);
          const minimumNumberProducts = recentlyViewedHolder.hasAttribute(selectors$N.dataMinimum) ? parseInt(recentlyViewedHolder.getAttribute(selectors$N.dataMinimum)) : 4;
          const checkRecentInRelated = !recentlyViewedWrapper && recentProducts.length > 0;
          const checkRecentOutsideRelated = recentlyViewedWrapper && recentProducts.length >= minimumNumberProducts;

          if (checkRecentInRelated || checkRecentOutsideRelated) {
            if (checkRecentOutsideRelated) {
              recentlyViewedWrapper.classList.remove(classes$B.isHidden);
            }

            fadeIn(recentlyViewedHolder);

            recentlyViewedHolder.dispatchEvent(
              new CustomEvent('theme:tab:check', {
                bubbles: true,
              })
            );

            makeGridSwatches(section);

            // Init Siblings
            new Siblings(section);

            if (recentProducts.length > 4 && recentlyViewedHolder.querySelector(selectors$N.slider)) {
              new Slider(recentlyViewedHolder);
            }
          }
        },
      });
    }
  }

  const relatedSection = {
    onLoad() {
      this.section = new Related(this);
    },
  };

  register('related', [relatedSection, popoutSection, tabs]);

  if (!customElements.get('quick-add-product')) {
    customElements.define('quick-add-product', QuickAddProduct);
  }

  register('reviews', [accordions, slider]);

  const selectors$O = {
    scrollElement: '[data-block-scroll]',
    flickityEnabled: 'flickity-enabled',
  };

  const sections$n = {};

  class BlockScroll {
    constructor(el) {
      this.container = el.container;
    }

    onBlockSelect(evt) {
      const scrollElement = this.container.querySelector(selectors$O.scrollElement);
      if (scrollElement && !scrollElement.classList.contains(selectors$O.flickityEnabled)) {
        const currentElement = evt.srcElement;
        if (currentElement) {
          scrollElement.scrollTo({
            top: 0,
            left: currentElement.offsetLeft,
            behavior: 'smooth',
          });
        }
      }
    }
  }

  const blockScroll = {
    onLoad() {
      sections$n[this.id] = new BlockScroll(this);
    },
    onBlockSelect(e) {
      sections$n[this.id].onBlockSelect(e);
    },
  };

  const sections$o = {};

  const selectors$P = {
    sliderLogos: '[data-slider-logos]',
    sliderText: '[data-slider-text]',
    slide: '[data-slide]',
    slideIndex: '[data-slide-index]',
  };

  const classes$C = {
    isSelected: 'is-selected',
    flickityEnabled: 'flickity-enabled',
  };

  const attributes$7 = {
    slideData: 'data-slide',
    slideIndex: 'data-slide-index',
  };

  class LogoList {
    constructor(section) {
      this.container = section.container;
      this.slideshowNav = this.container.querySelector(selectors$P.sliderLogos);
      this.slideshowText = this.container.querySelector(selectors$P.sliderText);
      this.setSlideshowNavStateOnResize = () => this.setSlideshowNavState();
      this.flkty = null;
      this.flktyNav = null;

      this.initSlideshowText();
      this.initSlideshowNav();
    }

    initSlideshowText() {
      if (!this.slideshowText) return;

      this.flkty = new FlickityFade(this.slideshowText, {
        fade: true,
        autoPlay: false,
        prevNextButtons: false,
        cellAlign: 'left', // Prevents blurry text on Safari
        contain: true,
        pageDots: false,
        wrapAround: false,
        selectedAttraction: 0.2,
        friction: 0.6,
        draggable: false,
        accessibility: false,
        on: {
          ready: () => this.sliderAccessibility(),
          change: () => this.sliderAccessibility(),
        },
      });

      const textSlides = this.slideshowText.querySelectorAll(selectors$P.slide);
      if (textSlides.length) {
        let maxHeight = -1;
        textSlides.forEach((element) => {
          const elementHeight = parseFloat(getComputedStyle(element, null).height.replace('px', ''));

          if (elementHeight > maxHeight) {
            maxHeight = elementHeight;
          }
        });

        textSlides.forEach((element) => {
          const elementHeight = parseFloat(getComputedStyle(element, null).height.replace('px', ''));

          if (elementHeight < maxHeight) {
            const calculateMargin = Math.ceil((maxHeight - elementHeight) / 2);
            element.style.margin = `${calculateMargin}px 0`;
          }
        });
      }
    }

    sliderAccessibility() {
      const buttons = this.slideshowText.querySelectorAll(`${selectors$P.slide} a, ${selectors$P.slide} button`);

      if (buttons.length) {
        buttons.forEach((button) => {
          const slide = button.closest(selectors$P.slide);
          if (slide) {
            const tabIndex = slide.classList.contains(classes$C.isSelected) ? 0 : -1;
            button.setAttribute('tabindex', tabIndex);
          }
        });
      }
    }

    initSlideshowNav() {
      if (!this.slideshowNav) return;

      this.logoSlides = this.slideshowNav.querySelectorAll(selectors$P.slideIndex);

      if (this.logoSlides.length) {
        this.logoSlides.forEach((logoItem) => {
          logoItem.addEventListener('click', (e) => {
            e.preventDefault();

            const index = parseInt(logoItem.getAttribute(attributes$7.slideIndex));
            const hasSlider = this.slideshowNav.classList.contains(classes$C.flickityEnabled);

            if (this.flkty) {
              this.flkty.select(index);
            }

            if (hasSlider) {
              this.flktyNav.select(index);
              if (!this.slideshowNav.classList.contains(classes$C.isSelected)) {
                this.flktyNav.playPlayer();
              }
            } else {
              const selectedSlide = this.slideshowNav.querySelector(`.${classes$C.isSelected}`);
              if (selectedSlide) {
                selectedSlide.classList.remove(classes$C.isSelected);
              }
              logoItem.classList.add(classes$C.isSelected);
            }
          });
        });
      }

      this.setSlideshowNavState();

      document.addEventListener('theme:resize', this.setSlideshowNavStateOnResize);
    }

    setSlideshowNavState() {
      const slides = this.slideshowNav.querySelectorAll(selectors$P.slide);
      const slidesCount = slides.length;
      const slideWidth = 200;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const slidesWidth = slidesCount * slideWidth;
      const sliderInitialized = this.slideshowNav.classList.contains(classes$C.flickityEnabled);

      if (slidesWidth > windowWidth) {
        if (!sliderInitialized) {
          const selectedSlide = this.slideshowNav.querySelector(`.${classes$C.isSelected}`);
          if (selectedSlide) {
            selectedSlide.classList.remove(classes$C.isSelected);
          }
          slides[0].classList.add(classes$C.isSelected);

          this.flktyNav = new Flickity(this.slideshowNav, {
            autoPlay: 4000,
            prevNextButtons: false,
            contain: true,
            pageDots: false,
            wrapAround: true,
            watchCSS: true,
            selectedAttraction: 0.05,
            friction: 0.8,
            initialIndex: 0,
          });

          if (this.flkty) {
            this.flkty.select(0);

            this.flktyNav.on('change', (index) => this.flkty.select(index));
          }
        }
      } else if (sliderInitialized) {
        this.flktyNav.destroy();
        slides[0].classList.add(classes$C.isSelected);

        if (this.flkty) {
          this.flkty.select(0);
        }
      }
    }

    onBlockSelect(evt) {
      if (!this.slideshowNav) return;
      const slide = this.slideshowNav.querySelector(`[${attributes$7.slideData}="${evt.detail.blockId}"]`);
      const slideIndex = parseInt(slide.getAttribute(attributes$7.slideIndex));

      if (this.slideshowNav.classList.contains(classes$C.flickityEnabled)) {
        this.flktyNav.select(slideIndex);
        this.flktyNav.stopPlayer();
        this.slideshowNav.classList.add(classes$C.isSelected);
      } else {
        slide.dispatchEvent(new Event('click'));
      }
    }

    onBlockDeselect() {
      if (this.slideshowNav && this.slideshowNav.classList.contains(classes$C.flickityEnabled)) {
        this.flktyNav.playPlayer();
        this.slideshowNav.classList.remove(classes$C.isSelected);
      }
    }

    onUnload() {
      if (!this.slideshowNav) return;
      const sliderInitialized = this.slideshowNav.classList.contains(classes$C.flickityEnabled);
      if (sliderInitialized) {
        this.flktyNav.destroy();
      }

      if (this.flkty) {
        this.flkty.destroy();
      }

      document.removeEventListener('theme:resize', this.setSlideshowNavStateOnResize);
    }
  }

  const LogoListSection = {
    onLoad() {
      sections$o[this.id] = new LogoList(this);
    },
    onUnload(e) {
      sections$o[this.id].onUnload(e);
    },
    onBlockSelect(e) {
      sections$o[this.id].onBlockSelect(e);
    },
    onBlockDeselect(e) {
      sections$o[this.id].onBlockDeselect(e);
    },
  };

  register('logos', [LogoListSection, blockScroll]);

  const selectors$Q = {
    videoPlay: '[data-video-play]',
    videoPlayValue: 'data-video-play',
  };

  class VideoPlay {
    constructor(section, selector = selectors$Q.videoPlay, selectorValue = selectors$Q.videoPlayValue) {
      this.container = section;
      this.videoPlay = this.container.querySelectorAll(selector);

      if (this.videoPlay.length) {
        this.videoPlay.forEach((element) => {
          element.addEventListener('click', (e) => {
            const button = e.currentTarget;
            if (button.hasAttribute(selectorValue) && button.getAttribute(selectorValue).trim() !== '') {
              e.preventDefault();

              const items = [
                {
                  html: button.getAttribute(selectorValue),
                },
              ];

              new LoadPhotoswipe(items);
              window.accessibility.lastElement = button;
            }
          });
        });
      }
    }
  }

  const videoPlay = {
    onLoad() {
      new VideoPlay(this.container);
    },
  };

  /**
   * FeaturedVideo Template Script
   * ------------------------------------------------------------------------------
   * A file that contains scripts highly couple code to the FeaturedVideo template.
   *
   * @namespace FeaturedVideo
   */

  const selectors$R = {
    video: '[data-video-id]',
  };

  const sections$p = {};

  /**
   * Video section constructor.
   * @param {string} container - selector for the section container DOM element
   */
  class Video$1 {
    constructor(section) {
      this.section = section;
      this.container = section.container;
      this.video = this.container.querySelector(selectors$R.video);
      this.init();
    }

    init() {
      if (this.video) {
        // Force video autoplay on iOS when Low Power Mode is On
        this.container.addEventListener('touchstart', () => {
          this.video.play();
        });
      }
    }
  }

  const videoSection = {
    onLoad() {
      sections$p[this.id] = new Video$1(this);
    },
  };

  register('featured-video', [videoSection, videoPlay, parallaxHero]);

  register('slideshow', [slider, parallaxHero]);

  const selectors$S = {
    imagesHolder: '[data-images-holder]',
    imageHolder: '[data-image-holder]',
    imageElement: '[data-image-element]',
    imagesButton: '[data-images-button]',
    dataStartPosition: 'data-start-position',
  };

  const sections$q = {};

  class CompareImages {
    constructor(section) {
      this.imagesHolder = section;

      if (this.imagesHolder) {
        this.imageHolder = this.imagesHolder.querySelector(selectors$S.imageHolder);
        this.imageElement = this.imagesHolder.querySelector(selectors$S.imageElement);
        this.imagesButton = this.imagesHolder.querySelector(selectors$S.imagesButton);
        this.startPosition = this.imagesHolder.hasAttribute(selectors$S.dataStartPosition) ? this.imagesHolder.getAttribute(selectors$S.dataStartPosition) : 0;
        this.startX = 0;
        this.x = 0;
        this.changeValuesEvent = (event) => this.changeValues(event);
        this.onMoveEvent = (event) => this.onMove(event);
        this.onStopEvent = (event) => this.onStop(event);
        this.onStartEvent = (event) => this.onStart(event);

        this.init();
        document.addEventListener('theme:resize', this.changeValuesEvent);
      }
    }

    init() {
      this.changeValues();
      this.imagesButton.addEventListener('mousedown', this.onStartEvent);
      this.imagesButton.addEventListener('touchstart', this.onStartEvent);
    }

    changeValues(event) {
      const imagesHolderWidth = this.imagesHolder.offsetWidth;
      const buttonWidth = this.imagesButton.offsetWidth;

      if (!event || (event && event.type !== 'touchmove' && event.type !== 'mousemove')) {
        this.imageElement.style.width = `${imagesHolderWidth}px`;
        this.imageHolder.style.width = `${100 - parseInt(this.startPosition)}%`;

        if (this.startPosition !== 0) {
          const newButtonPositionPixels = (imagesHolderWidth * parseInt(this.startPosition)) / 100;
          this.x = newButtonPositionPixels - buttonWidth / 2;
        }
      }

      if (this.x > imagesHolderWidth - buttonWidth) {
        this.x = imagesHolderWidth - buttonWidth;
      } else if (this.x < 0) {
        this.x = 0;
      }

      this.imagesButton.style.left = `${(this.x / imagesHolderWidth) * 100}%`;
      this.imageHolder.style.width = `${100 - ((this.x + buttonWidth / 2) / imagesHolderWidth) * 100}%`;
    }

    onStart(event) {
      event.preventDefault();
      let eventTouch = event;

      if (event.touches) {
        eventTouch = event.touches[0];
      }

      this.x = this.imagesButton.offsetLeft;
      this.startX = eventTouch.pageX - this.x;

      this.imagesHolder.addEventListener('mousemove', this.onMoveEvent);
      this.imagesHolder.addEventListener('mouseup', this.onStopEvent);
      this.imagesHolder.addEventListener('touchmove', this.onMoveEvent);
      this.imagesHolder.addEventListener('touchend', this.onStopEvent);
    }

    onMove(event) {
      let eventTouch = event;

      if (event.touches) {
        eventTouch = event.touches[0];
      }

      this.x = eventTouch.pageX - this.startX;

      this.changeValues(event);
    }

    onStop(event) {
      this.imagesHolder.removeEventListener('mousemove', this.onMoveEvent);
      this.imagesHolder.removeEventListener('mouseup', this.onStopEvent);
      this.imagesHolder.removeEventListener('touchmove', this.onMoveEvent);
      this.imagesHolder.removeEventListener('touchend', this.onStopEvent);
    }

    onUnload() {
      if (this.changeValuesEvent) {
        document.removeEventListener('theme:resize', this.changeValuesEvent);
      }
    }
  }

  const compareImages = {
    onLoad() {
      sections$q[this.id] = [];
      const els = this.container.querySelectorAll(selectors$S.imagesHolder);
      els.forEach((el) => {
        sections$q[this.id].push(new CompareImages(el));
      });
    },
    onUnload() {
      sections$q[this.id].forEach((el) => {
        if (typeof el.onUnload === 'function') {
          el.onUnload();
        }
      });
    },
  };

  register('custom-content', [slider, videoPlay, parallaxHero, swatchGridSection, compareImages, newsletterCheckForResultSection, siblings]);

  if (!customElements.get('quick-add-product')) {
    customElements.define('quick-add-product', QuickAddProduct);
  }

  var styles = {};
  styles.basic = [];

  styles.light = [
    {featureType: 'administrative', elementType: 'labels', stylers: [{visibility: 'simplified'}, {lightness: '64'}, {hue: '#ff0000'}]},
    {featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{color: '#bdbdbd'}]},
    {featureType: 'administrative', elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
    {featureType: 'landscape', elementType: 'all', stylers: [{color: '#f0f0f0'}, {visibility: 'simplified'}]},
    {featureType: 'landscape.natural.landcover', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'landscape.natural.terrain', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'poi', elementType: 'geometry.fill', stylers: [{visibility: 'off'}]},
    {featureType: 'poi', elementType: 'labels', stylers: [{lightness: '100'}]},
    {featureType: 'poi.park', elementType: 'all', stylers: [{visibility: 'on'}]},
    {featureType: 'poi.park', elementType: 'geometry', stylers: [{saturation: '-41'}, {color: '#e8ede7'}]},
    {featureType: 'poi.park', elementType: 'labels', stylers: [{visibility: 'off'}]},
    {featureType: 'road', elementType: 'all', stylers: [{saturation: '-100'}]},
    {featureType: 'road', elementType: 'labels', stylers: [{lightness: '25'}, {gamma: '1.06'}, {saturation: '-100'}]},
    {featureType: 'road.highway', elementType: 'all', stylers: [{visibility: 'simplified'}]},
    {featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{gamma: '10.00'}]},
    {featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{weight: '0.01'}, {visibility: 'simplified'}]},
    {featureType: 'road.highway', elementType: 'labels', stylers: [{visibility: 'off'}]},
    {featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{weight: '0.01'}]},
    {featureType: 'road.highway', elementType: 'labels.text.stroke', stylers: [{weight: '0.01'}]},
    {featureType: 'road.arterial', elementType: 'geometry.fill', stylers: [{weight: '0.8'}]},
    {featureType: 'road.arterial', elementType: 'geometry.stroke', stylers: [{weight: '0.01'}]},
    {featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
    {featureType: 'road.local', elementType: 'geometry.fill', stylers: [{weight: '0.01'}]},
    {featureType: 'road.local', elementType: 'geometry.stroke', stylers: [{gamma: '10.00'}, {lightness: '100'}, {weight: '0.4'}]},
    {featureType: 'road.local', elementType: 'labels', stylers: [{visibility: 'simplified'}, {weight: '0.01'}, {lightness: '39'}]},
    {featureType: 'road.local', elementType: 'labels.text.stroke', stylers: [{weight: '0.50'}, {gamma: '10.00'}, {lightness: '100'}]},
    {featureType: 'transit', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'water', elementType: 'all', stylers: [{color: '#cfe5ee'}, {visibility: 'on'}]},
  ];

  styles.white_label = [
    {featureType: 'all', elementType: 'all', stylers: [{visibility: 'simplified'}]},
    {featureType: 'all', elementType: 'labels', stylers: [{visibility: 'simplified'}]},
    {featureType: 'administrative', elementType: 'labels', stylers: [{gamma: '3.86'}, {lightness: '100'}]},
    {featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{color: '#cccccc'}]},
    {featureType: 'landscape', elementType: 'all', stylers: [{color: '#f2f2f2'}]},
    {featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'road', elementType: 'all', stylers: [{saturation: -100}, {lightness: 45}]},
    {featureType: 'road.highway', elementType: 'all', stylers: [{visibility: 'simplified'}]},
    {featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{weight: '0.8'}]},
    {featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{weight: '0.8'}]},
    {featureType: 'road.highway', elementType: 'labels', stylers: [{visibility: 'off'}]},
    {featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{weight: '0.8'}]},
    {featureType: 'road.highway', elementType: 'labels.text.stroke', stylers: [{weight: '0.01'}]},
    {featureType: 'road.arterial', elementType: 'geometry.stroke', stylers: [{weight: '0'}]},
    {featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
    {featureType: 'road.local', elementType: 'geometry.stroke', stylers: [{weight: '0.01'}]},
    {featureType: 'road.local', elementType: 'labels.text', stylers: [{visibility: 'off'}]},
    {featureType: 'transit', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'water', elementType: 'all', stylers: [{color: '#e4e4e4'}, {visibility: 'on'}]},
  ];

  styles.dark_label = [
    {featureType: 'all', elementType: 'labels', stylers: [{visibility: 'off'}]},
    {featureType: 'all', elementType: 'labels.text.fill', stylers: [{saturation: 36}, {color: '#000000'}, {lightness: 40}]},
    {featureType: 'all', elementType: 'labels.text.stroke', stylers: [{visibility: 'on'}, {color: '#000000'}, {lightness: 16}]},
    {featureType: 'all', elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
    {featureType: 'administrative', elementType: 'geometry.fill', stylers: [{color: '#000000'}, {lightness: 20}]},
    {featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{color: '#000000'}, {lightness: 17}, {weight: 1.2}]},
    {featureType: 'administrative', elementType: 'labels', stylers: [{visibility: 'simplified'}, {lightness: '-82'}]},
    {featureType: 'administrative', elementType: 'labels.text.stroke', stylers: [{invert_lightness: true}, {weight: '7.15'}]},
    {featureType: 'landscape', elementType: 'geometry', stylers: [{color: '#000000'}, {lightness: 20}]},
    {featureType: 'landscape', elementType: 'labels', stylers: [{visibility: 'off'}]},
    {featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'poi', elementType: 'geometry', stylers: [{color: '#000000'}, {lightness: 21}]},
    {featureType: 'road', elementType: 'labels', stylers: [{visibility: 'simplified'}]},
    {featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{color: '#000000'}, {lightness: 17}, {weight: '0.8'}]},
    {featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{color: '#000000'}, {lightness: 29}, {weight: '0.01'}]},
    {featureType: 'road.highway', elementType: 'labels', stylers: [{visibility: 'off'}]},
    {featureType: 'road.arterial', elementType: 'geometry', stylers: [{color: '#000000'}, {lightness: 18}]},
    {featureType: 'road.arterial', elementType: 'geometry.stroke', stylers: [{weight: '0.01'}]},
    {featureType: 'road.local', elementType: 'geometry', stylers: [{color: '#000000'}, {lightness: 16}]},
    {featureType: 'road.local', elementType: 'geometry.stroke', stylers: [{weight: '0.01'}]},
    {featureType: 'road.local', elementType: 'labels', stylers: [{visibility: 'off'}]},
    {featureType: 'transit', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'transit', elementType: 'geometry', stylers: [{color: '#000000'}, {lightness: 19}]},
    {featureType: 'water', elementType: 'geometry', stylers: [{color: '#000000'}, {lightness: 17}]},
  ];

  function mapStyle(key) {
    return styles[key];
  }

  window.theme.allMaps = window.theme.allMaps || {};
  let allMaps = window.theme.allMaps;

  window.theme.mapAPI = window.theme.mapAPI || null;

  /* global google */

  class Map {
    constructor(section) {
      this.container = section.container;
      this.mapContainer = this.container.querySelector('[data-map-container]');
      this.key = this.container.getAttribute('data-api-key');
      this.styleString = this.container.getAttribute('data-style') || '';
      this.zoomString = this.container.getAttribute('data-zoom') || 14;
      this.address = this.container.getAttribute('data-address');
      this.enableCorrection = this.container.getAttribute('data-latlong-correction');
      this.lat = this.container.getAttribute('data-lat');
      this.long = this.container.getAttribute('data-long');

      if (this.key) {
        this.initMaps();
      }
    }

    initMaps() {
      const apiLoaded = loadAPI(this.key);
      apiLoaded
        .then(() => {
          return this.enableCorrection === 'true' && this.lat !== '' && this.long !== '' ? new google.maps.LatLng(this.lat, this.long) : geocodeAddressPromise(this.address);
        })
        .then((center) => {
          const zoom = parseInt(this.zoomString, 10);
          const styles = mapStyle(this.styleString);
          const mapOptions = {
            zoom,
            styles,
            center,
            draggable: true,
            clickableIcons: false,
            scrollwheel: false,
            zoomControl: false,
            disableDefaultUI: true,
          };
          const map = createMap(this.mapContainer, mapOptions);

          return map;
        })
        .then((map) => {
          this.map = map;
          allMaps[this.id] = map;
        })
        .catch((e) => {
          console.log('Failed to load Google Map');
          console.log(e);
        });
    }

    unload() {
      if (typeof window.google !== 'undefined') {
        google.maps.event.clearListeners(this.map, 'resize');
      }
    }
  }

  const mapSection = {
    onLoad() {
      allMaps[this.id] = new Map(this);
    },
    onUnload() {
      if (typeof allMaps[this.id].unload === 'function') {
        allMaps[this.id].unload();
      }
    },
  };

  register('map', mapSection);

  function loadAPI(key) {
    if (window.theme.mapAPI === null) {
      const urlKey = `https://maps.googleapis.com/maps/api/js?key=${key}`;
      window.theme.mapAPI = loadScript({url: urlKey});
    }
    return window.theme.mapAPI;
  }

  function createMap(container, options) {
    var map = new google.maps.Map(container, options);
    var center = map.getCenter();

    // eslint-disable-next-line no-unused-vars
    var marker = new google.maps.Marker({
      map: map,
      position: center,
    });

    google.maps.event.addDomListener(window, 'resize', function () {
      google.maps.event.trigger(map, 'resize');
      map.setCenter(center);
    });
    return map;
  }

  function geocodeAddressPromise(address) {
    return new Promise((resolve, reject) => {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({address: address}, function (results, status) {
        if (status == 'OK') {
          var latLong = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          resolve(latLong);
        } else {
          reject(status);
        }
      });
    });
  }

  register('search', [swatchGridSection, siblings]);

  if (!customElements.get('quick-add-product')) {
    customElements.define('quick-add-product', QuickAddProduct);
  }

  const selectors$T = {
    largePromo: '[data-large-promo]',
    largePromoInner: '[data-large-promo-inner]',
    trackingInner: '[data-tracking-consent-inner]',
    tracking: '[data-tracking-consent]',
    trackingAccept: '[data-confirm-cookies]',
    close: '[data-close-modal]',
    modalUnderlay: '[data-modal-underlay]',
    modalBody: '[data-modal-body]',
    newsletterPopup: '[data-newsletter]',
    newsletterPopupHolder: '[data-newsletter-holder]',
    newsletterClose: '[data-newsletter-close]',
    newsletterHeading: '[data-newsletter-heading]',
    newsletterField: '[data-newsletter-field]',
    promoPopup: '[data-promo-text]',
    newsletterForm: '[data-newsletter-form]',
    delayAttribite: 'data-popup-delay',
    cookieNameAttribute: 'data-cookie-name',
    dataTargetReferrer: 'data-target-referrer',
  };

  const classes$D = {
    hide: 'hide',
    hasValue: 'has-value',
    success: 'has-success',
    selected: 'selected',
    hasBlockSelected: 'has-block-selected',
    mobile: 'mobile',
    desktop: 'desktop',
  };

  const attributes$8 = {
    enable: 'data-enable',
  };

  let sections$r = {};

  class DelayShow {
    constructor(holder, element, callback = null) {
      this.element = element;
      this.delay = holder.getAttribute(selectors$T.delayAttribite);
      this.isSubmitted = window.location.href.indexOf('accepts_marketing') !== -1 || window.location.href.indexOf('customer_posted=true') !== -1;
      this.callback = callback;
      this.showPopupOnScrollEvent = () => this.showPopupOnScroll();

      if (this.delay === 'always' || this.isSubmitted) {
        this.always();
      }

      if (this.delay && this.delay.includes('delayed') && !this.isSubmitted) {
        const seconds = this.delay.includes('_') ? parseInt(this.delay.split('_')[1]) : 10;
        this.delayed(seconds);
      }

      if (this.delay === 'bottom' && !this.isSubmitted) {
        this.bottom();
      }

      if (this.delay === 'idle' && !this.isSubmitted) {
        this.idle();
      }
    }

    always() {
      fadeIn(this.element, null, this.callback);
    }

    delayed(seconds = 10) {
      // Show popup after specific seconds
      setTimeout(() => {
        fadeIn(this.element, null, this.callback);
      }, seconds * 1000);
    }

    // Idle for 1 min
    idle() {
      let timer = 0;
      let idleTime = 60000;
      const documentEvents = ['mousemove', 'mousedown', 'click', 'touchmove', 'touchstart', 'touchend', 'keydown', 'keypress'];
      const windowEvents = ['load', 'resize', 'scroll'];

      const startTimer = () => {
        timer = setTimeout(() => {
          timer = 0;
          fadeIn(this.element, null, this.callback);
        }, idleTime);

        documentEvents.forEach((eventType) => {
          document.addEventListener(eventType, resetTimer);
        });

        windowEvents.forEach((eventType) => {
          window.addEventListener(eventType, resetTimer);
        });
      };

      const resetTimer = () => {
        if (timer) {
          clearTimeout(timer);
        }

        documentEvents.forEach((eventType) => {
          document.removeEventListener(eventType, resetTimer);
        });

        windowEvents.forEach((eventType) => {
          window.removeEventListener(eventType, resetTimer);
        });

        startTimer();
      };

      startTimer();
    }

    // Scroll to the bottom of the page
    bottom() {
      document.addEventListener('theme:scroll', this.showPopupOnScrollEvent);
    }

    showPopupOnScroll() {
      if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
        fadeIn(this.element, null, this.callback);
        document.removeEventListener('theme:scroll', this.showPopupOnScrollEvent);
      }
    }

    onUnload() {
      document.removeEventListener('theme:scroll', this.showPopupOnScrollEvent);
    }
  }

  class TargetReferrer {
    constructor(el) {
      this.el = el;
      this.locationPath = location.href;

      if (!this.el.hasAttribute(selectors$T.dataTargetReferrer)) {
        return false;
      }

      this.init();
    }

    init() {
      if (this.locationPath.indexOf(this.el.getAttribute(selectors$T.dataTargetReferrer)) === -1 && !window.Shopify.designMode) {
        this.el.parentNode.removeChild(this.el);
      }
    }
  }

  class LargePopup {
    constructor(el) {
      this.popup = el;
      this.modal = this.popup.querySelector(selectors$T.largePromoInner);
      this.modalBody = this.popup.querySelector(selectors$T.modalBody);
      this.close = this.popup.querySelector(selectors$T.close);
      this.underlay = this.popup.querySelector(selectors$T.modalUnderlay);
      this.form = this.popup.querySelector(selectors$T.newsletterForm);
      this.cookie = new PopupCookie(this.popup.getAttribute(selectors$T.cookieNameAttribute), 'user_has_closed');
      this.isTargeted = new TargetReferrer(this.popup);
      this.a11y = a11y;

      this.init();
    }

    init() {
      const cookieExists = this.cookie.read() !== false;
      const targetMobile = this.popup.classList.contains(classes$D.mobile);
      const targetDesktop = this.popup.classList.contains(classes$D.desktop);
      let targetMatches = true;

      if ((targetMobile && window.innerWidth >= theme.sizes.small) || (targetDesktop && window.innerWidth < theme.sizes.small)) {
        targetMatches = false;
      }

      if (!targetMatches) {
        this.scrollUnlock();
        return;
      }

      if (!cookieExists || window.Shopify.designMode) {
        if (!window.Shopify.designMode) {
          new DelayShow(this.popup, this.modal, () => this.scrollLock());
        }

        if (this.form && this.form.classList.contains(classes$D.success)) {
          this.checkForSuccess();
        }

        this.initClosers();
      }
    }

    checkForSuccess() {
      fadeIn(this.modal, null, () => this.scrollLock());
      this.cookie.write();
    }

    initClosers() {
      this.close.addEventListener('click', this.closeModal.bind(this));
      this.underlay.addEventListener('click', this.closeModal.bind(this));
    }

    closeModal(e) {
      e.preventDefault();
      fadeOut(this.modal);
      this.cookie.write();
      this.scrollUnlock();
    }

    scrollLock() {
      if (window.getComputedStyle(this.popup).display !== 'none') {
        this.a11y.trapFocus(this.modal);
        document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.modalBody}));
      }
    }

    scrollUnlock() {
      this.a11y.removeTrapFocus();
      document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
    }

    onBlockSelect(evt) {
      if (this.popup.contains(evt.target)) {
        fadeIn(this.modal, null, () => this.scrollLock());
        this.popup.classList.add(classes$D.selected);
        this.popup.parentNode.classList.add(classes$D.hasBlockSelected);
      }
    }

    onBlockDeselect(evt) {
      if (this.popup.contains(evt.target)) {
        fadeOut(this.modal);
        this.scrollUnlock();
        this.popup.classList.remove(classes$D.selected);
        this.popup.parentNode.classList.remove(classes$D.hasBlockSelected);
      }
    }
  }

  class Tracking {
    constructor(el) {
      this.popup = el;
      this.modal = document.querySelector(selectors$T.tracking);
      this.acceptButton = this.modal.querySelector(selectors$T.trackingAccept);
      this.enable = this.modal.getAttribute(attributes$8.enable) === 'true';
      this.showPopup = false;

      window.Shopify.loadFeatures(
        [
          {
            name: 'consent-tracking-api',
            version: '0.1',
          },
        ],
        (error) => {
          if (error) {
            throw error;
          }

          const userCanBeTracked = window.Shopify.customerPrivacy.userCanBeTracked();
          const userTrackingConsent = window.Shopify.customerPrivacy.getTrackingConsent();

          this.showPopup = !userCanBeTracked && userTrackingConsent === 'no_interaction' && this.enable;

          if (window.Shopify.designMode) {
            this.showPopup = true;
          }

          this.init();
        }
      );
    }

    init() {
      if (this.showPopup) {
        fadeIn(this.modal);
      }

      this.clickEvents();
    }

    clickEvents() {
      this.acceptButton.addEventListener('click', (event) => {
        event.preventDefault();

        window.Shopify.customerPrivacy.setTrackingConsent(true, () => fadeOut(this.modal));

        document.documentElement.style.setProperty('--cookie-bar-height', '0px');
      });

      document.addEventListener('trackingConsentAccepted', () => {
        // trackingConsentAccepted event fired
      });
    }

    onBlockSelect(evt) {
      if (this.popup.contains(evt.target) && this.showPopup) {
        fadeIn(this.modal);
        this.popup.classList.add(classes$D.selected);
        this.popup.parentNode.classList.add(classes$D.hasBlockSelected);
      }
    }

    onBlockDeselect(evt) {
      if (this.popup.contains(evt.target)) {
        fadeOut(this.modal);
        this.popup.classList.remove(classes$D.selected);
        this.popup.parentNode.classList.remove(classes$D.hasBlockSelected);
      }
    }
  }

  class PromoText {
    constructor(el) {
      this.popup = el;
      this.close = this.popup.querySelector(selectors$T.close);
      this.cookie = new PopupCookie(this.popup.getAttribute(selectors$T.cookieNameAttribute), 'user_has_closed');
      this.isTargeted = new TargetReferrer(this.popup);

      this.init();
    }

    init() {
      const cookieExists = this.cookie.read() !== false;

      if (!cookieExists || window.Shopify.designMode) {
        if (!window.Shopify.designMode) {
          new DelayShow(this.popup, this.popup);
        } else {
          fadeIn(this.popup);
        }

        this.clickEvents();
      }
    }

    clickEvents() {
      this.close.addEventListener('click', (event) => {
        event.preventDefault();

        fadeOut(this.popup);
        this.cookie.write();
      });
    }

    onBlockSelect(evt) {
      if (this.popup.contains(evt.target)) {
        fadeIn(this.popup);
        this.popup.classList.add(classes$D.selected);
        this.popup.parentNode.classList.add(classes$D.hasBlockSelected);
      }
    }

    onBlockDeselect(evt) {
      if (this.popup.contains(evt.target)) {
        fadeOut(this.popup);
        this.popup.classList.remove(classes$D.selected);
        this.popup.parentNode.classList.remove(classes$D.hasBlockSelected);
      }
    }
  }

  class NewsletterPopup {
    constructor(el) {
      this.popup = el;
      this.holder = this.popup.querySelector(selectors$T.newsletterPopupHolder);
      this.close = this.popup.querySelector(selectors$T.newsletterClose);
      this.heading = this.popup.querySelector(selectors$T.newsletterHeading);
      this.newsletterField = this.popup.querySelector(selectors$T.newsletterField);
      this.cookie = new PopupCookie(this.popup.getAttribute(selectors$T.cookieNameAttribute), 'newsletter_is_closed');
      this.form = this.popup.querySelector(selectors$T.newsletterForm);
      this.isTargeted = new TargetReferrer(this.popup);
      this.resetClassTimer = 0;

      this.init();
    }

    init() {
      const cookieExists = this.cookie.read() !== false;
      const submissionSuccess = window.location.search.indexOf('?customer_posted=true') !== -1;

      if (submissionSuccess) {
        this.delay = 0;
      }

      if (!cookieExists || window.Shopify.designMode) {
        this.show();

        if (this.form.classList.contains(classes$D.success)) {
          this.checkForSuccess();
        }
      }
    }

    show() {
      if (!window.Shopify.designMode) {
        new DelayShow(this.popup, this.holder);
      } else {
        fadeIn(this.holder);
      }

      this.showForm();
      this.inputField();
      this.closePopup();
    }

    checkForSuccess() {
      fadeIn(this.holder);
      this.cookie.write();
    }

    showForm() {
      this.heading.addEventListener('click', (event) => {
        event.preventDefault();

        this.heading.classList.add(classes$D.hide);
        this.form.classList.remove(classes$D.hide);
        this.newsletterField.focus();
      });

      this.heading.addEventListener('keyup', (event) => {
        if (event.keyCode === window.theme.keyboardKeys.ENTER) {
          this.heading.dispatchEvent(new Event('click'));
        }
      });
    }

    closePopup() {
      this.close.addEventListener('click', (event) => {
        event.preventDefault();

        fadeOut(this.holder);
        this.cookie.write();
      });
    }

    inputField() {
      const setClass = () => {
        // Reset timer if exists and is active
        if (this.resetClassTimer) {
          clearTimeout(this.resetClassTimer);
        }

        if (this.newsletterField.value !== '') {
          this.holder.classList.add(classes$D.hasValue);
        }
      };

      const unsetClass = () => {
        // Reset timer if exists and is active
        if (this.resetClassTimer) {
          clearTimeout(this.resetClassTimer);
        }

        // Reset class
        this.resetClassTimer = setTimeout(() => {
          this.holder.classList.remove(classes$D.hasValue);
        }, 2000);
      };

      this.newsletterField.addEventListener('input', setClass);
      this.newsletterField.addEventListener('focus', setClass);
      this.newsletterField.addEventListener('focusout', unsetClass);
    }

    onBlockSelect(evt) {
      if (this.popup.contains(evt.target)) {
        fadeIn(this.holder);
        this.popup.classList.add(classes$D.selected);
        this.popup.parentNode.classList.add(classes$D.hasBlockSelected);
      }
    }

    onBlockDeselect(evt) {
      if (this.popup.contains(evt.target)) {
        fadeOut(this.holder);
        this.popup.classList.remove(classes$D.selected);
        this.popup.parentNode.classList.remove(classes$D.hasBlockSelected);
      }
    }
  }

  const popupSection = {
    onLoad() {
      sections$r[this.id] = [];

      const newsletters = this.container.querySelectorAll(selectors$T.largePromo);
      newsletters.forEach((el) => {
        sections$r[this.id].push(new LargePopup(el));
      });

      const tracking = this.container.querySelectorAll(selectors$T.tracking);
      tracking.forEach((el) => {
        sections$r[this.id].push(new Tracking(el));
      });

      const newsletterPopup = this.container.querySelectorAll(selectors$T.newsletterPopup);
      newsletterPopup.forEach((el) => {
        sections$r[this.id].push(new NewsletterPopup(el));
      });

      const promoPopup = this.container.querySelectorAll(selectors$T.promoPopup);
      promoPopup.forEach((el) => {
        sections$r[this.id].push(new PromoText(el));
      });
    },
    onBlockSelect(evt) {
      sections$r[this.id].forEach((el) => {
        if (typeof el.onBlockSelect === 'function') {
          el.onBlockSelect(evt);
        }
      });
    },
    onBlockDeselect(evt) {
      sections$r[this.id].forEach((el) => {
        if (typeof el.onBlockDeselect === 'function') {
          el.onBlockDeselect(evt);
        }
      });
    },
  };

  register('popups', [popupSection, newsletterCheckForResultSection]);

  const selectors$U = {
    loginToggle: '#AdminLoginToggle',
    newsletterToggle: '#NewsletterToggle',
    login: '#AdminLogin',
    signup: '#CustomerSignup',
    errors: '.errors',
    contactErrors: '#contact_form .errors',
    loginErrors: '#login_form .errors',
  };

  class Password {
    constructor(section) {
      this.container = section.container;
      this.loginToggle = this.container.querySelector(selectors$U.loginToggle);
      this.newsletterToggle = this.container.querySelector(selectors$U.newsletterToggle);
      this.login = this.container.querySelector(selectors$U.login);
      this.signup = this.container.querySelector(selectors$U.signup);
      this.errors = this.container.querySelector(selectors$U.errors);
      this.contactErrors = this.container.querySelector(selectors$U.contactErrors);
      this.loginErrors = this.container.querySelector(selectors$U.loginErrors);
      this.init();
    }

    init() {
      this.loginToggle.addEventListener('click', (e) => {
        e.preventDefault();
        slideDown(this.login);
        hideElement(this.signup);
        if (this.errors) {
          hideElement(this.errors);
        }
      });

      this.newsletterToggle.addEventListener('click', (e) => {
        e.preventDefault();
        hideElement(this.login);
        slideDown(this.signup);
        if (this.errors) {
          hideElement(this.errors);
        }
      });

      if (this.contactErrors) {
        hideElement(this.login);
        slideDown(this.signup);
      }

      if (this.loginErrors) {
        slideDown(this.login);
        hideElement(this.signup);
      }
    }
  }

  const passwordSection = {
    onLoad() {
      new Password(this);
    },
  };

  register('password-template', passwordSection);

  register('faq', accordions);

  register('list-collections', [slider, swatchGridSection, blockScroll, siblings]);

  if (!customElements.get('quick-add-product')) {
    customElements.define('quick-add-product', QuickAddProduct);
  }

  register('columns-with-image', [slider, blockScroll, videoPlay]);

  register('newsletter', newsletterCheckForResultSection);

  register('before-after', [compareImages]);

  register('sidebar', [accordions, scrollToElement]);

  document.addEventListener('DOMContentLoaded', function () {
    // Load all registered sections on the page.
    load('*');

    // Scroll to top button
    const scrollTopButton = document.querySelector('[data-scroll-top-button]');
    if (scrollTopButton) {
      scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      });
      document.addEventListener('theme:scroll', () => {
        scrollTopButton.classList.toggle('is-visible', window.pageYOffset > window.innerHeight);
      });
    }

    if (window.self !== window.top) {
      document.querySelector('html').classList.add('iframe');
    }

    // Safari smoothscroll polyfill
    let hasNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    if (!hasNativeSmoothScroll) {
      loadScript({url: window.theme.assets.smoothscroll});
    }
  });

  // Apply a specific class to the html element for browser support of cookies.
  if (window.navigator.cookieEnabled) {
    document.documentElement.className = document.documentElement.className.replace('supports-no-cookies', 'supports-cookies');
  }

}(themeVendor.AOS, themeVendor.BodyScrollLock, themeVendor.themeAddresses, themeVendor.themeCurrency, themeVendor.Sqrl, themeVendor.Flickity, themeVendor.FlickityFade, themeVendor.Rellax, themeVendor.MicroModal, themeVendor.themeImages));
//# sourceMappingURL=theme.js.map
