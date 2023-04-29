import React, { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import styles from "./styles.module.css";
import { AppContext } from "../../context/AppContext";

const Developer = (props) => {
  const API_KEY = "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";
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const sharedQuery = useContext(AppContext);

  const fetchResult = async () => {
    const url = "https://api.openai.com/v1/chat/completions";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: sharedQuery,
          },
        ],
      }),
    };

    setLoading(true); // set loading to true

    try {
      const response = await fetch(url, options);
      const results = await response.json();
      console.log(result)
      setResult(results["choices"][0]["message"]["content"]);
    } catch (error) {
      console.error(error);
    }

    setLoading(false); // set loading back to false
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted");
    console.log(query);
    await fetchResult();
  };

  const handleChange = (e) => {
    props.setUserInput(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      {/* User Input */}
      <div className={styles.user_input}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your query"
            className={styles.input_field}
            value={sharedQuery}
            onChange={handleChange}
          />
          <button type="submit" className={styles.btn}>Search</button>
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
            <a href="https://www.spatial.io/s/Coherse-Meeting-Room-644beb62b5a8fb95ae80009f?share=8499940146633707102">
              <input className={styles.btn} type="button" value="Connect with a Mentor" />
            </a> 
          </>
        ) : (
          <div>Enter your query to get the result</div>
        )}
      </div>
    </div>
  );
};

export default Developer;
