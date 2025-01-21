import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./requests";
import NotificationContext from "./context";
import { useReducer } from "react";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  const notificationReducer = (state, action) => action.payload;
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else if (result.isError) {
    return (
      <div>
        We are so sorry and ashamed to tell you there is a problem with the
        server
      </div>
    );
  }

  const anecdotes = result.data;
  const sortedAdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />
        <AnecdoteList anecdotes={sortedAdotes} />
      </div>
    </NotificationContext.Provider>
  );
};

export default App;
