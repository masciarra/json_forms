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


    let submitHandler = (e) => {
        e.preventDefault()
        // console.log(e.target)
        
        let inputData = {};


        // console.log(e.target.elements.parental_consent.type)
        for (let i = 0; i < e.target.elements.length; i++){
            // console.log('e.target.elements[', i, ']: ', e.target.elements[i].value)
            
            if (e.target.elements[i].type === 'checkbox'){
                inputData[e.target.elements[i].name] = e.target.elements[i].checked;
            }else{
                inputData[e.target.elements[i].name] = e.target.elements[i].value;
            }
        }
        // console.log('parental: ', e.target.elements.parental_consent.checked)
        console.log(inputData)
    }  

    let buildForm = () => {
        console.log('in buildform')
        
        let formHTMLOuter = [];
        let formHTMLInner = [];

        
        
        for (let i = 0; i < formData.length; i++){
            formHTMLInner.push(<label key={formData[i].name}>{formData[i].human_label}</label>)
            formHTMLInner.push(<input 
                key = {'input' + i}
                type = {formData[i].type}
                name = {formData[i].name}
            />)
            formHTMLInner.push(<div key={'div' + i}></div>)
        }

        formHTMLInner.push(<button key='button' type='submit'>Submit</button>)

        formHTMLOuter.push(<form onSubmit={submitHandler} key='form'>{formHTMLInner}</form>)
        return formHTMLOuter;
    }


    return (
        <div>
            in form 
            <div>
                
                {buildForm()} 
                
            </div>
        </div>
    )
}
