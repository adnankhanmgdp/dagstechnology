document.addEventListener('DOMContentLoaded', () => {
  fetch('https://dagstechnology.in/admin/api/fetchMisc')
    .then(response => response.json())
    .then(data => {
      if (data && data.charges && data.charges.faq) {
        const faqContainer = document.getElementById('faqContainer');
        faqContainer.innerHTML = ''; // Clear previous FAQs

        data.charges.faq.forEach((faq, index) => {
          const faqItem = document.createElement('div');
          faqItem.classList.add('mb-4', 'p-3', 'border');

          const faqNumber = index + 1;

          faqItem.innerHTML = `
            <h5 class="lh-base">
              <i style="background-color: #e4b666;" class="ri-number-${faqNumber} me-3 p-2 text-light rounded-circle align-middle"></i>
              ${faq.question}
            </h5>
            <p class="ms-5">${faq.answer}</p>
          `;

          faqContainer.appendChild(faqItem);
        });
      } else {
        console.error('Invalid data structure:', data);
      }
    })
    .catch(error => console.error('Error fetching data:', error));
});
