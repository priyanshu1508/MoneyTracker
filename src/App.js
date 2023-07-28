import React from "react";
import "./App.css"
import { useState,useEffect } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [mode, setMode] = useState("light");

  useEffect(() => {
    getTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    const response = await fetch(url);
    return await response.json();
  }

  async function addTransaction(ev) {
    ev.preventDefault();
    if (!name || !price || !description || !datetime) {
      alert("Please Fill All the Details");
    } else {
      const url = process.env.REACT_APP_API_URL + "/transaction";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name: name.substring(0, 25),
          price,
          description,
          datetime,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        response.json().then((json) => {
          setName("");
          setPrice("");
          setDatetime("");
          setDescription("");
          console.log("result", json);
        });
      });
    }
    window.location.reload();
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#081b29";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "#fff";
    }
  };
  return (
    <div
      style={{
        backgroundColor: mode === "dark" ? "#081b29" : "#fff",
        color: mode === "dark" ? "#fff" : "#081b29",
      }}
    >
      <div
        style={{
          backgroundColor: mode === "dark" ? "#081b29" : "#fff",
          color: mode === "dark" ? "#fff" : "#081b29",
        }}
      >
        <nav
          className="navbar1"
          style={{
            backgroundColor: mode === "dark" ? "#081b29" : "#fff",
            color: mode === "dark" ? "#fff" : "#081b29",
          }}
        >
          <h1 className="brand">MoneyTrack</h1>
          <button
            type="button"
            class={`btn btn-${mode === "dark" ? "light" : "dark"}`}
            onClick={toggleMode}
            onChange={setMode}
            style={{ height: "45px", marginTop: "10px" }}
          >
            {mode === "dark" ? "Light" : "Dark"} Mode
          </button>
        </nav>
        <main className="parent">
          <div className="formdiv">
            <h1
              style={{
                backgroundColor: mode === "dark" ? "#081b29" : "#fff",
                color: mode === "dark" ? "#fff" : "#081b29",
              }}
            >
              &#8377; {balance.toFixed(2)}
            </h1>
            <form onSubmit={addTransaction}>
              <div className="basics">
                <h5
                  style={{
                    backgroundColor: mode === "dark" ? "#081b29" : "#fff",
                    color: mode === "dark" ? "#fff" : "#081b29",
                  }}
                >
                  New Entry
                </h5>
                <input
                  style={{
                    backgroundColor: mode === "dark" ? "#081b29" : "#fff",
                    color: mode === "dark" ? "#fff" : "#081b29",
                    border:
                      mode === "dark" ? "2px solid white" : "2px solid #081b29",
                  }}
                  type="text"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
                <h5
                  style={{
                    backgroundColor: mode === "dark" ? "#081b29" : "#fff",
                    color: mode === "dark" ? "#fff" : "#081b29",
                  }}
                >
                  Credit/Debit
                  <span style={{ fontSize: "1rem" }}>
                    {" "}
                    eg:+400/-300 (in Rs)
                  </span>
                </h5>
                <input
                  style={{
                    backgroundColor: mode === "dark" ? "#081b29" : "#fff",
                    color: mode === "dark" ? "#fff" : "#081b29",
                    border:
                      mode === "dark" ? "2px solid white" : "2px solid #081b29",
                  }}
                  type="text"
                  value={price}
                  onChange={(ev) => setPrice(ev.target.value)}
                />
                <h5
                  style={{
                    color: mode === "dark" ? "#fff" : "#081b29",
                  }}
                >
                  Date/Time
                </h5>
                <input
                  style={{
                    backgroundColor: mode === "dark" ? "#081b29" : "#fff",
                    color: mode === "dark" ? "#fff" : "#081b29",
                    border:
                      mode === "dark" ? "2px solid white" : "2px solid #081b29",
                  }}
                  type="datetime-local"
                  value={datetime}
                  onChange={(ev) => setDatetime(ev.target.value)}
                />
              </div>
              <div className="description">
                <h5
                  style={{
                    backgroundColor: mode === "dark" ? "#081b29" : "#fff",
                    color: mode === "dark" ? "#fff" : "#081b29",
                  }}
                >
                  Description
                  <span style={{ fontSize: "1rem" }}>
                    {" "}
                    (Upto 100 characters)
                  </span>
                </h5>
                <input
                  style={{
                    backgroundColor: mode === "dark" ? "#081b29" : "#fff",
                    color: mode === "dark" ? "#fff" : "#081b29",
                    border:
                      mode === "dark" ? "2px solid white" : "2px solid #081b29",
                    placeholder: mode === "dark" ? "#fff" : "#081b29",
                  }}
                  type="text"
                  value={description}
                  onChange={(ev) =>
                    setDescription(ev.target.value.substring(0, 100))
                  }
                />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: mode === "dark" ? "#fff" : "#081b29",
                  color: mode === "dark" ? "#081b29" : "#fff",
                }}
              >
                Add Transaction
              </button>
            </form>
          </div>
          <div
            className="panel scrollbar-thin"
            style={{
              backgroundColor: mode === "dark" ? "#081b29" : "#fff",
              color: mode === "dark" ? "#fff" : "#081b29",
              border: mode === "dark" ? "2px solid white" : "2px solid #081b29",
            }}
          >
            {console.log(transactions)}
            {transactions.length > 0 &&
              transactions.map((transaction) => (
                <div
                  className="transaction"
                  style={{
                    borderBottom:
                      mode === "dark" ? "1px solid white" : "1px solid #081b29",
                  }}
                >
                  <div className="left">
                    <div className="name">{transaction.name}</div>
                    <div className="itemdescription">
                      {transaction.description}
                    </div>
                  </div>
                  <div className="right">
                    <div
                      className={
                        "price" + (transaction.price < 0 ? "red" : "green")
                      }
                    >
                      &#8377; {transaction.price}
                    </div>
                    <div className="datetime">{transaction.datetime}</div>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}
