const storage = [];

/**
 * Downloader class. Also has a local storage for caching.
 * Used when navigating the incoming matches, in the sense that it only fetches
 * data for one match once, then stores it locally for future use.
 */
class Provider {

  static download(url, component) {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        storage.push({url: url, data: res});
        component.setState({details: res});
      });
  };

  static downloadGraphData(url, component, graphData, props) {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.prepareGraphData(res, component, graphData, props)
      });
  };

  static fetchUrl(url, component) {
    let u = this.contains_(url);
    if (u) {
      console.log('object already cached.');
      component.setState({details: u.data});
    } else {
      this.download(url, component);
    }

  }

  static contains_(url) {
    if (storage.length === 0) {
      return false;
    }
    for (let i = 0; i < storage.length; i++) {
      if (storage[i].url === url.url) {
        return storage[i]
      }
    }
    return false;
  }

  static fetchGraphData(url, component, graphData, props) {
    let u = this.contains_(url);
    if (u) {
      console.log('object already cached.');
      this.prepareGraphData(u.data, component, graphData, props)
    }
    this.downloadGraphData(url, component, graphData, props);
  }

  static prepareGraphData(res, component, graphData, props) {
    let d = {};
    d.radiantTeam = res.radiant_team;
    d.direTeam = res.dire_team;
    d.radiantWin = res.radiant_win;
    d.match_id = res.match_id;
    d.startTime = res.start_time;
    graphData.push(d);
    // console.log(this.graphData);
    if (graphData.length >= props.length) {
      // console.log('new state');
      // console.log(this.state.g_d);
      component.setState({g_d: graphData})
    }
  }

}

//
// Provider.fetchUrl({url: 'http://localhost:5000/API/?query=team&name=Fnatic'});
// Provider.fetchUrl({url: 'http://localhost:5000/API/?query=team&name=Fnatic'});

export default Provider;