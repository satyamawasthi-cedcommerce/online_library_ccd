import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Testimonials from "./Testimonials";
export default function Landing() {
  // state variables used
  const [flag, setFlag] = useState("");
  var bookNavigate = useNavigate();

  const [result, setResult] = useState([]);
  // funtion for books displayed 
  var bookDisplay = (event) => {
    if (event.key === "Enter") {
      setFlag(event.target.value);
      if (flag !== "") {
        fetch(
          `https://openlibrary.org/search.json?q=${flag}&mode=ebooks&has_fulltext=true`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.error) {
              throw new Error(data.error.message);
            }
            setResult(data);
          });
      }
    }
    console.log(result);
  };
  // function called on the click event of borrow button
  var borrow = () => {
    alert("Thankyou for being with us!");
  };
  var showDetails = (item) => {
    var bookCred = item;
    bookNavigate("/details", { state: { bookDetails: bookCred } });
  };
  return (
    <>
      <Header />
      <div className="parentSearch">
        <div className="searchDiv">
          <div className="leftsearch">
            <h1
              style={{ textAlign: "left", color: "#FAF3E3", fontWeight: "400" }}
            >
              We've got you <br />
              What you have been looking for.
            </h1>
          </div>
        </div>
        <img
          src="./3.png"
          alt="..."
          style={{ width: "38%", position: "absolute", top: "1.5%" }}
        />
        <hr
          style={{
            border: "1px solid #709f88",
            width: "65%",
            marginLeft: "35%",
            marginTop: "1%",
          }}
        />
        <hr
          style={{
            border: "1px solid #709f88",
            width: "80%",
            marginLeft: "20%",
            marginTop: "1%",
          }}
        />
      </div>
      <h2 style={{ color: "#2a6356" }}>Find what you are looking for</h2>
      <input
        type="text"
        placeholder="Search your book"
        autoFocus
        onKeyPress={(event) => bookDisplay(event)}
      />
      <div className="randomParent">
        <h1 style={{ color: "#faf3e3", fontWeight: "400" }}>
          Get Content from all Generes
        </h1>
        {/* conditionally rendering the page */}
        {flag === "" ? (
          <>
            <div className="randomContent">
              <div>
                <img
                  src="https://marketplace.canva.com/EAE8imX33lA/2/0/1003w/canva-dark-blue-nature-forest-mountains-circle-book-cover-NYgMywyULgA.jpg"
                  alt="..."
                  style={{
                    width: "250px",
                    borderRadius: "8px",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  }}
                />
                <h2
                  style={{
                    color: "#2a6356",
                    fontWeight: "400",
                    marginTop: "5%",
                  }}
                >
                  Nature & Lifestyle
                </h2>
              </div>

              <div>
                <img
                  src="https://media.graphassets.com/xzqK48M6Re2sLs0B6Zub"
                  alt="..."
                  style={{
                    width: "270px",
                    borderRadius: "8px",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  }}
                />
                <h2
                  style={{
                    color: "#2a6356",
                    fontWeight: "400",
                    marginTop: "5%",
                  }}
                >
                  Visit Magic
                </h2>
              </div>
              <div>
                <img
                  src="https://i.pinimg.com/originals/d6/d5/b8/d6d5b8258ca4690315b851d14ddf9772.jpg"
                  alt="..."
                  style={{
                    width: "268px",
                    borderRadius: "8px",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  }}
                />
                <h2
                  style={{
                    color: "#2a6356",
                    fontWeight: "400",
                    marginTop: "5%",
                  }}
                >
                  Drama & Stage
                </h2>
              </div>
            </div>
          </>
        ) : (
          <div>
            {result.length !== 0 ? (
              result.docs.map((item) => (
                <div className="books">
                  <div className="result">
                    <img
                      src={`https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`}
                      alt="..."
                      style={{
                        borderRadius: "20px 20px 0 0",
                        width: "20%",
                        boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
                      }}
                    />
                    <div className="resultContent">
                      <h2>{item.title}</h2>
                      <hr
                        style={{
                          border: "1px solid #709f88",
                          width: "95%",
                        }}
                      />
                      <h3>
                        By: {item.author_name} <br /> Publisher:{item.publisher}
                      </h3>
                      <h4>Language: {item.language}</h4>
                      <hr
                        style={{
                          border: "1px solid #709f88",
                          width: "95%",
                          marginBottom: "2%",
                        }}
                      />
                      <button className="btnb" onClick={borrow}>
                        Borrow
                      </button>{" "}
                      <button
                        className="btnr"
                        onClick={() => showDetails(item)}
                      >
                        Want to read
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <> Searching... </>
            )}
          </div>
        )}
      </div>
      <h1 style={{ color: "#2A6356", fontSize: "40px", fontWeight: "400" }}>
        Get to know some avid readers!!
      </h1>
      <hr
        style={{
          border: "1px solid #709f88",
          width: "80%",
          marginLeft: "10%",
          marginTop: "1.5%",
        }}
      />
      <Testimonials />
      <div className="aboutDiv">
        <h2 style={{ color: "#2A6356", fontSize: "40px", fontWeight: "400" }}>
          About us
        </h2>
        <hr
          style={{
            border: "1px solid #709f88",
            width: "80%",
            marginLeft: "10%",
            marginTop: "1.5%",
          }}
        />
        <i
          className="fa-solid fa-quote-left"
          style={{ fontSize: "60px", color: "#D3AC80" }}
        ></i>
        <h2 className="abouthead">
          <i>
            {" "}
            Welcome to the Online Library, Get access to all content. What ever
            you want, just find it here. We are here with a huge variety of
            content available, awaiting for you.
          </i>
        </h2>
        <i
          className="fa-solid fa-quote-right"
          style={{ fontSize: "60px", color: "#D3AC80" }}
        ></i>
      </div>
      <hr
        style={{
          border: "1px solid #709f88",
          width: "80%",
          marginLeft: "10%",
          marginTop: "1.5%",
        }}
      />

      <footer>
        <h3>@book.online.store.com</h3>
      </footer>
    </>
  );
}
