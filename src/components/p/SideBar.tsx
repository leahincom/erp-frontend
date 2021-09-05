import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { modelImagesState } from '../../lib/state';

const SideBarWrapper = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin: 0;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  background: #f4f6fc;
  width: 30%;
  height: 100%;

  &.shrink {
    width: 10%;

    img {
      transform: rotate(180deg);
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 40px 30px;
  width: 100%;

  :hover {
    cursor: pointer;
  }
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.img`
  transition: all 2s linear;
  margin: 10px;
`;

const SideBar = () => {
  const [modelImages, setModelImages] = useRecoilState(modelImagesState);
  const [isVisible, setIsVisible] = useState(true);

  // const encodeData = () => {
  //   loadData.forEach(async (data, idx) => {
  //     await vegaEmbed(`.recBar__body--graph${idx}`, data);
  //   });
  // };

  return (
    <SideBarWrapper className={[!isVisible && 'shrink'].join(' ')}>
      <IconWrapper onClick={() => setIsVisible(!isVisible)}>
        <img src='/assets/icons/FoldArrow.svg' />
      </IconWrapper>
      <DataWrapper>
        {isVisible &&
          modelImages.map((data, key) => {
            return <ImageWrapper src={data} key={key} />;
          })}
      </DataWrapper>
    </SideBarWrapper>
  );
};

export default SideBar;
