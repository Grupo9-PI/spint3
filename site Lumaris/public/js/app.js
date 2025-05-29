
//linha que faz a navbar grudar
window.onscroll = () => {stickyNav()};



var navbar = document.querySelector('.navbar');
var logoNav = document.querySelector('.logo-img');

function stickyNav() {
    if (window.scrollY > 0) {
        navbar.classList.add("sticky");
        
    } else {
        navbar.classList.remove("sticky");
    }
}