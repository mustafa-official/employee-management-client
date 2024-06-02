import PropTypes from "prop-types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = ({ salary, closeModal, employeeEmail }) => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm salary={salary} employeeEmail={employeeEmail} closeModal={closeModal}></CheckoutForm>
      </Elements>
    </div>
  );
};

Payment.propTypes = {
  salary: PropTypes.number,
  closeModal: PropTypes.func,
  employeeEmail: PropTypes.string,
};
export default Payment;
