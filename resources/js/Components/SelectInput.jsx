import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function SelectInput({id, name, label, value, options, onChange, error}) {
    return (
        <div className={'mb-4'}>
            <InputLabel htmlFor={id} value={label} />
            <select
                id={id}
                name={name}
                value={value}
                className="bg-primary-dark mb-3 border-0 sm:rounded-lg text-gray-300 mt-1 block w-full"
                onChange={onChange}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <InputError message={error} className="mt-2" />
        </div>
    );
}
