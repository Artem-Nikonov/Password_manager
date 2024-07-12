document.addEventListener('DOMContentLoaded', () => {
    const addRecordButton = document.getElementById('addRecordButton');
    const recordModal = document.getElementById('recordModal');
    const cancelButton = document.getElementById('cancelButton');
    const recordForm = document.getElementById('recordForm');
    const errorsBox = document.getElementById("errors-box");
    const recordsTableBody = document.getElementById('recordsTableBody');
    const searchInput = document.getElementById('searchInput');
    let records = [];

    loadRecords();

    addRecordButton.addEventListener('click', () => {
        recordModal.style.display = 'block';
    });

    cancelButton.addEventListener('click', () => {
        recordModal.style.display = 'none';
        resetForm();
    });

    window.addEventListener('click', (event) => {
        if (event.target == recordModal) {
            recordModal.style.display = 'none';
        }
    });

    //Создание новой записи
    recordForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(recordForm);
        const record = {
            name: formData.get('name'),
            password: formData.get('password'),
            recordType: formData.get('recordType'),
            dateCreated: new Date()
        };

        if (record.recordType === 'email' && !validateEmail(record.name)) {
            errorsBox.textContent = 'Некорректный адрес почты.';
            return;
        }

        const response = await fetch('https://localhost:7198/records', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
        });

        if (response.ok) {
            records.unshift(record);
            updateTable(records);
            recordModal.style.display = 'none';
            resetForm();
        } else {
            errorsBox.textContent = 'Не удалось создать запись.';
        }
    });

    //Фильтрация записей в таблице
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const filteredRecords = records.filter(record =>
            record.name.toLowerCase().includes(filter)
        );
        updateTable(filteredRecords);
    });

    //Проверка корректности адреса почты
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    //Получение всех записей и обновление таблице на их основе
    async function loadRecords() {
        const response = await fetch('/records');
        records = await response.json();
        updateTable(records);
    }

    //Обновление таблицы
    function updateTable(records) {
        recordsTableBody.innerHTML = '';
        records.forEach(record => {
            const row = createRecord(record);
            recordsTableBody.appendChild(row);
        });
    }

    //Отображение записи
    function createRecord(record) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.name}</td>
            <td>
                <span id="password" class="password-span password-hidden">${record.password}</span>
            </td>
            <td>${new Date(record.dateCreated).toLocaleString()}</td>
        `;
        row.addEventListener("click", () => togglePasswordVisibility(row));
        return row;
    }

    //Очистка формы
    function resetForm() {
        recordForm.reset();
        errorsBox.textContent = '';
    }
});

function togglePasswordVisibility(record) {
    const passwordSpan = record.querySelector(".password-span");
    if (passwordSpan.classList.contains('password-hidden')) {
        passwordSpan.classList.remove('password-hidden');
    } else {
        passwordSpan.classList.add('password-hidden');
    }
}
