import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typer from "./components/Typer";

export default function Home() {
  return (
    <>
      <main className="form-control min-h-screen w-screen items-center justify-start bg-view bg-cover bg-center dark:bg-view-dark ">
        <h1 className="mt-4 w-full pl-32 text-[4rem] xl:text-[6rem]">
          Szukasz...&nbsp;
          <Typer />
        </h1>
        <p className="ml-32 self-start text-2xl font-bold italic xl:text-3xl">
          My to znajdziemy.
        </p>
        <div className=" w-full pl-32">
          <div className="mt-6 w-min">
            <div className="input-group ">
              <input
                type="text"
                placeholder="Wyszukaj miasta..."
                className="input-bordered input"
              />
              <button className="btn">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
