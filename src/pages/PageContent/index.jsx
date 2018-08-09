import React from 'react';
import PageContentHeader from './PageContentHeader'
import PageContentMain from './PageContentMain';

export default class PageContent extends React.Component {
  onRef = (ref) => {
    this.child = ref
  }
  /**打开上传模态框 */
  handleUpload = () => {
    this.child.handleUpload();
  }
  render() {
    return <div>
      <PageContentHeader handleUpload={this.handleUpload}/>
      <PageContentMain ref={this.onRef} />
    </div>
  }
}