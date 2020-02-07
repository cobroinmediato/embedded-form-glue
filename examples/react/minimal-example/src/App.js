import React, { Component } from "react";
import KRGlue from "@lyracom/embedded-form-glue";
import "./App.css";

class App extends Component {
  state = { promiseError: null };

  render() {
    return (
      <div className="form">
        <h1>Payment form</h1>
        <div className="container">
          <div id="myPaymentForm"></div>
          <div>{this.state.promiseError}</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const endpoint = "https://api.payzen.eu";
    const publicKey = "33148340:testpublickey_l83P7WpRK2hoUIcWyFVQsd4Omsz0XbCKYtNKeGbpX6CvS";
    const formToken = "DEMO-TOKEN-TO-BE-REPLACED";

    KRGlue.loadLibrary(endpoint, publicKey) /* Load the remote library */
      .then(({ KR }) =>
        KR.setFormConfig({
           /* set the minimal configuration */
           formToken: formToken,
           "kr-post-url-success":"https://finense.pagekite.me/",
           "kr-language": "fr-FR"
        })
      )
      .then(({ KR }) =>
        KR.addForm("#myPaymentForm")
      ) /* add a payment form  to myPaymentForm div*/
      .then(({ KR, result }) =>
        KR.showForm(result.formId)
      ) /* show the payment form */
      .catch(error =>
        this.setState({
          promiseError: error + " (see console for more details)"
        })
      );
  }
}

export default App;
