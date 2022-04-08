
import "./MainContainer.scss";
import './Form.scss';


const MainContainer = () => {



    return (
        <div className={"main-container-wrapper"}>
            <div className={"main-container-inner"}>
                <div className={"main-container-form flex_center"}>
                    <div className={"form-welcome-image flex_center"}>
                        <i className="fas fa-dumbbell"></i>
                    </div>
                    <div className={"form-welcome-text flex_center"}>
                        Welcome
                    </div>
                    <div className={'form-navigation-wrapper'}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainContainer