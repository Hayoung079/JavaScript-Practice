const select = document.querySelector(".js-select");

const COUNTRY_LS = 'country';

function saveCountry(text) {
    localStorage.setItem(COUNTRY_LS, text);
}

function handleChange(event){
    const option = event.target.value;
    saveCountry(option);
}

function loadCountry() {
    const currentContry = localStorage.getItem(COUNTRY_LS);

    if(currentContry !== null) {
        select.value = currentContry;
    }
}

function init(){
    loadCountry();
    select.addEventListener('change', handleChange);
}

init();