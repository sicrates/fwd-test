import React, { Component } from 'react'
import { Image, Table, } from 'react-bootstrap'

export class RItem extends Component {

    render() {
        return (
            <Table className='rtable-sm' size='sm' key={this.props.id}>
                <tbody>
                    <tr><td><Image src={this.props.image} rounded /></td></tr>
                    <tr><td><div className='name-text'>{this.props.name}</div></td></tr>
                    <tr><td><div className='type-text'>{this.props.type}</div></td></tr>
                </tbody>
            </Table>
        )
    }

}