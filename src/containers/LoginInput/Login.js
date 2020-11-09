import React from "react";



import Input from "../../components/Input/Input";
import LoginArea from "../../components/LoginArea/LoginArea";
import LoginButton from "../../components/LoginButton/LoginButton";
import ResetButton from "../../components/ResetButton/ResetButton";
import { ButtonsContainer } from "../Support/Payments/StyledPayments";
import {StyledSupport } from "../Support/StyledSupport";



const Login= () => (
      <StyledSupport>
          <LoginArea>
              <div style ={{margin: 10}}>
                     <Input labelContent ="Wprowadź login: "/>  
              </div>
                     <Input labelContent ="Wprowadź hasło: "/>
                <ButtonsContainer>
                    <ResetButton/>
                    <LoginButton/>
                </ButtonsContainer>
          </LoginArea>
      </StyledSupport>
  );

export default Login;