import prisma from "../../prisma";
import { addTodo, deleteTodo } from "@/actions";

export default async function App() {
  await prisma.$connect();
  const todos = await prisma.todo.findMany();

  return (
    <div className="space-y-3">
      <form action={addTodo} className="space-x-2">
        <input className=" text-black" type="text" name="title" />
        <button className="p-1 bg-orange-500 rounded-lg" type="submit">
          ADD
        </button>
      </form>
      <h1>TODOS</h1>
      {todos &&
        todos.map((item) => (
          <div className="flex w-60 border border-gray-500 p-2 rounded-lg" key={item.id}>
            <p className="flex-1">{item.title}</p>
            <form action={deleteTodo}>
              <input
                name="delete"
                className="hidden"
                value={item.id}
                readOnly
              />
              <button type="submit" className="hover:bg-slate-700">
                &#10060;
              </button>
            </form>
          </div>
        ))}
    </div>
  );
}
