import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Container from "../../shared/Container/Container";

const Login = () => {
  const { loginUser, loading, setLoading, googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    //  console.log(email, password);

    try {
      setLoading(true);
      await loginUser(email, password);
      navigate(location.state ? location.state : "/");
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { user } = await googleLogin();
      const userInfo = {
        role: "employee",
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        bank_account: 4242424242424242,
        salary: 250,
        designation: "Sales Assistant",
        status: false,
      };

      const { data: userCreate } = await axiosPublic.post("/users", userInfo);
      if (userCreate.insertedId) {
        navigate("/");
        toast.success("Login Successful");
      }
    } catch (error) {
      toast.error(`${error.message}`);
      setLoading(false);
    }
  };
  return (
    <Container>
      <div className="flex mt-2 md:mt-5 justify-center items-center">
        <div className="flex flex-col w-full max-w-md box-border rounded-md py-6 px-10 bg-gray-100 text-gray-800">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          <form
            onSubmit={handleLogin}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter Your Email"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#2461E9] bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#2461E9] bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="bg-[#2461E9] hover:bg-[#3768d1] disabled:cursor-not-allowed cursor-pointer w-full rounded-md py-3 text-white"
              >
                {loading ? (
                  <ImSpinner9 className="animate-spin m-auto"></ImSpinner9>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>
          <div className="flex justify-end mt-1">
            <button className="text-xs hover:underline hover:text-[#2461E9] text-gray-400">
              Forgot password?
            </button>
          </div>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 bg-gray-400"></div>
            <p className="px-3 text-sm ">Or</p>
            <div className="flex-1 h-px sm:w-16 bg-gray-400"></div>
          </div>
          <button
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="flex disabled:cursor-not-allowed justify-center items-center space-x-2 border border-gray-400 hover:border-[#2461E9] my-4 p-2 rounded-lg"
          >
            <FcGoogle size={32} />

            <p>Continue with Google</p>
          </button>
          <p className="px-6 text-sm text-center text-gray-400">
            Don&apos;t have an account yet?{" "}
            <Link
              to="/register"
              className="hover:underline hover:text-[#2461E9] text-gray-600"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Login;
