import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { DataDispatchContext, DataStateContext } from '../../context/DataContext';
import { loadModelData, postSampleData, postModelData } from '../../lib/api';
import { ModelType } from '../../types';

const TabBarWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 1rem;
  justify-content: center;
  width: 70%;

  > * {
    border-radius: 5px;
    background-color: rgb(96.1%, 96.1%, 96.1%);
    padding: 5px 10px;
  }
`;

const IconWrapper = styled.span`
  margin: 1rem;
  cursor: pointer;
  color: rgb(63.7%, 67.1%, 74.5%);
  font-size: 1.5rem;
`;

const ButtonBarWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  padding: 5px 10px;
`;

const ButtonWrapper = styled.button`
  margin: 0.5rem;
  border: none;
  border-radius: 3px;
  background-color: rgb(91.8%, 92.4%, 93.7%);
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
`;

const LabelWrapper = styled.label`
  margin: 0.5rem;
  border: none;
  border-radius: 3px;
  background-color: rgb(91.8%, 92.4%, 93.7%);
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
`;

const InputWrapper = styled.input`
  [type='file'] {
    display: none;
    position: absolute;
  }
`;

const ImageWrapper = styled.img``;

const TabBar = () => {
  const router = useRouter();
  const [modelData, setLoadData] = useState<ModelType[]>([{ x: '0' }]);
  const dataId = useContext(DataStateContext);
  const dispatch = useContext(DataDispatchContext);

  const handleChange = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const data = await postSampleData(formData);
    dispatch({ type: 'MODEL' });
    const generatedData = await loadModelData(data.data);
    setLoadData(generatedData.data.vizspec);
    await postModelData(data.data, generatedData.data.vizspec);
  };

  const handleClick = async (e: any) => {
    await postModelData(dataId, modelData);
  };

  useEffect(() => {
    console.log(dataId);
  }, [dataId]);

  return (
    <TabBarWrapper>
      <IconWrapper>
        <ImageWrapper src='/assets/icon/Dashboard.svg' onClick={() => router.push('/')} alt='Dashboard Page' />
        <ImageWrapper src='/assets/icon/UserDefine.svg' onClick={() => router.push('/make')} alt='User-Define Page' />
        <ImageWrapper
          src='/assets/icon/Recommendation.svg'
          onClick={() => router.push('/recommend')}
          alt='Recommendation Page'
        />
        <ImageWrapper src='/assets/icon/User.svg' onClick={() => router.push('/mypage')} alt='My Page' />
      </IconWrapper>
      <ButtonBarWrapper>
        <form>
          <LabelWrapper>
            LOAD
            <InputWrapper type='file' name='file' onChange={handleChange} />
          </LabelWrapper>
        </form>
        {modelData.length > 0 ? <ButtonWrapper onClick={handleClick}>SAVE</ButtonWrapper> : ''}
      </ButtonBarWrapper>
    </TabBarWrapper>
  );
};

export default TabBar;
