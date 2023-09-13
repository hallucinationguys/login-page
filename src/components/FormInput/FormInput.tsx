export const FormInput = (({type, label, placeholder, hasError}) => { 
    const baseStyle = "relative inline-flex w-full h-10 focus:outline-none bg-transparent border rounded-lg px-3 py-2 bg-white placeholder-gray-500 text-sm appearance-none block"
    return ( 
        <div>
            <label className="block text-gray-600 text-base font-semibold py-2"> {label} </label>
            <input className={baseStyle} type={type} placeholder={placeholder} />
            { hasError && <p className="text-pink-600 text-xs mx-2 mt-2">{`${hasError.message}`}</p>}
        </div>
    )
})

