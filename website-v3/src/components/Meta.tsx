import { useContext } from 'src/context';
import { getImagePath } from 'src/utils';

export default function Meta() {
  const { owner, repository, ref, source, baseBranch, domain, relativePath, frontmatter, config } =
    useContext();

  const title = frontmatter.title || config.name || `${owner}/${repository}`;
  const description = frontmatter.description || config.description || '';
  const url = domain
    ? `https://${domain}${ref ? `/~${ref}` : ''}${relativePath}`
    : `https://docs.page/${owner}/${repository}${ref ? `~${ref}` : ''}${relativePath}`;

  let image = frontmatter.image || config.socialPreview;
  if (!image) {
    const params = Buffer.from(
      JSON.stringify({
        owner,
        repository,
        title,
        description,
        logo: config.logo ? getImagePath(source, baseBranch, config.logo) : '',
      }),
    ).toString('base64');

    image = `https://og.docs.page?params=${params}`;
  }

  return (
    <>
      <title>{title}</title>
      {!!description && <meta name="description" content={description} />}

      <meta name="twitter:card" content="summary_large_image" />
      {config.twitter && <meta name="twitter:site" content={`@${config.twitter}`} />}
      {(config.noindex || frontmatter.noindex || !!ref) && <meta name="robots" content="noindex" />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" charSet="utf-8" content={image} />
    </>
  );
}
