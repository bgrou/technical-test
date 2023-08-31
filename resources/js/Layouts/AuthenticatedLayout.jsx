import {useEffect, useState} from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link, usePage} from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import {ToastContainer, toast} from 'react-toastify';

export default function Authenticated({
                                          auth, header, children,
                                      }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(
        false);
    const {flash} = usePage().props;

    useEffect(() => {
        if (flash.message) {
            displayToast(flash.message, 'success');
        } else if (flash.error) {
            displayToast(flash.error, 'error');
        }
    });

    const displayToast = (message, type) => {
        if (type === 'success') {
            toast.success(message);
        } else if (type === 'error') {
            toast.error(message);
        }
    };
    return (<div className="min-h-screen bg-gray-100 dark:bg-primary-dark">
        <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
        <nav
            className="xl:hidden bg-white dark:bg-primary-mid border-b border-gray-100 dark:border-gray-700">
            <div className=" mx-auto px-12">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo
                                    className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200"/>
                            </Link>
                        </div>


                    </div>

                    <div className="hidden xl:flex xl:items-center xl:ml-6">
                        <div className="ml-3 relative">

                        </div>
                    </div>

                    <div className="-mr-2 flex items-center xl:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown(
                                (previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor"
                                 fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ?
                                        'inline-flex' :
                                        'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ?
                                        'inline-flex' :
                                        'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={(showingNavigationDropdown ? 'block' : 'hidden') +
                ' xl:hidden h-screen'}>
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink href={route('dashboard')}
                                       active={route().
                                           current('dashboard')}>
                        Dashboard
                    </ResponsiveNavLink>
                </div>

                <div
                    className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                    <div className="px-4">
                        <div
                            className="font-medium text-base text-gray-800 dark:text-gray-200">
                            {auth.user.name}
                        </div>
                        <div
                            className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route(
                            'profile.edit')}>Profile</ResponsiveNavLink>
                        <ResponsiveNavLink method="post"
                                           href={route('logout')}
                                           as="button">
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>

        <div className="flex">
            {/* Use the Sidebar component */}
            <Sidebar auth={auth}/>

            {/* Main Content */}
            <main className="flex-1 bg-primary-dark">
                {header && (<header>
                    <div
                        className="font-semibold text-3xl text-gray-800 dark:text-gray-200 leading-tight max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>)}

                {children}
            </main>
        </div>
    </div>);
}
