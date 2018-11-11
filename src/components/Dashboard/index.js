import React from 'react';
import { Sensor } from 'containers';
import { DashboardContent } from './styles';
import EmptyState from './EmptyState';

const Dashboard = ({ list }) => {
  return list.length === 0
		? <EmptyState />
    : <DashboardContent>
      	{list.map(id => {
        	return <Sensor key={id} id={id} />;
      	})}
    </DashboardContent>
};

export default Dashboard;
