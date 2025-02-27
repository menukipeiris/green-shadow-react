import {useState} from "react";
import {useNavigate} from "react-router";
import {UserModel} from "../model/UserModel.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/Store.ts";
import {registerUser} from "../reducers/UserSlice.ts";


export function Register(){
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = () => {
        const user: UserModel = {email:email,password:password};
        dispatch(registerUser(user));
        resetForm()
        navigate("/")
    }
    const getLogin = () => {
        navigate("/")
    }
    const resetForm = () =>{
        setName("");
        setEmail("");
        setPassword("");
    }


    return (
        <>

            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                        Green Shadow
                    </a>
                    <div className="w-full bg-white shadow md:mt-0 sm:max-w-md xl:p-0 rounded-bl-3xl rounded-tr-3xl">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Sign in
                            </h1>
                            <form className="space-y-2 " action="#">
                                <div>
                                    <label htmlFor="name"
                                           className="block mb-2 text-sm font-medium text-gray-900 ">
                                        Your Name
                                    </label>
                                    <input type="text" name="name" id="name"
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 "
                                           placeholder="" required

                                    />
                                </div>
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 ">
                                        Your email
                                    </label>
                                    <input type="email" name="email" id="email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 "
                                           placeholder="" required

                                    />
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 ">
                                        Password
                                    </label>
                                    <input type="password" name="password" id="password" placeholder="••••••••"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 "
                                           required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword"
                                           className="block mb-2 text-sm font-medium text-gray-900 ">
                                        Confirm Password
                                    </label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••"
                                           value={confirmPassword}
                                           onChange={(e) => setConfirmPassword(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 "
                                           required
                                    />
                                </div>

                                <button onClick={handleRegister} type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center rounded-bl-3xl rounded-tr-3xl">
                                    Sign Up
                                </button>
                                <p className="text-sm font-light text-gray-500 ">
                                    Already have an account ?
                                    <a onClick={getLogin}
                                       className="font-medium text-primary-600 hover:underline  hover:font-bold hover:text-green-700 ">
                                        Sign In here
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}