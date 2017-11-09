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

      console.log('prepared data');
      console.log(data);

      let margin = {top: 40, right: 40, bottom: 60, left: 80},
        width = 960 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom,
        div = d3.select('body').append('div')
          .attr('class', 'tooltip')
          .style('opacity', 0);


      // let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      //   y = d3.scaleLinear().rangeRound([height, 0]);

      let x = d3.scaleLinear()
        .rangeRound([0, width]);

      let y = d3.scaleLinear()
        .rangeRound([height, 0]);

      let line = d3.line()
        .x((d) => {
          return x(d.opponent)
        })
        .y((d) => {
          return y(d.score)
        });

      x.domain(d3.extent(data, (d) => {
        return d.opponent
      }));
      y.domain(d3.extent(data, (d) => {
        return d.score
      }));


      let g = this.state.svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      data.forEach((d, i) => {
        this.state.svg.append('defs')
          .append('pattern')
          .attr('id', 'bg' + i) // + this.props.d_.match_id)
          .attr('width', 40)
          .attr('height', 40)
          .append('image')
          .attr('xlink:href', d.logo_url)
          // .attr('xlink:href', '/static/media/test.png')
          .attr('width', 40)
          .attr('height', 40);
      });

      //----------------

      g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')');
      // .call(d3.axisBottom(x));

      let item = g.selectAll('.item')
        .data(data)
        .enter().append('g')
        .attr('class', 'item');

      item.append('g').attr('class', 'pics');
      item.append('g').attr('class', 'lines');

      g.selectAll('.pics')
        .append('rect')
        .data(data)
        .attr('class', 'rekt')
        .attr('width', 40)
        .attr('height', 40)
        .attr('stroke', (d) => {
          return d.color
        })
        .attr('fill', (d, i) => {
          return 'url(#bg' + i + ')'
        })
        .attr('x', (d) => {
          return x(d.opponent) - 20
        })
        .attr('y', (d) => {
          return y(d.score) + 20
        })
        .on('mouseover', (d) => {
          div.transition()
            .duration(200)
            .style('opacity', .9);
          div.html(d.name + '<br/>' + (d.color === 'green' ? 'won' : 'lost'))
            .style('left', (d3.event.pageX + 20) + 'px')
            .style('top', (d3.event.pageY - 28) + 'px');
        })
        .on('mouseout', () => {
          div.transition()
            .duration(500)
            .style('opacity', 0);
        })
        .on('click', (d) => {
          console.log(d.matchId)
        });

      g.selectAll('.lines')
        .append('path')
        .datum(data)
        .attr('class', 'line')
        .style('stroke', 'white')
        .attr('d', line);

      // console.log('-------------------------');
      // console.log(data);

      // let margin = {top: 20, right: 20, bottom: 30, left: 40},
      //   width = +960 - margin.left - margin.right,
      //   height = +500 - margin.top - margin.bottom;
      //
      // let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      //   y = d3.scaleLinear().rangeRound([height, 0]);
      //
      // let g = this.state.svg.append("g")
      //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      //
      //
      // x.domain(data.map(function (d) {
      //   return d.opponent;
      // }));
      // y.domain([0, d3.max(data, function (d) {
      //   return d.won ? 1 : 0;
      // })]);
      //
      // g.append("g")
      //   .attr("class", "axis axis--x")
      //   .attr("transform", "translate(0," + height + ")")
      //   .call(d3.axisBottom(x));
      //
      // g.append("g")
      //   .attr("class", "axis axis--y")
      //   .call(d3.axisLeft(y).ticks(10, "%"))
      //   .append("text")
      //   .attr("transform", "rotate(-90)")
      //   .attr("y", 6)
      //   .attr("dy", "0.71em")
      //   .attr("text-anchor", "end")
      //   .text("Frequency");
      //
      // g.selectAll(".bar")
      //   .data(data)
      //   .enter().append("rect")
      //   .attr("class", "bar")
      //   .attr("x", function (d) {
      //     return x(d.opponent);
      //   })
      //   .attr("y", function (d) {
      //     return y(d.won ? 1 : 0);
      //   })
      //   .attr("width", x.bandwidth())
      //   .attr("height", function (d) {
      //     return height - y(d.won ? 1 : 0);
      //   });
    }

  };

  prepareData = (p) => {
    console.log('------------------p---------------------');
    console.log(p);
    let data = [];
    let score = 0;
    let opponent = 1;
    let color = 'blue';

    p.forEach((e) => {
      let obj = {};
      if (e.radiantTeam && e.radiantTeam.name === this.props.teamName) {
        if(e.radiantWin) {
           score++;
           color = 'green';
        } else {
          score--;
          color = 'red';
        }
        obj.name = e.direTeam ? e.direTeam.name : 'unknown';
        obj.logo_url = e.direTeam ? e.direTeam.logo_url : 'placeholder';
      } else {
        if(e.radiantWin) {
           score--;
           color = 'red';
        } else {
          score++;
          color = 'green';
        }
        obj.name = e.radiantTeam ? e.radiantTeam.name : 'unknown';
        obj.logo_url = e.radiantTeam ? e.radiantTeam.logo_url : 'placeholder';
      }
      obj.score = score;
      obj.opponent = opponent;
      obj.color = color;
      // obj.name = e.name;
      obj.matchId = e.match_id;
      data.push(obj);
      opponent++;
    });
    return data;
  };

  render() {
    return (
      <div>
        <svg id={this.props.teamName} width="960" height="500">_</svg>
        {this.drawExample()}
      </div>
    )
  }

}