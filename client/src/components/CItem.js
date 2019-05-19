import React, { Component } from 'react'
import { Image, Table, } from 'react-bootstrap'
import network from '..//network'

export class CItem extends Component {

    state = {
        averageUserRating: 0,
        userRatingCount: 0,
    }

    componentWillMount = async () => {

        network._lookup(this.props.app_id).then(
          json => { 
              this.setState({ averageUserRating: json.results[0].averageUserRating }) 
              this.setState({ userRatingCount: json.results[0].userRatingCount }) 
            }
        )
    
    }

    _star = () => {
        let stars = []
        for (let i = 0; i <= 4; i++){
            if(i<this.state.averageUserRating)
                stars.push(<span class="fa fa-star checked"></span>)
            else
                stars.push(<span class="fa fa-star"></span>)
        }
        return stars
    }
    
    render() {

        let img = ''
        if (this.props.id % 2 == 0)
            img = <Image src={this.props.image} roundedCircle />
        else
            img = <Image src={this.props.image} rounded />
            
        return (
            <Table className='c1table' size='sm' key={this.props.id}>
                <tbody>
                    <tr>
                        <td className='c1id'><div className='key-text'>{this.props.id}</div></td>
                        <td className='c1id'>{img}</td>
                        <td>
                            <Table className='c2table' size='sm' key={'c2-'+this.props.id}>
                                <tbody>
                                    <tr><td><div className='name-text'>{this.props.name}</div></td></tr>
                                    <tr><td><div className='type-text'>{this.props.type}</div></td></tr>
                                    <tr><td><div className='type-text'>
                                        {this._star()}({this.state.userRatingCount})</div></td></tr>
                                </tbody>
                            </Table>
                        </td>
                    </tr>
                </tbody>
            </Table>
        )
    }

}