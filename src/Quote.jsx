import React, { useEffect, useState } from "react";

function Quote() {
  const [quotes, setQuotes] = useState({
    text: "",
    author: ""
  });

  const [count, setCount] = useState(0);
  const [bgColor, setBgcolor] = useState("");
  const color = ["#6495ED", "#FF7F50", "#DC143C", "#8FBC8F", "#DAA520"];
  const rand = Math.floor(Math.random() * color.length);
  useEffect(() => {
    async function call() {
      const data = await (
        await fetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1")
      ).json();
      data.quotes.forEach((item) => {
        setQuotes({
          text: item.text,
          author: item.author
        });
      });
    }
    call();
  }, [count]);

  function handleClick() {
    setCount(count + 1);
    setBgcolor(color[rand]);
    document.getElementsByTagName("html")[0].style.backgroundColor =
      color[rand];
  }

  return (
    <div id="wrapper">
      <div id="quote-box">
        <div id="text">{quotes.text}</div>
        <div id="author">- {quotes.author}</div>
        <a
          id="tweet-quote"
          rel="noreferrer"
          href="https://twitter.com/intent/tweet"
          target="_blank"
          style={{ backgroundColor: bgColor }}
        >
          t
        </a>
        <div>
          <button
            id="new-quote"
            onClick={handleClick}
            style={{ backgroundColor: bgColor }}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quote;
