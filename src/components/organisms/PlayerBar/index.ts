import { connect } from 'react-redux'

import PlayerBar from './PlayerBar'

const mapStateToProps = (state) => {
  return {
    songDetails:  state.songsReducer.songDetails
  }
}

export default connect(mapStateToProps)(PlayerBar)
