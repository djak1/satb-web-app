import { login } from "@/lib/auth";

export default function SignInPage() {

    return(
        <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg mx-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to the SATBM</h2>
                    <p className="text-gray-600">Sign in to register you FIGHTERS for a competiotions</p>
                </div>
                
                <div className="mt-8">
                    <form action={login}>
                        <button type="submit" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                            <svg className="w-6 h-6" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" aria-hidden="true">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.66 1.22 9.05 3.22l6.79-6.79C35.5 2.38 30.06 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                                <path fill="none" d="M0 0h48v48H0z"/>
                            </svg>
                            <span> Continue with Google </span>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}