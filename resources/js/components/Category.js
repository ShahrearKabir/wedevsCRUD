import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer';
import AddCategory from './AddCategory';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

class Category extends Component {
    constructor() {
        super();
        this.state = {
            insertPostData: {
                title: '',
                description: '',
            },
            categoryData: [],
            visibleDialog:false
        }

        this.addNewCategoryDialog = this.addNewCategoryDialog.bind(this)
        this.actionBody = this.actionBody.bind(this)
        this.deleteCategory = this.deleteCategory.bind(this)
        this.editCategory = this.editCategory.bind(this)
        this.getAllData = this.getAllData.bind(this)
    }

    componentDidMount() {
        this.getAllData();
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

    addNewCategoryDialog(){
        this.setState({ visibleDialog: true, updateData:null })
    }

    loadCategory() {
        this.getAllData();
    }

    actionBody(rowData){
        return(
            <div>
                <Button
                    label="edit"
                    className="p-button-info mx-1"
                    onClick={() => this.editCategory(rowData)}
                />

                <Button
                    label="X"
                    className="p-button-danger mx-1"
                    onClick={() => this.deleteCategory(rowData)}
                />
            </div>
            
        )
      }
    
    deleteCategory(rowData) {
        axios.delete('/api/category/delete/' + rowData.id)
            .then(response => {
                console.log(response)
                this.getAllData();
            })
            .catch(error => {
                console.log(error)
            })
    }

    editCategory(rowData){
        console.log('rowData', rowData);
        this.setState({ visibleDialog: true, updateData: rowData})
    }

    render() {
        return (
            <div>
                <Header />
                    

                <div className="col-12 my-3">
                    <Button
                        label="Add New Category"
                        className="btn btn-primary"
                        onClick={this.addNewCategoryDialog}
                    />
                </div>

                <div className="col-12 mb-3">
                    <div className="card">
                        <DataTable value={this.state.categoryData}>
                            <Column field="title" header="Title"></Column>
                            <Column field="description" header="Description"></Column>
                            <Column field="category" header="Category" body={this.actionBody}></Column>
                        </DataTable>
                    </div>
                </div>
                
                <Dialog
                    header="Header"
                    visible={this.state.visibleDialog}
                    style={{ width: '50vw' }}
                    onHide={() => this.setState({ visibleDialog: false })}
                >
                    <AddCategory loadCategory={this.loadCategory.bind(this)} updateData={this.state.updateData} />
                </Dialog>
                {/* <Footer /> */}
            </div>
        )
    }
}
export default Category