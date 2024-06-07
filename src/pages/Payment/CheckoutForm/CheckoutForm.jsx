import PropTypes from "prop-types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import { IoIosClose } from "react-icons/io";
import { ImSpinner3 } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";

const CheckoutForm = ({ salary, closeModal, employeeEmail }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const totalAmount = salary;

  //from payment collection
  const { data: usersPaymentInfo = [] } = useQuery({
    queryKey: ["usersPaymentsInfo", employeeEmail],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/usersPaymentsInfo/${employeeEmail}`
      );
      return data;
    },
  });
  const existMonth = usersPaymentInfo.map((item) => item?.month.toLowerCase());
  const existYear = usersPaymentInfo.map((item) => item?.year);

  useEffect(() => {
    if (totalAmount > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalAmount })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [axiosSecure, totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputMonth = event.target?.month?.value.toLowerCase();
    const inputYear = event.target?.year?.value;
    if (existMonth.includes(inputMonth) && existYear.includes(inputYear)) {
      return toast.error("Already Paid !!");
    }
    setLoading(true);
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
      setLoading(false);
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
      setLoading(false);
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
          month: event.target?.month?.value,
          year: event.target?.year?.value,
          payment: "Successful",
        };
        const { data } = await axiosSecure.post("/payments", payment);
        console.log(data);
        if (data.insertedId) {
          closeModal();
          toast.success("Payment successfully!");
          setLoading(false);

          // refetch();
          // navigate('/dashboard/history')
        }
      }
    }
  };

  return (
    <div>
      <form
        className="border flex flex-col gap-6 rounded-md p-4"
        onSubmit={handleSubmit}
      >
        <div className="sm:flex sm:items-center sm:-mx-2 px-2">
          <div className="flex flex-col gap-3 w-full text-black">
            <div>
              <div className="grid grid-cols-1 gap-x-4 gap-y-2 mt-2">
                <div>
                  <label className="text-xs text-black">Salary</label>

                  <input
                    readOnly
                    defaultValue={`$${salary}`}
                    type="text"
                    className="block w-full px-2 py-2  mt-1  text-[#010313] bg-[#ffffff69] border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <label className="text-xs text-black" htmlFor="">
                    Write Month <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="month"
                    type="text"
                    className="block w-full px-2 py-2  mt-1 text-[#010313] bg-[#ffffff69] border  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label className="text-xs text-black" htmlFor="">
                    Write Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="year"
                    type="number"
                    className="block w-full px-2 py-2  mt-1 text-[#010313] bg-[#ffffff69] border  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
              </div>

              <div className="">
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => closeModal()}
                    className="text-3xl font-bold text-black bg-white rounded-md hover:bg-base-300"
                  >
                    <IoIosClose></IoIosClose>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#000",
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
          {/* <button
            disabled={!stripe || !clientSecret}
            className="btn text-white mt-4 bg-[#9e2146]"
            type="submit"
          >
            {loading ? (
              <ImSpinner9 className="animate-spin m-auto"></ImSpinner9>
            ) : (
              "Pay Now"
            )}
          </button> */}

          <button
            disabled={!stripe || !clientSecret}
            type="submit"
            className="px-4 mt-4 py-2 font-medium tracking-wide  capitalize transition-colors duration-300 transform border  rounded-lg   bg-[#3d6fdb] hover:bg-[#5888ee]  text-white focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            {loading ? (
              <ImSpinner3 className="animate-spin m-auto"></ImSpinner3>
            ) : (
              "Pay Now"
            )}
          </button>
          <br />
          <small className="text-red-500">{error}</small>
        </div>
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
