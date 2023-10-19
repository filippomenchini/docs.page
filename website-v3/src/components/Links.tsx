import { useContext } from 'src/context';
import { getImagePath } from 'src/utils';

export default function Links() {
  const { source, baseBranch, config } = useContext();

  return (
    <>
      <link
        slot="head"
        rel="shortcut icon"
        href={getImagePath(
          source,
          baseBranch,
          config.favicon || 'https://docs.page/favicon.ico?v=2',
        )}
      />

      <link href="/_docs.page/fa/fontawesome.min.css" rel="stylesheet" />
      <link href="/_docs.page/fa/brands.min.css" rel="stylesheet" />
      <link href="/_docs.page/fa/solid.min.css" rel="stylesheet" />

      {config.experimentalMath && (
        <link
          slot="head"
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css"
        />
      )}
      {!!config.docsearch && (
        <>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" />
          <link
            rel="preconnect"
            href={`https://${config.docsearch.appId}-dsn.algolia.net`}
            crossOrigin="true"
          />
        </>
      )}
    </>
  );
}
