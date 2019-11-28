import data from './rubricator.json';
const link = document.getElementById('nav-item-more');
const popup = document.getElementById('nav-item-more-popup');


function openFullscreen() {
    if (this.requestFullscreen) {
        this.requestFullscreen();
    } else if (this.mozRequestFullScreen) { /* Firefox */
        this.mozRequestFullScreen();
    } else if (this.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        this.webkitRequestFullscreen();
    } else if (this.msRequestFullscreen) { /* IE/Edge */
        this.msRequestFullscreen();
    }
}

function linkUrlFromSlug(slug) {
    return window.location + "/" + slug;
}

function fillPopup() {
    popup.innerHTML = '';
    data.forEach(function(category) {
        const node = document.createElement("h3");
        node.innerHTML = category.category;
        popup.appendChild(node);
        for (let item of category.items) {
            const link = document.createElement('a');
            link.innerHTML = item.title;
            link.setAttribute('href', linkUrlFromSlug(item.slug));
            popup.appendChild(link);
        }
    });
    const button = document.createElement('button');
    popup.appendChild(button);
    button.innerHTML = "Full Screen";
    button.addEventListener('click', openFullscreen.bind(popup));
    button.classList.add('btn', 'btn-sm', 'btn-primary');
    
}

function showPopup() {
    popup.style.display = 'block';
    if (!popup.innerHTML) {
        fillPopup();
    }
}

function hidePopup() {
    popup.style.display = 'none';
}

function togglePopup() {
    if (popup.style.display === 'block') {
        hidePopup();
    } else {
        showPopup();
    }
}

if (link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('click');
        togglePopup();
    });
}

