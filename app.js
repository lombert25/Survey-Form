document.addEventListener('DOMContentLoaded', function () {

    const surveyForm = {
        name: '',
        email: '', 
        age: '',
        gender: '',
        language: '',
        methods: [],
        comments: ''
    }


    // Select the interface elements
     
    const inputName = document.querySelector('#name');
    const inputEmail = document.querySelector('#email');
    const inputAge = document.querySelector('#age');
    const inputGender = document.querySelectorAll('input[type="radio"]');
    const inputLanguage = document.querySelector('#language');
    const inputMethods = document.querySelectorAll('input[type="checkbox"]');
    const inputComments = document.querySelector('#comments');
    const form = document.querySelector('#survey-form');
    const btnSubmit = document.querySelector('#survey-form button[type="submit"]');
    const btnReset = document.querySelector('#survey-form button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    


// Asign events 
   inputName.addEventListener('input', validate);
   inputEmail.addEventListener('input', validate);
   inputAge.addEventListener('input', validate);
   for (let i = 0; i < inputGender.length; i++) {
   inputGender[i].addEventListener('input', validate);
    };
    inputLanguage.addEventListener('input', validate);
   for (let i = 0; i < inputMethods.length; i++) {
   inputMethods[i].addEventListener('input', validate);
    };
   inputComments.addEventListener('input', validate);
   
   form.addEventListener('submit', sendEmail);
   
   btnReset.addEventListener('click', function(e) {
    e.preventDefault();

      // Reset the Object
      resetForm();    
   })

   function sendEmail(e) {
    e.preventDefault();

    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(() => {
        spinner.classList.remove('flex');
        spinner.classList.add('hidden');
        // Reset the Object
        resetForm();

        // Create an alert
        const successAlert = document.createElement('P');
        successAlert.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
        successAlert.textContent = 'Form sent successfully';

        form.appendChild(successAlert);

        setTimeout(() => {
            successAlert.remove();
        }, 3000);
    
    }, 3000)


}


    function validate(e) {
       if (e.target.value.trim() === '') {
        showAlert(`The ${e.target.id} field shouldn't be empty`, e.target.parentElement);
        surveyForm[e.target.id] = '';
        checkSurveyForm();
        return; 
       } 

       if(e.target.id === 'email' && !validateEmail(e.target.value)) {
        showAlert('The email is wrong', e.target.parentElement);
        surveyForm[e.target.id] = '';
        checkSurveyForm();
        return; 
       }    
       
       cleanAlert(e.target.parentElement);

       //Asign the values 
       surveyForm[e.target.id] = e.target.value.trim().toLowerCase();

       //Check the survey form object
       checkSurveyForm();

    }

    function showAlert(message, reference) {
        //Check if an alert already exists
        cleanAlert(reference);


        // Generate an alert on HTML
        const error = document.createElement('P');
        error.textContent = message;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
       
        // Append the error to the form
        reference.appendChild(error);

    }

    function cleanAlert(reference) {
        const alert = reference.querySelector('.bg-red-600');
        if (alert) {
            alert.remove();
        }
        
    }

    function validateEmail(email)  {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const result = regex.test(email);
         return result;
    }

    function  checkSurveyForm() {
       if(Object.values(surveyForm).includes('')) {
        btnSubmit.classList.add("opacity-50");
        btnSubmit.disabled = true;
        return;
        }
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;

    };

    function resetForm() {

        surveyForm.name = '';
            surveyForm.email = ''; 
            surveyForm.age = '';
            surveyForm.gender = '';
            surveyForm.language = '';
            surveyForm.methods = [];
            surveyForm.comments = '';
    
       form.reset();
       checkSurveyForm();
        
    }
       
  

});
