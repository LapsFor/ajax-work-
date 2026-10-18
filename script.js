const btn = document.getElementById('btn');       // Кнопка для запуска запроса
const type = document.getElementById('type');     // Поле выбора валюты (например, 'USD')
const stdate = document.getElementById('stdate'); // Поле выбора начальной даты (календарь)
const exdate = document.getElementById('exdate'); // поле выбора конечной даты (календарь)

btn.addEventListener("click", function() {
    const stdate_r = stdate.value.replaceAll("-", "");
    const exdate_r = exdate.value.replaceAll("-", "");
    const URI = `https://bank.gov.ua/NBU_Exchange/exchange_site?start=${stdate_r}&end=${exdate_r}&valcode=${type.value}&sort=exchangedate&order=desc&json`;
    const XHR = new XMLHttpRequest();
    XHR.open("GET", URI);
    XHR.send();

    XHR.addEventListener("readystatechange", function() {
        if (XHR.readyState === 4){
            if (XHR.status === 200) {
                const data = JSON.parse(XHR.responseText);
                console.log(data);
            } else {
                console.log("Ошибка");
            }
        }
    })
        
})