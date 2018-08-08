import React from 'react';
import PageContentHeader from './PageContentHeader'
import PageContentMain from './PageContentMain';

export default class PageContent extends React.Component{
  render(){
    return <div>
      <PageContentHeader />
      <PageContentMain />
    </div>
  }
}