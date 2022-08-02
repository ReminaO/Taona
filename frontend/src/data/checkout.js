const stripe = Stripe("pk_test_51LMyQ9DVJPzOBtu2zWgfIv1AIoIUbQfm1pNfsy9Wmf9Q5Yz0UkH8J5Va2JC1lDY9AdWJztTlxUgLF1DuDNkfklPD004ADOaYhp");
const axios = require('axios')

let user = localStorage.getItem('user')
if (!user) {
    user = {
    userId: -1,
    token: '',
    }
} else {
    try {
    user = JSON.parse(user)
    } catch (ex) {
    user = {
        userId: -1,
        token: '',
        }
    }
}

const instance = axios.create({
    baseURL: 'http://localhost:4242/',
    headers: {'Authorization': 'Bearer '+ `${user.token}`}
})
// The items the customer wants to buy
const items = localStorage.getItem('cartItem');
const amount = localStorage.getItem('totalCart')

let elements;
// initialize()
checkStatus();

// document.querySelector("#payment-form").addEventListener("submit", handleSubmit);

// Fetches a payment intent and captures the client secret
export async function initialize() {
    console.log(items)
    const response = await instance.post("/create-payment-intent", {
        items,
        amount
    })
    const { clientSecret } = await response.data;

    const appearance = {
        theme: 'stripe',
    };
    elements = stripe.elements({ appearance, clientSecret });

    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");
}

export async function handleSubmit() {
    setLoading(true);

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:8080/validation",
        },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
        showMessage(error.message);
    } else {
        showMessage("An unexpected error occurred.");
    }

    setLoading(false);
}

// Fetches the payment intent status after payment submission
export async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
    );

    if (!clientSecret) {
        return;
    }

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

    switch (paymentIntent.status) {
        case "succeeded":
        showMessage("Payment succeeded!");
        break;
        case "processing":
        showMessage("Your payment is processing.");
        break;
        case "requires_payment_method":
        showMessage("Your payment was not successful, please try again.");
        break;
        default:
        showMessage("Something went wrong.");
        break;
    }
}

// ------- UI helpers -------

export function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");

    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;

    setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageText.textContent = "";
    }, 4000);
}

// Show a spinner on payment submission
export function setLoading(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
}