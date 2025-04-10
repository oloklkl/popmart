let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// 🔍 검색 모달
function toggleSearch() {
    const searchModal = document.getElementById('modal-overlay');
    const searchBox = document.getElementById('search-box');

    if (!searchModal || !searchBox) return;

    const isOpen = searchModal.classList.contains('open');

    if (isOpen) {
        searchModal.classList.remove('open');
        searchBox.classList.remove('open');
        setTimeout(() => {
            searchModal.style.display = 'none';
        }, 300);
    } else {
        searchModal.classList.add('open');
        searchBox.classList.add('open');
        searchModal.style.display = 'block';
    }
}

function closeSearch() {
    const searchModal = document.getElementById('modal-overlay');
    const searchBox = document.getElementById('search-box');
    if (searchModal && searchBox) {
        searchModal.classList.remove('open');
        searchBox.classList.remove('open');
        setTimeout(() => {
            searchModal.style.display = 'none';
        }, 300);
    }
}

// 🙋 마이페이지 메뉴
function toggleUserMenu() {
    const overlay = document.getElementById('modal-overlay-mypage-menu');
    const menu = document.getElementById('mypage-menu');
    const member = document.getElementById('member');
    const nonMember = document.getElementById('non-member');

    if (!overlay || !menu) return;

    const isOpen = overlay.classList.contains('open');

    if (isOpen) {
        overlay.classList.remove('open');
        menu.classList.remove('open');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    } else {
        overlay.classList.add('open');
        menu.classList.add('open');
        overlay.style.display = 'block';

        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (loggedIn) {
            member.style.display = 'block';
            nonMember.style.display = 'none';
        } else {
            member.style.display = 'none';
            nonMember.style.display = 'block';
        }
    }
}

function closeMyPage() {
    const overlay = document.getElementById('modal-overlay-mypage-menu');
    const menu = document.getElementById('mypage-menu');
    if (!overlay || !menu) return;

    overlay.classList.remove('open');
    menu.classList.remove('open');

    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
}

function login() {
    isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    toggleUserMenu();
}

function logout() {
    isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    toggleUserMenu();
}

// ✅ 반드시 window에 등록!
window.toggleSearch = toggleSearch;
window.closeSearch = closeSearch;
window.toggleUserMenu = toggleUserMenu;
window.closeMyPage = closeMyPage;
window.login = login;
window.logout = logout;

// header.js

window.callbackAfterHeaderLoad = function () {
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    const currentURL = currentPath + currentSearch;

    const menuLinks = document.querySelectorAll('.menu-link');

    menuLinks.forEach((link) => {
        const linkURL = new URL(link.href);
        const linkPath = linkURL.pathname;
        const linkSearch = linkURL.search;
        const fullLinkURL = linkPath + linkSearch;

        if (decodeURIComponent(fullLinkURL) === decodeURIComponent(currentURL)) {
            link.classList.add('active');
        }
    });
};
