import "./Form.scss";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({email, setEmail, password, setPassword, error, setError, app}) => {
    const auth = getAuth(app);
    let history = useNavigate();
    const loginSubmit = (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                setError(false);
                history(`/protected/${user.uid}`);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(error);
            });

    }
    return (

        <div className="main-container-wrapper">
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
                            {error && <p className={"wrong-validation"}>{error.message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Login