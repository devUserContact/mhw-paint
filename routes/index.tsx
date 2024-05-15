import NavBar from "../components/NavBar/index.tsx";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="grid h-80 place-items-center">
        <h1 className="grid">mhwPaint</h1>
        <h2 className="grid">artist located in CA</h2>
      </div>
    </div>
  );
}
