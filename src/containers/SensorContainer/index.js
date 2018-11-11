import { connect } from 'react-redux';
import { Sensor } from 'components';
import { getSensorById } from '../../redux/selectors/sensors';

const mapStateToProps = (state, props) => {
  return {
    data: getSensorById(state, props),
  };
};

export default connect(mapStateToProps)(Sensor);
