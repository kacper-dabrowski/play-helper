import React from "react";
import { connect } from "react-redux";
import MainTextarea from "../../components/MainTextarea/MainTextarea";
import Navbar from "./Navbar/Navbar";
import Settings from "./Settings/Settings";
import { StyledPlayNext } from "./StyledPlayNext";
import { Container } from "./StyledPlayNext";
const PlayNext = (props) => {
  const { username } = props;

  return (
    <StyledPlayNext>
      <Navbar username={username} />
      <Container>
        <Settings />
        <MainTextarea />
      </Container>
    </StyledPlayNext>
  );
};

const mapStateToProps = (state) => ({
  username: state.auth.fullName,
});

export default connect(mapStateToProps, null)(PlayNext);
