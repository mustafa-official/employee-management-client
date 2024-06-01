import useRole from "../hooks/useRole";

const PaymentHistory = () => {
  const [role] = useRole();
  return <div>{role === "employee" && <div>History</div>}</div>;
};

export default PaymentHistory;
