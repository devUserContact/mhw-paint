import NavBar from "../../components/NavBar/index.tsx";

export default function AboutPage() {
  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-1 mt-10 place-items-center">
        <h1 className="w-1/2 text-2xl">
          I go by Maxwell-
        </h1>
        <p className="mt-5 w-1/2 text-m">
          I am a human and a painter.
        </p>
      </div>
    </div>
  );
}
