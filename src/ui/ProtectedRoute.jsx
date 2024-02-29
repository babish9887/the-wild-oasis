import React, { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
    const navigate=useNavigate();
  const { isLoading , isAuthenticated} = useUser();

  
  useEffect(()=>{
      if(!isAuthenticated && !isLoading) navigate('/login');
    },[isAuthenticated, isLoading, navigate])
    
    if (isLoading)
      return (
        <Fullpage>
          <Spinner />
        </Fullpage>
      );
  if(isAuthenticated) return children;
}

export default ProtectedRoute;
