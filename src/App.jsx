import { useState } from "react";
import "./App.css";

export default function App() {
  const [currentCuisine, setCurrentCuisine] = useState("");
  const [subCuisines, setSubCuisines] = useState([]);
  const [results, setResults] = useState(false);

  const questions = [
    {
      question: "Which type of cuisine do you prefer?",
      options: {
        Asian: ["Chinese", "Japanese", "Indian"],
        European: ["Italian", "French", "Spanish"],
        American: ["Burgers", "Pizza", "BBQ"],
      },
    },
  ];

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setCurrentCuisine(value);
    console.log(currentCuisine);
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    /*  const updatedCuisines = setSubCuisines((prevCuisines) => {
      
    }) */
    setSubCuisines((prevCuisines) => {
      /* let updatedCuines = prevCuisines.filter((cuisines) => cuisines !== value);
      return [...updatedCuines, value]; */
      if (prevCuisines.includes(value)) {
        return prevCuisines.filter((cuisines) => cuisines !== value);
      } else {
        return [...prevCuisines, value];
      }
    });
    console.log(subCuisines);
  };

  const handleButtonClick = () => {
    setResults(true);
  };

  const FoodSurvey = () => {
    return (
      <div>
        <h1>Food Survey App</h1>

        {!results && (
          <div>
            <label>Select Your Preferred Cuisine:</label>
            <select onChange={handleSelectChange}>
              <option value="">--Select Cuisine--</option>
              {questions.map((quest) =>
                Object.keys(quest.options).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )),
              )}
            </select>
            <br />
            <br />

            {currentCuisine && (
              <>
                {questions.map((obj) => (
                  <div key={obj.question}>
                    <label>{obj.question}</label>
                    <br />
                    {obj.options[currentCuisine].map((cuisine) => (
                      <label key={cuisine}>
                        <input
                          type="checkbox"
                          value={cuisine}
                          checked={subCuisines.includes(cuisine)}
                          onChange={handleOptionChange}
                        />
                        {cuisine}
                        <br />
                      </label>
                    ))}
                  </div>
                ))}
                <br />
                <button onClick={handleButtonClick}>Submit</button>
              </>
            )}
          </div>
        )}

        {results && (
          <div>
            <h3>Thank you for Sharing your Preferences!</h3>
            <p>Cuisine: {currentCuisine}</p>
            <p>Preferred Option: {subCuisines.join(", ")}</p>
          </div>
        )}
      </div>
    );
  };

  /*  const FeedbackForm = () => {
    const [feedbackType, setFeedbackType] = useState("");
    const [comments, setComments] = useState("");
    const [displayComments, setDisplayComments] = useState(false);

  

    // const handleFeedbackChange = (event) => {
    //   const value = event.target.value;
    //   setFeedbackType(value);
    // clearTextarea()
    //   console.log(comments);
    //   setDisplayComments(false);
    // };

    const handleTextarea = (event) => {
      const value = event.target.value;
      setComments(value);
    };

    const handleBtnClick = () => {
      setDisplayComments(true);
    };

    return (
      <div>
        <h1>Feedack Form</h1>
        <label>Feedback Type: </label>
        <select
          onChange={(event) => {
            setFeedbackType(event.target.value);
            setComments("");
            setDisplayComments(false);
          }}
        >
          <option value="">--Select Feedback Type--</option>
          <option value="Compliment">Compliment</option>
          <option value="Complaint">Complaint</option>
          <option value="Suggestion">Suggestion</option>
          <option value="Other">Other</option>
        </select>
        <br />
        <br />
        {feedbackType && (
          <div>
            <label>Comments:</label>
            <textarea rows="4" cols="40" onChange={handleTextarea} />
          </div>
        )}
        <br />
        <button onClick={handleBtnClick}>Submit</button>

        {displayComments && (
          <div>
            <p>{feedbackType}</p>
            <p>{comments}</p>
          </div>
        )}
      </div>
    );
  }; */

  const FeedbackForm = () => {
    const [currentFeebackType, setFeedbackType] = useState("");
    const [comments, setComments] = useState("");
    const [preview, setPreview] = useState(false);
    const handleFeedbackType = (event) => {
      const value = event.target.value;
      setFeedbackType(value);
      setPreview(false);
      setComments("");
    };

    const handleSubmitEvent = (event) => {
      event.preventDefault();
      setPreview(true);
    };

    return (
      <div>
        <h1>Feedback Form</h1>
        <form onSubmit={handleSubmitEvent}>
          <label htmlFor="feedback-type">Feedback Type:</label>
          <select id="feedback-type" onChange={handleFeedbackType}>
            <option value="">--Select Feedback Type--</option>
            <option value="Compliment">Compliment</option>
            <option value="Complaint">Complaint</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Other">Other</option>
          </select>
          <br /> <br />
          {currentFeebackType && (
            <div>
              <label>Comments</label>
              <textarea
                rows="5"
                cols="50"
                value={comments} // this attribute is very important to reset the textarea
                onChange={(event) => setComments(event.target.value)}
              />
            </div>
          )}
          <br />
          <button type="submit">Submit</button>
        </form>

        {preview && (
          <div>
            <p>{currentFeebackType}</p>
            <p>{comments}</p>
          </div>
        )}
      </div>
    );
  };
  return (
    <main>
      <FoodSurvey />
      <FeedbackForm />
    </main>
  );
}
