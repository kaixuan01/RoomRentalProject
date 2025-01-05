import React from 'react';
import { Paper, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import MyGrid from '../../components/container/MyGrid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Shadow = () => {
  return (
    <PageContainer title="Shadow" description="this is Shadow">

      <DashboardCard title="Shadow">
        <MyGrid container spacing={2}>
          {[lightTheme, darkTheme].map((theme, index) => (
            <MyGrid item xs={6} key={index}>
              <ThemeProvider theme={theme}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                  {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
                    <Item key={elevation} elevation={elevation}>
                      {`elevation=${elevation}`}
                    </Item>
                  ))}
                </Box>
              </ThemeProvider>
            </MyGrid>
          ))}
        </MyGrid>
      </DashboardCard>
    </PageContainer>
  );
};

export default Shadow;
