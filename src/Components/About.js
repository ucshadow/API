import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.css';
import * as d3 from 'd3';

class About extends Component {

  constructor() {
    super();
    this.state = {svg: null}
  }

  componentDidMount = () => {
    this.setState({svg: d3.select('#asd')});

  };

  drawExample = () => {

    if (this.state.svg) {
      let data = this.prepareData(this.props.d_);

      // console.log('-------------------------');
      // console.log(data);

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
        .attr('id', 'bg' + i)
        .attr('width', 40)
        .attr('height', 40)
        .append('image')
        .attr('xlink:href', d.logo)
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

      // item.append('g').append('path')
      //   .datum(data)
      //   .attr('class', 'line')
      //   .style('stroke', 'red')
      //   .attr('d', line);
      //
      //
      // item.append('g').append('rect')
      //   .data(data)
      //   .attr('class', 'rekt')
      //   .attr('width', 40)
      //   .attr('height', 40)
      //   .attr('fill', 'url(#bg)')
      //   .attr('x', (d) => {
      //     return x(d.opponent) - 20
      //   })
      //   .attr('y', (d) => {
      //     return y(d.score) - 20
      //   });


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
        .attr('fill', (d, i) => {return 'url(#bg' + i + ')'})
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


      // let label = item.selectAll('.label')
      //   .data(function (d) {
      //     return d;
      //   })
      //   .enter().append('g')
      //   .attr('class', 'label')
      //   .attr('transform', function (d, i) {
      //     return 'translate(' + x(d.opponent) + ',' + y(d.score) + ')';
      //   });

      // item.selectAll('.label2')
      //   .data(function (d) {
      //     return d;
      //   })
      //   .enter().append('g')
      //   .attr('class', 'label2')
      //   .attr('transform', function (d, i) {
      //     return 'translate(' + x(d.opponent) + ',' + y(d.score) + ')';
      //   })


      // label.append('text')
      //   .attr('dy', '2em')
      //   .text(function (d) {
      //     return d.name;
      //   })
      //   // .filter(function (d, i) {
      //   //   return i === data.length - 1;
      //   // })
      //   .append('tspan')
      //   .attr('class', 'label-key')
      //   .text(function (d) {
      //     return ' ' + d.name;
      //   });
      //
      // label.append('rect', 'text')
      //   .datum(function () {
      //     return this.nextSibling.getBBox();
      //   })
      //   .attr('x', function (d) {
      //     return d.x - labelPadding;
      //   })
      //   .attr('y', function (d) {
      //     return d.y - labelPadding;
      //   })
      //   .attr('width', function (d) {
      //     return d.width + 2 * labelPadding;
      //   })
      //   .attr('height', function (d) {
      //     return d.height + 2 * labelPadding;
      //   });

      //
      // g.append('g')
      //   .attr('transform', 'translate(0,' + height + ')')
      //   .call(d3.axisBottom(x));
      //
      // g.append('g')
      //   .call(d3.axisLeft(y))
      //   .append('text')
      //   .attr('fill', '#000')
      //   .attr('transform', 'rotate(-90)')
      //   .attr('y', 6)
      //   .attr('dy', '0.71em')
      //   .attr('text-anchor', 'end')
      //   .text('Price ($)');
      //
      // g.append('path')
      //   .datum(data)
      //   .attr('fill', 'none')
      //   .attr('stroke', 'steelblue')
      //   .attr('stroke-linejoin', 'round')
      //   .attr('stroke-linecap', 'round')
      //   .attr('stroke-width', 3.5)
      //   .attr('d', line);
    }

  };

  prepareData = () => {
    let imageUrl = 'http://cloud-3.steamusercontent.com/ugc/878624711061597776/47A0CFBA204C43DFA09F92BA708A24AACC384BAB/';
    let imageUrl2 = 'http://cloud-3.steamusercontent.com/ugc/266100190168033440/3164343438ECC6AB8E76D0B59349F00CC4034296/';
    return [
      {score: 0, opponent: 1, name: 'o1', color: 'blue', logo: imageUrl, matchId: 1234},
      {score: -1, opponent: 2, name: 'o2', color: 'red', logo: imageUrl2, matchId: 1234},
      {score: -2, opponent: 3, name: 'o3', color: 'red', logo: imageUrl, matchId: 1234},
      {score: -1, opponent: 4, name: 'o4', color: 'green', logo: imageUrl2, matchId: 1234},
      {score: 0, opponent: 5, name: 'o1', color: 'green', logo: imageUrl, matchId: 1234},
      {score: 1, opponent: 6, name: 'o1', color: 'green', logo: imageUrl, matchId: 1234},
      {score: 2, opponent: 7, name: 'o21', color: 'green', logo: imageUrl2, matchId: 1234},
      {score: 3, opponent: 8, name: 'o1', color: 'green', logo: imageUrl, matchId: 1234},
      {score: 2, opponent: 9, name: 'o1', color: 'red', logo: imageUrl, matchId: 1234},
      {score: 3, opponent: 10, name: 'o1', color: 'green', logo: imageUrl, matchId: 1234},
    ]
  };

  render() {
    return (
      <div className='App'>
        <div style={{'fontSize': '100px'}}>
          <svg id={'asd'} width='960' height='500'>_</svg>
          {this.drawExample()}
        </div>
      </div>
    );
  }
}

export default About;