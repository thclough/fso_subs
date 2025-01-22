import { useParams } from "react-router-dom";

const UserView = ({ users }) => {
  const userId = useParams().id;
  const user = users.find((u) => u.id === userId);
  return (
    <div>
      <h1>{user.username}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
