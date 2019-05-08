import { connect } from 'react-redux';
import { selectAuditScriptSteps } from 'redux/auditResults/selectors';
import { fetchProjectRequest } from 'redux/projects';
import { RootState } from 'redux/types';

import { injectIntl } from 'react-intl';
import { Dispatch } from 'redux';
import { fetchAuditResultsRequest } from 'redux/auditResults';
import { Audits, OwnProps } from './Audits';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  project: state.projects.byId ? state.projects.byId[props.match.params.projectId] : undefined,
  page: state.pages.byId[props.match.params.pageOrScriptId],
  script: state.scripts.byId[props.match.params.pageOrScriptId],
  sortedPageAuditResultsIds: state.auditResults.sortedByPageId[props.match.params.pageOrScriptId],
  sortedScriptAuditResultsIds:
    state.auditResults.sortedByScriptId[props.match.params.pageOrScriptId],
  scriptSteps: selectAuditScriptSteps(state, props.match.params.pageOrScriptId),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAuditResultsRequest: (id: string, type: 'page' | 'script') =>
    dispatch(fetchAuditResultsRequest({ id, type })),
  fetchProjectRequest: (projectId: string) => dispatch(fetchProjectRequest({ projectId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Audits));