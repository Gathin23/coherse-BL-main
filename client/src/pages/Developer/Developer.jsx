import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import styles from "./styles.module.css";
import "./developer.css";

const Developer = (props) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [devpicture, setDevPicture] = useState(null);
  const [devname, setDevName] = useState(null);

  const fetchResult = async () => {
    const url = "https://api.openai.com/v1/chat/completions";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: query,
          },
        ],
      }),
    };
    setLoading(true); // set loading to true

    try {
      const response = await fetch(url, options);
      const results = await response.json();
      console.log(result);
      setResult(results["choices"][0]["message"]["content"]);
    } catch (error) {
      console.error(error);
    }

    setLoading(false); // set loading back to false
  };

  useEffect(() => {
    const storedPicture = localStorage.getItem("devpicture");
    const storedName = localStorage.getItem("devname");
    setDevPicture(storedPicture);
    setDevName(storedName);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted");
    console.log(query);
    props.setUserInput(query);
    await fetchResult();
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("devname");
    localStorage.removeItem("devpicture");
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };

  return (
    <div className="dashboard">
      <div className="number-container">
        <div className="number-left">
          <h2>Dashboard</h2>
        </div>
        <div className="number-right">
          <img
            src={devpicture}
            alt="Profile Pic"
            className="number-profile-pic"
          />
          <h3 className="number-user-name">{devname}</h3>
          <button className="number-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className={styles.wrapper}>
        {/* User Input */}
        <div className={styles.user_input}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your query"
              className={styles.input_field}
              value={query}
              onChange={handleChange}
            />
            <button type="submit" className={styles.btn}>
              Search
            </button>
          </form>
        </div>
        {/* Display Result */}
        <div className="result">
          {loading ? (
            <div>Loading...</div>
          ) : result ? (
            <>
              <ReactMarkdown className="style.result" markPlugins={[gfm]}>
                {result}
              </ReactMarkdown>
              <a target="_blank" href="https://www.spatial.io/s/Coherse-Meeting-Room-644beb62b5a8fb95ae80009f?share=8499940146633707102">
                <input
                  className={styles.btn}
                  type="button"
                  value="Connect with a Mentor"
                />
              </a>
            </>
          ) : (
            <div>Enter your query to get the result</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Developer;
