import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { app, db } from "../Firebase/firebase";
import "./Protected.scss";
import { useNavigate } from "react-router-dom";
const Protected = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [workouts, setWorkouts] = useState({
    id: 0,
    workout_name: "",
    series: "",
    repeats: "",
  });
  useEffect(() => {}, []);
  const [plan, setPlan] = useState([]);
  const auth = getAuth(app);
  const history = useNavigate();
  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Wylogowano");
        history("/");
      })
      .catch((error) => {
        // An error happened.
        if (error) {
          console.log(error);
        }
      });
  };

  const addNewInputField = () => {
    setPlan((prevState) => [...prevState, workouts]);
    console.log(workouts, plan);
  };
  const workoutState = (e) => {
    const { name, value } = e.target;
    setWorkouts((prevState) => {
      return {
        ...prevState,
        id: prevState.id + 1,
        [name]: value,
      };
    });
  };
  return (
    <div className={"protected-container"}>
      <button onClick={signUserOut}>Wyloguj</button>
      <div className={"protected-navigation"}>
        <div className={"protected-navigation-inner"}>
          Nazwa_planu:{" "}
          <input
            type={"text"}
            value={workoutName}
            onChange={(e) => setWorkoutName(e.currentTarget.value)}
          />
          {workoutName}
          <br />
          <select onChange={(e) => setBodyPart(e.currentTarget.value)}>
            <option value={"top"}>Dolna partia ciała</option>
            <option value={"bottom"}>Górna partia ciała</option>
          </select>
          {bodyPart === "top" ? (
            <div className={"selected_select gorna_partia_ciała d_flex"}>
              Klata
              <input type={"radio"} name={"workout_part"} value={"klatka"} />
              Ręce
              <input type={"radio"} name={"workout_part"} value={"ręce"} />
              Plecy
              <input type={"radio"} name={"workout_part"} value={"plecy"} />
              Barki
              <input type={"radio"} name={"workout_part"} value={"barki"} />
            </div>
          ) : (
            <div className={"selected_select dolna_partia_ciała"}>
              nogi
              <input type={"radio"} name={"workout_part"} value={"nogi"} />
            </div>
          )}
          <div className={"inputs_contaier"}>
            <button onClick={addNewInputField}>Add new workout</button>
            <br />
            nazwa ćwiczenia
            <input
              type={"text"}
              onChange={workoutState}
              name={"workout_name"}
              value={workouts.workout_name}
            />
            <br />
            serie
            <input
              type={"text"}
              onChange={workoutState}
              name={"series"}
              value={workouts.series}
            />
            <br />
            powtózenia
            <input
              type={"text"}
              onChange={workoutState}
              name={"repeats"}
              value={workouts.repeats}
            />
            <br />
            {workouts.repeats}
            {workouts.series}
            {workouts.workout_name}
          </div>
          <div className={"added_workouts"}>
            <br></br>
            Your plan: {workoutName}
            <ul>
              {plan.map((workout) => {
                return (
                  <li key={workout.id}>
                    {workout.workout_name} | serie: {workout.series}{" "}
                    powtórzenia: {workout.repeats}{" "}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Protected;
