// script.js
document.getElementById('itemForm').addEventListener('submit', function (e) {
  e.preventDefault();

  let itemName = document.getElementById('itemName').value;
  let itemCost = parseFloat(document.getElementById('itemCost').value);
  let itemQuantity = parseInt(document.getElementById('itemQuantity').value);

  let totalCost = itemCost * itemQuantity;

  // Add item to the table
  let table = document.getElementById('itemTable');
  let row = table.insertRow();
  row.insertCell(0).innerText = itemName;
  row.insertCell(1).innerText = `$${itemCost.toFixed(2)}`;
  row.insertCell(2).innerText = itemQuantity;
  row.insertCell(3).innerText = `$${totalCost.toFixed(2)}`;

  // Update the total
  let currentTotal = parseFloat(
    document.getElementById('totalDisplay').innerText.split('$')[1]
  );
  currentTotal += totalCost;
  document.getElementById(
    'totalDisplay'
  ).innerText = `Total: $${currentTotal.toFixed(2)}`;

  // Clear the form
  document.getElementById('itemName').value = '';
  document.getElementById('itemCost').value = '';
  document.getElementById('itemQuantity').value = '';
});

function tableToExcel(table, name) {
  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.table_to_sheet(table);
  XLSX.utils.book_append_sheet(wb, ws, name);
  XLSX.writeFile(wb, name + '.xlsx');
}

document.getElementById('exportBtn').addEventListener('click', function () {
  let table = document.querySelector('table');
  tableToExcel(table, 'ItemsList');
});
