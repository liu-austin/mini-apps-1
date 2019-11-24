// jshint esversion:6
import React from 'react';
import axios from 'axios';

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
           page: 'home',
           userid: null, 
           _name: '',
           email: '',
           _password: '',
           line1: '',
           line2: '',
           _state: '',
           zipcode: '',
           creditcard: '',
           expirydate: '',
           cvv: '',
           zipcode2: ''
        };
        this.findId = this.findId.bind(this);
        this.setPage = this.setPage.bind(this);
        
        this.nameHandleChange = this.nameHandleChange.bind(this);
        this.emailHandleChange = this.emailHandleChange.bind(this);
        this.passwordHandleChange = this.passwordHandleChange.bind(this);
        this.line1HandleChange = this.line1HandleChange.bind(this);
        this.line2HandleChange = this.line2HandleChange.bind(this);
        this.stateHandleChange = this.stateHandleChange.bind(this);
        this.zipcodeHandleChange = this.zipcodeHandleChange.bind(this);
        this.creditCardHandleChange = this.creditCardHandleChange.bind(this);
        this.expiryDateHandleChange = this.expiryDateHandleChange.bind(this);
        this.cVVHandleChange = this.cVVHandleChange.bind(this);
        this.zipcode2HandleChange = this.zipcode2HandleChange.bind(this);
    }

    nameHandleChange(e) {
        this.setState({_name: e.target.value});
    }

    emailHandleChange(e) {
        this.setState({email: e.target.value});
    }

    passwordHandleChange(e) {
        this.setState({_password: e.target.value});
    }

    line1HandleChange(e) {
        this.setState({line1: e.target.value});
    }

    line2HandleChange(e) {
        this.setState({line2: e.target.value});
    }

    stateHandleChange(e) {
        this.setState({_state: e.target.value});
    }

    zipcodeHandleChange(e) {
        this.setState({zipcode: e.target.value});
    }

    creditCardHandleChange(e) {
        this.setState({creditcard: e.target.value});
    }

    expiryDateHandleChange(e) {
        this.setState({expirydate: e.target.value});
    }

    cVVHandleChange(e) {
        this.setState({cvv: e.target.value});
    }

    zipcode2HandleChange(e) {
        this.setState({zipcode2: e.target.value});
    }
   
    findId(email) {
       axios.get(`/checkout/f1/${email}`)
       .then(results => {
            return results.data;})
       .then(data => this.setState({userid: data[0].userid}, () => console.log(this.state.userid)))
       .catch(err => console.log(err));
   }
   
    setPage(page) {
        this.setState({page: page});
    }
   
    render() {
        let page;
        if (this.state.page === 'home') {
            page = <HomePage setPage={this.setPage}/>;
        } else if (this.state.page === 'form1') {
            page = <Form1 _name={this.state._name} _password={this.state._password} email={this.state.email} nameHandleChange={this.nameHandleChange} emailHandleChange={this.emailHandleChange} passwordHandleChange={this.passwordHandleChange} setPage={this.setPage} findId={this.findId}/>;
        } else if (this.state.page === 'form2') {
            page = <Form2 line1={this.state.line1} line2={this.state.line2} _state={this.state._state} zipcode={this.state.zipcode} line1HandleChange={this.line1HandleChange} line2HandleChange={this.line2HandleChange} stateHandleChange={this.stateHandleChange} zipcodeHandleChange={this.zipcodeHandleChange} userId={this.state.userid} setPage={this.setPage}/>;
        } else if (this.state.page === 'form3') {
            page = <Form3 creditcard={this.state.creditcard} expirydate={this.state.expirydate} cvv={this.state.cvv} zipcode2={this.state.zipcode2} creditCardHandleChange={this.creditCardHandleChange} expiryDateHandleChange={this.expiryDateHandleChange} cVVHandleChange={this.cVVHandleChange} zipcode2HandleChange={this.zipcode2HandleChange} userId={this.state.userid} setPage={this.setPage}/>;
        } else {
            page = <PurchasePage setPage={this.setPage} userId={this.state.userid} _name={this.state._name} email={this.state.email} _password={this.state._password} line1={this.state.line1} line2={this.state.line2} _state={this.state._state} zipcode={this.state.zipcode} creditcard={this.state.creditcard} expirydate={this.state.expirydate} cvv={this.state.cvv} zipcode2={this.state.zipcode2}/>;
        }
        return (
            <div>
           <h1>MULTI-STEP CHECKOUT FORM</h1>
           {
               page
           }
           </div>
        );
    }
   }
   
   const HomePage = (props) => {
       const goToForm1 = () => {
           props.setPage('form1');
       } 
       return (
           <div>
               <h1>Go To Checkout Form</h1>
               <button onClick={goToForm1}>Checkout</button>
           </div>
       );
   }
   
   const Form1 = (props) => {
   
       const goToForm2 = (e) => {
           axios.post(`/checkout/f1`, {
               _name: props._name,
               email: props.email,
               _password: props._password
           })
           .then(() => console.log('Form 1 data submitted.'))
           .then(() => props.findId(props.email))
           .then(() => props.setPage('form2'))
           .catch(err => {
               console.log(err);
               alert('Form 1 data was submitted incorrectly.');
           });
           e.preventDefault();
       }
       
        return (
               <div>
                   <form>
                       <label>Name
                           <input name='_name' onChange={props.nameHandleChange} value={props._name}/>
                       </label>
                       <label>Email
                           <input name='email' onChange={props.emailHandleChange} value={props.email}/>
                       </label>
                       <label>Password
                           <input name='_password' onChange={props.passwordHandleChange} value={props._password}/>
                       </label>
                       <button onClick={goToForm2}>Go to Shipping Form</button>
                   </form>
               </div>
        );
   };
   
   const Form2 = (props) => {
   
       const goToForm3 = (e) => {
           axios.post(`/checkout/f2`, {
            
               line1: props.line1,
               line2: props.line2,
               _state: props._state,
               zipcode: props.zipcode,
               userid: props.userId
           })
           .then(() => console.log('Form 2 data submitted.'))
           .then(() => props.setPage('form3'))
           .catch(err => {
               console.log(err);
               alert('Form 2 data was submitted incorrectly.');
              });
            e.preventDefault();
       } 
        return (
               <div>
                   <form>
                       <label>Line 1
                           <input name='line1' onChange={props.line1HandleChange} value={props.line1}/>
                       </label>
                       <label>Line 2
                           <input name='line2' onChange={props.line2HandleChange} value={props.line2}/>
                       </label>
                       <label>State
                           <input name='_state' onChange={props.stateHandleChange} value={props._state}/>
                       </label>
                       <label>Zip Code
                           <input name='zipcode' onChange={props.zipcodeHandleChange} value={props.zipcode}/>
                       </label>
                       <button onClick={goToForm3}>Go to Billing Form</button>
                   </form>
               </div>
           );
   };
   
   const Form3 = (props) => {
       const goToPurchase = (e) => {

           axios.post(`/checkout/f3`, {
               creditcard: props.creditcard,
               expirydate: props.expirydate,
               cvv: props.cvv,
               zipcode: props.zipcode2,
               userid: props.userId
           })
           .then(() => console.log('Form 3 data submitted.'))
           .then(() => props.setPage('purchase'))
           .catch(err => {
               console.log(err);
               alert('Form 3 data was submitted incorrectly.');
              });
            e.preventDefault();
       }
   
        return (
            <div>
            <form>
                <label>Credit Card #
                    <input name='line1' onChange={props.creditCardHandleChange} value={props.creditcard}/>
                </label>
                <label>Expiration Date
                    <input name='line2' onChange={props.expiryDateHandleChange} value={props.expirydate}/>
                </label>
                <label>CVV
                    <input name='_state' onChange={props.cVVHandleChange} value={props.cvv}/>
                </label>
                <label>Zip Code
                    <input name='zipcode' onChange={props.zipcode2HandleChange} value={props.zipcode2}/>
                </label>
                <button onClick={goToPurchase}>Go to Purchase</button>
            </form>
        </div>
        );
   };
   
   const PurchasePage = (props) => {
       const goToHome = () => {
           props.setPage('home');
       };

        return (
               <div>
                   <div>
                    <span>{`${props._name}\n`}</span>
                    <span>{`${props.email}\n`}</span>
                    <span>{`${props._password}\n`}</span>
                    <span>{`${props.line1}\n`}</span>
                    <span>{`${props.line2}\n`}</span>
                    <span>{`${props._state}\n`}</span>
                    <span>{`${props.zipcode}\n`}</span>
                    <span>{`${props.creditcard}\n`}</span>
                    <span>{`${props.expirydate}\n`}</span>
                    <span>{`${props.cvv}\n`}</span>
                    <span>{`${props.zipcode2}\n`}</span>
                   </div>
                   <button onClick={goToHome}>Go to Home</button>
               </div>
           );
    }
   