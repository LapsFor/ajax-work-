const btn = document.getElementById('btn');       // Кнопка для запуска запроса
const type = document.getElementById('type');     // Поле выбора валюты (например, 'USD')
const stdate = document.getElementById('stdate'); // Поле выбора начальной даты (календарь)
const exdate = document.getElementById('exdate'); // поле выбора конечной даты (календарь)
const ctx = document.getElementById('exchangeChart'); // таблица 
let exchangeChart = null;

btn.addEventListener("click", function () {
    const stdate_r = stdate.value.replaceAll("-", "");
    const exdate_r = exdate.value.replaceAll("-", "");
    const URI = `https://bank.gov.ua/NBU_Exchange/exchange_site?start=${stdate_r}&end=${exdate_r}&valcode=${type.value}&sort=exchangedate&order=asc&json`;

    const ratesArray = []; //масив для курса валют
    const datesArray = []; // масив для дат

    const XHR = new XMLHttpRequest();
    XHR.open("GET", URI);
    XHR.send();

    XHR.addEventListener("readystatechange", function () {
        if (XHR.readyState === 4) {
            if (XHR.status === 200) {
                const data = JSON.parse(XHR.responseText);
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    ratesArray.push(data[i].rate);
                    datesArray.push(data[i].exchangedate);
                }
                console.log(ratesArray);
                console.log(datesArray)
                if (exchangeChart) {
                    exchangeChart.destroy();
                }
                exchangeChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        // Ось X
                        labels: datesArray,
                        datasets: [{
                            label: 'UAH exchange rate by date',
                            data: ratesArray,
                            borderWidth: 2,
                            borderColor: 'blue'
                        }]
                    }
                });
            } else {
                console.log("Ошибка");
            }
        }
    })
})