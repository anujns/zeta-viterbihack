import React from 'react';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import { InteractiveForceGraph,ForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';
import { ForceGraph3D } from 'react-force-graph';
import ButtonProvider from '../../../../components/common/button'
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

// import CardAvatar from '../../components/Card/CardAvatar'
import Card from '../../../../components/Card/Card'
// import CardBody from '../../components/Card/CardBody'
import CustomBarChart from '../../../../components/graph/barChart'
import Header from '../../../../components/common/header'
import ImageProvider from '../../../../components/ImageProvider'
import Loader from '../../../../components/common/loader'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// import first from '../../assets/first.jpg';
// import second from '../../assets/second.jpg';
import logo from '../../../../assets/dashboard.svg';
const colors = ["#040a55", "#1e2bd7", "#2876d7", "#55b8f3", "#80ecf7"]
import './rightPanel.css';

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
  },
  root: {
    width: '900px',
    overflowX: 'auto',
    zIndex: 1,
    textAlign: 'center',
    margin:'15px auto'
  },
  table: {
    width: '100%',
    tableLayout: 'fixed',
   },
  tooltip:{
    backgroundColor: '#1b2e43',
    color: '#fff',
    padding: '16px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.23)',
    fontSize: '14px',
    textAlign: "center",

  },
  label: {
    color: "#779fcb",
    fontSize: "12px",
    textAlign: "center",
    paddingTop: "2px",

  },
  zeta:{
    fontWeight:600,
  },
  button:{
    textAlign: 'center'
  },
  graph2: {
    display: 'flex',
    justifyContent: 'center'
  }

};

// TODO: Implement select design
class RightPanel extends React.Component {
  _handleClick = node => {
  // Aim at node from outside it
  const distance = 40;
  const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
  this.fg.cameraPosition(
    { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
    node, // lookAt ({ x, y, z })
    3000  // ms transition duration
  );
}



  render() {
    const {classes, scores, result, maliciousData, lastUpdated, flow} = this.props;
    console.log(result, maliciousData, scores, flow);
    const GROUPS = 12;
    let data= {}
    let newData = []
    if(flow && scores) {
      console.log("her",data)

      Object.keys(flow).map((key, i) => {
        if(data[scores[key.toLowerCase()]] == undefined) {
          data[scores[key.toLowerCase()]] = [flow[key].fromCount - flow[key].toCount];
        } else {
          data[scores[key.toLowerCase()]].push(flow[key].fromCount - flow[key].toCount);
        }
    });

    Object.keys(data).map((key, i) => {
      var numbers = data[key] // sums to 100
      var sum = 0;
      for (var i = 0; i < numbers.length; i++) {
        sum += numbers[i]
      }
      newData.push({value: key, withheld: sum})});
    console.log("her",data,newData)

  }




    return (
      <div className="right-panel">
        <Header label="Dashboard" logo={logo}/>
        <Card>
          <div className="vote-header">
            <div>ZETA Graph</div>
          </div>
          <div className={classes.graph}>
            <ForceGraph3D
            ref={el => { this.fg = el; }}
            width={1000}
            height={400}
            nodeColor={d => colors[scores[d.id]]}
            nodeOpacity={1}
            enableNodeDrag={false}
            graphData={result}
            linkDirectionalArrowLength={4}
            linkCurvature={0.25}
            backgroundColor={"#fff"}
            linkDirectionalArrowColor={"#1b2e43"}
            linkColor={"#1b2e43"}
            linkOpacity={"1"}
            onNodeClick={this._handleClick}
            nodeLabel={d => {return `<div class=${classes.tooltip}>Address : ${d.id}<br/>
          <div class=${classes.zeta}>Zeta score : ${scores[d.id]}</div>

          <div class=${classes.label}>From : ETH ${flow[d.id].fromCount.toFixed(0)} - To : ETH ${flow[d.id].toCount.toFixed(0)}</div></div>`}}
          />

          </div>
          <div className="filter">
            <div className="filter-options">
              <div className="filter-label-2" />
              <div className="filter-name">
                  Most malicious Node
              </div>
            </div>
            <div className="filter-options">
              <div className="filter-label-1" />
              <div className="filter-name">
                  Least malicious Node
              </div>
            </div>
          </div>

        </Card>
        <Card>
          <div className="vote-header">
            <div>Withheld Value</div>
          </div>
          <div className={classes.graph2}>

          {newData.length > 0 ?
      <BarChart
                      width={800}
                      height={300}
                      data={newData}
                      className={classes.graph}
                      margin={{
                        top: 20, bottom: 5,
                      }}
                    >
                      <XAxis dataKey="value" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="withheld" fill="#8884d8" />
                    </BarChart>

: ''}
</div>

        </Card>
        <Card>
          <div className="vote-header">
            <div>Malicious Addresses</div>
          </div>

          <div className={classes.button}>
            <ButtonProvider type="submit" label="Get the malicious nodes" onClick={this.props.onClick}/>
          </div>
          {maliciousData ?

          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                <TableCell align="right">Etherium Address</TableCell>
              <TableCell align="right">IP Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.table}>
                {Object.keys(maliciousData).map(key =>
                (
                    <TableRow key={maliciousData.id}>
                      <TableCell align="right">
                        {maliciousData[key][0].category}
                      </TableCell>
                      <TableCell align="right">{key}</TableCell>
                    <TableCell align="right">{maliciousData[key][0].ip}</TableCell>
                  </TableRow>)
    )}
              </TableBody>
            </Table>
          </Paper>: ""}

        </Card>
      </div>
    )

    }
}

export default (withStyles(styles)(RightPanel));
