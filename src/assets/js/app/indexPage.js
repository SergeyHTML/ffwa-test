document.addEventListener('click', function (event) {
    switchNav(event);
});

function switchNav(event) {
    if (event.target.classList.contains('select-fonts__nav-link') && !event.target.classList.contains('select-fonts__nav-link active')) {
        event.preventDefault();
        event.stopPropagation();

        const element = event.target;
        const idTab = element.getAttribute('href');
        const thisNav = element.closest('.select-fonts__nav-list');
        const idTabsContainer = thisNav.getAttribute('data-nav-for');
        const tabsContainer = document.querySelector('#'+idTabsContainer);

        thisNav.querySelector('.select-fonts__nav-link.active').classList.remove('active');
        element.classList.add('active');
        tabsContainer.querySelector('.select-fonts__tab.active').classList.remove('active');
        tabsContainer.querySelector(idTab).classList.add('active')
    }
}

function parseUrl(urlString) {
    const url = document.createElement('a');
    url.href = urlString;

    return url;
}



let obj = parseUrl('http://ffwagency.com/do/any.php?a=1#foo');
console.log(obj.hash);
console.log(obj.hostname);
console.log(obj.pathname);