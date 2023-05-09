const checkboxes = document.querySelectorAll('input[name="filter"]');
  const cards = document.querySelectorAll('.current-movie');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const checkedValues = Array.from(checkboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
      
      if (checkedValues.length === 0) {
        cards.forEach((card) => card.style.display = 'block');
      } else {
        cards.forEach((card) => {
          if (checkedValues.some((value) => card.classList.contains(value))) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  });