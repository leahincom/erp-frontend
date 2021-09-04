import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { modelDataState } from '../../lib/state';

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
  margin: 10px;
`;

const SideBar = () => {
  // 각 페이지에 맞게 sidebar의 내용 바꾸기
  // 일단 지금은 recommendation page에 맞게 설정되어 있음
  // graph = true;

  const [modelData, setModelData] = useRecoilState(modelDataState);
  const [plots, setPlots] = useState([]);

  // const handleClick = (e) => {
  //   console.log(e);
  //   document.querySelectorAll('.selected').forEach((el) => el.classList.remove('selected'));
  //   e.target.classList.add('selected');
  //   e.target.classList[0] === 'div.recBar__title--recommend'
  //     ? document.querySelector('.recBar__body--recommend').classList.add('selected')
  //     : document.querySelector('.recBar__body--edit').classList.add('selected');
  // };

  useEffect(() => {
    const encodeData = () => {
      // get image from plot code (data)
      const plots = modelData.map((data, idx) => {
        // await vegaEmbed(`.recBar__body--graph${idx}`, data);
      });
      setPlots(plots);
    };
    encodeData();
  }, [modelData]);

  return (
    <SideBarWrapper>
      {/* <TitleWrapper>
        // useRef, ref 사용해보기
        <div className='recBar__title--recommend selected' onClick={handleClick}>
            Recommended
            </div>
            {loadData ? (
              <div className='recBar__title--edit' onClick={handleClick}>
              Edit Plot
              </div>
              ) : (
                <></>
              )}
      </TitleWrapper> */}
      <IconWrapper>
        <img src='/assets/icons/FoldArrow.svg' />
      </IconWrapper>
      <DataWrapper>
        {plots.map((data, key) => {
          return <ImageWrapper src={data} key={key} />;
        })}
      </DataWrapper>
    </SideBarWrapper>
  );
};

export default SideBar;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 95%;

  /* &--recommend {
    margin-right: 0;margin-right
  }

  &--edit {
    margin-left: 0;margin-left
  }

  .selected {
    background-color: rgb(91.8%, 92.4%, 93.7%);background-color
  } */
`;

const Title = styled.title`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  margin-bottom: 0;
  border-radius: 5px;
  background-color: rgb(86.2%, 87.3%, 89.8%);
  padding: 1rem;
  width: 50%;
  font-weight: bold;

  &:hover {
    background-color: rgb(77.4%, 79.7%, 86.6%);
  }
`;
