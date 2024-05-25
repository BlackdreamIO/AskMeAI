import { forwardRef, useState } from 'react';

enum AuthMode {
    LogIn = "Log In",
    SignUp = "Sign Up",
}

export const AuthenticationPage = forwardRef<HTMLDivElement>((props, ref) => {
    
    const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.LogIn);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        userName : '',
        email : '',
        password : ''
    });

    const handleFormSubmit = (e : any) => {
        e.preventDefault();
        setFormData({
            userName : authMode == AuthMode.SignUp ? e.target?.username?.value ?? '' : 'SignUp',
            email : e.target.email.value,
            password : e.target.password.value
        })
        console.log(formData);
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col justify-center items-center select-none cursor-default" ref={ref}>
            <div className='w-full max-w-2xl m-auto space-y-16'>
            
                <div className="w-full">
                    <h2 className="mt-6 text-center text-6xl font-extrabold text-gray-900 capitalize">
                        Start Your <span className='text-emerald-600'> One Message </span> Today
                    </h2>
                </div>

                <div className="mt-8 w-6/12 m-auto max-sm:w-11/12 max-xl:w-8/12">
                    <div className="bg-white py-4 px-4 shadow-lg border-4 border-[mediumspringgreen] shadow-green-300">
                        <div className='mb-12'>
                            <h2 className="text-center text-3xl text-gray-900 capitalize">
                                {authMode} to your account
                            </h2>
                            <p className="mt-2 text-center text-gray-600">
                            Or
                                <button onClick={() => setAuthMode(authMode == AuthMode.LogIn ? AuthMode.SignUp : AuthMode.LogIn)} className="ml-2 text-lg capitalize font-medium text-black !outline-none">
                                    {authMode == AuthMode.LogIn ? 'Create an account' : 'Log In'}
                                </button>
                            </p>
                        </div>
                        <form className="space-y-6" autoComplete='off' onSubmit={handleFormSubmit}>
                            
                            {
                                authMode == AuthMode.SignUp && (
                                    <div>
                                        <label htmlFor="username" className="ml-2 font-medium text-gray-700">
                                            Username
                                        </label>
                                        <div className="mt-1">
                                            <input id="username" name="username" type="text" required
                                                className="bg-transparent w-full px-3 py-2 h-12 border-b-2 border-neutral-500 placeholder-neutral-500 text-gray-900 !outline-none"/>
                                        </div>
                                    </div>
                                )
                            }
                            
                            <div>
                                <label htmlFor="email" className="ml-2 font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input id="email" name="email" type="email" required
                                        className="bg-transparent w-full px-3 py-2 h-12 border-b-2 border-neutral-500 placeholder-neutral-500 text-gray-900 !outline-none"/>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="ml-2 font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input id="password" name="password" type="password" required
                                        className="bg-transparent w-full px-3 py-2 h-12 border-b-2 border-neutral-500 placeholder-neutral-500 text-gray-900 !outline-none"/>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember_me" name="remember_me" type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-neutral-600 hover:text-black">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button 
                                    type="submit"
                                    className="w-full py-2 px-4 border-none rounded-md text-black font-bold hover:bg-[mediumspringgreen] bg-neutral-200 !outline-none disabled:bg-neutral-200"
                                    disabled={isLoading}>
                                    {isLoading ? 'Authenticating...' : 'Sign in'}
                                </button>
                                {
                                    error.length > 2 && (
                                        <p className='text-red-500 text-center'>
                                            {error}
                                        </p>
                                    )
                                }
                            </div>
                        </form>
                        <div className="mt-6">

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-gray-100 text-gray-500">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <div>
                                    <a href="#"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                        <img className="h-5 w-5" src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                                            alt=""/>
                                    </a>
                                </div>
                                <div>
                                    <a href="#"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                        <img className="h-5 w-5" src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                                            alt=""/>
                                    </a>
                                </div>
                                <div>
                                    <a href="#"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                        <img className="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg"
                                            alt=""/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default AuthenticationPage;