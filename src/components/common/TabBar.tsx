import { faLightbulb, faUser } from '@fortawesome/free-regular-svg-icons';
import { faColumns, faEdit, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { DataDispatchContext, DataStateContext } from '../../context/DataContext';
import { UserStateContext } from '../../context/UserContext';
import { loadModelData, postSampleData, saveModelData } from '../../lib/api';
import { selectedGraphState } from '../../lib/state';
import { ModelType } from '../../lib/type';

const TabBarWrapper = styled.div`
  display: flex;
  position: sticky;
  bottom: 1rem;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 2px 2px 10px 4px rgba(186, 186, 186, 0.25);
  background: #ffffff;
`;

const IconBarWrapper = styled.span`
  margin: 1rem;
  cursor: pointer;
  color: rgb(63.7%, 67.1%, 74.5%);
  font-size: 1.5rem;
`;

const IconWrapper = styled(FontAwesomeIcon)`
  margin: 1rem;
  cursor: pointer;
  color: rgb(63.7%, 67.1%, 74.5%);
  font-size: 35px;
`;

const Divider = styled.div`
  margin: 0;
  background-color: rgb(91.8%, 92.4%, 93.7%);
  width: 1px;
  height: 100%;
`;

const ButtonBarWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 10px;
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
  display: none;
  position: absolute;
`;

const TabBar = () => {
  const state = useContext(UserStateContext);
  const router = useRouter();
  const [loadData, setLoadData] = useState<ModelType[]>();
  const [modelData, setModelData] = useState<ModelType[]>([{ x: '0' }]);
  const dataId = useContext(DataStateContext);
  const dispatch = useContext(DataDispatchContext);
  const isAuth = state.isAuth;
  const [graphIndex, setGraphIndex] = useRecoilState(selectedGraphState);

  const handleChange = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    setLoadData(file);
    const formData = new FormData();
    formData.append('file', file);
    const data = await postSampleData(formData);
    // dispatch({ type: 'MODEL' });
    const generatedData = await loadModelData(data.data);
    setModelData(generatedData.data.vizspec);
    await saveModelData(generatedData.data.vizspec);
  };

  const handlePageSave = () => {};

  const handleModelSave = async (e: any) => {
    // save `graphIndex` image to user's list
  };

  useEffect(() => {
    console.log(dataId);
  }, [dataId]);

  return (
    <TabBarWrapper>
      <IconBarWrapper>
        <IconWrapper icon={faColumns} onClick={() => router.push('/')} />
        <IconWrapper icon={faEdit} />
        <IconWrapper icon={faLightbulb} onClick={() => router.push('/recommend')} />
        {!isAuth && <IconWrapper icon={faSignInAlt} onClick={() => router.push('/login')} />}
        {isAuth && (
          <>
            <IconWrapper icon={faUser} onClick={() => router.push('/account')} />
            <IconWrapper icon={faSignOutAlt} onClick={() => router.push('/logout')} />
          </>
        )}
      </IconBarWrapper>
      {router.pathname.includes('/p/' || '/pages') && (
        <>
          <Divider />
          <ButtonBarWrapper>
            <ButtonWrapper onClick={handlePageSave}>SAVE</ButtonWrapper>
            <ButtonWrapper onClick={() => router.push('/')}>Go Back</ButtonWrapper>
          </ButtonBarWrapper>
        </>
      )}
      {router.pathname.includes('recommend') && (
        <>
          <Divider />
          <ButtonBarWrapper>
            <form>
              <LabelWrapper>
                LOAD
                <InputWrapper type='file' name='file' onChange={handleChange} />
              </LabelWrapper>
            </form>
            {modelData.length > 0 ? <ButtonWrapper onClick={handleModelSave}>SAVE</ButtonWrapper> : ''}
          </ButtonBarWrapper>
        </>
      )}
    </TabBarWrapper>
  );
};

export default TabBar;
