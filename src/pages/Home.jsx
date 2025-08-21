import Header from "../components/Header";
import IntroHero from "../components/IntroHero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1A1B1C]">
      <Header />
      <main className="flex-1">
        <IntroHero />
      </main>
    </div>
  );
}
