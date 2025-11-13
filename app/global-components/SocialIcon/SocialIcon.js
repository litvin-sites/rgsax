import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faVimeo, faVk, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

const icons = {
  telegram: faTelegram,
  vk: faVk,
  rutube: faVideo,
  whatsapp: faWhatsapp,
  vimeo: faVimeo,
};

export default function SocialIcon({ kind, href }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition"
        aria-label={kind}
      >
        <FontAwesomeIcon icon={icons[kind]} className="text-slate-700" />
      </a>
    </li>
  );
}
