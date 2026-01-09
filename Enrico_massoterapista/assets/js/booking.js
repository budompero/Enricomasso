// Booking form multi-step functionality

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.querySelector('.booking-form');
    if (!bookingForm) return;

    const steps = Array.from(document.querySelectorAll('.form-step'));
    let currentStep = 0;

    // Initialize: show first step
    showStep(currentStep);

    // Next step buttons
    bookingForm.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', function() {
            const nextStepId = this.getAttribute('data-next');
            if (validateStep(currentStep)) {
                currentStep = getStepIndex(nextStepId);
                showStep(currentStep);
                updateSummary();
            }
        });
    });

    // Previous step buttons
    bookingForm.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', function() {
            const prevStepId = this.getAttribute('data-prev');
            currentStep = getStepIndex(prevStepId);
            showStep(currentStep);
        });
    });

    // Treatment selection
    const treatmentRadios = bookingForm.querySelectorAll('input[name="treatment"]');
    treatmentRadios.forEach(radio => {
        radio.addEventListener('change', updateSummary);
    });

    // Date and time selection
    const dateInput = bookingForm.querySelector('#booking-date');
    const timeRadios = bookingForm.querySelectorAll('input[name="time"]');

    if (dateInput) {
        // Set min date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];

        // Set default to tomorrow
        dateInput.value = tomorrow.toISOString().split('T')[0];

        dateInput.addEventListener('change', updateSummary);
    }

    timeRadios.forEach(radio => {
        radio.addEventListener('change', updateSummary);
        // Select first time slot by default
        if (!document.querySelector('input[name="time"]:checked') && radio.value === '09:00') {
            radio.checked = true;
        }
    });

    // Personal data fields
    const personalFields = ['#fullname', '#email', '#phone', '#location'];
    personalFields.forEach(selector => {
        const field = bookingForm.querySelector(selector);
        if (field) {
            field.addEventListener('input', updateSummary);
        }
    });

    // Form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateStep(currentStep)) {
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Prenotazione in corso...';
            submitBtn.disabled = true;

            // In a real app, you would send data to server here
            setTimeout(() => {
                alert('Prenotazione confermata! Riceverai una email di conferma a breve.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                bookingForm.reset();
                currentStep = 0;
                showStep(currentStep);
                updateSummary();
            }, 2000);
        }
    });

    // Helper functions
    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === index);
        });

        // Update progress indicator (if exists)
        const progress = document.querySelector('.booking-progress');
        if (progress) {
            const progressItems = progress.querySelectorAll('.progress-item');
            progressItems.forEach((item, i) => {
                item.classList.toggle('active', i <= index);
                item.classList.toggle('completed', i < index);
            });
        }

        // Scroll to top of form
        bookingForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function getStepIndex(stepId) {
        return steps.findIndex(step => step.id === stepId);
    }

    function validateStep(stepIndex) {
        const step = steps[stepIndex];
        let valid = true;

        // Step 1: treatment selection
        if (stepIndex === 0) {
            const selectedTreatment = bookingForm.querySelector('input[name="treatment"]:checked');
            if (!selectedTreatment) {
                alert('Per favore, seleziona un trattamento.');
                valid = false;
            }
        }

        // Step 2: date and time
        if (stepIndex === 1) {
            if (!dateInput.value) {
                alert('Per favore, seleziona una data.');
                valid = false;
            }

            const selectedTime = bookingForm.querySelector('input[name="time"]:checked');
            if (!selectedTime) {
                alert('Per favore, seleziona un orario.');
                valid = false;
            }
        }

        // Step 3: personal data
        if (stepIndex === 2) {
            const name = bookingForm.querySelector('#fullname');
            const email = bookingForm.querySelector('#email');
            const phone = bookingForm.querySelector('#phone');

            if (!name.value.trim()) {
                name.classList.add('error');
                valid = false;
            } else {
                name.classList.remove('error');
            }

            if (!email.value.trim() || !isValidEmail(email.value)) {
                email.classList.add('error');
                valid = false;
            } else {
                email.classList.remove('error');
            }

            if (!phone.value.trim()) {
                phone.classList.add('error');
                valid = false;
            } else {
                phone.classList.remove('error');
            }

            if (!valid) {
                alert('Per favore, compila tutti i campi obbligatori con dati validi.');
            }
        }

        // Step 4: terms agreement
        if (stepIndex === 3) {
            const terms = bookingForm.querySelector('#terms');
            if (!terms.checked) {
                alert('Devi accettare i termini di servizio per procedere.');
                terms.classList.add('error');
                valid = false;
            } else {
                terms.classList.remove('error');
            }
        }

        return valid;
    }

    function updateSummary() {
        // Treatment
        const treatmentRadio = bookingForm.querySelector('input[name="treatment"]:checked');
        if (treatmentRadio) {
            const treatmentCard = treatmentRadio.closest('.treatment-option');
            const treatmentName = treatmentCard.querySelector('h4').textContent;
            const treatmentPrice = treatmentCard.querySelector('p').textContent;

            document.getElementById('summary-treatment').textContent = treatmentName;
            document.getElementById('summary-total').textContent = treatmentPrice.split('-')[1]?.trim() || '';
        }

        // Date and time
        const date = dateInput ? dateInput.value : '';
        const timeRadio = bookingForm.querySelector('input[name="time"]:checked');
        const time = timeRadio ? timeRadio.value : '';

        if (date && time) {
            const dateObj = new Date(date);
            const formattedDate = dateObj.toLocaleDateString('it-IT', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            document.getElementById('summary-datetime').textContent = `${formattedDate} alle ${time}`;
        }

        // Personal data
        const name = bookingForm.querySelector('#fullname');
        const email = bookingForm.querySelector('#email');
        const phone = bookingForm.querySelector('#phone');
        const location = bookingForm.querySelector('#location');

        if (name && name.value) {
            document.getElementById('summary-name').textContent = name.value;
        }
        if (email && email.value) {
            document.getElementById('summary-email').textContent = email.value;
        }
        if (phone && phone.value) {
            document.getElementById('summary-phone').textContent = phone.value;
        }
        if (location && location.value) {
            const locationText = location.options[location.selectedIndex].text;
            document.getElementById('summary-location').textContent = locationText;
        }
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Initialize summary
    updateSummary();
});