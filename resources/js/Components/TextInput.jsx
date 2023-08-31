import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                {...props}
                type={type}
                className={
                    'border-gray-700 bg-primary-dark text-gray-300 focus:border-secondary-mid focus:ring-secondary-mid rounded-md shadow-sm ' +
                    className
                }
                ref={input}
            />
        </div>
    );
});
