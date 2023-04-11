import { useQueryKeyStore } from "@/useStore";
import React from "react";
const QueryButtons = () => {
  const { queryKey, setKey } = useQueryKeyStore();

  return (
    <div className="mx-auto mt-2 flex space-x-4">
      <button
        id="hotels"
        className={`btn rounded ${
          queryKey === "hotels" ? "btn-primary" : "btn-secondary"
        }`}
        onClick={(e) => setKey(e.currentTarget.id)}
      >
        noclegi
      </button>
      <button
        id="recreations"
        className={`btn rounded ${
          queryKey === "recreations" ? "btn-primary" : "btn-secondary"
        }`}
        onClick={(e) => setKey(e.currentTarget.id)}
      >
        rekreacja
      </button>
      <button
        id="history"
        className={`btn rounded ${
          queryKey === "history" ? "btn-primary" : "btn-secondary"
        }`}
        onClick={(e) => setKey(e.currentTarget.id)}
      >
        historia
      </button>
      <button
        id="restaurants"
        className={`btn rounded ${
          queryKey === "restaurants" ? "btn-primary" : "btn-secondary"
        }`}
        onClick={(e) => setKey(e.currentTarget.id)}
      >
        restauracje
      </button>
      <button
        id="fun"
        className={`btn rounded ${
          queryKey === "fun" ? "btn-primary" : "btn-secondary"
        }`}
        onClick={(e) => setKey(e.currentTarget.id)}
      >
        zabawa
      </button>
    </div>
  );
};

export default QueryButtons;
