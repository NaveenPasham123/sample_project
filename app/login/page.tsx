import {prisma} from "@/lib/prisma";
import { redirect } from "next/navigation";

export default function Login() {
  async function handleSubmit(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    redirect("/dashboard");
  }

  return (
    <div>
      <form action={handleSubmit} className="flex flex-col gap-3">
        <input name="name" placeholder="Username" />
        <input name="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
