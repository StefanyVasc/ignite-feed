import PropTypes from "prop-types"
import styles from "./Avatar.module.css"

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  hasBorder: PropTypes.bool,
}

Avatar.defaultProps = {
  hasBorder: true,
}

export function Avatar({ src, hasBorder }) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
    />
  )
}
