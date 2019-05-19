import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';

import { Table, Pagination, Form, } from 'react-bootstrap'
import network from './network'
import { RItem } from './components/RItem'
import { CItem } from './components/CItem'

class App extends Component {

  state = {
    top10Entry: [],
    top100Entry: [],
    currentPage: 1, 
    currentTop100: [],
    pageItems: [], 

  }

  componentWillMount = async () => {

    network._top10().then(
      json => { this.setState({ top10Entry: json.feed.entry }) }
    )

    network._top100().then(
      json => {
        this.setState({ top100Entry: json.feed.entry })
        this._top100Page()
        this._pageItems()
      }
    )

  }

  _search = (event) => {
    let keyword = event.target.value
    let result = this.state.top100Entry.filter( (item, index, array) => {
      let name = item['im:name'].label
      let category = item.category.attributes.label
      let artist = item['im:artist'].label
      let summary = item.summary.label
      if(name.indexOf(keyword) > -1 || category.indexOf(keyword) > -1 || artist.indexOf(keyword) > -1 || summary.indexOf(keyword) > -1)
        return true
      else
        return false
    })
    this.setState({ currentTop100: result  })
  }

  _top100Page = () => {
    let start = this.state.currentPage * 10 - 10
    let end = start + 10
    this.setState({ currentTop100: this.state.top100Entry.slice(start, end)  })
  }

  _pageItems = () => {
    let items = [];
    for (let i = 1; i <= 10; i++){
      items.push(<Pagination.Item id={i} key={i} active={i == this.state.currentPage} onClick={this._page}>{i}</Pagination.Item>)
    }
    this.setState({ pageItems: items }, () => {
      this._top100Page()
    })
  }

  _page = (event) => {
    this.setState({ currentPage: event.target.id }, () => {
      this._pageItems()
    })
  }

  render() {

    return (

      <div className="App">

<div className="sticky-top">
        <Form>
          <Form.Group controlId="fsearch">
            <Form.Control type="text" placeholder="Search" onChange={this._search}/>
          </Form.Group>
        </Form>

        <Table responsive={true} className="rtable">
          <tbody>
            <tr>
              {this.state.top10Entry.map((prop, key) => {
                let image = prop['im:image'][0].label
                let name = prop['im:name'].label
                let type = prop.category.attributes.label
                return (
                  <td><RItem id={key} image={image} name={name} type={type} /></td>)
              })}
            </tr>
          </tbody>
        </Table>
</div>

        <div className = 'cContainer'>
          <Table responsive={true} className="ctable">
            <tbody>
              <tr>
                <td>
                  <div style={{ height: '500px', }}>
                  {this.state.currentTop100.map((prop, key) => {
                    let id = key + (this.state.currentPage * 10 - 9)
                    let image = prop['im:image'][0].label
                    let name = prop['im:name'].label
                    let type = prop.category.attributes.label
                    let app_id = prop.id.attributes['im:id']
                    return (
                      <CItem id={id} image={image} name={name} type={type} app_id={app_id}/>)                  
                  })}
                  </div>
                </td>
              </tr>
            </tbody>
            </Table>
          </div>

        <Pagination size="sm">
          {this.state.pageItems}
        </Pagination>

      </div>

    )

  }
}

export default App;
