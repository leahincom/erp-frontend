import React from 'react';
import styled from 'styled-components';
import vegaEmbed from 'vega-embed';

const GraphWrap = styled.div``;

const Graph = ({ idx }) => {
  return (
    <>
      <GraphWrap>
        <div className={'recBar__body--graph' + { idx }}></div>
      </GraphWrap>
    </>
  );
};

export default Graph;
