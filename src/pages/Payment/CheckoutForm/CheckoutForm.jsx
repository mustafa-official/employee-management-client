import PropTypes from "prop-types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";

const CheckoutForm = ({ salary, closeModal, employeeEmail }) => {
  const [error, setError] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const totalAmount = salary;


  useEffect(() => {
    if (totalAmount > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalAmount })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [axiosSecure, totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("payment successfully");

        //now save the payment in the database
        const payment = {
          email: employeeEmail,
          price: totalAmount,
          transactionId: paymentIntent.id,
          date: moment.utc(new Date()).format("MM/DD/YY"), //make utc date convert, use moment js
          payment: "Successful",
        };
        const { data } = await axiosSecure.post("/payments", payment);
        console.log(data);
        if (data.insertedId) {
          closeModal();
          toast.success("Payment successfully!");

          // refetch();
          // navigate('/dashboard/history')
        }
      }
    }
  };

  return (
    <div>
      <form className="border rounded-md p-5" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#fff",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          disabled={!stripe || !clientSecret}
          className="btn text-white mt-4 bg-[#9e2146]"
          type="submit"
        >
          Pay Now
        </button>
        <br />
        <small>{error}</small>
      </form>
    </div>
  );
};

CheckoutForm.propTypes = {
  salary: PropTypes.number,
  closeModal: PropTypes.func,
  employeeEmail: PropTypes.string,
};
export default CheckoutForm;
