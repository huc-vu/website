const covers = document.getElementsByClassName("cover");

function showCardInfo(e) {
    // console.log(e.target.parentElement.parentElement.getElementsByClassName('card-info'));
    var cardInfo = e.target.parentElement.parentElement.getElementsByClassName('card-info')[0];
    // cardInfo.style.display = 'absolute';
}

Array.from(covers).forEach(c => {
    c.addEventListener('mouseover', (e) => {
        showCardInfo(e);
    })
});
