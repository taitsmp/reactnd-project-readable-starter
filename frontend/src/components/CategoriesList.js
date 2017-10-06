import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'


//import CategoryListItem from './CategoryListItem'

class CategoriesList extends Component {
  render() {
    const { categories } = this.props

    return (
      <div className="categories-list">
        <Nav>
          {categories.map(category => (
            <LinkContainer to={`/by-category/${category.path}`}>{category.name}
            <NavItem eventKey={category.path}>{category.name}</NavItem>
            </LinkContainer>
          ))}
        </Nav>
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
