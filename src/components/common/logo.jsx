import { logo } from "../../assets/index.js"
import { Link } from "../../lib/i18n/navigation.jsx"

const Logo = (props) => {
  return (
    <Link to="/">
      <img src={logo} alt="linkatik" className={"logo"} {...props} />
    </Link>
  )
}

export default Logo
