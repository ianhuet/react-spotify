// @ts-nocheck
import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

import { PlayControls, PlayInfo, VolumeControls } from '../../molecules'

const useStyles = createUseStyles((theme) => ({
  player: {
    alignItems: 'center',
    background: theme.palette.black.tertiary,
    borderTop: `1px solid ${theme.palette.black.primary}`,
    boxSizing: 'border-box',
    display: 'flex',
    gridArea: 'baseRow / secondaryCol / baseRow / 3',
    justifyContent: 'space-between',
    padding: '0 14px',
  },
}))

const PlayerBar = ({ audioControl, pauseSong, songDetails, stopSong, resumeSong }) => {
  const classes = useStyles()
  
  return (
    <div className={classes.player}>
      <PlayInfo songDetails={songDetails} />

      <PlayControls
        stopSong={stopSong}
        pauseSong={pauseSong}
        resumeSong={resumeSong}
        audioControl={audioControl}
      />
      <VolumeControls />
    </div>
  )
}

PlayerBar.propTypes = {
  audioControl: PropTypes.func,
  pauseSong: PropTypes.func,
  songDetails: PropTypes.object,
  stopSong: PropTypes.func,
  resumeSong: PropTypes.func,
}

export default PlayerBar
