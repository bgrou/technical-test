import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function TextAreaInput({id, name, label, value, onChange, error}) {
    return (
        <div className={'mb-4'}>
            <InputLabel htmlFor={id} value={label} />
            <textarea
                id={id}
                name={name}
                value={value}
                className="bg-primary-dark mb-3 h-48 border-0 sm:rounded-lg text-gray-300 mt-1 block w-full"
                onChange={onChange}
            />
            <InputError message={error} className="mt-2" />
        </div>
    );
}
