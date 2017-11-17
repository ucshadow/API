import React, {Component} from 'react';
import * as d3 from 'd3';
import {path} from "./Path";

/**
 * Component responsible with drawing the history diagram.
 * On init it calculates the width of the device screen since
 * the dimensions of the svg are in pixels
 */
export default class HistoryDiagram extends Component {

  constructor() {
    super();
    this.u = path;

    this.state = {svg: null, logo: 0};
    this.width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    this.w = this.width / 3;
  }

  componentDidMount() {
    this.setState({svg: d3.select('#' + this.props.id_)});
    // this.solveNullLogos(this.props.d_);
  };

  componentWillReceiveProps(nextP) {
    console.log(nextP);
    if(this.state.svg) {
      this.state.svg.selectAll("*").remove();
    }
  }

  solveNullLogos = (d) => {
    d.forEach((e) => {
      if(!e.direTeam.logo_url) {
        e.direTeam.logo_url = this.getLogo(e.direTeam.name)
      }
      if(!e.radiantTeam.logo_url) {
        e.radiantTeam.logo_url = this.getLogo(e.radiantTeam.name)
      }
    })
  };

  //toDO: maybe just return placeholder, eh...

  /**
   * fetches the team logo from the server side
   * @param teamName the name of the team that has no logo (in the OpenDota API)
   */
  getLogo = (teamName) => {
    fetch(this.u + '/API/?query=logo&name=' + teamName)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({logo: Math.random()});
        return res.logo
      });
  };

  /**
   * D3 diagram representing the team match history.
   * A maximum of 10 matches are displayed (last 10 matches). This can be changed in the parent
   * Component without the need of changing this code.
   */
  drawExample = () => {
    if (this.state.svg && this.props.teamName) {
      let data = this.prepareData(this.props.d_);

      let margin = {top: 40, right: 40, bottom: 60, left: 80},
        width = this.w - margin.left - margin.right,
        height = this.w / 3 - margin.top - margin.bottom,
        div = d3.select('body').append('div')
          .attr('class', 'tooltip')
          .style('opacity', 0);

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
          .attr('id', 'bg' + d.matchId + this.props.id_)
          .attr('width', 40)
          .attr('height', 40)
          .append('image')
          .attr('xlink:href', d.logo_url)
          .attr('width', 40)
          .attr('height', 40);
      });

      //----------------

      g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')');
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
          return 'url(#bg' + d.matchId + this.props.id_ + ')'
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
    }

  };

  /**
   * Prepares the data to make it D3 friendly.
   * It also sorts the matches based on the time they were played.
   * @param p
   * @returns {Array}
   */
  prepareData = (p) => {
    // console.log('------------------p---------------------');
    // console.log(this.props.teamName);
    // console.log(p);
    let data = [];
    let score = 0;
    let opponent = 1;
    let color = 'blue';



    p.sort((a, b) => {
      return a.startTime > b.startTime;
    });

    p.map((e) => {
      let obj = {};
      if (e.radiantTeam && e.radiantTeam.name === this.props.teamName) {
        if (e.radiantWin) {
          score++;
          color = 'green';
        } else {
          score--;
          color = 'red';
        }
        obj.name = e.direTeam ? e.direTeam.name : 'unknown';
        obj.logo_url = e.direTeam ? e.direTeam.logo_url : 'placeholder';
      } else {
        if (e.radiantWin) {
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
      obj.startTime = e.startTime;
      data.push(obj);
      opponent++;
    });
    return data;
  };

  render() {
    return (
      <div>
        <svg id={this.props.id_} width={this.w} height={this.w / 3}>_</svg>
        {this.drawExample()}
      </div>
    )
  }

}