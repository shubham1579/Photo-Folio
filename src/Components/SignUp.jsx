import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contextAPI/authContext";



function SignUp() {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { setUserName } = useAuth();

    const onSubmit = (data) => {
        
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (res) => {
            const user = res.user;
            await updateProfile(user, {
                displayName: data.name
            });
            setUserName(user.displayName);
            navigate(`/${user.uid}/albums`);
        })
        .catch((err) => {
            console.log(err.message);
        })
        reset();

    }


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create a New Account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form noValidate
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                        message: 'Email is not valid'
                                    },
                                })}
                                type="email"
                                className="block w-full rounded-md outline-0 pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Enter your email"
                            />
                        </div>
                        <p className="text-sm text-red-600">{errors.email?.message}</p>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="name" className="block text-md font-medium leading-6 text-gray-900">
                                Name
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="name"
                                {...register('name', {
                                    required: 'Name is required',
                                })}
                                type="text"
                                placeholder="Enter your name"
                                className="block w-full rounded-md outline-0 pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <p className="text-sm text-red-600">{errors.name?.message}</p>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                        message: `at least 8 characters | must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number | Can contain special characters`
                                    },
                                })}
                                type="password"
                                placeholder="Enter password"
                                className="block w-full rounded-md outline-0 pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <p className="text-sm text-red-600">{errors.password?.message}</p>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?{' '}
                    <Link to={'/'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    )

}

export default SignUp;