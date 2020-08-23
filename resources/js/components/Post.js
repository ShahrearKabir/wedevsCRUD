import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer';
import AddPost from './AddPost';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

class Post extends Component {
  constructor() {
    super();
    this.state = {
      categoryData: [],
      postData: [],
      visibleDialog: false
    }

    this.addNewPostDialog = this.addNewPostDialog.bind(this)
    this.categoryBody = this.categoryBody.bind(this)
    this.actionBody = this.actionBody.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.editCategory = this.editCategory.bind(this)
    this.getAllPostData = this.getAllPostData.bind(this)
  }

  componentDidMount() {
    this.getAllData();
    this.getAllPostData();
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

  getAllPostData() {
    axios.get('/api/post/all')
      .then(response => {
        console.log(response)
        this.setState({ postData: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  addNewPostDialog(){
    this.setState({ visibleDialog: true, updateData:null })
  }

  categoryBody(rowData){
    console.log('rowData',rowData);
    return(
      rowData.categoryDetails && rowData.categoryDetails.map((item, index) => 
        <p key={index}>{item && item.title}</p>
        )
    )
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
          onClick={() => this.deletePost(rowData)}
        />
      </div>
    )
  }

  deletePost(rowData){
    axios.delete('/api/post/delete/' + rowData.id)
      .then(response => {
        console.log(response)
        this.getAllPostData();
      })
      .catch(error => {
        console.log(error)
      })
  }

  editCategory(rowData) {
    console.log('rowData', rowData);
    this.setState({ visibleDialog: true, updateData: rowData })
  }

  loadPost() {
    this.getAllPostData();
  }

  render() {
    let { insertPostData, categoryData } = this.state

    return (
      <div>
        <Header />
        
        <div className="col-12 my-3">
          <Button
            label="Add New Post"
            className="btn btn-primary"
            onClick={this.addNewPostDialog}
          />
        </div>
        <div className="col-12 mb-3">
          <div className="card">
            <DataTable value={this.state.postData}>
              <Column field="title" header="Title"></Column>
              <Column field="category" header="Category" body={this.categoryBody}></Column>
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
          <AddPost getAllPostData={ this.loadPost.bind(this) } updateData={this.state.updateData}/>
        </Dialog>
        <Footer />
      </div>
    )
  }
}
export default Post