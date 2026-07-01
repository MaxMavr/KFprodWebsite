const SCROLL_THRESHOLD = 10;
const SCROLL_DELAY = 50;
const SCROLL_STEP = 15;

const header = document.querySelector('.main-header');
const plug = document.querySelector('.main-header-plug');
const scrollArrow = document.getElementById('scroll-arrow');

if (!header || !plug || !scrollArrow) {
	console.warn('Не найдены необходимые DOM элементы');
}

function initHeader() {
	if (window.location.hash === '#narrow') {
        performSmallScroll();
    }
    
    scrollArrow?.addEventListener('click', performSmallScroll);
    
    window.addEventListener('scroll', throttle(narrowHeader, SCROLL_DELAY));
    
    narrowHeader();
}

function performSmallScroll() {
    window.scrollBy({
        top: SCROLL_STEP,
        behavior: 'smooth'
    });
}

function narrowHeader() {
    if (getScrollY() >= SCROLL_THRESHOLD) {
        header?.classList.add('narrow');
        plug?.classList.add('narrow');
    }
}

const getScrollY = () => window.scrollY || document.documentElement.scrollTop || 0;


function throttle(callback, delay) {
    let timeoutId = null;
    
    return function(...args) {
        if (timeoutId) return;
        
        timeoutId = setTimeout(() => {
            callback.apply(this, args);
            timeoutId = null;
        }, delay);
    };
}

document.addEventListener('DOMContentLoaded', initHeader);
