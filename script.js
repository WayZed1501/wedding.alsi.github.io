// Отправка формы в Google Sheets - РАБОЧАЯ ВЕРСИЯ
const scriptURL = 'https://script.google.com/macros/s/AKfycbyVP0ZyDFz1sd-ud9g33fxXcjXgxm7JQEBCa4hyryKtMKWlVi1vpUfyEJqvaFjdnpTk/exec'; // ВСТАВЬ СЮДА!

document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Собираем данные
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const guests = document.getElementById('guests').value;
    const food = document.getElementById('food').value;
    
    // Показываем, что началась отправка
    const submitButton = this.querySelector('button');
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;
    
    // Создаем скрытую форму для отправки (старый добрый метод)
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = scriptURL;
    form.target = 'hidden_iframe';
    form.style.display = 'none';
    
    // Добавляем поля
    const fields = {
        name: name,
        email: email,
        guests: guests,
        food: food
    };
    
    for (let key in fields) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
    }
    
    // Создаем невидимый iframe для приема ответа
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    
    // Обработчик загрузки iframe
    iframe.onload = function() {
        console.log('Форма отправлена!');
        alert('✅ Спасибо! Ваш ответ отправлен! ❤️');
        document.getElementById('rsvpForm').reset();
        
        // Убираем кнопку отправки
        submitButton.textContent = 'Отправлено!';
        setTimeout(() => {
            submitButton.textContent = 'Отправить';
            submitButton.disabled = false;
        }, 2000);
        
        // Удаляем iframe и форму
        setTimeout(() => {
            document.body.removeChild(iframe);
            document.body.removeChild(form);
        }, 1000);
    };
    
    // Добавляем на страницу и отправляем
    document.body.appendChild(iframe);
    document.body.appendChild(form);
    form.submit();
});