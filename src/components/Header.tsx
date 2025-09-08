import Logo from "./Logo";

export default function Header() {
  return (
    <header className="h-[207px] bg-primary p-4 rounded-b-2xl relative ">
      <div className="">
        <Logo className="absolute top-4 left-1/2 -translate-x-1/2 z-10" />
      </div>
    </header>
  );
}
