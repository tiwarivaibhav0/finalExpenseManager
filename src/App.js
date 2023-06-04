/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React, { useEffect, useState } from "react";
function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

const Form = (props) => {
  const [state, setState] = React.useState({
    expenseAmount: "",
    emptyAmount: "",
    category: "",
    emptyCat: "",
    expenses: [],
    count: 0,
    updateExpenseId: "",
    calculatecategory: "",
    netExpense: "",
    updateIncome: "",
    income: 0,
    allExpenses: 0,
    delLast: 0,
  });
  const [update,setUpdate]=useState("");
  useEffect(() => {
    allExpenses();
  }, [state.expenses]);

  const addEXpense = (e) => {
   
    e.preventDefault();
    var newExpense = [];
    newExpense = [Number(state.expenseAmount), state.category, state.count];
    if (state.expenseAmount == "" || state.expenseAmount < 1) {
      setState({
        ...state,
        emptyAmount: "*Please Enter Valid Amount",
      });
    } else if (state.category == "") {
      setState({
        ...state,
        emptyCat: "*Select a Valid Category",
      });
    } 
    else if(update!=="")
    {
      for (let i = 0; i < state.expenses.length; i++) {
        if (state.expenses[i][2] == update) {
         state.expenses[i]=newExpense;
         break;
          
        }
    }
    setState({
      ...state,

      expenseAmount: "",
      count: state.count + 1,
      expenses: [...state.expenses],
    });
    setUpdate("");
  }
    else {
      setState({
        ...state,

        expenseAmount: "",
        count: state.count + 1,
        expenses: [...state.expenses, newExpense],
      }); 
    }
  };

  const deleteExpense = (e) => {
    var delID = e.target.id;
    var index = "";
    for (let i = 0; i < state.expenses.length; i++) {
      if (state.expenses[i][2] == delID) {
        index = i;
        
      }
    }
    setState({
      ...state,

      expenses: [...state.expenses.filter((_, i) => i !== index)],
    });
  };

  const allExpenses = () => {
    var res = 0;
    for (let i = 0; i < state.expenses.length; i++) {
      res += state.expenses[i][0];
    }

    setState({
      ...state,
      netExpense:"",
      allExpenses: res,
    });
  };
  const updateExpenseId = (e) => {
    setState({
      ...state,

      updateExpenseId: e.target.id,
    });
  };
  const updateExpense = (e) => {
    var val = e.target.value;
    if (val == "" || val == 0) {
      deleteExpense(e);
      alert("Expense Deleted");
    } else {
      var updateId = state.updateExpenseId;
      var index;
      for (let i = 0; i < state.expenses.length; i++) {
        if (state.expenses[i][2] == updateId) {
          index = i;
        }
      }

      var tempExpense = [];
      tempExpense = [...state.expenses];
      tempExpense[index][0] = Number(e.target.value);
      setState({
        ...state,
        expenses: tempExpense,
      });

    }
  };

  const calculateExpense = () => {
    if (state.calculatecategory === "") {
      var res = 0;
      for (let i = 0; i < state.expenses.length; i++) {
        res += state.expenses[i][0];
      }

      setState({
        ...state,

        netExpense: res,
      });
    } else {
      var val = state.calculatecategory;
      res = 0;
      for (let i = 0; i < state.expenses.length; i++) {
        if (state.expenses[i][1] == val) res += state.expenses[i][0];
      }

      setState({
        ...state,

        netExpense: res,
      });
    }
  };
  const updateIncome = (e) => {
    e.preventDefault();

    if (state.updateIncome > 0) {
      var updateIncome = Number(state.income) + Number(state.updateIncome);
      setState({
        ...state,
        updateIncome:"",
        income: updateIncome,
      });
    } else {
      alert("Please enter a valid value in Income Column");
    }
  };
  const reset = () => {
    setState({
      ...state,
      expenseAmount: "",
      emptyAmount: "",
      category: "",
      emptyCat: "",
      expenses: [],
      count: 0,
      updateExpenseId: "",
      calculatecategory: "",
      netExpense: "",
      updateIncome: "",
      income: 0,
      allExpenses: 0,
    });
  };

  return (
    <>
      <div className="main">
        <h1 id="title">Expense Tracker</h1>
        <form className="form">
          <table className="inp">
            <tr>
              <td>
                <input
                  type="number"
                  placeholder="Add to Income"
                  onChange={(e) => {
                    setState({ ...state, updateIncome: e.target.value });
                  }}
                  value={state.updateIncome}
                />
              </td>
              <td>
                <button onClick={updateIncome}>Update Income</button>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="number"
                  placeholder="Enter expense amount"
                  onChange={(e) => {
                    setState({
                      ...state,

                      expenseAmount: e.target.value,
                      emptyAmount: "",
                    });
                  }}
                  value={state.expenseAmount}
                />
              </td>

           
                <td>
                  <select
                    onChange={(e) => {
                      setState({
                        ...state,

                        category: e.target.value,
                        emptyCat: "",
                      });
                    }}
                    disabled={state.expenseAmount === ""}
                  >
                    <option value="" disabled selected>
                      Choose Expense Category
                    </option>

                    <option value="Grocery">Grocery</option>
                    <option value="Veggies">Veggies</option>
                    <option value="Travelling">Travelling</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                  </select>
                </td>
           

              <td>
                <button onClick={addEXpense}>{update!==""?"UPDATE":"ADD"}</button>
              </td>
            </tr>
            <tr>
              <td>{state.emptyAmount}</td>
              <td>{state.emptyCat}</td>
            </tr>

            <tr></tr>
            <tr>
              <td>Income: ₹{state.income}</td>
              <td>Expenses: ₹{state.allExpenses} </td>
              <td>Balance: {state.income - state.allExpenses}</td>
            </tr>
          </table>
        </form>

        {state.expenses.length > 0 && (
          <>
            <table className="expenses">
              <h1>Your Expenses:</h1>
              <tr>
                <th>Amount</th>
                <th>Category</th>

                <th>Action(s)</th>
              </tr>
              {state.expenses.map((item, index) => (
                <tr key={item[2]}>
                  <td id={item[2]}>
                    <input
                     readOnly
                      type="number"
                      value={item[0]}
                      onChange={updateExpense}
                      id={item[2]}
                      onClick={updateExpenseId}
                    />
                  </td>
                  <td>{item[1]}</td>
                  <td >
                    <div id="actions"><span id={item[2]}
                      onClick={(e)=>{setState({...state,expenseAmount:item[0],category:item[1]});setUpdate(item[2])}} style={{ cursor: "pointer",color:"Highlight" }}>Edit</span>
                    <span
                      id={item[2]}
                      onClick={deleteExpense}
                      style={{ cursor: "pointer",color:"Highlight" }}
                    >
                      Delete
                    </span></div>
                    
                  </td>
                </tr>
              ))}
            </table>
            <table className="tbl">
              {" "}
              <tr>
                {/* <td>
                  {" "}
                  <select
                    onChange={(e) => {
                      setState({ ...state, calculatecategory: e.target.value });
                    }}
                  >
                    <option value="" disabled selected>
                      Choose Expense Category
                    </option>

                    <option value="Grocery">Grocery</option>
                    <option value="Veggies">Veggies</option>
                    <option value="Travelling">Travelling</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    <option value="">None</option>
                  </select>
                </td> */}
                <td>
                  {" "}
                  <button onClick={calculateExpense}>Calculate Expenses</button>
                </td>

                <td>
                  {" "}
                  <button onClick={reset}>Reset</button>
                </td>
              </tr>
            </table>

            {state.netExpense != "" && (
              <h2>NET EXPENSES: {state.netExpense}</h2>
            ) }
           {/* <div className="note"> Note: To edit the amount of an expense just click on the amount & type the new amount</div> */}
          </>
        )}
      </div>
    </>
  );
};
export default App;
