import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

const client = generateClient<Schema>();

function App() {
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // useEffect(() => {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }, []);

  // function createTodo() {
  //   client.models.Todo.create({ content: window.prompt("Todo content") }, { authMode: "userPool" });
  // }

  // function deleteTodo(id: string) {
  //   client.models.Todo.delete({ id })
  // }

  const [jobs, setJobs] = useState<Array<Schema["Job"]["type"]>>([]);

  useEffect(() => {
    client.models.Job.observeQuery().subscribe({
      next: (data) => setJobs([...data.items]),
    });
  }, []);

  // const requiredMaterialsTypes = client.enums.RequiredMaterials.values();

  // TODO figure out enums

  // function createJob(submitter: string, title: string, description: string, amountOffered: string, requiredMaterials: "PLA" | "NYLON") {
  //   client.models.Job.create({
  //     submitter: submitter,
  //     title: title,
  //     description: description,
  //     amountOffered: parseFloat(amountOffered),
  //     requiredMaterials: requiredMaterials,
  //   }, { authMode: "userPool" });
  // }

  // function deleteJob(id: string) {
  //   client.models.Job.delete({ id })
  // }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>{user?.signInDetails?.loginId}'s jobs</h1>
          {/* <button onClick={createTodo}>+ new</button> */}
          <ul>
            {jobs.map((job) => (
              <li key={job.id}>{job.title}</li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
              Review next step of this tutorial.
            </a>
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  )
}

export default App;
