function Invoice() {

    const invoices = [
        { id: 1, amount: "1781.31", from: "Smith.co" },
        { id: 2, amount: "2399.99", from: "TechWorld" },
        { id: 3, amount: "1250.75", from: "GadgetStore" },
    ];


    return (
      <>
        {/* Tax-Free Header outside the container */}
        <h1 className="tax-free-header">Tax-Free</h1>
        <p className="update-color">update on 26 March 2025, at 13:45 PM </p>

        {/* Invoice Area */}
      <div className="invoice-area">
        <div className="invoice-heading">
            <p>Invoices</p>
            <button className="btn">Make a payment</button>
        </div>

        {invoices.map((invoice) => (
            <div key={invoices.id} className="child-container">
                <p>
                    <span className="amount">{invoice.amount}</span> 
                    <span className="currency">NZDD</span>
                </p>
                <div className="smaller-container">
                    <p>.</p>
                </div>
                <div className="bottom-container">
                    <span className="color">From:</span>
                    <span className="color">Smith.co</span>
                    <button className="reject-button">Reject</button>
                    <button className="reject-button">Pay</button>
                </div>
            </div>
            ))}
        </div>
        <div className="invoice-area"></div>
            <div className="invoice-heading">
                <p>Transactions</p>
            </div>

            {invoices.map((invoice) => (
            <div key={invoices.id} className="child-container">
                <p>
                    <span className="amount">{invoice.amount}</span> 
                    <span className="currency">{invoice.currency}</span>
                </p>
                <div className="smaller-container">
                    <p>Supplier1</p>
                </div>
            </div>
            ))}
      </>
    );
  }
  
  export default Invoice;