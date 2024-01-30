import * as styles from './TuBox.css'
import { Link } from 'react-router-dom'

const TuBox = ({ title, content, link, linkTo }) => {
  return (
    <div className={styles.boxSetting}>
      <h1 className={styles.boxTitle}>{title}</h1>
      <p className={styles.boxPara}>{content}</p>
      {link && (<div className={styles.boxButton}>
        <Link to={linkTo}>{link}</Link>
      </div>
      )}
    </div>
  )
}

export default TuBox