// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Icon } from '../../atoms'

const useStyles = createUseStyles((theme) => ({
  playControls: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
  },

  controls: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '4px',

    '& .button': {
      color: theme.palette.grey[1],
      cursor: 'pointer',
      padding: '0 5px',

      '&.small': {
        fontSize: '16px',
      },
      '&.large': {
        fontSize: '40px',
        '-webkit-text-stroke': `4px ${theme.palette.black.tertiary}`,
      },
    },
  },

  progress: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',

    '& .time': {
      fontSize: '12px',

      '&.inactive': {
        display: 'none',
      },
    },

    '& .track': {
      background: theme.palette.grey[4],
      borderRadius: theme.borderRadius.small,
      height: '4px',
      margin: '0 10px',
      maxWidth: '500px',
      minWidth: '200px',
      width: '100%',
    },
    '& .progress': {
      background: theme.palette.grey[2],
      borderRadius: theme.borderRadius.small,
      height: '4px',
      margin: 0,
      width: 0,
    }
  }
}))

export const PlayControls = ({
  audioControl,
  className,
  increaseSongTime,
  pauseSong,
  resumeSong,
  songDetails,
  songPaused,
  songPlaying,
  songs,
  stopSong,
  timeElapsed,
}) => {
  const theme = useTheme()
  const classes = useStyles({ theme })

  const [songTime, setSongTime] = useState(timeElapsed)
  const [intervalId, setIntervalId] = useState(false)

  useEffect(() => {
    const calculateTime = () => {
      const interval = setInterval(() => {
        if (timeElapsed === 30) {
          clearInterval(intervalId)
          stopSong()
        } else if (!songPaused) {
          increaseSongTime(timeElapsed + 1)
        }
      }, 1000)
  
      setIntervalId(interval)
    }

    if (!songPlaying) {
      clearInterval(intervalId)
    }

    if (songPlaying && timeElapsed === 0) {
      clearInterval(intervalId)
      calculateTime()
    }

    setSongTime(timeElapsed)
  }, [])

  const getSongIndex = () =>
    songs.map((song, index) =>
      (song.track === songDetails) ? index : undefined
    )
    .filter(item => item !== undefined)[0]

  const handlePlayPauseSong = () => !songPaused ? pauseSong : resumeSong
  const handleNextSong = () => {
    let currentIndex = getSongIndex()
    currentIndex === songs.length - 1 ? audioControl(songs[0]) : audioControl(songs[currentIndex + 1])
  }
  const handlePrevSong = () => {
    let currentIndex = getSongIndex()
    currentIndex === 0 ? audioControl(songs[songs.length - 1]) : audioControl(songs[currentIndex - 1])
  }

  const buttonPlayPauseIcon = songPaused ? 'play-circle-o' : 'pause-circle-o'
  const formattedTime = (time) => moment().minutes(0).second(time).format('m:ss')

  const playControlStyles = clsx(
    classes.playControls,
    className && `${className}`
  )
  const timeStyles = clsx('time', songTime === 0 && 'inactive')

  return (
    <div className={playControlStyles}>
      <div className={classes.controls}>
        <a onClick={handlePrevSong} className='button small'>
          <Icon name='step-backward' />
        </a>
        <a onClick={handlePlayPauseSong}>
          <Icon name={buttonPlayPauseIcon} className='button large' />
        </a>
        <a onClick={handleNextSong} className='button small'>
          <Icon name='step-forward' />
        </a>
      </div>

      <div className={classes.progress}>
        <p className={timeStyles}>
          {formattedTime(songTime)}
        </p>
        <div className='track'>
          <div style={{ width: songTime * 16.5 }} className='progress' />
        </div>
        <p className={timeStyles}>
          {formattedTime(30 - songTime)}
        </p>
      </div>
    </div>
  )
}

PlayControls.propTypes = {
  artistName: PropTypes.string,
  audioControl: PropTypes.func,
  className: PropTypes.string,
  increaseSongTime: PropTypes.func,
  pauseSong: PropTypes.func,
  resumeSong: PropTypes.func,
  songDetails: PropTypes.object,
  songName: PropTypes.string,
  songPaused: PropTypes.bool,
  songPlaying: PropTypes.bool,
  songs: PropTypes.array,
  stopSong: PropTypes.func,
  timeElapsed: PropTypes.number,
}
