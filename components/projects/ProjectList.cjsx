React = require 'react'
Router = require 'react-router'
mui = require('material-ui')
TagMenu = require './TagMenu'
SortMenu = require './SortMenu'
flux = require('../../scripts/app')

{Link} = Router;
{ Paper, Toolbar, ToolbarGroup, DropDownMenu, TextField } = mui;

ProjectList = React.createClass

  onChangeText: (e) ->
    flux.actions.changeText e.target.value

  render: ->

    <div>
      <table className="pure-table pure-table-striped">
          {this.props.projects.map (project, index) ->
            <ProjectList.Item project={ project } key={ project._id } index={ index }/>
          }
      </table>
    </div>


ProjectList.Item = React.createClass

  render: ->
    <tr>
      <td>{ @props.index + 1 }</td>
      <td>
        <Link
          to={ 'projects' }
          params={{ id: @props.project._id }}
        >
        { @props.project.name }
        </Link>
      </td>
      <td>{ @props.project.stars }</td>
      <td>+ { @props.project.delta1 }</td>
    </tr>


module.exports = ProjectList