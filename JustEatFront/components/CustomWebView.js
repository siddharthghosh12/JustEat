import React from 'react';
import { WebView } from 'react-native-webview';
import {Image,View} from 'react-native'

const STRIPE_PK = 'pk_test_51IGQjZEaYUO8XnrmJ6Dgp7soqNrOTTsDcbOJcvt0dEVPtkxAA8vSLvbU7sdn5jTCQ2fSpSHvh82HdJkGL7ARAYZP00O7yA0xIw'

const CustomWebView = ({clientSecret}) => {

const htmlContent = `
     <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
                <title>Payment Page</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <script src="https://js.stripe.com/v3/"></script>
                <style>
                

                body {
                    font-family:Source Code Pro, Consolas, Menlo, monospace;
                    font-size: 16px;
                    -webkit-font-smoothing: antialiased;
                    font-size:18px;
                    font-weight:500
                  }
                  button:disabled{
                      opacity:0.5;
                      background:#a9a9a9
                  }
                  button {
                    background: #00a300;
                    color: #ffffff;
                    font-family: Arial, sans-serif;
                    border-radius: 0 0 4px 4px;
                    border: 0;
                    padding: 12px 16px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    display: block;
                    transition: all 0.2s ease;
                    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                    width: 100%;
                  }
                .card-holder{
                    display: flex;
                    flex-direction: column;
                    height: 200px;
                    justify-content: space-around;
                    background-color: #4dc9ff;
                    border-radius: 20px;
                    padding: 10px;
                    padding-top: 20px;
                    padding-bottom: 20px;
                    margin-top: 50px;
                    margin-bottom: 50px;
                }
                .card-element{
                    height: 100px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }
                .card-name{
                    padding: 20;
                    color: '#ecfaff';
                    font-weight: 500;
                    font-size: '25px';
                    background-color: transparent;
                    border: none;
                
                }
                input {
                    outline:none;
                    color: #ecfaff;
                    font-size: '25px';
                    font-weight: 500;
                    background-color: transparent;
                    }
                    
                    .row{
                        margin-top: '50px';
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                    }
                    .card-errors{
                        color: red;
                    }
                    .pay-btn{
                        display: flex;
                        height: 50px;
                        justify-content: center;
                        align-items: center;
                    }
                    .hidden {
                        display: none;
                      }
                      
                    .spinner,
                    .spinner:before,
                    .spinner:after {
                    border-radius: 50%;
                    }
                    .spinner {
                    color: #ffffff;
                    font-size: 22px;
                    text-indent: -99999px;
                    margin: 0px auto;
                    position: relative;
                    width: 20px;
                    height: 20px;
                    box-shadow: inset 0 0 0 2px;
                    -webkit-transform: translateZ(0);
                    -ms-transform: translateZ(0);
                    transform: translateZ(0);
                    }
                    .spinner:before,
                    .spinner:after {
                    position: absolute;
                    content: "";
                    }
                    .spinner:before {
                    width: 10.4px;
                    height: 20.4px;
                    background: #5469d4;
                    border-radius: 20.4px 0 0 20.4px;
                    top: -0.2px;
                    left: -0.2px;
                    -webkit-transform-origin: 10.4px 10.2px;
                    transform-origin: 10.4px 10.2px;
                    -webkit-animation: loading 2s infinite ease 1.5s;
                    animation: loading 2s infinite ease 1.5s;
                    }
                    .spinner:after {
                    width: 10.4px;
                    height: 10.2px;
                    background: #5469d4;
                    border-radius: 0 10.2px 10.2px 0;
                    top: -0.1px;
                    left: 10.2px;
                    -webkit-transform-origin: 0px 10.2px;
                    transform-origin: 0px 10.2px;
                    -webkit-animation: loading 2s infinite ease;
                    animation: loading 2s infinite ease;
                    }
                    @-webkit-keyframes loading {
                    0% {
                        -webkit-transform: rotate(0deg);
                        transform: rotate(0deg);
                    }
                    100% {
                        -webkit-transform: rotate(360deg);
                        transform: rotate(360deg);
                    }
                    }
                    @keyframes loading {
                    0% {
                        -webkit-transform: rotate(0deg);
                        transform: rotate(0deg);
                    }
                    100% {
                        -webkit-transform: rotate(360deg);
                        transform: rotate(360deg);
                    }
                    }
                </style>
            
            </head>
            <body>
                
                <div class="container-fluid">
                    <div class="row">
                        <label class="card-errors" id="card-errors"></label>
                    </div>
            
                        <form>
                            <div class="card-holder">
                            
                            <div class="form-row">
                            <label>
                                <span style="color:#fff">CardHolder Name</span>
                                <input type="text" class='card-name' />
                            </label>
                        </div> 
                                    <div id="card-element" class="card-element">
                                        <div class="form-group">
                                            <label for="card_number">Card Number</label>
                                            <input type="text" class="form-control" id="card_number" data-stripe="number"  />
                                        </div>
                                        <div class="form-row">
                                            <label>
                                                <span>Card number</span>
                                                <input type="text" size="20" data-stripe="number">
                                            </label>
                                        </div> 
                                    
                                        <div class="form-row">
                                        <label>
                                            <span>Expiration (MM/YY)</span>
                                            <input type="text" size="2" data-stripe="exp_month">
                                        </label>
                                        <span> / </span>
                                        <input type="text" size="2" data-stripe="exp_year">
                                        </div>
                                    
                                        <div class="form-row">
                                        <label>
                                            <span>CVC</span>
                                            <input type="text" size="4" data-stripe="cvc">
                                        </label>
                                        </div>
                                    
                                        <div class="form-row">
                                        <label>
                                            <span>Billing Zip</span>
                                            <input type="hidden" size="6" data-stripe="address_zip" value="400012">
                                        </label>
                                        </div>
                                    
                                        
                                    </div>
                                </div>
                            
                    
                                    <button id="submit">
                                        <div class="spinner hidden" id="spinner"></div>
                                        <span id="button-text">Pay Now</span>
                                    </button>
                           
                        </form>
            
                    
                </div>
                
                <script>
                    var stripe = Stripe('${STRIPE_PK}');
                    var elements = stripe.elements();
            
                    document.querySelector("button").disabled = true;
                     
                        var card = elements.create("card", {
                            hidePostalCode: true,
                            style: {
                                base: {
                                color: '#FFF',
                                fontWeight: 500,
                                fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
                                fontSize: '20px',
                                fontSmoothing: 'antialiased',
                                '::placeholder': {
                                    color: '#ecfaff',
                                },
                                ':-webkit-autofill': {
                                    color: '#e39f48',
                                },
                            },
                            invalid: {
                                color: '#FC011F',
                                '::placeholder': {
                                    color: '#FFCCA5',
                                },
                            },
                            }
                        });

                        
                        // Add an instance of the card Element into the 'card-element' <div>.
                        card.mount('#card-element');
                        /**
                         * Error Handling
                         */
                        //show card error if entered Invalid Card Number
                        function showCardError(error){
                            document.getElementById('card-errors').innerHTML = ""
                            if(error){
                                document.getElementById('card-errors').innerHTML = error
                            } 
                        }
                        
                        card.on('change', function(event) {
                            document.querySelector("button").disabled = event.empty;
                            if (event.complete) {
                                showCardError()
                                // enable payment button
                            } else if (event.error) {
                                const { message} = event.error
                                showCardError(message)
                            }
                        });
                        
                        
                        var form =  document.querySelector('form');
                        
                        form.addEventListener('submit', function(e) {
                            e.preventDefault();
                            payWithCard(stripe,card,'${clientSecret}');
                        })

                        var payWithCard = function(stripe,card,clientSecret){
                            loading(true);
                            stripe.confirmCardPayment(clientSecret,{
                                payment_method :{
                                    card:card
                                }
                            }).then(function(result) {
                                window.postMessage(JSON.stringify(result),'*');
                            })
                        }


                        var loading = function(isLoading) {
                            if (isLoading) {
                              // Disable the button and show a spinner
                              document.querySelector("button").disabled = true;
                              document.querySelector("#spinner").classList.remove("hidden");
                              document.querySelector("#button-text").classList.add("hidden");
                            } else {
                              document.querySelector("button").disabled = false;
                              document.querySelector("#spinner").classList.add("hidden");
                              document.querySelector("#button-text").classList.remove("hidden");
                            }
                          };
                </script>
            </body>
            </html>
`

const injectedJavaScript = `(function() {
    window.postMessage = function(data){
        window.ReactNativeWebView.postMessage(data);
    };
})()`;

const onMessage = (event) => {
    const { data } = event.nativeEvent;
    console.log(data)
}




    const LoadingImage = () => {
        return (
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../assets/Cardanim.gif')} style={{width:200,height:200}} />
            </View>
        )
    }

    return  (
        
            <WebView
                javaScriptEnabled
                injectedJavaScript={injectedJavaScript}
                style={{flex:1}}
                originWhitelist={['*']}
                source={{html:htmlContent}}
                startInLoadingState
                onMessage={onMessage}
                renderLoading={() => {
                    return <LoadingImage />
                }}
            />
    
    );
}

export default CustomWebView;