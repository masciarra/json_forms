import React from 'react'

export default function Form() {
    
    const formData = [{
        "tag": "input",
          "name": "first_name",
        "type": "text",
          "human_label": "First Name"
      }, {
        "tag": "input",
        "name": "last_name",
        "type": "text",
          "human_label": "Last Name"
      }, {
        "tag": "input",
        "name": "email",
        "type": "email",
        "human_label": "Email Address"
      }, {
        "tag": "input",
        "name": "phone_number",
        "type": "text",
        "human_label": "Phone Number"
      }, {
        "tag": "input",
        "name": "job_title",
        "type": "text",
        "human_label": "Job Title"
      }, {
        "tag": "input",
        "name": "date_of_birth",
        "type": "date",
        "human_label": "Date of Birth"
      }, {
        "tag": "input",
        "name": "parental_consent",
        "type": "checkbox",
        "human_label": "Parental Consent",
          "conditional": {
              "name": "date_of_birth",
              "show_if": (value) => {
            const now = new Date();
                  return value >= new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());
          }
      }}]

    /*
    Handler function for form submit.  Aggregates user input into JSON object, prints to console.

    */
    
    let submitHandler = (e) => {
        e.preventDefault();

        let inputData = {};

        for (let i = 0; i < e.target.elements.length; i++){
            if (e.target.elements[i].type === 'checkbox'){
                inputData[e.target.elements[i].name] = e.target.elements[i].checked;
            }else{
                inputData[e.target.elements[i].name] = e.target.elements[i].value;
            }
        }

        console.log(inputData);
    }  


    /*
    Validates form element 'show_if' property
    */

    let validateFormElementRender = (i) => {
        if (formData[i].hasOwnProperty('show_if')){
            if (formData[i].show_if){
                return true;
            }            
        }else{
            return true;
        }

        return false;
    }


    /*
    buildForm function iterates through formData json object and builds corresponding
    form HTML.  Only renders form element if 'show_if' property is true or doesn't exist.
    */
    let buildForm = () => {
        
        let formHTMLOuter = [];
        let formHTMLInner = [];

        for (let i = 0; i < formData.length; i++){

            if (validateFormElementRender(i)){
                formHTMLInner.push(<label key={formData[i].name}>{formData[i].human_label}</label>);
                formHTMLInner.push(<input 
                    key = {'input' + i}
                    type = {formData[i].type}
                    name = {formData[i].name}
                />);
                formHTMLInner.push(<div key={'div' + i}></div>);                
            }

        }

        formHTMLInner.push(<button key='button' type='submit'>Submit</button>);

        formHTMLOuter.push(<form onSubmit={submitHandler} key='form'>{formHTMLInner}</form>);
        return formHTMLOuter;
    }


    /*
    buildForm called by jsx in html return
    */

    return (
        <div>
            <h1>Welcome to my form:</h1>
            <div>
                
                {buildForm()} 
                
            </div>
        </div>
    )
}
