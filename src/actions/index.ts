import { revalidatePath } from "next/cache";
import prisma from "../../prisma";

export const addTodo = async (formData: FormData) => {
    "use server";
    await prisma.todo.create({
        data: {
            title: formData.get("title") as string,
        },
    });
    revalidatePath("/");
};

export const deleteTodo = async (formData: FormData) => {
    "use server";
    const id = formData.get("delete");

    if (id !== null) {
        await prisma.todo.delete({ where: { id: id.toString() } });
        revalidatePath("/");
    }
};