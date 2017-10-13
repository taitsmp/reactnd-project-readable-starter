import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
//import CategoryListItem from './CategoryListItem'

class CategoriesList extends Component {
  render() {
    const { categories } = this.props

    return (
      <div className="categories-list">
        <ol>
          {categories.map(category => (
            <li key={category.path}>
              <Link to={`/${category.path}`}>{category.name}</Link>
            </li>
          ))}
        </ol>
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
