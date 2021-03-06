import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";

// import CardAvatar from '../../components/Card/CardAvatar'
import Card from '../../../../components/Card/Card'
// import CardBody from '../../components/Card/CardBody'
// import ButtonProvider from '../../components/common/button'
import ImageProvider from '../../../../components/ImageProvider'
import Loader from '../../../../components/common/loader'

// import first from '../../assets/first.jpg';
// import second from '../../assets/second.jpg';
import logo from '../../../../assets/logo-white.png';
import dashboard from '../../../../assets/dashboard.svg';
import dashboard1 from '../../../../assets/dashboard-1.svg';
import tree from '../../../../assets/tree.svg';
import search from '../../../../assets/search.svg';

import './leftPanel.css';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitle: {
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "600",
    fontSize: '20px',
    marginBottom: "3px",
    textDecoration: "none",
    display: 'flex',
  },
  team: {
    display: 'flex',
    alignItems: 'center'
  },
  candidateContainer: {
    display: 'flex',
    padding: '0 20px',
  },
  candidate: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  candidateName: {
    fontSize: '12px',
    fontWeight: '300',
    padding: '5px 0',
  }
};

// TODO: Implement select design
class LeftPanel extends React.Component {
  state = {
    parties: this.props.parties,
  };
  render() {
    const {classes, parties} = this.props;
    return (
      <div className="left-panel">
        <div>
          <ImageProvider src={logo} className="left-logo"/>
        </div>
        <div>
          <Link to='/'>

          <ImageProvider src={dashboard} className="dashboard-logo background-white" />
      </Link>
        </div>
        <div>
          <Link to='/malicious'>
            <ImageProvider src={search} className="dashboard-logo" />
          </Link>
        </div>
        <div>
          <Link to='/tree'>

          <ImageProvider src={tree} className="dashboard-logo" />
          </Link>
        </div>

      </div>
    )

    }
}

const mapStateToProps = state => {
  return { parties: state.main.parties };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllParties: () => {
      dispatch({ type: 'GET_ALL_PARTIES_INIT' })
    },
    voteForParty:(partyId) => {
      dispatch({ type: 'VOTE_INIT', partyId })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LeftPanel));
// export default withStyles(styles)(Vote);
