import NavBar from "../components/NavBar/index.tsx";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="grid h-20 mt-20 place-items-center">
        <h1 className="grid">mhwPaint</h1>
        <h1 className="grid text-center">artist from CA</h1>
      </div>
    </div>
  );
}
