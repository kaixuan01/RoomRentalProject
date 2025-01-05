import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import Blog from '../dashboard/components/Blog';


const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">

      <DashboardCard title="Sample Page">
        <Blog/>
        <Blog/>
        <Blog/>
        <Blog/>

      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
