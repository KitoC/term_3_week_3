import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Bookmark from './Components/Bookmark'
import axios from 'axios'
import Loading from './Components/Loading'
import Modal from './UI/Modal'
import Form from './UI/Form'


class App extends Component {
  state = {
    bookmarks: [],
    title: '',
    url: '',
    loading: true,
    showContactForm: 'hide',
    updateId: ''
  }

  title = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  url = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  

  remove = (id) => {
    
    const index = this.state.bookmarks.findIndex(bookmark => bookmark._id === id)
    if (index >= 0) {
      const bookmarks = [...this.state.bookmarks]
    
      axios.delete(
        `http://localhost:3000/bookmarks/${id}`
      ).then(() => {
        bookmarks.splice(index, 1)
        this.setState({ bookmarks })
      })
      
    }

  }

  add = (e) => {
    const {title, url} = this.state
    e.preventDefault()
    this.setState({
      bookmarks: [...this.state.bookmarks, { title: this.state.title, url: this.state.url}]
    })
    axios.post('http://localhost:3000/bookmarks', {title, url }).catch((error) => {
      alert('There was an error: ', error)
    })
  }

  update = (e) => {
    e.preventDefault()
    const { updateId, title, url } = this.state
    const index = this.state.bookmarks.findIndex(bookmark => bookmark._id === updateId)

    let updateBookmarks = [...this.state.bookmarks]
    updateBookmarks[index] = { title, url }
   
    if (index >= 0) {
      axios.put(
        `http://localhost:3000/bookmarks/${updateId}`, {title, url}
      ).then(() => {
        this.setState({ bookmarks: updateBookmarks  })
      })
    }
  }

  showForm = (id) => {
     let { bookmarks } = this.state
    
    let index = bookmarks.findIndex(bm => bm._id === id)
    let title = bookmarks[index].title
    let url = bookmarks[index].url

    
    this.setState({
      showContactForm: ' ',
      updateId: id, 
      title: title,
      url: url
    }, () => console.log(this.state.updateId))
    
  }

  hideForm() {
    this.setState({
      showContactForm: 'hide'
    })
  }

  
  

  async componentDidMount() {
    try {
      const bookmarks = await axios.get(
        'http://localhost:3000/bookmarks'
      )
      setTimeout(() => {
        this.setState({ 
          bookmarks: bookmarks.data,
          loading: false
         })
      }, 2000)
    }
    catch(error) {
      alert('Failed to load Bookmarks: ', error)
    }
  }
  



  render() {
    const { bookmarks, loading, showContactForm, updateId, title, url } = this.state
  
  
    return (
      <div className="App">
      
        <h1>Bookmarks</h1>

        <form onSubmit={this.add}>
          <label>Title</label>
          <input onChange={this.title} name="title" />
          <label>URL</label>
          <input onChange={this.url} name="url" />
          <button>Create new Bookmark</button>
        </form>

        { loading ? <Loading /> : (
          <div>
          {
              bookmarks.map(
                bookmark => (
                <div>
                  <Bookmark onClick={this.showForm} remove={this.remove} key={bookmark._id} {...bookmark} />
                
                </div>
              )
              )
            }
            </div>
          )
        }

        <Modal showContactForm={showContactForm} onClick={this.hideForm.bind(this)}>
          <form onSubmit={this.update}>
            <label>Title</label>
            <input onChange={this.title} value={title} name="title" />
            <label>URL</label>
            <input onChange={this.url} value={url} name="url" />
            <button>Update Bookmark</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default App;
