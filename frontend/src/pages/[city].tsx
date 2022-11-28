import { useRouter } from "next/router";

const City = () => {
  const router = useRouter();
  const { city } = router.query;

  return (
    <main className="text-blue flex min-h-screen w-screen flex-col bg-gradient-to-br from-indigo-500 to-indigo-800  pl-16 pt-4 text-4xl  text-gray-100">
      {city}
    </main>
  );
};

export default City;
