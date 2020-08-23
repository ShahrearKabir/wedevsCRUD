import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import axios from 'axios';

class Category extends Component {
    constructor() {
        super();
        this.state = {
            insertPostData: {
                title: '',
                description: '',
            },
            categoryData: []
        }

        this.onChangeInputValue = this.onChangeInputValue.bind(this)
        this.onSubmitData = this.onSubmitData.bind(this)
    }

    componentDidMount() {
        this.getAllData();
        this.setState({insertPostData:{...this.props.updateData}})
    }

    // componentWillReceiveProps(newProps){
    //     console.log(newProps);
    // }

    getAllData() {
        axios.get('/api/category/all')
            .then(response => {
                console.log(response)
                this.setState({ categoryData: response.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    onChangeInputValue(e) {
        // console.log(e.target.name);
        let { insertPostData } = this.state
        insertPostData[e.target.name] = e.target.value
        this.setState({ insertPostData })
    }

    onSubmitData() {
        if(this.props.updateData){
            axios.put('/api/category/'+this.state.insertPostData.id, this.state.insertPostData)
                .then(response => {
                    this.props.loadCategory()
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else{
            axios.post('/api/category', this.state.insertPostData)
                .then(response => {
                    this.props.loadCategory()
                })
                .catch(error => {
                    console.log(error)
                })
        }
        
    }

    render() {
        let { insertPostData } = this.state
        return (
            <div>
                <div className="col-12 mt-3">
                    <h3>Category</h3>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon3">Title</span>
                        </div>
                        <InputText
                            className="form-control"
                            name="title"
                            value={insertPostData.title}
                            onChange={this.onChangeInputValue}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon3">Description</span>
                        </div>
                        <InputTextarea
                            className="form-control"
                            name="description"
                            value={insertPostData.description}
                            onChange={this.onChangeInputValue}
                        />
                    </div>

                    <Button
                        label={ this.props.updateData ? "Update" : "Save"}
                        className="btn btn-primary"
                        onClick={this.onSubmitData}
                    />
                </div>
            </div>
        )
    }
}
export default Category