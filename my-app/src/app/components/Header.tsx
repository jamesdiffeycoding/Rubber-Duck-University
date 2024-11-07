import Link from "next/link";
import HeaderLink from "./HeaderLink";
export default function Header() {
  return (
    <>
      <header className="bg-blue-400 text-white p-6">
        <section className="flex">
          <div className="flex-1">
            <h1 className="text-3xl font-semibold">
              <Link href="/">
                <button className="">Rubber Duck Learning</button>
              </Link>
            </h1>
            <p>No shortcuts, yes results.</p>
          </div>
          <div className="ml-auto">
            <div className="flex">
              <HeaderLink pageFolder={"/background"} pageName={"Background"} />
              <HeaderLink pageFolder={"/public"} pageName={"About"} />
              <HeaderLink pageFolder={"/talk"} pageName={"Talk"} />
              <HeaderLink pageFolder={"/login"} pageName={"Login"} />
            </div>
          </div>
        </section>
      </header>
    </>
  );
}
