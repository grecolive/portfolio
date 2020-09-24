let btnContent = document.querySelector(".btntoContent");
let topButton = document.querySelector(".top");
let fecha = calculate_age(new Date(1990, 10, 24));

$(function() {
    $('[data-toggle="tooltip"]').tooltip()
});

btnContent.addEventListener("click", () => {
    $('html, body').animate({
        scrollTop: $(".educacion").offset().top - 50
    }, 2000);
});

window.onscroll = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = 'block';
    } else {
        topButton.style.display = 'none';
    }
}

topButton.addEventListener("click", () => {
    $('html, body').animate({
        scrollTop: $("header").offset().top - 50
    }, 2000);
});

function calculate_age(dob) {
    let diff_ms = Date.now() - dob.getTime();
    let age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
document.querySelector('.age').innerHTML = fecha;