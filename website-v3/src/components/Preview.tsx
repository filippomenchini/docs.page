import React, { useEffect, useState } from 'react';
import { map, atom } from 'nanostores';
import { useStore } from '@nanostores/react';
import context from '../context';

import Markdown from '@components/Markdown';
import Footer from '@layouts/Footer';
import PreviousNext from './PreviousNext';
import { getPreview } from 'src/bundle';

type DirectoryTree = { [path: string]: string };

const stores = {
  handle: atom<FileSystemDirectoryHandle | null>(null),
  configuration: atom<['json' | 'yaml', string] | undefined>(undefined),
  docs: atom<FileSystemDirectoryHandle | undefined>(undefined),
  tree: map<DirectoryTree>({}),
  path: atom<string>('/'),
};

// Subscribes to the directory handle the user provided access for,
// and updates the configuration and docs stores.
stores.handle.subscribe(async directory => {
  if (directory) {
    for await (const entry of directory.values()) {
      if (entry.kind === 'file' && ['docs.json', 'docs.yaml'].includes(entry.name)) {
        const file = await entry.getFile();
        const type = entry.name.split('.')[1] as 'json' | 'yaml';
        stores.configuration.set([type, await file.text()]);
      }

      if (entry.kind === 'directory' && entry.name === 'docs') {
        stores.docs.set(entry);
      }
    }
  } else {
    stores.configuration.set(undefined);
  }
});

// Subscribes to the docs store and updates the tree store.
stores.docs.subscribe(async handle => {
  let id;
  if (handle) {
    id = setInterval(async () => {
      stores.tree.set(await walkDirectoryHandle(handle, ''));
    }, 1000);
  } else {
    clearTimeout(id);
    stores.tree.set({});
  }
});

// Walks the directory handle and returns a tree of file handles.
async function walkDirectoryHandle(
  handle: FileSystemDirectoryHandle,
  prefix: string,
): Promise<DirectoryTree> {
  let tree: DirectoryTree = {};

  for await (const entry of handle.values()) {
    if (entry.kind === 'file') {
      const file = await entry.getFile();
      const text = await file.text();
      tree[`${prefix}/${entry.name}`] = text;
    } else if (entry.kind === 'directory') {
      tree = {
        ...tree,
        ...(await walkDirectoryHandle(entry, `${prefix}/${entry.name}`)),
      };
    }
  }

  return tree;
}

export default function Preview() {
  const handle = useStore(stores.handle);
  const path = useStore(stores.path);
  const tree = useStore(stores.tree);
  const configuration = useStore(stores.configuration);

  const [ready, setReady] = useState(false);

  const onUploadDirectoryClick = async () => {
    stores.handle.set((await window?.showDirectoryPicker()) || null);
  };

  useEffect(() => {
    setReady(true);
    // Subscribes to the window hash and updates the path store.
    window.addEventListener('hashchange', () => {
      stores.path.set(window.location.hash.slice(1) || '/');
    });
  }, []);

  console.log(tree);
  const file = path === '/' ? tree['/index.mdx'] : tree[`${path}.mdx`] || tree[`${path}/index.mdx`];

  const [type, config] = configuration || [];

  useEffect(() => {
    console.log(file, type, config);
    if (!file || !type || !config) return;

    getPreview({
      markdown: file,
      config: {
        yaml: type === 'yaml' ? config : undefined,
        json: type === 'json' ? config : undefined,
      },
    })
      .then(res => {
        if (res.code === 'OK') {
          const { code, config, frontmatter, headings } = res.data;
          console.log(code, config, frontmatter, headings);
        }

        throw new Error('Failed to get preview');
      })
      .catch(err => {
        console.error(err);
      });
  }, [file, type, config]);

  context.set({
    owner: '',
    repository: '',
    relativePath: '',
    locale: '',
    githubPath: ``,
    githubRefPath: '',
    ref: '',
    sidebar: [],
    config: {} as any,
    frontmatter: {},
    // code: replaceMoustacheVariables(config.variables ?? {}, code),
    code: '',
    headings: [],
    domain: '',
    baseBranch: '',
    source: {} as any,
    theme: 'light',
    tabs: {},
  });

  if (configuration && handle) {
    return (
      <>
        <section className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
          <div
            data-sidebar
            data-visible="false"
            className="data-[visible=true]:translate-x-0 data-[visible=true]:bg-white data-[visible=true]:dark:bg-zinc-900 data-[visible=true]:border-t fixed top-16 bottom-0 left-0 right-auto z-20 w-[19.5rem] translate-x-[-46rem] overflow-y-auto px-6 pb-10 transition-transform dark:border-slate-800/80
          sm:px-8 md:px-10 lg:left-[max(0px,calc(50%-46rem))] lg:block lg:translate-x-0 
         "
          >
            {/* <Sidebar /> */}
          </div>
          <div className="lg:pl-[20rem]">
            <div className="flex flex-row items-stretch gap-12 pt-9">
              <div className="relative mx-auto max-w-3xl flex-grow overflow-auto text-slate-500 dark:text-slate-400 xl:-ml-12 xl:max-w-[47rem] xl:pr-1 xl:pl-12">
                {/* <Markdown /> */}
                <PreviousNext />
                <Footer />
              </div>
              <div className="z-10 hidden w-[17rem] flex-none pl-10 xl:flex">
                <nav className="fixed h-[calc(100%-8rem)] w-[16.5rem] overflow-y-auto text-sm leading-6">
                  {/* <Navigation /> */}
                </nav>
              </div>
            </div>
          </div>
          <div data-docsearch />
          <div
            data-sidebar-mask
            data-visible="false"
            className="data-[visible=true]:opacity-100 data-[visible=false]:pointer-events-none fixed inset-0 z-10 bg-zinc-900/50 opacity-0 backdrop-blur transition-opacity lg:hidden"
          />
        </section>
      </>
    );
  }

  return (
    <div className="flex h-[100vh] flex-col pt-16 pb-12">
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-shrink-0 justify-center">
          <a href="/" className="inline-flex">
            <span className="sr-only">docs.page</span>
          </a>
        </div>
        <div className="flex w-full items-center justify-center">
          {!handle && (
            <button
              onClick={onUploadDirectoryClick}
              className="flex flex-col items-center justify-center pt-5 pb-6"
            >
              <svg
                aria-hidden="true"
                className="mb-3 h-10 w-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              Click to upload a directory
            </button>
          )}
          {handle && !configuration && <div>Selected directory has no config file.</div>}
        </div>
      </main>
    </div>
  );
}
