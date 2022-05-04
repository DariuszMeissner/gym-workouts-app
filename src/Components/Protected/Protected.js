import React, { useState, useEffect } from "react";
import { ref, child, get } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import { app, db } from "../../Firebase/firebase";
import "./Protected.scss";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
const Protected = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [workoutsList, setWorkoutsList] = useState([]);
  const [bodyPart, setBodyPart] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState();
  const [selectedBodyPartCategory, setSelectedBodyPartCategory] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [plan, setPlan] = useState([]);
  const [workouts, setWorkouts] = useState({
    id: 0,
    workout_name: "",
    series: "",
    repeats: "",
  });
  useEffect(() => {
    const dbRef = ref(db);
    //get body parts
    get(child(dbRef, "workout_body_part"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (bodyPart) {
            snapshot.val().forEach((item) => {
              setBodyPart((prevState) => [...prevState, item]);
              console.log(snapshot.exists());
            });
          }
        } else {
          console.log("No data avaiable");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    //get workouts list
    get(child(dbRef, "workouts"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.val().forEach((item) => {
            setWorkoutsList((prevState) => [...prevState, item]);
          });
        } else {
          console.log("No data avaiable");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
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

  const addNewInputField = () => {
    setPlan((prevState) => [...prevState, workouts]);
        setWorkouts((prevState) => {
          return {
            ...prevState,
            workout_name: "",
            series: "",
            repeats: "",
          };
        });
  };

  const setPartAndCategory = (e) => {
    setSelectedBodyPart(e.currentTarget.value);
    console.log("Selected body part: ", e.currentTarget.value);
    bodyPart.map((item) => {
      if (item.body_part === e.currentTarget.value) {
        setSelectedBodyPartCategory(item.category);
      }
    });
  };
  const setCat = (e) => {
    // setSelectedBodyPartCategory(e.currentTarget.value);
    setSelectedCategory(e.currentTarget.value);
  };

  return (
    <div className={"protected-container"}>
     

      
      <div className="protected-container-main">
     
        <div className="main-plan-name">
          <div className="main-plan-name-wrapper">
            <strong>Nazwa planu: </strong>
          </div>
          <div className="main-plan-name-wrapper main-plan-name-input">
            <input
              type={"text"}
              value={workoutName}
              onChange={(e) => setWorkoutName(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="main-plan-body-part">
          
          <strong>Body Part</strong>
          <div className="main-plan-body-part-wrapper">
            {bodyPart.map((el) => {
              return (
                <label htmlFor="body-part">
                  <input
                    type={"radio"}
                    key={el.id}
                    value={el.body_part}
                    id="body-part"
                    name="body-part"
                    onChange={setPartAndCategory}
                  />
                  {el.body_part}
                </label>
              );
            })}
          </div>
        </div>
        <br />
        <div className="main-plan-body-category-wrapper">
          <strong>Body Category</strong>
          <br />
          {selectedBodyPartCategory.map((item) => {
            return (
              <label htmlFor="category">
                <input
                  id="category"
                  name="category"
                  type="radio"
                  key={item.indexOf()}
                  value={item}
                  onChange={setCat}
                />
                {item}
              </label>
            );
          })}
        </div>

        {selectedCategory && (
          <div className={"inputs_contaier"}>
            <br />
            Wybierz ćwiczenie
            <select
              onChange={workoutState}
              name={"workout_name"}
              value={workouts.workout_name}
            >
              <option value={""}>...</option>
              {workoutsList.map((workout) => {
                if (workout.category === selectedCategory) {
                  return (
                    <option key={workout.id} value={workout.workout_name}>
                      {/* {workout.workout_name} */} {workout.workout_name}
                    </option>
                  );
                }
              })}
            </select>
            {}
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
          </div>
        )}
        <button onClick={addNewInputField}>Add new workout</button>

        <div style={{ marginTop: 50 }}>
          Added workouts
          {plan.map((item) => {
            return (
              <p>
                {item.workout_name} | serie: {item.series} | powtórzenia:{" "}
                {item.repeats}
                {console.log(plan)}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Protected;
