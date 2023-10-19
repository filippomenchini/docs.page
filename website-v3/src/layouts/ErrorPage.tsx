type Props = {
  code: number;
  title?: string;
  description?: string;
  href?: string;
};

export default function ErrorPage({ code, title, description, href }: Props) {
  return (
    <div className="flex h-[100vh] flex-col pt-16 pb-12">
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-shrink-0 justify-center">
          <a href="/" className="inline-flex">
            <span className="sr-only">docs.page</span>
          </a>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-400">
              {code} error
            </p>
            <h1 className="font-open-sans mt-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              {title || 'Something went wrong.'}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500 dark:text-gray-300">
              {description || `Sorry, something went wrong during the request.`}
            </p>
            <div className="mt-6">
              <a
                href={href || '/'}
                className="text-base font-medium text-green-400 hover:text-green-500"
              >
                Go back <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <footer className="mx-auto w-full max-w-7xl flex-shrink-0 px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-4">
          <a
            href="https://github.com/invertase/docs.page"
            className="text-sm font-medium text-gray-500 hover:text-gray-600 dark:text-gray-300"
          >
            GitHub
          </a>
          <span className="inline-block border-l border-gray-300" aria-hidden="true"></span>
          <a
            href="https://twitter.com/invertaseio"
            className="text-sm font-medium text-gray-500 hover:text-gray-600 dark:text-gray-300"
          >
            Twitter
          </a>
        </nav>
      </footer>
    </div>
  );
}
