// jshint esversion:6
import React from 'react';
import axios from 'axios';

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
           page: 'home',
           userid: null, 
           email: ''
        };
        this.setEmail = this.setEmail.bind(this);
        this.findId = this.findId.bind(this);
        this.setPage = this.setPage.bind(this);
    }
   
    findId(email) {
       axios.get(`http://localhost:3000/checkout/f1/${email}`)
       .then(results => results.data)
       .then(data => this.setState({userid: data.userid}))
       .catch(err => console.log(err));
   }
   
    setEmail(email) {
       this.setState({email: email}, () => {
           this.findId(this.state.email);
       });
    }
   
   setPage(page) {
       this.setState({page: page});
   }
   
    componentDidMount() {
   
    }
   
    render() {
        let page;
        if (this.state.page === 'home') {
            page = <HomePage setPage={this.setPage}/>;
        } else if (this.state.page === 'form1') {
            page = <Form1 setEmail={this.setEmail} setPage={this.setPage}/>;
        } else if (this.state.page === 'form2') {
            page = <Form2 userId={this.state.userid} setPage={this.setPage}/>;
        } else if (this.state.page === 'form3') {
            page = <Form3 userId={this.state.userid} setPage={this.setPage}/>;
        } else {
            page = <PurchasePage userId={this.state.userid} setPage={this.setPage}/>;
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
   
   class Form1 extends React.Component {
       constructor(props) {
           super(props);
           this.state = {
               _name: '',
               email: '',
               _password: ''
           };
           this.nameHandleChange = this.nameHandleChange.bind(this);
           this.emailHandleChange = this.emailHandleChange.bind(this);
           this.passwordHandleChange = this.passwordHandleChange.bind(this);
       }
   
       goToForm2(e) {
           var event = e;
           axios.post(`http://localhost:3000/checkout/f1`, {
               _name: this.state._name,
               email: this.state.email,
               _password: this.state._password
           })
           .then(() => console.log('Form 1 data submitted.'))
           .then(() => this.props.setPage('form2'))
           .catch(err => {
               console.log(err);
               alert('Form 1 data was submitted incorrectly.');
           });
           event.preventDefault();
       }
       
       nameHandleChange(e) {
           this.setState({_name: e.target.value});
       }
   
       emailHandleChange(e) {
           this.setState({email: e.target.value}, () => {
               if (this.state.email.endsWith('.com')) {
                   this.props.setEmail(this.state.email);
               }
           });
       }
   
       passwordHandleChange(e) {
           this.setState({_password: e.target.value});
       }
   
       render() {
           return (
               <div>
                   <form>
                       <label>Name
                           <input name='_name' onChange={this.nameHandleChange} value={this.state._name}/>
                       </label>
                       <label>Email
                           <input name='email' onChange={this.emailHandleChange} value={this.state.email}/>
                       </label>
                       <label>Password
                           <input name='_password' onChange={this.passwordHandleChange} value={this.state._password}/>
                       </label>
                       <button onClick={this.goToForm2}>Go to Shipping Form</button>
                   </form>
               </div>
           );
       }
   };
   
   class Form2 extends React.Component {
       constructor(props) {
           super(props);
           this.state = {
               line1: '',
               line2: '',
               _state: '',
               zipcode: '',
               userid: this.props.userId
           };
           this.line1HandleChange = this.line1HandleChange.bind(this);
           this.line2HandleChange = this.line2HandleChange.bind(this);
           this.stateHandleChange = this.stateHandleChange.bind(this);
           this.zipcodeHandleChange = this.zipcodeHandleChange.bind(this);
       }
   
       goToForm3() {
           axios.post(`http://localhost:3000/checkout/f2`, {
               line1: this.state.line1,
               line2: this.state.line2,
               _state: this.state._state,
               zipcode: this.state.zipcode,
               userid: this.state.userid
           })
           .then(() => console.log('Form 2 data submitted.'))
           .then(() => this.props.setPage('form3'))
           .catch(err => {
               console.log(err);
               alert('Form 2 data was submitted incorrectly.');
              });
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
   
       render() {
           return (
               <div>
                   <form>
                       <label>Line 1
                           <input name='line1' onChange={this.line1HandleChange} value={this.state.line1}/>
                       </label>
                       <label>Line 2
                           <input name='line2' onChange={this.line2HandleChange} value={this.state.line2}/>
                       </label>
                       <label>State
                           <input name='_state' onChange={this.stateHandleChange} value={this.state._state}/>
                       </label>
                       <label>State
                           <input name='zipcode' onChange={this.zipcodeHandleChange} value={this.state.zipcode}/>
                       </label>
                       <button onClick={this.goToForm3}>Go to Billing Form</button>
                   </form>
               </div>
           );
       }
   
   };
   
   class Form3 extends React.Component {
       constructor(props) {
           super(props);
           this.state = {
               creditcard: '',
               expirydate: '',
               cvv: '',
               zipcode2: '',
               userid: this.props.userId
           };
           this.creditCardHandleChange = this.creditCardHandleChange.bind(this);
           this.expiryDateHandleChange = this.expiryDateHandleChange.bind(this);
           this.cVVHandleChange = this.cVVHandleChange.bind(this);
           this.zipcode2HandleChange = this.zipcode2HandleChange.bind(this);
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
   
       goToPurchase() {
           axios.post(`http://localhost:3000/checkout/f3`, {
               creditcard: this.state.creditcard,
               expirydate: this.state.expirydate,
               cvv: this.state.cvv,
               zipcode: this.state.zipcode2,
               userid: this.state.userid
           })
           .then(() => console.log('Form 3 data submitted.'))
           .then(() => this.props.setPage('purchase'))
           .catch(err => {
               console.log(err);
               alert('Form 3 data was submitted incorrectly.');
              });
       }
   
       render() {
           return (
               <div>
               <form>
                   <label>Credit Card #
                       <input name='line1' onChange={this.creditCardHandleChange} value={this.state.creditcard}/>
                   </label>
                   <label>Expiration Date
                       <input name='line2' onChange={this.expiryDateHandleChange} value={this.state.expirydate}/>
                   </label>
                   <label>CVV
                       <input name='_state' onChange={this.cVVHandleChange} value={this.state.cvv}/>
                   </label>
                   <label>Zip Code
                       <input name='zipcode' onChange={this.zipcode2HandleChange} value={this.state.zipcode2}/>
                   </label>
                   <button onClick={this.goToPurchase}>Go to Purchase</button>
               </form>
           </div>
           );
       }
   };
   
   class PurchasePage extends React.Component {
       constructor(props) {
           super(props);
           this.state = {
               data: null
           };
       }
       goToHome() {
           this.props.setPage('home');
       }
   
       componentDidMount() {
           axios.get(`http://localhost:3000/checkout/all/${this.props.userId}`)
           .then(results => results.data)
           .then(data => this.setState({data}))
           .catch(err => console.log(err));
       }
   
       render() {
           return (
               <div>
                   <div>
                   {
                       this.state.data ? 
                       (
                           Object.keys(this.state.data).map(key => {
                               return (
                                   <span>{`${this.state.data[key]}\n`}</span>
                               );
                           })
                       ) 
                       : 
                       (
                           null
                       )
                   }
                   </div>
                   <button onClick={this.goToHome}>Go to Home</button>
               </div>
           );
       }
   
   };
   