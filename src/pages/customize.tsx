import React from 'react';
import styled from 'styled-components';

import Graph from '../components/common/Graph';
import DetailBar from '../components/customize/SideBar';

const UserDefineWrap = styled.div`
  display: flex;
  margin: 0;
  width: 100%;
`;

const UserDefine = () => {
  return (
    <UserDefineWrap>
      <DetailBar />
      <Graph />
    </UserDefineWrap>
  );
};

export default UserDefine;
