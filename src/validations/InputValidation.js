import * as yup from 'yup';

export const userSchema = yup.object().shape({
    first_name: yup.string().required("First Name is required.").matches(/^[a-zA-Z ]*$/, "Name contain alphabets only."),
    middle_name: yup.string().matches(/^[a-zA-Z ]*$/, "Name contain alphabets only."),
    last_name: yup.string().required("Last Name is required.").matches(/^[a-zA-Z ]*$/, "Name contain alphabets only."),
    suffix: yup.string().matches(/^[a-zA-Z ]*$/, "Name contain alphabets only."),
    contact: yup.string().required("Contact number is required.").matches(/^(09|\+639)\d{9}$/, "Invalid contact number."),
    region_: yup.string().required("Region is required."),
    province_: yup.string().required("Province is required."),
    city: yup.string().required("City is required."),
    city_district: yup.string().required("City District is required."),
    barangay: yup.string().required("Barangay is required."),
    street: yup.string(),
    number: yup.string(),
    postal: yup.string().required("Postal is required.").matches(/^\d+$/, "Incorrect value for Postal."),
    address: yup.string().required("Address is required."),
    gender: yup.string().required("Gender is required."),
    email: yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Incorrect E-mail format."),
    birthdate: yup.string().required("Birthdate is required."),
    birthplace: yup.string().required("Birthplace is required."),
    civil_status: yup.string().required("Civil Status is required."),
    username: yup.string().min(8, "Username minimum of 8 characters.").max(15, "Username maximum of 15 characters.").required("Username is required."),
    password: yup.string().min(8, "Password minimum of 8 characters.").max(50, "Password maximum of 50 characters only.").required("Password is required."),
    confirm_password: yup.string().oneOf([yup.ref("password"), null], "Password doesn't match.").required("Confirm Password is Required."),
})


//REGEX
// const email_format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const contact_format = /^(09|\+639)\d{9}$/;
// const numberOnly_format = /^\d+$/;
// const stringOnly_format = /^[a-zA-Z\s]*$/;