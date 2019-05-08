import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchProjectsRequest } from 'redux/projects';
import { getCurrentProject } from 'redux/selectors';
import { RootStateWithRouter } from 'redux/types';
import { ProjectsMenu } from './ProjectsMenu';

const mapStateToProps = (state: RootStateWithRouter) => ({
  currentProject: getCurrentProject(state),
  projects: state.projects.byId
    ? Object.keys(state.projects.byId).map(projectId =>
        state.projects.byId ? state.projects.byId[projectId] : null,
      )
    : null,
  userToken: state.login.token,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectsRequest: () => dispatch(fetchProjectsRequest({})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ProjectsMenu));