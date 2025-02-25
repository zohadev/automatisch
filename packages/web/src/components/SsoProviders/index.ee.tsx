import * as React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import * as URLS from 'config/urls';
import useSamlAuthProviders from 'hooks/useSamlAuthProviders.ee';
import useFormatMessage from 'hooks/useFormatMessage';

function SsoProviders() {
  const formatMessage = useFormatMessage();
  const { providers, loading } = useSamlAuthProviders();

  if (!loading && providers.length === 0) return null;

  return (
    <>
      <Divider>{formatMessage('loginPage.divider')}</Divider>

      <Paper sx={{ px: 2, py: 4 }}>
        <Stack direction="column" gap={1}>
          {providers.map((provider) => (
            <Button
              key={provider.id}
              component="a"
              href={URLS.SSO_LOGIN(provider.issuer)}
              variant="outlined"
            >
              {formatMessage('ssoProviders.loginWithProvider', {
                providerName: provider.name
              })}
            </Button>
          ))}
        </Stack>
      </Paper>
    </>
  );
}

export default SsoProviders;
