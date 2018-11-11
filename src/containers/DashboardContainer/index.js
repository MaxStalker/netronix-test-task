import { connect } from 'react-redux';
import { Dashboard } from 'components';
import { getSensorsList } from 'redux/selectors/sensors';

const mapStateToProps = state => ({
  list: getSensorsList(state),
});
export default connect(mapStateToProps)(Dashboard);
