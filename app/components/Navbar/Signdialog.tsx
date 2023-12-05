import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import RootLayout from '@/app/layout';
import Home from '@/app/page';

const Signin = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const url = "http://localhost:5000/api/user/login";

  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();
      await axios.post(url, {
        email: email,
        password: password
      });
      setErrorMessage(null);
      setRedirect(true);
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription :', error.message);

      toast.error('Données erronées', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

return (
  <div>
    {redirect ? (
      // If authenticated, render the Home component
      <RootLayout>
        <Home isAuthenticated={true} />
      </RootLayout>
    ) : (
                // If not authenticated, render the login form
                <div>
     <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:pr-0">
                <div className='hidden lg:block'>
                    <button type="button" className='text-lg text-Blueviolet font-medium' onClick={openModal}>
                        Log In
                    </button>
                </div>
                </div>
        <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                                        <div className="w-full max-w-md space-y-8">
                                            <div>
                                                <img
                                                    className="mx-auto h-12 w-auto"
                                                    src="/assets/logo/logo.svg"
                                                    alt="Your Company"
                                                />
                                                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                                    Sign in to your account
                                                </h2>
                                            </div>
                                            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                                                <input type="hidden" name="remember" defaultValue="true" />
                                                <div className="-space-y-px rounded-md shadow-sm">
                                                    <div>
                                                        <label htmlFor="email-address" className="sr-only">
                                                            Email address
                                                        </label>
                                                        <input
                                                           value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            type="email"
                                                            autoComplete="email"
                                                            required
                                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Email address"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="password" className="sr-only">
                                                            Password
                                                        </label>
                                                        <input
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            type="password"
                                                            autoComplete="current-password"
                                                            required
                                                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Password"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="remember-me"
                                                            name="remember-me"
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                                            Remember me
                                                        </label>
                                                    </div>

                                                    <div className="text-sm">
                                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                            Forgot your password?
                                                        </a>
                                                    </div>
                                                </div>

                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-Blueviolet py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                                        </span>
                                                        Sign in
                                                    </button>
                                                </div>
                                            </form>
                                                 {/* ToastContainer est où les messages toast seront rendus */}
                                        <ToastContainer />
                                        </div>
                                    </div>


                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>   
    </div>
    )}
  </div>
);

}

export default Signin;
   

         