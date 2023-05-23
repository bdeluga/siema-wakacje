"use client";
import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
import { redirect } from "next/navigation";
interface formData {
  email: string;
  password: string;
  username: string;
}

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
    username: "",
  });
  const [isFetching, setIsFetching] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFetching(true);
    const res = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        image: "/maserak.jpg",
      }),
    });
    setIsFetching(false);
    if (res?.ok) {
      redirect("/");
    }
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
          <div className="form-control mb-4">
            <label className="label" htmlFor="username">
              <span className="label-text text-white">Twoje nazwa</span>
            </label>
            <label className="input-group">
              <span>Nazwa</span>
              <input
                type="text"
                id="username"
                placeholder="Cosik ktosik"
                className="input-bordered input"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-control mb-4">
            <label className="label" htmlFor="password">
              <span className="label-text text-white">Twoje zdjęcie</span>
            </label>
            <label className="input-group">
              <input disabled placeholder="coming soon" />
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
