import { useEffect } from 'react';
import { useContext } from 'src/context';

export default function Navigation() {
  const headings = useContext().headings || [];

  useEffect(() => {
    const nav = document.querySelector('ul#navigation')!;
    const links = nav.querySelectorAll('a[data-id]');
    const sections = document.querySelectorAll('main section[data-id]');

    function onScroll() {
      let spied: Element | null = null;

      for (const link of links) link.classList.remove('text-docs-theme');

      for (const section of sections) {
        const span = section.querySelector('span:first-child');
        if (span && span.getBoundingClientRect().y < 1) spied = span;
      }

      if (spied) {
        const id = spied.getAttribute('id')!;
        const link = nav.querySelector(`a[data-id="${id}"]`);
        link?.classList.add('text-docs-theme');
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [headings]);

  return (
    <ul id="navigation">
      {headings.map(heading => (
        <li key={heading.id}>
          <a
            data-id={heading.id}
            href={`#${heading.id}`}
            className="block break-words py-1 font-medium opacity-75 transition hover:opacity-100"
            style={{
              paddingLeft: `${(heading.rank || 2) - 1 * 0.2}rem`,
            }}
          >
            {heading.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
