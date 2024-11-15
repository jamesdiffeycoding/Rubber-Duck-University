import Link from "next/link";

interface HeaderLinkProps {
  pageFolder: string; // pageFolder should be a string
  pageName: string; // pageName should be a string
}

export default function HeaderLink({ pageFolder, pageName }: HeaderLinkProps) {
  return (
    <Link href={pageFolder}>
      <button className="px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all">
        {pageName}
      </button>
    </Link>
  );
}
