import { useState } from "react";

function Form(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneType, setPhoneType] = useState('');
    const [staff, setStaff] = useState('');
    const [bio, setBio] = useState('');
    const [emailNotif, setEmailNotif] = useState(false);

    const [errorMessages, setErrorMessaages] = useState([])

    const validate = () => {
        let errors = [];
        if (name.length === 0) {
            errors.push('Name can not be blank')
        }
        if (email.length === 0) {
            errors.push('Email can not be blank')
        }
        let second = email.split('@')[1];
        if (email.split('@').length !== 2 || second.split('.').length !== 2) {
            errors.push('Email not properly formatted')
        }
        const phoneVal = /^\d{10}$/;

        if (phoneNumber && !phoneVal.test(phoneNumber)) {
            errors.push('Phone number is not properly formatted')
        }
        if (phoneNumber && !phoneType) {
            errors.push('Must select phone type')
        }
        if (bio.split('').length > 280) {
            errors.push('Bio to long, must be 280 characters at most')
        }  
        if (!staff) {
            errors.push('Must select option for staff or student')
        }

        return errors;
        
    }

    const handleChange = field => {
        return (e) => {
          switch (field) {
            case "name":
                setName(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "phoneNumber":
                setPhoneNumber(e.target.value);
                break;
            case "phoneType":
                setPhoneType(e.target.value); 
                break;
            case "staff":
                setStaff(e.target.value);
                break;
            case "bio":
                setBio(e.target.value);
                break;
            case "emailnotif":
                setEmailNotif(emailNotif => !emailNotif);
                break;
            default:
              break;
          }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = validate();

        if (errors.length > 0) {
            setErrorMessaages(errors);
        } else {
            let user = {
                name, 
                email, 
                phoneNumber, 
                phoneType, 
                staff, 
                bio,
                emailNotif
            };

            console.log(user)
        }
    }

    const showErrors = () => {
        if (!errorMessages.length) {
            return null;
        } else {
            return (
                <ul>
                    {errorMessages.map((error, i) => <li key={i}>{error}</li> )}
                </ul>
            )
        }
    }

    return (
        <>
            {showErrors()}

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="name" value={name}
                onChange={handleChange('name')}/>

                <input type="text" placeholder="email" value={email}
                onChange={handleChange('email')}/>

                <input type="text" placeholder="0123456789" value={phoneNumber}
                onChange={handleChange('phoneNumber')}/>

                <select name="phoneType" onChange={handleChange('phoneType')}>
                    {/* <option value="Select Phone Type" disabled>-Select Phone Type-</option> */}
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Mobile">Mobile</option>
                </select>

                <input type="radio" name="Staff" value="Instructor" checked={staff === "Instructor"} onChange={handleChange("staff")}></input>
                <label htmlFor="instructor">Instructor</label>
                
                <input type="radio" name="Staff" value="Student" checked={staff === "Student"} onChange={handleChange("staff")}></input>
                <label htmlFor="Student">Student</label>

                <input type="textarea" value={bio} onChange={handleChange("bio")}></input>

                <input type="checkbox" id="emailNotif" checked={emailNotif} onChange={handleChange("emailNotif")}></input>
                <label htmlFor="emailcheckbox">Sign up for email notifactions</label>


                <button type="submit">Submit</button>
            </form>
        </>
    )

}

export default Form; 