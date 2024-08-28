/* eslint-disable react/prop-types */
function FormField({
  labelName,
  type,
  name,
  placeholder,
  handleChange,
  value,
  isSurpriseMe,
  handleSurpriseMe,
  disabled,
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium dark:text-white text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            disabled={disabled}
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold hover:animate-none animate-pulse hover:scale-[1.02] transition-all ease-in-out duration-200 hover:bg-[#e7e7e7] text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        disabled={disabled}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        required
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
      />
    </div>
  );
}

export default FormField;
