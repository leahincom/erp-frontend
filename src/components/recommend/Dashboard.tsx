import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import vegaEmbed from 'vega-embed';

import { modelImagesState, selectedGraphState } from '../../lib/state';

const DashboardWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Dashboard = () => {
  const [modelImages, setModelImages] = useRecoilState(modelImagesState);
  const [graphIndex, setGraphIndex] = useRecoilState(selectedGraphState);

  return (
    <DashboardWrapper>
      {/* {loadData.map(async (data, idx) => {
        return await (<Graph key={idx} idx={idx} />);
      })}
      const graph = [data];
    */}
      {/* {loadData.forEach((data) => vegaEmbed(`.recBar__body`, data))} */}
      {graphIndex > -1 && modelImages[graphIndex]}
    </DashboardWrapper>
  );
};

export default Dashboard;
