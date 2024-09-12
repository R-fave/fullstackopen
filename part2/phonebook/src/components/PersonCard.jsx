const PersonCard = ({ person, handleDelete }) => {
  return (
    <div>
      <p style={{ display: "inline-block", marginRight: "10px" }}>
        {person.name} {person?.number}
      </p>
      <button
        onClick={() => {
          handleDelete(person.id);
        }}
      >
        delete
      </button>
    </div>
  );
};

export default PersonCard;
