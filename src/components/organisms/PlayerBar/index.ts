import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PlayerBar from './PlayerBar'
import { updateVolume as updateVolumeAction } from '../../../actions/soundActions'
import { increaseSongTime as increaseSongTimeAction } from '../../../actions/songActions'

const mapStateToProps = ({ songsReducer, soundReducer }) => ({
  songDetails: songsReducer.songDetails,
  volume: soundReducer.volume,
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateVolumeAction,
    increaseSongTimeAction,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerBar)
