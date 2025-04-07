import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import FlowFundListPage from '../pages/flow/FlowFundListPage';
import FlowFundDetailPage from '../pages/flow/FlowFundDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/flow/funds',
    element: <FlowFundListPage />,
  },
  {
    path: '/flow/:id',
    element: <FlowFundDetailPage />,
  },
]);
