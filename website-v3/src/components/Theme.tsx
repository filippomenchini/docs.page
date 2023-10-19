import { useEffect } from 'react';
import { useContext } from 'src/context';
import { getColorTheme } from 'src/utils';

export default function Theme() {
  const { config } = useContext();
  const theme = config.theme;

  useEffect(() => {
    const { base, light, dark } = getColorTheme(theme);

    const root = document.documentElement;
    root.style.setProperty('--theme-color', base);
    root.style.setProperty('--theme-color-dark', light);
    root.style.setProperty('--theme-color-light', dark);
    root.style.setProperty('--docsearch-primary-color', base);
  }, [theme]);

  return null;
}
