// @ts-nocheck
import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import PropTypes from 'prop-types'

import { Artwork } from '../../atoms'
import { imageSizes } from '../../../constants'

const useStyles = createUseStyles((theme) => ({
  playInfo: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    position: 'relative',
    overflow: 'hidden',
    width: '225px',

    '&:after': {
      boxShadow: `inset -6px 0px 10px -3px ${theme.palette.black.tertiary}`,
      content: '""',
      display: 'block',
      height: '100%',
      position: 'absolute',
      right: 0,
      top: 0,
      width: '7px',
      zIndex: 1,
    },

    '& .artwork': {
      height: '52px',
      marginRight: '14px',
      width: '52px',
    },
  
    '& .name': {
      whiteSpace: 'pre',

      '&:hover': {
        cursor: 'pointer',
      },
      '&--song': {
        fontSize: '13px',
        paddingBottom: '6px',
        
      },
      '&--artist': {
        color: theme.palette.grey[1],
        fontSize: '12px',
      },  
    },
  },
}))


// .track {
//   animation: marquee 4s linear;
//   border: 1px solid red;
//   position: absolute;
//   white-space: nowrap;
//   will-change: transform;
// }

// .content {
//   display: inline-block;
//   position: relative;
// }
// .content:after {
//   content: 'Infinite Marquee done bigger';
//   display: inline-block;
//   margin-left: 40px;
// }


// @keyframes marquee {
//   from { transform: translateX(0); }
//   to { transform: translateX(-50%); }
// }


// TODO: add long name marquee
// TODO: add Artwork magnifier UI

const PlayInfo = ({ songDetails }) => {
  const theme = useTheme()
  const classes = useStyles({ theme })

  let artistNameString, songName
  const hasCurrentSong = !!songDetails

  if (songDetails) {
    songName = songDetails.name
    artistNameString = songDetails.artists.reduce((accum, artist) => accum += `${artist.name}, `, '').slice(0, -2)
  }

  // const isOverflown = ({ element }) => element.scrollWidth > element.clientWidth

  return (
    <div className={classes.playInfo} data-testid='play-info'>
      {
        hasCurrentSong &&
        <>
          <div className='artwork'>
            <Artwork
              size={imageSizes.SMALL}
              images={songDetails.album.images}
              caption={`${songName} - ${artistNameString}`}
            />
          </div>

          <div>
            <p className='name name--song' data-testid='song-name'>
              <span>{songName}</span>
            </p>
            <p className='name name--artist' data-testid='artist-name'>
              <span>{artistNameString}</span>
            </p>
          </div>
        </>
      }
    </div>
  )
}

PlayInfo.propTypes = {
  songDetails: PropTypes.object,
}

export default PlayInfo
