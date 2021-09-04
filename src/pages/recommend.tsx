import React, { useState } from 'react';
import styled from 'styled-components';

import Dashboard from '../components/recommend/Dashboard';
import SideBar from '../components/recommend/SideBar';

const RecommendationWrap = styled.div`
  display: flex;
  margin: 0;
  width: 100%;
`;

const Recommendation = ({ data }) => {
  console.log(data);

  const [graph, setGraph] = useState(null);

  return (
    <RecommendationWrap>
      <SideBar setGraph={setGraph} />
      <Dashboard graph={graph} />
    </RecommendationWrap>
  );
};

export default Recommendation;
