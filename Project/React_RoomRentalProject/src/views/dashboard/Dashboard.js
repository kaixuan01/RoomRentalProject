import React, { useState } from 'react';
import { Box, Button, InputLabel } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import ProductPerformance from './components/ProductPerformance';
import Blog from './components/Blog';
import MonthlyEarnings from './components/MonthlyEarnings';
import DashboardCard from '../../components/shared/DashboardCard';
import UppyFileUpload from '../../components/shared/UppyFileUploader';
import MyGrid from '../../components/container/MyGrid';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <MyGrid container spacing={3}>
          <MyGrid  item xs={12} lg={6}>
            <DashboardCard title={"File Uploader"}>
              <UppyFileUpload/>
              <InputLabel/>
            </DashboardCard>
          </MyGrid>
          <MyGrid item xs={6}>
          </MyGrid>
          <MyGrid item xs={12} lg={8}>
            <SalesOverview />
          </MyGrid>
          <MyGrid item xs={12} lg={4}>
            <MyGrid container spacing={3}>
              <MyGrid item xs={12}>
                <YearlyBreakup />
              </MyGrid>
              <MyGrid item xs={12}>
                <MonthlyEarnings />
              </MyGrid>
            </MyGrid>
          </MyGrid>
          <MyGrid item xs={12} lg={4}>
            <RecentTransactions />
          </MyGrid>
          <MyGrid item xs={12} lg={8}>
            <ProductPerformance />
          </MyGrid>
          <MyGrid item xs={12}>
            <Blog />
          </MyGrid>
        </MyGrid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
