import React, { useReducer } from 'react';
import * as uuid from 'uuid';

import projectContext from './projectContext';
import projectReducer from './projectReducer';

import { OPEN_FORM, GET_PROJECTS, ADD_PROJECT, ACTIVE_PROJECT } from '../../types';

function ProjectState(props) {
  const initialState = {
    openForm: false,
    projects: [],
    project: null
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  const showForm = () => {
    dispatch({
      type: OPEN_FORM
    });
  }

  const getProjects = () => {
    dispatch({
      type: GET_PROJECTS,
      payload: [
        { id: 1, name: 'Tienda Virtual' }, 
        { id: 2, name: 'Web Design' }, 
        { id: 3, name: 'Mobile App' }
      ]
    });
  }

  const addProject = name => {
    dispatch({
      type: ADD_PROJECT,
      payload: { id: uuid.v4(), name }
    });
  }

  const activeProject = project => {
    dispatch({
      type: ACTIVE_PROJECT,
      payload: project
    });
  }

  return (
    <projectContext.Provider
      value={{
        openForm: state.openForm,
        projects: state.projects,
        project: state.project,
        showForm,
        getProjects,
        addProject,
        activeProject
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
}

export default ProjectState;