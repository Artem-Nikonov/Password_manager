document.addEventListener('DOMContentLoaded', () => {
    const addRecordButton = document.getElementById('addRecordButton');
    const recordModal = document.getElementById('recordModal');
    const cancelButton = document.getElementById('cancelButton');
    const recordForm = document.getElementById('recordForm');
    const recordsTableBody = document.getElementById('recordsTableBody');
    const searchInput = document.getElementById('searchInput');
    loadRecords();

    addRecordButton.addEventListener('click', () => {
        recordModal.style.display = 'block';
    });



    cancelButton.addEventListener('click', () => {
        recordModal.style.display = 'none';
    });


    window.addEventListener('click', (event) => {
        if (event.target == recordModal) {
            recordModal.style.display = 'none';
        }
    });

    recordForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(recordForm);
        const record = {
            name: formData.get('name'),
            password: formData.get('password'),
            recordType: formData.get('recordType'),
            dateCreated: new Date()
        };

        if (record.recordType == 'email' && !validateEmail(record.name)) {
            alert('Некорректный адрес почты');
            return;
        }

        const response = await fetch('https://localhost:7198/records', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
        });

        if (response.ok) {
            const firstRecord = recordsTableBody.firstChild;
            recordsTableBody.insertBefore(createRecord(record), firstRecord);
            recordModal.style.display = 'none';
        } else {
            alert('Не удалось создать запись');
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    async function loadRecords() {
        console.log("lll");
        const response = await fetch('/records');
        const records = await response.json();
        const filter = searchInput.value.toLowerCase();

        recordsTableBody.innerHTML = '';
        records
            .filter(record => record.name.toLowerCase().includes(filter))
            .forEach(record => {
                const row = createRecord(record); 
                recordsTableBody.appendChild(row);
            });
    }

    function createRecord(record) {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${record.name}</td>
                    <td>
                        <span class="password-hidden">${record.password}</span>
                        <button onclick="togglePasswordVisibility(this)">Show</button>
                    </td>
                    <td>${new Date(record.dateCreated).toLocaleString()}</td>
                `;
        return row;
    }

});

function togglePasswordVisibility(button) {
    const passwordSpan = button.previousElementSibling;
    if (passwordSpan.classList.contains('password-hidden')) {
        passwordSpan.classList.remove('password-hidden');
        button.textContent = 'Скрыть';
    } else {
        passwordSpan.classList.add('password-hidden');
        button.textContent = 'Показать';
    }
}