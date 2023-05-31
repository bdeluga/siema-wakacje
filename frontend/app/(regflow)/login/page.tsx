"use client";
import { signIn } from "next-auth/react";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
interface formData {
  email: string;
  password: string;
}

export default function Login() {
  const { push } = useRouter();
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
  });
  const [isFetching, setIsFetching] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFetching(true);
    signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    }).then((res) => {
      if (res!.ok) {
        push("/");
      } else {
        if (res?.status === 401) console.log("Błędny login lub hasło");
      }
      setIsFetching(false);
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });

  return (
    <main className="form-control min-h-screen w-screen items-center justify-start bg-view bg-cover bg-center dark:bg-view-dark ">
      <div className="form-control h-full w-full flex-grow  items-center justify-center">
        <form
          className="form-control h-fit w-fit gap-4 rounded-md bg-gray-800/80 p-8 shadow-md lg:gap-8 lg:p-16"
          onSubmit={(e) => void handleSubmit(e)}
        >
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text text-white">Twój email</span>
            </label>
            <label className="input-group">
              <span>Email</span>
              <input
                type="text"
                id="email"
                placeholder="info@site.com"
                className="input-bordered input"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-control mb-4">
            <label className="label" htmlFor="password">
              <span className="label-text text-white">Twoje hasło</span>
            </label>
            <label className="input-group">
              <span>Hasło</span>
              <input
                type="password"
                id="password"
                placeholder="********"
                className="input-bordered input"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
          </div>
          {isFetching ? (
            <button className="loading btn">Logowanie...</button>
          ) : (
            <button className="btn-primary btn">Zaloguj!</button>
          )}
        </form>
      </div>
    </main>
  );
}
