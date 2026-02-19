export default async function UsersPage() {
  const res = await fetch("http://localhost:3000/api/users");
  const users = await res.json();

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.email}</li>
      ))}
    </ul>
  );
}
