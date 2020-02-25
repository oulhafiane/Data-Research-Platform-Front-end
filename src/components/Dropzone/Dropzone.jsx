import React, { Component } from 'react'

class Dropzone extends Component {
  state = { hightlight: false }

  constructor(props) {
    super(props)
    this.fileInputRef = React.createRef()
  }

  openFileDialog = () => {
    this.fileInputRef.current.click()
  }

  onDragOver = e => {
    e.preventDefault()
    this.setState({ hightlight: true })
  }

  onDragLeave = () => {
    this.setState({ hightlight: false })
  }

  onDrop = e => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(array)
    }
    this.setState({ hightlight: false })
  }

  fileListToArray = list => {
    const array = []
    for (var i = 0; i < list.length; i++) {
      array.push({
        file: list.item(i),
        img: URL.createObjectURL(list.item(i)),
      })
    }
    return array
  }

  onFilesAdded = e => {
    const files = e.target.files
    if (this.props.onFilesAdded) {
      const imgs = this.fileListToArray(files)
      this.props.onFilesAdded(imgs)
    }
  }

  render() {
    return (
      <>
        <div
          className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''}`}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
          onClick={this.openFileDialog}
        >
          <section>
            <div tabIndex="0" className="text-center text-muted py-4">
              <input
                name="photos"
                accept="image/*"
                ref={this.fileInputRef}
                onChange={this.onFilesAdded}
                className="FileInput"
                type="file"
                multiple
                autoComplete="off"
                tabIndex="-1"
                style={{ display: 'none' }}
              />
              <p style={{ marginBottom: '-1rem' }}>
                Drag & drop some photos here, or click to select photos
              </p>
            </div>
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '15px',
                marginBottom: '15px',
              }}
            >
              {Object.keys(this.props.imgs).map(key => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      borderRadius: 2,
                      border: '1px solid #eaeaea',
                      marginBottom: 8,
                      marginRight: 8,
                      width: 80,
                      height: 80,
                      padding: 4,
                      boxSizing: 'border-box',
                    }}
                    key={key}
                  >
                    <div
                      style={{
                        display: 'flex',
                        minWidth: 0,
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        alt=""
                        src={this.props.imgs[key].img}
                        style={{
                          display: 'block',
                          width: 'auto',
                          height: '100%',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </aside>
          </section>
        </div>
      </>
    )
  }
}

export default Dropzone
