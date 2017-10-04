import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
//import CategoryListItem from './CategoryListItem'

class CategoriesList extends Component {
  render() {
    const { categories } = this.props

    return (
      <div className="categories-list">
        <ol>{categories.map(category => <li>{category.name}</li>)}</ol>
      </div>
    )
  }
}

/*
CategoriesLists.PropTypes = {

}*/

function mapStateToProps({ category }) {
  return {
    categories: category.categories || [],
  }
}

export default connect(mapStateToProps)(CategoriesList)
