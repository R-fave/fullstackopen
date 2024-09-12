import { useEffect, useState } from "react";
import FilterForm from "./components/FilterForm";
import PersonForm from "./components/PersonForm";
import PersonsList from "./components/PersonsList";
import axios from "axios";
import personList from "./service/person";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [notiMsg, setNotiMsg] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [notiClass, setNotiClass] = useState(true);

  useEffect(() => {
    personList
      .getAll()
      .then((initialPersonList) => setPersons(initialPersonList));
  }, [persons]);

  const handleNameCheck = (test) => {
    const found = persons.some((word) => {
      return word.name === test;
    });
    return found;
  };

  const handelSetNum = (e) => {
    e.preventDefault();
    setNumber(e.target.value);
  };

  const handleSetName = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const isTrue = handleNameCheck(newName);
    const nameObj = { name: newName, number: number };
    isTrue
      ? alert(`${newName} is already added to phonebook`)
      : newName.length >= 1
      ? personList.addPerson(nameObj).then((returnedList) => {
          setPersons(persons.concat(returnedList));
          setErrMsg(`Added ${returnedList.name}`);
          setNewName("");
          setNumber("");
        })
      : alert("Name Input is empty");
    handleNumChange();
    setTimeout(() => {
      setErrMsg(null);
    }, 3000);
  };

  const handleNumChange = (id) => {
    let editedPerson;
    const isTrue = handleNameCheck(newName);

    isTrue ? (editedPerson = persons.filter((n) => n.name === newName)) : null;

    const nameObj = { ...editedPerson?.[0], number: number };

    isTrue && editedPerson[0].number != number
      ? confirm(
          `${editedPerson[0].name} is already added to the phonebook, replace the old number with a new one?`
        ) &&
        personList
          .update(editedPerson[0].id, nameObj)
          .then((returnedData) => {
            setPersons(
              persons.map((ind) =>
                ind.id !== editedPerson[0].id ? ind : returnedData
              )
            );
            setErrMsg(
              `${returnedData.name}'s number was changed to ${returnedData.number}`
            );
          })
          .catch((err) => {
            setNotiClass(!notiClass);
            setErrMsg(
              `info of ${editedPerson[0].name} has been removed for the server`
            );
            setPersons(persons.filter((ind) => ind.id !== editedPerson[0].id));
          })
      : null;

    setTimeout(() => {
      setNotiClass(true);
      setErrMsg(null);
    }, 3000);
  };

  const handleFilter = (e) => {
    const data = [];
    e.preventDefault(e);
    for (let i = 0; i < persons.length; i++) {
      if (
        persons[i].name.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
      ) {
        data.push(persons[i]);
      }
    }
    setFilterData(data);
  };

  const handleDelete = (id) => {
    const name = persons.filter((p) => p.id === id);
    confirm(`Delete ${name[0].name}`) &&
      personList
        .deletePerson(id)
        .then(setPersons(persons.filter((p) => p.id !== id)));
  };

  return (
    <div>
      <Notification message={errMsg} notiClass={notiClass} />
      <h2>Phonebook</h2>
      <FilterForm onChange={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={handleAdd}
        onChangeName={handleSetName}
        onChangeNum={handelSetNum}
        nameValue={newName}
        numValue={number}
      />
      <h2>Numbers</h2>
      <PersonsList
        filterData={filterData}
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
