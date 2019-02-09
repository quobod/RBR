/* 
var acc = window.document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        alert('hah');
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
} */

let accordions = document.querySelectorAll('.accordion');

accordions.forEach(function(accordion) {
    accordion.addEventListener('click', function(){
        alert('hah');
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.style.scrollHeight + 'px';
        }
    });
});