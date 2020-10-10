// @ts-nocheck
import React, { useState } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { Range, getTrackBackground } from 'react-range'
import PropTypes from 'prop-types'

import { Icon } from '../../atoms'

const useStyles = createUseStyles((theme) => ({
  volumeControls: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',

    '& .icon': {
      color: theme.palette.white.secondary,

      '&:hover': {
        color: theme.palette.white.primary,
      }
    },
  },

  muteToggle: {
    marginRight: '14px',
    width: '14px',
  },

  range: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    height: '14px',
    position: 'relative',
    outline: 'none',
    width: '100px',

    '&:hover .range__thumb': {
      visibility: 'visible',
    },

    '& .range__track': {
      display: 'flex',
      width: '100%',

      '&--active': {
        alignSelf: 'center',
        borderRadius: '1px',
        height: '4px',
        width: '100%',
      },
    },
    '& .range__thumb': {
      alignItems: 'center',
      background: theme.palette.white.primary,
      borderRadius: '50%',
      cursor: 'default',
      display: 'flex',
      height: '12px',
      justifyContent: 'center',
      outline: 'none',
      width: '12px',
      visibility: 'hidden',

      '&--active': {
        background: `radial-gradient(circle at right bottom, ${theme.palette.white.primary} 25%, ${theme.palette.grey[2]} 100%)`,
        borderRadius: '50%',
        height: '8px',
        width: '8px',
        visibility: 'hidden',
      },
    },
  },

  fullscreenToggle: {
    marginLeft: '18px',

    '& .icon': {
      fontSize: '18px',
    },
  }
}))

// TODO: add Fullscreen mode
// TODO: add Queue

const VolumeControls = ({
  updateVolumeAction,
  volume,
}) => {
  const theme = useTheme()
  const classes = useStyles({ theme })
  
  const [volumeState, setVolumeState] = useState(0)
  const [volumeEnabled, setVolumeEnabled] = useState(true)

  const rangeMin = 0
  const rangeMax = 100

  const calcRangeVolume = (value) => Math.ceil(value / 10) * 10
  const volumeIcon = volumeEnabled ? 'volume-up' : 'volume-mute'

  const handleVolumeToggle = () => {
    if (volumeEnabled) {
      setVolumeEnabled(false)
      setVolumeState(volume)
      updateVolumeAction(0)
    } else {
      setVolumeEnabled(true)
      setVolumeState(volumeState)
      updateVolumeAction(calcRangeVolume(volumeState))
    }
  }
  const handleVolumeChange = (value) => {
    setVolumeState(value)
    updateVolumeAction(calcRangeVolume(volumeState))
  }
  // const handleFullscreenToggle = () => {
  //   console.log('Toggle Fullscreen')
  // }

  return (
    <div className={classes.volumeControls}>
      <div onClick={handleVolumeToggle} className={classes.muteToggle}>
        <Icon name={volumeIcon} className='icon' />
      </div>

      <div className={classes.range}>
        <Range
          values={[volume]}
          step={1}
          min={rangeMin}
          max={rangeMax}
          onChange={(values) => handleVolumeChange(values)}
          renderTrack={({ props, isDragged, children }) => {
            
            return (
              <div
                className='range__track'
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{ ...props.style }}
              >
                <div
                  className='range__track--active'
                  ref={props.ref}
                  style={{
                    background: getTrackBackground({
                      values: [volume],
                      colors: [
                        isDragged ? theme.palette.primary.main : theme.palette.grey[1],
                        theme.palette.grey[4]
                      ],
                      min: rangeMin,
                      max: rangeMax,
                    }),
                  }}
                >
                  {children}
                </div>
              </div>
            )}
          }
          renderThumb={({ props }) => {
            const styleWithoutCursor = Object.keys(props.style)
              .filter((key) => key !== 'cursor')
              .reduce((obj, key) => {
                obj[key] = props.style[key]
                return obj
              }, {})

            return (
              <div
                {...props}
                className='range__thumb'
                style={{ ...styleWithoutCursor }}
              >
                <div className='range__thumb--active' />
              </div>
            )}
          }
        />
      </div>

      {/*
        <div onClick={handleFullscreenToggle} className={classes.fullscreenToggle}>
          <Icon name='expand-alt' className='icon' />
        </div>
      */}
    </div>
  )
}

VolumeControls.propTypes = {
  updateVolumeAction: PropTypes.func,
  volume: PropTypes.number,
}

export default VolumeControls
