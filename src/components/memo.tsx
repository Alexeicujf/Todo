import React, { useState, useEffect, useRef, useMemo } from "react";

// Используя React, напиши компонент UserList, который:
// 	1.	Загружает список пользователей из API (https://jsonplaceholder.typicode.com/users).
// 	2.	Позволяет фильтровать пользователей по введённому в input имени.
// 	3.	Использует специальный хук, чтобы не пересчитывать отфильтрованный список при каждом рендере.

function UserItem({ user }) {
  console.log(`Render UserItem: ${user.name}`);
  return <li>{user.name}</li>;
}

const UserItemMemo = React.memo(UserItem)

function UserList() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [unrelated, setUnrelated] = useState(0); // состояние, не связанное с фильтром
  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log("Render UserList");
  const filteredUsers = useMemo(getFilteredUsers, [users, filter])
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  function getFilteredUsers() {
    console.log("Filtering users...");
    return users.filter((user) =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => setUnrelated((c) => c + 1)}>
          {unrelated} state ++
        </button>
        <span style={{ marginLeft: 8 }}>
          Render count: {renderCount.current}
        </span>
      </div>
      <input
        type="text"
        placeholder="Filter users"
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user) => (
          <UserItemMemo key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}
export default UserList;

export function App(props) {
  return <UserList />;
}

// Log to console
console.log('Hello console');
