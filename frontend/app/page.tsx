import SearchCity from "./components/SearchCity";
import Typer from "./components/Typer";

export default function Home() {
  return (
    <main className="form-control min-h-screen w-screen items-center justify-start bg-view bg-cover bg-center dark:bg-view-dark ">
      <h1 className="mt-4 w-full pl-32 text-[4rem] xl:text-[6rem]">
        Szukasz...&nbsp;
        <Typer />
      </h1>
      <p className="ml-32 self-start text-2xl font-bold italic xl:text-3xl">
        My to znajdziemy.
      </p>
      <SearchCity />
    </main>
  );
}
