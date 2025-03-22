function Invoice() {
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
        <div className="child-container">
            <p>
                <span className="amount">1781.31</span> 
                <span className="currency">NZDD</span>
            </p>
            <div className="smaller-container">
                <p>price</p>
            </div>
            <div className="bottom-container">
                <span className="color">From:</span>
                <span className="color">Smith.co</span>
                <button className="reject-button">Reject</button>
                <button className="reject-button">Pay</button>
            </div>
        </div>
        <div className="child-container">
            <p>
                <span className="amount">23.42</span> 
                <span className="currency">NZDD</span>
            </p>
            <div className="smaller-container">
                <p>price</p>
            </div>
            <div className="bottom-container">
                <span className="color">From:</span>
                <span className="color">Paul Company</span>
                <button className="reject-button">Reject</button>
                <button className="reject-button">Pay</button>
            </div>
        </div>
        {/* Add your invoice content here */}
      </div>
      </>
    );
  }

  
  export default Invoice;

  function Transaction() {
    return (
        <h1 className="Transaction">Transaction</h1>
    )
  }
  