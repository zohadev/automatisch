import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as BaseThemeProvider } from '@mui/material/styles';
import get from 'lodash/get';
import set from 'lodash/set';
import * as React from 'react';

import { IJSONObject } from '@automatisch/types';
import useConfig from 'hooks/useConfig';
import theme from 'styles/theme';

type ThemeProviderProps = {
  children: React.ReactNode;
};

const customizeTheme = (defaultTheme: typeof theme, config: IJSONObject) => {
  for (const key in config) {
    const value = config[key];
    const exists = get(defaultTheme, key);

    if (exists) {
      set(defaultTheme, key, value);
    }
  }

  return defaultTheme;
};

const ThemeProvider = ({
  children,
  ...props
}: ThemeProviderProps): React.ReactElement => {
  const { config, loading } = useConfig();

  const customTheme = React.useMemo(() => {
    if (!config) return theme;

    const customTheme = customizeTheme(theme, config);

    return customTheme;
  }, [config]);

  // TODO: maybe a global loading state for the custom theme?
  if (loading) return <></>;

  return (
    <BaseThemeProvider theme={customTheme} {...props}>
      <CssBaseline />

      {children}
    </BaseThemeProvider>
  );
};

export default ThemeProvider;
