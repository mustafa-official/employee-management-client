import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { ImSpinner3 } from "react-icons/im";
import Container from "../../shared/Container/Container";
import { Helmet } from "react-helmet-async";

const img_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const Register = () => {
  const navigate = useNavigate();
  const {
    registerUser,
    updateProfileInfo,
    loading,
    setLoading,
    googleLogin,
    logoutUser,
  } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data.name, imageFile, data.email, data.password);
    const imageFile = { image: data.photo[0] };
    try {
      setLoading(true);
      const res = await axiosPublic.post(img_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        const image = res.data.data.display_url;
        // console.log(image);
        const userInfo = {
          role: data.role,
          name: data.name,
          email: data.email,
          photo: image,
          bank_account: 4000056655665556,
          salary: 400,
          designation: "Digital Marketer",
          status: false,
        };
        const result = await registerUser(data.email, data.password);
        console.log(result);
        await updateProfileInfo(data.name, image);
        const { data: userCreate } = await axiosPublic.post("/users", userInfo);
        if (userCreate.insertedId) {
          navigate("/");
          toast.success("Register Successful");
        }
      }
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
      const { data } = await axiosPublic.post("/check-fired", {
        email: user?.email,
      });
      if (data.isFired) {
        await logoutUser();
        toast.error("Your account has been Fired.");
        setLoading(false);
        return;
      }
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
      <Helmet>
        <title>Staff Genius | SignUp</title>
      </Helmet>
      <div className="flex mt-2 md:mt-5  w-full overflow-hidden justify-center items-center">
        <div className="flex flex-col w-full max-w-md box-border rounded-md py-6 px-10  bg-gray-100 text-gray-800">
          <div className="mb-6 text-center">
            <h1 className="text-3xl mt-2 font-bold">Sign Up</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#2461E9] bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
                {errors.name && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#2461E9] bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
                {errors.email && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div className="pt-2">
                <select
                  className="w-full px-2 py-2 border rounded-md border-gray-300  bg-gray-200 text-gray-900"
                  {...register("role", { required: true })}
                >
                  <option value="">Select Role</option>
                  <option value="employee">Employee</option>
                  <option value="hr">HR</option>
                </select>
                {errors.role && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div>
                <label htmlFor="image" className="block mb-2 text-sm">
                  Select Image
                </label>
                <input
                  {...register("photo", { required: true })}
                  type="file"
                  accept="image/*"
                />
                {errors.photo && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    Password
                  </label>
                </div>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
                  })}
                  type="password"
                  placeholder="******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#2461E9] bg-gray-200 text-gray-900"
                />
                {errors.password?.type === "required" && (
                  <small className="text-red-500">This field is required</small>
                )}
                {errors.password?.type === "minLength" && (
                  <small className="text-red-500">
                    Password must be at least 6 characters
                  </small>
                )}
                {errors.password?.type === "pattern" && (
                  <small className="text-red-500">
                    Password must be one uppercase & special character
                  </small>
                )}
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="bg-[#2461E9] hover:bg-[#3768d1] disabled:cursor-not-allowed cursor-pointer w-full rounded-md py-3 text-white"
              >
                {loading ? (
                  <ImSpinner3 className="animate-spin m-auto"></ImSpinner3>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 bg-gray-400"></div>
            <p className="px-3 text-sm ">Or</p>
            <div className="flex-1 h-px sm:w-16 bg-gray-400"></div>
          </div>
          <button
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="flex disabled:cursor-not-allowed justify-center items-center space-x-2 border border-gray-400 hover:border-[#2461E9] my-4 p-2 rounded-lg  cursor-pointer"
          >
            <FcGoogle size={32} />

            <p>Continue with Google</p>
          </button>
          <p className="px-6 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:underline hover:text-[#2461E9] text-gray-600"
            >
              Login
            </Link>
            .
          </p>
        </div>
      </div>
      <ScrollRestoration></ScrollRestoration>
    </Container>
  );
};

export default Register;
