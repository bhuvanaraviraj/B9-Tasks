// script.js

document.addEventListener('DOMContentLoaded', () => {
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const addEntryButton = document.getElementById('addEntry');
    const resetButton = document.getElementById('resetFields');
    const entriesList = document.getElementById('entries');
    const totalIncomeDisplay = document.getElementById('totalIncome');
    const totalExpenseDisplay = document.getElementById('totalExpense');
    const netBalanceDisplay = document.getElementById('netBalance');
    const filterInputs = document.querySelectorAll('input[name="filter"]');
  
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
  
    function updateDisplay() {
      const totalIncome = entries.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
      const totalExpense = entries.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
      const netBalance = totalIncome - totalExpense;
  
      totalIncomeDisplay.textContent = `$${totalIncome}`;
      totalExpenseDisplay.textContent = `$${totalExpense}`;
      netBalanceDisplay.textContent = `$${netBalance}`;
    }
  
    function renderEntries(filter = 'all') {
      entriesList.innerHTML = '';
  
      const filteredEntries =
        filter === 'all'
          ? entries
          : entries.filter(entry => entry.type === filter);
  
      filteredEntries.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <span>${entry.description}</span>
          <span>$${entry.amount}</span>
          <button class="edit" data-index="${index}">Edit</button>
          <button class="delete" data-index="${index}">Delete</button>
        `;
  
        entriesList.appendChild(listItem);
      });
    }
  
    function saveEntries() {
      localStorage.setItem('entries', JSON.stringify(entries));
    }
  
    function resetFields() {
      descriptionInput.value = '';
      amountInput.value = '';
      document.querySelector('input[name="type"][value="income"]').checked = true;
    }
  
    addEntryButton.addEventListener('click', () => {
      const description = descriptionInput.value.trim();
      const amount = parseFloat(amountInput.value);
      const type = document.querySelector('input[name="type"]:checked').value;
  
      if (!description || isNaN(amount) || amount <= 0) {
        alert('Please enter valid description and amount.');
        return;
      }
  
      entries.push({ description, amount, type });
      saveEntries();
      renderEntries();
      updateDisplay();
      resetFields();
    });
  
    entriesList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
        const index = e.target.dataset.index;
        entries.splice(index, 1);
        saveEntries();
        renderEntries();
        updateDisplay();
      }
  
      if (e.target.classList.contains('edit')) {
        const index = e.target.dataset.index;
        const entry = entries[index];
  
        descriptionInput.value = entry.description;
        amountInput.value = entry.amount;
        document.querySelector(`input[name="type"][value="${entry.type}"]`).checked = true;
  
        entries.splice(index, 1);
        saveEntries();
        renderEntries();
        updateDisplay();
      }
    });
  
    filterInputs.forEach(filterInput => {
      filterInput.addEventListener('change', (e) => {
        renderEntries(e.target.value);
      });
    });
  
    resetButton.addEventListener('click', resetFields);
  
    // Initial rendering
    renderEntries();
    updateDisplay();
  });
  