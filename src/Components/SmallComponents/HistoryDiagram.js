import React, {Component} from 'react';
import * as d3 from 'd3';

export default class HistoryDiagram extends Component {

  constructor() {
    super();
    this.state = {svg: null}
  }

  componentDidMount = () => {
    this.setState({svg: d3.select('#' + this.props.teamName)});

  };

  drawExample = () => {

    if (this.state.svg) {
      let data = this.prepareData(this.props.d_);

      // console.log('-------------------------');
      // console.log(data);

      let margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +960 - margin.left - margin.right,
        height = +500 - margin.top - margin.bottom;

      let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

      let g = this.state.svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      x.domain(data.map(function (d) {
        return d.opponent;
      }));
      y.domain([0, d3.max(data, function (d) {
        return d.won ? 1 : 0;
      })]);

      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          return x(d.opponent);
        })
        .attr("y", function (d) {
          return y(d.won ? 1 : 0);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.won ? 1 : 0);
        });
    }

  };

  prepareData = (p) => {
    let data = [];
    p.forEach((e) => {
      let obj = {};
      if(e.radiantTeam && e.radiantTeam.name === this.props.teamName) {
        obj.won = e.radiantWin;
        obj.opponent = e.direTeam ? e.direTeam.name : 'unknown';
      } else {
        obj.won = !e.radiantWin;
        obj.opponent = e.radiantTeam ? e.direTeam.name : 'unknown';
      }
      data.push(obj)
    });
    console.log(data);
    return data;
  };

  render() {
    // console.log(this.props.d_);
    return (
      <div>
        <svg id={this.props.teamName} width="960" height="500">_</svg>
        {this.drawExample()}
      </div>
    )
  }

}