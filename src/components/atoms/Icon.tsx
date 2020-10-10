import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import clsx from 'clsx'

interface IconProps {
  name: string,
  className?: string
}

const defaultProps: IconProps = {
  name: 'bug'
}

const useStyles = createUseStyles((theme) => ({
  Icon: {
    fontSize: '12px',
  },
}))

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const theme = useTheme()
  const classes = useStyles({ theme })

  const iconStyles = clsx(
    classes.Icon,
    'fas',
    `fa-${name}`,
    className && `${className}`
  )
  return (<i className={iconStyles} aria-hidden='true' />)
}

Icon.defaultProps = defaultProps
