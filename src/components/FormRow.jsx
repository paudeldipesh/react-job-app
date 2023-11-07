export const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        className="form-input"
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
    </div>
  );
};
