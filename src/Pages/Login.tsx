import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store/Store.ts";
import {UserModel} from "../model/UserModel.ts";
import {loginUser} from "../reducers/UserSlice.ts";


export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = () =>{
        const user: UserModel = {email:email,password:password};
        dispatch(loginUser(user));
        alert("Login successfully!");
        resetForm();
        // navigate('/dashboard');
    }
    const getRegister = () =>{
        navigate('/register');
    }
    const resetForm = () =>{
        setEmail("");
        setPassword("");
    }
    useEffect(() => {
        if(isAuthenticated){
            navigate('/dashboard');
        }
    }, [isAuthenticated]);

    return (
        <>
            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                        Green Shadow
                    </a>
                    <div className="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 rounded-bl-3xl rounded-tr-3xl">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Sign in
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 ">
                                        Your email
                                    </label>
                                    <input type="email" name="email" id="email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
                                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                           required
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox"
                                                   className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                                                   required/>
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 ">Remember
                                                me</label>
                                        </div>
                                    </div>
                                    <a href="#"
                                       className="text-sm font-medium text-primary-600 hover:underline ">Forgot
                                        password?
                                    </a>
                                </div>
                                <button onClick={handleLogin} type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center rounded-bl-3xl rounded-tr-3xl">
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 ">
                                    Don’t have an account yet ?
                                    <a onClick={getRegister} className="font-medium text-primary-600 hover:underline  hover:font-bold hover:text-green-700 ">
                                         Sign up
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