import React from "react";
import PaypalExpressBtn from 'react-paypal-express-checkout';

const Paypal = props => {
  const onSuccess = payment => {
    // Congratulation, it came here means everything's fine!
    props.onSuccess(payment);
    // console.log("The payment was succeeded!", JSON.stringify(payment));
    // {
    //   "paid":true,
    //   "cancelled":false,
    //   "payerID":"ZB7XFSJLMP436",
    //   "paymentID":"PAYID-LVZ5KFI8KK23048W74356233",
    //   "paymentToken":"EC-7TF412978J696652N",
    //   "returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LVZ5KFI8KK23048W74356233&token=EC-7TF412978J696652N&PayerID=ZB7XFSJLMP436",
    //   "address": {
    //     "recipient_name":"John Doe",
    //     "line1":"Spitalfields Arts Market,112 Brick Lane,",
    //      "city":"London",
    //      "state":"London",
    //      "postal_code":"E1 6RL",
    //      "country_code":"GB"
    //     },
    //   "email":"sb-cepoj143746@personal.example.com"
    // }
  };

  const onCancel = data => {
    // User pressed "cancel" or close Paypal's popup!
    console.log("The payment was cancelled!", JSON.stringify(data));
    // {
    //   "paymentToken":"EC-90E31189343625040",
    //   "paymentID":"PAYID-LVZ5HFA8DK16787CW837562M",
    //   "intent":"sale",
    //   "billingID":"EC-90E31189343625040",
    //   "cancelUrl":"https://www.paypal.com/checkoutnow/error?token=EC-90E31189343625040"
    // }
  };

  const onError = err => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", JSON.stringify(err));
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };

  let env = "sandbox";
  let currency = "GBP";
  let total = props.toPay;

  const client = {
    sandbox:'AXfarSSL70-Ycfgrp_Kcv9lhil7ZWAp5uwDNKdJYo1Md-fWCTVeZvtKQbpWUhatGKUmmwmzT0wAywVde',
    production:''
  }

  return <div>
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={total}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
      style={{
        size: 'large',
        color: 'blue',
        label: 'pay',
        shape: 'rect'
      }}
    />
  </div>;
};

export default Paypal;
