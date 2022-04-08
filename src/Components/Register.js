import "./Form.scss";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useState} from "react";

const Register = ({email, setEmail, password, setPassword, error, setError, app}) => {
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordsError, setPasswordsError] = useState(false);

    const auth = getAuth(app);
    const loginSubmit = (e) =>{
        e.preventDefault();
        if(repeatPassword !== password) {
            setPasswordsError(true);
        }else {
            setPasswordsError(false);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user)

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(error);
                    // ..
                });
        }

    }
    return (

        <div className="main-container-wrapper d-">
            <div className={"main-container-inner"}>
                <div className={"main-container-form flex_center"}>
                    <div className={"form-welcome-image flex_center"}>
                        <i className="fas fa-dumbbell"></i>
                    </div>
                    <div className={"form-welcome-text flex_center"}>
                        Welcome
                    </div>
                    <div className={'form-navigation-wrapper'}>
                        <div className={"form-container-wrapper"}>
                            {error && <p className={"wrong-validation"}>wrong email or password</p>}
                            <div className={"form-container-inner"}>
                                <form className={'form-inner form-login'} onSubmit={loginSubmit}>
                                    <div className={"form-input-email form-input input-wrong-data  "}>
                                        <div className={"form-input-icon"}>
                                            <i className="fas fa-user"> </i>
                                        </div>
                                        <div className={"form-input-field"}>
                                            <input type={"email"}
                                                   placeholder={' email'}
                                                   className={"input-regular input-email"}
                                                   value={email} onChange={e=>setEmail(e.currentTarget.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className={"form-input-password form-input"}>
                                        <div className={"form-input-icon"}>
                                            <i className="fas fa-lock"> </i>
                                        </div>
                                        <div className={"form-input-field"}>
                                            <input type={"password"}
                                                   placeholder={'password'}
                                                   className={"input-regular input-password"}
                                                   value={password} onChange={e=>setPassword(e.currentTarget.value)}
                                            />
                                        </div>

                                    </div>
                                    <div className={"form-input-password form-input"}>
                                        <div className={"form-input-icon"}>
                                            <i className="fas fa-lock"> </i>
                                        </div>
                                        <div className={"form-input-field"}>
                                            <input type={"password"}
                                                   placeholder={'repeat password'}
                                                   className={"input-regular input-password"}
                                                   value={repeatPassword} onChange={e=>setRepeatPassword(e.currentTarget.value)}
                                            />
                                        </div>
                                    </div>
                                    {passwordsError && <p className={"wrong-validation"}>passwords are wrong</p>}
                                    <div className={"form-submit form-input"}>
                                        <div className={"form-submit-button"}>
                                            <input type={"submit"}
                                                   placeholder={'submit'}
                                                   className={"input-regular input-submit"}
                                                   value={"Submit"}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register