import React from 'react';
import { WebView } from 'react-native-webview';
import {Image,View} from 'react-native'

const STRIPE_PK = 'pk_test_51IGQjZEaYUO8XnrmJ6Dgp7soqNrOTTsDcbOJcvt0dEVPtkxAA8vSLvbU7sdn5jTCQ2fSpSHvh82HdJkGL7ARAYZP00O7yA0xIw'

const CustomWebView = ({clientSecret,checkStatus,closeModal}) => {

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
                      
                      .loading-container {
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        flex-direction:column;
                        width:100vw
                        background-color:#4dc9ff;
                        height:100vh
                    }
                    .loading {
                        width:150px;
                        height:150px;
                        box-sizing:border-box;
                        border-radius:50%;
                        border-top: 10px solid #e74c3c;
                        position:relative;
                        animation: a1 2s linear infinite;
                    }
                    .loading::before,.loading::after {
                        content: '';
                        width:150px;
                        height:150px;
                        position:absolute;
                        left:0;
                        top:-10px;
                        box-sizing:border-box;
                        border-radius:50%;
                    }
                    .loading::before {
                        border-top: 10px solid #e67e22;
                        transform : rotate(120deg);
                    }
                    .loading::after {
                        border-top: 10px solid #3495db;
                        transform : rotate(240deg);
                    }
                    .loading span {
                        position:absolute;
                        width:100px
                        height:100px;
                        color:#4dc9ff;
                        padding:20px;
                        align-self:center;
                        line-height:100px;
                        box-sizing:border-box;
                        animation: a2 2s linear infinite
                    }
                    
                    .loading_text {
                        font-size:10px;
                        margin-top:10px;
                        color:#4dc9ff
                    }

                    @keyframes a1 {
                        to {
                            transform:rotate(360deg)
                        }
                    }
                    @keyframes a2 {
                        to {
                            transform:rotate(-360deg)
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
                        <div class='row hidden' id='payment_processing'>
                            <div class="loading-container">
                                <div class='loading'>
                                    <span>Loading...</span>
                                </div>
                                <span class='loading_text'>Please wait while your payment is being confirmed...</span>
                            </div>
                        </div>
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
                                if(result.paymentIntent.status === "succeeded")
                                    window.postMessage("success");
                                else
                                    window.postMessage("failed");    
                            })
                        }


                        var loading = function(isLoading) {
                            if (isLoading) {
                              // Disable the button and show a spinner
                              document.querySelector("button").disabled = true;
                              document.querySelector("#spinner").classList.remove("hidden");
                              document.querySelector("#button-text").classList.add("hidden");
                              document.querySelector("#payment_processing").classList.remove("hidden")
                              document.querySelector("form").classList.add("hidden");
                            } else {
                              document.querySelector("button").disabled = false;
                              document.querySelector("#spinner").classList.add("hidden");
                              document.querySelector("#button-text").classList.remove("hidden");
                              document.querySelector("form").classList.remove("hidden");
                              document.querySelector("#payment_processing").classList.add("hidden")
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
    if(data == "success")
    {
        console.log('entered')
        checkStatus('success');
        closeModal()
    }
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