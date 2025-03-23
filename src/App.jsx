import { useState } from "react";

function App() {

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

  const [expenses, setExpenses] = useState(()=>{
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      title: name,
      amount: parseFloat(amount).toFixed(2),
      timeline: date,
      description: desc
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses)); // Fixed typo here

    setName('');
    setAmount(0);
    setDate('');
    setDesc('');
  };


  const clearTransactions=()=>{
    setExpenses([]);
    localStorage.removeItem('expenses');
  }

  return (
    <main>
      <h1>Expense Tracker</h1>
      <p className="total">
        Total: $
        {expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0).toFixed(2)}
      </p>
      <br />
      <div className="details">
        <form onSubmit={handleSubmit}>
          <fieldset className="form-area">
            <legend>Add New Transaction</legend>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Item Name"
              required
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              required
            />
            <br />
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <div className="desc">
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Description"
                required
              />
            </div>
          </fieldset>
          <button type="submit">Add Transaction</button>
          <button onClick={clearTransactions}>Clear All Transaction</button>
        </form>
        <br />
        <div className="transactions">
          <ul className="transactions-list">
            {expenses.length>0 ? expenses.map((expense) => {
              return (
                <li key={expense.id}>
                  <div className="transaction-info">
                    <h3>Item Name: {expense.title}</h3>
                    <p className="amount">Amount: {expense.amount}</p>
                    <div>
                      <p className="date">
                        Transaction Period: {expense.timeline}
                      </p>
                    </div>
                  </div>
                  <p className="description">
                    Description: {expense.description}
                  </p>
                </li>
              );
            }) :
              <h3 className="empty-transactions">No Transactions Yet... Add Now</h3>
            }
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;