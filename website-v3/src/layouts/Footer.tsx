import { useContext } from 'src/context';
import { PencilIcon } from '@components/icons';

export default function Footer() {
  const { githubPath } = useContext();

  return (
    <footer className="mt-12 flex items-center border-t py-12 text-sm dark:border-slate-800/80">
      <div>
        <a
          className="opacity-75 transition hover:opacity-100"
          href="https://docs.page"
          rel="noreferrer"
          target="_blank"
        >
          Powered by docs.page
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <a
          className="inline-flex items-center gap-1 opacity-75 transition hover:opacity-100"
          rel="noreferrer"
          href={githubPath}
          target="_blank"
        >
          <span className="h-4 w-4">
            <PencilIcon />
          </span>
          <span>Edit this page</span>
        </a>
      </div>
    </footer>
  );
}
