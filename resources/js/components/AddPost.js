import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer';
import AddCategory from './AddCategory';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';

class AddPost extends Component {
    constructor() {
        super();
        this.state = {
            insertPostData: {
                title: '',
                category: [],
                description: '',
            },
            categoryData: [],
            visibleDialog: false
        }

        this.onChangeInputValue = this.onChangeInputValue.bind(this)
        this.onChangeSelectValue = this.onChangeSelectValue.bind(this)
        this.onSubmitData = this.onSubmitData.bind(this)
        this.addNewCategory = this.addNewCategory.bind(this)
        this.loadCategory = this.loadCategory.bind(this)//hideDialog
        this.hideDialog = this.hideDialog.bind(this)//
    }

    componentDidMount() {
        this.getAllData();
        this.setState({insertPostData:{...this.props.updateData}})
    }

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
        console.log(e.target.value);
        let { insertPostData } = this.state
        insertPostData[e.target.name] = e.target.value
        this.setState({ insertPostData })
    }

    onChangeSelectValue(e) {
        console.log(e.target.selectedOptions);
        let { insertPostData } = this.state

        let values = Array.from(e.target.selectedOptions).map(option => option.value)

        insertPostData.category = values
        this.setState({ insertPostData })
    }

    onSubmitData() {
        if (this.props.updateData) {
            axios.put('/api/post/' + this.state.insertPostData.id, this.state.insertPostData)
                .then(response => {
                    this.props.getAllPostData()
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else {
            axios.post('/api/post', this.state.insertPostData);

            setTimeout(() => {
                this.props.getAllPostData()
            }, 1500);
        }

    }

    addNewCategory() {
        this.setState({ visibleDialog: true })
    }

    loadCategory() {
        this.setState({ visibleDialog: false })
        this.getAllData();
    }

    hideDialog() {
        // this.setState({ visibleDialog: false })
    }

    render() {
        let { insertPostData, categoryData } = this.state

        return (
            <div>
                <div className="col-12 mt-3">
                    <h3>Post</h3>
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
                            <span className="input-group-text" id="basic-addon3">Category</span>
                        </div>
                        {/* <div class="form-group"> */}
                        {/* <label for="exampleFormControlSelect2">Example multiple select</label> */}
                        <select
                            multiple
                            className="form-control"
                            id="exampleFormControlSelect2"
                            name="category"
                            onChange={this.onChangeSelectValue}
                        >
                            {
                                categoryData.map((item) =>
                                    <option key={item.id} value={item.id}>{item.title}</option>
                                )
                            }
                            <option onClick={this.addNewCategory} type="button">Add New</option>
                        </select>
                        {/* </div> */}
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
                        label={this.props.updateData ? "Update" : "Save"}
                        className="btn btn-primary"
                        onClick={this.onSubmitData}
                    />


                    <Dialog
                        header="Header"
                        visible={this.state.visibleDialog}
                        style={{ width: '50vw' }}
                        onHide={() => this.setState({ visibleDialog: false })}
                    >
                        <AddCategory loadCategory={this.loadCategory} hideDialog={this.hideDialog} />
                    </Dialog>


                </div>
            </div>
        )
    }
}
export default AddPost