import {faGithub, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
import {faLink} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default function Footer() {
  return (
    <nav className="w-full bg-white flex justify-between items-center px-8 min-h-[5dvh]">
      <div className="text-sm font-bold pb-0">Powered by Lorenzo</div>
      <div className="text-md pb-0">
        <a href="https://www.linkedin.com/in/lorenzo-garofalo-digital/" target="_blank">
          <FontAwesomeIcon icon={faLinkedinIn} className="me-6" />
        </a>
        <a href="https://github.com/thelore85" target="_blank">
          <FontAwesomeIcon icon={faGithub} className="me-6" />
        </a>
        <a href="https://www.bigweb.club" target="_blank">
          <FontAwesomeIcon icon={faLink} className="" />
        </a>
      </div>
    </nav>
  )
}
