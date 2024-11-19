
document.addEventListener('DOMContentLoaded', function() {
    loadRequests();
});

document.getElementById('maintenanceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const buildingNumber = document.getElementById('buildingNumber').value;
    const roomNumber = document.getElementById('roomNumber').value;
    const requestDetails = document.getElementById('requestDetails').value;

    const request = {
        buildingNumber,
        roomNumber,
        requestDetails
    };

    fetch('add_request.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadRequests();
            document.getElementById('maintenanceForm').reset();
        } else {
            alert('فشل في إضافة الطلب');
        }
    });
});

function loadRequests() {
    fetch('get_requests.php')
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById('requestsTable');
        table.innerHTML = '';

        data.forEach((request, index) => {
            const newRow = table.insertRow();
            newRow.dataset.id = request.id;
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${request.building_number}</td>
                <td>${request.room_number}</td>
                <td>${request.request_details}</td>
                <td>${request.status}</td>
                <td>
                    <button onclick="editRequest(this)">تعديل</button>
                </td>
            `;
        });
    });
}

function editRequest(button) {
    const row = button.parentElement.parentElement;
    const detailsCell = row.querySelector('td:nth-child(4)');
    const statusCell = row.querySelector('td:nth-child(5)');
    const currentDetails = detailsCell.innerText;
    const currentStatus = statusCell.innerText;

    detailsCell.innerHTML = `<input type="text" value="${currentDetails}">`;
    statusCell.innerHTML = `
        <select>
            <option value="تم إرسال الطلب" ${currentStatus === 'تم إرسال الطلب' ? 'selected' : ''}>تم إرسال الطلب</option>
            <option value="جاري العمل" ${currentStatus === 'جاري العمل' ? 'selected' : ''}>جاري العمل</option>
            <option value="تم إتمام العمل" ${currentStatus === 'تم إتمام العمل' ? 'selected' : ''}>تم إتمام العمل</option>
        </select>
    `;
    button.textContent = 'حفظ';
    button.onclick = function() {
        saveRequestChanges(this);
    };
}

function saveRequestChanges(button) {
    const row = button.parentElement.parentElement;
    const id = row.dataset.id;
    const updatedDetails = row.querySelector('td:nth-child(4) input').value;
    const updatedStatus = row.querySelector('td:nth-child(5) select').value;

    const updatedRequest = {
        id,
        requestDetails: updatedDetails,
        status: updatedStatus
    };

    fetch('update_request.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRequest)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadRequests();
        } else {
            alert('فشل في تحديث الطلب');
        }
    });
}
