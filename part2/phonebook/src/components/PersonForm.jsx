import React from "react";

const PersonForm = ({
  onSubmit,
  onChangeName,
  onChangeNum,
  nameValue,
  numValue,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input type="text" onChange={onChangeName} value={nameValue} />
      </div>
      <div>
        number: <input type="text" onChange={onChangeNum} value={numValue} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
