import { useTranslation } from 'react-i18next';
import ActiviteWrapper from './Activite.styles';

interface ActiviteData {
  sigle: string;
  titre?: string;
  numeroGroupe: string | number;
  modeEnseignement: string;
  charges: string[];
  nom: string;
  locaux: string[];
}

interface ActiviteProps {
  activite: ActiviteData;
  flex: number;
  borderColor: string;
  color: string;
  disableNomCours?: boolean;
  disableTitreCours?: boolean;
  disableNomActivite?: boolean;
  disableLocaux?: boolean;
  disableModeEnseignement?: boolean;
  disableEnseignant?: boolean;
  onClick?: () => void;
}

function Activite({
  activite,
  flex,
  borderColor,
  color,
  disableNomCours = false,
  disableTitreCours = true,
  disableNomActivite = false,
  disableLocaux = false,
  disableModeEnseignement = true,
  disableEnseignant = true,
  onClick,
}: ActiviteProps): JSX.Element {
  const { t } = useTranslation('common');
  const isClickable = !!onClick;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isClickable) return;

    if ((event.key === 'Enter' || event.key === ' ') && onClick) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <ActiviteWrapper
      flex={flex}
      borderColor={borderColor}
      color={color}
      isClickable={isClickable}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `Voir les détails du cours ${activite?.sigle}` : undefined}
    >
      <div className="wrapper">
        {!disableNomCours && (
          <span>
            <strong>
              {activite?.sigle}
              -
              {activite?.numeroGroupe}
            </strong>
          </span>
        )}
        {!disableTitreCours && activite?.titre && (
          <span style={{ fontSize: '0.85em' }}>{activite.titre}</span>
        )}
        {!disableModeEnseignement && <span>{t(activite?.modeEnseignement)}</span>}
        {!disableEnseignant && <span>{t(activite?.charges?.join(','))}</span>}
        {!disableNomActivite && <span>{activite?.nom}</span>}
        {!disableLocaux && <span>{activite?.locaux?.join(',')}</span>}
      </div>
    </ActiviteWrapper>
  );
}

export default Activite;
