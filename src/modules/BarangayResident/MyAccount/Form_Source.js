import React from 'react'
<div className="wrapper">
    <div className="forms">
        <div className="input_fields">
            <label>First Name</label>
            <input type="text" className="inputs" />
        </div>
        <div className="input_fields">
            <label>Middle Name</label>
            <input type="text" className="inputs" />
        </div>
    </div>
</div>
function Form_Source() {
    return (
        <div className="EditProfile_container">
            <div className="wrapper">
                <div className="titles">
                    Edit Profile
                </div>
                <div className="forms">
                    <div className="input_fields">
                        <label>First Name</label>
                        <input type="text" className="inputs" />
                    </div>
                    <div className="input_fields">
                        <label>Middle Name</label>
                        <input type="text" className="inputs" />
                    </div>
                    <div className="input_fields">
                        <label>Last Name</label>
                        <input type="text" className="inputs" />
                    </div>
                    <div className="input_fields">
                        <label>Suffix</label>
                        <input type="text" className="inputs" />
                    </div>
                    <div className="input_fields">
                        <label>Address</label>
                        <textarea className="textarea"></textarea>
                    </div>
                    <div className="input_fields">
                        <label>Contact</label>
                        <input type="text" className="inputs" />
                    </div>
                    <div className="input_fields">
                        <label>E-mail</label>
                        <input type="text" className="inputs" />
                    </div>
                    <div className="input_fields">
                        <label>Sex</label>
                        <div className="custom_select">
                            <select className="inputs">
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="input_fields">
                        <label>Nationality</label>
                        <div className="custom_select">
                            <select className="inputs">
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="input_fields">
                        <label>Birthdate</label>
                        <input type="date" className="inputs" />
                    </div>
                    <div className="input_fields">
                        <label>Place Of Birth</label>
                        <input type="text" className="inputs" />
                    </div>
                    <h1>Account Information</h1>
                    <div className="input_fields">
                        <label>Username</label>
                        <input type="text" className="inputs" />
                    </div>
                    <div className="input_fields">
                        <label>Password</label>
                        <input type="password" className="inputs" />
                    </div>
                    <div className="input_fields">
                        <label>Confirm Password</label>
                        <input type="password" className="inputs" />
                    </div>
                    {/* <div className="input_fields terms">
                    <label className="check">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                    <p>Agreed to terms and conditions.</p>
                </div> */}
                    <div className="input_fields">
                        <input type="submit" value="Submit" className="btn" />
                    </div>
                    <div className="input_fields">
                        <input type="submit" value="Back" className="btn" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form_Source